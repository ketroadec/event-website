import type { Metadata } from "next"
import { MapPin, Car, BedDouble, UtensilsCrossed, PhoneCall, CloudSun } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PageHero } from "@/components/page-hero"
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
                ? t("blocks.lieu.body", { location: tSite("eventLocation") })
                : key === "contact"
                  ? t("blocks.contact.body", { email: tSite("contactEmail") })
                  : t(`blocks.${key}.body`)
            return (
              <Card key={key}>
                <CardHeader>
                  <span className="mb-2 flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
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
          <CardContent className="flex items-center justify-center py-16 text-sm text-muted-foreground">
            {t("mapPlaceholder")}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
