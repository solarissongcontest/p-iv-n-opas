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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      courses: {
        Row: {
          archived: boolean
          code: string
          color: string
          created_at: string
          exam_date: string | null
          id: string
          name: string
          owner_id: string | null
          start_date: string | null
          study_mode: string
          subject: string | null
          target_system: string
          target_value: string | null
          updated_at: string
          weekly_minutes: number
        }
        Insert: {
          archived?: boolean
          code: string
          color?: string
          created_at?: string
          exam_date?: string | null
          id?: string
          name: string
          owner_id?: string | null
          start_date?: string | null
          study_mode?: string
          subject?: string | null
          target_system?: string
          target_value?: string | null
          updated_at?: string
          weekly_minutes?: number
        }
        Update: {
          archived?: boolean
          code?: string
          color?: string
          created_at?: string
          exam_date?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          start_date?: string | null
          study_mode?: string
          subject?: string | null
          target_system?: string
          target_value?: string | null
          updated_at?: string
          weekly_minutes?: number
        }
        Relationships: []
      }
      exams: {
        Row: {
          course_id: string
          created_at: string
          date: string
          id: string
          name: string
          owner_id: string | null
          target_system: string
          target_value: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          date: string
          id?: string
          name: string
          owner_id?: string | null
          target_system?: string
          target_value?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          date?: string
          id?: string
          name?: string
          owner_id?: string | null
          target_system?: string
          target_value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exams_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      mistakes: {
        Row: {
          course_id: string
          created_at: string
          error: string
          explanation: string | null
          id: string
          owner_id: string | null
          retry_date: string | null
          status: string
          topic_id: string | null
          type: string | null
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          error: string
          explanation?: string | null
          id?: string
          owner_id?: string | null
          retry_date?: string | null
          status?: string
          topic_id?: string | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          error?: string
          explanation?: string | null
          id?: string
          owner_id?: string | null
          retry_date?: string | null
          status?: string
          topic_id?: string | null
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mistakes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mistakes_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_settings: {
        Row: {
          exams: boolean
          id: string
          owner_id: string | null
          plan_changes: boolean
          study_sessions: boolean
          updated_at: string
          weekly_summary: boolean
        }
        Insert: {
          exams?: boolean
          id?: string
          owner_id?: string | null
          plan_changes?: boolean
          study_sessions?: boolean
          updated_at?: string
          weekly_summary?: boolean
        }
        Update: {
          exams?: boolean
          id?: string
          owner_id?: string | null
          plan_changes?: boolean
          study_sessions?: boolean
          updated_at?: string
          weekly_summary?: boolean
        }
        Relationships: []
      }
      plan_items: {
        Row: {
          course_id: string
          created_at: string
          date: string
          extra_minutes: number
          id: string
          kind: string
          min_minutes: number
          moved_from: string | null
          owner_id: string | null
          phase: string
          session_id: string | null
          start_time: string | null
          status: string
          target_minutes: number
          title: string | null
          topic_id: string | null
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          date: string
          extra_minutes?: number
          id?: string
          kind?: string
          min_minutes?: number
          moved_from?: string | null
          owner_id?: string | null
          phase?: string
          session_id?: string | null
          start_time?: string | null
          status?: string
          target_minutes?: number
          title?: string | null
          topic_id?: string | null
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          date?: string
          extra_minutes?: number
          id?: string
          kind?: string
          min_minutes?: number
          moved_from?: string | null
          owner_id?: string | null
          phase?: string
          session_id?: string | null
          start_time?: string | null
          status?: string
          target_minutes?: number
          title?: string | null
          topic_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "plan_items_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plan_items_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "study_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plan_items_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_tests: {
        Row: {
          course_id: string
          created_at: string
          date: string
          duration_minutes: number | null
          error_count: number | null
          id: string
          max_score: number | null
          owner_id: string | null
          score: number | null
          topic_results: Json
        }
        Insert: {
          course_id: string
          created_at?: string
          date?: string
          duration_minutes?: number | null
          error_count?: number | null
          id?: string
          max_score?: number | null
          owner_id?: string | null
          score?: number | null
          topic_results?: Json
        }
        Update: {
          course_id?: string
          created_at?: string
          date?: string
          duration_minutes?: number | null
          error_count?: number | null
          id?: string
          max_score?: number | null
          owner_id?: string | null
          score?: number | null
          topic_results?: Json
        }
        Relationships: [
          {
            foreignKeyName: "practice_tests_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      progress_events: {
        Row: {
          course_id: string | null
          created_at: string
          detail: string | null
          from_value: number | null
          id: string
          kind: string
          owner_id: string | null
          to_value: number | null
          topic_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          detail?: string | null
          from_value?: number | null
          id?: string
          kind: string
          owner_id?: string | null
          to_value?: number | null
          topic_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string
          detail?: string | null
          from_value?: number | null
          id?: string
          kind?: string
          owner_id?: string | null
          to_value?: number | null
          topic_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_events_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progress_events_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      study_sessions: {
        Row: {
          competence: number | null
          course_id: string
          created_at: string
          date: string
          did: string | null
          energy: number | null
          focus: number | null
          id: string
          kind: string
          method: string | null
          minutes: number
          note: string | null
          owner_id: string | null
          planned_minutes: number | null
          request_id: string | null
          tasks: string | null
          topic_id: string | null
          unclear: string | null
        }
        Insert: {
          competence?: number | null
          course_id: string
          created_at?: string
          date?: string
          did?: string | null
          energy?: number | null
          focus?: number | null
          id?: string
          kind?: string
          method?: string | null
          minutes?: number
          note?: string | null
          owner_id?: string | null
          planned_minutes?: number | null
          request_id?: string | null
          tasks?: string | null
          topic_id?: string | null
          unclear?: string | null
        }
        Update: {
          competence?: number | null
          course_id?: string
          created_at?: string
          date?: string
          did?: string | null
          energy?: number | null
          focus?: number | null
          id?: string
          kind?: string
          method?: string | null
          minutes?: number
          note?: string | null
          owner_id?: string | null
          planned_minutes?: number | null
          request_id?: string | null
          tasks?: string | null
          topic_id?: string | null
          unclear?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_sessions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          basic_successes: number
          course_id: string
          created_at: string
          delayed_successes: number
          dependencies: string[]
          exam_successes: number
          id: string
          importance: number
          last_review: string | null
          materials: string | null
          name: string
          next_review: string | null
          owner_id: string | null
          position: number
          progress: number
          school_covered: boolean
          self_level: number
          study_minutes: number
          updated_at: string
          verified_level: number
          weight: number
        }
        Insert: {
          basic_successes?: number
          course_id: string
          created_at?: string
          delayed_successes?: number
          dependencies?: string[]
          exam_successes?: number
          id?: string
          importance?: number
          last_review?: string | null
          materials?: string | null
          name: string
          next_review?: string | null
          owner_id?: string | null
          position?: number
          progress?: number
          school_covered?: boolean
          self_level?: number
          study_minutes?: number
          updated_at?: string
          verified_level?: number
          weight?: number
        }
        Update: {
          basic_successes?: number
          course_id?: string
          created_at?: string
          delayed_successes?: number
          dependencies?: string[]
          exam_successes?: number
          id?: string
          importance?: number
          last_review?: string | null
          materials?: string | null
          name?: string
          next_review?: string | null
          owner_id?: string | null
          position?: number
          progress?: number
          school_covered?: boolean
          self_level?: number
          study_minutes?: number
          updated_at?: string
          verified_level?: number
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "topics_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_checkins: {
        Row: {
          actual_minutes: number | null
          created_at: string
          id: string
          note: string | null
          owner_id: string | null
          planned_minutes: number | null
          week_start: string
        }
        Insert: {
          actual_minutes?: number | null
          created_at?: string
          id?: string
          note?: string | null
          owner_id?: string | null
          planned_minutes?: number | null
          week_start: string
        }
        Update: {
          actual_minutes?: number | null
          created_at?: string
          id?: string
          note?: string | null
          owner_id?: string | null
          planned_minutes?: number | null
          week_start?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      log_study_session: {
        Args: {
          p_request_id: string
          p_course_id: string
          p_topic_id: string | null
          p_date: string
          p_minutes: number
          p_planned_minutes: number | null
          p_kind: string
          p_competence: number | null
          p_unclear: string | null
          p_did: string | null
          p_focus: number | null
          p_method: string | null
          p_energy: number | null
          p_tasks: string | null
          p_note: string | null
          p_plan_item_id: string | null
        }
        Returns: string
      }
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
