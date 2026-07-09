import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Register', href: '/register' },
];

const contactInfo = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    text: 'Belgaum, Karnataka, India',
    href: '#',
  },
];

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/rotaractclubofbelgaumsouth',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const socialVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: '-80px' });
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, href) => {
    e.preventDefault();
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

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1e0a3c 0%, #150730 50%, #0f0520 100%)',
      }}
    >
      {/* Subtle glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(107,47,160,0.08)' }} />
      <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(194,24,91,0.06)' }} />

      {/* Glowing divider line */}
      <div className="relative">
        <div
          className="h-px w-full"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(107,47,160,0.4) 20%, rgba(194,24,91,0.5) 50%, rgba(107,47,160,0.4) 80%, transparent 100%)',
          }}
        />
        <div
          className="absolute top-0 left-0 h-px w-full blur-sm"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(107,47,160,0.6) 20%, rgba(194,24,91,0.7) 50%, rgba(107,47,160,0.6) 80%, transparent 100%)',
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto px-6 pt-16 pb-8"
      >
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-14 max-w-4xl mx-auto">
          {/* Left - Branding */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold tracking-wide font-display">
              <span
                style={{
                  background: 'linear-gradient(135deg, #b39ddb, #ce93d8, #e1bee7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Rotaract Club
              </span>
            </h3>
            <p className="text-sm text-white/40 font-medium tracking-wider uppercase">
              of Belgaum South
            </p>
            <p className="text-sm text-white/45 leading-relaxed max-w-xs mt-3">
              Empowering young leaders through service, fellowship, and professional development.
              Building a better community, one initiative at a time.
            </p>
          </motion.div>

          {/* Center - Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-sm font-semibold text-white/60 uppercase tracking-[0.2em] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group flex items-center gap-2 text-sm text-white/40 hover:text-white/90 transition-colors duration-300"
                  >
                    <span
                      className="inline-block w-0 group-hover:w-4 h-px transition-all duration-300"
                      style={{ background: 'linear-gradient(90deg, #6b2fa0, #c2185b)' }}
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Social icons row */}
        <motion.div
          variants={containerVariants}
          className="flex justify-center gap-5 mb-12"
        >
          {socials.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={socialVariants}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group p-3 rounded-full text-white/40 hover:text-white transition-all duration-300"
              style={{
                border: '1px solid rgba(179, 157, 219, 0.12)',
                background: 'rgba(179, 157, 219, 0.04)',
              }}
              aria-label={social.name}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-full blur-md transition-all duration-500 opacity-0 group-hover:opacity-100" style={{ background: 'rgba(107,47,160,0.15)' }} />
              <div className="absolute -inset-1 rounded-full blur-lg transition-all duration-500 opacity-0 group-hover:opacity-100" style={{ background: 'linear-gradient(135deg, rgba(107,47,160,0.1), rgba(194,24,91,0.08))' }} />
              <span className="relative z-10">{social.icon}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div variants={itemVariants}>
          {/* Subtle divider */}
          <div
            className="h-px w-full mb-6"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(179,157,219,0.1) 30%, rgba(179,157,219,0.15) 50%, rgba(179,157,219,0.1) 70%, transparent 100%)',
            }}
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25 tracking-wide">
              © 2026 Rotaract Club of Belgaum South. All rights reserved.
            </p>
            <img
              src="/images/sankalpana_shor.png.png"
              alt="Sankalpana x SHOR"
              className="h-6 md:h-8 w-auto brightness-0 invert opacity-40 object-contain"
            />
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
