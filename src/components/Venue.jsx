import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Media array supporting both images and videos
const media = [
  { type: 'video', src: '/images/venue/git111.mp4' }, 
  { type: 'image', src: '/images/venue/Image-1765259515041.jpeg' },
  { type: 'image', src: '/images/venue/kls-gogte-institute-of-technology-belgaum-274760.jpg' }
];

export default function Venue() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play logic
  useEffect(() => {
    let timer;
    
    // If current media is an image, advance after 4 seconds.
    // If it's a video, we wait for the onEnded event instead.
    if (media[currentIndex].type === 'image') {
      timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % media.length);
      }, 4000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentIndex]);

  return (
    <section 
      id="venue" 
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background ambient blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-magenta-200/20 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-purple-200/20 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Side: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-lavender-50 border border-brand-lavender-200 text-brand-purple-600 text-sm font-bold tracking-wide uppercase mb-8 self-start shadow-sm">
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              The Destination
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gradient mb-6 font-display leading-[1.1]">
              GIT Auditorium
              <span className="block text-xl md:text-2xl text-brand-purple-600/80 mt-2 font-bold">(Silver Jubilee Auditorium)</span>
            </h2>
            
            <div className="flex flex-col gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-brand-lavender-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-brand-magenta-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-deep-purple-900 mb-1">Full Address</h4>
                  <p className="text-deep-purple-800/70 text-base leading-relaxed">
                    KLS Gogte Institute of Technology, Udyambag Industrial Area,<br/>
                    Udyambag, Belgaum - 590008
                  </p>
                </div>
              </div>

            </div>

            <a 
              href="https://www.google.com/maps/place/KLS+Gogte+Institute+of+Technology/@15.8149847,74.4823285,1101m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bbf65c556d2f08f:0xcbbcbb73e1286392!8m2!3d15.8149796!4d74.4871994!16s%2Fm%2F02rh9kx?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank"
              rel="noopener noreferrer"
              className="primary-btn self-start group"
            >
              Get Directions
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>

          {/* Right Side: Media Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white clean-card bg-deep-purple-900 lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {media[currentIndex].type === 'video' ? (
                <motion.video
                  key={currentIndex}
                  src={media[currentIndex].src}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                  onEnded={() => setCurrentIndex((prev) => (prev + 1) % media.length)}
                />
              ) : (
                <motion.img
                  key={currentIndex}
                  src={media[currentIndex].src}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={`Venue media ${currentIndex + 1}`}
                />
              )}
            </AnimatePresence>

            {/* Subtle Gradient Overlay at bottom for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-purple-900/60 to-transparent pointer-events-none" />

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {media.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentIndex 
                      ? "w-8 h-2.5 bg-brand-magenta-500 shadow-[0_0_10px_rgba(194,24,91,0.8)]" 
                      : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
