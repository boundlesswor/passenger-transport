"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

const routes = [
  {
    id: "germany",
    country: "Германия",
    flag: "🇩🇪",
    code: "DE",
    route: "Киев → Варшава → Берлин/Мюнхен/Франкфурт",
    duration: "18-24 часа",
    frequency: "Ежедневно",
    description: "Комфортные поездки в Германию с пересадкой в Варшаве",
    stops: ["Киев", "Варшава", "Берлин"],
    color: "from-yellow-500/20 to-red-500/20",
  },
  {
    id: "poland",
    country: "Польша",
    flag: "🇵🇱",
    code: "PL",
    route: "Киев → Варшава/Краков/Гданьск",
    duration: "12-16 часов",
    frequency: "Ежедневно",
    description: "Прямые рейсы в крупнейшие города Польши",
    stops: ["Киев", "Варшава"],
    color: "from-red-500/20 to-white/20",
  },
  {
    id: "baltics",
    country: "Прибалтика",
    flag: "🇱🇹",
    code: "LT",
    route: "Киев → Варшава → Вильнюс/Рига/Таллин",
    duration: "16-20 часов",
    frequency: "3 раза в неделю",
    description: "Маршруты в Литву, Латвию и Эстонию",
    stops: ["Киев", "Варшава", "Вильнюс"],
    color: "from-green-500/20 to-yellow-500/20",
  },
  {
    id: "belarus",
    country: "Беларусь",
    flag: "🇧🇾",
    code: "BY",
    route: "Киев → Минск",
    duration: "8-10 часов",
    frequency: "Ежедневно",
    description: "Прямые рейсы в Минск",
    stops: ["Киев", "Минск"],
    color: "from-green-500/20 to-red-500/20",
  },
  {
    id: "russia",
    country: "Россия",
    flag: "🇷🇺",
    code: "RU",
    route: "Киев → Варшава → Минск → Москва",
    duration: "24-30 часов",
    frequency: "2 раза в неделю",
    description: "Маршрут в Москву с пересадками",
    stops: ["Киев", "Варшава", "Минск", "Москва"],
    color: "from-blue-500/20 to-red-500/20",
  },
  {
    id: "return",
    country: "Обратные рейсы",
    flag: "🔄",
    code: "↩",
    route: "Из любой страны ЕС → Киев",
    duration: "Различная",
    frequency: "По расписанию",
    description: "Обратные рейсы из всех направлений в Киев",
    stops: ["Любой город ЕС", "Киев"],
    color: "from-purple-500/20 to-blue-500/20",
  },
]

export function DraggableRouteCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {routes.map((route, index) => (
        <div key={route.id} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <Card
            className={`holo-glass h-full hover:neon-glow hover:scale-105 transition-all duration-500 bg-gradient-to-br ${route.color}`}
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl hidden md:inline">{route.flag}</span>
                  <span className="text-lg font-bold text-primary bg-primary/20 px-2 py-1 rounded md:hidden">
                    {route.code}
                  </span>
                  <h3 className="text-xl font-bold font-space-grotesk text-foreground">{route.country}</h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{route.route}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{route.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{route.frequency}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{route.description}</p>

                <div className="flex flex-wrap gap-1">
                  {route.stops.map((stop, i) => (
                    <div key={stop} className="flex items-center">
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{stop}</span>
                      {i < route.stops.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground mx-1" />}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={
                  route.id === "return" ? `/order?return=true` : `/order?country=${encodeURIComponent(route.country)}`
                }
              >
                <Button className="w-full bg-primary/80 hover:bg-primary text-primary-foreground">
                  {route.id === "return" ? "Выбрать обратный рейс" : "Забронировать"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
