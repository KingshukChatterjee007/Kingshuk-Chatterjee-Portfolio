import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import styles from './Skills.module.css'

const Fingerprint = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }} aria-hidden="true">
        <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10v.8c0 1.25-.97 2.2-2.12 2.2-1.03 0-1.88-.84-1.88-1.88V12c0-3.31-2.69-6-6-6s-6 2.69-6 6v2.5c0 1.5 1.13 2.7 2.63 2.7h.37c2.2 0 4-1.8 4-4 0-1.1-.9-2-2-2s-2 .9-2 2v2" />
    </svg>
)

// Updated Skill Data Structure from your Resume
const skillData = {
    id: 'core',
    label: 'Kingshuk Chatterjee',
    type: 'core',
    children: [
        {
            id: 'languages',
            label: 'Languages',
            type: 'category',
            color: '#00ff88',
            children: [
                { id: 'python', label: 'Python', type: 'skill' },
                { id: 'js', label: 'JavaScript', type: 'skill' },
                { id: 'c', label: 'C', type: 'skill' },
                { id: 'html5', label: 'HTML5', type: 'skill' },
                { id: 'css3', label: 'CSS3', type: 'skill' },
                { id: 'sql', label: 'SQL', type: 'skill' },
            ]
        },
        {
            id: 'frameworks',
            label: 'Frameworks',
            type: 'category',
            color: '#00d4ff',
            children: [
                { id: 'flutter', label: 'Flutter', type: 'skill' },
                { id: 'react', label: 'React', type: 'skill' },
                { id: 'node', label: 'Node.js', type: 'skill' },
                { id: 'express', label: 'Express', type: 'skill' },
                { id: 'flask', label: 'Flask', type: 'skill' },
                { id: 'tf', label: 'TensorFlow', type: 'skill' },
                { id: 'pandas', label: 'Pandas', type: 'skill' },
                { id: 'opencv', label: 'OpenCV', type: 'skill' },
            ]
        },
        {
            id: 'ml',
            label: 'Machine Learning',
            type: 'category',
            color: '#bd00ff',
            children: [
                { id: 'xgboost', label: 'XGBoost', type: 'skill' },
                { id: 'cnn', label: 'CNN', type: 'skill' },
                { id: 'lstm', label: 'LSTM', type: 'skill' },
                { id: 'feateng', label: 'Feature Eng.', type: 'skill' },
                { id: 'timeseries', label: 'Time-Series', type: 'skill' },
                { id: 'modeleval', label: 'Model Eval', type: 'skill' },
            ]
        },
        {
            id: 'tools',
            label: 'Tools & Design',
            type: 'category',
            color: '#ffaa00',
            children: [
                { id: 'figma', label: 'Figma', type: 'skill' },
                { id: 'adobe', label: 'Adobe Suite', type: 'skill' },
                { id: 'blender', label: 'Blender', type: 'skill' },
                { id: 'powerbi', label: 'Power BI', type: 'skill' },
            ]
        }
    ]
}

const SkillGraph = () => {
    // Generate Positions (Radial Layout)
    const nodes = useMemo(() => {
        const nodeList = []
        const edgesList = []

        // Center
        nodeList.push({ ...skillData, x: 50, y: 50, level: 0 })

        // Categories (Level 1)
        const catCount = skillData.children.length
        skillData.children.forEach((cat, i) => {
            const angle = (i / catCount) * 2 * Math.PI - Math.PI / 2
            const radius = 22 // Adjusted from 25 to fit 4 categories better
            const x = 50 + Math.cos(angle) * radius * 1.5 // Aspect ratio correction
            const y = 50 + Math.sin(angle) * radius

            nodeList.push({ ...cat, x, y, level: 1, parentId: 'core' })
            edgesList.push({ from: 'core', to: cat.id, color: cat.color })

            // Skills (Level 2)
            const skillCount = cat.children.length
            const angleSpan = (2 * Math.PI) / catCount // Span for this category
            const startAngle = angle - angleSpan / 2

            cat.children.forEach((skill, j) => {
                // Smooth spread for 4 quadrants
                let spreadFactor = 0.8
                let startOffset = 0.1

                const skillAngle = startAngle + (j / Math.max(1, skillCount - 1)) * angleSpan * spreadFactor + (angleSpan * startOffset)
                const skillRadius = 45 // 45% from center
                const sx = 50 + Math.cos(skillAngle) * skillRadius * 1.5
                const sy = 50 + Math.sin(skillAngle) * skillRadius

                nodeList.push({ ...skill, x: sx, y: sy, level: 2, parentId: cat.id, color: cat.color })
                edgesList.push({ from: cat.id, to: skill.id, color: cat.color })
            })
        })
        return { nodeList, edgesList }
    }, [])

    return (
        <div className={styles.graphContainer}>
            <svg className={styles.connections} aria-hidden="true">
                {nodes.edgesList.map((edge, i) => {
                    const fromNode = nodes.nodeList.find(n => n.id === edge.from)
                    const toNode = nodes.nodeList.find(n => n.id === edge.to)

                    if (!fromNode || !toNode) return null

                    return (
                        <motion.line
                            key={i}
                            x1={`${fromNode.x}%`}
                            y1={`${fromNode.y}%`}
                            x2={`${toNode.x}%`}
                            y2={`${toNode.y}%`}
                            stroke={edge.color}
                            strokeWidth="2"
                            strokeOpacity="0.8"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        />
                    )
                })}
            </svg>

            {nodes.nodeList.map((node) => (
                <Node key={node.id} node={node} />
            ))}
        </div>
    )
}

const Node = ({ node }) => {
    return (
        <motion.div
            className={`${styles.node} ${styles[node.type]}`}
            style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                borderColor: node.color,
                boxShadow: `0 0 20px ${node.color}40`,
                transform: 'translate(-50%, -50%)' /* FORCE CENTER */
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
                type: 'spring',
                duration: 1,
                delay: node.level * 0.2
            }}
            whileHover={{ scale: 1.2, zIndex: 100 }}
            drag
            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            role="img"
            aria-label={node.label}
        >
            <div className={styles.nodeContent} style={{ color: node.color || '#fff' }}>
                {node.level === 0 ? <div style={{ marginBottom: 5 }}><Fingerprint /></div> : null}
                <span className={styles.nodeLabel}>{node.label}</span>
            </div>
            {/* Orbiting particles for flair */}
            {node.level < 2 && (
                <motion.div
                    className={styles.orbitRing}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    style={{ borderColor: node.color }}
                    aria-hidden="true"
                />
            )}
        </motion.div>
    )
}

export default SkillGraph