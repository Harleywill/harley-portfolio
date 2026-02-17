'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
}

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 relative overflow-hidden">
      <motion.div
        className="relative z-10 max-w-4xl"
        style={{ opacity: 1 }}
      >
        {/* Greeting */}
        <motion.p
          className="text-accent-lime text-lg md:text-xl mb-4 font-medium"
          style={{ opacity: 1 }}
        >
          Hi there, I&apos;m Harley
        </motion.p>

        {/* Main headline */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6"
          style={{ opacity: 1 }}
        >
          Full Stack
          <br />
          <span className="bg-gradient-to-r from-accent-lime to-accent-orange bg-clip-text text-transparent">
            Developer
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-text-secondary text-base md:text-lg max-w-2xl mb-8 leading-relaxed"
          style={{ opacity: 1 }}
        >
          I build scalable web applications using React, Node.js, MongoDB, and more.
          Specializing in creating seamless user experiences and robust backend systems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div className="flex gap-4 flex-wrap" style={{ opacity: 1 }}>
          <motion.a
            href="#projects"
            className="px-8 py-4 bg-accent-lime text-dark font-bold rounded-lg hover:shadow-lg hover:shadow-accent-lime/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-4 border-2 border-accent-orange text-accent-orange font-bold rounded-lg hover:bg-accent-orange/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-6 h-6 text-accent-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
