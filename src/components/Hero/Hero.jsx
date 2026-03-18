import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import styles from './Hero.module.css'

// SVG Icons
const ArrowRight = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
)

const Terminal = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
)

const Shield = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
)

const Lock = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
)

const Download = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
)

// Typewriter effect for roles
const roles = [
    "Software Developer",
    "UI/Systems Designer",
    "AI Enthusiast",
    "Frontend Developer",
]

// Dynamic hero quotes
const heroQuotes = [
    `Designing intuitive interfaces by day, building robust systems by night. I create elegant software that solves real-world problems.`,
    `Code is my canvas. UI is my gallery. Crafting digital experiences that inspire and perform seamlessly across the stack.`,
    `From predicting blood clot risks with AI to building responsive web apps. I transform complex data into beautiful, accessible applications.`,
    `A developer's logic with a designer's eye. Where innovation meets aesthetics, that's where you'll find me.`
]

// Animated typing terminal with real cursor
const HoloTerminal = () => {
    const [lines, setLines] = useState([])
    const [currentLine, setCurrentLine] = useState(0)
    const [currentChar, setCurrentChar] = useState(0)
    const [showCursor, setShowCursor] = useState(true)

    const codeLines = [
        { text: '> Initializing workspace...', color: '#888', delay: 0 },
        { text: '> Target: kingshukchatterjee.dev', color: '#ffaa00', delay: 100 },
        { text: '', color: '#fff', delay: 50 },
        { text: 'class Developer:', color: '#ff79c6', delay: 80 },
        { text: '    def __init__(self):', color: '#8be9fd', delay: 80 },
        { text: '        self.name = "Kingshuk Chatterjee"', color: '#f1fa8c', delay: 60 },
        { text: '        self.role = "Software Developer & Designer"', color: '#f1fa8c', delay: 60 },
        { text: '        self.status = "BUILDING"', color: '#50fa7b', delay: 60 },
        { text: '', color: '#fff', delay: 50 },
        { text: '> Compilation complete. 0 Errors.', color: '#ffaa00', delay: 100 },
        { text: '> System ready ✓', color: '#50fa7b', delay: 150 },
    ]

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 530)
        return () => clearInterval(cursorInterval)
    }, [])

    useEffect(() => {
        if (currentLine >= codeLines.length) return
        const line = codeLines[currentLine]
        if (currentChar < line.text.length) {
            const timeout = setTimeout(() => {
                setCurrentChar(prev => prev + 1)
            }, 30 + Math.random() * 20)
            return () => clearTimeout(timeout)
        } else {
            const timeout = setTimeout(() => {
                setLines(prev => [...prev, { ...line, text: line.text }])
                setCurrentLine(prev => prev + 1)
                setCurrentChar(0)
            }, line.delay)
            return () => clearTimeout(timeout)
        }
    }, [currentLine, currentChar])

    return (
        <div className={styles.holoTerminal}>
            <div className={`${styles.cornerAccent} ${styles.topLeft}`} />
            <div className={`${styles.cornerAccent} ${styles.topRight}`} />
            <div className={`${styles.cornerAccent} ${styles.bottomLeft}`} />
            <div className={`${styles.cornerAccent} ${styles.bottomRight}`} />
            <div className={styles.holoScanlines} />
            <div className={styles.holoBorder} />
            <div className={styles.holoHeader}>
                <div className={styles.holoHeaderLeft}>
                    <span className={styles.holoStatus} />
                    <span className={styles.holoTitle}>SYSTEM TERMINAL</span>
                </div>
                <div className={styles.holoHeaderRight}>
                    <span>v2.0.26</span>
                    <span className={styles.holoTime}>
                        {new Date().toLocaleTimeString('en-US', { hour12: false })}
                    </span>
                </div>
            </div>
            <div className={styles.holoBody}>
                {lines.map((line, i) => (
                    <motion.div
                        key={i}
                        className={styles.holoLine}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span className={styles.lineNumber}>{String(i + 1).padStart(2, '0')}</span>
                        <span style={{ color: line.color }}>{line.text}</span>
                    </motion.div>
                ))}
                {currentLine < codeLines.length && (
                    <div className={styles.holoLine}>
                        <span className={styles.lineNumber}>
                            {String(lines.length + 1).padStart(2, '0')}
                        </span>
                        <span style={{ color: codeLines[currentLine].color }}>
                            {codeLines[currentLine].text.slice(0, currentChar)}
                        </span>
                        <span className={`${styles.holoCursor} ${showCursor ? styles.visible : ''}`}>█</span>
                    </div>
                )}
            </div>
            <div className={styles.holoFooter}>
                <span className={styles.holoFooterItem}>
                    <span className={styles.pulsingDot} /> CONNECTED
                </span>
                <span className={styles.holoFooterItem}>ENCRYPTION: AES-256</span>
                <span className={styles.holoFooterItem}>FIREWALL: ACTIVE</span>
            </div>
        </div>
    )
}

const NetworkRadar = () => {
    return (
        <div className={styles.radarContainer}>
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className={styles.radarCircleWrapper}
                    style={{
                        width: `${i * 100}px`,
                        height: `${i * 100}px`,
                    }}
                >
                    <motion.div
                        className={styles.radarCircleInner}
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
            ))}
            <motion.div
                className={styles.radarSweep}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const angle = (i / 8) * Math.PI * 2
                const radius = 100 + i * 10
                return (
                    <motion.div
                        key={i}
                        className={styles.networkNode}
                        style={{
                            left: `calc(50% + ${Math.cos(angle) * radius}px - 3px)`,
                            top: `calc(50% + ${Math.sin(angle) * radius}px - 3px)`,
                        }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2 + i * 0.3, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                )
            })}
        </div>
    )
}

const DataStream = () => {
    return (
        <div className={styles.dataStream}>
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    className={styles.streamLine}
                    style={{ left: `${10 + i * 15}%` }}
                    animate={{ y: ['-100%', '100%'], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2 + Math.random(), delay: i * 0.4, repeat: Infinity, ease: 'linear' }}
                />
            ))}
        </div>
    )
}

function Hero() {
    const [roleIndex, setRoleIndex] = useState(0)
    const [displayText, setDisplayText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const [githubStats, setGithubStats] = useState({ repos: 0, stars: 0 })

    const [quoteIndex] = useState(() => Math.floor(Math.random() * heroQuotes.length))
    const [typedQuote, setTypedQuote] = useState('')
    const [quoteTypingComplete, setQuoteTypingComplete] = useState(false)
    const [typingStarted, setTypingStarted] = useState(false)

    useEffect(() => {
        const startDelay = setTimeout(() => {
            setTypingStarted(true)
        }, 1000)
        return () => clearTimeout(startDelay)
    }, [])

    useEffect(() => {
        if (!typingStarted) return
        const quote = heroQuotes[quoteIndex]
        if (typedQuote.length < quote.length) {
            const timeout = setTimeout(() => {
                setTypedQuote(quote.slice(0, typedQuote.length + 1))
            }, 25)
            return () => clearTimeout(timeout)
        } else {
            setQuoteTypingComplete(true)
        }
    }, [typedQuote, quoteIndex, typingStarted])

    const firstName = "Kingshuk"
    const lastName = "Chatterjee"

    useEffect(() => {
        const fetchGitHubStats = async () => {
            try {
                const token = import.meta.env.VITE_GITHUB_TOKEN
                const headers = { 'Accept': 'application/vnd.github.v3+json' }
                if (token) headers['Authorization'] = `token ${token}`

                // Keep this updated to your actual github username if you want live stats
                const response = await fetch('https://api.github.com/users/KingshukChatterjee007', { headers })
                if (response.ok) {
                    const data = await response.json()
                    setGithubStats(prev => ({ ...prev, repos: data.public_repos }))
                }
            } catch (err) {
                console.error('Error fetching GitHub stats:', err)
            }
        }
        fetchGitHubStats()
    }, [])

    useEffect(() => {
        const currentRole = roles[roleIndex]
        const speed = isDeleting ? 50 : 100

        if (!isDeleting && displayText === currentRole) {
            setTimeout(() => setIsDeleting(true), 2000)
            return
        }

        if (isDeleting && displayText === '') {
            setIsDeleting(false)
            setRoleIndex((prev) => (prev + 1) % roles.length)
            return
        }

        const timeout = setTimeout(() => {
            setDisplayText(prev =>
                isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
            )
        }, speed)

        return () => clearTimeout(timeout)
    }, [displayText, isDeleting, roleIndex])

    return (
        <section id="home" className={styles.hero}>
            <div className={styles.matrixBg}></div>
            <div className={styles.glowOrb1}></div>
            <div className={styles.glowOrb2}></div>
            <div className="scanline"></div>

            <div className={`container ${styles.heroContainer}`}>
                <motion.div
                    className={styles.heroContent}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className={styles.statusBadge}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className={styles.statusDot}></span>
                        <span>Available for Work</span>
                    </motion.div>

                    <motion.div
                        className={styles.nameWrapper}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1 className={styles.name}>
                            <span className={styles.firstName}>{firstName}</span>
                            <span className={styles.lastName}>{lastName}</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        className={styles.roleContainer}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <span className={styles.rolePrefix}>{'>'} </span>
                        <span className={styles.role}>{displayText}</span>
                        <span className={styles.cursor}></span>
                    </motion.div>

                    <motion.div
                        className={styles.comboWrapper}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className={styles.comboCard}>
                            <p className={styles.comboPlaceholder} aria-hidden="true">
                                {heroQuotes[quoteIndex]}
                            </p>
                            <p
                                className={`${styles.comboText} ${quoteTypingComplete ? styles.comboGlitch : ''}`}
                                data-text={typedQuote}
                            >
                                {typedQuote}
                                {!quoteTypingComplete && <span className={styles.comboCursor}>|</span>}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.buttons}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <motion.a
                            href="#projects"
                            className={`btn ${styles.btnPrimary}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Terminal />
                            View Projects
                        </motion.a>

                        <motion.a
                            href="#contact"
                            className="btn btn-secondary"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Get In Touch
                            <ArrowRight />
                        </motion.a>

                        <motion.a
                            href="/Resume.pdf"
                            download="Kingshuk_Chatterjee_Resume.pdf"
                            className={`btn ${styles.btnResume}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Download />
                            Resume
                        </motion.a>
                    </motion.div>

                    <motion.div
                        className={styles.stats}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>20+</span>
                            <span className={styles.statLabel}>GitHub Repos</span>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.stat}>
                            <span className={styles.statNumber}>2+</span>
                            <span className={styles.statLabel}>Years KSRC Member</span>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles.heroVisual}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
                >
                    <NetworkRadar />
                    <DataStream />
                    <HoloTerminal />

                    <motion.div
                        className={`${styles.floatingCmd} ${styles.cmdTop}`}
                        initial={{ opacity: 1 }}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        $ python ml_model.py
                    </motion.div>

                    <motion.div
                        className={`${styles.floatingCmd} ${styles.cmdBottom}`}
                        initial={{ opacity: 1 }}
                        animate={{ y: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    >
                        $ flutter run --release
                    </motion.div>

                    <motion.div
                        className={styles.portBadge}
                        initial={{ opacity: 1 }}
                        animate={{ y: [0, -2, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    >
                        <span className={styles.portLabel}>REACT</span>
                        <span className={styles.portNumber}>UI</span>
                        <span className={styles.portStatus}>ACTIVE</span>
                    </motion.div>

                    <motion.div
                        className={styles.cveBadge}
                        animate={{
                            y: [-3, 3, -3],
                            boxShadow: [
                                '0 0 15px rgba(255,170,0,0.3)',
                                '0 0 25px rgba(255,170,0,0.5)',
                                '0 0 15px rgba(255,170,0,0.3)'
                            ]
                        }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        <span className={styles.cveText}>RE-ACTION</span>
                    </motion.div>

                    <svg className={styles.circuitLines} viewBox="0 0 100 100">
                        <motion.circle
                            cx="180"
                            cy="-5"
                            r="3"
                            fill="#ffaa00"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.circle
                            cx="200"
                            cy="-5"
                            r="3"
                            fill="#ff8800"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 1 }}
                        />
                    </svg>
                </motion.div>
            </div>

            <motion.div
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div className={styles.scrollLine}></div>
                <span>Scroll</span>
            </motion.div>
        </section>
    )
}

export default Hero
