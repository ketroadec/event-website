"use client"

import { useLocale } from "next-intl"
import { Languages } from "lucide-react"

import { usePathname, useRouter } from "@/i18n/navigation"
import { routing, type Locale } from "@/i18n/routing"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const localeLabels: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  de: "Deutsch",
}

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Select
      value={locale}
      onValueChange={(nextLocale) => {
        router.replace(pathname, { locale: nextLocale as Locale })
      }}
    >
      <SelectTrigger size="sm" className="w-[68px] gap-1">
        <Languages className="size-3.5 text-muted-foreground" />
        <SelectValue>{locale.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        {routing.locales.map((l) => (
          <SelectItem key={l} value={l}>
            {localeLabels[l]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
