"use client"

import { useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Menu } from "lucide-react"

import { Link, usePathname } from "@/i18n/navigation"
import { navItems } from "@/lib/site-config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const t = useTranslations("nav")
  const tSite = useTranslations("site")

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-transparent">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="relative -ml-10 mt-14 h-[120px] w-[240px] sm:-ml-20 lg:-ml-24">
          <Image
            src="/images/brand/logo-event.png"
            alt={tSite("shortName")}
            fill
            sizes="240px"
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 font-heading text-sm font-semibold tracking-wide text-navy uppercase transition-colors hover:text-primary",
                  isActive && "underline decoration-2 underline-offset-8"
                )}
              >
                {t(item.key)}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <Button asChild size="sm">
            <Link href="/inscription">{t("register")}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
                <span className="sr-only">{t("openMenu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{tSite("shortName")}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2 font-heading text-sm font-semibold tracking-wide text-navy uppercase transition-colors hover:bg-muted",
                        isActive && "underline decoration-2 underline-offset-8"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
