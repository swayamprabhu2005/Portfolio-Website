import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { FallbackBrain } from './FallbackBrain';

interface BrainCanvasProps {
  className?: string;
  intensity?: number;
  interactive?: boolean;
}

// -----------------------------------------------------------------------------
// Procedural Anatomical 3D Human Brain Generator (Ahana-Inspired Hologram Model)
// -----------------------------------------------------------------------------
interface BrainData {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  linePositions: Float32Array;
  lineColors: Float32Array;
  pulsePaths: {
    start: THREE.Vector3;
    end: THREE.Vector3;
    t: number;
    speed: number;
    color: THREE.Color;
  }[];
}

function generateAnatomical3DBrain(): BrainData {
  const points: { pos: THREE.Vector3; color: THREE.Color; size: number }[] = [];
  const connections: [THREE.Vector3, THREE.Vector3, THREE.Color][] = [];

  // Cyan / Electric Blue / Violet color palette inspired by Ahana Hologram
  const cyanColor = new THREE.Color('#00D2FF');
  const skyColor = new THREE.Color('#38BDF8');
  const violetColor = new THREE.Color('#8B5CF6');
  const deepPurple = new THREE.Color('#6366F1');
  const coreWhite = new THREE.Color('#E0F2FE');

  // Helper for random in range
  const rand = (min: number, max: number) => min + Math.random() * (max - min);

  // 1. CEREBRAL CORTEX (Dual Hemispheres with Anatomical Lobes & Sulci / Gyri Folds)
  const hemispheres = [-1, 1]; // Left (-1), Right (+1)
  const rings = 36;
  const segments = 36;

  hemispheres.forEach((hemiSign) => {
    const isLeft = hemiSign === -1;

    for (let r = 0; r < rings; r++) {
      const u = r / (rings - 1);
      const theta = 0.08 + u * (Math.PI - 0.28); // Polar angle (superior to inferior)

      for (let s = 0; s < segments; s++) {
        const v = s / segments;
        const phi = v * Math.PI; // 0 to PI (medial fissure to lateral edge)

        // Base ellipsoid coordinates
        let x = Math.sin(theta) * Math.sin(phi);
        let y = Math.cos(theta);
        let z = Math.sin(theta) * Math.cos(phi);

        // Lobular deformations:
        // Frontal Lobe (z > 0): prominent rounded anterior expansion
        if (z > 0) {
          z *= 1.25;
          x *= 1.05;
          y *= 1.05;
        }

        // Occipital Lobe (z < 0, superior): tapers smoothly posteriorly
        if (z < 0) {
          z *= 1.15;
          x *= 0.95;
        }

        // Temporal Lobe: lower lateral anterior hook
        const tempDist = Math.hypot(y + 0.35, z - 0.1);
        if (tempDist < 0.6) {
          const factor = Math.exp(-tempDist * 3.0);
          x += 0.35 * factor;
          y -= 0.15 * factor;
        }

        // Medial longitudinal fissure flattening
        x = Math.max(0.04, x * 0.92);

        // Cortical Gyri & Sulci Harmonic Convolutions (Brain surface wrinkles)
        const gyri =
          0.12 * Math.sin(6.0 * x + 4.5 * y) * Math.cos(5.5 * y + 4.5 * z) +
          0.08 * Math.sin(9.0 * z + 7.5 * x) * Math.cos(8.0 * y);

        const rScale = (1.0 + gyri) * 1.55;

        // Apply scale & hemisphere orientation
        const finalX = hemiSign * (0.09 + x * rScale * 0.95);
        const finalY = (y * rScale * 1.08) + 0.2;
        const finalZ = z * rScale * 1.25;

        const pos = new THREE.Vector3(finalX, finalY, finalZ);

        // Color gradient: Left leans slightly violet/cyan, Right leans pure electric cyan/sky
        const vertColor = new THREE.Color();
        if (isLeft) {
          vertColor.copy(violetColor).lerp(cyanColor, 0.35 + 0.65 * ((finalZ + 1.8) / 3.6));
        } else {
          vertColor.copy(cyanColor).lerp(skyColor, 0.3 + 0.7 * ((finalZ + 1.8) / 3.6));
        }

        // Add occasional brighter core synaptic firing nodes
        if (Math.random() < 0.08) {
          vertColor.lerp(coreWhite, 0.7);
        }

        points.push({
          pos,
          color: vertColor,
          size: rand(0.7, 1.4),
        });
      }
    }
  });

  // 2. CEREBELLUM (Inferior-Posterior Lobes with Fine Horizontal Folia)
  const cereRings = 16;
  const cereSegs = 20;

  hemispheres.forEach((hemiSign) => {
    for (let r = 0; r < cereRings; r++) {
      const u = r / (cereRings - 1);
      const theta = u * Math.PI;

      for (let s = 0; s < cereSegs; s++) {
        const phi = (s / cereSegs) * Math.PI * 2;

        const baseRx = 0.52;
        const baseRy = 0.38;
        const baseRz = 0.44;

        // Fine horizontal striations (cerebellar folia)
        const folia = 0.04 * Math.sin(u * 28.0);

        const cx = hemiSign * (0.42 + Math.sin(theta) * Math.cos(phi) * (baseRx + folia));
        const cy = -0.85 + Math.cos(theta) * (baseRy + folia);
        const cz = -0.9 + Math.sin(theta) * Math.sin(phi) * (baseRz + folia);

        const color = deepPurple.clone().lerp(cyanColor, 0.3);

        points.push({
          pos: new THREE.Vector3(cx, cy, cz),
          color,
          size: rand(0.6, 1.1),
        });
      }
    }
  });

  // 3. BRAINSTEM & CENTRAL PONS (Inferior Central Trunk)
  const stemLayers = 18;
  const stemRadial = 12;

  for (let l = 0; l < stemLayers; l++) {
    const t = l / (stemLayers - 1);
    const sy = -0.65 - t * 1.15; // Extends down to y = -1.8
    const sz = -0.32 - t * 0.15; // Slants slightly backward
    const radius = 0.28 * (1.0 - t * 0.35); // Tapers down

    for (let i = 0; i < stemRadial; i++) {
      const angle = (i / stemRadial) * Math.PI * 2;
      const sx = Math.cos(angle) * radius * 0.85;
      const szOffset = Math.sin(angle) * radius;

      const pos = new THREE.Vector3(sx, sy, sz + szOffset);
      const col = cyanColor.clone().lerp(coreWhite, 0.25);

      points.push({
        pos,
        color: col,
        size: rand(0.8, 1.3),
      });
    }
  }

  // 4. CORPUS CALLOSUM & DEEP CENTRAL NODES (Inter-hemispheric Bridge)
  const bridgeCount = 65;
  for (let i = 0; i < bridgeCount; i++) {
    const t = i / (bridgeCount - 1);
    const arcX = (t - 0.5) * 0.38; // Connects left to right across x = 0
    const arcY = 0.15 + Math.sin(t * Math.PI) * 0.32;
    const arcZ = (t - 0.5) * 1.2;

    const pos = new THREE.Vector3(arcX, arcY, arcZ);
    points.push({
      pos,
      color: coreWhite.clone().lerp(cyanColor, 0.2),
      size: rand(1.1, 1.8),
    });
  }

  // 5. AXONAL SYNAPTIC PATHWAYS (Connecting Spatial Neighbors)
  const lineCoords: number[] = [];
  const lineColData: number[] = [];
  const sampleStep = 3; // Keep connectivity performant yet rich

  for (let i = 0; i < points.length; i += sampleStep) {
    const p1 = points[i];
    let neighborsFound = 0;

    for (let j = i + 1; j < points.length && neighborsFound < 3; j += sampleStep) {
      const p2 = points[j];
      const dist = p1.pos.distanceTo(p2.pos);

      // Connect if within spatial synaptic proximity
      if (dist > 0.12 && dist < 0.42) {
        lineCoords.push(p1.pos.x, p1.pos.y, p1.pos.z);
        lineCoords.push(p2.pos.x, p2.pos.y, p2.pos.z);

        const edgeColor = p1.color.clone().lerp(p2.color, 0.5);
        lineColData.push(edgeColor.r, edgeColor.g, edgeColor.b);
        lineColData.push(edgeColor.r, edgeColor.g, edgeColor.b);

        connections.push([p1.pos, p2.pos, edgeColor]);
        neighborsFound++;
      }
    }
  }

  // 6. ACTION POTENTIAL PULSE CARRIERS
  const pulsePaths = connections
    .filter((_, idx) => idx % 6 === 0)
    .map(([start, end, color]) => ({
      start,
      end,
      t: Math.random(),
      speed: 0.007 + Math.random() * 0.012,
      color: color.clone().lerp(coreWhite, 0.6),
    }));

  // Pack flat typed arrays for Three.js
  const totalCount = points.length;
  const positions = new Float32Array(totalCount * 3);
  const colors = new Float32Array(totalCount * 3);
  const sizes = new Float32Array(totalCount);

  points.forEach((pt, idx) => {
    positions[idx * 3] = pt.pos.x;
    positions[idx * 3 + 1] = pt.pos.y;
    positions[idx * 3 + 2] = pt.pos.z;

    colors[idx * 3] = pt.color.r;
    colors[idx * 3 + 1] = pt.color.g;
    colors[idx * 3 + 2] = pt.color.b;

    sizes[idx] = pt.size;
  });

  return {
    positions,
    colors,
    sizes,
    linePositions: new Float32Array(lineCoords),
    lineColors: new Float32Array(lineColData),
    pulsePaths,
  };
}

// -----------------------------------------------------------------------------
// Interactive 3D Mesh Component with Ahana-Style Hologram Shaders
// -----------------------------------------------------------------------------
const InteractiveBrainMesh: React.FC<{
  intensity?: number;
}> = ({ intensity = 1.0 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);

  const { mouse, viewport, size } = useThree();

  // Drag interaction state
  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.25, y: -0.35 });
  const currentRotation = useRef({ x: 0.25, y: -0.35 });

  // Synaptic bus excitation shockwave
  const [shockwaveActive, setShockwaveActive] = useState(false);
  const shockwaveRadius = useRef(0);

  // Generate 3D Brain Data
  const brainData = useMemo(() => generateAnatomical3DBrain(), []);

  // Geometry references
  const pointsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(brainData.positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(brainData.colors, 3));
    geo.setAttribute('sizeModifier', new THREE.BufferAttribute(brainData.sizes, 1));
    return geo;
  }, [brainData]);

  const linesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(brainData.linePositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(brainData.lineColors, 3));
    return geo;
  }, [brainData]);

  // Dynamic traveling action potential pulses
  const pulseGeo = useRef<THREE.BufferGeometry>(null);
  const pulsePositions = useMemo(
    () => new Float32Array(brainData.pulsePaths.length * 3),
    [brainData.pulsePaths]
  );
  const pulseColors = useMemo(
    () => new Float32Array(brainData.pulsePaths.length * 3),
    [brainData.pulsePaths]
  );

  // Hologram Point Shader (from Ahana with circular discard and neural pulse)
  const pointShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointScale: { value: 32.0 * intensity },
        glowColor: { value: new THREE.Color('#00D2FF') },
        shockwaveRadius: { value: 0.0 },
      },
      vertexShader: `
        uniform float time;
        uniform float pointScale;
        uniform float shockwaveRadius;
        attribute float sizeModifier;
        varying vec3 vPosition;
        varying vec3 vColor;
        varying float vGlow;

        void main() {
          // Subtle organic breathing jitter matching Ahana
          vec3 pos = position;
          float breath = sin(time * 2.0 + pos.y * 3.0) * 0.02;
          pos += normalize(pos) * breath;

          // Shockwave ripple expansion
          if (shockwaveRadius > 0.01) {
            float distToCore = length(pos);
            float waveDelta = abs(distToCore - shockwaveRadius);
            if (waveDelta < 0.45) {
              float kick = (1.0 - waveDelta / 0.45) * 0.12;
              pos += normalize(pos) * kick;
            }
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          vPosition = pos;
          vColor = color;
          vGlow = sizeModifier;

          // Distance size attenuation
          gl_PointSize = pointScale * sizeModifier * (220.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vPosition;
        varying vec3 vColor;
        varying float vGlow;

        void main() {
          // Circular particle shape with soft falloff
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;

          float alpha = smoothstep(0.5, 0.0, dist);

          // Dynamic neural pulse wave traversing up/down the brain
          float pulse = sin(time * 3.5 + vPosition.y * 4.0 + vPosition.z * 3.0) * 0.35 + 0.65;

          vec3 finalColor = vColor * pulse * (1.1 + 0.3 * vGlow);
          gl_FragColor = vec4(finalColor, alpha * 0.95);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
  }, [intensity]);

  // Line Shader with traveling neural pulse wave
  const lineShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        baseOpacity: { value: 0.28 },
      },
      vertexShader: `
        uniform float time;
        varying vec3 vPosition;
        varying vec3 vColor;

        void main() {
          vPosition = position;
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float baseOpacity;
        varying vec3 vPosition;
        varying vec3 vColor;

        void main() {
          // Neural signal waves pulsing through axonal fibers
          float wave = sin(vPosition.y * 7.0 - time * 4.0 + vPosition.x * 3.0) * 0.5 + 0.5;
          float intensity = 0.3 + 0.9 * wave;

          // Subtle depth fade for back lines
          float depthFade = smoothstep(-2.5, 1.5, vPosition.z);

          gl_FragColor = vec4(vColor * intensity, depthFade * baseOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
  }, []);

  // Pointer drag event handlers for 360-degree rotation
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointer.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousPointer.current.x;
      const deltaY = clientY - previousPointer.current.y;

      targetRotation.current.y += deltaX * 0.008;
      targetRotation.current.x = Math.max(
        -Math.PI / 2.5,
        Math.min(Math.PI / 2.5, targetRotation.current.x + deltaY * 0.008)
      );

      previousPointer.current = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchstart', handlePointerDown);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, []);

  // Frame animation loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Auto-idle continuous smooth 3D rotation (like Ahana) when not dragging
    if (!isDragging.current) {
      targetRotation.current.y += delta * 0.35; // Gentle 360 rotation
    }

    // Smooth inertia interpolation
    currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;
    currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;

    if (groupRef.current) {
      // Parallax mouse tilt added on top
      const parallaxX = (mouse.x * viewport.width * 0.03);
      const parallaxY = (-mouse.y * viewport.height * 0.02);

      groupRef.current.rotation.y = currentRotation.current.y + parallaxX;
      groupRef.current.rotation.x = currentRotation.current.x + parallaxY;

      // Gentle vertical floating levitation
      groupRef.current.position.y = Math.sin(time * 1.4) * 0.08;
    }

    // Update shaders
    pointShaderMaterial.uniforms.time.value = time;
    lineShaderMaterial.uniforms.time.value = time;

    // Handle shockwave animation
    if (shockwaveActive) {
      shockwaveRadius.current += delta * 3.2;
      pointShaderMaterial.uniforms.shockwaveRadius.value = shockwaveRadius.current;

      if (shockwaveRef.current) {
        shockwaveRef.current.scale.setScalar(shockwaveRadius.current);
        const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 0.8 - shockwaveRadius.current / 3.0);
      }

      if (shockwaveRadius.current > 3.2) {
        setShockwaveActive(false);
        shockwaveRadius.current = 0;
        pointShaderMaterial.uniforms.shockwaveRadius.value = 0;
      }
    }

    // Update action potential pulse positions along pathways
    brainData.pulsePaths.forEach((path, i) => {
      path.t = (path.t + path.speed) % 1.0;
      const currentPos = new THREE.Vector3().lerpVectors(path.start, path.end, path.t);

      pulsePositions[i * 3] = currentPos.x;
      pulsePositions[i * 3 + 1] = currentPos.y;
      pulsePositions[i * 3 + 2] = currentPos.z;

      pulseColors[i * 3] = path.color.r;
      pulseColors[i * 3 + 1] = path.color.g;
      pulseColors[i * 3 + 2] = path.color.b;
    });

    if (pulseGeo.current) {
      pulseGeo.current.attributes.position.needsUpdate = true;
      pulseGeo.current.attributes.color.needsUpdate = true;
    }
  });

  // Trigger synaptic shockwave
  const triggerPulse = () => {
    shockwaveRadius.current = 0.1;
    setShockwaveActive(true);
  };

  return (
    <group ref={groupRef} onClick={triggerPulse} scale={size.width < 500 ? 0.95 : 1.15}>
      {/* 1. Synaptic Axon Fiber Mesh */}
      <lineSegments ref={linesRef} geometry={linesGeo} material={lineShaderMaterial} />

      {/* 2. Outer Cortical Hologram Points Cloud */}
      <points ref={pointsRef} geometry={pointsGeo} material={pointShaderMaterial} />

      {/* 3. Action Potential Traveling Synaptic Signals */}
      <points>
        <bufferGeometry ref={pulseGeo}>
          <bufferAttribute
            attach="attributes-position"
            count={brainData.pulsePaths.length}
            array={pulsePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={brainData.pulsePaths.length}
            array={pulseColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 4. Synaptic Core Excitation Shockwave Ring */}
      {shockwaveActive && (
        <mesh ref={shockwaveRef}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#00D2FF"
            transparent
            opacity={0.6}
            wireframe
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
};

// -----------------------------------------------------------------------------
// Canvas Container Component
// -----------------------------------------------------------------------------
export const NeuralBrainScene: React.FC<BrainCanvasProps> = ({
  className = '',
  intensity = 1.0,
  interactive = true,
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL || prefersReducedMotion) {
    return <FallbackBrain className={className} interactive={interactive} />;
  }

  return (
    <div
      className={`relative w-full h-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {/* Background radial ambient aura */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.08)_0%,rgba(139,92,246,0.05)_45%,transparent_70%)] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.0} />
        <directionalLight position={[2, 4, 3]} intensity={1.5} color="#00D2FF" />
        <directionalLight position={[-2, -3, 2]} intensity={1.2} color="#8B5CF6" />
        <pointLight position={[0, 0, 0]} intensity={2.0} color="#00D2FF" distance={5} />

        <InteractiveBrainMesh intensity={intensity} />
      </Canvas>
    </div>
  );
};
