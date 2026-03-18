import React, { useState, useEffect, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import styles from './CursorFollower.module.css'

const CursorFollower = () => {
    const [isHovering, setIsHovering] = useState(false)
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    // Motion values for smooth follow
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Snappier springs for the "inertial" outer ring to prevent "detachment" feel
    const ringX = useSpring(mouseX, { damping: 25, stiffness: 250 })
    const ringY = useSpring(mouseY, { damping: 25, stiffness: 250 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true)
            // Use requestAnimationFrame for smoother updates if needed, 
            // but MotionValues are already pretty optimized.
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        const handleMouseDown = () => setIsMouseDown(true)
        const handleMouseUp = () => setIsMouseDown(false)

        const handleMouseOver = (e) => {
            const target = e.target
            const isInteractive = 
                target.tagName === 'BUTTON' || 
                target.tagName === 'A' || 
                target.closest('button') || 
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer'
            
            setIsHovering(!!isInteractive)
        }

        const handleMouseLeave = () => setIsVisible(false)
        const handleMouseEnter = () => setIsVisible(true)

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mouseover', handleMouseOver)
        document.addEventListener('mouseleave', handleMouseLeave)
        document.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mouseover', handleMouseOver)
            document.removeEventListener('mouseleave', handleMouseLeave)
            document.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [isVisible, mouseX, mouseY])

    if (!isVisible) return null

    return (
        <div className={styles.cursorContainer}>
            {/* 1. OUTER RING (Inertial) */}
            <motion.div
                className={styles.outerRing}
                style={{ x: ringX, y: ringY }}
                animate={{
                    scale: isHovering ? 1.5 : (isMouseDown ? 0.8 : 1),
                    opacity: isHovering ? 1 : 0.6,
                    rotate: isHovering ? 90 : 0
                }}
            >
                <div className={styles.ringScan} />
                <div className={styles.bracket} style={{ top: -8, left: -8, borderLeft: '2px solid', borderTop: '2px solid' }} />
                <div className={styles.bracket} style={{ top: -8, right: -8, borderRight: '2px solid', borderTop: '2px solid' }} />
                <div className={styles.bracket} style={{ bottom: -8, left: -8, borderLeft: '2px solid', borderBottom: '2px solid' }} />
                <div className={styles.bracket} style={{ bottom: -8, right: -8, borderRight: '2px solid', borderBottom: '2px solid' }} />
            </motion.div>

            {/* 2. INNER PROBE (Precise) */}
            <motion.div
                className={styles.innerProbe}
                style={{ x: mouseX, y: mouseY }}
                animate={{
                    scale: isHovering ? 0.5 : 1,
                    backgroundColor: isHovering ? '#fff' : '#ffaa00'
                }}
            />

            {/* 3. COORDINATE DISPLAY (Separated container to avoid transform conflicts) */}
            {isHovering && (
                <motion.div 
                    className={styles.coordLabelContainer}
                    style={{ x: ringX, y: ringY }}
                >
                    <motion.div
                        className={styles.coordLabel}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 30 }}
                        transition={{ duration: 0.3 }}
                    >
                        SCAN_ACTIVE
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}

export default CursorFollower
