"use client"

import dynamic from "next/dynamic"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Globe, Headphones, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { DraggableRouteCards } from "@/components/draggable-route-cards"
import { MobileDrawer, MobileFeatureDrawer } from "@/components/mobile-drawer"

const HolographicHero = dynamic(
  () => import("@/components/holographic-hero").then((mod) => ({ default: mod.HolographicHero })),
  { ssr: false },
)
const Interactive3DMap = dynamic(
  () => import("@/components/interactive-3d-map").then((mod) => ({ default: mod.Interactive3DMap })),
  { ssr: false },
)

const advantages = [
  {
    icon: Globe,
    title: "Интерактивная карта",
    description: "Карта Европы со столицами и маршрутами из Киева",
  },
  {
    icon: Zap,
    title: "Быстро и надежно",
    description: "Комфортные поездки с пересадками в ключевых городах",
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "Проверенные перевозчики и безопасные маршруты",
  },
  {
    icon: Headphones,
    title: "24/7 Поддержка",
    description: "Всегда на связи для решения любых вопросов",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative">
      <HolographicHero />

      {/* Interactive 3D Map Section */}
      <section className="py-6 sm:py-8 md:py-12 bg-gradient-to-b from-background to-muted/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-5 md:px-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-space-grotesk mb-4 sm:mb-6 leading-tight">
              <span className="kinetic-text">Интерактивная</span> карта Европы
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Выберите направление на карте со столицами Европы. Доступны как прямые, так и обратные маршруты
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="px-4 sm:px-5 md:px-6"
          >
            <Interactive3DMap />
          </motion.div>
        </Container>
      </section>

      {/* Popular Routes Section */}
      <section
        id="routes-section"
        className="py-6 sm:py-8 md:py-12 bg-gradient-to-br from-secondary/5 via-primary/5 to-accent/5"
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-5 md:px-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-space-grotesk mb-4 sm:mb-6 leading-tight">
              Наши <span className="kinetic-text">маршруты</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Выберите направление для путешествия. Прямые рейсы из Киева и обратные из Европы
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="px-4 sm:px-5 md:px-6"
          >
            <div className="block md:hidden">
              <MobileDrawer
                title="Все направления"
                triggerCard={
                  <Card className="bg-white/5 backdrop-blur-sm border border-primary/20 p-6 text-center hover:bg-white/10 transition-all duration-500">
                    <CardContent className="p-0 space-y-4">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <Globe className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold">Популярные маршруты</h3>
                      <p className="text-muted-foreground text-sm">Потяните вниз для просмотра всех направлений</p>
                    </CardContent>
                  </Card>
                }
              >
                <DraggableRouteCards />
              </MobileDrawer>
            </div>
            <div className="hidden md:block">
              <DraggableRouteCards />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Technologies Section */}
      <section className="py-6 sm:py-8 md:py-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-5 md:px-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-space-grotesk mb-4 sm:mb-6 leading-tight">
              Технологии <span className="kinetic-text">будущего</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Мы используем передовые технологии для создания уникального опыта путешествий
            </p>
          </motion.div>

          <div className="block md:hidden px-4 sm:px-5 md:px-6">
            <MobileFeatureDrawer features={advantages} />
          </div>

          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-5 md:px-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group"
              >
                <Card className="bg-white/5 backdrop-blur-sm border border-primary/20 h-48 sm:h-52 md:h-56 p-6 text-center hover:bg-white/10 hover:neon-glow transition-all duration-500 float group-hover:pulse-glow">
                  <CardContent className="p-0 space-y-4 sm:space-y-6 flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center neon-glow">
                      <advantage.icon className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-space-grotesk text-foreground leading-tight">
                      {advantage.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                      {advantage.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center px-4 sm:px-5 md:px-6"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-space-grotesk mb-4 sm:mb-6 leading-tight">
              Готовы к <span className="kinetic-text">путешествию</span>?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-12 sm:mb-16 lg:mb-20 max-w-2xl mx-auto px-4">
              Забронируйте поездку или отправьте посылку из Киева в любую точку Европы
            </p>
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 justify-center items-center max-w-4xl mx-auto">
              <Link href="/order" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-12 py-6 sm:py-7 lg:py-8 rounded-xl sm:rounded-2xl neon-glow pulse-glow hover:scale-105 sm:hover:scale-110 transition-all duration-300 font-space-grotesk bg-gradient-to-r from-primary to-secondary flex items-center justify-center gap-2 sm:gap-3 min-h-[64px] sm:min-h-[72px]"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] flex-shrink-0 sm:w-6 sm:h-6"
                  >
                    <path
                      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" fill="none" />
                  </svg>
                  <span className="truncate">Забронировать поездку</span>
                </Button>
              </Link>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full md:w-auto">
                <Link href="/send-package" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-xl sm:rounded-2xl border-primary/50 text-primary hover:bg-primary/10 hover:scale-105 sm:hover:scale-110 transition-all duration-300 font-space-grotesk bg-transparent flex items-center justify-center gap-2 sm:gap-3 min-h-[56px] sm:min-h-[64px]"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="drop-shadow-[0_0_8px_rgba(16,185,129,0.6)] flex-shrink-0 sm:w-6 sm:h-6"
                    >
                      <defs>
                        <linearGradient id="packageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#16e0a5" />
                          <stop offset="100%" stopColor="#22e392" />
                        </linearGradient>
                      </defs>
                      <path
                        d="m7.5 4.27 9 5.15"
                        stroke="url(#packageGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
                        stroke="url(#packageGradient)"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="m3.3 7 8.7 5 8.7-5"
                        stroke="url(#packageGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 22V12"
                        stroke="url(#packageGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="truncate">Отправить посылку</span>
                    <span className="text-xl sm:text-2xl flex-shrink-0">→</span>
                  </Button>
                </Link>

                <Link href="/dispatcher" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-xl sm:rounded-2xl border-accent/50 text-accent hover:bg-accent/10 hover:scale-105 sm:hover:scale-110 transition-all duration-300 font-space-grotesk bg-transparent flex items-center justify-center gap-2 sm:gap-3 min-h-[56px] sm:min-h-[64px]"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="drop-shadow-[0_0_8px_rgba(16,185,129,0.6)] flex-shrink-0 sm:w-6 sm:h-6"
                    >
                      <defs>
                        <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#16e0a5" />
                          <stop offset="100%" stopColor="#22e392" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                        stroke="url(#phoneGradient)"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                    <span className="truncate">Для диспетчеров</span>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <footer className="bg-card/30 py-8 sm:py-12 lg:py-16 border-t border-border backdrop-blur-xl">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-5 md:px-6">
            <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold font-space-grotesk text-foreground">PULSE LINE</h3>
              <div className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span>+380966158586</span>
                </div>
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="truncate">puilseline@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span>Киев, Украина</span>
                </div>
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Перевозки с 2016 года</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-semibold font-space-grotesk text-foreground">Направления</h3>
              <div className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
                <div>Германия (через Варшаву)</div>
                <div>Польша</div>
                <div>Литва, Латвия, Эстония</div>
                <div>Беларусь и Россия</div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 text-center sm:text-left sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold font-space-grotesk text-foreground">Связь</h3>
              <div className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  <Link
                    href="https://t.me/pulselinecom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors duration-200"
                  >
                    @pulselinecom
                  </Link>
                </div>
                <div>WhatsApp: +380966158586</div>
                <div>Поддержка: 24/7</div>
                <div className="pt-2">
                  <Link
                    href="https://t.me/pulselinecom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-200 hover:scale-105 text-primary font-medium"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Наш канал
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 text-center px-4 sm:px-5 md:px-6">
            <p className="text-muted-foreground text-sm sm:text-base">
              © {new Date().getFullYear()} PULSE LINE. Надежные перевозки из Киева по Европе.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
