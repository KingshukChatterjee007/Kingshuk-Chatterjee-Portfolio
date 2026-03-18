import { motion } from 'framer-motion'
import styles from './Background.module.css'

const Background = () => {
    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.blackholeWrapper}>
                {/* 1. TOP LENSING RING (Warped behind) */}
                <motion.div 
                    className={styles.lensingTop}
                    animate={{ rotateZ: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />

                {/* 2. BOTTOM LENSING RING (Warped behind) */}
                <motion.div 
                    className={styles.lensingBottom}
                    animate={{ rotateZ: -360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                />

                {/* 3. PHOTON RING */}
                <div className={styles.photonRing}></div>

                {/* 4. THE SINGULARITY */}
                <div className={styles.singularity}></div>

                {/* 5. FRONT ACCRETION DISK (Rotating Plasma) */}
                <motion.div 
                    className={styles.accretionDiskFront}
                    animate={{ 
                        opacity: [0.8, 1, 0.8],
                        scaleX: [0.98, 1.02, 0.98]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Rotating Plasma Detail Layer */}
                <motion.div 
                    style={{
                        position: 'absolute',
                        width: '900px',
                        height: '2px',
                        background: 'repeating-linear-gradient(90deg, transparent 0, #fff 100px, transparent 200px)',
                        zIndex: 115,
                        filter: 'blur(2px)',
                        opacity: 0.4
                    }}
                    animate={{ backgroundPosition: ['0px 0px', '400px 0px'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Plasma Streaks Spiraling In */}
            <div className={styles.plasmaLayer}>
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={`streak-${i}`}
                        className={styles.streak}
                        initial={{ 
                            x: '50vw', 
                            y: '50vh', 
                            rotate: Math.random() * 360,
                            scale: 0,
                            opacity: 0 
                        }}
                        animate={{
                            x: ['50vw', `${50 + (Math.cos(i) * 30)}vw`],
                            y: ['50vh', `${50 + (Math.sin(i) * 30)}vh`],
                            rotate: [0, 180, 360],
                            scale: [0, 1.5, 0.2],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 8,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Background Stars */}
            <div className={styles.stars}>
                {[...Array(100)].map((_, i) => (
                    <div
                        key={`star-${i}`}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: '1px',
                            height: '1px',
                            background: '#fff',
                            opacity: Math.random() * 0.7,
                            borderRadius: '50%'
                        }}
                    />
                ))}
            </div>

            <div className={styles.vignette} />
        </div>
    )
}

export default Background
