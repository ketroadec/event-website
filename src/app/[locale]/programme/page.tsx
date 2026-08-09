import type { Metadata } from "next"
import { Download } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PageHero } from "@/components/page-hero"
import { SCHEDULE_URL } from "@/lib/site-config"
import { Button } from "@/components/ui/button"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "programme" })
  return { title: t("title"), description: t("description") }
}

export default async function ProgrammePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("programme")

  return (
    <div>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="mb-4 flex justify-end">
          <Button asChild>
            <a href={SCHEDULE_URL} download>
              <Download className="size-4" />
              {t("downloadCta")}
            </a>
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl ring-1 ring-border">
          <iframe
            src={SCHEDULE_URL}
            title={t("title")}
            className="h-[80vh] w-full border-0"
          />
        </div>
      </div>
    </div>
  )
}
