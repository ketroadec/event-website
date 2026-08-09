import { registerLocale, getNames } from "i18n-iso-countries"
import en from "i18n-iso-countries/langs/en.json"
import fr from "i18n-iso-countries/langs/fr.json"
import de from "i18n-iso-countries/langs/de.json"

registerLocale(en)
registerLocale(fr)
registerLocale(de)

const SUPPORTED_LOCALES = new Set(["en", "fr", "de"])

/** Convertit un code ISO 3166-1 alpha-2 (ex. "FR") en emoji drapeau (🇫🇷). */
function codeToFlagEmoji(code: string): string {
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
