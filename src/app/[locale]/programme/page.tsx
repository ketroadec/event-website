import type { Metadata } from "next"
import { Clock } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PageHero } from "@/components/page-hero"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "programme" })
  return { title: t("title"), description: t("description") }
}

type ProgrammeEvent = { time: string; title: string }

export default async function ProgrammePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("programme")
  const days = [
    { key: "day1" as const, events: t.raw("day1.events") as ProgrammeEvent[] },
    { key: "day2" as const, events: t.raw("day2.events") as ProgrammeEvent[] },
  ]

  return (
    <div>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-14 sm:px-6">
        {days.map((day) => (
          <section key={day.key}>
            <div className="mb-4 flex items-baseline gap-3">
              <h2 className="font-heading text-xl font-semibold">
                {t(`${day.key}.label`)}
              </h2>
              <Badge variant="secondary">{t("dateTbd")}</Badge>
            </div>
            <Card>
              <CardContent className="divide-y divide-border">
                {day.events.map((event) => (
                  <div
                    key={event.time + event.title}
                    className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <span className="flex items-center gap-1.5 text-sm font-medium text-primary whitespace-nowrap">
                      <Clock className="size-3.5" />
                      {event.time}
                    </span>
                    <span className="text-sm text-foreground">{event.title}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        ))}
      </div>
    </div>
  )
}
