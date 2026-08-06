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

export const categories = [
  { value: "planeur", key: "planeur" },
  { value: "voltige", key: "voltige" },
  { value: "drone-racing", key: "droneRacing" },
  { value: "libre", key: "libre" },
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
