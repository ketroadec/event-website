"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslations } from "next-intl"
import { CheckCircle2, Loader2 } from "lucide-react"

import { categories } from "@/lib/site-config"
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export function RegistrationForm() {
  const t = useTranslations("inscription.form")
  const tCategories = useTranslations("categories")

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const formSchema = useMemo(
    () =>
      z.object({
        prenom: z.string().trim().min(1, t("validation.prenomRequired")),
        nom: z.string().trim().min(1, t("validation.nomRequired")),
        email: z
          .string()
          .trim()
          .min(1, t("validation.emailRequired"))
          .email(t("validation.emailInvalid")),
        telephone: z.string().trim().optional(),
        categorie: z.string().min(1, t("validation.categorieRequired")),
        club: z.string().trim().optional(),
      }),
    [t]
  )

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      email: "",
      telephone: "",
      categorie: "",
      club: "",
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
        email: values.email,
        telephone: values.telephone || null,
        categorie: values.categorie,
        club: values.club || null,
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
                        {categories.map((cat) => (
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
                name="club"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("club")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("clubPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
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
