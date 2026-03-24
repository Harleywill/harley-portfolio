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

export default function About() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-16 md:py-20 relative z-10">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            className="md:col-span-2 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-lime to-accent-orange rounded-full opacity-20 blur-2xl"></div>
              <div className="relative w-full h-full rounded-full border-2 border-accent-lime/40 overflow-hidden">
                <img
                  src="/harley-profile.png"
                  alt="Harley Williams"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div className="md:col-span-3" variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              About <span className="text-accent-lime">Me</span>
            </h2>

            <p className="text-text-secondary text-base md:text-lg mb-6 leading-relaxed">
              I'm a full-stack developer with 1.5 years of hands-on experience building scalable web applications and solving complex technical challenges. My specialty is creating seamless user experiences backed by robust backend systems.
            </p>

            <p className="text-text-secondary text-base md:text-lg mb-8 leading-relaxed">
              I've launched 2 production projects including a full-featured e-commerce platform with Stripe payments and real-time analytics dashboard. I'm passionate about clean code, performance optimization, and delivering products that users love.
            </p>

            <div className="flex gap-4 flex-wrap">
              <motion.a
                href="/HarleyWilliamsCV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-accent-lime text-dark font-bold rounded-lg hover:shadow-lg hover:shadow-accent-lime/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.a>
              <motion.a
                href="#contact"
                className="px-6 py-3 border-2 border-accent-orange text-accent-orange font-bold rounded-lg hover:bg-accent-orange/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
