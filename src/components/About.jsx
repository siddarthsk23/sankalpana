import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── card data ─────────────────────────────────────────────── */
const cards = [
  {
    title: 'SHOR Awards Night',
    description:
      'Celebrating the outstanding achievements and impactful projects executed by Rotaract clubs throughout the district in a glamorous evening of recognition and applause.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          stroke="url(#grad-star)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="grad-star" x1="2" y1="2" x2="22" y2="21">
            <stop stopColor="#6b2fa0" />
            <stop offset="0.5" stopColor="#c2185b" />
            <stop offset="1" stopColor="#b39ddb" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: 'DRR Installation Ceremony',
    description:
      'Witness the formal induction of DRR Rtn. Rtr. Amey Mangesh Varerkar as he assumes leadership for the Rotary International Year 2026–27, outlining a visionary roadmap for the future.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
        <path
          d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
          stroke="url(#grad-sparkle)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="3"
          stroke="url(#grad-sparkle)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="grad-sparkle" x1="2" y1="2" x2="22" y2="22">
            <stop stopColor="#6b2fa0" />
            <stop offset="0.5" stopColor="#c2185b" />
            <stop offset="1" stopColor="#b39ddb" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

/* ── single card component ────────────────────────────────── */
function AboutCard({ card, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.95 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="clean-card accent-border group relative p-8"
    >
      {/* icon */}
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, rgba(107,47,160,0.08), rgba(194,24,91,0.05))',
          border: '1px solid rgba(107,47,160,0.1)',
        }}
      >
        {card.icon}
      </div>

      {/* title */}
      <h3 className="mb-3 text-lg font-semibold tracking-wide text-deep-purple-800 font-display">
        {card.title}
      </h3>

      {/* description */}
      <p className="text-sm leading-relaxed text-deep-purple-800/50">
        {card.description}
      </p>

      {/* subtle corner accent on hover */}
      <span
        className="pointer-events-none absolute -right-px -top-px h-16 w-16 rounded-tr-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(225deg, rgba(107,47,160,0.1), transparent)',
        }}
      />
    </motion.div>
  );
}

/* ── main About section ───────────────────────────────────── */
export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      className="relative overflow-hidden py-28 md:py-36"
      style={{ background: '#f5f0fa' }}
    >
      {/* ── soft blobs ────────────────────────────────────── */}
      <div
        className="soft-blob"
        style={{
          background: 'radial-gradient(circle, rgba(107,47,160,0.1), transparent)',
          top: '-10%',
          left: '-15%',
          width: '500px',
          height: '500px',
        }}
      />
      <div
        className="soft-blob"
        style={{
          background: 'radial-gradient(circle, rgba(194,24,91,0.06), transparent)',
          bottom: '-10%',
          right: '-15%',
          width: '500px',
          height: '500px',
        }}
      />
      <div
        className="soft-blob"
        style={{
          background: 'radial-gradient(circle, rgba(179,157,219,0.1), transparent)',
          top: '40%',
          left: '40%',
          width: '400px',
          height: '400px',
        }}
      />

      {/* ── content ─────────────────────────────────────────── */}
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-6xl px-6">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-gradient mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-display">
            About The Event
          </h2>
          <p className="text-base leading-relaxed text-deep-purple-800/50 sm:text-lg">
            Join us for an unforgettable evening featuring two momentous occasions. We come together to recognize excellence at the SHOR Awards and usher in a new era of leadership at the Installation Ceremony.
          </p>
        </motion.div>

        {/* cards grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((card, i) => (
            <AboutCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
