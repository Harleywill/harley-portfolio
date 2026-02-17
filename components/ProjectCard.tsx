'use client'

import { motion } from 'framer-motion'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  link?: string
  accentColor: 'lime' | 'orange'
  image?: string
}

export default function ProjectCard({
  title,
  description,
  technologies,
  link,
  accentColor,
}: ProjectCardProps) {
  const bgColor = accentColor === 'lime' ? 'bg-accent-lime' : 'bg-accent-orange'
  const textColor = accentColor === 'lime' ? 'text-dark' : 'text-white'

  return (
    <motion.a
      href={link}
      target={link ? '_blank' : undefined}
      rel={link ? 'noopener noreferrer' : undefined}
      className={`group ${bgColor} rounded-xl p-6 md:p-8 min-h-96 flex flex-col justify-between cursor-pointer block overflow-hidden`}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)' }}
      />

      <div className="relative z-10">
        <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${textColor}`}>
          {title}
        </h3>
        <p className={`text-base md:text-lg leading-relaxed mb-6 ${textColor} opacity-90`}>
          {description}
        </p>
      </div>

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <motion.span
              key={tech}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                accentColor === 'lime'
                  ? 'bg-dark/20 text-dark'
                  : 'bg-white/20 text-white'
              }`}
              whileHover={{ scale: 1.1 }}
              transition={{ delay: index * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
        {link && (
          <motion.div
            className={`inline-flex items-center gap-2 font-bold ${textColor}`}
            whileHover={{ gap: 12 }}
          >
            View Project
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.div>
        )}
      </div>
    </motion.a>
  )
}
