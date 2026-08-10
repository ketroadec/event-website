import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PageHero } from "@/components/page-hero"

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

  return (
    <div>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} />

      <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6">
        <p className="font-heading text-2xl font-semibold text-navy uppercase">
          {t("comingSoon")}
        </p>
      </div>
    </div>
  )
}
