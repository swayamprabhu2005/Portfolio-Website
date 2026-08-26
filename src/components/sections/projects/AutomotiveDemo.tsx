import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Gauge,
  Activity,
  Zap,
  AlertOctagon,
  HardDrive,
  Cpu,
  RefreshCw
} from 'lucide-react';
import { sounds } from '../../ui/SoundEffects';

type DriveScenario = 'CRUISING' | 'HARD_BRAKE' | 'COLLISION_SPIKE';

export const AutomotiveDemo: React.FC = () => {
  const [scenario, setScenario] = useState<DriveScenario>('CRUISING');
  const [canPacketLog, setCanPacketLog] = useState<string[]>([]);
  const [speed, setSpeed] = useState<number>(72);
  const [rpm, setRpm] = useState<number>(2450);
  const [accelG, setAccelG] = useState<{ x: number; y: number; z: number }>({ x: 0.04, y: 0.98, z: 0.02 });
  const [riskScore, setRiskScore] = useState<number>(1.8);
  const [bufferLocked, setBufferLocked] = useState<boolean>(false);

  // Generate simulated CAN Bus packets over time
  useEffect(() => {
    const interval = setInterval(() => {
      const hexIds = ['0x7E8', '0x2DF', '0x10A', '0x320', '0x0C4'];
      const randomId = hexIds[Math.floor(Math.random() * hexIds.length)];
      const randomPayload = Array.from({ length: 8 }, () =>
        Math.floor(Math.random() * 255).toString(16).padStart(2, '0').toUpperCase()
      ).join(' ');

      const timestamp = new Date().toISOString().substring(17, 23);
      const entry = `[${timestamp}] CAN 2.0B (${randomId}) DLC:8 DATA: [ ${randomPayload} ]`;

      setCanPacketLog((prev) => [entry, ...prev.slice(0, 5)]);
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const triggerScenario = (newScenario: DriveScenario) => {
    sounds.playClick();
    setScenario(newScenario);

    if (newScenario === 'CRUISING') {
      setSpeed(74);
      setRpm(2400);
      setAccelG({ x: 0.05, y: 0.98, z: 0.03 });
      setRiskScore(1.8);
      setBufferLocked(false);
    } else if (newScenario === 'HARD_BRAKE') {
      sounds.playHover();
      setSpeed(32);
      setRpm(1600);
      setAccelG({ x: -0.78, y: 0.96, z: 0.18 });
      setRiskScore(34.6);
      setBufferLocked(false);
    } else if (newScenario === 'COLLISION_SPIKE') {
      sounds.playNeuralPulse();
      setSpeed(0);
      setRpm(0);
      setAccelG({ x: 12.8, y: 3.4, z: 8.9 });
      setRiskScore(99.8);
      setBufferLocked(true);
    }
  };

  return (
    <div className="rounded-2xl bg-[#0b0e17] border border-cyan-500/20 p-5 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-lg text-white">ESP32 Automotive Black Box Telemetry</h3>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                BITS Pilani Goa
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              MCP2515 CAN 2.0B + 6-DOF IMU + Edge Risk Classifier
            </p>
          </div>
        </div>

        {/* Scenario Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => triggerScenario('CRUISING')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              scenario === 'CRUISING'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
            }`}
          >
            Normal Cruising
          </button>
          <button
            onClick={() => triggerScenario('HARD_BRAKE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              scenario === 'HARD_BRAKE'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
            }`}
          >
            Hard Braking Event
          </button>
          <button
            onClick={() => triggerScenario('COLLISION_SPIKE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              scenario === 'COLLISION_SPIKE'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
            }`}
          >
            Collision Impact
          </button>
        </div>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
        {/* Left 7 Columns: Gauges & Sensor Fusion */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Speed Gauge */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                <span>VEHICLE SPEED</span>
                <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                {speed} <span className="text-xs font-normal text-slate-400">km/h</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-1">OBD-II PID 0x0D</div>
            </div>

            {/* Engine RPM */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                <span>ENGINE TACH</span>
                <Activity className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                {rpm} <span className="text-xs font-normal text-slate-400">RPM</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-1">OBD-II PID 0x0C</div>
            </div>

            {/* IMU G-Force */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
                <span>6-AXIS IMU</span>
                <Zap className="w-3.5 h-3.5 text-pink-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                {Math.abs(accelG.x).toFixed(1)} <span className="text-xs font-normal text-slate-400">G</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-1">
                X:{accelG.x.toFixed(1)} Y:{accelG.y.toFixed(1)} Z:{accelG.z.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Edge Risk Level Banner */}
          <div
            className={`p-4 rounded-xl border flex items-center justify-between transition-colors duration-300 ${
              bufferLocked
                ? 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                : riskScore > 20
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
            }`}
          >
            <div className="flex items-center gap-3">
              {bufferLocked ? (
                <AlertOctagon className="w-6 h-6 text-rose-400 animate-bounce" />
              ) : (
                <HardDrive className="w-6 h-6 text-cyan-400" />
              )}
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider">
                  {bufferLocked
                    ? 'CRASH DETECTED — BLACK BOX BUFFER LOCKED & PRESERVED'
                    : riskScore > 20
                    ? 'ELEVATED ACCIDENT RISK PREDICTED'
                    : 'NOMINAL VEHICULAR TELEMETRY'}
                </div>
                <div className="text-[11px] opacity-80 font-mono">
                  {bufferLocked
                    ? 'Pre-crash (-10s) and post-crash telemetry saved to tamper-evident flash.'
                    : 'Time-series sensor fusion actively monitoring vehicle dynamics.'}
                </div>
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="text-xl font-bold">{riskScore}%</div>
              <div className="text-[10px] opacity-70">EDGE RISK</div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Live CAN Bus Hex Packet Stream */}
        <div className="lg:col-span-5 rounded-xl bg-black/90 border border-white/10 p-4 font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                CAN BUS RAW STREAM (500 kbps)
              </span>
              <span>SPI/MCP2515</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              {canPacketLog.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1 - index * 0.15, x: 0 }}
                  className="text-cyan-400/90 truncate"
                >
                  {log}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500">
            <span>INTERFACE: SPI + I2C + UART</span>
            <span>FIRMWARE: C/C++ Bare-Metal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
