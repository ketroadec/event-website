import type { Metadata } from "next"
import { Info } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { PageHero } from "@/components/page-hero"
import { RegistrationForm } from "@/components/registration-form"

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

      <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6">
        <div className="flex items-start gap-3 rounded-xl border border-accent bg-accent/40 px-4 py-3 text-sm text-accent-foreground">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p>{t("opensNote")}</p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 pt-6 pb-14 sm:px-6">
        <RegistrationForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/inscrits" className="font-medium text-primary hover:underline">
            {t("viewList")}
          </Link>
        </p>
      </div>
    </div>
  )
}
