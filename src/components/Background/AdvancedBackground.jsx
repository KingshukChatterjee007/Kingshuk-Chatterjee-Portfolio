import { useEffect, useRef } from 'react'
import styles from './AdvancedBackground.module.css'

const AdvancedBackground = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const gl = canvas.getContext('webgl')

        if (!gl) return

        const vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `

        const fragmentShaderSource = `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_resolution;

            #define PI 3.14159265359
            #define NUM_STARS 400

            // Simple noise for plasma/turbulence
            float hash(float n) { return fract(sin(n) * 43758.5453123); }
            float noise(vec2 x) {
                vec2 p = floor(x);
                vec2 f = fract(x);
                f = f*f*(3.0-2.0*f);
                float n = p.x + p.y*57.0;
                return mix(mix(hash(n+0.0), hash(n+1.0), f.x),
                           mix(hash(n+57.0), hash(n+58.0), f.x), f.y);
            }

            // Better Hash function
            float hash12(vec2 p) {
                vec3 p3  = fract(vec3(p.xyx) * .1031);
                p3 += dot(p3, p3.yzx + 33.33);
                return fract((p3.x + p3.y) * p3.z);
            }

            // Simplex Noise
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy));
                vec2 x0 = v - i + dot(i, C.xx);
                vec2 i1;
                i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i);
                vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m*m*m;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 a0 = x - floor(x + 0.5);
                vec3 g = a0 * vec3(x0.x,x12.xz) + h * vec3(x0.y,x12.yw);
                return 130.0 * dot(m, g);
            }

            void main() {
                vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.y, u_resolution.x);
                float dist = length(uv);
                float angle = atan(uv.y, uv.x);

                // 1. DUSTY STAR CLUSTERS (Density modulated by Noise)
                vec2 starUV = gl_FragCoord.xy / 120.0;
                vec2 gv = fract(starUV) - 0.5;
                vec2 id = floor(starUV);
                float n = hash12(id);
                
                // Density modulation to create clusters/clouds
                float density = snoise(id * 0.1) * 0.5 + 0.5;
                float starThreshold = 0.95 - (density * 0.1); // Ultra-dense stars (down from 0.98)

                float blink = sin(u_time * 0.5 + n * 20.0) * 0.5 + 0.5;
                float starCircle = smoothstep(0.15 * n, 0.0, length(gv));
                float starFinal = starCircle * blink * step(starThreshold, n);

                // 2. GRAVITATIONAL LENSING
                float lensing = 0.22 / (dist + 0.02);
                vec2 warpedUV = uv * (1.0 - lensing);
                float warpedDist = length(warpedUV);

                // 3. SINGULARITY
                float singularity = smoothstep(0.24, 0.22, warpedDist);
                
                // 4. PHOTON RINGS (Multi-layered for depth)
                float ring1 = smoothstep(0.225, 0.22, warpedDist) * smoothstep(0.21, 0.22, warpedDist);
                float ring2 = smoothstep(0.218, 0.216, warpedDist * (1.0 + 0.05 * sin(angle * 3.0 + u_time))) * 0.5;
                float ring = ring1 + ring2;

                // 4b. ORBITING DUST / SPARKLES
                float particleGrid = 80.0;
                vec2 pId = floor(uv * particleGrid);
                float pHash = hash12(pId);
                float pSpeed = pHash * 3.0 + 1.0;
                float pOrbit = u_time * pSpeed + pHash * 10.0;
                vec2 pPos = vec2(sin(pOrbit), cos(pOrbit)) * (0.3 + pHash * 1.5);
                float particles = smoothstep(0.04, 0.0, length(uv - pPos)) * step(0.99, pHash);
                particles *= 0.5 + 0.5 * sin(u_time * 10.0 + pHash * 100.0); // Twinkle

                // 5. ACCRETION DISK (Volumetric / Wispy / Interstellar style)
                float diskY = abs(warpedUV.y);
                float diskX = abs(warpedUV.x);
                
                // Multi-layered noise for "smoky" texture
                float n1 = noise(vec2(warpedUV.x * 2.0 - u_time * 0.2, warpedUV.y * 20.0));
                float n2 = noise(vec2(warpedUV.x * 5.0 + u_time * 0.5, warpedUV.y * 50.0));
                float n3 = noise(vec2(warpedUV.x * 15.0, warpedUV.y * 100.0));
                
                float wisps = pow(abs(n1 * 0.6 + n2 * 0.3 + n3 * 0.1), 1.5);
                
                // Main Horizontal Disk
                float diskMaskFlat = smoothstep(0.12, 0.0, diskY) * smoothstep(3.0, 0.4, diskX);
                float intensityFlat = wisps * diskMaskFlat * 2.5;

                // Accretion Ring (Lensed part)
                float diskDist = length(uv * vec2(1.0, 3.8)); 
                float diskMaskRing = smoothstep(0.48, 0.42, diskDist) * smoothstep(0.25, 0.38, diskDist);
                float ringWisps = noise(vec2(atan(uv.y, uv.x) * 6.0 + u_time, diskDist * 30.0));
                float intensityRing = pow(abs(ringWisps), 2.0) * diskMaskRing;

                // 6. LENSING ARCS (The bent light from behind)
                float arcTopDist = length(uv + vec2(0.0, 0.45)) - 0.7;
                float arcTop = smoothstep(0.12, 0.0, abs(arcTopDist)) * smoothstep(0.5, 0.3, warpedDist);
                float arcBotDist = length(uv - vec2(0.0, 0.4)) - 0.65;
                float arcBot = smoothstep(0.1, 0.0, abs(arcBotDist)) * smoothstep(0.5, 0.32, warpedDist);

                // 7. INTERSTELLAR AMBER COLORS
                vec3 amber = vec3(1.0, 0.5, 0.1);    // Core amber
                vec3 orange = vec3(1.0, 0.3, 0.05);  // Deep orange
                vec3 gold = vec3(1.0, 0.8, 0.4);    // Highlight gold
                vec3 glowColor = vec3(1.0, 0.4, 0.1);

                vec3 color = vec3(starFinal * 0.6); // Stars are slightly dimmer
                
                // Add Elements
                color += ring * vec3(1.0, 0.95, 0.8) * 4.0;
                color += particles * gold * 3.0 * (1.0 - smoothstep(0.0, 2.0, length(uv))); // Fade dust
                
                // Add Accretion Disk (Amber Wisps)
                color += mix(orange, gold, wisps) * intensityFlat * 3.5;
                color += mix(orange, gold, ringWisps) * intensityRing * 2.0;
                
                // Add Lensing Arcs
                color += arcTop * amber * 2.5 * wisps;
                color += arcBot * amber * 1.8 * ringWisps;
                
                // Global Accretion Glow (Bloom)
                float bloom = smoothstep(0.8, 0.0, warpedDist) * 0.15;
                color += glowColor * bloom;

                // Doppler shift (Left side is brighter/bluer-shifted, Right is redder/dimmer)
                float doppler = smoothstep(-2.0, 2.0, uv.x);
                color *= (0.3 + 0.7 * (1.0 - doppler));

                // Final Singularity Shadow
                color *= (1.0 - singularity);

                gl_FragColor = vec4(color, 1.0);
            }
        `

        function createShader(gl, type, source) {
            const shader = gl.createShader(type)
            gl.shaderSource(shader, source)
            gl.compileShader(shader)
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader))
                gl.deleteShader(shader)
                return null
            }
            return shader
        }

        const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
        const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

        const program = gl.createProgram()
        gl.attachShader(program, vs)
        gl.attachShader(program, fs)
        gl.linkProgram(program)

        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)

        const positionLocation = gl.getAttribLocation(program, 'position')
        const timeLocation = gl.getUniformLocation(program, 'u_time')
        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')

        function resize() {
            canvas.width = window.innerWidth * window.devicePixelRatio
            canvas.height = window.innerHeight * window.devicePixelRatio
            gl.viewport(0, 0, canvas.width, canvas.height)
        }

        window.addEventListener('resize', resize)
        resize()

        let animationFrameId
        const render = (time) => {
            gl.clearColor(0, 0, 0, 1)
            gl.clear(gl.COLOR_BUFFER_BIT)
            gl.useProgram(program)

            gl.enableVertexAttribArray(positionLocation)
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

            gl.uniform1f(timeLocation, time * 0.001)
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height)

            gl.drawArrays(gl.TRIANGLES, 0, 6)
            animationFrameId = requestAnimationFrame(render)
        }

        animationFrameId = requestAnimationFrame(render)

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <div className={styles.canvasContainer}>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    )
}

export default AdvancedBackground
