"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Globe, Shield, Star } from "lucide-react"
import Link from "next/link"
import { MobileFeatureDrawer } from "@/components/mobile-drawer"

export function HolographicHero() {
  const [currentText, setCurrentText] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroTexts = ["Без предоплат", "Будущее перевозок", "Интерактивные маршруты", "Голографический опыт"]

  const heroFeatures = [
    { icon: Globe, title: "3D Карта", desc: "Интерактивная карта Европы" },
    { icon: Zap, title: "Мгновенно", desc: "Бронирование за секунды" },
    { icon: Shield, title: "Безопасно", desc: "Проверенные перевозчики" },
  ]

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentText((prev) => (prev + 1) % heroTexts.length)
      },
      currentText === 0 ? 5000 : 3000,
    )
    return () => clearInterval(interval)
  }, [currentText])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0 pb-6 sm:pb-8 md:pb-12">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-pulse" />
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary/30"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-20 h-20 border border-primary/20 rounded-lg float transform-3d hover:neon-glow transition-all duration-500`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.8}s`,
              transform: `perspective(1000px) rotateX(${i * 30 + mousePosition.y * 0.2}deg) rotateY(${i * 45 + mousePosition.x * 0.2}deg) translateZ(${i * 10}px)`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6">
        {/* Kinetic Typography */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-space-grotesk mb-4 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent smooth-gradient whitespace-nowrap">
              PULSE LINE
            </span>
          </h1>
          <div className="h-16 flex items-center justify-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground transition-all duration-1000 transform">
              {heroTexts[currentText]}
            </h2>
          </div>
        </div>

        {/* Mobile Feature Card and Buttons */}
        <div className="block md:hidden mb-6 sm:mb-8">
          <div className="mb-4">
            <MobileFeatureDrawer features={heroFeatures} />
          </div>

          <div className="flex flex-col gap-3 items-center max-w-xs mx-auto">
            <Button
              size="lg"
              className="w-full h-12 sm:h-14 text-base sm:text-lg pr-10 sm:pr-12 neon-glow pulse-glow hover:scale-105 transition-all duration-300 font-space-grotesk relative"
              onClick={() => {
                const routesSection = document.getElementById("routes-section")
                if (routesSection) {
                  routesSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-center flex-1 px-2">Забронировать поездку</span>
            </Button>

            <Link href="/send-package" className="w-full">
              <Button
                variant="outline"
                size="lg"
                className="w-full h-12 sm:h-14 text-base sm:text-lg pr-10 sm:pr-12 holo-glass hover:scale-105 transition-all duration-300 font-space-grotesk bg-transparent relative"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <span className="text-center flex-1 px-2">Отправить посылку</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 absolute right-3 sm:right-4 top-1/2 -translate-y-1/2" />
              </Button>
            </Link>

            <Link href="/reviews" className="w-full">
              <Button
                variant="outline"
                size="lg"
                className="w-full h-12 sm:h-14 text-base sm:text-lg pr-10 sm:pr-12 holo-glass hover:scale-105 transition-all duration-300 font-space-grotesk bg-transparent relative"
              >
                <Star className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
                <span className="text-center flex-1 px-2">Просмотреть отзывы</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 absolute right-3 sm:right-4 top-1/2 -translate-y-1/2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop Holographic Features */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8 md:mb-12">
          {heroFeatures.map((feature, i) => (
            <div
              key={i}
              className="holo-glass rounded-2xl p-6 h-48 sm:h-52 md:h-56 float hover:scale-105 transition-all duration-300 cursor-pointer group transform-3d flex flex-col items-center justify-center"
              style={{
                animationDelay: `${i * 0.3}s`,
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
              }}
            >
              <feature.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:neon-glow transition-all duration-300" />
              <h3 className="text-xl font-semibold mb-2 font-space-grotesk text-center">{feature.title}</h3>
              <p className="text-muted-foreground text-center">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          <Button
            size="lg"
            className="w-full h-14 text-lg px-8 neon-glow pulse-glow hover:scale-105 transition-all duration-300 font-space-grotesk"
            onClick={() => {
              const routesSection = document.getElementById("routes-section")
              if (routesSection) {
                routesSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Забронировать поездку
          </Button>
          <Link href="/send-package" className="w-full">
            <Button
              variant="outline"
              size="lg"
              className="w-full h-14 text-lg px-8 holo-glass hover:scale-105 transition-all duration-300 font-space-grotesk bg-transparent"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              Отправить посылку
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/reviews" className="w-full">
            <Button
              variant="outline"
              size="lg"
              className="w-full h-14 text-lg px-8 holo-glass hover:scale-105 transition-all duration-300 font-space-grotesk bg-transparent"
            >
              <Star className="w-5 h-5 mr-2" />
              Просмотреть отзывы
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
