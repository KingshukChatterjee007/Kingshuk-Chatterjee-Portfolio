import { motion } from 'framer-motion'
import styles from './Background.module.css'

const Background = () => {
    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.blackholeWrapper}>
                {/* 1. TOP LENSING RING */}
                <motion.div 
                    className={styles.diskWarpTop}
                    animate={{ rotateZ: [45, 55, 45], scale: [1, 1.02, 1] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* 2. BOTTOM LENSING RING */}
                <motion.div 
                    className={styles.diskWarpBottom}
                    animate={{ rotateZ: [45, 35, 45], scale: [1, 1.05, 1] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* 3. PHOTON RING */}
                <div className={styles.photonRing}></div>

                {/* 4. THE SINGULARITY */}
                <div className={styles.singularity}></div>

                {/* 5. FRONT ACCRETION DISK */}
                <motion.div 
                    className={styles.accretionDiskFront}
                    animate={{ 
                        opacity: [0.8, 1, 0.8],
                        filter: ['blur(10px)', 'blur(14px)', 'blur(10px)']
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div 
                    className={styles.accretionDiskRings}
                    animate={{ rotateZ: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                />

                <motion.div 
                    className={styles.diskDetail}
                    animate={{ rotateZ: -360 }}
                    transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Planets */}
            <div className={styles.planetsLayer}>
                <motion.div className={`${styles.planet} ${styles.planet1}`} 
                    animate={{ y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
                <motion.div className={`${styles.planet} ${styles.planet2}`} 
                    animate={{ y: [0, 15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
                <motion.div className={`${styles.planet} ${styles.planet3}`} 
                    animate={{ y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
            </div>

            {/* Plasma Streaks */}
            <div className={styles.plasmaLayer}>
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={`streak-${i}`}
                        className={styles.streak}
                        initial={{ 
                            x: '60vw', 
                            y: '50vh', 
                            rotate: Math.random() * 360,
                            scale: 0,
                            opacity: 0 
                        }}
                        animate={{
                            x: ['60vw', `${60 + (Math.cos(i) * 60)}vw`],
                            y: ['50vh', `${60 + (Math.sin(i) * 60)}vh`],
                            rotate: [0, 180, 360],
                            scale: [0, 2, 0],
                            opacity: [0, 0.9, 0]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 8,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Wireframe grids based on the image */}
            <div className={styles.gridLayer}>
                <div className={styles.gridSphere}>
                    <motion.div className={styles.sphereItem} animate={{rotateZ: 360}} transition={{ duration: 200, repeat: Infinity, ease: "linear"}} />
                    <motion.div className={styles.sphereItem} animate={{rotateZ: -360}} transition={{ duration: 250, repeat: Infinity, ease: "linear"}} />
                    <motion.div className={styles.sphereItem} animate={{rotateZ: 360}} transition={{ duration: 180, repeat: Infinity, ease: "linear"}} />
                </div>
                <div className={styles.gravityFunnel} />
            </div>

            {/* Background Stars */}
            <div className={styles.stars}>
                {[...Array(150)].map((_, i) => (
                    <div
                        key={`star-${i}`}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: Math.random() > 0.8 ? '2px' : '1px',
                            height: Math.random() > 0.8 ? '2px' : '1px',
                            background: Math.random() > 0.5 ? '#fff' : '#88ccff',
                            opacity: Math.random() * 0.8,
                            borderRadius: '50%',
                            boxShadow: Math.random() > 0.9 ? '0 0 5px #fff' : 'none'
                        }}
                    />
                ))}
            </div>

            <div className={styles.vignette} />
        </div>
    )
}

export default Background
