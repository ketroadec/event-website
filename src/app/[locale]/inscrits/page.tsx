import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PageHero } from "@/components/page-hero"
import { InscriptionsList } from "@/components/inscriptions-list"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "inscrits" })
  return { title: t("title"), description: t("description") }
}

export default async function InscritsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("inscrits")

  return (
    <div>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <InscriptionsList />
      </div>
    </div>
  )
}
