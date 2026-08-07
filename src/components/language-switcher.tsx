"use client"

import { useLocale } from "next-intl"

import { usePathname, useRouter } from "@/i18n/navigation"
import { routing, type Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"

const localeFlags: Record<Locale, { flag: string; label: string }> = {
  fr: { flag: "🇫🇷", label: "Français" },
  en: { flag: "🇬🇧", label: "English" },
  de: { flag: "🇩🇪", label: "Deutsch" },
}

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((l) => {
        const isActive = l === locale
        return (
          <button
            key={l}
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            aria-label={localeFlags[l].label}
            aria-current={isActive || undefined}
            title={localeFlags[l].label}
            className={cn(
              "flex size-7 items-center justify-center rounded-full text-base leading-none transition-all hover:scale-110",
              isActive
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "opacity-70 hover:opacity-100"
            )}
          >
            <span aria-hidden>{localeFlags[l].flag}</span>
          </button>
        )
      })}
    </div>
  )
}
