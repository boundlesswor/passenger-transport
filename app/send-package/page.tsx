"use client"

import type React from "react"
import SuccessModal from "@/components/success-modal"

import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

const packageTypes = [
  { value: "documents", label: "Документы", description: "Паспорта, справки, договоры" },
  { value: "personal", label: "Личные вещи", description: "Одежда, обувь, аксессуары" },
  { value: "fragile", label: "Хрупкое", description: "Электроника, стекло, керамика" },
  { value: "other", label: "Другое", description: "Прочие товары" },
]

const countries = [
  { value: "ukraine", label: "Украина" },
  { value: "poland", label: "Польша" },
  { value: "germany", label: "Германия" },
  { value: "lithuania", label: "Литва" },
  { value: "latvia", label: "Латвия" },
  { value: "estonia", label: "Эстония" },
  { value: "belarus", label: "Беларусь" },
  { value: "russia", label: "Россия" },
]

export default function SendPackagePage() {
  const [formData, setFormData] = useState({
    packageName: "",
    packageType: "",
    senderName: "",
    senderCountry: "ukraine",
    senderPhone: "",
    senderEmail: "",
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    destinationCountry: "",
    destinationAddress: "",
    notes: "",
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
        setFormData({
          packageName: "",
          packageType: "",
          senderName: "",
          senderCountry: "ukraine",
          senderPhone: "",
          senderEmail: "",
          recipientName: "",
          recipientPhone: "",
          recipientEmail: "",
          destinationCountry: "",
          destinationAddress: "",
          notes: "",
        })
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
                <h2 className="text-xl font-bold font-space-grotesk kinetic-text">CONSTANTA TUR</h2>
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
            <span className="text-primary font-medium">Отправка посылок</span>
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
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-space-grotesk whitespace-nowrap">
                Отправка <span className="kinetic-text">посылок</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Надежная доставка посылок из Киева по всей Европе
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="glass-card p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: () => (
                      <svg
                        className="w-16 h-16 mx-auto mb-4"
                        fill="none"
                        stroke="url(#emeraldGradient)"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        style={{ filter: "drop-shadow(0 0 8px rgba(22, 224, 165, 0.4))" }}
                      >
                        <defs>
                          <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#16e0a5" />
                            <stop offset="100%" stopColor="#22e392" />
                          </linearGradient>
                        </defs>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                        />
                      </svg>
                    ),
                    title: "Безопасно",
                    desc: "Страхование посылок",
                  },
                  {
                    icon: () => (
                      <svg
                        className="w-16 h-16 mx-auto mb-4"
                        fill="none"
                        stroke="url(#emeraldGradient2)"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        style={{ filter: "drop-shadow(0 0 8px rgba(22, 224, 165, 0.4))" }}
                      >
                        <defs>
                          <linearGradient id="emeraldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#16e0a5" />
                            <stop offset="100%" stopColor="#22e392" />
                          </linearGradient>
                        </defs>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                        />
                      </svg>
                    ),
                    title: "Быстро",
                    desc: "Доставка 3-7 дней",
                  },
                  {
                    icon: () => (
                      <svg
                        className="w-16 h-16 mx-auto mb-4"
                        fill="none"
                        stroke="url(#emeraldGradient3)"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        style={{ filter: "drop-shadow(0 0 8px rgba(22, 224, 165, 0.4))" }}
                      >
                        <defs>
                          <linearGradient id="emeraldGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#16e0a5" />
                            <stop offset="100%" stopColor="#22e392" />
                          </linearGradient>
                        </defs>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    ),
                    title: "Надежно",
                    desc: "Отслеживание 24/7",
                  },
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    {feature.icon()}
                    <h3 className="text-2xl font-bold mb-3 font-space-grotesk">{feature.title}</h3>
                    <p className="text-muted-foreground text-lg">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="glass-card max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-3xl font-space-grotesk text-center">Заполните данные для отправки</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Package Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="url(#packageGradient)"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        style={{ filter: "drop-shadow(0 0 6px rgba(22, 224, 165, 0.3))" }}
                      >
                        <defs>
                          <linearGradient id="packageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#16e0a5" />
                            <stop offset="100%" stopColor="#22e392" />
                          </linearGradient>
                        </defs>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                      <h3 className="text-2xl font-bold text-primary">Информация о посылке</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="packageName">Наименование посылки *</Label>
                        <Input
                          id="packageName"
                          value={formData.packageName}
                          onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                          placeholder="Например: Документы, одежда, телефон..."
                          required
                          className="glass-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="packageType">Тип посылки *</Label>
                        <Select
                          value={formData.packageType}
                          onValueChange={(value) => setFormData({ ...formData, packageType: value })}
                          required
                        >
                          <SelectTrigger className="glass-input">
                            <SelectValue placeholder="Выберите тип посылки">
                              {formData.packageType &&
                                packageTypes.find((type) => type.value === formData.packageType)?.label}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {packageTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div>
                                  <div className="font-medium">{type.label}</div>
                                  <div className="text-sm text-muted-foreground">{type.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Sender Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="url(#senderGradient)"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        style={{ filter: "drop-shadow(0 0 6px rgba(22, 224, 165, 0.3))" }}
                      >
                        <defs>
                          <linearGradient id="senderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#16e0a5" />
                            <stop offset="100%" stopColor="#22e392" />
                          </linearGradient>
                        </defs>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                      <h3 className="text-2xl font-bold text-primary">Данные отправителя</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="senderName">Имя отправителя *</Label>
                        <Input
                          id="senderName"
                          value={formData.senderName}
                          onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                          placeholder="Полное имя"
                          required
                          className="glass-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="senderCountry">Страна отправки *</Label>
                        <Select
                          value={formData.senderCountry}
                          onValueChange={(value) => setFormData({ ...formData, senderCountry: value })}
                          required
                        >
                          <SelectTrigger className="glass-input">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.value} value={country.value}>
                                {country.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="senderPhone">Телефон отправителя *</Label>
                        <Input
                          id="senderPhone"
                          value={formData.senderPhone}
                          onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                          placeholder="+380 XX XXX XX XX"
                          required
                          className="glass-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="senderEmail">Email отправителя</Label>
                        <Input
                          id="senderEmail"
                          type="email"
                          value={formData.senderEmail}
                          onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                          placeholder="email@example.com"
                          className="glass-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Recipient Info */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="url(#recipientGradient)"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        style={{ filter: "drop-shadow(0 0 6px rgba(22, 224, 165, 0.3))" }}
                      >
                        <defs>
                          <linearGradient id="recipientGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                      <h3 className="text-2xl font-bold text-primary">Данные получателя</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="recipientName">Имя получателя (как в паспорте) *</Label>
                        <Input
                          id="recipientName"
                          value={formData.recipientName}
                          onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                          placeholder="Точно как в документах"
                          required
                          className="glass-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recipientPhone">Телефон получателя *</Label>
                        <Input
                          id="recipientPhone"
                          value={formData.recipientPhone}
                          onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                          placeholder="+XX XXX XXX XXX"
                          required
                          className="glass-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recipientEmail">Email получателя</Label>
                        <Input
                          id="recipientEmail"
                          type="email"
                          value={formData.recipientEmail}
                          onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                          placeholder="email@example.com"
                          className="glass-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="url(#locationGradient)"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        style={{ filter: "drop-shadow(0 0 6px rgba(22, 224, 165, 0.3))" }}
                      >
                        <defs>
                          <linearGradient id="locationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                      <h3 className="text-2xl font-bold text-primary">Место доставки</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="destinationCountry">Страна назначения *</Label>
                        <Select
                          value={formData.destinationCountry}
                          onValueChange={(value) => setFormData({ ...formData, destinationCountry: value })}
                          required
                        >
                          <SelectTrigger className="glass-input">
                            <SelectValue placeholder="Выберите страну" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries
                              .filter((c) => c.value !== "ukraine")
                              .map((country) => (
                                <SelectItem key={country.value} value={country.value}>
                                  {country.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destinationAddress">Адрес доставки *</Label>
                        <Input
                          id="destinationAddress"
                          value={formData.destinationAddress}
                          onChange={(e) => setFormData({ ...formData, destinationAddress: e.target.value })}
                          placeholder="Город, улица, дом"
                          required
                          className="glass-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Дополнительные пожелания</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Особые требования к доставке, хрупкость, срочность..."
                      className="glass-input min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-xl py-6 rounded-2xl neon-glow pulse-glow hover:scale-105 transition-all duration-300 font-space-grotesk bg-gradient-to-r from-primary to-secondary"
                  >
                    <svg
                      className="w-6 h-6 mr-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Заявка на посылку отправлена!"
        message="Ваша заявка на отправку посылки успешно отправлена. Ожидайте, с вами скоро свяжутся для уточнения деталей."
      />
    </div>
  )
}
