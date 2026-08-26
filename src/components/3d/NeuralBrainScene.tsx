import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sounds } from '../ui/SoundEffects';
import { FallbackBrain } from './FallbackBrain';

interface BrainCanvasProps {
  className?: string;
  intensity?: number;
  interactive?: boolean;
}

// Helper to generate symmetric circuit nodes & connections inspired by the supplied artwork
function generateBrainCircuitData() {
  const nodesLeft: THREE.Vector3[] = [];
  const nodesRight: THREE.Vector3[] = [];
  const connections: [THREE.Vector3, THREE.Vector3][] = [];
  const contourPoints: THREE.Vector3[] = [];

  // Hemisphere base outlines (Smooth anatomical lobular curves)
  const numContour = 80;
  for (let i = 0; i <= numContour; i++) {
    const t = (i / numContour) * Math.PI * 2;
    // Brain-like parametric deformation
    const r = 2.4 + 0.3 * Math.sin(3 * t) + 0.15 * Math.cos(5 * t);
    const x = Math.sin(t) * r * 0.85;
    const y = Math.cos(t) * r * 1.05;
    const z = (Math.sin(t * 2) * 0.2);

    if (x < -0.15) {
      contourPoints.push(new THREE.Vector3(x, y, z));
    }
  }

  // Symmetrical Key Circuit Node Positions (x, y, z)
  const baseNodeCoords: [number, number, number][] = [
    // Top Lobes
    [-0.5, 2.0, 0.1],
    [-1.1, 1.8, 0.2],
    [-1.6, 1.3, 0.1],
    [-0.4, 1.4, 0.3],
    [-0.9, 1.1, 0.25],
    // Middle Lobes
    [-1.8, 0.6, 0.15],
    [-1.3, 0.4, 0.3],
    [-0.6, 0.5, 0.4],
    [-1.7, -0.2, 0.1],
    [-1.2, -0.3, 0.3],
    [-0.5, -0.2, 0.35],
    // Lower Temporal & Cerebellar
    [-1.5, -0.9, 0.15],
    [-1.0, -1.1, 0.25],
    [-0.4, -1.0, 0.3],
    [-1.2, -1.7, 0.1],
    [-0.6, -1.8, 0.2],
    [-0.3, -2.1, 0.1],
  ];

  baseNodeCoords.forEach(([x, y, z]) => {
    const leftVec = new THREE.Vector3(x, y, z);
    const rightVec = new THREE.Vector3(-x, y, z);
    nodesLeft.push(leftVec);
    nodesRight.push(rightVec);
  });

  // Circuit pathways connecting nodes (Internal neural bus lines)
  const leftLinks: [number, number][] = [
    [0, 3], [3, 4], [1, 4], [2, 1],
    [3, 7], [4, 6], [5, 6], [6, 7],
    [7, 10], [6, 9], [8, 9], [9, 10],
    [10, 13], [9, 12], [11, 12], [12, 13],
    [13, 15], [12, 14], [14, 15], [15, 16],
  ];

  leftLinks.forEach(([i, j]) => {
    // Left Hemisphere Connections
    connections.push([nodesLeft[i], nodesLeft[j]]);
    // Right Hemisphere Connections (Symmetric)
    connections.push([nodesRight[i], nodesRight[j]]);
  });

  // Connect medial nodes to central spinal/sulcus line
  [7, 10, 13].forEach((idx) => {
    const centerPointLeft = new THREE.Vector3(-0.08, nodesLeft[idx].y, 0.2);
    const centerPointRight = new THREE.Vector3(0.08, nodesRight[idx].y, 0.2);
    connections.push([nodesLeft[idx], centerPointLeft]);
    connections.push([nodesRight[idx], centerPointRight]);
  });

  return { nodesLeft, nodesRight, connections, contourPoints };
}

// Interactive 3D Mesh Component
const InteractiveBrainMesh: React.FC<{
  intensity?: number;
  onPulseTrigger?: () => void;
}> = ({ intensity = 1.0, onPulseTrigger }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const pulseRingsRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  const [shockwaveRadius, setShockwaveRadius] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);

  const { nodesLeft, nodesRight, connections } = useMemo(() => generateBrainCircuitData(), []);

  // Connection Lines Buffer Geometry
  const linesGeometry = useMemo(() => {
    const positions: number[] = [];
    connections.forEach(([start, end]) => {
      positions.push(start.x, start.y, start.z);
      positions.push(end.x, end.y, end.z);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [connections]);

  // Action Potential Pulses Traveling along lines
  const pulseParticles = useMemo(() => {
    const count = 30;
    const paths = connections.map(([start, end]) => ({
      start,
      end,
      t: Math.random(),
      speed: 0.005 + Math.random() * 0.008,
      isLeft: start.x < 0,
    }));
    return { count, paths };
  }, [connections]);

  const pulsePositions = useMemo(() => new Float32Array(pulseParticles.paths.length * 3), [pulseParticles]);
  const pulseColors = useMemo(() => new Float32Array(pulseParticles.paths.length * 3), [pulseParticles]);
  const pulseGeoRef = useRef<THREE.BufferGeometry>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Smooth 3D parallax tilt towards pointer
      const targetRotY = (mouse.x * viewport.width * 0.08);
      const targetRotX = (-mouse.y * viewport.height * 0.06);
      
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
      // Gentle breathing float
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.08;
    }

    // Central Core Glow Breathing
    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 3) * 0.15 + (isPulsing ? 0.4 : 0);
      coreRef.current.scale.set(scale, scale, scale);
    }

    // Shockwave expansion animation
    if (isPulsing && pulseRingsRef.current) {
      setShockwaveRadius((r) => {
        const next = r + 0.08;
        if (next > 4) {
          setIsPulsing(false);
          return 0;
        }
        return next;
      });
      pulseRingsRef.current.scale.set(shockwaveRadius, shockwaveRadius, 1);
    }

    // Update Action Potential Pulses
    if (pulseGeoRef.current) {
      const posAttr = pulseGeoRef.current.attributes.position as THREE.BufferAttribute;
      const colAttr = pulseGeoRef.current.attributes.color as THREE.BufferAttribute;

      pulseParticles.paths.forEach((p, i) => {
        p.t = (p.t + p.speed * intensity) % 1;
        const curX = THREE.MathUtils.lerp(p.start.x, p.end.x, p.t);
        const curY = THREE.MathUtils.lerp(p.start.y, p.end.y, p.t);
        const curZ = THREE.MathUtils.lerp(p.start.z, p.end.z, p.t) + 0.02;

        posAttr.setXYZ(i, curX, curY, curZ);

        // Pink/Magenta on left, Cyan/Blue on right
        if (p.isLeft) {
          colAttr.setXYZ(i, 0.95, 0.25, 0.65); // Hot pink
        } else {
          colAttr.setXYZ(i, 0.05, 0.75, 0.95); // Electric cyan
        }
      });
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    sounds.playNeuralPulse();
    setIsPulsing(true);
    setShockwaveRadius(0.1);
    if (onPulseTrigger) onPulseTrigger();
  };

  return (
    <group ref={groupRef} onClick={handleClick}>
      {/* 1. Synaptic Circuit Connection Lines */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.35 * intensity}
          linewidth={1.5}
        />
      </lineSegments>

      {/* 2. Left Hemisphere Nodes (Pink / Violet Glow) */}
      {nodesLeft.map((pos, idx) => (
        <group key={`left-node-${idx}`} position={[pos.x, pos.y, pos.z]}>
          {/* Inner Node Sphere */}
          <mesh>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#f43f5e" />
          </mesh>
          {/* Outer Halo Glow */}
          <mesh>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshBasicMaterial color="#ec4899" transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      {/* 3. Right Hemisphere Nodes (Cyan / Electric Blue Glow) */}
      {nodesRight.map((pos, idx) => (
        <group key={`right-node-${idx}`} position={[pos.x, pos.y, pos.z]}>
          {/* Inner Node Sphere */}
          <mesh>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#06b6d4" />
          </mesh>
          {/* Outer Halo Glow */}
          <mesh>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      {/* 4. Action Potential Signal Pulses */}
      <points>
        <bufferGeometry ref={pulseGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            count={pulsePositions.length / 3}
            array={pulsePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={pulseColors.length / 3}
            array={pulseColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          vertexColors
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 5. Central Radiant Singularity Core */}
      <group position={[0, 0, 0.25]}>
        {/* Intense Center White Point */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Radiating Violet Aura */}
        <mesh>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.45} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* Horizontal Laser Core Beam */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 1.2, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
        {/* Vertical Sulcus Divider Beam */}
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, 3.8, 16]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* 6. Click Shockwave Ring */}
      {isPulsing && (
        <mesh ref={pulseRingsRef} position={[0, 0, 0.1]}>
          <ringGeometry args={[0.85, 0.95, 64]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={Math.max(0, 1 - shockwaveRadius / 4)}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
};

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
    <div className={`relative w-full h-full min-h-[380px] sm:min-h-[480px] flex items-center justify-center ${className}`}>
      {/* Background Radial Glow Backdrop */}
      <div className="absolute inset-0 bg-radial-gradient from-purple-900/20 via-cyan-900/10 to-transparent pointer-events-none blur-2xl" />

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 3]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[-3, 2, 2]} intensity={1.0} color="#ec4899" />
        <pointLight position={[3, -2, 2]} intensity={1.0} color="#06b6d4" />

        <InteractiveBrainMesh intensity={intensity} />
      </Canvas>
    </div>
  );
};
