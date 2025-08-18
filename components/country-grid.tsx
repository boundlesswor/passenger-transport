"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const FlagPoland = () => (
  <svg viewBox="0 0 60 40" className="w-12 h-8 rounded shadow-md">
    <rect width="60" height="20" fill="#ffffff" />
    <rect y="20" width="60" height="20" fill="#dc143c" />
  </svg>
)

const FlagGermany = () => (
  <svg viewBox="0 0 60 40" className="w-12 h-8 rounded shadow-md">
    <rect width="60" height="13.33" fill="#000000" />
    <rect y="13.33" width="60" height="13.33" fill="#dd0000" />
    <rect y="26.66" width="60" height="13.34" fill="#ffce00" />
  </svg>
)

const FlagCzech = () => (
  <svg viewBox="0 0 60 40" className="w-12 h-8 rounded shadow-md">
    <rect width="60" height="20" fill="#ffffff" />
    <rect y="20" width="60" height="20" fill="#d7141a" />
    <polygon points="0,0 0,40 30,20" fill="#11457e" />
  </svg>
)

const FlagLithuania = () => (
  <svg viewBox="0 0 60 40" className="w-12 h-8 rounded shadow-md">
    <rect width="60" height="13.33" fill="#fdb462" />
    <rect y="13.33" width="60" height="13.33" fill="#006a44" />
    <rect y="26.66" width="60" height="13.34" fill="#c1272d" />
  </svg>
)

const FlagLatvia = () => (
  <svg viewBox="0 0 60 40" className="w-12 h-8 rounded shadow-md">
    <rect width="60" height="40" fill="#9e3039" />
    <rect y="16" width="60" height="8" fill="#ffffff" />
  </svg>
)

const FlagEstonia = () => (
  <svg viewBox="0 0 60 40" className="w-12 h-8 rounded shadow-md">
    <rect width="60" height="13.33" fill="#0072ce" />
    <rect y="13.33" width="60" height="13.33" fill="#000000" />
    <rect y="26.66" width="60" height="13.34" fill="#ffffff" />
  </svg>
)

const FlagSlovakia = () => (
  <svg viewBox="0 0 60 40" className="w-12 h-8 rounded shadow-md">
    <rect width="60" height="13.33" fill="#ffffff" />
    <rect y="13.33" width="60" height="13.33" fill="#0b4ea2" />
    <rect y="26.66" width="60" height="13.34" fill="#ee1c25" />
    <g transform="translate(8,8)">
      <path d="M0,0 L12,0 L12,24 L0,24 Z" fill="#ffffff" stroke="#ee1c25" strokeWidth="0.5" />
      <circle cx="6" cy="8" r="3" fill="#ee1c25" />
      <path d="M3,12 L9,12 L6,18 Z" fill="#0b4ea2" />
    </g>
  </svg>
)

const FlagHungary = () => (
  <svg viewBox="0 0 60 40" className="w-12 h-8 rounded shadow-md">
    <rect width="60" height="13.33" fill="#ce2939" />
    <rect y="13.33" width="60" height="13.33" fill="#ffffff" />
    <rect y="26.66" width="60" height="13.34" fill="#436f4d" />
  </svg>
)

const countries = [
  { name: "Польша", flag: <FlagPoland />, code: "PL" },
  { name: "Германия", flag: <FlagGermany />, code: "DE" },
  { name: "Чехия", flag: <FlagCzech />, code: "CZ" },
  { name: "Литва", flag: <FlagLithuania />, code: "LT" },
  { name: "Латвия", flag: <FlagLatvia />, code: "LV" },
  { name: "Эстония", flag: <FlagEstonia />, code: "EE" },
  { name: "Словакия", flag: <FlagSlovakia />, code: "SK" },
  { name: "Венгрия", flag: <FlagHungary />, code: "HU" },
]

interface CountryGridProps {
  onCountrySelect?: (country: string) => void
}

export function CountryGrid({ onCountrySelect }: CountryGridProps) {
  const handleCountryClick = (countryName: string) => {
    if (onCountrySelect) {
      onCountrySelect(countryName)
    } else {
      // Navigate to order page with country pre-selected
      const url = new URL("/order", window.location.origin)
      url.searchParams.set("country", countryName)
      window.location.href = url.toString()
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {countries.map((country, index) => (
        <motion.div
          key={country.code}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card className="glass-card p-4 cursor-pointer hover:bg-white/10 transition-all duration-300">
            <Button
              variant="ghost"
              className="w-full h-full flex flex-col items-center gap-2 p-4 hover:bg-transparent"
              onClick={() => handleCountryClick(country.name)}
            >
              <div className="mb-2 flex items-center justify-center">{country.flag}</div>
              <span className="text-sm font-medium text-foreground">{country.name}</span>
            </Button>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
