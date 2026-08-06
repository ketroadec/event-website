import { createClient, type SupabaseClient } from "@supabase/supabase-js"

import type { Database } from "@/lib/supabase/types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let client: SupabaseClient<Database> | null = null

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

/**
 * Client Supabase côté navigateur, utilisé pour :
 * - envoyer le formulaire d'inscription (insert dans `inscriptions`)
 * - s'abonner en temps réel à `inscriptions_publiques`
 *
 * N'utilise que la clé "anon" (publique) : voir supabase/schema.sql pour les
 * règles RLS qui limitent ce que ce client peut lire/écrire.
 *
 * Retourne `null` tant que NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY ne sont pas
 * renseignées, pour permettre à l'UI d'afficher un message plutôt que de
 * planter (voir isSupabaseConfigured).
 */
export function getSupabaseClient() {
  if (!isSupabaseConfigured) return null

  if (!client) {
    client = createClient<Database>(supabaseUrl!, supabaseAnonKey!)
  }

  return client
}
