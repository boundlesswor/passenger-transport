"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, Send } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  created_at: string
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    text: "",
    rating: 5,
  })

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error loading reviews:", error)
        return
      }

      setReviews(data || [])
    } catch (error) {
      console.error("Error loading reviews:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const { data, error } = await supabase
        .from("reviews")
        .insert([
          {
            name: `${formData.firstName} ${formData.lastName}`,
            rating: formData.rating,
            comment: formData.text,
          },
        ])
        .select()

      if (error) {
        console.error("Error saving review:", error)
        alert("Ошибка при сохранении отзыва. Попробуйте еще раз.")
        return
      }

      // Reset form
      setFormData({ firstName: "", lastName: "", text: "", rating: 5 })
      setShowForm(false)

      // Reload reviews
      await loadReviews()

      // Send to Telegram
      try {
        await fetch("/api/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "review",
            firstName: formData.firstName,
            lastName: formData.lastName,
            text: formData.text,
            rating: formData.rating,
          }),
        })
      } catch (error) {
        console.error("Error sending review to Telegram:", error)
      }
    } catch (error) {
      console.error("Error submitting review:", error)
      alert("Ошибка при отправке отзыва. Попробуйте еще раз.")
    }
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-primary fill-primary" : "text-muted-foreground"
            } ${interactive ? "cursor-pointer hover:text-primary" : ""}`}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 z-20 p-6"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Animated Logo/Brand */}
          <Link href="/" className="group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 p-3 rounded-2xl glass-card hover:neon-glow transition-all duration-300"
            >
              <div className="relative">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="url(#logoGradient)"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  style={{ filter: "drop-shadow(0 0 8px rgba(22, 224, 165, 0.4))" }}
                >
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#16e0a5" />
                      <stop offset="100%" stopColor="#22e392" />
                    </linearGradient>
                  </defs>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0V8.25a1.5 1.5 0 013 0v10.5zM12 18.75a1.5 1.5 0 01-3 0V8.25a1.5 1.5 0 013 0v10.5zM15.75 18.75a1.5 1.5 0 01-3 0V8.25a1.5 1.5 0 013 0v10.5zM19.5 18.75a1.5 1.5 0 01-3 0V8.25a1.5 1.5 0 013 0v10.5z"
                  />
                </svg>
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
              <div className="hidden sm:block">
                <h2 className="text-xl font-bold font-space-grotesk kinetic-text">PULSE LINE</h2>
                <p className="text-xs text-muted-foreground">На главную</p>
              </div>
              <motion.svg
                className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </motion.svg>
            </motion.div>
          </Link>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Главная
            </Link>
            <span className="text-primary">→</span>
            <span className="text-primary font-medium">Отзывы клиентов</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="fixed bottom-6 left-6 z-30 md:hidden"
      >
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full glass-card neon-glow flex items-center justify-center group"
          >
            <svg
              className="w-6 h-6 text-primary group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </motion.button>
        </Link>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.1),transparent_50%)]" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="url(#headerStarGradient)"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                style={{ filter: "drop-shadow(0 0 8px rgba(22, 224, 165, 0.4))" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="headerStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#16e0a5" />
                    <stop offset="100%" stopColor="#22e392" />
                  </linearGradient>
                </defs>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-space-grotesk whitespace-nowrap">
                Отзывы <span className="kinetic-text">клиентов</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Мнения наших пассажиров о качестве перевозок и сервиса
            </p>
          </motion.div>

          {/* Write Review Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="max-w-sm mx-auto md:max-w-md lg:max-w-lg">
              <Button
                onClick={() => setShowForm(!showForm)}
                size="lg"
                className="w-full px-8 py-4 text-lg neon-glow hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-secondary"
              >
                <Star className="w-5 h-5 mr-2" />
                Написать отзыв
              </Button>
            </div>
          </motion.div>

          {/* Review Form */}
          {showForm && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Card className="glass-card max-w-2xl mx-auto mb-12">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center font-space-grotesk">Поделитесь своим опытом</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Имя *</label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="glass-input"
                          placeholder="Ваше имя"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Фамилия *</label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="glass-input"
                          placeholder="Ваша фамилия"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Оценка *</label>
                      {renderStars(formData.rating, true, (rating) => setFormData({ ...formData, rating }))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Отзыв *</label>
                      <Textarea
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        className="glass-input min-h-[120px]"
                        placeholder="Расскажите о своём опыте поездки..."
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-secondary">
                        <Send className="w-4 h-4 mr-2" />
                        Отправить отзыв
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}
                        className="glass-input"
                      >
                        Отмена
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Reviews Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Загрузка отзывов...</p>
              </div>
            ) : (
              reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass-card hover:scale-105 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{review.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.created_at).toLocaleDateString("ru-RU")}
                          </p>
                        </div>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>

          {!loading && reviews.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center py-12"
            >
              <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Пока нет отзывов</h3>
              <p className="text-muted-foreground">Станьте первым, кто поделится своим опытом!</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
