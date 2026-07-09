import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsExiting(true)
            setTimeout(() => onComplete(), 800)
          }, 400)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background soft blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="soft-blob"
              style={{
                background: 'radial-gradient(circle, rgba(107,47,160,0.1), transparent)',
                top: '20%',
                left: '30%',
                width: '500px',
                height: '500px',
              }}
              animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0], scale: [1, 1.1, 0.95, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="soft-blob"
              style={{
                background: 'radial-gradient(circle, rgba(194,24,91,0.06), transparent)',
                top: '50%',
                right: '20%',
                width: '400px',
                height: '400px',
              }}
              animate={{ x: [0, -40, 20, 0], y: [0, 30, -15, 0], scale: [1, 0.95, 1.05, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="flex flex-col items-center gap-8 z-10">
            {/* Spinning rings */}
            <div className="relative w-24 h-24">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{ borderTopColor: '#6b2fa0', borderRightColor: '#c2185b' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-transparent"
                style={{ borderBottomColor: '#b39ddb', borderLeftColor: '#ce93d8' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border border-transparent"
                style={{ borderTopColor: '#c2185b' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              {/* Center dot */}
              <motion.div
                className="absolute inset-0 m-auto w-3 h-3 rounded-full"
                style={{ background: 'linear-gradient(135deg, #6b2fa0, #c2185b)' }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Logo */}
            <motion.div className="text-center">
              <motion.img
                src="/images/logo.png"
                alt="Sankalpana"
                className="h-16 w-auto mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.p
                className="text-sm mt-3 tracking-widest uppercase"
                style={{ color: 'rgba(30, 10, 60, 0.3)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Loading Experience
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(107,47,160,0.08)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #6b2fa0, #c2185b, #b39ddb)',
                  width: '100%',
                  scaleX: Math.min(progress, 100) / 100,
                  transformOrigin: 'left'
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
