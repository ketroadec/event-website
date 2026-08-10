"use client"

import { useEffect, useMemo, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Users } from "lucide-react"

import { categories, mainClasses, afmCategory } from "@/lib/site-config"
import { getCountryOptions } from "@/lib/countries"
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client"
import type { InscriptionPublique } from "@/lib/supabase/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function useCategoryLabel() {
  const tCategories = useTranslations("categories")
  return (value: string) => {
    const cat = categories.find((c) => c.value === value)
    return cat ? tCategories(cat.key) : value
  }
}

function StatutBadge({ statut }: { statut: InscriptionPublique["statut"] }) {
  const t = useTranslations("inscription.list")
  if (statut === "confirme") {
    return (
      <Badge className="bg-emerald-600 text-white dark:bg-emerald-500">
        {t("statusConfirmed")}
      </Badge>
    )
  }
  return <Badge variant="secondary">{t("statusPending")}</Badge>
}

export function InscriptionsList() {
  const t = useTranslations("inscription.list")
  const categoryLabel = useCategoryLabel()
  const locale = useLocale()

  // Nom de pays -> drapeau, pour afficher la nationalité de façon lisible.
  const countryFlags = useMemo(() => {
    const map = new Map<string, string>()
    for (const country of getCountryOptions(locale)) {
      map.set(country.name, country.flag)
    }
    return map
  }, [locale])

  const [inscriptions, setInscriptions] = useState<InscriptionPublique[]>([])
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    const supabase = getSupabaseClient()
    if (!supabase) return

    let isMounted = true

    async function loadInitial(sb: NonNullable<typeof supabase>) {
      const { data, error } = await sb
        .from("inscriptions_publiques")
        .select("id, prenom, nom, categorie, nationalite, fai_licence, afm, statut, created_at")
        .order("created_at", { ascending: true })

      if (!isMounted) return
      if (!error && data) {
        setInscriptions(data as InscriptionPublique[])
      }
      setLoading(false)
    }

    loadInitial(supabase)

    const channel = supabase
      .channel("inscriptions-publiques-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "inscriptions_publiques" },
        (payload) => {
          setInscriptions((current) => {
            if (payload.eventType === "INSERT") {
              const row = payload.new as InscriptionPublique
              if (current.some((i) => i.id === row.id)) return current
              return [...current, row]
            }
            if (payload.eventType === "UPDATE") {
              const row = payload.new as InscriptionPublique
              return current.map((i) => (i.id === row.id ? row : i))
            }
            if (payload.eventType === "DELETE") {
              const row = payload.old as InscriptionPublique
              return current.filter((i) => i.id !== row.id)
            }
            return current
          })
        }
      )
      .subscribe()

    return () => {
      isMounted = false
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Users className="size-4.5" />
        </span>
        <div>
          <CardTitle>{t("title")}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {t("participantCount", { count: inscriptions.length })}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        {!isSupabaseConfigured ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {t("notConfigured")}
          </p>
        ) : loading ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {t("loading")}
          </p>
        ) : inscriptions.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {t("empty")}
          </p>
        ) : (
          <div className="space-y-5">
            {(() => {
              const knownValues = new Set<string>(mainClasses.map((c) => c.value))
              const uncategorized = inscriptions.filter((i) => !knownValues.has(i.categorie))

              // Ordre d'affichage imposé : F3P-A, F3P-AFM, F3P-AA, puis National A.
              const groups = [
                {
                  key: "f3p-a",
                  label: categoryLabel("f3p-a"),
                  members: inscriptions.filter((i) => i.categorie === "f3p-a"),
                },
                {
                  key: afmCategory.value,
                  label: categoryLabel(afmCategory.value),
                  members: inscriptions.filter((i) => i.afm),
                },
                {
                  key: "f3p-aa",
                  label: categoryLabel("f3p-aa"),
                  members: inscriptions.filter((i) => i.categorie === "f3p-aa"),
                },
                {
                  key: "national-a",
                  label: categoryLabel("national-a"),
                  members: inscriptions.filter((i) => i.categorie === "national-a"),
                },
                // Filet de sécurité : une inscription dont la catégorie ne correspond à
                // aucune classe connue (donnée ancienne/incohérente) doit rester visible
                // plutôt que de disparaître silencieusement de la liste.
                {
                  key: "uncategorized",
                  label: t("uncategorized"),
                  members: uncategorized,
                },
              ]

              return groups.map((group) => {
                if (group.members.length === 0) return null

                return (
                  <div
                    key={group.key}
                    className="overflow-hidden rounded-xl border border-border"
                  >
                    <div className="flex items-center justify-between gap-3 bg-navy px-4 py-2.5">
                      <h3 className="font-heading text-sm font-bold tracking-wide text-white uppercase">
                        {group.label}
                      </h3>
                      <Badge variant="secondary">{group.members.length}</Badge>
                    </div>
                    <ul className="divide-y divide-border">
                      {group.members.map((inscription) => (
                        <li
                          key={inscription.id}
                          className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
                        >
                          <div>
                            <p className="text-sm font-semibold text-navy">
                              {inscription.nom} {inscription.prenom}
                            </p>
                            <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                              <span>
                                {countryFlags.get(inscription.nationalite) && (
                                  <span aria-hidden className="mr-1">
                                    {countryFlags.get(inscription.nationalite)}
                                  </span>
                                )}
                                {inscription.nationalite || "—"}
                              </span>
                              {inscription.fai_licence && (
                                <span>FAI {inscription.fai_licence}</span>
                              )}
                            </p>
                          </div>
                          <StatutBadge statut={inscription.statut} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
