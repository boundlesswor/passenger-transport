"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Plus, Minus, MapPin, Clock, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import SuccessModal from "@/components/success-modal"

const countries = ["Германия", "Польша", "Литва", "Латвия", "Эстония", "Беларусь", "Россия"]

const countryCapitals: Record<string, string> = {
  Германия: "Берлин",
  Польша: "Варшава",
  Литва: "Вильнюс",
  Латвия: "Рига",
  Эстония: "Таллин",
  Беларусь: "Минск",
  Россия: "Москва",
}

const cityToCountry: Record<string, string> = {
  Берлин: "Германия",
  Варшава: "Польша",
  Вильнюс: "Литва",
  Рига: "Латвия",
  Таллин: "Эстония",
  Минск: "Беларусь",
  Москва: "Россия",
}

const orderSchema = z.object({
  country: z.string().min(1, "Выберите страну назначения"),
  fromCity: z.string().min(2, "Введите город отправления"),
  toCity: z.string().min(2, "Введите город назначения"),
  date: z.string().min(1, "Выберите дату поездки"),
  time: z.string().min(1, "Выберите время"),
  passengers: z.number().min(1, "Минимум 1 пассажир"),
  luggage: z.boolean(),
  name: z.string().min(2, "Введите имя и фамилию"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  comment: z.string().optional(),
})

type OrderFormData = z.infer<typeof orderSchema>

interface OrderFormProps {
  preselectedCountry?: string
  isReturnTrip?: boolean
}

export function OrderForm({ preselectedCountry, isReturnTrip = false }: OrderFormProps) {
  const [passengers, setPassengers] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [urlParamsProcessed, setUrlParamsProcessed] = useState(false)
  const [tripType, setTripType] = useState<"direct" | "return">("direct")
  const { toast } = useToast()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      country: preselectedCountry || "",
      fromCity: "Киев",
      passengers: 1,
      luggage: false,
    },
  })

  const watchedCountry = watch("country")

  const resetFormForTripType = (newTripType: "direct" | "return") => {
    if (newTripType === "direct") {
      setValue("fromCity", "Киев")
      setValue("toCity", "")
      setValue("country", "")
    } else {
      setValue("fromCity", "")
      setValue("toCity", "Киев")
      setValue("country", "")
    }
  }

  const handleTripTypeChange = (newTripType: "direct" | "return") => {
    if (newTripType !== tripType) {
      setTripType(newTripType)
      resetFormForTripType(newTripType)
    }
  }

  useEffect(() => {
    if (urlParamsProcessed) return

    const destination = searchParams.get("destination")
    const from = searchParams.get("from")
    const returnTrip = searchParams.get("return") === "true"

    if (returnTrip) {
      setTripType("return")
    }

    if (destination && cityToCountry[destination]) {
      const country = cityToCountry[destination]
      setValue("country", country)
      if (returnTrip) {
        setValue("fromCity", destination)
        setValue("toCity", "Киев")
      } else {
        setValue("toCity", destination)
        setValue("fromCity", "Киев")
      }
    }

    if (from && !returnTrip) {
      setValue("fromCity", from)
    }

    setUrlParamsProcessed(true)
  }, [searchParams, urlParamsProcessed, setValue])

  useEffect(() => {
    if (!watchedCountry) return

    if (tripType === "return") {
      setValue("toCity", "Киев")
      if (countryCapitals[watchedCountry]) {
        const expectedCity = countryCapitals[watchedCountry]
        setValue("fromCity", expectedCity)
      }
    } else {
      setValue("fromCity", "Киев")
      if (countryCapitals[watchedCountry]) {
        const expectedCity = countryCapitals[watchedCountry]
        setValue("toCity", expectedCity)
      }
    }
  }, [watchedCountry, tripType, setValue])

  const getRouteInfo = (country: string, isReturn = false) => {
    const directRoutes: Record<string, { route: string; duration: string; transfer?: string }> = {
      Германия: {
        route: "Киев → Варшава → Берлин/Мюнхен/Франкфурт",
        duration: "18-24 часа",
        transfer: "Пересадка в Варшаве",
      },
      Польша: {
        route: "Киев → Варшава/Краков/Гданьск",
        duration: "12-16 часов",
      },
      Литва: {
        route: "Киев → Варшава → Вильнюс",
        duration: "16-18 часов",
        transfer: "Пересадка в Варшаве",
      },
      Латвия: {
        route: "Киев → Варшава → Рига",
        duration: "18-20 часов",
        transfer: "Пересадка в Варшаве",
      },
      Эстония: {
        route: "Киев → Варшава → Таллин",
        duration: "20-22 часа",
        transfer: "Пересадка в Варшаве",
      },
      Беларусь: {
        route: "Киев → Варшава → Минск",
        duration: "12-16 часов",
        transfer: "Пересадка в Варшаве",
      },
      Россия: {
        route: "Киев → Варшава → Минск → Москва",
        duration: "24-30 часов",
        transfer: "Пересадки в Варшаве и Минске",
      },
    }

    const returnRoutes: Record<string, { route: string; duration: string; transfer?: string }> = {
      Германия: {
        route: "Берлин/Мюнхен/Франкфурт → Варшава → Киев",
        duration: "18-24 часа",
        transfer: "Пересадка в Варшаве",
      },
      Польша: {
        route: "Варшава/Краков/Гданьск → Киев",
        duration: "12-16 часов",
      },
      Литва: {
        route: "Вильнюс → Варшава → Киев",
        duration: "16-18 часов",
        transfer: "Пересадка в Варшаве",
      },
      Латвия: {
        route: "Рига → Варшава → Киев",
        duration: "18-20 часов",
        transfer: "Пересадка в Варшаве",
      },
      Эстония: {
        route: "Таллин → Варшава → Киев",
        duration: "20-22 часа",
        transfer: "Пересадка в Варшаве",
      },
      Беларусь: {
        route: "Минск → Варшава → Киев",
        duration: "12-16 часов",
        transfer: "Пересадка в Варшаве",
      },
      Россия: {
        route: "Москва → Минск → Варшава → Киев",
        duration: "24-30 часов",
        transfer: "Пересадки в Минске и Варшаве",
      },
    }

    return isReturn ? returnRoutes[country] : directRoutes[country]
  }

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Ошибка отправки заявки")
      }

      setShowSuccessModal(true)
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время.",
      })
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте еще раз.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const adjustPassengers = (delta: number) => {
    const newCount = Math.max(1, passengers + delta)
    setPassengers(newCount)
    setValue("passengers", newCount)
  }

  const routeInfo = watchedCountry ? getRouteInfo(watchedCountry, tripType === "return") : null

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="holo-glass max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-foreground font-space-grotesk">
            {tripType === "return" ? "Обратный рейс в Киев" : "Бронирование поездки"}
          </CardTitle>
          <p className="text-center text-muted-foreground">
            {tripType === "return"
              ? "Выберите страну и город отправления из Европы"
              : "Все поездки отправляются из Киева"}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="bg-muted/20 p-1 rounded-lg flex">
                <button
                  type="button"
                  onClick={() => handleTripTypeChange("direct")}
                  className={`px-4 py-2 rounded-md transition-all ${
                    tripType === "direct"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Прямой рейс
                </button>
                <button
                  type="button"
                  onClick={() => handleTripTypeChange("return")}
                  className={`px-4 py-2 rounded-md transition-all ${
                    tripType === "return"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Обратный рейс
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-lg font-semibold">
                {tripType === "return" ? "Страна отправления *" : "Страна назначения *"}
              </Label>
              <Select value={watchedCountry} onValueChange={(value) => setValue("country", value)}>
                <SelectTrigger className="glass-input h-12 text-lg">
                  <SelectValue placeholder="Выберите страну" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country} className="text-lg">
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
            </div>

            {routeInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-primary/10 rounded-lg p-4 space-y-3"
              >
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Информация о маршруте
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Время в пути: {routeInfo.duration}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-0.5" />
                    <span>Маршрут: {routeInfo.route}</span>
                  </div>
                  {routeInfo.transfer && <div className="text-amber-600 font-medium">⚠️ {routeInfo.transfer}</div>}
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromCity" className="text-lg font-semibold">
                  Город отправления *
                </Label>
                <Input
                  id="fromCity"
                  {...register("fromCity")}
                  placeholder={tripType === "return" ? "Выберите город" : "Киев"}
                  className="glass-input h-12 text-lg"
                  readOnly
                />
                {errors.fromCity && <p className="text-sm text-destructive">{errors.fromCity.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="toCity" className="text-lg font-semibold">
                  Город назначения *
                </Label>
                <Input
                  id="toCity"
                  {...register("toCity")}
                  placeholder={tripType === "return" ? "Киев" : "Выберите город"}
                  className="glass-input h-12 text-lg"
                  readOnly
                />
                {errors.toCity && <p className="text-sm text-destructive">{errors.toCity.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-lg font-semibold">
                  Дата поездки *
                </Label>
                <Input id="date" type="date" {...register("date")} className="glass-input h-12 text-lg" />
                {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-lg font-semibold">
                  Предпочтительное время *
                </Label>
                <Input id="time" type="time" {...register("time")} className="glass-input h-12 text-lg" />
                {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Количество пассажиров *
              </Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => adjustPassengers(-1)}
                  disabled={passengers <= 1}
                  className="h-12 w-12"
                >
                  <Minus className="w-5 h-5" />
                </Button>
                <span className="text-2xl font-semibold w-12 text-center">{passengers}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => adjustPassengers(1)}
                  className="h-12 w-12"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="luggage"
                {...register("luggage")}
                onCheckedChange={(checked) => setValue("luggage", !!checked)}
                className="w-5 h-5"
              />
              <Label htmlFor="luggage" className="text-lg">
                Дополнительный багаж
              </Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg font-semibold">
                  Имя и фамилия *
                </Label>
                <Input id="name" {...register("name")} placeholder="Иван Иванов" className="glass-input h-12 text-lg" />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-lg font-semibold">
                  Телефон *
                </Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="+380 (XX) XXX-XX-XX"
                  className="glass-input h-12 text-lg"
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment" className="text-lg font-semibold">
                Дополнительный комментарий
              </Label>
              <Textarea
                id="comment"
                {...register("comment")}
                placeholder="Укажите особые пожелания или требования..."
                rows={4}
                className="glass-input text-lg"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground py-6 text-xl rounded-2xl neon-glow font-space-grotesk"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Отправляем заявку...
                </>
              ) : (
                "Отправить заявку"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Стоимость поездки будет рассчитана индивидуально и сообщена при подтверждении заявки
            </p>
          </form>
        </CardContent>
      </Card>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Заявка на поездку отправлена!"
        message="Ваша заявка на бронирование поездки успешно отправлена. Ожидайте, с вами скоро свяжутся для подтверждения."
      />
    </motion.div>
  )
}
