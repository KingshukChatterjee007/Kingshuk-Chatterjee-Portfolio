import React, { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import styles from './OrbitalScroll.module.css'

const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
]

const OrbitalScroll = () => {
    const [activeSection, setActiveSection] = useState('home')
    const { scrollYProgress } = useScroll()
    
    // Smoothly animate the satellite position
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    const satelliteTop = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + window.innerHeight / 2
            
            for (const section of sections) {
                const el = document.getElementById(section.id)
                if (el) {
                    const { offsetTop, offsetHeight } = el
                    if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
                        setActiveSection(section.id)
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (id) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className={styles.scrollContainer}>
            <div className={styles.orbitPath} />
            
            {/* The Satellite Probe */}
            <motion.div 
                className={styles.satellite}
                style={{ top: satelliteTop }}
            >
                <div className={styles.satelliteCore} />
                <div className={styles.satelliteRing} />
                <div className={styles.satellitePulse} />
            </motion.div>

            {/* Section Nodes */}
            <div className={styles.nodesContainer}>
                {sections.map((section) => (
                    <motion.div 
                        key={section.id} 
                        className={`${styles.nodeWrapper} ${activeSection === section.id ? styles.active : ''}`}
                        onClick={() => scrollToSection(section.id)}
                        whileHover={{ x: -10 }}
                    >
                        <span className={styles.nodeLabel}>{section.label}</span>
                        <div className={styles.nodePoint} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default OrbitalScroll
