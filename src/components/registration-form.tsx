"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useLocale, useTranslations } from "next-intl"
import { CheckCircle2, Loader2 } from "lucide-react"

import { mainClasses, afmCategory } from "@/lib/site-config"
import { getCountryOptions } from "@/lib/countries"
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Temporaire : seule la catégorie F3P-A est ouverte aux inscriptions pour le
// moment (F3P-AA et Nationale A ouvrent le 1er octobre). Repasser à
// `mainClasses` telles quelles quand toutes les classes seront ouvertes.
const availableClasses = mainClasses.filter((cat) => cat.value === "f3p-a")

export function RegistrationForm() {
  const t = useTranslations("inscription.form")
  const tCategories = useTranslations("categories")
  const locale = useLocale()
  const countryOptions = useMemo(() => getCountryOptions(locale), [locale])

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const formSchema = useMemo(
    () =>
      z.object({
        prenom: z.string().trim().min(1, t("validation.prenomRequired")),
        nom: z.string().trim().min(1, t("validation.nomRequired")),
        nationalite: z.string().trim().min(1, t("validation.nationaliteRequired")),
        adresse: z.string().trim().min(1, t("validation.adresseRequired")),
        email: z
          .string()
          .trim()
          .min(1, t("validation.emailRequired"))
          .email(t("validation.emailInvalid")),
        telephone: z.string().trim().optional(),
        federation: z.string().trim().optional(),
        fai_licence: z.string().trim().min(1, t("validation.faiLicenceRequired")),
        categorie: z.string().min(1, t("validation.categorieRequired")),
        afm: z.boolean(),
      }),
    [t]
  )

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      nationalite: "",
      adresse: "",
      email: "",
      telephone: "",
      federation: "",
      fai_licence: "",
      categorie: "",
      afm: false,
    },
  })

  async function onSubmit(values: FormValues) {
    setStatus("submitting")
    setErrorMessage(null)

    try {
      const supabase = getSupabaseClient()
      if (!supabase) {
        throw new Error(t("notConfigured"))
      }
      const { error } = await supabase.from("inscriptions").insert({
        prenom: values.prenom,
        nom: values.nom,
        nationalite: values.nationalite,
        adresse: values.adresse,
        email: values.email,
        telephone: values.telephone || null,
        federation: values.federation || null,
        fai_licence: values.fai_licence,
        categorie: values.categorie,
        afm: values.afm,
      })

      if (error) throw error

      setStatus("success")
      form.reset()
    } catch (err) {
      setStatus("error")
      setErrorMessage(err instanceof Error ? err.message : t("genericError"))
    }
  }

  if (status === "success") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <CheckCircle2 className="size-6" />
          </span>
          <CardTitle>{t("successTitle")}</CardTitle>
          <CardDescription>{t("successDescription")}</CardDescription>
          <Button variant="outline" onClick={() => setStatus("idle")} className="mt-2">
            {t("registerAnother")}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="prenom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("prenom")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("prenomPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("nom")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("nomPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nationalite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("nationalite")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("nationalitePlaceholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countryOptions.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          <span aria-hidden>{country.flag}</span>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="adresse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("adresse")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("adressePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t("emailPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("telephone")}</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder={t("telephonePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="federation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("federation")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("federationPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fai_licence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("faiLicence")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("faiLicencePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="categorie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("categorie")}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t("categoriePlaceholder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableClasses.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {tCategories(cat.key)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="afm"
                render={({ field }) => (
                  <FormItem className="mt-3 flex flex-row items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t("afmLabel")} ({tCategories(afmCategory.key)})
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {!isSupabaseConfigured && (
              <p className="text-sm font-medium text-destructive">
                {t("notConfigured")}
              </p>
            )}

            {status === "error" && (
              <p className="text-sm font-medium text-destructive">{errorMessage}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={status === "submitting" || !isSupabaseConfigured}
            >
              {status === "submitting" && <Loader2 className="size-4 animate-spin" />}
              {t("submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
