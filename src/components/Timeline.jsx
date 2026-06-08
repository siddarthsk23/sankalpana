import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const events = [
  {
    time: '9:00 AM',
    title: 'Registrations',
    description: 'Check in and connect with fellow attendees.',
    icon: '✦',
  },
  {
    time: '10:00 AM',
    title: 'SHOR Awards',
    description: 'Celebrating outstanding achievements and impactful projects by Rotaract clubs.',
    icon: '★',
  },
  {
    time: '2:00 PM',
    title: 'Lunch',
    description: 'Savour a curated gourmet experience while networking with leaders.',
    icon: '◇',
  },
  {
    time: '8:30 PM',
    title: 'Dinner',
    description: 'An elegant evening of fellowship and unforgettable memories.',
    icon: '⬢',
  },
  {
    time: '9:00 AM',
    title: 'Breakfast',
    description: 'Start your day with a wholesome breakfast and energizing conversations.',
    icon: '✦',
  },
  {
    time: '10:00 AM',
    title: 'Installation Ceremony',
    description: 'The formal induction of DRR Rtn. Rtr. Amey Mangesh Varerkar and his team.',
    icon: '⬡',
  },
  {
    time: '2:00 PM',
    title: 'Lunch',
    description: 'A brief recess to dine and recharge for the concluding sessions.',
    icon: '◇',
  },
  {
    time: '3:00 PM',
    title: 'District Announcements',
    description: 'Important announcements and the roadmap for the year ahead.',
    icon: '◆',
  },
];

/* ── Individual Timeline Card ────────────────────────────── */
function TimelineCard({ event, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex w-full items-center ${
        isLeft ? 'md:justify-start' : 'md:justify-end'
      } justify-start`}
    >
      {/* ── Connector arm (desktop only) ── */}
      <motion.div
        className={`absolute top-1/2 hidden h-[2px] w-[calc(50%-28px)] md:block ${
          isLeft ? 'right-1/2 mr-[28px]' : 'left-1/2 ml-[28px]'
        }`}
        style={{
          background:
            'linear-gradient(90deg, rgba(107,47,160,0.15), rgba(194,24,91,0.12))',
          transformOrigin: isLeft ? 'right' : 'left',
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── Glowing Node (center dot) ── */}
      <motion.div
        className="absolute left-[19px] z-20 md:left-1/2 md:-translate-x-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Outer pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(107,47,160,0.2) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Inner dot */}
        <div
          className="relative h-[18px] w-[18px] rounded-full"
          style={{
            background: 'linear-gradient(135deg, #6b2fa0, #c2185b)',
            boxShadow:
              '0 0 10px rgba(107,47,160,0.3), 0 0 20px rgba(194,24,91,0.15)',
          }}
        >
          <div className="absolute inset-[3px] rounded-full bg-white" />
          <div
            className="absolute inset-[5px] rounded-full"
            style={{
              background: 'linear-gradient(135deg, #6b2fa0, #c2185b)',
            }}
          />
        </div>
      </motion.div>

      {/* ── Card ── */}
      <motion.div
        className={`relative ml-14 w-full md:ml-0 md:w-[calc(50%-56px)] ${
          isLeft ? '' : 'md:ml-auto'
        }`}
        initial={{
          opacity: 0,
          x: isLeft ? -60 : 60,
          y: 20,
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: 0 }
            : {}
        }
        transition={{
          duration: 0.7,
          delay: 0.2 + index * 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="clean-card group relative overflow-hidden p-6 sm:p-8 hover:border-brand-purple-500/15">
          {/* Ambient glow on hover */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle, rgba(107,47,160,0.06) 0%, transparent 70%)',
            }}
          />

          {/* Time badge */}
          <motion.div
            className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: 'linear-gradient(135deg, rgba(107,47,160,0.06), rgba(194,24,91,0.04))',
              border: '1px solid rgba(107,47,160,0.1)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-purple-500">
              {event.time}
            </span>
          </motion.div>

          {/* Icon + Title */}
          <div className="mb-2 flex items-center gap-3">
            <span className="text-lg text-brand-purple-400/60">{event.icon}</span>
            <h3 className="text-lg font-bold tracking-tight text-deep-purple-800 sm:text-xl font-display">
              {event.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-deep-purple-800/50 sm:text-[15px]">
            {event.description}
          </p>

          {/* Bottom accent line */}
          <motion.div
            className="mt-5 h-[1px] rounded-full"
            style={{
              background:
                'linear-gradient(90deg, rgba(107,47,160,0.2), rgba(194,24,91,0.15), transparent)',
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 + index * 0.05 }}
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main Timeline Section ───────────────────────────────── */
export default function Timeline() {
  const sectionRef = useRef(null);
  const lineContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: lineContainerRef,
    offset: ['start 85%', 'end 20%'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  /* Heading in‑view */
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: '#f5f0fa' }}
    >
      {/* ── Background soft blobs ── */}
      <div
        className="soft-blob"
        style={{
          left: '-15%',
          top: '25%',
          width: '500px',
          height: '500px',
          background: 'rgba(107,47,160,0.06)',
        }}
      />
      <div
        className="soft-blob"
        style={{
          right: '-15%',
          bottom: '25%',
          width: '500px',
          height: '500px',
          background: 'rgba(194,24,91,0.04)',
        }}
      />
      <div
        className="soft-blob"
        style={{
          left: '40%',
          top: '50%',
          width: '400px',
          height: '400px',
          background: 'rgba(179,157,219,0.06)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div ref={headingRef} className="mb-20 text-center sm:mb-28">
          <motion.p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-purple-500/50"
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            The Journey Awaits
          </motion.p>

          <motion.h2
            className="text-gradient text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl font-display"
            initial={{ opacity: 0, y: 30 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Event Timeline
          </motion.h2>

          <motion.div
            className="mx-auto mt-5 h-[2px] w-20 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, #6b2fa0, #c2185b, #b39ddb)',
            }}
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.p
            className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-deep-purple-800/50 sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Two days meticulously crafted — each moment designed
            to inspire, connect, and celebrate.
          </motion.p>
        </div>

        {/* ── Timeline Body ── */}
        <div ref={lineContainerRef} className="relative">
          {/* ── Central Vertical Line ── */}
          <div className="absolute bottom-0 left-[27px] top-0 w-[2px] md:left-1/2 md:-translate-x-1/2">
            {/* Static track */}
            <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(107,47,160,0.06)' }} />

            {/* Animated fill */}
            <motion.div
              className="absolute inset-x-0 top-0 bottom-0 origin-top rounded-full"
              style={{
                background:
                  'linear-gradient(180deg, #6b2fa0 0%, #c2185b 50%, #b39ddb 100%)',
                scaleY: lineScaleY,
                opacity: lineOpacity,
              }}
            />

            {/* Glow behind the line */}
            <motion.div
              className="absolute inset-x-[-3px] top-0 bottom-0 origin-top rounded-full"
              style={{
                background:
                  'linear-gradient(180deg, rgba(107,47,160,0.2) 0%, rgba(194,24,91,0.15) 50%, rgba(179,157,219,0.1) 100%)',
                filter: 'blur(6px)',
                scaleY: lineScaleY,
                opacity: lineOpacity,
              }}
            />

            {/* Travelling light particle */}
            <motion.div
              className="absolute left-1/2 h-8 w-[6px] -translate-x-1/2 rounded-full"
              style={{
                background:
                  'linear-gradient(180deg, transparent, #c2185b, transparent)',
                filter: 'blur(2px)',
                top: useTransform(scrollYProgress, [0, 1], ['0%', '92%']),
                opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]),
              }}
            />
          </div>

          {/* ── Event Cards ── */}
          <div className="relative flex flex-col gap-12 sm:gap-16 md:gap-20">
            {/* Day 1 Heading */}
            <div className="relative z-20 w-full h-8">
              <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 top-0">
                <span className="bg-brand-purple-600 text-white px-5 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase shadow-lg shadow-brand-purple-500/30 whitespace-nowrap">
                  18th July 2026
                </span>
              </div>
            </div>

            {events.slice(0, 4).map((event, index) => (
              <TimelineCard key={`d1-${index}`} event={event} index={index} />
            ))}

            {/* Day 2 Heading */}
            <div className="relative z-20 w-full h-8 mt-4 md:mt-8">
              <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 top-0">
                <span className="bg-brand-purple-600 text-white px-5 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase shadow-lg shadow-brand-purple-500/30 whitespace-nowrap">
                  19th July 2026
                </span>
              </div>
            </div>

            {events.slice(4).map((event, index) => (
              <TimelineCard key={`d2-${index}`} event={event} index={index + 4} />
            ))}
          </div>

          {/* ── Terminal dot at bottom ── */}
          <motion.div
            className="absolute -bottom-3 left-[21px] md:left-1/2 md:-translate-x-1/2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div
              className="h-[14px] w-[14px] rounded-full"
              style={{
                background: 'linear-gradient(135deg, #c2185b, #6b2fa0)',
                boxShadow: '0 0 12px rgba(194,24,91,0.3), 0 0 24px rgba(107,47,160,0.15)',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
