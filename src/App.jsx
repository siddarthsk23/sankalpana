import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Registration from './components/Registration'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      
      {/* Noise texture overlay */}
      <div className="noise-overlay" />
      
      {/* Cursor glow effect */}
      <CursorGlow />

      {/* Main content */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
