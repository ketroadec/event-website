"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Radio, Users } from "lucide-react"

import { categories, mainClasses, afmCategory } from "@/lib/site-config"
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
      <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Users className="size-4.5" />
          </span>
          <div>
            <CardTitle>{t("title")}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {t("participantCount", { count: inscriptions.length })}
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Radio className="size-3.5 text-emerald-500" />
          {t("realtime")}
        </span>
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
          <div className="space-y-6">
            {(() => {
              const knownValues = new Set<string>(mainClasses.map((c) => c.value))
              const uncategorized = inscriptions.filter((i) => !knownValues.has(i.categorie))

              const groups = [
                ...mainClasses.map((category) => ({
                  key: category.value,
                  label: categoryLabel(category.value),
                  members: inscriptions.filter((i) => i.categorie === category.value),
                })),
                {
                  key: afmCategory.value,
                  label: categoryLabel(afmCategory.value),
                  members: inscriptions.filter((i) => i.afm),
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
                  <div key={group.key}>
                    <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy uppercase">
                      {group.label}
                      <span className="text-xs font-normal text-muted-foreground">
                        ({group.members.length})
                      </span>
                    </h3>
                    <ul className="divide-y divide-border">
                      {group.members.map((inscription) => (
                        <li
                          key={inscription.id}
                          className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                        >
                          <div>
                            <p className="text-sm font-medium">
                              {inscription.nom} {inscription.prenom}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {inscription.nationalite}
                              {inscription.fai_licence && ` · FAI ${inscription.fai_licence}`}
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
