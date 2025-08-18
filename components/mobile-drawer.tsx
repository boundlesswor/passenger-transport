"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface MobileDrawerProps {
  children: React.ReactNode
  triggerCard: React.ReactNode
  title?: string
  className?: string
}

interface FeatureCard {
  icon: React.ComponentType<any>
  title: string
  desc: string
}

interface MobileFeatureDrawerProps {
  features: FeatureCard[]
  className?: string
}

export function MobileFeatureDrawer({ features, className = "" }: MobileFeatureDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (features.length === 0) return null

  const triggerFeature = features[0]
  const remainingFeatures = features.slice(1)

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Card */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer relative transform transition-transform duration-200 active:scale-95"
      >
        <div className="holo-glass rounded-2xl p-6 h-48 sm:h-52 md:h-56 hover:scale-105 transition-all duration-300 group flex flex-col items-center justify-center">
          <triggerFeature.icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:neon-glow transition-all duration-300" />
          <h3 className="text-xl font-semibold mb-2 font-space-grotesk text-center">{triggerFeature.title}</h3>
          <p className="text-muted-foreground text-center text-sm">{triggerFeature.desc}</p>
        </div>

        {/* Drawer Indicator */}
        <div className="absolute bottom-2 right-2 bg-primary/20 backdrop-blur-sm rounded-full p-2">
          <ChevronDown
            className={`w-4 h-4 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Content */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border rounded-t-3xl z-50 max-h-[80vh] overflow-hidden transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag Handle */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Title */}
        <div className="px-4 sm:px-5 md:px-6 pb-4">
          <h3 className="text-lg font-semibold text-center">Посмотреть все направления</h3>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-5 md:px-6 pb-6 overflow-y-auto max-h-[calc(80vh-80px)] space-y-4">
          {remainingFeatures.map((feature, i) => (
            <div
              key={i}
              className="holo-glass rounded-2xl p-6 h-48 sm:h-52 md:h-56 transition-all duration-300 flex flex-col items-center justify-center"
            >
              <feature.icon className="w-12 h-12 text-primary mx-auto mb-4 transition-all duration-300" />
              <h3 className="text-xl font-semibold mb-2 font-space-grotesk text-center">{feature.title}</h3>
              <p className="text-muted-foreground text-center">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MobileDrawer({ children, triggerCard, title, className = "" }: MobileDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Card */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer relative transform transition-transform duration-200 active:scale-95"
      >
        {triggerCard}

        {/* Drawer Indicator */}
        <div className="absolute bottom-2 right-2 bg-primary/20 backdrop-blur-sm rounded-full p-2">
          <ChevronDown
            className={`w-4 h-4 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Content */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border rounded-t-3xl z-50 max-h-[80vh] overflow-hidden transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag Handle */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
        </div>

        {/* Title */}
        {title && (
          <div className="px-4 sm:px-5 md:px-6 pb-4">
            <h3 className="text-lg font-semibold text-center">{title}</h3>
          </div>
        )}

        {/* Content */}
        <div className="px-4 sm:px-5 md:px-6 pb-6 overflow-y-auto max-h-[calc(80vh-80px)]">{children}</div>
      </div>
    </div>
  )
}
