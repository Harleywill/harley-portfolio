const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', url: 'https://react.dev' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com' },
      { name: 'Bootstrap', url: 'https://getbootstrap.com' },
      { name: 'Next.js', url: 'https://nextjs.org' },
      { name: 'Responsive Design', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design' },
    ],
    icon: '🎨',
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', url: 'https://nodejs.org' },
      { name: 'Express.js', url: 'https://expressjs.com' },
      { name: 'MongoDB', url: 'https://www.mongodb.com' },
      { name: 'Mongoose', url: 'https://mongoosejs.com' },
      { name: 'RESTful APIs', url: 'https://restfulapi.net' },
      { name: 'Authentication', url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Authentication' },
    ],
    icon: '⚙️',
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Git', url: 'https://git-scm.com' },
      { name: 'GitHub', url: 'https://github.com' },
      { name: 'PM2', url: 'https://pm2.keymetrics.io' },
      { name: 'Nginx', url: 'https://nginx.org' },
      { name: 'Linux/VPS', url: 'https://www.linux.org' },
      { name: 'SSL/TLS', url: 'https://www.ssl.com' },
      { name: 'Stripe API', url: 'https://stripe.com/docs' },
    ],
    icon: '🛠️',
  },
  {
    category: 'Other',
    skills: [
      { name: 'Email Services', url: 'https://www.brevo.com' },
      { name: 'File Upload', url: 'https://github.com/expressjs/multer' },
      { name: 'Payment Processing', url: 'https://stripe.com/docs' },
      { name: 'Performance Optimization', url: 'https://web.dev/performance' },
      { name: 'SEO', url: 'https://developers.google.com/search' },
      { name: 'Analytics', url: 'https://analytics.google.com' },
    ],
    icon: '✨',
  },
]

export default function Skills() {
  return (
    <section className="min-h-screen px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 animate-fadeIn">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Technical <span className="text-accent-orange">Skills</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            A comprehensive overview of technologies and tools I work with daily.
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-black/50 backdrop-blur-md rounded-xl p-8 border border-gray-700 hover:border-accent-lime/50 transition-all duration-300 animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">{category.icon}</span>
                <h3 className="text-2xl font-bold">{category.category}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <a
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-accent-lime/10 text-accent-lime rounded-lg font-medium text-sm hover:bg-accent-lime/20 hover:text-accent-orange transition-all duration-300 cursor-pointer"
                  >
                    {skill.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center animate-fadeIn">
          <p className="text-text-secondary text-lg mb-6">
            Always learning and staying up-to-date with the latest technologies.
          </p>
        </div>
      </div>
    </section>
  )
}
