import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Dignitaries', href: '#dignitaries' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Venue', href: '#venue' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Handle hash scroll after page navigation
  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      setTimeout(() => {
        const target = document.querySelector(location.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.pathname, location.hash]);

  const handleNavClick = (e, href, onNavigate) => {
    e.preventDefault();
    if (onNavigate) onNavigate();

    if (href.startsWith('/')) {
      navigate(href);
      return;
    }

    if (location.pathname !== '/') {
      navigate(`/${href}`);
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className="transition-all duration-500 ease-out"
          style={{
            background: scrolled
              ? 'rgba(255, 255, 255, 0.85)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            borderBottom: scrolled
              ? '1px solid rgba(107, 47, 160, 0.08)'
              : '1px solid transparent',
            boxShadow: scrolled
              ? '0 4px 20px rgba(30, 10, 60, 0.05)'
              : 'none',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-18 relative">
            {/* Left: Logo */}
            <Link
              to="/"
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="relative z-10 hidden md:flex flex-shrink-0"
            >
              <img
                src="/images/sankalpana_shor.png.png"
                alt="Sankalpana x SHOR"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </Link>

            {/* Center: Desktop links */}
            <div className="hidden lg:flex items-center justify-center flex-grow gap-2 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative px-3 xl:px-4 py-2 text-sm text-deep-purple-800/60 hover:text-deep-purple-800 transition-colors duration-300 tracking-wide font-medium"
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Hover underline */}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-5 h-[2px] bg-gradient-to-r from-brand-purple-500 to-brand-magenta-500 transition-all duration-300 rounded-full" />
                </a>
              ))}

              {/* Register CTA button */}
              <motion.a
                href="/register"
                onClick={(e) => handleNavClick(e, '/register')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="ml-2 xl:ml-4 px-5 py-2 text-sm font-semibold text-white rounded-full whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #6b2fa0, #c2185b)',
                  boxShadow: '0 2px 10px rgba(107, 47, 160, 0.2)',
                }}
              >
                Register
              </motion.a>
            </div>

            {/* Right: Partner Logos */}
            <div className="flex items-center justify-start md:justify-end flex-grow md:flex-grow-0 mr-4 lg:mr-0">
              <img
                src="/images/logos_strip.png"
                alt="Partner Logos"
                className="w-full md:w-auto h-auto max-h-10 sm:max-h-12 md:h-10 lg:h-10 xl:h-12 md:max-h-none object-contain object-left md:object-center transition-transform hover:scale-105 duration-300"
              />
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden relative z-10 p-2 -mr-2"
              aria-label="Toggle navigation menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={
                    mobileOpen
                      ? { rotate: 45, y: 8, backgroundColor: '#1e0a3c' }
                      : { rotate: 0, y: 0, backgroundColor: '#1e0a3c' }
                  }
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="block h-[2px] w-full rounded-full origin-center"
                  style={{ backgroundColor: '#1e0a3c' }}
                />
                <motion.span
                  animate={
                    mobileOpen
                      ? { opacity: 0, scaleX: 0 }
                      : { opacity: 1, scaleX: 1 }
                  }
                  transition={{ duration: 0.2 }}
                  className="block h-[2px] w-full rounded-full"
                  style={{ backgroundColor: '#1e0a3c' }}
                />
                <motion.span
                  animate={
                    mobileOpen
                      ? { rotate: -45, y: -8, backgroundColor: '#1e0a3c' }
                      : { rotate: 0, y: 0, backgroundColor: '#1e0a3c' }
                  }
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="block h-[2px] w-full rounded-full origin-center"
                  style={{ backgroundColor: '#1e0a3c' }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative flex flex-col items-center justify-center h-full gap-2"
            >
              {/* Subtle glow */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-[80px] pointer-events-none" style={{ background: 'rgba(179, 157, 219, 0.15)' }} />

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) =>
                    handleNavClick(e, link.href, () => setMobileOpen(false))
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.15 + i * 0.07,
                  }}
                  className="text-2xl font-display font-medium text-deep-purple-800/60 hover:text-deep-purple-800 tracking-wide py-3 transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * navLinks.length + 0.1, duration: 0.5, ease: 'easeOut' }}
                className="mt-6"
              >
                <a
                  href="/register"
                  onClick={(e) => handleNavClick(e, '/register', () => setMobileOpen(false))}
                  className="inline-block px-8 py-3 text-lg font-semibold text-white rounded-full shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #6b2fa0, #c2185b)',
                  }}
                >
                  Register Now
                </a>
              </motion.div>

              {/* Bottom branding */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-12"
              >
                <span className="text-xs text-deep-purple-800/25 tracking-[0.3em] uppercase font-body">
                  Sankalpana 2026
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
