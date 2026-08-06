/**
 * Données structurelles non traduites (routes, slugs de valeur pour la BDD).
 * Les libellés affichés viennent des fichiers de traduction (messages/*.json),
 * référencés ici via `key` (clé dans le namespace "categories" / "nav").
 */

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
