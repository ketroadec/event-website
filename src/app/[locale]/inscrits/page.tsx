import type { Metadata } from "next"
import { CreditCard } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PageHero } from "@/components/page-hero"
import { InscriptionsList } from "@/components/inscriptions-list"
import { PAYMENT_URL } from "@/lib/site-config"
import { Button } from "@/components/ui/button"

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
        <div className="mb-8 flex flex-col items-center gap-4 rounded-2xl bg-navy px-6 py-7 text-center shadow-lg sm:flex-row sm:justify-between sm:gap-6 sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CreditCard className="size-6" />
            </span>
            <p className="text-base font-semibold text-white sm:max-w-xs">
              {t("payment.text")}
            </p>
          </div>
          <Button asChild size="lg" className="w-full shrink-0 uppercase sm:w-auto">
            <a href={PAYMENT_URL} target="_blank" rel="noopener noreferrer">
              {t("payment.cta")}
            </a>
          </Button>
        </div>

        <InscriptionsList />
      </div>
    </div>
  )
}
