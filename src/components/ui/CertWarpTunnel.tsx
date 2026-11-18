import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Award, ArrowRight, Eye, X } from 'lucide-react';
import { Certification } from '../../data/certifications';

interface CertWarpTunnelProps {
  certs: Certification[];
  onOpenFullModal: (cert: Certification) => void;
}

export const CertWarpTunnel: React.FC<CertWarpTunnelProps> = ({ certs, onOpenFullModal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Inspected certificate modal view (when clicked on any wall-mounted certificate)
  const [inspectedCert, setInspectedCert] = useState<Certification | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Position along tunnel Z space
  const cameraZRef = useRef(0);
  const targetZRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Pre-load certificate images into memory for rendering flush on the walls
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

  // Mouse wheel scroll moves forward or backward through the tunnel
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
    mouseRef.current.targetX = x * 0.35;
    mouseRef.current.targetY = y * 0.25;
  }, []);

  // Wall panel clickable hit detection
  const hitAreasRef = useRef<Array<{ id: string; x1: number; y1: number; x2: number; y2: number }>>([]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (inspectedCert) {
      setInspectedCert(null);
      return;
    }

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

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

  // Main 3D Golden Mesh Tunnel Rendering Loop (Exact Jeremiah Image 4 style)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 960);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 600);
      const cx = width / 2;
      const cy = height / 2;

      // 3X FASTER AUTO-CRUISE SPEED (0.004 -> 0.012 units/frame)
      // Pauses when hovered or when inspecting a certificate
      if (!isHovered && !inspectedCert && certs.length > 0) {
        targetZRef.current += 0.012; // 3x faster cruise speed
      }

      // Smooth camera interpolation
      cameraZRef.current += (targetZRef.current - cameraZRef.current) * 0.08;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Vanishing point with parallax
      const vanishX = cx + mouseRef.current.x * 90;
      const vanishY = cy + mouseRef.current.y * 60;

      // 1. Deep Cosmic Void Background
      ctx.fillStyle = '#050402';
      ctx.fillRect(0, 0, width, height);

      // Subtle warm vignette
      const bgGrad = ctx.createRadialGradient(vanishX, vanishY, 20, cx, cy, Math.max(width, height) * 0.75);
      bgGrad.addColorStop(0, '#120E05');
      bgGrad.addColorStop(0.5, '#080602');
      bgGrad.addColorStop(1, '#020101');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. DRAW GOLDEN WIREFRAME SQUIRCLE MESH (Image 4 from Jeremiah)
      const numRings = 22; // Tunnel depth rings
      const ringDepthSpacing = 0.28;
      const camZ = cameraZRef.current;

      // Calculate squircle radii for each depth level
      const ringsData: Array<{ rx: number; ry: number; zDist: number; alpha: number }> = [];

      for (let r = 0; r < numRings; r++) {
        // Continuous looping ring progress
        const ringProg = ((r / numRings - (camZ * 0.3) % (1 / numRings)) % 1 + 1) % 1;
        const zDist = ringProg * 7.0 + 0.15; // Distance from camera
        const persp = 1.3 / zDist;

        // Squircle dimensions in screen space
        const rx = (width * 0.52) * persp;
        const ry = (height * 0.58) * persp;

        // Darker lines towards the background, bright golden lines in foreground
        const depthFade = Math.sin(ringProg * Math.PI);
        const alpha = Math.min(1, Math.max(0.08, depthFade * 0.85));

        ringsData.push({ rx, ry, zDist, alpha });

        // Draw cross-sectional squircle ring
        if (rx > 6 && ry > 4) {
          ctx.beginPath();
          // Warm Golden Wireframe Color: #C89B3C with darker falloff in distance
          ctx.strokeStyle = `rgba(200, 155, 60, ${alpha * 0.75})`;
          ctx.lineWidth = Math.max(0.8, 1.8 * persp);
          ctx.roundRect(vanishX - rx, vanishY - ry, rx * 2, ry * 2, ry * 0.45);
          ctx.stroke();
        }
      }

      // 3. DRAW LONGITUDINAL GOLDEN STRINGERS (Connecting lines along tunnel length)
      const numStringers = 24; // Stringers running around the tunnel squircle perimeter
      ctx.lineWidth = 1.0;

      for (let s = 0; s < numStringers; s++) {
        const angle = (s / numStringers) * Math.PI * 2;
        // Squircle parametric curve: cos^4(a), sin^4(a)
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const signCos = Math.sign(cosA);
        const signSin = Math.sign(sinA);
        const pxNorm = signCos * Math.pow(Math.abs(cosA), 0.75);
        const pyNorm = signSin * Math.pow(Math.abs(sinA), 0.75);

        ctx.beginPath();
        let started = false;

        for (let i = 0; i < ringsData.length; i++) {
          const r = ringsData[i];
          if (r.rx <= 6) continue;

          const sx = vanishX + pxNorm * r.rx;
          const sy = vanishY + pyNorm * r.ry;

          if (!started) {
            ctx.moveTo(sx, sy);
            started = true;
          } else {
            ctx.lineTo(sx, sy);
          }
        }

        // Dark golden longitudinal lines
        ctx.strokeStyle = 'rgba(180, 135, 45, 0.45)';
        ctx.stroke();
      }

      // 4. CEILING STRIP LIGHT & AMBIENT GLOW
      const ceilingGrad = ctx.createLinearGradient(vanishX, 0, vanishX, vanishY);
      ceilingGrad.addColorStop(0, 'rgba(212, 175, 55, 0.12)');
      ceilingGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ceilingGrad;
      ctx.fillRect(0, 0, width, vanishY);

      // Clear hit areas for this frame
      hitAreasRef.current = [];

      // 5. DRAW CERTIFICATES AFFIXED FLUSH ON THE WALLS (Image 4 exact layout)
      if (certs.length > 0) {
        const panelZSpacing = 1.6; // Spacing along tunnel depth
        const visibleRange = 7;

        for (let i = -1; i < visibleRange; i++) {
          const absoluteIndex = Math.floor(camZ) + i;
          const certIndex = ((absoluteIndex % certs.length) + certs.length) % certs.length;
          const cert = certs[certIndex];
          if (!cert) continue;

          // Depth from camera
          const depthZ = (absoluteIndex - camZ) * panelZSpacing + 1.4;
          if (depthZ <= 0.45 || depthZ >= 7.8) continue;

          const persp = 1.3 / depthZ;
          const alpha = Math.min(1, Math.max(0, 1 - (depthZ - 1.2) / 6.2));

          // Alternating walls: even index on Left wall, odd on Right wall
          const isLeft = absoluteIndex % 2 === 0;

          // Certificate wall panel dimensions in 3D projection
          const pWidth = 270 * persp;
          const pHeight = 168 * persp;

          // Mount directly on tunnel wall
          const wallSpread = (width * 0.40) * persp;
          const posX = isLeft ? vanishX - wallSpread - pWidth : vanishX + wallSpread;
          const posY = vanishY - pHeight / 2;

          // Store clickable area
          hitAreasRef.current.push({
            id: cert.id,
            x1: posX,
            y1: posY,
            x2: posX + pWidth,
            y2: posY + pHeight,
          });

          ctx.save();
          ctx.globalAlpha = alpha;

          // Certificate Wall Plaque with Golden Rim (Matching Jeremiah Image 4)
          ctx.fillStyle = '#0B0803';
          ctx.strokeStyle = '#D4AF37'; // Warm metallic gold border
          ctx.lineWidth = Math.max(1, 2.5 * persp);

          // Render Wall-Mounted Plaque
          ctx.beginPath();
          ctx.roundRect(posX, posY, pWidth, pHeight, 6 * persp);
          ctx.fill();
          ctx.stroke();

          // Render actual certificate image directly on the wall
          const certImg = loadedImagesRef.current[cert.id];
          if (certImg) {
            ctx.drawImage(certImg, posX + 2, posY + 2, pWidth - 4, pHeight - 28 * persp);
          } else {
            ctx.fillStyle = '#C89B3C';
            ctx.font = `bold ${Math.max(10, Math.round(12 * persp))}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText(cert.issuer, posX + pWidth / 2, posY + pHeight / 2 - 5);
          }

          // Bottom label bar on wall panel
          ctx.fillStyle = '#060401';
          ctx.fillRect(posX + 1, posY + pHeight - 26 * persp, pWidth - 2, 25 * persp);

          ctx.fillStyle = '#E8D296';
          ctx.font = `600 ${Math.max(8, Math.round(10 * persp))}px sans-serif`;
          ctx.textAlign = 'center';
          const truncatedTitle = cert.title.length > 26 ? `${cert.title.substring(0, 24)}...` : cert.title;
          ctx.fillText(truncatedTitle, posX + pWidth / 2, posY + pHeight - 10 * persp);

          ctx.restore();
        }
      }

      // 6. Vanishing Point Depth Void
      const voidGrad = ctx.createRadialGradient(vanishX, vanishY, 0, vanishX, vanishY, 50);
      voidGrad.addColorStop(0, '#000000');
      voidGrad.addColorStop(0.7, '#020101');
      voidGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = voidGrad;
      ctx.beginPath();
      ctx.arc(vanishX, vanishY, 50, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [certs, inspectedCert, isHovered]);

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
      className="relative w-full h-[580px] sm:h-[620px] rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.15)] bg-[#030201] select-none"
    >
      {/* Golden Mesh Perspective Tunnel Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 w-full h-full block cursor-pointer"
        title="Scroll wheel to navigate • Click any certificate to inspect"
      />

      {/* Floating Center Certificate Screen when clicked (Pauses tunnel motion) */}
      {inspectedCert && (
        <div
          onClick={() => setInspectedCert(null)}
          className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-8 bg-black/65 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#0D0A05]/95 backdrop-blur-2xl rounded-2xl border-2 border-[#D4AF37]/60 p-6 shadow-[0_0_50px_rgba(212,175,55,0.35)] pointer-events-auto"
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
              <span className="px-2.5 py-0.5 rounded-md bg-[#D4AF37]/20 text-[#E8D296] border border-[#D4AF37]/40 font-semibold text-[11px]">
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
            <div className="mt-4 relative rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#050401] flex items-center justify-center p-2 min-h-[170px]">
              {inspectedCert.fileUrl ? (
                <img
                  src={`${import.meta.env.BASE_URL}${inspectedCert.fileUrl.replace(/^\//, '')}`}
                  alt={inspectedCert.title}
                  className="max-h-[220px] w-auto max-w-full object-contain rounded-lg"
                />
              ) : (
                <div className="p-4 text-center">
                  <Award className="w-8 h-8 text-[#D4AF37] mx-auto mb-1 opacity-70" />
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
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1A1408] text-[#E8D296] border border-[#D4AF37]/20"
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F39C12] text-[#0A0701] font-mono text-xs font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all cursor-pointer hover:scale-105 active:scale-95"
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
