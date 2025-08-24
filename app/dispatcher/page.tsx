"use client"

import type React from "react"
import SuccessModal from "@/components/success-modal"

import { useState } from "react"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Send, Euro } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function DispatcherPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    country: "",
    pricePerPerson: "",
    phone: "",
    message: "",
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowSuccessModal(true)
        setFormData({ companyName: "", country: "", pricePerPerson: "", phone: "", message: "" })
      } else {
        alert("Ошибка отправки. Попробуйте еще раз.")
      }
    } catch (error) {
      alert("Ошибка отправки. Попробуйте еще раз.")
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Navigation Header */}
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
            <span className="text-primary font-medium">Для диспетчеров</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Back Button for Mobile */}
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

      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(5,150,105,0.1),transparent_50%)]" />

      <Container className="relative z-10 py-20">
        <div className="pt-16">
          {/* Header */}
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
                stroke="url(#headerEmeraldGradient)"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                style={{ filter: "drop-shadow(0 0 8px rgba(22, 224, 165, 0.4))" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="headerEmeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#16e0a5" />
                    <stop offset="100%" stopColor="#22e392" />
                  </linearGradient>
                </defs>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk">
                Регистрация <span className="kinetic-text">диспетчера</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Присоединяйтесь к нашей сети диспетчеров и зарабатывайте на организации перевозок
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="glass-card">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Company Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="url(#companyGradient)"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        style={{ filter: "drop-shadow(0 0 6px rgba(22, 224, 165, 0.3))" }}
                      >
                        <defs>
                          <linearGradient id="companyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#16e0a5" />
                            <stop offset="100%" stopColor="#22e392" />
                          </linearGradient>
                        </defs>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                        />
                      </svg>
                      <h2 className="text-2xl font-bold text-primary">Информация о компании</h2>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-lg font-medium">
                        Название фирмы или ФИО *
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="ООО Транспорт или Иван Иванов"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="glass-input text-lg py-6"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-lg font-medium">
                        Номер телефона *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+380 XX XXX XX XX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="glass-input text-lg py-6"
                        required
                      />
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="url(#serviceGradient)"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        style={{ filter: "drop-shadow(0 0 6px rgba(22, 224, 165, 0.3))" }}
                      >
                        <defs>
                          <linearGradient id="serviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#16e0a5" />
                            <stop offset="100%" stopColor="#22e392" />
                          </linearGradient>
                        </defs>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                      <h2 className="text-2xl font-bold text-primary">Условия работы</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-lg font-medium">
                          Куда можете доставлять людей *
                        </Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) => setFormData({ ...formData, country: value })}
                        >
                          <SelectTrigger className="glass-input text-lg py-6">
                            <SelectValue placeholder="Выберите страну" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Германия">🇩🇪 Германия</SelectItem>
                            <SelectItem value="Польша">🇵🇱 Польша</SelectItem>
                            <SelectItem value="Литва">🇱🇹 Литва</SelectItem>
                            <SelectItem value="Латвия">🇱🇻 Латвия</SelectItem>
                            <SelectItem value="Эстония">🇪🇪 Эстония</SelectItem>
                            <SelectItem value="Беларусь">🇧🇾 Беларусь</SelectItem>
                            <SelectItem value="Россия">🇷🇺 Россия</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pricePerPerson" className="text-lg font-medium">
                          Сколько хотите зарабатывать с человека *
                        </Label>
                        <Select
                          value={formData.pricePerPerson}
                          onValueChange={(value) => setFormData({ ...formData, pricePerPerson: value })}
                        >
                          <SelectTrigger className="glass-input text-lg py-6">
                            <SelectValue placeholder="Выберите сумму" />
                          </SelectTrigger>
                          <SelectContent>
                            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((price) => (
                              <SelectItem key={price} value={price.toString()}>
                                <div className="flex items-center gap-2">
                                  <Euro className="w-4 h-4" />
                                  {price} евро
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-lg font-medium">
                        Личное сообщение
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Расскажите о своем опыте, дополнительных услугах или особых условиях..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="glass-input text-lg min-h-32"
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      className="text-xl px-16 py-6 rounded-2xl neon-glow pulse-glow hover:scale-105 transition-all duration-300 font-space-grotesk bg-gradient-to-r from-primary to-secondary flex items-center gap-4"
                    >
                      Отправить заявку
                      <Send className="w-6 h-6" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Заявка диспетчера отправлена!"
        message="Ваша заявка на регистрацию диспетчера успешно отправлена. Ожидайте, с вами скоро свяжутся для обсуждения условий сотрудничества."
      />
    </div>
  )
}
