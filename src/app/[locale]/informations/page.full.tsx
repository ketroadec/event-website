// Version complète de la page Informations, mise de côté temporairement pendant
// que /informations affiche un message "Coming soon" (page.tsx).
// Ce fichier n'est PAS une route (Next.js ne route que "page.tsx") : pour la
// restaurer, renommez ce fichier en "page.tsx" (en remplaçant l'actuel).

import type { Metadata } from "next"
import { Download } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PageHero } from "@/components/page-hero"
import { INFO_FORM_URL, POSTER_URL } from "@/lib/site-config"
import { Button } from "@/components/ui/button"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "informations" })
  return { title: t("title"), description: t("description") }
}

export default async function InformationsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("informations")
  const tSite = await getTranslations("site")

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
        <div className="mb-4 flex justify-end">
          <Button asChild>
            <a href={INFO_FORM_URL} download>
              <Download className="size-4" />
              {t("infoForm.cta")}
            </a>
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl ring-1 ring-border">
          <iframe
            src={INFO_FORM_URL}
            title={t("infoForm.title")}
            className="h-[80vh] w-full border-0"
          />
        </div>

        <div className="mt-4 mb-4 flex justify-end">
          <Button asChild>
            <a href={POSTER_URL} download>
              <Download className="size-4" />
              {t("poster.cta")}
            </a>
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl ring-1 ring-border">
          <iframe
            src={POSTER_URL}
            title={t("poster.title")}
            className="h-[80vh] w-full border-0"
          />
        </div>

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
