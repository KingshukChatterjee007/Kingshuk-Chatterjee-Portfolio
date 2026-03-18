import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import styles from './Projects.module.css'

// SVG Icons
const Github = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
)

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
)

const GitFork = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
        <path d="M12 12v3" />
    </svg>
)

const Folder = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
)

const ArrowRight = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
)

const Loader = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.spinner}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
)

// GitHub Config - CHANGED TO YOUR USERNAME
const GITHUB_USERNAME = 'KingshukChatterjee007'
// GitHub Token for 5000 requests/hour (set in .env.local as VITE_GITHUB_TOKEN)
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || ''

// Custom descriptions for known projects based on your resume
const projectDescriptions = {
    'KrownFrame': 'Warframe-themed AI assistant using Next.js with responsive UI and integrated assistant features.',
    'fin_model': 'Machine learning earnings forecasting model using NLP sentiment analysis and financial indicators.',
    'Sys_Logger': 'System logging platform. Led and developed the complete frontend architecture with responsive dashboards.',
    'Kingshuk-Chatterjee-Portfolio': 'My personal portfolio website built with React, Vite, and Framer Motion.',
}

// Language colors for GitHub
const getLanguageColor = (language) => {
    const colors = {
        'Python': '#3572A5',
        'QML': '#44a51c',
        'Shell': '#89e051',
        'HTML': '#e34c26',
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'C++': '#f34b7d',
        'C': '#555555',
        'Solidity': '#AA6746',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Java': '#b07219',
        'Jupyter Notebook': '#DA5B0B',
        'CSS': '#563d7c'
    }
    return colors[language] || '#8892a0'
}

function Projects() {
    const containerRef = useRef(null)
    const sliderRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: containerRef })

    const [repos, setRepos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [scrollRange, setScrollRange] = useState(0)

    // Fetch state (now simplified as we use a curated static list)
    useEffect(() => {
        const curatedList = [
            {
                id: 'krown-frame',
                name: 'KrownFrame',
                customDescription: 'Warframe-themed AI assistant using Next.js with responsive UI and integrated assistant features.',
                html_url: 'https://github.com/KingshukChatterjee007/KrownFrame',
                language: 'TypeScript',
                stargazers_count: 2,
                forks_count: 0,
                topics: ['Next.js', 'AI', 'Tailwind', 'Framer Motion'],
                images: ['/projects/krown.png'],
            },
            {
                id: 'krishi-sahyogi',
                name: 'Krishi Sahyogi',
                customDescription: 'An AI-powered agricultural assistant platform for local farmers. (Private Industry Project)',
                html_url: '#contact',
                isPrivate: true,
                language: 'Python/Flutter',
                stargazers_count: 'Private',
                forks_count: 'Private',
                topics: ['Agriculture', 'AI', 'Flutter', 'Data Science'],
                images: ['https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800'],
            },
            {
                id: 'fin-report',
                name: 'FinReport',
                customDescription: 'Explainable stock earnings forecasting via news-factor analysis using NLP and financial indices.',
                html_url: 'https://github.com/KingshukChatterjee007/FinReport-Explainable-Stock-Earnings-Forecasting-via-News-Factor',
                language: 'HTML/Python',
                stargazers_count: 2,
                forks_count: 4,
                topics: ['Finance', 'NLP', 'Machine Learning', 'Forecasting'],
                images: ['/projects/fin.png'],
            },
            {
                id: 'sys-logger',
                name: 'Sys Logger',
                customDescription: 'System logging platform with advanced frontend architecture and responsive dashboards.',
                html_url: 'https://github.com/KingshukChatterjee007/Sys_Logger',
                language: 'JavaScript',
                stargazers_count: 12,
                forks_count: 3,
                topics: ['Monitoring', 'Architecture', 'Dashboard', 'Security'],
                images: ['/projects/sys.png'],
            },
            {
                id: 'road-damage',
                name: 'Road Damage Detector',
                customDescription: 'Computer vision project for identifying road damage using advanced object detection models.',
                html_url: 'https://github.com/KingshukChatterjee007/Road-Damage-Detector',
                language: 'Python',
                stargazers_count: 8,
                forks_count: 2,
                topics: ['Computer Vision', 'PyTorch', 'Infrastructure', 'ML'],
                images: ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1523413363574-c3c44456999a?auto=format&fit=crop&q=80&w=800'],
            },
            {
                id: 'ai-wearables',
                name: 'AI-Integration-in-Wearables-for-Clot-Monitoring',
                customDescription: 'AI-Integration in wearables for real-time blood clot risk assessment and health monitoring.',
                html_url: '#contact',
                isPrivate: true,
                language: 'Embedded AI',
                stargazers_count: 'R&D',
                forks_count: 'Private',
                topics: ['Healthcare', 'Sensors', 'Real-time', 'MedTech'],
                images: ['/projects/clot.png'],
            },
            {
                id: 'derivatives-pricing',
                name: 'Advanced-Derivatives-Pricing',
                customDescription: 'Advanced derivatives pricing engine using quantitative financial models and risk analysis.',
                html_url: '#contact',
                isPrivate: true,
                language: 'C++/Python',
                stargazers_count: 'Expert',
                forks_count: 'Private',
                topics: ['Quant', 'Finance', 'Derivatives', 'Black-Scholes'],
                images: ['/projects/quant.png'],
            }
        ]
        setRepos(curatedList)
        setLoading(false)
    }, [])

    // Calculate scroll transform
    const cardCount = repos.length

    // Track active index based on scroll
    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, Math.max(0, cardCount - 1)])

    useEffect(() => {
        const unsubscribe = currentIndex.on('change', (latest) => {
            const newIndex = Math.max(0, Math.min(Math.floor(latest + 0.5), cardCount - 1))
            setActiveIndex(newIndex)
        })
        return unsubscribe
    }, [currentIndex, cardCount])

    // DYNAMIC: Calculate total scrollable distance based on actual content width
    useEffect(() => {
        if (sliderRef.current) {
            const updateScrollRange = () => {
                const totalWidth = sliderRef.current.scrollWidth
                const visibleWidth = sliderRef.current.clientWidth
                setScrollRange(Math.max(0, totalWidth - visibleWidth))
            }

            // Initial calculation
            updateScrollRange()

            // Recalculate on window resize
            window.addEventListener('resize', updateScrollRange)
            return () => window.removeEventListener('resize', updateScrollRange)
        }
    }, [repos]) // Also recalculate when projects are loaded

    const x = useTransform(scrollYProgress, [0, 1], ['0px', `-${scrollRange}px`])

    return (
        <section id="projects" className={styles.projectsWrapper} ref={containerRef}>
            <div className={styles.stickyContainer}>
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="section-tag">
                            <Folder />
                            My Work
                        </span>
                        <h2 className="section-title">
                            <span className="gradient-text">Featured Project Vault</span>
                        </h2>
                        <p className={styles.sectionSubtitle}>
                            A curated selection of my specialized applications & tools
                        </p>
                    </motion.div>
                </div>

                <div className={styles.sliderContainer}>
                    <motion.div
                        className={styles.slider}
                        style={{ x }}
                        ref={sliderRef}
                    >
                        {repos.map((repo, index) => {
                            const isActive = index === activeIndex

                            return (
                                <motion.article
                                    key={repo.id || repo.name}
                                    className={`${styles.projectCard} ${isActive ? styles.activeCard : ''}`}
                                    animate={{
                                        scale: isActive ? 1.1 : 0.9,
                                        zIndex: isActive ? 20 : 1,
                                        opacity: isActive ? 1 : 0.7
                                    }}
                                    whileHover={{ scale: isActive ? 1.12 : 0.95, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Project Images - Static (User requested removal of carousel) */}
                                    {repo.images && repo.images.length > 0 && (
                                        <div className={styles.projectImageWrapper}>
                                            <img 
                                                src={repo.images[0]} 
                                                alt={repo.name} 
                                                className={styles.projectImage} 
                                            />
                                            <div className={styles.imageOverlay}></div>
                                        </div>
                                    )}

                                    {/* Terminal Header */}
                                    <div className={styles.cardHeader}>
                                        <div className={styles.dots}>
                                            <span className={styles.dot}></span>
                                            <span className={styles.dot}></span>
                                            <span className={styles.dot}></span>
                                        </div>
                                        <span className={styles.cardPath}>~/{repo.name.toLowerCase()}</span>
                                        <div className={styles.cardLinks}>
                                            {!repo.isPrivate ? (
                                                <a
                                                    href={repo.html_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.cardLink}
                                                    aria-label={`View ${repo.name} on GitHub`}
                                                >
                                                    <Github />
                                                </a>
                                            ) : (
                                                <span className={styles.cardLink} title="Private Repository">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                    </svg>
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.projectTitle}>{repo.name.replace(/_/g, ' ')}</h3>
                                        <p className={styles.projectDescription}>{repo.customDescription}</p>

                                        {/* Tags */}
                                        <div className={styles.projectTags}>
                                            {repo.topics?.slice(0, 4).map((tag) => (
                                                <span key={tag} className={styles.tag}>{tag}</span>
                                            )) || (
                                                    <span className={styles.tag}>{repo.language || 'Code'}</span>
                                                )}
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className={`${styles.cardFooter} ${repo.isPrivate ? styles.footerPrivate : ''}`}>
                                        <div className={styles.projectMeta}>
                                            <span className={styles.language}>
                                                <span
                                                    className={styles.languageDot}
                                                    style={{ background: getLanguageColor(repo.language) }}
                                                ></span>
                                                {repo.language || 'Unknown'}
                                            </span>
                                            <span className={styles.stars}>
                                                <Star />
                                                {repo.stargazers_count}
                                            </span>
                                            <span className={styles.forks}>
                                                <GitFork />
                                                {repo.forks_count}
                                            </span>
                                        </div>
                                        {!repo.isPrivate ? (
                                            <a
                                                href={repo.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.viewProject}
                                                aria-label={`View source code for ${repo.name}`}
                                            >
                                                View Code
                                                <ArrowRight />
                                            </a>
                                        ) : (
                                            <div className={styles.privateBadge}>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={styles.privateIcon}>
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                                <span className={styles.privateText}>Private Repo</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.article>
                            )
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Projects
