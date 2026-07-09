import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── dignitary data ── */
const featured = [];

const dignitaries = [
  {
    name: 'DRRN Rtr. Rtn. Ketan Shinde',
    designation: 'ZRR - Belgaum Zone',
    org: '',
    initials: 'KS',
    image: '/images/ketan_nobg.png',
  },
  {
    name: 'Rtn. Santosh Hattargi',
    designation: 'President',
    org: 'Rotary Club of Belgaum South',
    initials: 'SH',
    image: '/images/santosh_nobg.png',
  },
  {
    name: 'Rtr. Monika Asundi',
    designation: 'President',
    org: 'Rotaract Club of Belgaum South',
    initials: 'MA',
    image: '/images/monika_nobg.png',
  },
  {
    name: 'Rtr. Sakshi Jadeja',
    designation: 'Secretary Reporting',
    org: 'Rotaract Club of Belgaum South',
    initials: 'SJ',
    image: '/images/sakshi_nobg.png',
  },
  {
    name: 'Rtr. Moris Veigas',
    designation: 'Secretary Admin',
    org: 'Rotaract Club of Belgaum South',
    initials: 'MV',
    image: '/images/moris_nobg.png',
  },
  {
    name: 'Rtr. Mahesh Shinde',
    designation: 'Event Chairman',
    org: 'Rotaract Club of Belgaum South',
    initials: 'MS',
    image: '/images/mahesh_nobg.png',
  },
  {
    name: 'Rtr. Soham Oulkar',
    designation: 'Event Secretary',
    org: 'Rotaract Club of Belgaum South',
    initials: 'SO',
    image: '/images/soham_nobg.png',
  },
  {
    name: 'Rtr. Siddarth Kshirsagar',
    designation: 'Creative and Technical Lead',
    org: 'Rotaract Club of Belgaum South',
    initials: 'SK',
    image: '/images/siddarth1_nobg.png',
  },
];

/* ── soft light-streak component ── */
function SoftStreak({ delay, top, left, angle, width }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        width: width || 220,
        height: 2,
        background:
          'linear-gradient(90deg, transparent, rgba(107,47,160,0.15), rgba(194,24,91,0.1), transparent)',
        transform: `rotate(${angle}deg)`,
        filter: 'blur(1px)',
      }}
      animate={{ opacity: [0, 0.5, 0], x: ['-20%', '120%'] }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        repeatDelay: 4,
        ease: 'easeInOut',
      }}
    />
  );
}

/* ── rotating‑border avatar ── */
function Avatar({ initials, image, imgStyle, size = 112 }) {
  const outerSize = size + 8;
  return (
    <div className="relative mx-auto" style={{ width: outerSize, height: outerSize }}>
      {/* rotating gradient ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, #6b2fa0, #c2185b, #b39ddb, #6b2fa0)',
          padding: 3,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: '#ffffff' }}
        />
      </motion.div>

      {/* inner circle with gradient & initials */}
      <div
        className="absolute rounded-full flex items-center justify-center overflow-hidden"
        style={{
          inset: 4,
          background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
        }}
      >
        {image ? (
          <img src={image} alt="Avatar" className="w-full h-full object-cover bg-white" style={imgStyle} />
        ) : (
          <span
            className="font-bold tracking-wide select-none font-display"
            style={{
              fontSize: size * 0.32,
              background: 'linear-gradient(135deg, #6b2fa0, #c2185b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── single card ── */
function DignitaryCard({ data, index, isFeatured = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: isFeatured ? 0.1 : 0.25 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.03, transition: { duration: 0.35 } }}
      className={`group relative h-full ${
        isFeatured ? 'max-w-md mx-auto w-full' : ''
      }`}
    >
      {/* hover glow layer */}
      <div
        className="absolute -inset-[1px] rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(107,47,160,0.15), rgba(194,24,91,0.1), rgba(179,157,219,0.1))',
          filter: 'blur(12px)',
        }}
      />

      {/* card body */}
      <div
        className={`clean-card relative z-10 flex flex-col items-center text-center h-full ${
          isFeatured ? 'py-12 px-8' : 'py-10 px-6'
        }`}
        style={{ transform: 'none' }} /* override hover transform on inner card */
      >
        {/* badge for featured removed */}

        {/* avatar */}
        <div className={isFeatured ? 'mb-7' : 'mb-5'}>
          <Avatar initials={data.initials} image={data.image} imgStyle={data.imgStyle} size={isFeatured ? 128 : 96} />
        </div>

        {/* name */}
        <h3
          className={`font-bold text-deep-purple-800 leading-tight font-display ${
            isFeatured ? 'text-2xl md:text-[1.7rem]' : 'text-lg'
          }`}
        >
          {data.name}
        </h3>

        {/* designation */}
        <p className="text-gradient text-sm font-semibold mt-2 tracking-wide">
          {data.designation}
        </p>

        {/* org */}
        <p className="text-deep-purple-800/40 text-xs mt-1.5 tracking-wide">
          {data.org}
        </p>

        {/* decorative line */}
        <div
          className="mt-5 h-[1px] w-16 mx-auto"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(107,47,160,0.3), transparent)',
          }}
        />
      </div>
    </motion.div>
  );
}

/* ── main section ── */
export default function HostClub() {
  const sectionRef = useRef(null);
  const headingInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="host-club"
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: '#fafafa' }}
    >
      {/* ── background elements ── */}
      <div
        className="soft-blob"
        style={{
          top: '5%',
          left: '-8%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(107,47,160,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="soft-blob"
        style={{
          bottom: '0%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(194,24,91,0.06) 0%, transparent 70%)',
        }}
      />

      {/* floating light streaks (very subtle) */}
      <SoftStreak delay={0} top="12%" left="5%" angle={-18} width={300} />
      <SoftStreak delay={2.5} top="35%" left="70%" angle={15} width={260} />
      <SoftStreak delay={4} top="65%" left="15%" angle={-8} width={200} />

      {/* ── content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* section header */}
        <div ref={sectionRef} className="text-center mb-20">
          <motion.h2
            className="text-gradient text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-display"
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Host Club
          </motion.h2>

          <motion.div
            className="section-divider mt-6"
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {dignitaries.map((d, i) => (
            <DignitaryCard key={d.name} data={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
