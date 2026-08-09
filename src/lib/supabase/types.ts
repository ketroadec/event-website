export type StatutInscription = "en_attente" | "confirme"

/** Champs envoyés par le formulaire d'inscription (table privée `inscriptions`). */
export type NouvelleInscription = {
  prenom: string
  nom: string
  nationalite: string
  adresse: string
  email: string
  telephone?: string
  federation?: string
  fai_licence: string
  categorie: string
  afm: boolean
  repas_samedi_midi: number
  repas_samedi_soir: number
  repas_dimanche_midi: number
}

/** Ligne publique affichée en temps réel (table `inscriptions_publiques`). */
export type InscriptionPublique = {
  id: string
  prenom: string
  nom: string
  categorie: string
  nationalite: string
  fai_licence: string
  afm: boolean
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
          nationalite: string
          adresse: string
          email: string
          telephone: string | null
          federation: string | null
          fai_licence: string
          categorie: string
          afm: boolean
          repas_samedi_midi: number
          repas_samedi_soir: number
          repas_dimanche_midi: number
          statut: StatutInscription
          created_at: string
        }
        Insert: {
          id?: string
          prenom: string
          nom: string
          nationalite: string
          adresse: string
          email: string
          telephone?: string | null
          federation?: string | null
          fai_licence: string
          categorie: string
          afm?: boolean
          repas_samedi_midi?: number
          repas_samedi_soir?: number
          repas_dimanche_midi?: number
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
