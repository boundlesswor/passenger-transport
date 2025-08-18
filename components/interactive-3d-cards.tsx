"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Euro, Users } from "lucide-react"

const popularRoutes = [
  {
    id: 1,
    from: "Варшава",
    to: "Берлин",
    duration: "5ч 30м",
    price: 45,
    passengers: "1-8",
    image: "/placeholder-lkg12.png",
    description: "Комфортабельный маршрут через живописные немецкие земли",
  },
  {
    id: 2,
    from: "Берлин",
    to: "Амстердам",
    duration: "6ч 15м",
    price: 55,
    passengers: "1-8",
    image: "/berlin-amsterdam-route.png",
    description: "Путешествие через сердце Европы с остановками в красивых городах",
  },
  {
    id: 3,
    from: "Амстердам",
    to: "Париж",
    duration: "4ч 45м",
    price: 65,
    passengers: "1-8",
    image: "/amsterdam-paris-route.png",
    description: "Экспресс-маршрут в город любви и романтики",
  },
]

export function Interactive3DCards() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {popularRoutes.map((route) => (
        <div
          key={route.id}
          className="relative h-80 perspective-1000 cursor-pointer"
          onMouseEnter={() => setFlippedCard(route.id)}
          onMouseLeave={() => setFlippedCard(null)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              flippedCard === route.id ? "rotate-y-180" : ""
            }`}
          >
            {/* Front Side */}
            <Card className="absolute inset-0 w-full h-full backface-hidden holo-glass neon-glow">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={route.image || "/placeholder.svg"}
                    alt={`${route.from} to ${route.to}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold font-space-grotesk">
                      {route.from} → {route.to}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{route.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{route.passengers} пассажиров</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">€{route.price}</div>
                    <div className="text-sm text-muted-foreground">за человека</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Back Side */}
            <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 holo-glass pulse-glow">
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-space-grotesk mb-4 kinetic-text">
                    {route.from} → {route.to}
                  </h3>
                  <p className="text-muted-foreground mb-6">{route.description}</p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Маршрут
                      </span>
                      <span className="font-medium">Прямой</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        Время
                      </span>
                      <span className="font-medium">{route.duration}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Euro className="w-4 h-4 text-primary" />
                        Цена
                      </span>
                      <span className="font-medium">€{route.price}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full neon-glow pulse-glow hover:scale-105 transition-all duration-300">
                  Забронировать сейчас
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  )
}
