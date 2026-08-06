export type StatutInscription = "en_attente" | "confirme"

/** Champs envoyés par le formulaire d'inscription (table privée `inscriptions`). */
export type NouvelleInscription = {
  prenom: string
  nom: string
  email: string
  telephone?: string
  categorie: string
  club?: string
}

/** Ligne publique affichée en temps réel (table `inscriptions_publiques`). */
export type InscriptionPublique = {
  id: string
  prenom: string
  nom: string
  categorie: string
  statut: StatutInscription
  created_at: string
}

/** Schéma minimal utilisé pour typer le client Supabase (voir supabase/schema.sql). */
export type Database = {
  public: {
    Tables: {
      inscriptions: {
        Row: {
          id: string
          prenom: string
          nom: string
          email: string
          telephone: string | null
          categorie: string
          club: string | null
          statut: StatutInscription
          created_at: string
        }
        Insert: {
          id?: string
          prenom: string
          nom: string
          email: string
          telephone?: string | null
          categorie: string
          club?: string | null
          statut?: StatutInscription
          created_at?: string
        }
        Update: Partial<Database["public"]["Tables"]["inscriptions"]["Insert"]>
        Relationships: []
      }
      inscriptions_publiques: {
        Row: InscriptionPublique
        Insert: InscriptionPublique
        Update: Partial<InscriptionPublique>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
