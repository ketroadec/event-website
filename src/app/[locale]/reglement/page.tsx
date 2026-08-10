import type { Metadata } from "next"
import { Download } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PageHero } from "@/components/page-hero"
import { categories as categorySlugs, RULES_URL, RULES_NATIONAL_A_URL } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

  // F3P-A, F3P-AFM et F3P-AA partagent le même règlement FAI (Sporting Code Section 4, Volume F3).
  const faiKeys = ["f3pA", "f3pAfm", "f3pAa"] as const
  const otherCategories = categorySlugs.filter((cat) => !faiKeys.includes(cat.key as (typeof faiKeys)[number]))

  return (
    <div>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} />

      <div className="mx-auto max-w-5xl space-y-14 px-4 py-14 sm:px-6">
        <section>
          <h2 className="mb-6 font-heading text-xl font-semibold">
            {t("categoriesHeading")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="sm:col-span-2">
              <CardHeader>
                <CardTitle>
                  {faiKeys.map((key) => tCategories(key)).join(" · ")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-end">
                  <Button asChild>
                    <a href={RULES_URL} download>
                      <Download className="size-4" />
                      {t("rulesDocument.cta")}
                    </a>
                  </Button>
                </div>

                <div className="overflow-hidden rounded-xl ring-1 ring-border">
                  <iframe
                    src={RULES_URL}
                    title={t("rulesDocument.title")}
                    className="h-[80vh] w-full border-0"
                  />
                </div>
              </CardContent>
            </Card>

            {otherCategories.map((cat) => (
              <Card key={cat.value} className="sm:col-span-2">
                <CardHeader>
                  <CardTitle>{tCategories(cat.key)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex justify-end">
                    <Button asChild>
                      <a href={RULES_NATIONAL_A_URL} download>
                        <Download className="size-4" />
                        {t("rulesDocumentNationalA.cta")}
                      </a>
                    </Button>
                  </div>

                  <div className="overflow-hidden rounded-xl ring-1 ring-border">
                    <iframe
                      src={RULES_NATIONAL_A_URL}
                      title={t("rulesDocumentNationalA.title")}
                      className="h-[80vh] w-full border-0"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
