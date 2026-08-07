import { useTranslations } from "next-intl"
import { CalendarDays, Mail, MapPin } from "lucide-react"

export function TopBar() {
  const tSite = useTranslations("site")

  return (
    <div className="hidden bg-navy text-white/80 sm:block">
      <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-4 text-xs sm:px-6">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-primary" />
            {tSite("eventDates")}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-primary" />
            {tSite("eventLocation")}
          </span>
        </div>
        <a
          href={`mailto:${tSite("contactEmail")}`}
          className="flex items-center gap-1.5 transition-colors hover:text-white"
        >
          <Mail className="size-3.5 text-primary" />
          {tSite("contactEmail")}
        </a>
      </div>
    </div>
  )
}
