import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scan,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Activity,
  Layers,
  Sparkles,
  RefreshCw,
  Eye,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { ShimmerButton } from '../../ui/ShimmerButton';
import { sounds } from '../../ui/SoundEffects';

interface PresetSample {
  id: string;
  name: string;
  type: 'GENUINE' | 'DEEPFAKE';
  source: string;
  spatialScore: number;
  frequencyScore: number;
  temporalScore: number;
  overallScore: number;
  verdict: string;
  anomaliesDetected: string[];
}

const PRESETS: PresetSample[] = [
  {
    id: 'sample-fake',
    name: 'Sample A: Neural Face-Swap Video Stream',
    type: 'DEEPFAKE',
    source: 'Synthetic AI Diffusion + Landmark Warp',
    spatialScore: 18,
    frequencyScore: 22,
    temporalScore: 15,
    overallScore: 18.3,
    verdict: 'MANIPULATED / DEEPFAKE DETECTED',
    anomaliesDetected: [
      'High-frequency Fourier boundary blurring around facial perimeter',
      'Irregular blink rate & pupil reflection vector mismatch',
      'Sub-pixel convolutional blending artifacts near jawline'
    ]
  },
  {
    id: 'sample-real',
    name: 'Sample B: Unaltered Broadcast Feed',
    type: 'GENUINE',
    source: 'Direct Sensor Stream / Uncompressed',
    spatialScore: 98,
    frequencyScore: 97,
    temporalScore: 99,
    overallScore: 98.1,
    verdict: 'AUTHENTIC / NO TAMPERING DETECTED',
    anomaliesDetected: [
      'Natural optical motion vector coherence confirmed',
      'Continuous micro-vascular blood-flow pulse patterns detected',
      'Zero spectral frequency interpolation artifacts'
    ]
  }
];

export const VeritaScanDemo: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<PresetSample>(PRESETS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [showReport, setShowReport] = useState(false);

  const startScan = () => {
    sounds.playNeuralPulse();
    setIsScanning(true);
    setShowReport(false);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 700);
    setTimeout(() => setScanStep(3), 1400);
    setTimeout(() => {
      setIsScanning(false);
      setShowReport(true);
      sounds.playClick();
    }, 2100);
  };

  const selectSample = (preset: PresetSample) => {
    sounds.playClick();
    setSelectedPreset(preset);
    setShowReport(false);
    setScanStep(0);
  };

  return (
    <div className="rounded-2xl bg-[#0b0e17] border border-purple-500/20 p-5 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Scan className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-lg text-white">VeritaScan Interactive AI Engine</h3>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/40">
                v2.4 Neural Core
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Spatial (ResNet18) + Fourier Frequency Domain Pipeline
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => selectSample(p)}
              disabled={isScanning}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedPreset.id === p.id
                  ? p.type === 'GENUINE'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
              }`}
            >
              {p.type === 'GENUINE' ? '● Genuine Sample' : '● Synthetic Sample'}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
        {/* Left Column: Visual Scanner Frame */}
        <div className="lg:col-span-6 relative aspect-[4/3] rounded-xl bg-black/80 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

          {/* Biometric Face Target HUD */}
          <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 border border-purple-400/40 rounded-3xl flex items-center justify-center p-3">
            {/* Corner Reticles */}
            <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
            <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

            {/* Scanning Laser Beam */}
            {isScanning && (
              <motion.div
                initial={{ top: '0%' }}
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4] z-20"
              />
            )}

            {/* Center Biometric Visualization */}
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-purple-950/30 to-black/60 flex flex-col items-center justify-center text-center p-3">
              <Eye className={`w-10 h-10 mb-2 ${isScanning ? 'text-cyan-400 animate-pulse' : 'text-purple-400'}`} />
              <span className="text-xs font-mono font-medium text-slate-200">
                {selectedPreset.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 mt-1">
                {selectedPreset.source}
              </span>
            </div>
          </div>

          {/* Live Step Diagnostics Bar */}
          <div className="relative z-10 mt-4 w-full flex items-center justify-between text-[11px] font-mono text-slate-400 px-2">
            <span>PIPELINE: {isScanning ? `PHASE 0${scanStep}/03` : showReport ? 'SCAN COMPLETED' : 'IDLE / READY'}</span>
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-purple-400" />
              FASTAPI / RESNET18
            </span>
          </div>
        </div>

        {/* Right Column: Dynamic Analysis Gauges & Report */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              Multi-Layer Forensic Decomposition
            </h4>

            {/* 1. Spatial ResNet18 Layer */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Spatial Convolutional Coherence (ResNet18)</span>
                <span className="text-purple-300 font-bold">
                  {showReport ? `${selectedPreset.spatialScore}%` : isScanning ? 'ANALYZING...' : '--'}
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: showReport ? `${selectedPreset.spatialScore}%` : isScanning ? '60%' : '0%' }}
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-400"
                />
              </div>
            </div>

            {/* 2. Fourier Frequency FFT Layer */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">High-Frequency Fourier Spectral Consistency</span>
                <span className="text-cyan-300 font-bold">
                  {showReport ? `${selectedPreset.frequencyScore}%` : isScanning ? 'ANALYZING...' : '--'}
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: showReport ? `${selectedPreset.frequencyScore}%` : isScanning ? '80%' : '0%' }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-400"
                />
              </div>
            </div>

            {/* 3. Temporal Artifact Vector */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Temporal Frame Continuity & Blink Dynamics</span>
                <span className="text-pink-300 font-bold">
                  {showReport ? `${selectedPreset.temporalScore}%` : isScanning ? 'ANALYZING...' : '--'}
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: showReport ? `${selectedPreset.temporalScore}%` : isScanning ? '45%' : '0%' }}
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-400"
                />
              </div>
            </div>
          </div>

          {/* Result Output Card */}
          <div className="mt-5 p-4 rounded-xl bg-white/[0.03] border border-white/10">
            {showReport ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedPreset.type === 'GENUINE' ? (
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-400" />
                    )}
                    <span
                      className={`font-mono text-sm font-bold ${
                        selectedPreset.type === 'GENUINE' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {selectedPreset.verdict}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-white/10 text-white">
                    {selectedPreset.overallScore}% Authenticity
                  </span>
                </div>

                <ul className="text-xs text-slate-400 space-y-1 font-mono">
                  {selectedPreset.anomaliesDetected.map((anomaly, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{anomaly}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <div className="text-center py-4 text-xs font-mono text-slate-500">
                Click &ldquo;Execute Forensic Scan&rdquo; to process this sample through the neural backend.
              </div>
            )}
          </div>

          {/* Action Trigger Buttons */}
          <div className="mt-5 flex items-center gap-3">
            <ShimmerButton
              onClick={startScan}
              disabled={isScanning}
              variant="primary"
              size="md"
              icon={isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              cursorLabel="EXECUTE SCAN"
              className="w-full"
            >
              {isScanning ? 'Processing Neural Graph...' : 'Execute Forensic Scan'}
            </ShimmerButton>
          </div>
        </div>
      </div>
    </div>
  );
};
