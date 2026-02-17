'use client'

import { ScrollStackItem } from './ScrollStack'

const projects = [
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
    link: 'https://trventilation.com/admin',
    accentColor: 'orange' as const,
  },
  {
    title: 'Advanced Product Management System',
    description: 'Dynamic product management system with real-time category updates, image upload optimization, SEO enhancements, and inventory tracking. Features advanced search, filtering, and product recommendations.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Multer', 'SEO'],
    accentColor: 'lime' as const,
  },
  {
    title: 'Payment & Order Processing',
    description: 'Robust payment processing with Stripe integration, order tracking, PDF invoice generation, and email notifications. Supports multiple order statuses with automated workflows and shipment tracking.',
    technologies: ['Stripe API', 'Node.js', 'Email Service', 'PDF Generation'],
    accentColor: 'orange' as const,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative">
      <div className="px-6 md:px-12 lg:px-20 pt-20 pb-12 max-w-7xl mx-auto">
        <div className="animate-fadeIn">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Featured <span className="text-accent-lime">Projects</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            Showcasing my best work in full-stack development, with a focus on scalable
            architecture and exceptional user experiences.
          </p>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {projects.map((project, index) => (
            <ScrollStackItem
              key={index}
              itemClassName="bg-black/50 backdrop-blur-md border border-gray-700/50 hover:border-accent-lime/50 transition-all duration-300 flex flex-col justify-between rounded-3xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-black mb-3 text-white">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base mb-4">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      project.accentColor === 'lime'
                        ? 'bg-accent-lime/20 text-accent-lime'
                        : 'bg-accent-orange/20 text-accent-orange'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {index === 0 && project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105 w-fit relative z-10 ${
                    project.accentColor === 'lime'
                      ? 'bg-accent-lime text-dark hover:bg-accent-lime/90'
                      : 'bg-accent-orange text-dark hover:bg-accent-orange/90'
                  }`}
                >
                  View Project →
                </a>
              )}
            </ScrollStackItem>
          ))}
        </div>
      </div>
    </section>
  )
}
