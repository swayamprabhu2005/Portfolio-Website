import React, { useRef, useEffect, useState } from 'react';
import { ShieldAlert, Lock } from 'lucide-react';

interface SecurePortraitProps {
  src: string;
  alt: string;
  className?: string;
}

export const SecurePortrait: React.FC<SecurePortraitProps> = ({
  src,
  alt,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isBlackedOut, setIsBlackedOut] = useState(false);
  const [blackoutReason, setBlackoutReason] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Render image to canvas
  const renderToCanvas = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img || !imageLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.naturalWidth || 800;
    canvas.height = img.naturalHeight || 1000;

    if (isBlackedOut) {
      // Blackout canvas surface directly
      ctx.fillStyle = '#060B18';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw security grid lines
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.08)';
      ctx.lineWidth = 2;
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw centered lock watermark
      ctx.fillStyle = 'rgba(0, 210, 255, 0.85)';
      ctx.font = `bold ${Math.round(canvas.width * 0.045)}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('PROTECTED VIEW-ONLY', canvas.width / 2, canvas.height / 2 - 15);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = `${Math.round(canvas.width * 0.03)}px monospace`;
      ctx.fillText('SCREEN CAPTURE DISABLED', canvas.width / 2, canvas.height / 2 + 25);
    } else {
      // Draw actual photo
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Burn subtle security monogram in top corner
      ctx.fillStyle = 'rgba(11, 19, 43, 0.45)';
      const stampW = canvas.width * 0.42;
      const stampH = canvas.height * 0.045;
      ctx.fillRect(canvas.width - stampW - 16, 16, stampW, stampH);

      ctx.fillStyle = 'rgba(0, 210, 255, 0.85)';
      ctx.font = `bold ${Math.round(canvas.height * 0.019)}px monospace`;
      ctx.textAlign = 'right';
      ctx.fillText('VERIFIED • SWAYAM PRABHU', canvas.width - 24, 16 + stampH * 0.68);
    }
  };

  // Load image off-screen into memory
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
    };
    img.onerror = () => {
      // Fallback path
      if (!src.endsWith('/swayam.jpeg')) {
        img.src = '/swayam.jpeg';
      }
    };
  }, [src]);

  // Re-draw whenever state changes
  useEffect(() => {
    renderToCanvas();
  }, [imageLoaded, isBlackedOut]);

  // Active anti-capture listeners (PrintScreen, Snipping tool, Window Blur, Visibility)
  useEffect(() => {
    let timeoutId: number;

    const triggerBlackout = (reason: string, durationMs = 2800) => {
      setBlackoutReason(reason);
      setIsBlackedOut(true);
      clearTimeout(timeoutId);
      if (durationMs > 0) {
        timeoutId = window.setTimeout(() => {
          setIsBlackedOut(false);
        }, durationMs);
      }
    };

    // 1. Detect PrintScreen Key
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        triggerBlackout('PrintScreen Detected', 3500);
      }
    };

    // 2. Detect Save or Print shortcuts (Ctrl+S, Ctrl+P, Meta+S, Meta+P)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p')) {
        e.preventDefault();
        triggerBlackout('Save / Print Blocked', 3000);
      }
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        triggerBlackout('PrintScreen Detected', 3500);
      }
    };

    // 3. Window blur: triggers when Windows Snipping Tool (Win+Shift+S) or Mac capture activates
    const handleBlur = () => {
      triggerBlackout('Capture Utility Active', 0); // stays black while out of focus
    };

    const handleFocus = () => {
      setIsBlackedOut(false);
    };

    // 4. Page visibility change (switching tabs or backgrounding on mobile)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsBlackedOut(true);
      } else {
        setIsBlackedOut(false);
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={`relative w-full h-full select-none overflow-hidden ${className}`}
      style={{
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitTouchCallout: 'none'
      }}
    >
      {/* HTML5 Canvas Rendering (No <img> in DOM) */}
      <canvas
        ref={canvasRef}
        onContextMenu={(e) => e.preventDefault()}
        className={`w-full h-full object-cover object-center transition-all duration-300 ${
          isBlackedOut ? 'filter brightness-50 contrast-125' : 'contrast-[1.03]'
        }`}
      />

      {/* Blackout UI State Overlay */}
      {isBlackedOut && (
        <div className="absolute inset-0 bg-[#060B18]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center z-20 animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-2xl bg-[#00D2FF]/10 border border-[#00D2FF]/30 flex items-center justify-center text-[#00D2FF] mb-3 shadow-[0_0_20px_rgba(0,210,255,0.25)]">
            <Lock className="w-6 h-6" />
          </div>
          <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            Display Protected
          </div>
          <div className="font-mono text-[10px] text-slate-400 mt-1 max-w-[200px]">
            {blackoutReason || 'Capture utility intercepted. View-only mode active.'}
          </div>
        </div>
      )}

      {/* Transparent Anti-Drag / Anti-Inspect Shield */}
      <div
        onContextMenu={(e) => e.preventDefault()}
        className="absolute inset-0 select-none bg-transparent cursor-default pointer-events-auto z-10"
        title="Protected View-Only"
      />
    </div>
  );
};
