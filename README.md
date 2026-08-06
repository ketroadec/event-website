# Sélestat International F3P Master 2026 — site de la compétition d'aéromodélisme

Site vitrine + inscriptions pour la compétition, avec liste des participants
affichée en temps réel.

**Stack** : [Next.js](https://nextjs.org) (App Router, TypeScript) ·
[Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) ·
[Supabase](https://supabase.com) (base de données + temps réel) ·
[React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) ·
[next-intl](https://next-intl.dev) (français / anglais / allemand)

## Pages

Le site est disponible en 3 langues, avec un préfixe systématique dans
l'URL : `/fr/...`, `/en/...`, `/de/...` (français par défaut).

- `/programme` — déroulé de la compétition
- `/reglement` — catégories, notation, sécurité
- `/informations` — accès, hébergement, restauration, contact sur place
- `/inscription` — formulaire d'inscription + liste des inscrits en temps réel
- `/contact`

## Mise en route

### 1. Installer les dépendances

```bash
npm install
```

### 2. Créer un projet Supabase

1. Créez un compte / projet sur [supabase.com](https://supabase.com) (gratuit).
2. Dans **SQL Editor**, collez le contenu de [`supabase/schema.sql`](supabase/schema.sql)
   et exécutez-le. Cela crée :
   - `inscriptions` : table privée avec toutes les données (y compris email/téléphone),
     lisible/modifiable uniquement depuis le Dashboard Supabase.
   - `inscriptions_publiques` : table publique (prénom, nom, catégorie, statut)
     tenue à jour automatiquement par un trigger, et branchée sur le Realtime
     de Supabase — c'est elle que le site affiche en direct.
3. Dans **Project Settings > API**, récupérez `Project URL` et la clé `anon public`.

### 3. Configurer les variables d'environnement

```bash
cp .env.local.example .env.local
```

Renseignez `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans `.env.local`.

### 4. Lancer le site en local

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Gérer les inscriptions (valider un statut)

Il n'y a pas de back-office dédié : ouvrez le **Table Editor** de Supabase,
table `inscriptions`, et changez la colonne `statut` de chaque ligne
(`en_attente` → `confirme`). Le site se met à jour automatiquement, sans
rechargement, pour tous les visiteurs sur `/inscription`.

## Traductions

Tous les textes affichés (nav, pages, formulaire, statuts...) viennent des
fichiers de traduction, un par langue :

- [`messages/fr.json`](messages/fr.json)
- [`messages/en.json`](messages/en.json)
- [`messages/de.json`](messages/de.json)

Les trois fichiers ont exactement la même structure de clés : pour modifier
un texte, cherchez sa clé (ex. `"inscription.form.submit"`) et éditez la
valeur dans chaque fichier. Pour ajouter une langue : dupliquer un fichier
`messages/xx.json`, l'ajouter à `locales` dans
[`src/i18n/routing.ts`](src/i18n/routing.ts).

Pour ajouter une nouvelle page traduite, voir comment `/contact` est
construite ([`src/app/[locale]/contact/page.tsx`](src/app/[locale]/contact/page.tsx))
comme modèle : `getTranslations` pour le texte + `generateMetadata`.

## Personnalisation

- Dates, lieu, email de contact : namespace `site` dans chaque fichier de traduction (`messages/*.json`)
- Slugs de catégories (valeurs stockées en base) : [`src/lib/site-config.ts`](src/lib/site-config.ts)
- Couleurs / thème : [`src/app/globals.css`](src/app/globals.css)
- Contenu des pages : dossiers sous [`src/app/[locale]/`](src/app/%5Blocale%5D)

## Déploiement

Le plus rapide : [Vercel](https://vercel.com/new) — connectez le dépôt GitHub,
ajoutez les deux variables d'environnement Supabase dans les réglages du
projet Vercel, et déployez.
