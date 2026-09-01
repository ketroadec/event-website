"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Lock } from "lucide-react"

import { RegistrationForm } from "@/components/registration-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function RegistrationGate() {
  const [unlocked, setUnlocked] = useState(false)
  const t = useTranslations("inscription")
  const tNav = useTranslations("nav")

  if (unlocked) {
    return <RegistrationForm />
  }

  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none blur-sm select-none">
        <RegistrationForm />
      </div>

      <div className="absolute inset-0 flex items-start justify-center pt-10">
        <div className="mx-4 w-full max-w-sm overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-xl">
          <div className="flex flex-col items-center gap-3 bg-navy px-6 py-6 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white">
              <Lock className="size-5" />
            </span>
            <p className="font-heading text-base font-bold tracking-wide text-white uppercase">
              {t("comingSoonTitle")}
            </p>
          </div>
          <div className="divide-y divide-border">
            <div className="flex items-center justify-between gap-3 px-5 py-3.5">
              <span className="text-sm font-semibold text-navy">
                {t("priorityCategories")}
              </span>
              <Badge className="bg-emerald-600 text-white dark:bg-emerald-500">
                {t("statusOpen")}
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-3 px-5 py-3.5">
              <span className="text-sm font-semibold text-navy">
                {t("laterCategories")}
              </span>
              <span className="text-sm text-muted-foreground">{t("laterDate")}</span>
            </div>
          </div>
          <div className="px-5 pt-1 pb-5">
            <Button className="w-full" onClick={() => setUnlocked(true)}>
              {tNav("register")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
