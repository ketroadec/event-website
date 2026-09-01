-- Évolutions du formulaire d'inscription.
-- À exécuter dans le SQL Editor de votre projet Supabase.
--
-- Remarque : ce fichier ne contenait pas le schéma de base (tables
-- `inscriptions` / `inscriptions_publiques`, trigger de synchro) — si vos
-- tables existent déjà côté Supabase, exécutez seulement les instructions
-- ci-dessous. Si vous avez un trigger qui recopie `inscriptions` vers
-- `inscriptions_publiques`, pensez à y répercuter les mêmes colonnes.

-- Nationalité (déjà en place si appliqué précédemment).
alter table inscriptions add column if not exists nationalite text not null default '';
alter table inscriptions_publiques add column if not exists nationalite text not null default '';

-- Renomme `club` en `federation` ("National aeroclub / federation", facultatif).
-- Idempotent : ne fait rien si `club` n'existe pas (déjà renommée, ou jamais créée).
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'inscriptions' AND column_name = 'club'
  ) THEN
    ALTER TABLE inscriptions RENAME COLUMN club TO federation;
  END IF;
END $$;
alter table inscriptions add column if not exists federation text;

-- Nouveaux champs privés (table `inscriptions` uniquement).
alter table inscriptions add column if not exists adresse text not null default '';
alter table inscriptions add column if not exists repas_samedi_midi integer not null default 0;
alter table inscriptions add column if not exists repas_samedi_soir integer not null default 0;
alter table inscriptions add column if not exists repas_dimanche_midi integer not null default 0;

-- Catégorie F3P-AFM cumulable (case à cocher en plus de la classe principale).
-- Publique : nécessaire pour regrouper la liste publique par catégorie.
alter table inscriptions add column if not exists afm boolean not null default false;
alter table inscriptions_publiques add column if not exists afm boolean not null default false;

-- FAI Licence Number : requis, et affiché dans la liste publique des inscrits.
alter table inscriptions add column if not exists fai_licence text not null default '';
alter table inscriptions_publiques add column if not exists fai_licence text not null default '';

-- Trigger de synchro `inscriptions` -> `inscriptions_publiques` (existant côté
-- Supabase, retrouvé et mis à jour ici pour recopier nationalite/fai_licence/afm
-- en plus des colonnes déjà gérées). À rejouer pour remplacer la version en place.
CREATE OR REPLACE FUNCTION public.sync_inscription_publique()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if (tg_op = 'INSERT') then
    insert into public.inscriptions_publiques
      (id, prenom, nom, categorie, nationalite, fai_licence, afm, statut, created_at)
    values
      (new.id, new.prenom, new.nom, new.categorie, new.nationalite, new.fai_licence, new.afm, new.statut, new.created_at);
    return new;
  elsif (tg_op = 'UPDATE') then
    update public.inscriptions_publiques
    set prenom = new.prenom,
        nom = new.nom,
        categorie = new.categorie,
        nationalite = new.nationalite,
        fai_licence = new.fai_licence,
        afm = new.afm,
        statut = new.statut
    where id = new.id;
    return new;
  elsif (tg_op = 'DELETE') then
    delete from public.inscriptions_publiques where id = old.id;
    return old;
  end if;
  return null;
end;
$function$;

-- Backfill : corrige les lignes déjà présentes dans inscriptions_publiques
-- (créées avant la mise à jour du trigger ci-dessus, donc désynchronisées).
update public.inscriptions_publiques pub
set nationalite = i.nationalite,
    fai_licence = i.fai_licence,
    afm = i.afm
from public.inscriptions i
where pub.id = i.id;

-- Renomme la valeur technique de la catégorie "National B" -> "F3P-AA"
-- (le libellé affiché avait déjà changé ; on aligne la valeur stockée en base).
update public.inscriptions set categorie = 'f3p-aa' where categorie = 'national-b';
update public.inscriptions_publiques set categorie = 'f3p-aa' where categorie = 'national-b';

-- La classe principale (`categorie`) devient facultative : on doit pouvoir
-- s'inscrire uniquement en F3P-AFM sans choisir F3P-A / F3P-AA / Nationale A.
-- Aucune donnée existante n'est modifiée : toutes les inscriptions déjà en
-- base ont une `categorie` renseignée, on assouplit seulement la contrainte.
alter table inscriptions alter column categorie drop not null;
alter table inscriptions_publiques alter column categorie drop not null;

-- Garde-fou en base : il faut au moins une classe OU l'AFM (déjà vérifié côté
-- formulaire, on le double ici pour ne jamais avoir une inscription "vide").
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'inscriptions_categorie_or_afm_check'
  ) THEN
    ALTER TABLE inscriptions
      ADD CONSTRAINT inscriptions_categorie_or_afm_check
      CHECK (categorie IS NOT NULL OR afm = true);
  END IF;
END $$;
