export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          badge_type: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_type: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_type?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      meal_plans: {
        Row: {
          created_at: string
          day_of_week: number
          id: string
          ingredients: Json | null
          meal_type: string
          recipe_name: string
          user_id: string
          week_start: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          id?: string
          ingredients?: Json | null
          meal_type: string
          recipe_name: string
          user_id: string
          week_start: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          id?: string
          ingredients?: Json | null
          meal_type?: string
          recipe_name?: string
          user_id?: string
          week_start?: string
        }
        Relationships: []
      }
      pantry_items: {
        Row: {
          added_at: string
          category: string | null
          emoji: string | null
          expiry_date: string | null
          id: string
          name: string
          quantity: number | null
          unit: string | null
          user_id: string
        }
        Insert: {
          added_at?: string
          category?: string | null
          emoji?: string | null
          expiry_date?: string | null
          id?: string
          name: string
          quantity?: number | null
          unit?: string | null
          user_id: string
        }
        Update: {
          added_at?: string
          category?: string | null
          emoji?: string | null
          expiry_date?: string | null
          id?: string
          name?: string
          quantity?: number | null
          unit?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ai_personality: string | null
          avatar_url: string | null
          created_at: string
          dietary_preference: string | null
          display_name: string | null
          family_size: number | null
          favorite_store: string | null
          id: string
          quality_preference: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ai_personality?: string | null
          avatar_url?: string | null
          created_at?: string
          dietary_preference?: string | null
          display_name?: string | null
          family_size?: number | null
          favorite_store?: string | null
          id?: string
          quality_preference?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ai_personality?: string | null
          avatar_url?: string | null
          created_at?: string
          dietary_preference?: string | null
          display_name?: string | null
          family_size?: number | null
          favorite_store?: string | null
          id?: string
          quality_preference?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      shopping_list_items: {
        Row: {
          category: string | null
          checked_at: string | null
          emoji: string | null
          health_flags: string[] | null
          id: string
          is_checked: boolean | null
          list_id: string
          name: string
          price: number | null
          quantity: number | null
          reason: string | null
          unit: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          checked_at?: string | null
          emoji?: string | null
          health_flags?: string[] | null
          id?: string
          is_checked?: boolean | null
          list_id: string
          name: string
          price?: number | null
          quantity?: number | null
          reason?: string | null
          unit?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          checked_at?: string | null
          emoji?: string | null
          health_flags?: string[] | null
          id?: string
          is_checked?: boolean | null
          list_id?: string
          name?: string
          price?: number | null
          quantity?: number | null
          reason?: string | null
          unit?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopping_list_items_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "shopping_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_lists: {
        Row: {
          budget: number | null
          completed_at: string | null
          created_at: string
          id: string
          is_completed: boolean | null
          name: string
          purpose: string | null
          quality: string | null
          store: string | null
          total_amount: number | null
          user_id: string
        }
        Insert: {
          budget?: number | null
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          name?: string
          purpose?: string | null
          quality?: string | null
          store?: string | null
          total_amount?: number | null
          user_id: string
        }
        Update: {
          budget?: number | null
          completed_at?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          name?: string
          purpose?: string | null
          quality?: string | null
          store?: string | null
          total_amount?: number | null
          user_id?: string
        }
        Relationships: []
      }
      spending_records: {
        Row: {
          amount: number
          category: string
          id: string
          list_id: string | null
          recorded_at: string
          saved_amount: number | null
          store: string | null
          user_id: string
        }
        Insert: {
          amount: number
          category: string
          id?: string
          list_id?: string | null
          recorded_at?: string
          saved_amount?: number | null
          store?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          category?: string
          id?: string
          list_id?: string | null
          recorded_at?: string
          saved_amount?: number | null
          store?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "spending_records_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "shopping_lists"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
