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
                
                // --- COLORS (Defined early) ---
                vec3 amber = vec3(1.0, 0.5, 0.1);
                vec3 orange = vec3(1.0, 0.3, 0.05);
                vec3 gold = vec3(1.0, 0.8, 0.4);
                vec3 glowColor = vec3(1.0, 0.4, 0.1);

                // 3. SINGULARITY (Event Horizon Shadow)
                float singularity = smoothstep(0.24, 0.22, warpedDist);
                
                // 4. PHOTON RINGS (Plasma Energy Upgrade)
                float ringAngle = angle + u_time * 0.1;
                float plasmaNoise = snoise(vec2(ringAngle * 6.0, u_time * 0.4)) * 0.5 + 0.5;
                float plasmaFlow = snoise(vec2(angle * 12.0 - u_time * 1.5, warpedDist * 20.0)) * 0.5 + 0.5;
                
                float ringPulse = 1.0 + plasmaNoise * 0.02;
                
                // Base plasma intensity
                float ringBase = smoothstep(0.245, 0.238, warpedDist) * smoothstep(0.225, 0.238, warpedDist);
                float ringHot = smoothstep(0.239, 0.237, warpedDist) * smoothstep(0.235, 0.237, warpedDist);
                
                // Color layers (Amber Core -> Gold Glow)
                vec3 plasmaColor = mix(amber, gold, plasmaFlow);
                vec3 ringEffect = (ringBase * plasmaColor * 3.0) + (ringHot * vec3(1.0, 0.98, 0.9) * 6.0);
                
                // Add "energetic" turbulence
                ringEffect *= (0.8 + 0.4 * plasmaNoise * plasmaFlow);
                
                // Subtle high-speed sparkles on the ring
                float sparkles = pow(plasmaFlow, 8.0) * ringBase * 4.0;
                ringEffect += gold * sparkles;

                // 4b. COSMIC DUST MOTES (More visible, drifting particles)
                float dustGrid = 12.0; 
                vec2 dId = floor(uv * dustGrid + u_time * 0.05);
                float dHash = hash12(dId);
                float dOrbit = u_time * (dHash * 0.3 + 0.1);
                vec2 dPos = vec2(sin(dOrbit + dHash * 10.0), cos(dOrbit * 0.6)) * (0.5 + dHash * 2.5);
                float dustMotes = smoothstep(0.04, 0.0, length(uv - dPos)) * step(0.975, dHash); 
                dustMotes *= 0.5 + 0.5 * sin(u_time * 3.0 + dHash * 50.0);

                // 5. ACCRETION DISK (Volumetric / Wispy)
                float diskY = abs(warpedUV.y);
                float diskX = abs(warpedUV.x);
                
                // Multi-layered noise for "smoky" texture
                float n1 = noise(vec2(warpedUV.x * 2.0 - u_time * 0.4, warpedUV.y * 30.0));
                float n2 = noise(vec2(warpedUV.x * 8.0 + u_time * 0.8, warpedUV.y * 60.0));
                float wisps = pow(abs(n1 * 0.7 + n2 * 0.3), 1.8);
                
                // Main Horizontal Disk (Thinner and more concentrated)
                float diskMask = smoothstep(0.08, 0.0, diskY) * smoothstep(3.5, 0.4, diskX);
                float diskIntensity = wisps * diskMask * 4.0;

                // Accretion Ring (Lensed part from behind)
                float diskDist = length(uv * vec2(1.0, 4.0)); 
                float diskMaskRing = smoothstep(0.5, 0.4, diskDist) * smoothstep(0.28, 0.4, diskDist);
                float ringWisps = noise(vec2(atan(uv.y, uv.x) * 8.0 + u_time, diskDist * 40.0));
                float intensityRing = pow(abs(ringWisps), 2.2) * diskMaskRing;

                // 6. LENSING ARCS (Bent light from far side)
                float arcTopDist = length(uv + vec2(0.0, 0.5)) - 0.75;
                float arcTop = smoothstep(0.1, 0.0, abs(arcTopDist)) * smoothstep(0.6, 0.3, warpedDist);
                float arcBotDist = length(uv - vec2(0.0, 0.45)) - 0.7;
                float arcBot = smoothstep(0.08, 0.0, abs(arcBotDist)) * smoothstep(0.6, 0.35, warpedDist);

                // 7. VOLUMETRIC NEBULAE (Vibrant Background Upgrade)
                float nebula1 = snoise(uv * 0.3 + u_time * 0.03) * 0.5 + 0.5;
                float nebula2 = snoise(uv * 0.7 - u_time * 0.02) * 0.5 + 0.5;
                float nebula3 = snoise(uv * 1.5 + u_time * 0.05) * 0.5 + 0.5;
                
                float nebulaIntensity = pow(nebula1 * nebula2, 1.8) * 0.6 + (nebula3 * 0.1);
                vec3 nebulaColorLayer = mix(vec3(0.02, 0.0, 0.05), amber * 0.5, nebula1);
                nebulaColorLayer = mix(nebulaColorLayer, orange * 0.4, nebula2);
                nebulaColorLayer *= nebulaIntensity;

                vec3 color = vec3(starFinal * 0.65) + nebulaColorLayer;
                
                // Layer 1: Background Elements (Masked by Singularity)
                vec3 backElements = vec3(0.0);
                backElements += ringEffect; // Multi-channel ring with shimmer
                
                // Add a very soft glow around the ring
                vec3 ringColor = vec3(1.0, 1.0, 0.95);
                float ringGlow = smoothstep(0.4, 0.23, warpedDist) * 0.4;
                backElements += ringColor * ringGlow * (0.8 + 0.2 * snoise(vec2(u_time * 0.1, angle)));
                
                backElements += dustMotes * gold * 4.0;
                backElements += arcTop * amber * 3.0 * wisps;
                backElements += arcBot * amber * 2.5 * ringWisps;
                backElements += mix(orange, gold, ringWisps) * intensityRing * 2.5;
                
                // Apply Shadow
                color += backElements * (1.0 - singularity);
                
                // Layer 2: Foreground Disk (Thinner and passes in front)
                // We make it even thinner where it passes strictly in front to show the shadow
                float frontDiskMask = smoothstep(0.04, 0.01, diskY) * smoothstep(3.0, 0.0, diskX);
                vec3 frontDisk = mix(orange, gold, wisps) * frontDiskMask * wisps * 5.0;
                color += frontDisk;
                
                // 10. BLOOM & DOPPLER
                float bloom = smoothstep(0.9, 0.0, warpedDist) * 0.2;
                color += glowColor * bloom;

                // Doppler shift (Left side much brighter)
                float doppler = smoothstep(-1.5, 1.5, uv.x);
                color *= (0.2 + 0.8 * pow(1.0 - doppler, 1.5));

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
