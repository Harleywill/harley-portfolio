'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { label: 'Email', href: 'mailto:harley@example.com', icon: faEnvelope },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: faLinkedin },
    { label: 'GitHub', href: 'https://github.com', icon: faGithub },
  ]

  return (
    <footer className="border-t border-dark-light/20 px-6 md:px-12 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Social links */}
        <div className="flex justify-center gap-8 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-text-primary hover:text-accent-lime transition-colors transform hover:scale-110"
              title={link.label}
            >
              <FontAwesomeIcon icon={link.icon} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-text-secondary text-sm border-t border-dark-light/20 pt-8">
          <p>
            © {currentYear} Harley Williams. All rights reserved. | Crafted with{' '}
            <span className="text-accent-lime">♥</span> using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
