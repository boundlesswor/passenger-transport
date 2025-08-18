"use client"

import { motion } from "framer-motion"
import { Car, MapPin, Clock, Shield } from "lucide-react"

export function Floating3DElements() {
  const elements = [
    { icon: Car, color: "text-cyan-400", delay: 0 },
    { icon: MapPin, color: "text-blue-400", delay: 0.5 },
    { icon: Clock, color: "text-purple-400", delay: 1 },
    { icon: Shield, color: "text-green-400", delay: 1.5 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.color}`}
          style={{
            left: `${20 + index * 20}%`,
            top: `${30 + index * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 180, 360],
            rotateX: [0, 15, 0],
          }}
          transition={{
            duration: 4 + index,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.delay,
          }}
        >
          <element.icon size={40} className="drop-shadow-lg" />
        </motion.div>
      ))}
    </div>
  )
}
