import Image from "next/image"
import { useTranslations } from "next-intl"
import { PlaneTakeoff } from "lucide-react"

import { Link } from "@/i18n/navigation"
import { navItems } from "@/lib/site-config"

export function SiteFooter() {
  const t = useTranslations("nav")
  const tSite = useTranslations("site")
  const tFooter = useTranslations("footer")

  return (
    <footer className="bg-navy text-white/70">
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
              className="text-white/60 transition-colors hover:text-primary"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-center text-xs text-white/50">
            {tFooter("rights", { year: new Date().getFullYear(), name: tSite("shortName") })}
          </p>
          {/* Réseaux sociaux : décoratifs pour le moment, aucun compte officiel confirmé */}
          <div className="flex items-center gap-3 opacity-70">
            <div className="relative size-7">
              <Image
                src="/images/brand/facebook.png"
                alt="Facebook"
                fill
                sizes="28px"
                className="object-contain"
              />
            </div>
            <div className="relative size-7">
              <Image
                src="/images/brand/instagram.png"
                alt="Instagram"
                fill
                sizes="28px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
