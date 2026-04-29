'use client'

const projects = [
  {
    title: 'NTS Ltd - HVAC Services Website',
    description: 'Modern Next.js website for NTS Ltd, a mechanical and electrical services company in Hull. Features custom admin dashboard for managing projects, testimonials, and news. Includes dynamic service pages, project galleries with image uploads, client testimonials carousel, and a professional portfolio section showcasing completed installations.',
    technologies: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Prisma', 'SQLite', 'Framer Motion'],
    link: 'https://www.ntslimited.org',
    accentColor: 'lime' as const,
  },
  {
    title: 'MEPM Services - Mechanical Services Website',
    description: 'Professional website for MEPM Services showcasing their mechanical services offerings. Built with modern Next.js architecture featuring service catalogs, project portfolios, client testimonials, and comprehensive contact management systems.',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Responsive Design'],
    link: 'https://www.mepmservices.co.uk',
    accentColor: 'lime' as const,
    underDevelopment: true,
  },
  {
    title: 'JDBM Building Contractors - Services Website',
    description: 'Modern website for JDBM Building Contractors Ltd featuring their building services, completed projects showcase, and client testimonials. Designed to establish strong online presence and attract new construction projects.',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Portfolio Display'],
    link: 'https://www.jdbuildingcontractorsltd.co.uk',
    accentColor: 'lime' as const,
    underDevelopment: true,
  },
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
    accentColor: 'lime' as const,
    link: 'https://analytics.google.com',
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
      <div className="px-6 md:px-12 lg:px-20 pt-8 pb-12 max-w-7xl mx-auto">
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

      <div className="px-4 sm:px-6 md:px-12 lg:px-20 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-black/50 backdrop-blur-md border border-gray-700/50 hover:border-accent-lime/50 transition-all duration-300 flex flex-col justify-between rounded-3xl relative overflow-hidden p-5 sm:p-6 md:p-8 lg:p-10 min-h-fit"
            >
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-4 text-white break-words">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base md:text-base mb-6 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs sm:text-sm font-semibold px-3 py-2 rounded-full whitespace-nowrap bg-accent-lime/20 text-accent-lime"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.link && !project.underDevelopment && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 w-fit relative z-10 text-sm sm:text-base bg-accent-lime text-dark hover:bg-accent-lime/90"
                >
                  View Project →
                </a>
              )}
              {project.underDevelopment && (
                <button
                  disabled
                  className="inline-block font-semibold py-3 px-6 rounded-lg w-fit relative z-10 text-sm sm:text-base bg-gray-600 text-gray-300 cursor-not-allowed opacity-60"
                >
                  🚀 Under Development
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
