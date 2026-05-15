// Database types for Supabase schema
// Stage 2: profiles table
// Stage 3+4: payments and payment_events tables

export type PaymentStatus =
  | "pending"
  | "processing"
  | "paid"
  | "failed"
  | "expired"
  | "cancelled"

export type PaymentNetwork = "tron"

export type PaymentMethodId = "USDT-TRON"

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
      payments: {
        Row: {
          id: string
          user_id: string
          profile_id: string
          provider: "btcpay"
          provider_invoice_id: string | null
          checkout_url: string | null
          amount: number
          currency: "USDT" | "USDt"
          network: PaymentNetwork
          payment_method_id: PaymentMethodId
          status: PaymentStatus
          created_at: string
          updated_at: string
          expires_at: string | null
          settled_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          profile_id: string
          provider?: "btcpay"
          provider_invoice_id?: string | null
          checkout_url?: string | null
          amount: number
          currency?: "USDT" | "USDt"
          network?: PaymentNetwork
          payment_method_id?: PaymentMethodId
          status?: PaymentStatus
          created_at?: string
          updated_at?: string
          expires_at?: string | null
          settled_at?: string | null
        }
        Update: {
          provider_invoice_id?: string | null
          checkout_url?: string | null
          status?: PaymentStatus
          updated_at?: string
          expires_at?: string | null
          settled_at?: string | null
        }
      }
      payment_events: {
        Row: {
          id: string
          payment_id: string | null
          provider: "btcpay"
          provider_invoice_id: string | null
          event_type: string
          event_id: string | null
          payload: Record<string, unknown>
          processed_at: string
        }
        Insert: {
          id?: string
          payment_id?: string | null
          provider?: "btcpay"
          provider_invoice_id?: string | null
          event_type: string
          event_id?: string | null
          payload: Record<string, unknown>
          processed_at?: string
        }
        Update: {
          event_type?: string
          payload?: Record<string, unknown>
        }
      }
    }
  }
}
