import { useState, useEffect, lazy, Suspense } from 'react'
import Intro from './components/Intro/Intro'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import AdvancedBackground from './components/Background/AdvancedBackground'
import styles from './App.module.css'

// Lazy Load heavy components below the fold
const About = lazy(() => import('./components/About/About'))
const Experience = lazy(() => import('./components/Experience/Experience'))
const Skills = lazy(() => import('./components/Skills/Skills'))
const Projects = lazy(() => import('./components/Projects/Projects'))
const Contact = lazy(() => import('./components/Contact/Contact'))
const Footer = lazy(() => import('./components/Footer/Footer'))

function App() {
    const [introComplete, setIntroComplete] = useState(false)

    // Handle hash-based URL navigation after intro + lazy load complete
    useEffect(() => {
        if (introComplete && window.location.hash) {
            // Delay to ensure lazy-loaded components have rendered
            const timer = setTimeout(() => {
                const id = window.location.hash.substring(1)
                const element = document.getElementById(id)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [introComplete])

    return (
        <div className={styles.app}>
            <AdvancedBackground />
            {/* Full-Screen Intro Animation */}
            {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}

            <Navbar />
            <main>
                <Hero />

                {/* Defer loading of non-critical sections */}
                <Suspense fallback={<div style={{ height: '100px' }}></div>}>
                    <About />
                    <Experience />
                    <Skills />
                    <Projects />
                    <Contact />
                </Suspense>
            </main>

            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </div>
    )
}

export default App
