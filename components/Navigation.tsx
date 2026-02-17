'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-dark-light/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-5 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="/"
          className="text-3xl font-black text-accent-lime"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          HW
        </motion.a>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-12 items-center">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-text-secondary text-lg font-medium"
              whileHover={{ color: '#c5ff41' }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Mobile menu button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="w-6 h-0.5 bg-accent-lime"
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-6 h-0.5 bg-accent-lime"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-6 h-0.5 bg-accent-lime"
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-dark border-b border-dark-light/20 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-6 p-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-text-secondary text-lg font-medium hover:text-accent-lime transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
