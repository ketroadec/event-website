import { useTranslations } from "next-intl"

export function SiteFooter() {
  const tSite = useTranslations("site")
  const tFooter = useTranslations("footer")

  return (
    <footer className="bg-navy text-white/70">
      <div className="px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-center text-xs text-white/50">
            {tFooter("rights", { year: new Date().getFullYear(), name: tSite("shortName") })}
          </p>
          <p className="text-center text-xs text-white/50">{tFooter("developedBy")}</p>
        </div>
      </div>
    </footer>
  )
}
