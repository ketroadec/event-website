import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PageHero } from "@/components/page-hero"
import { RegistrationForm } from "@/components/registration-form"
import { InscriptionsList } from "@/components/inscriptions-list"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "inscription" })
  return { title: t("title"), description: t("description") }
}

export default async function InscriptionPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("inscription")

  return (
    <div>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-start">
        <RegistrationForm />
        <InscriptionsList />
      </div>
    </div>
  )
}
