import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import AdminDemos from '@/components/AdminDemos'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Aurora from '@/components/Aurora'

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: 'transparent', position: 'static' }}>
      <Aurora />

      <Navigation />

      <div className="pt-16 relative z-10">
        <Hero />
      </div>

      <div className="relative z-10">
        <Projects />

        <AdminDemos />

        <section id="skills">
          <Skills />
        </section>

        <Contact />
        <Footer />
      </div>
    </main>
  )
}
