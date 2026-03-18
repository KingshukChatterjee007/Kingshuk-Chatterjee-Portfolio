import React from 'react'
import { motion } from 'framer-motion'
import styles from './SkillSolarSystem.module.css'

const skillSolarSystemData = [
    {
        id: 'ml',
        category: "Machine Learning",
        color: "#ffaa00",
        orbitRadius: 280,
        orbitDuration: 45,
        skills: ["XGBoost", "CNN", "LSTM", "Feature Eng", "Time-Series", "Training", "Evaluation"]
    },
    {
        id: 'langs',
        category: "Languages",
        color: "#ff8800",
        orbitRadius: 200,
        orbitDuration: 35,
        skills: ["Python", "JS", "C", "HTML5", "CSS3", "SQL"]
    },
    {
        id: 'frameworks',
        category: "Frameworks",
        color: "#ffd700",
        orbitRadius: 130,
        orbitDuration: 25,
        skills: ["Flutter", "React", "Node.js", "Express", "Flask", "TensorFlow", "Pandas", "OpenCV"]
    },
    {
        id: 'tools',
        category: "Tools",
        color: "#ff6600",
        orbitRadius: 350,
        orbitDuration: 55,
        skills: ["Figma", "Adobe", "Blender", "Power BI"]
    }
]

const Moon = ({ skill, index, total, color }) => {
    // Elliptical orbit for the moon around the planet - Spread out more
    const rx = 140
    const ry = 70
    const duration = 15 + Math.random() * 10 // Slower for readability
    const delay = -(index / total) * duration * 1.2

    return (
        <motion.div
            className={styles.moonWrapper}
            animate={{
                x: [rx, 0, -rx, 0, rx],
                y: [0, ry, 0, -ry, 0],
                zIndex: [1, 2, 1, 0, 1] // Simple depth simulation
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                delay
            }}
        >
            <div 
                className={styles.moon}
                style={{ '--planet-color': color }}
            >
                {skill}
            </div>
        </motion.div>
    )
}

const PlanetSystem = ({ category }) => {
    // Elliptical orbit for the planet around the sun
    // Make them more horizontal (Interstellar feel) - Widen slightly
    const rx = category.orbitRadius * 1.6
    const ry = category.orbitRadius * 0.7
    const duration = category.orbitDuration
    
    // Starting position offset to prevent all planets from lining up
    const startAngle = (category.orbitRadius * 12345) % (Math.PI * 2)
    const delay = -(startAngle / (Math.PI * 2)) * duration

    return (
        <div className={styles.planetSystem}>
            {/* Elliptical Orbit Line */}
            <div 
                className={styles.orbitLine} 
                style={{ 
                    width: rx * 2, 
                    height: ry * 2,
                    opacity: 0.1
                }} 
            />
            
            <motion.div
                className={styles.planetWrapper}
                animate={{
                    x: [rx, 0, -rx, 0, rx],
                    y: [0, ry, 0, -ry, 0],
                    zIndex: [10, 20, 10, 5, 10]
                }}
                transition={{
                    duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay
                }}
            >
                <div 
                    className={styles.planet}
                    style={{ 
                        '--planet-color': category.color,
                        '--planet-shadow': `${category.color}40`,
                        width: '120px',
                        height: '120px'
                    }}
                >
                    <span className={styles.planetLabel}>{category.category}</span>
                    
                    {/* Moons orbiting this planet */}
                    {category.skills.map((skill, idx) => (
                        <Moon 
                            key={skill} 
                            skill={skill} 
                            index={idx} 
                            total={category.skills.length} 
                            color={category.color}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

const SkillSolarSystem = () => {
    const [scale, setScale] = React.useState(1)

    React.useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 1400 && width >= 1024) {
                setScale(Math.min(1, (width - 100) / 1200))
            } else {
                setScale(1)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div className={styles.container} style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            {/* The Sun */}
            <motion.div 
                className={styles.sun}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <span className={styles.sunName}>Kingshuk Chatterjee</span>
            </motion.div>

            {/* Planetary Systems */}
            {skillSolarSystemData.map((category) => (
                <PlanetSystem key={category.id} category={category} />
            ))}
        </div>
    )
}

export default SkillSolarSystem
