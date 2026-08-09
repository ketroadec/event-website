import Image from "next/image"
import { CalendarDays, MapPin, Ruler, Trophy, ArrowRight } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Link } from "@/i18n/navigation"
import { partners } from "@/lib/site-config"
import { cn } from "@/lib/utils"
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
              <p className="font-display text-[1.375rem] text-navy italic sm:text-[1.65rem]">
                {tSite("eventDates")}
              </p>

              <h1 className="relative mx-auto aspect-[1224/740] w-64 sm:w-80 lg:mx-0 lg:w-96">
                <Image
                  src="/images/brand/logo-event.png"
                  alt={tSite("name")}
                  fill
                  sizes="(min-width: 1024px) 384px, 320px"
                  className="object-contain object-center lg:object-left"
                  priority
                />
              </h1>

              <p className="mt-4 font-heading text-lg font-extrabold tracking-wide text-navy uppercase sm:text-xl">
                {tSite("tagline")}
              </p>
              <p className="mt-1 font-heading text-sm font-bold tracking-wide text-primary uppercase">
                {t("badge")}
              </p>

              <div className="mt-7 flex justify-center lg:justify-start">
                <Button asChild size="lg" className="rounded-none bg-navy uppercase hover:bg-navy-light">
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
          <Button asChild className="rounded-none bg-[#0281fd] uppercase hover:bg-[#0281fd]/90">
            <Link href="/inscription">
              {t("ctaRegister")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* À propos + photos */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <h2 className="font-heading text-2xl font-bold text-balance text-navy uppercase sm:text-3xl">
              {t("aboutHeading")}
            </h2>
            <p className="mt-4 text-navy">{t("aboutBody")}</p>

            <ul className="mt-6 space-y-3">
              {infoList.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm text-navy">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <item.icon className="size-4" />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>

            <Button asChild className="mt-7 rounded-none">
              <Link href="/informations">
                {t("aboutCta")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid h-full grid-cols-3 gap-3 py-6 md:col-span-2">
            {cards.map((card) => (
              <div key={card.key} className="flex h-full flex-col overflow-hidden ring-1 ring-border">
                <div className="relative w-full flex-1">
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
                <div className="min-h-[46px] bg-card px-2 py-2">
                  <p className="line-clamp-2 text-[11px] text-navy">
                    {t(`cards.${card.key}.body`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Informations pratiques */}
      <section className="relative overflow-hidden bg-navy">
        <Image
          src="/images/brand/blue-brush.png"
          alt=""
          fill
          aria-hidden
          className="object-cover opacity-70"
        />
        <div className="relative z-10 mx-auto max-w-6xl px-2 py-7 sm:px-3">
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
                    <Image
                      src={item.icon}
                      alt=""
                      width={125}
                      height={100}
                      className="h-10 w-auto object-contain"
                    />
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
          </div>
        </div>
      </section>

      {/* Partenaires & organisateurs */}
      <section className="mx-auto max-w-5xl px-2 py-8 text-center sm:px-3">
        <p className="mb-8 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          {tPartners("heading")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {partners.map((partner) =>
            partner.logo ? (
              <Image
                key={partner.name}
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className={cn(
                  "block w-auto self-center object-contain",
                  partner.logo === "/images/brand/logo-selestat.png" ? "h-12" : "h-24"
                )}
              />
            ) : (
              <span
                key={partner.name}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-navy"
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
