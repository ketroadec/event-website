"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

import { EVENT_DATE_ISO } from "@/lib/site-config"

function getTimeLeft() {
  const diff = new Date(EVENT_DATE_ISO).getTime() - Date.now()
  const clamped = Math.max(diff, 0)

  return {
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
    isOver: diff <= 0,
  }
}

export function Countdown() {
  const t = useTranslations("countdown")
  // `null` pendant le premier rendu serveur pour éviter un mismatch
  // d'hydratation (le temps écoulé dépend de l'heure de la requête).
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null)

  useEffect(() => {
    // Calculé uniquement après montage : le temps restant dépend de l'heure
    // du client, le calculer pendant le rendu serveur créerait un mismatch
    // d'hydratation avec le rendu client initial.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(getTimeLeft())
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [])

  const units = [
    { key: "days", value: timeLeft?.days },
    { key: "hours", value: timeLeft?.hours },
    { key: "minutes", value: timeLeft?.minutes },
    { key: "seconds", value: timeLeft?.seconds },
  ] as const

  return (
    <div className="grid grid-cols-4 divide-x divide-white/15">
      {units.map((unit) => (
        <div key={unit.key} className="flex flex-col items-center gap-1 px-3 sm:px-5">
          <span className="font-display text-3xl text-white tabular-nums sm:text-5xl">
            {unit.value === undefined ? "–" : String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-[11px] font-medium text-white/60 uppercase sm:text-xs">
            {t(unit.key)}
          </span>
        </div>
      ))}
    </div>
  )
}
