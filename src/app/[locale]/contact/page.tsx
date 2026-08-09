import type { Metadata } from "next"
import { Mail } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PageHero } from "@/components/page-hero"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "contact" })
  return { title: t("title"), description: t("description") }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("contact")
  const tSite = await getTranslations("site")

  return (
    <div>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <Card>
          <CardContent className="space-y-6 py-8">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Mail className="size-4.5" />
              </span>
              <div>
                <p className="text-sm font-medium">{t("emailLabel")}</p>
                <p className="text-sm text-muted-foreground">
                  {tSite("contactEmail")}
                </p>
              </div>
            </div>
            <Button asChild className="w-full">
              <a href={`mailto:${tSite("contactEmail")}`}>{t("sendEmail")}</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
