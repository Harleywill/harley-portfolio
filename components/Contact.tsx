'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faBriefcase, faCode } from '@fortawesome/free-solid-svg-icons'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Send email via FormSubmit or similar service
    const mailtoLink = `mailto:Hjakewilliams@gmail.com?subject=Portfolio Inquiry from ${formData.name}&body=${formData.message}%0A%0AFrom: ${formData.email}`
    window.location.href = mailtoLink
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="min-h-screen px-6 md:px-12 lg:px-20 py-20 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section header */}
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Let&apos;s <span className="text-accent-lime">Connect</span>
          </h2>
          <p className="text-text-secondary text-lg">
            Feel free to reach out to me for collaboration or just a friendly hello.
          </p>
        </div>

        {/* Contact methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center animate-slideUp">
            <div className="text-4xl mb-4 text-accent-lime">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <h3 className="font-bold text-lg mb-2">Email</h3>
            <a
              href="mailto:Hjakewilliams@gmail.com"
              className="text-accent-lime hover:text-accent-orange transition-colors"
            >
              Hjakewilliams@gmail.com
            </a>
          </div>

          <div className="text-center animate-slideUp" style={{ animationDelay: '100ms' }}>
            <div className="text-4xl mb-4 text-accent-lime">
              <FontAwesomeIcon icon={faBriefcase} />
            </div>
            <h3 className="font-bold text-lg mb-2">LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/harley-williams/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-lime hover:text-accent-orange transition-colors"
            >
              linkedin.com/in/harley-williams
            </a>
          </div>

          <div className="text-center animate-slideUp" style={{ animationDelay: '200ms' }}>
            <div className="text-4xl mb-4 text-accent-lime">
              <FontAwesomeIcon icon={faCode} />
            </div>
            <h3 className="font-bold text-lg mb-2">GitHub</h3>
            <a
              href="https://github.com/Harleywill"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-lime hover:text-accent-orange transition-colors"
            >
              github.com/Harleywill
            </a>
          </div>
        </div>

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto animate-slideUp" style={{ animationDelay: '300ms' }}>
          <div className="bg-dark-light rounded-xl p-8 border border-dark-light">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark rounded-lg border border-dark-light focus:border-accent-lime focus:outline-none text-white transition-colors"
                placeholder="Your name"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark rounded-lg border border-dark-light focus:border-accent-lime focus:outline-none text-white transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-dark rounded-lg border border-dark-light focus:border-accent-lime focus:outline-none text-white transition-colors resize-none"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-accent-lime text-dark font-bold rounded-lg hover:shadow-lg hover:shadow-accent-lime/50 transform hover:scale-105 transition-all"
            >
              Send Message
            </button>

            {submitted && (
              <p className="mt-4 text-center text-accent-lime font-semibold animate-fadeIn">
                Thanks for reaching out! I&apos;ll get back to you soon.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
