import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Award, ArrowRight, Eye, X } from 'lucide-react';
import { Certification } from '../../data/certifications';

interface CertWarpTunnelProps {
  certs: Certification[];
  onOpenFullModal: (cert: Certification) => void;
}

export const CertWarpTunnel: React.FC<CertWarpTunnelProps> = ({ certs, onOpenFullModal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Focused certificate inspecting state (when user clicks any wall-mounted certificate)
  const [inspectedCert, setInspectedCert] = useState<Certification | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Position along the infinite tunnel in units of certificate step
  const cameraZRef = useRef(0);
  const targetZRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Pre-load certificate images into memory so they render directly on 3D wall panels
  const loadedImagesRef = useRef<{ [key: string]: HTMLImageElement }>({});

  useEffect(() => {
    certs.forEach((cert) => {
      if (cert.fileUrl && !loadedImagesRef.current[cert.id]) {
        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}${cert.fileUrl.replace(/^\//, '')}`;
        img.onload = () => {
          loadedImagesRef.current[cert.id] = img;
        };
      }
    });
  }, [certs]);

  // Color palette matching Image 4 (fiber-optic warp streaks)
  const warpColors = useMemo(
    () => ['#FF007F', '#E024C3', '#9D4EDD', '#7B2CBF', '#00F0FF', '#80EEFF', '#FFFFFF', '#FF5400'],
    []
  );

  // Pre-generate speed warp streak lines
  const streaks = useMemo(() => {
    const list = [];
    const count = 150;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const radius = 0.55 + Math.random() * 0.45;
      const speed = 0.8 + Math.random() * 0.5;
      const color = warpColors[i % warpColors.length];
      const length = 0.25 + Math.random() * 0.35;
      const offset = Math.random();
      const width = 1.2 + Math.random() * 1.6;
      list.push({ angle, radius, speed, color, length, offset, width });
    }
    return list;
  }, [warpColors]);

  // Mouse wheel scroll moves forward or backward through tunnel
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * 0.0035;
    targetZRef.current += delta;
  }, []);

  // Mouse look-around parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseRef.current.targetX = x * 0.3;
    mouseRef.current.targetY = y * 0.25;
  }, []);

  // Wall panel interactive hit detection for clicking any certificate
  const hitAreasRef = useRef<Array<{ id: string; x1: number; y1: number; x2: number; y2: number }>>([]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // If inspecting, clicking outside card closes inspected view
    if (inspectedCert) {
      setInspectedCert(null);
      return;
    }

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check if clicked any wall panel
    const hit = hitAreasRef.current.find(
      (h) => clickX >= h.x1 && clickX <= h.x2 && clickY >= h.y1 && clickY <= h.y2
    );

    if (hit) {
      const clickedCert = certs.find((c) => c.id === hit.id);
      if (clickedCert) {
        setInspectedCert(clickedCert);
      }
    }
  };

  // Main 3D Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 960);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 600);
      const cx = width / 2;
      const cy = height / 2;

      // Auto-cruise: runs continuously when NOT hovered and NOT inspecting
      if (!isHovered && !inspectedCert && certs.length > 0) {
        targetZRef.current += 0.004; // Smooth, subtle minimal cruise speed
      }

      // Smooth camera interpolation
      cameraZRef.current += (targetZRef.current - cameraZRef.current) * 0.08;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      time += 0.015;

      // Vanishing point with parallax
      const vanishX = cx + mouseRef.current.x * 90;
      const vanishY = cy + mouseRef.current.y * 65;

      // 1. Draw Deep Cosmic Void Background
      const bgGrad = ctx.createRadialGradient(vanishX, vanishY, 20, cx, cy, Math.max(width, height) * 0.8);
      bgGrad.addColorStop(0, '#0C0620');
      bgGrad.addColorStop(0.5, '#050210');
      bgGrad.addColorStop(1, '#020108');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Speed Tunnel Wireframe Squircle Rings
      const ringCount = 14;
      for (let r = 0; r < ringCount; r++) {
        const ringProg = ((r / ringCount + (cameraZRef.current * 0.4) % (1 / ringCount)) % 1 + 1) % 1;
        const ringRadius = Math.pow(ringProg, 2.3) * Math.max(width, height) * 0.88;
        const alpha = Math.sin(ringProg * Math.PI) * 0.28;

        if (ringRadius > 8) {
          ctx.beginPath();
          ctx.strokeStyle = r % 2 === 0 ? `rgba(255, 0, 127, ${alpha})` : `rgba(0, 240, 255, ${alpha * 0.9})`;
          ctx.lineWidth = 1.2;
          const rx = ringRadius * 1.3;
          const ry = ringRadius * 0.85;
          ctx.roundRect(vanishX - rx, vanishY - ry, rx * 2, ry * 2, ringRadius * 0.35);
          ctx.stroke();
        }
      }

      // 3. Draw Hyper-Speed Warp Light Streaks (Image 4)
      streaks.forEach((s) => {
        const streakProg = (s.offset + (cameraZRef.current * 0.2) + (time * s.speed * 0.15)) % 1;
        const zStart = Math.pow(streakProg, 3);
        const zEnd = Math.pow(Math.min(1, streakProg + s.length * 0.4), 3);
        const maxDim = Math.max(width, height) * 1.1;

        const curAngle = s.angle + Math.sin(time * 0.3 + s.radius * 2) * 0.2 * streakProg;
        const x1 = vanishX + Math.cos(curAngle) * s.radius * maxDim * zStart;
        const y1 = vanishY + Math.sin(curAngle) * s.radius * maxDim * zStart * 0.7;
        const x2 = vanishX + Math.cos(curAngle) * s.radius * maxDim * zEnd;
        const y2 = vanishY + Math.sin(curAngle) * s.radius * maxDim * zEnd * 0.7;

        const alpha = Math.sin(streakProg * Math.PI) * 0.75;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = s.width * (0.8 + streakProg * 2.2);
        ctx.lineCap = 'round';
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });

      // Clear hit areas for current frame
      hitAreasRef.current = [];

      // 4. Draw Certificates DIRECTLY on the 3D Tunnel Walls in an Infinite Loop
      if (certs.length > 0) {
        const panelZSpacing = 1.2; // Spacing along tunnel depth
        const visibleRange = 7; // Number of panels rendered in view
        const currentCamZ = cameraZRef.current;

        // Iterate through relative indices to project wall panels
        for (let i = -1; i < visibleRange; i++) {
          const absoluteIndex = Math.floor(currentCamZ) + i;
          const certIndex = ((absoluteIndex % certs.length) + certs.length) % certs.length;
          const cert = certs[certIndex];
          if (!cert) continue;

          // Depth z distance from camera: 0 is at camera, higher is deeper into tunnel
          const depthZ = (absoluteIndex - currentCamZ) * panelZSpacing + 1.2;

          // Only render panels ahead of camera and within view frustum
          if (depthZ <= 0.4 || depthZ >= 7.5) continue;

          // Perspective scale factor
          const perspective = 1.3 / depthZ;
          const alpha = Math.min(1, Math.max(0, 1 - (depthZ - 1) / 6));

          // Alternating side: even on Left wall, odd on Right wall
          const isLeft = absoluteIndex % 2 === 0;

          // Wall panel dimensions in 3D projection
          const pWidth = 240 * perspective;
          const pHeight = 150 * perspective;

          // Offset to mount on left/right tunnel walls
          const wallSpread = (width * 0.42 + 40) * perspective;
          const posX = isLeft ? vanishX - wallSpread - pWidth / 2 : vanishX + wallSpread - pWidth / 2;
          const posY = vanishY - pHeight / 2 + Math.sin(time + absoluteIndex) * 8 * perspective;

          // Store clickable bounding box for inspection
          hitAreasRef.current.push({
            id: cert.id,
            x1: posX,
            y1: posY,
            x2: posX + pWidth,
            y2: posY + pHeight,
          });

          // Draw 3D Wall Panel Backing Plaque with perspective border
          ctx.save();
          ctx.globalAlpha = alpha;

          // Glowing border based on issuer category
          ctx.strokeStyle = isLeft ? '#00F0FF' : '#FF007F';
          ctx.lineWidth = 2 * perspective;
          ctx.fillStyle = '#080518';

          // Rounded plaque
          ctx.beginPath();
          ctx.roundRect(posX, posY, pWidth, pHeight, 10 * perspective);
          ctx.fill();
          ctx.stroke();

          // Render actual certificate document image on wall
          const certImg = loadedImagesRef.current[cert.id];
          if (certImg) {
            ctx.drawImage(certImg, posX + 4, posY + 4, pWidth - 8, pHeight - 28 * perspective);
          } else {
            // Placeholder text if image is caching
            ctx.fillStyle = '#FFFFFF';
            ctx.font = `bold ${Math.max(10, Math.round(12 * perspective))}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText(cert.issuer, posX + pWidth / 2, posY + pHeight / 2 - 5);
          }

          // Wall plaque footer bar with certificate title
          ctx.fillStyle = '#060312';
          ctx.fillRect(posX + 1, posY + pHeight - 26 * perspective, pWidth - 2, 25 * perspective);

          ctx.fillStyle = '#E2E8F0';
          ctx.font = `600 ${Math.max(8, Math.round(10 * perspective))}px sans-serif`;
          ctx.textAlign = 'center';
          const truncatedTitle = cert.title.length > 24 ? `${cert.title.substring(0, 22)}...` : cert.title;
          ctx.fillText(truncatedTitle, posX + pWidth / 2, posY + pHeight - 10 * perspective);

          // Subtle "Click to Inspect" hover glow prompt
          ctx.fillStyle = isLeft ? '#00F0FF' : '#FF007F';
          ctx.font = `bold ${Math.max(7, Math.round(8 * perspective))}px monospace`;
          ctx.fillText('CLICK TO VIEW', posX + pWidth / 2, posY + pHeight - 2 * perspective);

          ctx.restore();
        }
      }

      // 5. Central Light Portal Flare
      const flareGrad = ctx.createRadialGradient(vanishX, vanishY, 0, vanishX, vanishY, 65);
      flareGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      flareGrad.addColorStop(0.2, 'rgba(0, 240, 255, 0.5)');
      flareGrad.addColorStop(0.5, 'rgba(255, 0, 127, 0.25)');
      flareGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = flareGrad;
      ctx.beginPath();
      ctx.arc(vanishX, vanishY, 65, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [certs, inspectedCert, isHovered, streaks]);

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseRef.current.targetX = 0;
        mouseRef.current.targetY = 0;
      }}
      className="relative w-full h-[580px] sm:h-[620px] rounded-3xl overflow-hidden border border-[#00F0FF]/30 shadow-[0_0_50px_rgba(255,0,127,0.15)] bg-[#03010A] select-none"
    >
      {/* 3D Infinite Warp Tunnel Canvas with wall-mounted certificates */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 w-full h-full block cursor-pointer"
        title="Scroll wheel to move • Click any certificate wall panel to inspect"
      />

      {/* Floating Center Certificate Screen when clicked (Pauses tunnel motion) */}
      {inspectedCert && (
        <div
          onClick={() => setInspectedCert(null)}
          className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#090518]/95 backdrop-blur-2xl rounded-2xl border-2 border-[#00F0FF]/60 p-6 shadow-[0_0_50px_rgba(0,240,255,0.4)] pointer-events-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setInspectedCert(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close and return to tunnel"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Issuer + Year Header */}
            <div className="flex items-center gap-3 font-mono text-xs mb-3">
              <span className="px-2.5 py-0.5 rounded-md bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 font-semibold text-[11px]">
                {inspectedCert.issuer}
              </span>
              <span className="text-slate-400">{inspectedCert.year}</span>
            </div>

            {/* Title & Scope */}
            <h4 className="font-display font-bold text-xl text-white pr-8">
              {inspectedCert.title}
            </h4>
            {inspectedCert.credentialNote && (
              <p className="text-xs text-slate-300 font-sans leading-relaxed mt-1.5">
                {inspectedCert.credentialNote}
              </p>
            )}

            {/* Certificate Preview Image */}
            <div className="mt-4 relative rounded-xl overflow-hidden border border-white/20 bg-[#05020F] flex items-center justify-center p-2 min-h-[170px]">
              {inspectedCert.fileUrl ? (
                <img
                  src={`${import.meta.env.BASE_URL}${inspectedCert.fileUrl.replace(/^\//, '')}`}
                  alt={inspectedCert.title}
                  className="max-h-[220px] w-auto max-w-full object-contain rounded-lg"
                />
              ) : (
                <div className="p-4 text-center">
                  <Award className="w-8 h-8 text-[#00F0FF] mx-auto mb-1 opacity-70" />
                  <span className="font-mono text-xs text-slate-400">Authenticated Credential</span>
                </div>
              )}
            </div>

            {/* Skills & Action CTAs */}
            <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                {inspectedCert.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#130B2E] text-slate-300 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Open Official Verified Modal Record */}
              <button
                onClick={() => {
                  onOpenFullModal(inspectedCert);
                  setInspectedCert(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#FF007F] text-[#0A0518] font-mono text-xs font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(255,0,127,0.5)] transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>View Full Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
