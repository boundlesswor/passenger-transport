import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

const supabaseUrl = "https://tjaqyqghwtekdmdqesep.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqYXF5cWdod3Rla2RtZHFlc2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwNzMwMjEsImV4cCI6MjA3MTY0OTAyMX0.dzsNcEApLUDD98u3DjB5Ki9_Om2FM0ejabkX1EeBDFc"

const supabase = createClient(supabaseUrl, supabaseKey)

// GET - получить все отзывы
export async function GET() {
  try {
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Ошибка получения отзывов:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Получено отзывов:", reviews?.length || 0)
    return NextResponse.json({ reviews: reviews || [] })
  } catch (error) {
    console.error("[v0] Ошибка API GET reviews:", error)
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}

// POST - создать новый отзыв
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, rating, comment } = body

    console.log("[v0] Создание отзыва:", { name, rating, comment })

    // Валидация данных
    if (!name || !rating || !comment) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Рейтинг должен быть от 1 до 5" }, { status: 400 })
    }

    // Сохранение в Supabase
    const { data: review, error } = await supabase.from("reviews").insert([{ name, rating, comment }]).select().single()

    if (error) {
      console.error("[v0] Ошибка создания отзыва:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Отзыв создан:", review)

    // Отправка в Telegram
    try {
      const telegramResponse = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "review",
          name,
          rating,
          comment,
        }),
      })

      if (!telegramResponse.ok) {
        console.error("[v0] Ошибка отправки в Telegram")
      }
    } catch (telegramError) {
      console.error("[v0] Ошибка Telegram API:", telegramError)
    }

    return NextResponse.json({ review })
  } catch (error) {
    console.error("[v0] Ошибка API POST reviews:", error)
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
