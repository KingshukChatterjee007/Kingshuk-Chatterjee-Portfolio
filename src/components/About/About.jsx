import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './About.module.css'

// SVG Icons
const Target = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
)

const Award = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
)

const Code = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </svg>
)

const highlights = [
    {
        icon: <Code />,
        title: 'Software Developer',
        description: 'React, Flutter, Python, Node.js',
        color: 'primary'
    },
    {
        icon: <Target />,
        title: 'UI/Systems Designer',
        description: 'Figma, Prototyping, User Experience',
        color: 'accent'
    },
    {
        icon: <Award />,
        title: 'AI & Research',
        description: 'Predictive Modeling & Published Research',
        color: 'warning'
    }
]

function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section id="about" className={`section ${styles.about}`}>
            <div className="hex-grid"></div>
            <div className="container">
                <motion.div
                    ref={ref}
                    className={styles.aboutGrid}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Terminal Side */}
                    <motion.div
                        className={styles.terminalWrapper}
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <div className={`terminal ${styles.aboutTerminal}`}>
                            <div className="terminal-header">
                                <span className="terminal-dot red"></span>
                                <span className="terminal-dot yellow"></span>
                                <span className="terminal-dot green"></span>
                                <span className="terminal-title">~/about-me</span>
                            </div>
                            <div className="terminal-body">
                                <span className="terminal-line">
                                    <span className="terminal-prompt">$ </span>
                                    <span className="terminal-command">cat profile.txt</span>
                                </span>
                                <br /><br />
                                <span className={styles.outputSection}>
                                    <span className={styles.outputKey}>Name:</span> Kingshuk Chatterjee<br />
                                    <span className={styles.outputKey}>Role:</span> Software Developer & Designer<br />
                                    <span className={styles.outputKey}>Education:</span> B.Tech Computer Science<br />
                                    <span className={styles.outputKey}>University:</span> KIIT University<br />

                                </span>
                                <br />
                                <span className="terminal-line">
                                    <span className="terminal-prompt">$ </span>
                                    <span className="terminal-command">cat quote.txt</span>
                                </span>
                                <br /><br />
                                <span className="terminal-output">
                                    "Design is not just what it<br />
                                    looks like and feels like.<br />
                                    Design is how it works."<br />
                                    — Steve Jobs
                                </span>
                            </div>
                        </div>


                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        className={styles.content}
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <div className="section-header" style={{ textAlign: 'center', marginBottom: '12px' }}>
                            <span className="section-tag">
                                <Code />
                                About Me
                            </span>
                            <h2 className="section-title">
                                <span className="gradient-text">Developer &<br />UI/Systems Designer</span>
                            </h2>
                        </div>

                        <motion.div
                            className={styles.bioFloatingCard}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <p className={styles.bio}>
                                I am a Computer Science undergraduate at KIIT University with experience in full-stack development, machine learning, and user-focused design. I have built scalable applications using technologies such as React, Flutter, Node.js, and TensorFlow, and developed machine learning models including XGBoost, CNNs, and LSTMs. My work spans AI-powered wearable systems, financial forecasting models, and platforms integrating edge and cloud technologies. I am particularly interested in applying AI and software engineering to build efficient, impactful, and well-designed solutions.
                            </p>
                        </motion.div>

                        {/* Highlights Grid */}
                        <div className={styles.highlightsGrid}>
                            {highlights.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    className={`${styles.highlightCard} ${styles[item.color]}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                >
                                    <div className={styles.highlightIcon}>
                                        {item.icon}
                                    </div>
                                    <div className={styles.highlightContent}>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </motion.div>
                </motion.div>

            </div>
        </section>
    )
}

export default About