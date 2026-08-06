import type { Metadata } from "next"
import { ShieldCheck, Gauge, ListChecks, AlertTriangle } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PageHero } from "@/components/page-hero"
import { categories as categorySlugs } from "@/lib/site-config"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "reglement" })
  return { title: t("title"), description: t("description") }
}

export default async function ReglementPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("reglement")
  const tCategories = await getTranslations("categories")

  const scoring = t.raw("scoring.items") as string[]
  const safety = t.raw("safety.items") as string[]

  return (
    <div>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mx-auto max-w-5xl space-y-14 px-4 py-14 sm:px-6">
        <section>
          <h2 className="mb-6 font-heading text-xl font-semibold">
            {t("categoriesHeading")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {categorySlugs.map((cat) => (
              <Card key={cat.value}>
                <CardHeader>
                  <CardTitle>{tCategories(cat.key)}</CardTitle>
                  <CardDescription>
                    {t(`categoryDescriptions.${cat.key}`)}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Gauge className="size-4" />
              </span>
              <h2 className="font-heading text-lg font-semibold">
                {t("scoring.heading")}
              </h2>
            </div>
            <ul className="space-y-3">
              {scoring.map((rule) => (
                <li key={rule} className="flex gap-2.5 text-sm text-muted-foreground">
                  <ListChecks className="mt-0.5 size-4 shrink-0 text-primary" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <ShieldCheck className="size-4" />
              </span>
              <h2 className="font-heading text-lg font-semibold">
                {t("safety.heading")}
              </h2>
            </div>
            <ul className="space-y-3">
              {safety.map((rule) => (
                <li key={rule} className="flex gap-2.5 text-sm text-muted-foreground">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-primary" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
