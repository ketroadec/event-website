import Image from "next/image"
import { CalendarDays, MapPin, Ruler, Trophy, ArrowRight } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { partners } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import { Countdown } from "@/components/countdown"

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("home")
  const tSite = await getTranslations("site")
  const tPartners = await getTranslations("partners")
  const tCountdown = await getTranslations("countdown")
  const tNews = await getTranslations("news")

  const infoList = [
    { icon: CalendarDays, label: tSite("eventDates") },
    { icon: MapPin, label: `${tSite("eventVenue")} — ${tSite("eventLocation")}` },
    { icon: Ruler, label: t("ceilingHeight") },
    { icon: Trophy, label: t("highlights.categoriesValue") },
  ]

  const cards = [
    { key: "selestat" as const, src: "/images/brand/city.png" },
    { key: "venue" as const, src: "/images/brand/venue.png" },
    { key: "pilots" as const, src: "/images/brand/pilot.png" },
  ]

  const newsItems = [
    { key: "registrations" as const, src: "/images/brand/news-bg.png", href: "/inscription" },
    { key: "venue" as const, src: "/images/brand/venue2.png", href: "/informations" },
    { key: "priority" as const, src: "/images/brand/venue3.png", href: "/inscription" },
  ]

  const practicalItems = [
    {
      key: "registration" as const,
      icon: "/images/brand/icon-registration.png",
      href: "/inscription",
    },
    { key: "schedule" as const, icon: "/images/brand/icon-schedule.png", href: "/programme" },
    { key: "pilotInfo" as const, icon: "/images/brand/icon-docs.png", href: "/reglement" },
    {
      key: "accommodation" as const,
      icon: "/images/brand/icon-home.png",
      href: "/informations",
    },
    { key: "access" as const, icon: "/images/brand/icon-location.png", href: "/informations" },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-white">
        <Image
          src="/images/brand/hero-background.png"
          alt=""
          fill
          aria-hidden
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="pointer-events-none absolute top-8 right-45 z-20 h-[179.2px] w-[179.2px] translate-x-1/4">
          <Image
            src="/images/brand/fai-logo.png"
            alt="FAI"
            fill
            sizes="160px"
            className="object-contain"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-28 pb-14 sm:px-6 sm:pt-32">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <p className="font-display text-xl text-navy italic sm:text-2xl">
                {tSite("eventDates")}
              </p>

              <h1 className="font-display leading-[0.9] text-balance">
                <span className="block text-6xl text-primary sm:text-7xl lg:text-8xl">
                  {t("heroTitleLine1")}
                </span>
                <span className="my-1 block font-heading text-base font-semibold tracking-[0.4em] text-navy sm:text-lg">
                  {t("heroTitleLine2")}
                </span>
                <span className="block text-5xl text-primary italic sm:text-6xl lg:text-7xl">
                  {t("heroTitleLine3")}
                </span>
              </h1>

              <p className="mt-4 font-heading text-lg font-extrabold tracking-wide text-navy uppercase sm:text-xl">
                {tSite("tagline")}
              </p>
              <p className="mt-1 font-heading text-sm font-bold tracking-wide text-primary uppercase">
                {t("badge")}
              </p>

              <div className="mt-7 flex justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-navy hover:bg-navy-light">
                  <Link href="/informations">{t("ctaDiscover")}</Link>
                </Button>
              </div>
            </div>

            <div className="pointer-events-none absolute top-[67%] right-[25%] z-0 aspect-square w-[clamp(16.2288rem,34.776vw,64.9152rem)] translate-x-1/2 -translate-y-1/2">
              <Image
                src="/images/brand/hero-aircraft.png"
                alt={tSite("name")}
                fill
                sizes="64.9152rem"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bandeau compte à rebours */}
      <div className="relative z-20 overflow-hidden bg-navy">
        <Image
          src="/images/brand/footer-bg.png"
          alt=""
          fill
          aria-hidden
          className="object-cover opacity-70"
        />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 py-6 sm:flex-row sm:px-6">
          <p className="font-heading text-xs font-bold tracking-[0.2em] text-white/70 uppercase sm:text-sm">
            {tCountdown("startsIn")}
          </p>
          <Countdown />
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/inscription">
              {t("ctaRegister")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* À propos + photos */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              {tSite("shortName")}
            </p>
            <h2 className="font-heading text-2xl font-bold text-balance sm:text-3xl">
              {t("aboutHeading")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("aboutBody")}</p>

            <ul className="mt-6 space-y-3">
              {infoList.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <item.icon className="size-4" />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>

            <Button asChild className="mt-7">
              <Link href="/informations">
                {t("aboutCta")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {cards.map((card) => (
              <div
                key={card.key}
                className="overflow-hidden rounded-xl ring-1 ring-border"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={card.src}
                    alt={t(`cards.${card.key}.alt`)}
                    fill
                    sizes="(min-width: 768px) 200px, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="bg-navy px-2 py-1.5">
                  <p className="truncate text-[11px] font-bold text-white uppercase">
                    {t(`cards.${card.key}.title`)}
                  </p>
                </div>
                <div className="bg-card px-2 py-2">
                  <p className="line-clamp-2 text-[11px] text-muted-foreground">
                    {t(`cards.${card.key}.body`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Actualités */}
      <section className="border-t border-border/60 bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold uppercase">{tNews("heading")}</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {newsItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="group overflow-hidden rounded-xl bg-card ring-1 ring-border transition-shadow hover:shadow-md"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={item.src}
                    alt={tNews(`items.${item.key}.title`)}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground">
                    {tNews(`items.${item.key}.date`)}
                  </p>
                  <h3 className="mt-1 font-heading font-semibold text-balance">
                    {tNews(`items.${item.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tNews(`items.${item.key}.excerpt`)}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {tNews("readMore")}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Informations pratiques */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/images/brand/footer-bg.png"
          alt=""
          fill
          aria-hidden
          className="object-cover opacity-70"
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="w-full">
              <h2 className="font-display text-2xl text-white uppercase sm:text-3xl">
                {t("practical.heading")}
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {practicalItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="flex flex-col items-center gap-2 rounded-xl border border-white/15 px-3 py-5 text-center transition-colors hover:bg-white/5"
                  >
                    <Image src={item.icon} alt="" width={125} height={100} className="size-10" />
                    <span className="text-xs font-semibold text-white uppercase">
                      {t(`practical.${item.key}.title`)}
                    </span>
                    <span className="text-[11px] text-white/60">
                      {t(`practical.${item.key}.body`)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <div className="relative h-14 w-16 rounded bg-white/90 p-1">
                <Image
                  src="/images/brand/logo-event.png"
                  alt={tSite("shortName")}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div className="relative h-14 w-14 rounded bg-white/90 p-1">
                <Image src="/images/brand/fai-logo.png" alt="FAI" fill sizes="56px" className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partenaires & organisateurs */}
      <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
        <p className="mb-8 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          {tPartners("heading")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {partners.map((partner) =>
            partner.logo ? (
              <div key={partner.name} className="relative h-12 w-28">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="112px"
                  className="object-contain grayscale transition hover:grayscale-0"
                />
              </div>
            ) : (
              <span
                key={partner.name}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground"
              >
                {partner.name}
              </span>
            )
          )}
        </div>
      </section>
    </div>
  )
}
