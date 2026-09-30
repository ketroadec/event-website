import type { Metadata } from "next"
import { CheckCircle2 } from "lucide-react"
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

      <div className="mx-auto max-w-2xl px-4 pt-10 pb-14 sm:px-6">
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-600/30 bg-emerald-50 px-5 py-4 dark:border-emerald-500/30 dark:bg-emerald-950/30">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white dark:bg-emerald-500">
            <CheckCircle2 className="size-4.5" />
          </span>
          <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
            {t("openBanner")}
          </p>
        </div>

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
