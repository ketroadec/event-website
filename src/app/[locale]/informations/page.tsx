import type { Metadata } from "next"
import {
  MapPin,
  Ruler,
  Car,
  BedDouble,
  UtensilsCrossed,
  PhoneCall,
  CloudSun,
  Ticket,
  Download,
} from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PageHero } from "@/components/page-hero"
import { POSTER_URL } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "informations" })
  return { title: t("title"), description: t("description") }
}

const blockIcons = {
  lieu: MapPin,
  venue: Ruler,
  publicDay: Ticket,
  acces: Car,
  hebergement: BedDouble,
  restauration: UtensilsCrossed,
  meteo: CloudSun,
  contact: PhoneCall,
} as const

export default async function InformationsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("informations")
  const tSite = await getTranslations("site")

  const blockKeys = Object.keys(blockIcons) as (keyof typeof blockIcons)[]

  const mapQuery = encodeURIComponent(`${tSite("eventVenue")}, ${tSite("eventAddress")}`)
  const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`

  return (
    <div>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blockKeys.map((key) => {
            const Icon = blockIcons[key]
            const body =
              key === "lieu"
                ? t("blocks.lieu.body", {
                    venue: tSite("eventVenue"),
                    address: tSite("eventAddress"),
                  })
                : key === "contact"
                  ? t("blocks.contact.body", { email: tSite("contactEmail") })
                  : t(`blocks.${key}.body`)
            return (
              <Card key={key}>
                <CardHeader>
                  <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Icon className="size-4.5" />
                  </span>
                  <CardTitle>{t(`blocks.${key}.title`)}</CardTitle>
                  <CardDescription>{body}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        <Card className="mt-4">
          <CardContent className="flex flex-col items-center justify-center gap-4 py-12 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Download className="size-5" />
            </span>
            <div>
              <p className="font-medium">{t("poster.title")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("poster.body")}</p>
            </div>
            <Button asChild>
              <a href={POSTER_URL} download>
                {t("poster.cta")}
              </a>
            </Button>
          </CardContent>
        </Card>

        <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-foreground/10">
          <iframe
            src={mapEmbedUrl}
            title={t("mapTitle")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full border-0"
          />
        </div>
      </div>
    </div>
  )
}
