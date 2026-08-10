import type { Metadata } from "next"
import { Lock } from "lucide-react"
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
        <div className="relative">
          <div aria-hidden className="pointer-events-none blur-sm select-none">
            <RegistrationForm />
          </div>

          <div className="absolute inset-0 flex items-start justify-center pt-10">
            <div className="mx-4 w-full max-w-sm overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-xl">
              <div className="flex flex-col items-center gap-3 bg-navy px-6 py-6 text-center">
                <span className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white">
                  <Lock className="size-5" />
                </span>
                <p className="font-heading text-base font-bold tracking-wide text-white uppercase">
                  {t("comingSoonTitle")}
                </p>
              </div>
              <div className="divide-y divide-border">
                <div className="flex items-center justify-between gap-3 px-5 py-3.5">
                  <span className="text-sm font-semibold text-navy">
                    {t("priorityCategories")}
                  </span>
                  <span className="text-sm text-muted-foreground">{t("priorityDate")}</span>
                </div>
                <div className="flex items-center justify-between gap-3 px-5 py-3.5">
                  <span className="text-sm font-semibold text-navy">
                    {t("laterCategories")}
                  </span>
                  <span className="text-sm text-muted-foreground">{t("laterDate")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/inscrits" className="font-medium text-primary hover:underline">
            {t("viewList")}
          </Link>
        </p>
      </div>
    </div>
  )
}
