import Hero from '../components/Hero'
import About from '../components/About'
import Dignitaries from '../components/Dignitaries'
import HostClub from '../components/HostClub'
import Timeline from '../components/Timeline'
import Venue from '../components/Venue'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Dignitaries />
      <div className="section-divider" />
      <HostClub />
      <div className="section-divider" />
      <Timeline />
      <div className="section-divider" />
      <Venue />
      <div className="section-divider" />
      <Contact />
    </main>
  )
}

