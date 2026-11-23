import type { Metadata } from "next"
import { Trophy } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PageHero } from "@/components/page-hero"
import { categories } from "@/lib/site-config"
import { getCountryFromAlpha3 } from "@/lib/countries"
import { results, type CategoryResults } from "@/lib/results"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "resultats" })
  return { title: t("title"), description: t("description") }
}

const sectionId = (r: CategoryResults) => `${r.category}-${r.stage}`

const PODIUM_STYLES: Record<number, string> = {
  1: "bg-amber-400 text-amber-950",
  2: "bg-slate-300 text-slate-900",
  3: "bg-orange-300 text-orange-950",
}

export default async function ResultatsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("resultats")
  const tCategories = await getTranslations("categories")

  const categoryLabel = (value: string) => {
    const cat = categories.find((c) => c.value === value)
    return cat ? tCategories(cat.key) : value
  }

  const fmt = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <div>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <nav className="mb-8 flex flex-wrap gap-2" aria-label={t("jumpTo")}>
          {results
            .filter((r, i) => results.findIndex((o) => o.category === r.category) === i)
            .map((r) => (
            <a
              key={r.category}
              href={`#${sectionId(r)}`}
              className="rounded-full border border-border px-4 py-1.5 font-heading text-sm font-semibold tracking-wide text-navy uppercase transition-colors hover:bg-muted"
            >
              {categoryLabel(r.category)}
            </a>
          ))}
        </nav>

        <div className="space-y-10">
          {results.map((r) => (
            <CategoryTable
              key={sectionId(r)}
              data={r}
              label={categoryLabel(r.category)}
              stageLabel={t(r.stage === "final" ? "stageFinal" : "stagePreliminary")}
              labels={{
                pos: t("pos"),
                pilot: t("pilot"),
                flight: (n: number) => t("flight", { n }),
                totalBefore: t("totalBefore"),
                total: t("total"),
                raw: t("raw"),
              }}
              fmt={fmt}
              locale={locale}
            />
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">{t("legend")}</p>
      </div>
    </div>
  )
}

function CategoryTable({
  data,
  label,
  stageLabel,
  labels,
  fmt,
  locale,
}: {
  data: CategoryResults
  label: string
  stageLabel: string
  labels: {
    pos: string
    pilot: string
    flight: (n: number) => string
    totalBefore: string
    total: string
    raw: string
  }
  fmt: Intl.NumberFormat
  locale: string
}) {
  const hasTotalBefore = data.rows.some((row) => row.totalBefore !== undefined)

  return (
    <section id={sectionId(data)} className="scroll-mt-24 overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between gap-3 bg-navy px-4 py-3">
        <h2 className="flex items-center gap-2 font-heading text-base font-bold tracking-wide text-white uppercase">
          <Trophy className="size-4 text-primary" />
          {label}
        </h2>
        <Badge variant="secondary">{stageLabel}</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="bg-muted/60 text-xs tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="w-12 px-3 py-2.5 text-center font-semibold">{labels.pos}</th>
              <th className="px-3 py-2.5 text-left font-semibold">{labels.pilot}</th>
              {hasTotalBefore && (
                <th className="px-3 py-2.5 text-right font-semibold">{labels.totalBefore}</th>
              )}
              {data.flightNumbers.map((n) => (
                <th key={n} className="px-3 py-2.5 text-right font-semibold whitespace-nowrap">
                  {labels.flight(n)}
                </th>
              ))}
              <th className="px-3 py-2.5 text-right font-semibold">{labels.total}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.rows.map((row) => {
              const country = getCountryFromAlpha3(row.country, locale)
              return (
                <tr key={`${row.pos}-${row.lastName}`} className={cn(row.pos <= 3 && "bg-primary/5")}>
                  <td className="px-3 py-2.5 text-center">
                    <span
                      className={cn(
                        "inline-flex size-7 items-center justify-center rounded-full text-xs font-bold",
                        PODIUM_STYLES[row.pos] ?? "text-muted-foreground"
                      )}
                    >
                      {row.pos}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <p className="font-semibold whitespace-nowrap text-navy">
                      {row.firstName} {row.lastName}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground" title={country.name}>
                      {country.flag && (
                        <span aria-hidden className="mr-1">
                          {country.flag}
                        </span>
                      )}
                      {row.country}
                      {row.note && <span className="ml-2">· {row.note}</span>}
                    </p>
                  </td>
                  {hasTotalBefore && (
                    <td className="px-3 py-2.5 text-right text-muted-foreground tabular-nums">
                      {row.totalBefore !== undefined ? fmt.format(row.totalBefore) : "—"}
                    </td>
                  )}
                  {row.flights.map((flight, i) => (
                    <td
                      key={data.flightNumbers[i]}
                      className={cn(
                        "px-3 py-2.5 text-right tabular-nums",
                        flight.discarded && "text-muted-foreground/70 line-through"
                      )}
                    >
                      <span className="block">{fmt.format(flight.norm)}</span>
                      <span className="block text-xs text-muted-foreground" title={labels.raw}>
                        {fmt.format(flight.raw)}
                      </span>
                    </td>
                  ))}
                  <td className="px-3 py-2.5 text-right font-bold text-navy tabular-nums">
                    {fmt.format(row.total)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
