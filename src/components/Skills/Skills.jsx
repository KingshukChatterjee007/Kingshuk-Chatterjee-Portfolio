import React from 'react'
import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'
import SkillSolarSystem from './SkillSolarSystem'
import styles from './Skills.module.css'

// Skill data for mobile grid view
const skillCategories = [
    {
        id: 'langs',
        label: 'Languages',
        color: '#ff8800',
        skills: ['Python', 'JavaScript', 'C', 'HTML5', 'CSS3', 'SQL']
    },
    {
        id: 'frameworks',
        label: 'Frameworks',
        color: '#ffd700',
        skills: ['Flutter', 'React', 'Node.js', 'Express', 'Flask', 'TensorFlow', 'Pandas', 'OpenCV']
    },
    {
        id: 'ml',
        label: 'Machine Learning',
        color: '#ffaa00',
        skills: ['XGBoost', 'CNN', 'LSTM', 'Feature Engineering', 'Time-Series Modeling', 'Model Training', 'Model Evaluation']
    },
    {
        id: 'tools',
        label: 'Tools',
        color: '#ff6600',
        skills: ['Figma', 'Adobe Suite', 'Blender', 'Power BI']
    }
]

const Skills = () => {
    return (
        <section id="skills" className={styles.skills}>
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="section-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <span className="section-tag">
                        <Cpu size={14} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'text-bottom' }} aria-hidden="true" />
                        Technical Arsenal
                    </span>
                    <h2 className="section-title">
                        <span className="gradient-text">Skill Matrix</span>
                    </h2>
                    <p className="section-subtitle">
                        Visualizing my core competencies and toolset
                    </p>
                </div>

                {/* Desktop: Complex Solar System */}
                <SkillSolarSystem />

                {/* Mobile: Simple Grid View */}
                <div className={styles.mobileSkillsGrid}>
                    {skillCategories.map((category) => (
                        <React.Fragment key={category.id}>
                            {/* Category Header */}
                            <motion.div
                                className={styles.mobileCategory}
                                style={{ borderColor: category.color }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3
                                    className={styles.mobileCategoryTitle}
                                    style={{ color: category.color }}
                                >
                                    {category.label}
                                </h3>
                            </motion.div>

                            {/* Skills for this Category */}
                            {category.skills.map((skill, index) => {
                                // Logic to center the last item if the total count is odd
                                const isOddCount = category.skills.length % 2 !== 0
                                const isLastItem = index === category.skills.length - 1
                                const shouldCenter = isOddCount && isLastItem

                                return (
                                    <motion.div
                                        key={`${category.id}-${skill}`}
                                        className={styles.mobileSkillBadge}
                                        style={{
                                            // Fix: Use full solid color (no transparency)
                                            borderColor: category.color,
                                            // Fix: Apply category color to text
                                            color: category.color,
                                            boxShadow: `0 0 10px ${category.color}20`,
                                            // Fix: Center the last item if odd
                                            ...(shouldCenter ? {
                                                gridColumn: 'span 2',
                                                width: '50%',
                                                margin: '0 auto'
                                            } : {})
                                        }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        {skill}
                                    </motion.div>
                                )
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Background ambiance removed for full transparency */}
        </section>
    )
}

export default Skills

