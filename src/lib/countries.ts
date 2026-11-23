import { registerLocale, getNames, getName, alpha3ToAlpha2 } from "i18n-iso-countries"
import en from "i18n-iso-countries/langs/en.json"
import fr from "i18n-iso-countries/langs/fr.json"
import de from "i18n-iso-countries/langs/de.json"

registerLocale(en)
registerLocale(fr)
registerLocale(de)

const SUPPORTED_LOCALES = new Set(["en", "fr", "de"])

/** Convertit un code ISO 3166-1 alpha-2 (ex. "FR") en emoji drapeau (🇫🇷). */
export function codeToFlagEmoji(code: string): string {
  return [...code.toUpperCase()]
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("")
}

export type CountryOption = { code: string; name: string; flag: string }

/** Liste des pays (ISO 3166-1) avec drapeau, triée alphabétiquement dans la langue donnée. */
export function getCountryOptions(locale: string): CountryOption[] {
  const lang = SUPPORTED_LOCALES.has(locale) ? locale : "en"
  const names = getNames(lang, { select: "official" })
  return Object.entries(names)
    .map(([code, name]) => ({ code, name, flag: codeToFlagEmoji(code) }))
    .sort((a, b) => a.name.localeCompare(b.name, lang))
}

/** Code pays ISO alpha-3 (ex. "FRA", tel qu'utilisé par les feuilles de résultats)
 *  -> drapeau + nom localisé. Codes CIO hors ISO (ex. "GER", "SUI") pris en charge. */
const IOC_TO_ISO3: Record<string, string> = { GER: "DEU", SUI: "CHE", NED: "NLD", POR: "PRT", CRO: "HRV", SLO: "SVN", DEN: "DNK" }

export function getCountryFromAlpha3(alpha3: string, locale: string) {
  const iso3 = IOC_TO_ISO3[alpha3] ?? alpha3
  const alpha2 = alpha3ToAlpha2(iso3)
  if (!alpha2) return { flag: "", name: alpha3 }
  const lang = SUPPORTED_LOCALES.has(locale) ? locale : "en"
  return { flag: codeToFlagEmoji(alpha2), name: getName(alpha2, lang) ?? alpha3 }
}
