import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://tjaqyqghwtekdmdqesep.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqYXF5cWdod3Rla2RtZHFlc2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNzMwMjEsImV4cCI6MjA3MTY0OTAyMX0.dzsNcEApLUDD98u3DjB5Ki9_Om2FM0ejabkX1EeBDFc"

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Review {
  id: number
  name: string
  rating: number
  comment: string
  created_at: string
}
