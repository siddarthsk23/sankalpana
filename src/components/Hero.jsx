import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AuroraBackground } from './ui/aurora-background';
import { useNavigate } from 'react-router-dom';

// ─── Floating Petal (soft decorative element) ─────────────────────
function FloatingPetal({ delay, duration, x, y, size, color }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        left: `${x}%`,
        top: `${y}%`,
        filter: `blur(${size > 4 ? 2 : 1}px)`,
      }}
      animate={{
        y: [0, -20, 8, -15, 0],
        x: [0, 10, -8, 12, 0],
        opacity: [0, 0.6, 0.3, 0.6, 0],
        scale: [0.5, 1, 0.8, 1, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// ─── Soft Light Streak ───────────────────────────────────────────
function SoftStreak({ angle, delay, top, left }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        width: '200px',
        height: '1px',
        top: `${top}%`,
        left: `${left}%`,
        transform: `rotate(${angle}deg)`,
        background:
          'linear-gradient(90deg, transparent, rgba(107,47,160,0.2), rgba(194,24,91,0.15), transparent)',
      }}
      animate={{
        opacity: [0, 0.5, 0],
        scaleX: [0, 1, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
        ease: 'easeInOut',
      }}
    />
  );
}

// ─── Scroll Chevron ──────────────────────────────────────────────
function ScrollChevron() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.2, duration: 1 }}
      onClick={() =>
        document
          .getElementById('about')
          ?.scrollIntoView({ behavior: 'smooth' })
      }
    >
      <span className="text-[11px] uppercase tracking-[0.25em] text-deep-purple-800/30 font-medium">
        Scroll to explore
      </span>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(30,10,60,0.3)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <polyline points="6 9 12 15 18 9" />
      </motion.svg>
    </motion.div>
  );
}

// ─── Hero Component ──────────────────────────────────────────────
export default function Hero() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Title animation
  const titleText = 'SANKALPANA';
  const titleLetters = titleText.split('');

  const letterVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -90, filter: 'blur(12px)' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.8 + i * 0.09,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  // Subtitle animation
  const subtitleVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: 2.0, duration: 1, ease: 'easeOut' },
    },
  };

  // Hosted-by animation
  const hostedVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 2.5, duration: 0.8, ease: 'easeOut' },
    },
  };

  // CTA animation
  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.7, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { delay: 2.8, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  // Generate particles once
  const petals = useMemo(() => {
    const colors = [
      'rgba(107,47,160,0.25)',
      'rgba(194,24,91,0.2)',
      'rgba(179,157,219,0.3)',
      'rgba(206,147,216,0.25)',
      'rgba(243,229,245,0.4)',
    ];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 6,
      color: colors[i % colors.length],
    }));
  }, []);

  const streaks = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        angle: Math.random() * 60 - 30,
        delay: Math.random() * 4 + 1,
        top: Math.random() * 80 + 10,
        left: Math.random() * 80 + 10,
      })),
    []
  );

  return (
    <AuroraBackground className="!p-0 !m-0 !justify-start">
      <section
        ref={sectionRef}
        id="hero"
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      >
      {/* ── Animated Background Layer ─────────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ scale: bgScale, opacity: bgOpacity }}
      >
        {/* Soft mesh gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(179,157,219,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(206,147,216,0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(243,229,245,0.15) 0%, transparent 50%)',
          }}
        />

        {/* Soft blobs */}
        <motion.div
          className="soft-blob hidden md:block"
          style={{
            background:
              'radial-gradient(circle, rgba(107,47,160,0.12) 0%, transparent 70%)',
            top: '-10%',
            left: '20%',
            width: '600px',
            height: '600px',
          }}
          animate={{
            x: [0, 60, -30, 50, 0],
            y: [0, 40, -20, 30, 0],
            scale: [1, 1.1, 0.95, 1.08, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="soft-blob hidden md:block"
          style={{
            background:
              'radial-gradient(circle, rgba(194,24,91,0.08) 0%, transparent 70%)',
            top: '30%',
            right: '-5%',
            width: '500px',
            height: '500px',
          }}
          animate={{
            x: [0, -50, 25, -40, 0],
            y: [0, -30, 50, -15, 0],
            scale: [1, 1.08, 0.92, 1.12, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        <motion.div
          className="soft-blob hidden md:block"
          style={{
            background:
              'radial-gradient(circle, rgba(179,157,219,0.15) 0%, transparent 70%)',
            bottom: '-5%',
            left: '50%',
            width: '500px',
            height: '500px',
          }}
          animate={{
            x: [0, 40, -60, 25, 0],
            y: [0, -25, 15, -40, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />

        {/* Floating petals - hidden on mobile */}
        <div className="hidden md:block">
          {petals.map((p) => (
            <FloatingPetal key={p.id} {...p} />
          ))}
        </div>

        {/* Soft streaks - hidden on mobile */}
        <div className="hidden md:block">
          {streaks.map((s) => (
            <SoftStreak key={s.id} {...s} />
          ))}
        </div>

        {/* Central light flare */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none hidden md:block"
          style={{
            background:
              'radial-gradient(circle, rgba(179,157,219,0.08) 0%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto">

        {/* Hosted by — top tagline */}
        <motion.p
          variants={hostedVariants}
          initial="hidden"
          animate="visible"
          className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] mb-6 sm:mb-8"
          style={{
            background: 'linear-gradient(135deg, #6b2fa0, #c2185b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Rotaract Club of Belgaum South
        </motion.p>

        {/* Main title — logo image */}
        <motion.div
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            delay: 0.8,
            duration: 1.2,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="flex justify-center"
        >
          <img
            src="/images/sankalpana_shor.png.png"
            alt="Sankalpana x SHOR"
            className="w-[340px] sm:w-[450px] md:w-[600px] lg:w-[800px] h-auto object-contain drop-shadow-sm"
          />
        </motion.div>

        {/* Decorative line under title */}
        <motion.div
          className="mt-6 sm:mt-8 h-[2px] w-0 rounded-full"
          style={{
            background:
              'linear-gradient(90deg, transparent, #6b2fa0, #c2185b, #b39ddb, transparent)',
          }}
          animate={{ width: '280px' }}
          transition={{ delay: 1.8, duration: 1, ease: 'easeOut' }}
        />

        {/* Subtitle */}
        <motion.div style={{ y: subtitleY }}>
          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-deep-purple-800/60 font-light max-w-2xl leading-relaxed tracking-wide"
          >
            Installation Ceremony of
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            transition={{ delay: 2.15, duration: 1, ease: 'easeOut' }}
            className="mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl text-deep-purple-800/90 font-medium tracking-wide"
          >
            DRR Rtn. Rtr.{' '}
            <span className="text-gradient font-semibold">Amey Mangesh Varerkar</span>
          </motion.p>
        </motion.div>

        {/* Year / Edition badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.4, duration: 0.6, ease: 'easeOut' }}
          className="mt-5 sm:mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80"
          style={{
            border: '1px solid rgba(107, 47, 160, 0.12)',
            boxShadow: '0 2px 8px rgba(107, 47, 160, 0.06)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-deep-purple-800/50 font-medium">
            Rotary International Year 2026–27
          </span>
        </motion.div>

        {/* CTA Button */}
        <motion.div style={{ y: ctaY }} className="mt-10 sm:mt-12">
          <motion.button
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="primary-btn text-sm sm:text-base"
            onClick={() => navigate('/register')}
          >
            Register Now
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────── */}
      <ScrollChevron />

      {/* ── Bottom vignette ───────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 w-full h-40 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #fafafa 0%, transparent 100%)',
        }}
      />
    </section>
  </AuroraBackground>
  );
}
