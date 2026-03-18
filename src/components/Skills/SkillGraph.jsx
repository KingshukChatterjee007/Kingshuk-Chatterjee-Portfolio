import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import styles from './Skills.module.css'

const Fingerprint = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }} aria-hidden="true">
        <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10v.8c0 1.25-.97 2.2-2.12 2.2-1.03 0-1.88-.84-1.88-1.88V12c0-3.31-2.69-6-6-6s-6 2.69-6 6v2.5c0 1.5 1.13 2.7 2.63 2.7h.37c2.2 0 4-1.8 4-4 0-1.1-.9-2-2-2s-2 .9-2 2v2" />
    </svg>
)

// Enhanced Skill Data with Descriptions
const skillData = {
    id: 'core',
    label: 'Kingshuk Chatterjee',
    type: 'core',
    description: 'Software Developer & Designer passionate about AI, Machine Learning, and building modern web experiences.',
    children: [
        {
            id: 'languages',
            label: 'Languages',
            type: 'category',
            color: '#7b61ff',
            description: 'Core programming languages I use to build robust and efficient systems.',
            children: [
                { id: 'python', label: 'Python', type: 'skill', description: 'Primary language for AI, Backend, and Scripting.' },
                { id: 'js', label: 'JavaScript', type: 'skill', description: 'Powering interactive web experiences.' },
                { id: 'c', label: 'C', type: 'skill', description: 'System-level programming and algorithm foundations.' },
                { id: 'html5', label: 'HTML5', type: 'skill', description: 'Structuring the modern web.' },
                { id: 'css3', label: 'CSS3', type: 'skill', description: 'Styling with precision and modern features.' },
                { id: 'sql', label: 'SQL', type: 'skill', description: 'Relational database management and complex queries.' },
            ]
        },
        {
            id: 'frameworks',
            label: 'Frameworks',
            type: 'category',
            color: '#00d4ff',
            description: 'Modern frameworks and libraries that accelerate development across platforms.',
            children: [
                { id: 'flutter', label: 'Flutter', type: 'skill', description: 'Native cross-platform app development.' },
                { id: 'react', label: 'React', type: 'skill', description: 'Component-based UI development with Vitest/modern tools.' },
                { id: 'node', label: 'Node.js', type: 'skill', description: 'Scalable server-side JavaScript applications.' },
                { id: 'express', label: 'Express', type: 'skill', description: 'Fast, unopinionated, minimalist web framework for Node.js.' },
                { id: 'flask', label: 'Flask', type: 'skill', description: 'Lightweight WSGI web application framework in Python.' },
                { id: 'tf', label: 'TensorFlow', type: 'skill', description: 'End-to-end open source platform for machine learning.' },
                { id: 'pandas', label: 'Pandas', type: 'skill', description: 'Data manipulation and analysis library for Python.' },
                { id: 'opencv', label: 'OpenCV', type: 'skill', description: 'Open source computer vision and machine learning software library.' },
            ]
        },
        {
            id: 'ml',
            label: 'Machine Learning',
            type: 'category',
            color: '#bd00ff',
            description: 'Advanced techniques for data analysis, pattern recognition, and predictive modeling.',
            children: [
                { id: 'xgboost', label: 'XGBoost', type: 'skill', description: 'Optimized distributed gradient boosting library.' },
                { id: 'cnn', label: 'CNN', type: 'skill', description: 'Convolutional neural networks for image processing.' },
                { id: 'lstm', label: 'LSTM', type: 'skill', description: 'Long Short-Term Memory for sequential data/time-series.' },
                { id: 'feateng', label: 'Feature Eng.', type: 'skill', description: 'Transforming raw data into meaningful features for models.' },
                { id: 'timeseries', label: 'Time-Series', type: 'skill', description: 'Analyzing and forecasting chronological data points.' },
                { id: 'modeleval', label: 'Model Eval', type: 'skill', description: 'Testing and validating model performance and accuracy.' },
            ]
        },
        {
            id: 'tools',
            label: 'Tools & Design',
            type: 'category',
            color: '#e811ff',
            description: 'Standard tools for design, prototyping, and asset creation.',
            children: [
                { id: 'figma', label: 'Figma', type: 'skill', description: 'Collaborative interface design and prototyping.' },
                { id: 'adobe', label: 'Adobe Suite', type: 'skill', description: 'Photoshop, Illustrator, and Premiere for visual assets.' },
                { id: 'blender', label: 'Blender', type: 'skill', description: '3D modeling, animation, and rendering.' },
                { id: 'powerbi', label: 'Power BI', type: 'skill', description: 'Business analytics and interactive data visualization.' },
            ]
        }
    ]
}

const SkillGraph = () => {
    const [selectedNode, setSelectedNode] = useState(null)

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
        <div className={styles.graphContainer} onClick={() => setSelectedNode(null)}>
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
                            strokeOpacity={selectedNode ? (selectedNode.id === edge.from || selectedNode.id === edge.to ? 0.8 : 0.1) : 0.4}
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                        />
                    )
                })}
            </svg>

            {nodes.nodeList.map((node) => (
                <Node
                    key={node.id}
                    node={node}
                    isSelected={selectedNode?.id === node.id}
                    onSelect={(e) => {
                        e.stopPropagation()
                        setSelectedNode(node)
                    }}
                />
            ))}

            {/* Detail Card Overlay */}
            <AnimatePresence>
                {selectedNode && (
                    <motion.div
                        className={styles.detailCard}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.detailHeader} style={{ borderColor: selectedNode.color || 'var(--primary)' }}>
                            <h4 style={{ color: selectedNode.color || 'var(--primary)' }}>{selectedNode.label}</h4>
                            <button className={styles.closeBtn} onClick={() => setSelectedNode(null)}>×</button>
                        </div>
                        <div className={styles.detailBody}>
                            <p>{selectedNode.description}</p>
                            {selectedNode.type === 'category' && (
                                <div className={styles.categoryInfo}>
                                    <span>Contains {selectedNode.children.length} core skills</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const Node = ({ node, isSelected, onSelect }) => {
    return (
        <motion.div
            className={`${styles.node} ${styles[node.type]} ${isSelected ? styles.selected : ''}`}
            style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                borderColor: node.color,
                boxShadow: isSelected ? `0 0 30px ${node.color}` : `0 0 20px ${node.color}40`,
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
            onClick={onSelect}
            role="button"
            aria-label={node.label}
            aria-pressed={isSelected}
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
