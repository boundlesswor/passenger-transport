"use client"

import { motion } from "framer-motion"

export function HeroBus() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <motion.svg
        width="500"
        height="280"
        viewBox="0 0 500 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Bus body shadow */}
        <motion.ellipse
          cx="250"
          cy="240"
          rx="120"
          ry="15"
          fill="currentColor"
          className="text-muted opacity-20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

        {/* Main bus body */}
        <motion.path
          d="M80 180 L80 120 Q80 100 100 100 L120 100 L120 90 Q120 80 130 80 L370 80 Q380 80 380 90 L380 100 L400 100 Q420 100 420 120 L420 180 L430 180 Q440 180 440 190 L440 200 Q440 210 430 210 L420 210 Q420 220 410 220 L390 220 Q380 220 380 210 L380 200 L120 200 L120 210 Q120 220 110 220 L90 220 Q80 220 80 210 L80 200 L70 200 Q60 200 60 190 L60 180 Q60 170 70 170 L80 170 Z"
          fill="url(#busGradient)"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Windshield */}
        <motion.path
          d="M130 90 L130 120 L180 120 L180 90 Q180 85 175 85 L135 85 Q130 85 130 90 Z"
          fill="currentColor"
          className="text-accent opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        />

        {/* Side windows */}
        <motion.rect
          x="190"
          y="95"
          width="35"
          height="25"
          rx="3"
          fill="currentColor"
          className="text-accent opacity-25"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        />
        <motion.rect
          x="235"
          y="95"
          width="35"
          height="25"
          rx="3"
          fill="currentColor"
          className="text-accent opacity-25"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        />
        <motion.rect
          x="280"
          y="95"
          width="35"
          height="25"
          rx="3"
          fill="currentColor"
          className="text-accent opacity-25"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        />
        <motion.rect
          x="325"
          y="95"
          width="35"
          height="25"
          rx="3"
          fill="currentColor"
          className="text-accent opacity-25"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        />

        {/* Door */}
        <motion.rect
          x="350"
          y="130"
          width="25"
          height="50"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.4 }}
        />

        {/* Door handle */}
        <motion.circle
          cx="370"
          cy="155"
          r="2"
          fill="currentColor"
          className="text-secondary"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.4, duration: 0.3 }}
        />

        {/* Front wheels */}
        <motion.circle
          cx="110"
          cy="210"
          r="20"
          fill="currentColor"
          className="text-muted"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 2.6, duration: 0.6, type: "spring" }}
        />
        <motion.circle
          cx="110"
          cy="210"
          r="12"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-secondary"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.8, duration: 0.4 }}
        />

        {/* Rear wheels */}
        <motion.circle
          cx="390"
          cy="210"
          r="20"
          fill="currentColor"
          className="text-muted"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 2.7, duration: 0.6, type: "spring" }}
        />
        <motion.circle
          cx="390"
          cy="210"
          r="12"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-secondary"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.9, duration: 0.4 }}
        />

        {/* Headlights */}
        <motion.circle
          cx="420"
          cy="140"
          r="8"
          fill="currentColor"
          className="text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
        />
        <motion.circle
          cx="420"
          cy="160"
          r="6"
          fill="currentColor"
          className="text-secondary opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 3.1, duration: 0.5 }}
        />

        {/* Grille details */}
        <motion.rect
          x="415"
          y="145"
          width="8"
          height="2"
          fill="currentColor"
          className="text-muted"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3.2, duration: 0.3 }}
        />
        <motion.rect
          x="415"
          y="150"
          width="8"
          height="2"
          fill="currentColor"
          className="text-muted"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 3.3, duration: 0.3 }}
        />

        {/* Loading animation dots */}
        <motion.circle
          cx="200"
          cy="250"
          r="4"
          fill="currentColor"
          className="text-primary"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 3.5,
          }}
        />
        <motion.circle
          cx="220"
          cy="250"
          r="4"
          fill="currentColor"
          className="text-secondary"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 3.7,
          }}
        />
        <motion.circle
          cx="240"
          cy="250"
          r="4"
          fill="currentColor"
          className="text-accent"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 3.9,
          }}
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="busGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" className="text-primary" stopOpacity="0.8" />
            <stop offset="50%" stopColor="currentColor" className="text-secondary" stopOpacity="0.6" />
            <stop offset="100%" stopColor="currentColor" className="text-accent" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  )
}
