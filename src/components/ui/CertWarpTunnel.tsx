import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Award, ArrowRight, X } from 'lucide-react';
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

  // Multicolored light streak pulses moving along the golden mesh lines (from inside to outside)
  const pulseColors = useMemo(
    () => ['#00F0FF', '#FF007F', '#9D4EDD', '#FFD700', '#00FF66', '#FF5400', '#E024C3', '#FFFFFF'],
    []
  );

  // Pre-generate animated light pulses that ride along the longitudinal mesh stringers
  const pulses = useMemo(() => {
    const list = [];
    for (let i = 0; i < 40; i++) {
      list.push({
        stringerIndex: Math.floor(Math.random() * 24),
        speed: 0.35 + Math.random() * 0.45,
        offset: Math.random(),
        length: 0.15 + Math.random() * 0.2,
        color: pulseColors[i % pulseColors.length],
        width: 1.8 + Math.random() * 1.5,
      });
    }
    return list;
  }, [pulseColors]);

  // Mouse wheel: Prevent page scrolling when inside tunnel area, scroll tunnel instead
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheelHandler = (e: WheelEvent) => {
      e.preventDefault(); // Stop outer page scroll while pointer is over tunnel
      e.stopPropagation();
      const delta = e.deltaY * 0.0035;
      targetZRef.current += delta;
    };

    container.addEventListener('wheel', onWheelHandler, { passive: false });
    return () => {
      container.removeEventListener('wheel', onWheelHandler);
    };
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

  // Wall panel clickable hit detection polygon areas
  const hitPolygonsRef = useRef<
    Array<{
      id: string;
      pts: Array<[number, number]>;
    }>
  >([]);

  // Point in polygon test for perspective trapezoid clicks
  const isPointInPoly = (px: number, py: number, poly: Array<[number, number]>) => {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i][0], yi = poly[i][1];
      const xj = poly[j][0], yj = poly[j][1];
      const intersect = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (inspectedCert) {
      setInspectedCert(null);
      return;
    }

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const hit = hitPolygonsRef.current.find((h) => isPointInPoly(clickX, clickY, h.pts));

    if (hit) {
      const clickedCert = certs.find((c) => c.id === hit.id);
      if (clickedCert) {
        setInspectedCert(clickedCert);
      }
    }
  };

  // Main 3D Golden Mesh Tunnel Rendering Loop
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

      // 3x Cruise Speed: pauses when hovered or inspecting
      if (!isHovered && !inspectedCert && certs.length > 0) {
        targetZRef.current += 0.012;
      }

      // Smooth camera interpolation
      cameraZRef.current += (targetZRef.current - cameraZRef.current) * 0.08;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
      time += 0.015;

      // Vanishing center point with parallax
      const vanishX = cx + mouseRef.current.x * 90;
      const vanishY = cy + mouseRef.current.y * 60;

      // 1. Deep Cosmic Void Background
      ctx.fillStyle = '#060402';
      ctx.fillRect(0, 0, width, height);

      // 2. BRIGHT WHITE/GOLD LIGHT AT THE END OF THE TUNNEL (Replacing dark spot)
      const lightGrad = ctx.createRadialGradient(vanishX, vanishY, 0, vanishX, vanishY, 140);
      lightGrad.addColorStop(0, '#FFFFFF'); // Pure bright white core
      lightGrad.addColorStop(0.18, 'rgba(255, 245, 210, 0.95)');
      lightGrad.addColorStop(0.38, 'rgba(230, 185, 75, 0.65)'); // Warm radiant gold aura
      lightGrad.addColorStop(0.65, 'rgba(180, 125, 30, 0.25)');
      lightGrad.addColorStop(1, 'rgba(6, 4, 2, 0)');
      ctx.fillStyle = lightGrad;
      ctx.beginPath();
      ctx.arc(vanishX, vanishY, 140, 0, Math.PI * 2);
      ctx.fill();

      // 3. DRAW STRONGER, DARKER/RICHER GOLDEN WIREFRAME SQUIRCLE RINGS
      const numRings = 24;
      const camZ = cameraZRef.current;
      const ringsData: Array<{ rx: number; ry: number; zDist: number; persp: number; alpha: number }> = [];

      for (let r = 0; r < numRings; r++) {
        const ringProg = ((r / numRings - (camZ * 0.3) % (1 / numRings)) % 1 + 1) % 1;
        const zDist = ringProg * 7.5 + 0.15;
        const persp = 1.3 / zDist;

        // Squircle dimensions in screen space
        const rx = (width * 0.54) * persp;
        const ry = (height * 0.60) * persp;

        // Rich high-contrast lines: foreground is crisp gold, deep background has rich amber
        const depthFade = Math.sin(ringProg * Math.PI);
        const alpha = Math.min(1, Math.max(0.15, depthFade * 0.95));

        ringsData.push({ rx, ry, zDist, persp, alpha });

        if (rx > 5 && ry > 3) {
          ctx.beginPath();
          // Darker, richer high-contrast golden frame lines
          ctx.strokeStyle = `rgba(218, 165, 32, ${alpha * 0.9})`;
          ctx.lineWidth = Math.max(1.1, 2.4 * persp);
          ctx.roundRect(vanishX - rx, vanishY - ry, rx * 2, ry * 2, ry * 0.42);
          ctx.stroke();
        }
      }

      // 4. DRAW STRONGER LONGITUDINAL GOLDEN STRINGERS
      const numStringers = 24;
      const stringerPaths: Array<Array<[number, number]>> = [];

      for (let s = 0; s < numStringers; s++) {
        const angle = (s / numStringers) * Math.PI * 2;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const signCos = Math.sign(cosA);
        const signSin = Math.sign(sinA);
        const pxNorm = signCos * Math.pow(Math.abs(cosA), 0.75);
        const pyNorm = signSin * Math.pow(Math.abs(sinA), 0.75);

        ctx.beginPath();
        let started = false;
        const currentPathPts: Array<[number, number]> = [];

        for (let i = 0; i < ringsData.length; i++) {
          const r = ringsData[i];
          if (r.rx <= 5) continue;

          const sx = vanishX + pxNorm * r.rx;
          const sy = vanishY + pyNorm * r.ry;
          currentPathPts.push([sx, sy]);

          if (!started) {
            ctx.moveTo(sx, sy);
            started = true;
          } else {
            ctx.lineTo(sx, sy);
          }
        }

        stringerPaths.push(currentPathPts);

        // Darker, more prominent golden longitudinal lines
        ctx.strokeStyle = 'rgba(200, 145, 30, 0.65)';
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // 5. MULTICOLORED LIGHT PULSES FLOWING ALONG THE LINES (Inside to Outside)
      pulses.forEach((p) => {
        const sPath = stringerPaths[p.stringerIndex];
        if (!sPath || sPath.length < 2) return;

        // Progress from inside (center index 0) to outside (perimeter index end)
        const pulseProg = (p.offset + time * p.speed + camZ * 0.15) % 1;
        const startIdx = Math.floor(pulseProg * (sPath.length - 1));
        const endIdx = Math.min(sPath.length - 1, startIdx + Math.floor(p.length * sPath.length));

        if (startIdx < sPath.length && endIdx > startIdx) {
          ctx.beginPath();
          ctx.moveTo(sPath[startIdx][0], sPath[startIdx][1]);
          for (let k = startIdx + 1; k <= endIdx; k++) {
            ctx.lineTo(sPath[k][0], sPath[k][1]);
          }

          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.width * (0.8 + pulseProg * 1.8);
          ctx.lineCap = 'round';
          ctx.globalAlpha = Math.sin(pulseProg * Math.PI) * 0.9;
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }
      });

      // Clear polygon click areas for this frame
      hitPolygonsRef.current = [];

      // 6. DRAW CERTIFICATES DIRECTLY AFFIXED FLUSH TO WALLS (Facing inward across tunnel)
      if (certs.length > 0) {
        const panelZSpacing = 1.8;
        const visibleRange = 7;

        for (let i = -1; i < visibleRange; i++) {
          const absoluteIndex = Math.floor(camZ) + i;
          const certIndex = ((absoluteIndex % certs.length) + certs.length) % certs.length;
          const cert = certs[certIndex];
          if (!cert) continue;

          // Near and far Z edges for authentic wall perspective trapezoid
          const nearZ = (absoluteIndex - camZ) * panelZSpacing + 1.2;
          const farZ = nearZ + 1.35; // Length along wall into distance

          if (nearZ <= 0.45 || farZ >= 8.2) continue;

          const nearPersp = 1.3 / nearZ;
          const farPersp = 1.3 / farZ;
          const alpha = Math.min(1, Math.max(0, 1 - (nearZ - 1.2) / 6.5));

          // Alternating side: even on Left wall (facing Right), odd on Right wall (facing Left)
          const isLeft = absoluteIndex % 2 === 0;

          // MUCH LARGER: Occupies 5–6 rows in height for prominent wall art visibility
          const nearWallX = (width * 0.52) * nearPersp;
          const farWallX = (width * 0.52) * farPersp;

          const nearH = (height * 0.62) * nearPersp; // Large 5-6 row height
          const farH = (height * 0.62) * farPersp;

          let p1: [number, number], p2: [number, number], p3: [number, number], p4: [number, number];

          if (isLeft) {
            // LEFT WALL: Surface strictly flush with wall, facing inward towards right wall
            // Near edge is wider, far edge tapers back towards center vanishing point
            p1 = [vanishX - nearWallX, vanishY - nearH / 2]; // Top-Near
            p2 = [vanishX - farWallX, vanishY - farH / 2];   // Top-Far
            p3 = [vanishX - farWallX, vanishY + farH / 2];   // Bottom-Far
            p4 = [vanishX - nearWallX, vanishY + nearH / 2]; // Bottom-Near
          } else {
            // RIGHT WALL: Surface strictly flush with wall, facing inward towards left wall
            p1 = [vanishX + farWallX, vanishY - farH / 2];   // Top-Far
            p2 = [vanishX + nearWallX, vanishY - nearH / 2]; // Top-Near
            p3 = [vanishX + nearWallX, vanishY + nearH / 2]; // Bottom-Near
            p4 = [vanishX + farWallX, vanishY + farH / 2];   // Bottom-Far
          }

          // Register trapezoid hit polygon for click
          hitPolygonsRef.current.push({
            id: cert.id,
            pts: [p1, p2, p3, p4],
          });

          ctx.save();
          ctx.globalAlpha = alpha;

          // Clip to perspective wall trapezoid
          ctx.beginPath();
          ctx.moveTo(p1[0], p1[1]);
          ctx.lineTo(p2[0], p2[1]);
          ctx.lineTo(p3[0], p3[1]);
          ctx.lineTo(p4[0], p4[1]);
          ctx.closePath();

          // Dark wall backing
          ctx.fillStyle = '#080502';
          ctx.fill();

          // Draw certificate image clipped to perspective wall plane (NO FOOTER TEXT)
          const certImg = loadedImagesRef.current[cert.id];
          if (certImg) {
            ctx.save();
            ctx.clip();

            // Perspective slice-mapping across vertical strips to simulate 3D slant
            const slices = 20;
            const xLeft = Math.min(p1[0], p2[0]);
            const xRight = Math.max(p1[0], p2[0]);
            const totalW = Math.max(1, xRight - xLeft);

            for (let s = 0; s < slices; s++) {
              const u1 = s / slices;
              const u2 = (s + 1) / slices;

              // Linear interpolation between near and far edges
              const t1 = isLeft ? u1 : 1 - u1;
              const t2 = isLeft ? u2 : 1 - u2;

              const sx = xLeft + u1 * totalW;
              const sw = totalW / slices + 1;

              const topY = p1[1] + (p2[1] - p1[1]) * u1;
              const botY = p4[1] + (p3[1] - p4[1]) * u1;
              const sh = Math.max(1, botY - topY);

              const srcX = u1 * certImg.width;
              const srcW = (certImg.width / slices);

              ctx.drawImage(certImg, srcX, 0, srcW, certImg.height, sx, topY, sw, sh);
            }

            ctx.restore();
          } else {
            // Placeholder text if caching
            ctx.fillStyle = '#D4AF37';
            ctx.font = `bold ${Math.max(12, Math.round(16 * nearPersp))}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText(cert.issuer, (p1[0] + p2[0]) / 2, (p1[1] + p4[1]) / 2);
          }

          // Golden Frame Bevel directly surrounding the wall painting
          ctx.beginPath();
          ctx.moveTo(p1[0], p1[1]);
          ctx.lineTo(p2[0], p2[1]);
          ctx.lineTo(p3[0], p3[1]);
          ctx.lineTo(p4[0], p4[1]);
          ctx.closePath();

          ctx.strokeStyle = '#D4AF37';
          ctx.lineWidth = Math.max(1.5, 3.2 * nearPersp);
          ctx.stroke();

          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [certs, inspectedCert, isHovered, pulses]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseRef.current.targetX = 0;
        mouseRef.current.targetY = 0;
      }}
      className="relative w-full h-[580px] sm:h-[640px] rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_60px_rgba(212,175,55,0.2)] bg-[#030201] select-none"
    >
      {/* 3D Golden Perspective Mesh Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 w-full h-full block cursor-pointer"
        title="Hover to pause • Scroll to cruise through tunnel • Click any wall certificate to inspect"
      />

      {/* Floating Center Certificate Screen when clicked (Pauses tunnel motion) */}
      {inspectedCert && (
        <div
          onClick={() => setInspectedCert(null)}
          className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-8 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-[#0E0A04]/95 backdrop-blur-2xl rounded-2xl border-2 border-[#D4AF37]/70 p-6 sm:p-7 shadow-[0_0_60px_rgba(212,175,55,0.45)] pointer-events-auto"
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
              <span className="px-2.5 py-0.5 rounded-md bg-[#D4AF37]/20 text-[#E8D296] border border-[#D4AF37]/50 font-semibold text-[11px]">
                {inspectedCert.issuer}
              </span>
              <span className="text-slate-400">{inspectedCert.year}</span>
            </div>

            {/* Title & Scope */}
            <h4 className="font-display font-bold text-xl sm:text-2xl text-white pr-8">
              {inspectedCert.title}
            </h4>
            {inspectedCert.credentialNote && (
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mt-2">
                {inspectedCert.credentialNote}
              </p>
            )}

            {/* Certificate Preview Image */}
            <div className="mt-4 relative rounded-xl overflow-hidden border border-[#D4AF37]/40 bg-[#050401] flex items-center justify-center p-2 min-h-[190px]">
              {inspectedCert.fileUrl ? (
                <img
                  src={`${import.meta.env.BASE_URL}${inspectedCert.fileUrl.replace(/^\//, '')}`}
                  alt={inspectedCert.title}
                  className="max-h-[300px] sm:max-h-[340px] w-auto max-w-full object-contain rounded-lg"
                />
              ) : (
                <div className="p-4 text-center">
                  <Award className="w-9 h-9 text-[#D4AF37] mx-auto mb-1 opacity-80" />
                  <span className="font-mono text-xs text-slate-400">Authenticated Credential</span>
                </div>
              )}
            </div>

            {/* Skills Badges */}
            <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center gap-1.5 flex-wrap">
              {inspectedCert.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1A1408] text-[#E8D296] border border-[#D4AF37]/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
