import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -200, y: -200 })
  const [isVisible, setIsVisible] = useState(false)

  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true)
    }
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (isTouchDevice) return
    setPosition({ x: e.clientX, y: e.clientY })
    if (!isVisible) setIsVisible(true)
  }, [isVisible, isTouchDevice])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return
    
    // Use passive listener for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave, isTouchDevice])

  if (isTouchDevice) return null

  return (
    <motion.div
      className="spotlight"
      animate={{
        x: position.x,
        y: position.y,
        opacity: isVisible ? 1 : 0
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
    />
  )
}
