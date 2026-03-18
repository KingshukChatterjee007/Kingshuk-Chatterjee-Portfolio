import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import styles from './AchievementCarousel.module.css'

const Trophy = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
)

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
)

const achievements = [
    {
        id: 0,
        title: 'Research Paper Accepted',
        place: 'ICMLDE 2025',
        prize: 'Elsevier Procedia',
        description: '"Stock Earnings Forecasting via News Factor Analyzing Model" accepted in Elsevier Procedia Computer Science. Selected for presentation at the ICMLDE 2025 conference.',
        images: [
            '/images/image.png'
        ],
        link: 'https://github.com/KingshukChatterjee007',
        color: '#00ff88'
    },
    {
        id: 1,
        title: 'Nirman 4.0 Hackathon',
        place: 'Silicon University',
        prize: 'Round 2 Qualifier',
        description: 'Successfully qualified for Round 2 in the competitive Nirman 4.0 Hackathon held at Silicon University.',
        images: [
            '/images/image.png'
        ],
        link: 'https://github.com/KingshukChatterjee007',
        color: '#00d4ff'
    },
    {
        id: 2,
        title: 'KIIT Software & Research',
        place: 'KSRC',
        prize: 'Active Member',
        description: 'Active KSRC Member for over 2 years, contributing to technical community growth, research projects, and software development initiatives.',
        images: [
            '/images/image.png'
        ],
        link: 'https://github.com/KingshukChatterjee007',
        color: '#bd00ff'
    }
]

const AchievementCarousel = () => {
    const [activeAchievement, setActiveAchievement] = useState(0)
    const [imageIndex, setImageIndex] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxImage, setLightboxImage] = useState('')

    const currentAchievement = achievements[activeAchievement]
    const currentImages = currentAchievement.images

    useEffect(() => {
        if (lightboxOpen) return
        const interval = setInterval(() => {
            setActiveAchievement((prev) => (prev + 1) % achievements.length)
            setImageIndex(0)
        }, 6000)
        return () => clearInterval(interval)
    }, [lightboxOpen])

    useEffect(() => {
        if (lightboxOpen) return
        const interval = setInterval(() => {
            setImageIndex((prev) => (prev + 1) % currentImages.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [activeAchievement, currentImages.length, lightboxOpen])

    const openLightbox = (image) => {
        setLightboxImage(image)
        setLightboxOpen(true)
    }

    const closeLightbox = () => {
        setLightboxOpen(false)
        setLightboxImage('')
        setImageIndex((prev) => (prev + 1) % currentImages.length)
    }

    const getCardStyle = (index) => {
        const totalImages = currentImages.length
        const diff = index - imageIndex
        const normalizedDiff = ((diff % totalImages) + totalImages) % totalImages

        if (normalizedDiff === 0) {
            return {
                transform: 'translateZ(0px) rotateY(0deg) scale(1)',
                opacity: 1,
                zIndex: 10
            }
        } else if (normalizedDiff === 1) {
            return {
                transform: 'translateX(55%) translateZ(-120px) rotateY(-25deg) scale(0.8)',
                opacity: 0.5,
                zIndex: 5
            }
        } else if (normalizedDiff === totalImages - 1) {
            return {
                transform: 'translateX(-55%) translateZ(-120px) rotateY(25deg) scale(0.8)',
                opacity: 0.5,
                zIndex: 5
            }
        } else {
            return {
                transform: 'translateZ(-200px) scale(0.6)',
                opacity: 0,
                zIndex: 0
            }
        }
    }

    return (
        <section id="achievements" className={styles.carouselSection}>
            <div className={styles.container}>
                <motion.h2
                    className={styles.sectionTitle}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="gradient-text">Key Achievements</span>
                </motion.h2>

                <div className={styles.carouselWrapper}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`left-${activeAchievement}`}
                            className={styles.leftContent}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className={styles.achievementHeader}>
                                <Trophy />
                                <h3 style={{ color: currentAchievement.color }}>{currentAchievement.title}</h3>
                            </div>
                            <p className={styles.achievementDescription}>
                                {currentAchievement.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <div className={styles.carousel3D}>
                        <AnimatePresence mode="sync">
                            {currentImages.map((image, index) => (
                                <motion.div
                                    key={`${activeAchievement}-${index}`}
                                    className={styles.carouselCard}
                                    style={{
                                        borderColor: index === imageIndex ? currentAchievement.color : 'rgba(255,255,255,0.1)'
                                    }}
                                    onClick={() => {
                                        if (index === imageIndex) {
                                            openLightbox(image)
                                        } else {
                                            setImageIndex(index)
                                        }
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={getCardStyle(index)}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                                >
                                    <img
                                        src={image}
                                        alt={`${currentAchievement.title} - ${index + 1}`}
                                        className={styles.cardImage}
                                    />
                                    <div
                                        className={styles.cardGlow}
                                        style={{ boxShadow: `0 0 50px ${currentAchievement.color}40` }}
                                    />
                                    {index === imageIndex && (
                                        <div className={styles.clickHint}>
                                            Click to view full image
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div className={styles.imageIndicators}>
                            {currentImages.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.imageDotWrapper} ${index === imageIndex ? styles.activeImageDotWrapper : ''}`}
                                    onClick={() => setImageIndex(index)}
                                    aria-label={`View image ${index + 1} of ${currentImages.length}`}
                                >
                                    <span
                                        className={styles.imageDot}
                                        style={{
                                            backgroundColor: index === imageIndex ? currentAchievement.color : 'rgba(255,255,255,0.3)'
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`right-${activeAchievement}`}
                            className={styles.rightContent}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className={styles.achievementStats}>
                                <span className={styles.place}>{currentAchievement.place}</span>
                                <span className={styles.prize} style={{ color: currentAchievement.color }}>
                                    {currentAchievement.prize}
                                </span>
                            </div>
                            <motion.a
                                href={currentAchievement.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.knowMoreBtn}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ borderColor: currentAchievement.color, color: currentAchievement.color }}
                                aria-label={`View ${currentAchievement.title} details on LinkedIn`}
                            >
                                VIEW ON GITHUB
                            </motion.a>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className={styles.achievementIndicators}>
                    {achievements.map((achievement, index) => (
                        <button
                            key={index}
                            className={`${styles.achievementDot} ${index === activeAchievement ? styles.activeAchievementDot : ''}`}
                            onClick={() => {
                                setActiveAchievement(index)
                                setImageIndex(0)
                            }}
                            style={{
                                backgroundColor: index === activeAchievement ? achievement.color : 'rgba(255,255,255,0.2)',
                                borderColor: achievement.color
                            }}
                            aria-label={`View achievement: ${achievement.title}`}
                        >
                            <span className={styles.dotLabel}>{index + 1}</span>
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        className={styles.lightboxOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                    >
                        <motion.div
                            className={styles.lightboxContent}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.closeBtn}
                                onClick={closeLightbox}
                                aria-label="Close full size view"
                            >
                                <CloseIcon />
                            </button>
                            <img
                                src={lightboxImage}
                                alt="Full size achievement"
                                className={styles.lightboxImage}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default AchievementCarousel