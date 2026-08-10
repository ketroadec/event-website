/**
 * Données structurelles non traduites (routes, slugs de valeur pour la BDD).
 * Les libellés affichés viennent des fichiers de traduction (messages/*.json),
 * référencés ici via `key` (clé dans le namespace "categories" / "nav").
 */

/**
 * Date/heure cible pour le compte à rebours du hero (ISO 8601, avec fuseau).
 * Heure de départ non communiquée : 09h00 (Europe/Paris) posée par défaut,
 * à ajuster ici dès qu'elle est connue.
 */
export const EVENT_DATE_ISO = "2026-11-21T09:00:00+01:00"

/** Lien vers l'affiche officielle (PDF), issue de l'organisation. */
export const POSTER_URL = "/documents/affiche-sifm-2026.pdf"

/** Lien vers le formulaire d'informations officiel (PDF), issue de l'organisation. */
export const INFO_FORM_URL = "/documents/informations-sifm-2026.pdf"

/** Lien vers le règlement FAI Sporting Code Section 4 Volume F3 (PDF), catégories F3P-A/AFM/AA. */
export const RULES_URL = "/documents/reglement-f3p-sc4-2026.pdf"

/** Lien vers le règlement fédéral FFAM de la catégorie Nationale A (PDF). */
export const RULES_NATIONAL_A_URL = "/documents/reglement-national-a-2026.pdf"

/** Lien vers le programme provisoire (PDF), issue de l'organisation. */
export const SCHEDULE_URL = "/documents/programme-sifm-2026.pdf"

/**
 * Partenaires et organisateurs officiels (source : affiche de l'événement).
 * Noms propres, non traduits. `logo` optionnel : chemin vers le fichier dans
 * public/images/brand (fournis par l'organisation, qualité à confirmer).
 * `width`/`height` : dimensions réelles du fichier (pour un rendu à hauteur
 * fixe et largeur proportionnelle, cohérent malgré des ratios différents).
 */
export const partners: { name: string; logo: string | null; width: number; height: number }[] = [
  { name: "Modélistes Club Sélestat", logo: "/images/brand/organizer.png", width: 330, height: 245 },
  { name: "FAI", logo: "/images/brand/fai-logo.png", width: 155, height: 205 },
  {
    name: "Ville de Sélestat — Alsace Centrale",
    logo: "/images/brand/logo-selestat.png",
    width: 407,
    height: 124,
  },
  {
    name: "FFAM — Fédération Française d'AéroModélisme",
    logo: "/images/brand/logo-ffam.png",
    width: 580,
    height: 419,
  },
  {
    name: "LAM — Ligue d'AéroModélisme Grand Est",
    logo: "/images/brand/logo-ligue.png",
    width: 428,
    height: 428,
  },
  {
    name: "CTAA — Comité Territorial d'Aéromodélisme d'Alsace",
    logo: "/images/brand/ctaa.png",
    width: 146,
    height: 155,
  },
]

export const categories = [
  { value: "f3p-a", key: "f3pA" },
  { value: "f3p-afm", key: "f3pAfm" },
  { value: "national-a", key: "nationalA" },
  { value: "f3p-aa", key: "f3pAa" },
] as const

/** Classe "principale" (choix unique à l'inscription). F3P-AFM est une catégorie
 *  supplémentaire cumulable, proposée séparément (case à cocher). */
export const mainClasses = categories.filter((c) => c.value !== "f3p-afm")
export const afmCategory = categories.find((c) => c.value === "f3p-afm")!

/** Frais d'inscription par classe principale (en euros). */
export const CLASS_FEES: Record<string, number> = {
  "f3p-a": 50,
  "national-a": 20,
  "f3p-aa": 20,
}

/** Frais pour l'ajout cumulé de la catégorie F3P-AFM (en euros). */
export const AFM_FEE = 20

/** Prix des repas, par personne (en euros). */
export const MEAL_PRICES = {
  repas_samedi_midi: 18,
  repas_samedi_soir: 25,
  repas_dimanche_midi: 18,
} as const

export type NavItem = {
  key: string
  href: string
}

export const navItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "programme", href: "/programme" },
  { key: "informations", href: "/informations" },
  { key: "reglement", href: "/reglement" },
  { key: "inscrits", href: "/inscrits" },
  { key: "contact", href: "/contact" },
]
