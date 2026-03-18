import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useMemo, useState, useEffect } from 'react'
import styles from './Experience.module.css'

// Icons
const Briefcase = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
)

const Calendar = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
)

const Shield = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
)

const Code = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
)

const Target = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
)

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)

const experiences = [
    {
        id: 0,
        role: "UI Developer",
        company: "Knead to Bake",
        date: "2024 - Present",
        skills: ["UI Development", "API Integration", "Frontend"],
        icon: <Code />,
        color: '#ffaa00'
    },
    {
        id: 1,
        role: "Frontend Developer (Freelance)",
        company: "Self-Employed",
        date: "Jan 2026 - Feb 2026",
        skills: ["Landing Pages", "Web Design", "Education Platforms"],
        icon: <Briefcase />,
        color: '#ff8800'
    },
    {
        id: 2,
        role: "UI/Systems Designer",
        company: "KIIT Research Centre",
        date: "2023 - Present",
        skills: ["Prototyping", "Solar EV Systems", "Waste Management Software"],
        icon: <Target />,
        color: '#ffcc00'
    },
    {
        id: 3,
        role: "Network Intern",
        company: "Indian Oil Corporation Ltd (IOCL)",
        date: "Nov 2024 - Jan 2025",
        skills: ["Industrial Networking", "Cisco Protocols", "Network Architecture"],
        icon: <Shield />,
        color: '#ff6600'
    },
    {
        id: 4,
        role: "Research Paper Accepted",
        company: "Elsevier Procedia Computer Science",
        description: "\"Stock Earnings Forecasting via News Factor Analyzing Model\" Selected for ICMLDE 2025",
        date: "2025",
        skills: ["Machine Learning", "News Factor Analysis", "Research"],
        icon: <Code />,
        color: '#ffd700'
    },
    {
        id: 5,
        role: "Nirman 4.0 Hackathon",
        company: "Silicon University",
        description: "Qualified for Round 2 – National Level Hackathon",
        date: "2024",
        skills: ["Problem Solving", "Rapid Prototyping", "Teamwork"],
        icon: <Target />,
        color: '#ff8800'
    },
    {
        id: 6,
        role: "Active KSRC Member",
        company: "KIIT Student Research Centre",
        description: "Contributing and collaborating for over 2 years",
        date: "2023 - Present",
        skills: ["Community", "Research", "Collaboration"],
        icon: <Briefcase />,
        color: '#ffaa00'
    }
]

const WAVE_AMPLITUDE_X = 450
const ROTATION_INTENSITY_Y = 50
const ROTATION_INTENSITY_Z = 8
const SPACING_FACTOR = 1.2

const WaveCard = ({ exp, index, totalItems, scrollYProgress, onCardClick }) => {
    const Icon = exp.icon?.type || Shield
    const lastIndex = totalItems - 1
    const totalTravelDistance = lastIndex * SPACING_FACTOR

    const phase = useTransform(scrollYProgress, (val) => {
        const cameraPosition = val * totalTravelDistance
        const itemStartOffset = index * SPACING_FACTOR
        return cameraPosition - itemStartOffset
    })

    const y = useTransform(phase, (p) => {
        const climb = p * 120
        const dip = Math.abs(Math.sin(p)) * 80
        return -(climb - dip)
    })

    const x = useTransform(phase, (p) => {
        return -Math.sin(p) * WAVE_AMPLITUDE_X
    })

    const scale = useTransform(phase, (p) => {
        const depth = Math.cos(p)
        return 0.55 + (depth + 1) * 0.45
    })

    const rotateY = useTransform(phase, (p) => {
        return Math.sin(p) * ROTATION_INTENSITY_Y
    })

    const rotateZ = useTransform(phase, (p) => {
        return Math.sin(p) * -ROTATION_INTENSITY_Z
    })

    const opacity = useTransform(phase, (p) => {
        const dist = Math.abs(p)
        if (dist > 4) return 0
        return 1 - (dist / 5)
    })

    const blur = useTransform(phase, (p) => {
        const dist = Math.abs(p)
        if (dist < 0.35) return 'blur(0px)'
        return `blur(${(dist - 0.35) * 6}px)`
    })

    const zIndex = useTransform(phase, (p) => {
        return 100 - Math.round(Math.abs(p) * 10)
    })

    const springConfig = { damping: 18, stiffness: 80, mass: 0.3 }
    const springY = useSpring(y, springConfig)
    const springX = useSpring(x, springConfig)
    const springScale = useSpring(scale, springConfig)
    const springRotateY = useSpring(rotateY, springConfig)

    return (
        <motion.div
            onClick={() => onCardClick(exp)}
            className={styles.waveCard}
            style={{
                y: springY,
                x: springX,
                scale: springScale,
                rotateY: springRotateY,
                rotateZ: rotateZ,
                opacity: opacity,
                filter: blur,
                zIndex: zIndex,
                borderColor: exp.color,
                boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 50px ${exp.color}30`
            }}
            whileHover={{
                boxShadow: `0 40px 80px rgba(0,0,0,0.7), 0 0 80px ${exp.color}50`,
                borderColor: exp.color
            }}
            transition={{ duration: 0.3 }}
        >
            <div
                className={styles.cardGlow}
                style={{ background: `linear-gradient(135deg, ${exp.color}30, transparent 60%)` }}
            />
            <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                    <div className={styles.cardIcon} style={{ color: exp.color, borderColor: `${exp.color}50` }}>
                        <Icon />
                    </div>
                    <span className={styles.cardDate} style={{ color: exp.color }}>
                        <Calendar /> {exp.date}
                    </span>
                </div>
                <h3 className={styles.cardRole}>{exp.role}</h3>
                <p className={styles.cardCompany}>{exp.company}</p>
                {exp.description && <p className={styles.cardDescription}>{exp.description}</p>}
                <div className={styles.cardSkills}>
                    {exp.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className={styles.skillTag} style={{ borderColor: `${exp.color}40` }}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

const ParticleSystem = () => {
    const particles = useMemo(() => {
        return Array.from({ length: 30 }).map((_, i) => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.4 + 0.1,
            duration: Math.random() * 15 + 10,
        }))
    }, [])

    return (
        <div className={styles.particleContainer}>
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className={styles.particle}
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                    }}
                    animate={{
                        y: [0, -80, 0],
                        opacity: [p.opacity, p.opacity * 0.5, p.opacity],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    )
}

const Experience = () => {
    const containerRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    const clampedProgress = useTransform(scrollYProgress, [0, 0.9], [0, 1])
    const smoothProgress = useSpring(clampedProgress, {
        damping: 15,
        stiffness: 90,
        mass: 0.2
    })

    return (
        <section id="experience" className={styles.experienceWrapper} ref={containerRef}>
            <div className={styles.stickyContainer}>
                <div className={styles.backgroundEffects}>
                    <div className={styles.glowOrb1} />
                    <div className={styles.glowOrb2} />
                    <div className={styles.gridOverlay} />
                    <ParticleSystem />
                </div>

                <div className={styles.sectionHeader}>
                    <span className={styles.tag}>
                        <Briefcase />
                        Career Path
                    </span>
                    <h2 className={styles.title}>
                        <span className="gradient-text">Personal Experience & Achievements</span>
                    </h2>
                </div>

                <div className={styles.waveContainer}>
                    {experiences.map((exp, index) => (
                        <WaveCard
                            key={exp.id}
                            exp={exp}
                            index={index}
                            totalItems={experiences.length}
                            scrollYProgress={smoothProgress}
                            onCardClick={(e) => {
                                if (e.image) {
                                    setSelectedImage(e.image)
                                } else if (e.link) {
                                    window.open(e.link, '_blank')
                                }
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    className={styles.completionBadge}
                    style={{ opacity: useTransform(smoothProgress, [0.98, 1], [0, 1]) }}
                >
                    <Shield /> All Experience Viewed
                </motion.div>

                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            className={styles.lightboxOverlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                        >
                            <motion.div
                                className={styles.lightboxContent}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className={styles.closeBtn}
                                    onClick={() => setSelectedImage(null)}
                                    aria-label="Close details"
                                >
                                    <CloseIcon />
                                </button>
                                <img
                                    src={selectedImage}
                                    alt="Experience Details"
                                    className={styles.lightboxImage}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section >
    )
}

export default Experience
