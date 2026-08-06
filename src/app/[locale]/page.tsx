import { CalendarDays, MapPin, Trophy, Users, ArrowRight, PlaneTakeoff } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("home")
  const tSite = await getTranslations("site")

  const highlights = [
    { icon: CalendarDays, label: t("highlights.dates"), value: tSite("eventDates") },
    { icon: MapPin, label: t("highlights.lieu"), value: tSite("eventLocation") },
    {
      icon: Trophy,
      label: t("highlights.categories"),
      value: t("highlights.categoriesValue"),
    },
    { icon: Users, label: t("highlights.ouvert"), value: t("highlights.ouvertValue") },
  ]

  const sections = [
    { key: "programme", href: "/programme" },
    { key: "reglement", href: "/reglement" },
    { key: "informations", href: "/informations" },
  ] as const

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-accent/60 via-background to-background"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
              <PlaneTakeoff className="size-3.5 text-primary" />
              {t("badge")}
            </span>
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              {tSite("name")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-balance">
              {tSite("description")}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/inscription">
                  {t("ctaRegister")}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/programme">{t("ctaProgramme")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <Card key={item.label}>
              <CardHeader>
                <span className="mb-2 flex size-9 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <item.icon className="size-4.5" />
                </span>
                <CardTitle className="text-sm text-muted-foreground">
                  {item.label}
                </CardTitle>
                <CardDescription className="text-base font-medium text-foreground">
                  {item.value}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3">
          {sections.map((section) => (
            <Card key={section.key}>
              <CardHeader>
                <CardTitle>{t(`sections.${section.key}.title`)}</CardTitle>
                <CardDescription>
                  {t(`sections.${section.key}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="px-0">
                  <Link href={section.href}>
                    {t(`sections.${section.key}.cta`)} <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
