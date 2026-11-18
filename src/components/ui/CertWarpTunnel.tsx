import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { Award, ArrowRight, Eye, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Certification } from '../../data/certifications';

interface CertWarpTunnelProps {
  certs: Certification[];
  onSelectCert: (cert: Certification) => void;
}

export const CertWarpTunnel: React.FC<CertWarpTunnelProps> = ({ certs, onSelectCert }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Warp camera progress along tunnel (0 to certs.length - 1)
  const scrollPosRef = useRef(0);
  const targetScrollPosRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Neon palette matching Image 4
  const colors = useMemo(
    () => [
      '#FF007F', // Neon Magenta
      '#E024C3', // Hot Pink
      '#9D4EDD', // Electric Purple
      '#7B2CBF', // Deep Violet
      '#00F0FF', // Electric Cyan
      '#80EEFF', // Light Neon Blue
      '#FFFFFF', // Bright White streak
      '#FF5400', // Neon Orange streak
    ],
    []
  );

  // Pre-generate fiber-optic streak curves
  const streaks = useMemo(() => {
    const numStreaks = 180;
    const items = [];
    for (let i = 0; i < numStreaks; i++) {
      const angle = (i / numStreaks) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
      const radius = 0.55 + Math.random() * 0.45; // Normalised radius from center
      const speed = 0.8 + Math.random() * 0.6;
      const color = colors[i % colors.length];
      const length = 0.2 + Math.random() * 0.4;
      const offset = Math.random();
      const width = 1.2 + Math.random() * 1.8;
      items.push({ angle, radius, speed, color, length, offset, width });
    }
    return items;
  }, [colors]);

  // Handle Wheel Scroll inside tunnel
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.0025;
      targetScrollPosRef.current = Math.max(
        0,
        Math.min(certs.length - 1, targetScrollPosRef.current + delta)
      );
    },
    [certs.length]
  );

  // Handle Mouse movement for smooth pitch/yaw
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseRef.current.targetX = x * 0.35;
    mouseRef.current.targetY = y * 0.35;
  }, []);

  const jumpToCert = (index: number) => {
    targetScrollPosRef.current = Math.max(0, Math.min(certs.length - 1, index));
  };

  // Canvas 2.5D Warp Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 900);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 560);
      const cx = width / 2;
      const cy = height / 2;

      // Auto-cruise when enabled and not hovered
      if (isAutoScrolling && !isHovered && certs.length > 1) {
        targetScrollPosRef.current += 0.0035; // Minimal gentle cinematic cruise speed
        if (targetScrollPosRef.current >= certs.length) {
          targetScrollPosRef.current = 0;
          scrollPosRef.current = 0;
        }
      }

      // Smooth interpolation for scroll and mouse
      scrollPosRef.current += (targetScrollPosRef.current - scrollPosRef.current) * 0.08;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const currentIdx = Math.round(scrollPosRef.current) % certs.length;
      setActiveCertIndex(Math.max(0, Math.min(certs.length - 1, currentIdx)));

      time += 0.015;

      // 1. Cosmic Void Background with radial vignette
      const bgGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(width, height) * 0.75);
      bgGrad.addColorStop(0, '#0C0620');
      bgGrad.addColorStop(0.4, '#060312');
      bgGrad.addColorStop(1, '#020108');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Tunnel vanish center with mouse parallax
      const vanishX = cx + mouseRef.current.x * 90;
      const vanishY = cy + mouseRef.current.y * 70;

      // 2. Draw Speed Tunnel Concentric Squircle Rings
      const ringCount = 14;
      for (let r = 0; r < ringCount; r++) {
        const ringProgress = (r / ringCount + (time * 0.3) % (1 / ringCount)) % 1;
        const ringRadius = Math.pow(ringProgress, 2.2) * Math.max(width, height) * 0.85;
        const alpha = Math.sin(ringProgress * Math.PI) * 0.28;

        if (ringRadius > 8) {
          ctx.beginPath();
          ctx.strokeStyle = r % 2 === 0 ? `rgba(255, 0, 127, ${alpha})` : `rgba(0, 240, 255, ${alpha * 0.9})`;
          ctx.lineWidth = 1.2;

          // Squircle path approximation
          const rx = ringRadius * 1.25;
          const ry = ringRadius * 0.85;
          ctx.roundRect(vanishX - rx, vanishY - ry, rx * 2, ry * 2, ringRadius * 0.35);
          ctx.stroke();
        }
      }

      // 3. Draw Hyper-Speed Warp Light Streaks (Image 4 exact visual)
      streaks.forEach((s) => {
        // Z progress calculation
        const streakProg = (s.offset + time * s.speed * 0.4 + scrollPosRef.current * 0.15) % 1;
        const zStart = Math.pow(streakProg, 3);
        const zEnd = Math.pow(Math.min(1, streakProg + s.length * 0.45), 3);

        const maxDim = Math.max(width, height) * 1.1;

        // Curved swirl angle
        const curveOffset = Math.sin(time * 0.5 + s.radius * 3) * 0.25;
        const curAngle = s.angle + curveOffset * streakProg;

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

      // 4. Central Warp Portal Flare
      const flareGrad = ctx.createRadialGradient(vanishX, vanishY, 0, vanishX, vanishY, 70);
      flareGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      flareGrad.addColorStop(0.2, 'rgba(0, 240, 255, 0.6)');
      flareGrad.addColorStop(0.5, 'rgba(255, 0, 127, 0.3)');
      flareGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = flareGrad;
      ctx.beginPath();
      ctx.arc(vanishX, vanishY, 70, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [certs.length, colors, isAutoScrolling, isHovered, streaks]);

  const currentCert = certs[activeCertIndex] || certs[0];

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
      className="relative w-full h-[580px] sm:h-[620px] rounded-3xl overflow-hidden border border-[#00F0FF]/30 shadow-[0_0_50px_rgba(255,0,127,0.2)] bg-[#03010A] select-none"
    >
      {/* Background Interactive Warp Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Top HUD Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#0A061E]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
          <span className="font-mono text-xs uppercase text-slate-200 font-semibold tracking-wider">
            Warp Tunnel • {activeCertIndex + 1} of {certs.length}
          </span>
        </div>

        {/* Auto-scroll toggle pill */}
        <button
          onClick={() => setIsAutoScrolling((prev) => !prev)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A061E]/80 backdrop-blur-md border border-white/15 text-xs font-mono text-slate-300 hover:text-white hover:border-[#00F0FF]/50 transition-all cursor-pointer pointer-events-auto shadow-sm"
          title={isAutoScrolling ? 'Pause auto-cruise' : 'Resume auto-cruise'}
        >
          {isAutoScrolling ? (
            <>
              <Pause className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="text-[11px]">Cruising</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[#FF007F]" />
              <span className="text-[11px]">Paused</span>
            </>
          )}
        </button>
      </div>

      {/* Floating Center Certificate Screen Docked in Tunnel Wall */}
      {currentCert && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
          <div className="relative w-full max-w-xl bg-[#090518]/90 backdrop-blur-2xl rounded-2xl border-2 border-[#00F0FF]/40 p-5 sm:p-7 shadow-[0_0_40px_rgba(0,240,255,0.25)] pointer-events-auto transition-transform duration-300 transform hover:scale-[1.01]">
            
            {/* Top Bar: Issuer + Year + Category */}
            <div className="flex items-center justify-between gap-3 font-mono text-xs mb-3">
              <span className="px-2.5 py-0.5 rounded-md bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 font-semibold text-[11px]">
                {currentCert.issuer}
              </span>
              <span className="text-slate-400">{currentCert.year}</span>
            </div>

            {/* Title & Scope Note */}
            <h4 className="font-display font-bold text-xl sm:text-2xl text-white">
              {currentCert.title}
            </h4>
            {currentCert.credentialNote && (
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mt-2 line-clamp-2">
                {currentCert.credentialNote}
              </p>
            )}

            {/* Direct Certificate Image Preview Panel */}
            <div
              onClick={() => onSelectCert(currentCert)}
              className="mt-4 relative rounded-xl overflow-hidden border border-white/15 bg-[#05020F] flex items-center justify-center cursor-pointer group/img min-h-[140px] sm:min-h-[180px] shadow-inner"
            >
              {currentCert.fileUrl ? (
                <img
                  src={`${import.meta.env.BASE_URL}${currentCert.fileUrl.replace(/^\//, '')}`}
                  alt={currentCert.title}
                  className="max-h-[160px] sm:max-h-[200px] w-auto max-w-full object-contain transition-transform duration-500 group-hover/img:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="p-4 text-center">
                  <Award className="w-8 h-8 text-[#00F0FF] mx-auto mb-1 opacity-70" />
                  <span className="font-mono text-xs text-slate-400">Authenticated Credential</span>
                </div>
              )}

              {/* Overlay Prompt to Click */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center pb-3">
                <span className="font-mono text-xs font-semibold text-[#00F0FF] flex items-center gap-1.5">
                  <Eye className="w-4 h-4" /> Open Full Verified Credential
                </span>
              </div>
            </div>

            {/* Skills & Action Button */}
            <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                {currentCert.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#130B2E] text-slate-300 border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Directly Open Credential Modal */}
              <button
                onClick={() => onSelectCert(currentCert)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#FF007F] text-[#0A0518] font-mono text-xs font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(255,0,127,0.5)] transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation HUD Controls */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Previous Button */}
        <button
          onClick={() => jumpToCert(activeCertIndex - 1)}
          disabled={activeCertIndex <= 0}
          className="p-2.5 rounded-full bg-[#0A061E]/80 backdrop-blur-md border border-white/15 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#00F0FF]/50 transition-all cursor-pointer pointer-events-auto shadow-md"
          title="Previous Certificate"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scroll helper hint */}
        <div className="font-mono text-[11px] text-slate-400 bg-[#0A061E]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 hidden sm:block pointer-events-auto">
          Scroll wheel or drag to navigate • Hover to pause
        </div>

        {/* Next Button */}
        <button
          onClick={() => jumpToCert(activeCertIndex + 1)}
          disabled={activeCertIndex >= certs.length - 1}
          className="p-2.5 rounded-full bg-[#0A061E]/80 backdrop-blur-md border border-white/15 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#FF007F]/50 transition-all cursor-pointer pointer-events-auto shadow-md"
          title="Next Certificate"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
