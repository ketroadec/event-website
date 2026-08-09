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

/**
 * Partenaires et organisateurs officiels (source : affiche de l'événement).
 * Noms propres, non traduits. `logo` optionnel : chemin vers le fichier dans
 * public/images/brand (fournis par l'organisation, qualité à confirmer).
 * `width`/`height` : dimensions réelles du fichier (pour un rendu à hauteur
 * fixe et largeur proportionnelle, cohérent malgré des ratios différents).
 */
export const partners: { name: string; logo: string | null; width: number; height: number }[] = [
  { name: "Modélistes Club Sélestat", logo: "/images/brand/organizer.png", width: 160, height: 115 },
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
]

export const categories = [
  { value: "f3p-a", key: "f3pA" },
  { value: "f3p-afm", key: "f3pAfm" },
  { value: "national-a", key: "nationalA" },
  { value: "national-b", key: "nationalB" },
] as const

/** Classe "principale" (choix unique à l'inscription). F3P-AFM est une catégorie
 *  supplémentaire cumulable, proposée séparément (case à cocher). */
export const mainClasses = categories.filter((c) => c.value !== "f3p-afm")
export const afmCategory = categories.find((c) => c.value === "f3p-afm")!

export type NavItem = {
  key: string
  href: string
}

export const navItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "programme", href: "/programme" },
  { key: "reglement", href: "/reglement" },
  { key: "informations", href: "/informations" },
  { key: "inscrits", href: "/inscrits" },
  { key: "contact", href: "/contact" },
]
