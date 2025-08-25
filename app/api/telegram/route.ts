import { type NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

function escapeMarkdownV2(text: string): string {
  if (!text) return text
  // Экранируем все специальные символы MarkdownV2
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&")
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID || "8159146710"

    if (!botToken) {
      return NextResponse.json({ error: "Telegram bot token not configured" }, { status: 500 })
    }

    let message = ""

    if (data.type === "review") {
      message = `*НОВЫЙ ОТЗЫВ КЛИЕНТА*

> *ИНФОРМАЦИЯ ОБ ОТЗЫВЕ*

1\\. Имя клиента:
${escapeMarkdownV2(data.firstName)} ${escapeMarkdownV2(data.lastName)}

2\\. Оценка:
${"⭐".repeat(data.rating)} \$$${data.rating}/5\$$

3\\. Текст отзыва:
${escapeMarkdownV2(data.text)}

4\\. Дата:
${escapeMarkdownV2(new Date().toLocaleDateString("ru-RU"))}`
    } else if (data.packageName) {
      message = `*НОВАЯ ЗАЯВКА НА ОТПРАВКУ ПОСЫЛКИ*

> *ИНФОРМАЦИЯ О ПОСЫЛКЕ*

1\\. Наименование посылки:
${escapeMarkdownV2(data.packageName)}

2\\. Тип посылки:
${escapeMarkdownV2(data.packageType)}

> *ДАННЫЕ ОТПРАВИТЕЛЯ*

1\\. ФИО отправителя:
${escapeMarkdownV2(data.senderName)}

2\\. Страна отправки:
${escapeMarkdownV2(data.senderCountry)}

3\\. Телефон отправителя:
${escapeMarkdownV2(data.senderPhone)}

4\\. Email отправителя:
${data.senderEmail ? escapeMarkdownV2(data.senderEmail) : "❌"}

> *ДАННЫЕ ПОЛУЧАТЕЛЯ*

1\\. ФИО получателя:
${escapeMarkdownV2(data.recipientName)}

2\\. Телефон получателя:
${escapeMarkdownV2(data.recipientPhone)}

3\\. Email получателя:
${data.recipientEmail ? escapeMarkdownV2(data.recipientEmail) : "❌"}

> *МЕСТО ДОСТАВКИ*

1\\. Страна назначения:
${escapeMarkdownV2(data.destinationCountry)}

2\\. Адрес доставки:
${escapeMarkdownV2(data.destinationAddress)}

> Дополнительные пожелания:
${escapeMarkdownV2(data.notes || "Нет особых пожеланий")}`
    } else if (data.country && data.fromCity) {
      message = `*НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ ПОЕЗДКИ*

> *ИНФОРМАЦИЯ О МАРШРУТЕ*

Маршрут: ${escapeMarkdownV2(data.fromCity)} → ${escapeMarkdownV2(data.toCity)}
Дата поездки: ${escapeMarkdownV2(data.date)}
Время: ${escapeMarkdownV2(data.time)}
Количество пассажиров: ${data.passengers}
Дополнительный багаж: ${data.luggage ? "Да" : "Нет"}

> *ДАННЫЕ ПАССАЖИРА*

ФИО: ${escapeMarkdownV2(data.name)}
Телефон: ${escapeMarkdownV2(data.phone)}

> Дополнительный комментарий:
${escapeMarkdownV2(data.comment || "Нет комментариев")}`
    } else if (data.companyName) {
      message = `*НОВАЯ ЗАЯВКА ДИСПЕТЧЕРА*

> *ИНФОРМАЦИЯ О КОМПАНИИ*

Название фирмы/ФИО: ${escapeMarkdownV2(data.companyName)}
Телефон: ${escapeMarkdownV2(data.phone)}

> *УСЛОВИЯ РАБОТЫ*

Страна доставки: ${escapeMarkdownV2(data.country)}
Цена за человека: €${data.pricePerPerson}

> Личное сообщение:
${escapeMarkdownV2(data.message || "Нет дополнительной информации")}`
    } else {
      // Fallback for custom messages
      message = escapeMarkdownV2(data.message || "Новая заявка")
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "MarkdownV2",
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Telegram API error:", errorText)
      throw new Error(`Telegram API error: ${response.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    return NextResponse.json({ error: "Ошибка отправки сообщения" }, { status: 500 })
  }
}
import { type NextRequest, NextResponse } from "next/server"

function escapeMarkdownV2(text: string): string {
  if (!text) return text
  // Экранируем все специальные символы MarkdownV2
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, "\\$&")
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID || "8159146710"

    if (!botToken) {
      return NextResponse.json({ error: "Telegram bot token not configured" }, { status: 500 })
    }

    let message = ""

    if (data.type === "review") {
      message = `*НОВЫЙ ОТЗЫВ КЛИЕНТА*

> *ИНФОРМАЦИЯ ОБ ОТЗЫВЕ*

1\\. Имя клиента:
${escapeMarkdownV2(data.firstName)} ${escapeMarkdownV2(data.lastName)}

2\\. Оценка:
${"⭐".repeat(data.rating)} \$$${data.rating}/5\$$

3\\. Текст отзыва:
${escapeMarkdownV2(data.text)}

4\\. Дата:
${escapeMarkdownV2(new Date().toLocaleDateString("ru-RU"))}`
    } else if (data.packageName) {
      message = `*НОВАЯ ЗАЯВКА НА ОТПРАВКУ ПОСЫЛКИ*

> *ИНФОРМАЦИЯ О ПОСЫЛКЕ*

1\\. Наименование посылки:
${escapeMarkdownV2(data.packageName)}

2\\. Тип посылки:
${escapeMarkdownV2(data.packageType)}

> *ДАННЫЕ ОТПРАВИТЕЛЯ*

1\\. ФИО отправителя:
${escapeMarkdownV2(data.senderName)}

2\\. Страна отправки:
${escapeMarkdownV2(data.senderCountry)}

3\\. Телефон отправителя:
${escapeMarkdownV2(data.senderPhone)}

4\\. Email отправителя:
${data.senderEmail ? escapeMarkdownV2(data.senderEmail) : "❌"}

> *ДАННЫЕ ПОЛУЧАТЕЛЯ*

1\\. ФИО получателя:
${escapeMarkdownV2(data.recipientName)}

2\\. Телефон получателя:
${escapeMarkdownV2(data.recipientPhone)}

3\\. Email получателя:
${data.recipientEmail ? escapeMarkdownV2(data.recipientEmail) : "❌"}

> *МЕСТО ДОСТАВКИ*

1\\. Страна назначения:
${escapeMarkdownV2(data.destinationCountry)}

2\\. Адрес доставки:
${escapeMarkdownV2(data.destinationAddress)}

> Дополнительные пожелания:
${escapeMarkdownV2(data.notes || "Нет особых пожеланий")}`
    } else if (data.country && data.fromCity) {
      message = `*НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ ПОЕЗДКИ*

> *ИНФОРМАЦИЯ О МАРШРУТЕ*

Маршрут: ${escapeMarkdownV2(data.fromCity)} → ${escapeMarkdownV2(data.toCity)}
Дата поездки: ${escapeMarkdownV2(data.date)}
Время: ${escapeMarkdownV2(data.time)}
Количество пассажиров: ${data.passengers}
Дополнительный багаж: ${data.luggage ? "Да" : "Нет"}

> *ДАННЫЕ ПАССАЖИРА*

ФИО: ${escapeMarkdownV2(data.name)}
Телефон: ${escapeMarkdownV2(data.phone)}

> Дополнительный комментарий:
${escapeMarkdownV2(data.comment || "Нет комментариев")}`
    } else if (data.companyName) {
      message = `*НОВАЯ ЗАЯВКА ДИСПЕТЧЕРА*

> *ИНФОРМАЦИЯ О КОМПАНИИ*

Название фирмы/ФИО: ${escapeMarkdownV2(data.companyName)}
Телефон: ${escapeMarkdownV2(data.phone)}

> *УСЛОВИЯ РАБОТЫ*

Страна доставки: ${escapeMarkdownV2(data.country)}
Цена за человека: €${data.pricePerPerson}

> Личное сообщение:
${escapeMarkdownV2(data.message || "Нет дополнительной информации")}`
    } else {
      // Fallback for custom messages
      message = escapeMarkdownV2(data.message || "Новая заявка")
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "MarkdownV2",
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Telegram API error:", errorText)
      throw new Error(`Telegram API error: ${response.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending to Telegram:", error)
    return NextResponse.json({ error: "Ошибка отправки сообщения" }, { status: 500 })
  }
}
