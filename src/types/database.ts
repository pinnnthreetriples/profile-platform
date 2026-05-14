// Database types for Supabase schema
// Stage 2: profiles table added

export type PaymentStatus = "pending" | "paid" | "failed" | "expired" | "cancelled"

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          payment_status: PaymentStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          payment_status?: PaymentStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          payment_status?: PaymentStatus
          updated_at?: string
        }
      }
    }
  }
}
