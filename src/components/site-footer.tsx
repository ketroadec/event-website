import { useTranslations } from "next-intl"
import { PlaneTakeoff } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { navItems } from "@/lib/site-config"

export function SiteFooter() {
  const t = useTranslations("nav")
  const tSite = useTranslations("site")
  const tFooter = useTranslations("footer")

  return (
    <footer className="bg-[#170a2e] text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-heading font-semibold text-white">
            <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <PlaneTakeoff className="size-3.5" />
            </span>
            <span>{tSite("shortName")}</span>
          </div>
          <p className="max-w-sm text-sm text-white/60">{tSite("description")}</p>
        </div>

        <nav className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:flex sm:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/60 transition-colors hover:text-[#ff5fa8]"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50 sm:px-6">
        {tFooter("rights", { year: new Date().getFullYear(), name: tSite("shortName") })}
      </div>
    </footer>
  )
}
