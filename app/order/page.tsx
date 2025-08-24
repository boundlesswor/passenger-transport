"use client"

import { Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Container } from "@/components/container"
import { OrderForm } from "@/components/order-form"
import Link from "next/link"
import { motion } from "framer-motion"

function OrderPageContent() {
  const searchParams = useSearchParams()
  const preselectedCountry = searchParams.get("country")

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

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
            <span className="text-primary font-medium">Бронирование поездки</span>
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

      {/* Hero Background - точно такой же как на странице посылок */}
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-space-grotesk whitespace-nowrap">
                Бронирование <span className="kinetic-text">поездки</span>
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Комфортные поездки по Европе из Киева</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <OrderForm preselectedCountry={preselectedCountry || undefined} />
          </motion.div>
        </div>
      </Container>
    </div>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <OrderPageContent />
    </Suspense>
  )
}
