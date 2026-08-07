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
 */
export const partners = [
  { name: "Modélistes Club Sélestat", logo: "/images/brand/organizer.png" },
  { name: "FAI", logo: "/images/brand/fai-logo.png" },
  { name: "Ville de Sélestat — Alsace Centrale", logo: "/images/brand/logo-selestat.png" },
  { name: "FFAM — Fédération Française d'AéroModélisme", logo: "/images/brand/logo-ffam.png" },
  { name: "LAM — Ligue d'AéroModélisme Grand Est", logo: "/images/brand/logo-ligue.png" },
  // Pas de logo propre disponible pour le moment (fichier reçu tronqué) : nom seul.
  { name: "CTAA — Comité Territorial d'Aéromodélisme d'Alsace", logo: null },
] as const

export const categories = [
  { value: "f3p-a", key: "f3pA" },
  { value: "f3p-afm", key: "f3pAfm" },
  { value: "national-a", key: "nationalA" },
  { value: "national-b", key: "nationalB" },
] as const

export type NavItem = {
  key: string
  href: string
}

export const navItems: NavItem[] = [
  { key: "home", href: "/" },
  { key: "programme", href: "/programme" },
  { key: "reglement", href: "/reglement" },
  { key: "informations", href: "/informations" },
  { key: "inscription", href: "/inscription" },
  { key: "contact", href: "/contact" },
]
