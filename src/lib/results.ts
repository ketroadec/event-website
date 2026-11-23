/**
 * Résultats officiels de l'édition 2026 (source : feuilles NotauScore 9.94
 * signées par le jury, 21-22/11/2026). Noms reproduits tels qu'ils figurent
 * sur les feuilles officielles. `discarded` = vol barré (non retenu dans le total).
 */

export type FlightScore = {
  /** Score brut. */
  raw: number
  /** Score normalisé (sur 1000). */
  norm: number
  discarded?: boolean
}

export type ResultRow = {
  pos: number
  firstName: string
  lastName: string
  /** Code pays alpha-3 tel qu'indiqué sur la feuille (ex. "FRA", "SUI"). */
  country: string
  /** Mention particulière (ex. "Junior", "Fem"). */
  note?: string
  /** Total avant finale (classements finaux uniquement). */
  totalBefore?: number
  total: number
  flights: FlightScore[]
}

export type CategoryResults = {
  /** Valeur de catégorie (cf. `categories` dans site-config). */
  category: string
  /** Type de classement affiché. */
  stage: "final" | "preliminary"
  /** Numéros des vols présentés dans le tableau. */
  flightNumbers: number[]
  rows: ResultRow[]
}

const f = (raw: number, norm: number, discarded = false): FlightScore => ({
  raw,
  norm,
  discarded,
})

export const results: CategoryResults[] = [
  {
    category: "f3p-a",
    stage: "final",
    flightNumbers: [4, 5],
    rows: [
      { pos: 1, firstName: "Gernot", lastName: "BRUCKMANN", country: "AUT", totalBefore: 2000, total: 2000, flights: [f(398.1, 1000), f(411.8, 1000, true)] },
      { pos: 2, firstName: "Maxime", lastName: "SCHMITT", country: "FRA", totalBefore: 1994.84, total: 1986.96, flights: [f(382.3, 960.6, true), f(407.9, 989.54)] },
      { pos: 3, firstName: "Sébastien", lastName: "MICEK", country: "FRA", totalBefore: 1870.67, total: 1880.45, flights: [f(362.0, 911.53, true), f(389.2, 945.11)] },
      { pos: 4, firstName: "Sylvain", lastName: "PASINI", country: "SUI", totalBefore: 1855.58, total: 1878.69, flights: [f(363.2, 915.28, true), f(390.3, 950.9)] },
      { pos: 5, firstName: "Markus", lastName: "ZOLITSCH", country: "GER", totalBefore: 1888.47, total: 1867.57, flights: [f(364.8, 917.7, true), f(381.5, 923.33)] },
      { pos: 6, firstName: "Philipp", lastName: "SCHURMANN", country: "SUI", totalBefore: 1854.6, total: 1860.39, flights: [f(211.0, 540.97, true), f(382.4, 933.09)] },
      { pos: 7, firstName: "Lucas", lastName: "PONCET", country: "FRA", totalBefore: 1816.13, total: 1840.68, flights: [f(354.2, 886.08, true), f(384.4, 932.61)] },
      { pos: 8, firstName: "Kévin", lastName: "TROADEC", country: "FRA", totalBefore: 1831.35, total: 1836.94, flights: [f(357.5, 901.0, true), f(377.9, 921.26)] },
      { pos: 9, firstName: "Mateij", lastName: "HRICA", country: "SVK", totalBefore: 1756.71, total: 1788.4, flights: [f(356.2, 896.89), f(366.8, 891.51)] },
      { pos: 10, firstName: "Lukas", lastName: "DOUBRAVA", country: "CZE", totalBefore: 1746.83, total: 1726.07, flights: [f(331.6, 835.9, true), f(351.4, 852.65)] },
    ],
  },
  {
    category: "f3p-a",
    stage: "preliminary",
    flightNumbers: [1, 2, 3],
    rows: [
      { pos: 1, firstName: "Gernot", lastName: "BRUCKMANN", country: "AUT", total: 2000, flights: [f(378.2, 1000), f(386.5, 1000), f(386.9, 1000, true)] },
      { pos: 2, firstName: "Maxime", lastName: "SCHMITT", country: "FRA", total: 1994.84, flights: [f(382.0, 999.53), f(383.4, 992.2, true), f(387.5, 995.31)] },
      { pos: 3, firstName: "Markus", lastName: "ZOLITSCH", country: "GER", total: 1888.47, flights: [f(362.9, 944.84), f(362.5, 939.29, true), f(368.8, 943.63)] },
      { pos: 4, firstName: "Sébastien", lastName: "MICEK", country: "FRA", total: 1870.67, flights: [f(357.0, 933.06), f(365.3, 937.61), f(363.7, 931.96, true)] },
      { pos: 5, firstName: "Sylvain", lastName: "PASINI", country: "SUI", total: 1855.58, flights: [f(351.9, 918.69, true), f(361.5, 936.26), f(359.3, 919.32)] },
      { pos: 6, firstName: "Philipp", lastName: "SCHURMANN", country: "SUI", total: 1854.6, flights: [f(351.4, 917.75, true), f(357.4, 925.94), f(363.2, 928.66)] },
      { pos: 7, firstName: "Kévin", lastName: "TROADEC", country: "FRA", total: 1831.35, flights: [f(348.5, 910.81), f(355.0, 920.54), f(353.7, 906.25, true)] },
      { pos: 8, firstName: "Lucas", lastName: "PONCET", country: "FRA", total: 1816.13, flights: [f(342.9, 908.09), f(345.7, 897.59, true), f(354.1, 908.04)] },
      { pos: 9, firstName: "Mateij", lastName: "HRICA", country: "SVK", total: 1756.71, flights: [f(328.2, 857.08, true), f(342.6, 887.61), f(339.9, 869.1)] },
      { pos: 10, firstName: "Lukas", lastName: "DOUBRAVA", country: "CZE", total: 1746.83, flights: [f(333.5, 872.94), f(337.0, 873.89), f(337.5, 861.87, true)] },
      { pos: 11, firstName: "Florentin", lastName: "TAKZDHOOP", country: "FRA", total: 1745.95, flights: [f(330.7, 867.63), f(338.6, 878.32), f(333.9, 857.18, true)] },
      { pos: 12, firstName: "Antoine", lastName: "VURPILLOT", country: "FRA", total: 1656.25, flights: [f(308.6, 807.78, true), f(326.4, 848.09), f(314.2, 808.16)] },
      { pos: 13, firstName: "Sergej", lastName: "GLAVAK", country: "GER", total: 1531.48, flights: [f(287.6, 755.07), f(298.0, 776.41), f(292.6, 754.68, true)] },
      { pos: 14, firstName: "Frantisek", lastName: "HORNA", country: "CZE", total: 1493.19, flights: [f(282.2, 739.5), f(291.1, 753.69), f(286.3, 736.32, true)] },
      { pos: 15, firstName: "Joshua", lastName: "DEBERNARDI", country: "SUI", note: "Junior", total: 0, flights: [f(0, 0), f(0, 0), f(0, 0, true)] },
    ],
  },
  {
    category: "f3p-afm",
    stage: "preliminary",
    flightNumbers: [1, 2, 3],
    rows: [
      { pos: 1, firstName: "Gernot", lastName: "BRUCKMANN", country: "AUT", total: 2000, flights: [f(768, 1000), f(800, 1000), f(797, 1000, true)] },
      { pos: 2, firstName: "Maxime", lastName: "SCHMITT", country: "FRA", total: 1906.73, flights: [f(734, 957.81), f(744, 924.68, true), f(755, 948.92)] },
      { pos: 3, firstName: "Sébastien", lastName: "MICEK", country: "FRA", total: 1877.49, flights: [f(718, 936.98), f(742, 934.84, true), f(746, 940.51)] },
      { pos: 4, firstName: "Markus", lastName: "ZOLITSCH", country: "GER", total: 1841.5, flights: [f(698, 907.53), f(731, 933.97), f(726, 901.33, true)] },
      { pos: 5, firstName: "Lucas", lastName: "PONCET", country: "FRA", total: 1827.98, flights: [f(651, 831.3, true), f(719, 911.12), f(730, 916.86)] },
      { pos: 6, firstName: "Sylvain", lastName: "PASINI", country: "SUI", total: 1820.95, flights: [f(700, 908.27), f(728, 901.95, true), f(734, 912.68)] },
      { pos: 7, firstName: "David", lastName: "JOLIDON", country: "FRA", total: 1683.58, flights: [f(659, 861.27), f(651, 822.31), f(626, 794.7, true)] },
      { pos: 8, firstName: "Lukas", lastName: "DOUBRAVA", country: "CZE", total: 1681.25, flights: [f(590, 768.08, true), f(672, 838.19), f(671, 843.06)] },
      { pos: 9, firstName: "Matheo", lastName: "PASINI", country: "SUI", total: 1671.09, flights: [f(661, 862.34), f(643, 808.75), f(636, 804.07, true)] },
      { pos: 10, firstName: "Florentin", lastName: "TAKZDHOOP", country: "FRA", total: 1653.96, flights: [f(649, 847.32), f(653, 806.64), f(366, 454.89, true)] },
      { pos: 11, firstName: "Joshua", lastName: "DEBERNARDI", country: "SUI", note: "Junior", total: 1494.35, flights: [f(511, 680.65, true), f(595, 739.19), f(603, 755.16)] },
      { pos: 12, firstName: "Chistelle", lastName: "DHOOP", country: "FRA", note: "Fem", total: 1147.24, flights: [f(444, 582.38), f(402, 506.84, true), f(439, 564.86)] },
      { pos: 13, firstName: "Antoine", lastName: "VURPILLOT", country: "FRA", total: 1052.43, flights: [f(359, 465.7), f(479, 586.73), f(0, 0, true)] },
      { pos: 14, firstName: "Kévin", lastName: "TROADEC", country: "FRA", total: 0, flights: [f(0, 0), f(0, 0), f(0, 0, true)] },
    ],
  },
  {
    // Feuille officielle intitulée "F3P Nationale B" (ancien nom de F3P-AA).
    category: "f3p-aa",
    stage: "preliminary",
    flightNumbers: [1, 2, 3],
    rows: [
      { pos: 1, firstName: "Bertrand", lastName: "MULLER", country: "FRA", total: 2000, flights: [f(293.33, 972.38, true), f(310.5, 1000), f(318.33, 1000)] },
      { pos: 2, firstName: "David", lastName: "JOLIDON", country: "SUI", total: 1954.46, flights: [f(301.67, 1000), f(293.17, 944.18, true), f(303.83, 954.46)] },
      { pos: 3, firstName: "Fabien", lastName: "PONCET", country: "FRA", total: 1833.85, flights: [f(279.5, 926.52), f(269.0, 866.35, true), f(288.83, 907.33)] },
      { pos: 4, firstName: "Claude", lastName: "GERBER", country: "FRA", total: 1367.22, flights: [f(197.17, 653.6), f(197.67, 636.61, true), f(227.17, 713.62)] },
    ],
  },
  {
    category: "national-a",
    stage: "preliminary",
    flightNumbers: [1, 2, 3],
    rows: [
      { pos: 1, firstName: "Olivier", lastName: "VAILLANT", country: "FRA", total: 2000, flights: [f(121.17, 1000), f(120.67, 1000), f(120.17, 944.96, true)] },
      { pos: 2, firstName: "Christelle", lastName: "DHOOP", country: "FRA", note: "Fem", total: 1971.0, flights: [f(113.83, 939.48, true), f(117.17, 971.0), f(127.17, 1000)] },
      { pos: 3, firstName: "Yannick", lastName: "LAMM", country: "FRA", total: 1951.38, flights: [f(120.83, 997.25), f(113.17, 937.85, true), f(121.33, 954.13)] },
    ],
  },
]
