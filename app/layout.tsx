import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Harley Williams | Full Stack Developer',
  description: 'Full Stack Developer specializing in React, Node.js, and MongoDB. Building scalable web applications.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-dark text-text-primary font-poppins">
        {children}
      </body>
    </html>
  )
}
