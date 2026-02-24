'use client'

import { useEffect, useState } from 'react'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  stock?: number
}

interface ProjectItem {
  title: string
  description: string
  technologies: string[]
  link?: string
  accentColor: 'lime' | 'orange'
  price?: number
  stock?: number
  productId?: string
}

const fallbackProjects: ProjectItem[] = [
  {
    title: 'TRVentilation',
    description: 'Full-stack e-commerce platform for ventilation products. Features include product catalog, shopping cart, order management, Stripe payments, email notifications, admin dashboard with analytics, and inventory management.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express', 'Tailwind'],
    link: 'https://trventilation.com',
    accentColor: 'lime' as const,
  },
  {
    title: 'E-Commerce Analytics Dashboard',
    description: 'Real-time analytics dashboard integrated with Google Analytics 4. Displays key metrics like active users, sessions, page views, bounce rate with customizable time filters and automated performance monitoring.',
    technologies: ['React', 'GA4 API', 'Analytics', 'Dashboard', 'Node.js'],
    accentColor: 'orange' as const,
  },
]

export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>(fallbackProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch from TRVentilation public API - no auth required
        const response = await fetch('https://trventilation.com/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          console.error('Failed to fetch products:', response.statusText)
          setLoading(false)
          return
        }

        const data = await response.json()
        const products = Array.isArray(data) ? data : data.products || []

        // Transform products into project format (take first 6 products)
        const projectItems: ProjectItem[] = products.slice(0, 6).map((product: Product, index: number) => ({
          title: product.name,
          description: product.description || `Professional ventilation product from TRVentilation's catalog. Category: ${product.category}`,
          technologies: [
            product.category,
            product.stock ? `${product.stock} in stock` : 'Check availability',
            `£${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}`,
          ],
          link: `https://trventilation.com/product/${product._id}`,
          accentColor: index % 2 === 0 ? ('lime' as const) : ('orange' as const),
          price: product.price,
          stock: product.stock,
          productId: product._id,
        }))

        setProjects(projectItems)
      } catch (error) {
        console.error('Error fetching TRVentilation products:', error)
        // Keep fallback projects if fetch fails
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section id="projects" className="relative">
      <div className="px-6 md:px-12 lg:px-20 pt-20 pb-12 max-w-7xl mx-auto">
        <div className="animate-fadeIn">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Featured <span className="text-accent-lime">Projects</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            Showcasing my work with TRVentilation's e-commerce platform, featuring real products
            from their ventilation catalog and advanced system implementations.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-400">Loading featured products...</div>
            </div>
          ) : (
            projects.map((project, index) => (
              <div
                key={index}
                className="bg-black/50 backdrop-blur-md border border-gray-700/50 hover:border-accent-lime/50 transition-all duration-300 flex flex-col justify-between rounded-3xl relative overflow-hidden p-5 sm:p-6 md:p-8 lg:p-10 min-h-fit"
              >
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 text-white break-words">
                    {project.title}
                  </h3>
                  {project.price !== undefined && (
                    <p className="text-accent-lime font-semibold mb-3 text-lg">
                      £{project.price.toFixed(2)}
                    </p>
                  )}
                  <p className="text-gray-400 text-sm sm:text-base md:text-base mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`text-xs sm:text-sm font-semibold px-3 py-2 rounded-full whitespace-nowrap ${
                        project.accentColor === 'lime'
                          ? 'bg-accent-lime/20 text-accent-lime'
                          : 'bg-accent-orange/20 text-accent-orange'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 w-fit relative z-10 text-sm sm:text-base ${
                      project.accentColor === 'lime'
                        ? 'bg-accent-lime text-dark hover:bg-accent-lime/90'
                        : 'bg-accent-orange text-dark hover:bg-accent-orange/90'
                    }`}
                  >
                    View Product →
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
