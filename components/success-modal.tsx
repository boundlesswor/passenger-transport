"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
}

export default function SuccessModal({
  isOpen,
  onClose,
  title = "Заявка отправлена!",
  message = "Ваша заявка успешно отправлена. Ожидайте, с вами скоро свяжутся.",
}: SuccessModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      if (typeof document !== "undefined") {
        document.body.style.overflow = "hidden"
      }
    } else {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "unset"
      }
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "unset"
      }
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.4, type: "spring", damping: 25, stiffness: 300 }}
            className="relative glass-card p-8 max-w-md w-full text-center"
          >
            {/* Success Animation */}
            <div className="mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 15, stiffness: 300 }}
                className="mx-auto w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center relative"
              >
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </motion.svg>

                {/* Glow effect */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
                />
              </motion.div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-4 kinetic-text"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 mb-8 leading-relaxed"
            >
              {message}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <Link href="/" className="block">
                <Button
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 neon-glow"
                  onClick={handleClose}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Вернуться на главную
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                onClick={handleClose}
              >
                Закрыть
              </Button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
