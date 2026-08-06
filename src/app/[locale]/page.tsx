import Image from "next/image"
import { CalendarDays, MapPin, Trophy, Users, ArrowRight, PlaneTakeoff } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Countdown } from "@/components/countdown"
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
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#170a2e] via-[#5a1461] to-[#d41a7c]">
        {/* Halo décoratif */}
        <div
          className="absolute -top-32 -right-32 -z-0 size-[520px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.12)_0%,_transparent_70%)]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-14 pb-28 sm:px-6 sm:pt-20 sm:pb-36">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Texte */}
            <div className="text-center lg:text-left">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                <PlaneTakeoff className="size-3.5 text-[#ff5fa8]" />
                {t("badge")}
              </span>

              <h1 className="font-heading text-4xl leading-[1.05] font-bold text-balance text-white sm:text-5xl lg:text-6xl">
                {t("heroTitleLine1")}
                <br />
                <span className="text-[#ff5fa8]">{t("heroTitleLine2")}</span>
              </h1>

              <div className="mt-5 flex flex-col items-center gap-2 text-sm text-white/80 sm:flex-row sm:justify-center lg:justify-start">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-4 text-[#ff5fa8]" />
                  {tSite("eventDates")}
                </span>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4 text-[#ff5fa8]" />
                  {tSite("eventLocation")}
                </span>
              </div>

              <p className="mx-auto mt-5 max-w-md text-white/70 lg:mx-0">
                {tSite("description")}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#c81e78] hover:bg-white/90"
                >
                  <Link href="/inscription">
                    {t("ctaRegister")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/programme">{t("ctaProgramme")}</Link>
                </Button>
              </div>
            </div>

            {/* Photo */}
            <div className="relative mx-auto flex size-64 items-center justify-center sm:size-80 lg:size-96">
              <div
                className="absolute inset-0 rounded-full border border-white/15"
                aria-hidden
              />
              <div
                className="absolute inset-6 rounded-full border border-dashed border-white/25"
                aria-hidden
              />
              <div className="relative size-[85%] overflow-hidden rounded-full shadow-2xl ring-4 ring-white/15">
                <Image
                  src="/images/hero-pilote.jpg"
                  alt={tSite("name")}
                  fill
                  sizes="(min-width: 1024px) 384px, 320px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vague de transition */}
        <svg
          className="absolute inset-x-0 bottom-0 h-16 w-full text-background sm:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,64 C360,120 1080,0 1440,64 L1440,120 L0,120 Z" fill="currentColor" />
        </svg>
      </section>

      {/* Compte à rebours, à cheval sur le hero et le contenu */}
      <div className="relative z-10 mx-auto -mt-10 max-w-3xl px-4 sm:-mt-12 sm:px-6">
        <Countdown />
      </div>

      <section className="mx-auto max-w-6xl px-4 pt-12 pb-16 sm:px-6 sm:pt-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <Card key={item.label}>
              <CardHeader>
                <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
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
