import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Scan,
  ShieldCheck,
  AlertTriangle,
  Activity,
  Layers,
  Sparkles,
  RefreshCw,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { ShimmerButton } from '../../ui/ShimmerButton';

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
    verdict: 'MANIPULATED / SYNTHETIC ARTIFACTS DETECTED',
    anomaliesDetected: [
      'High-frequency Fourier boundary blurring around facial perimeter',
      'Irregular blink rate & pupil reflection vector mismatch',
      'Sub-pixel convolutional blending artifacts near jawline'
    ]
  },
  {
    id: 'sample-real',
    name: 'Sample B: Unaltered Sensor Feed',
    type: 'GENUINE',
    source: 'Direct Camera Stream / Uncompressed RAW',
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
    setIsScanning(true);
    setShowReport(false);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 700);
    setTimeout(() => setScanStep(3), 1400);
    setTimeout(() => {
      setIsScanning(false);
      setShowReport(true);
    }, 2100);
  };

  const selectSample = (preset: PresetSample) => {
    setSelectedPreset(preset);
    setShowReport(false);
    setScanStep(0);
  };

  return (
    <div className="rounded-2xl bg-white border border-gray-200/90 p-5 sm:p-7 shadow-sm">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <Scan className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-lg text-gray-900">VeritaScan Interactive AI Engine</h3>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                v2.4 Neural Core
              </span>
            </div>
            <p className="text-xs text-gray-500 font-mono">
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
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold'
                    : 'bg-rose-50 text-rose-800 border border-rose-300 font-semibold'
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {p.type === 'GENUINE' ? '● Genuine Feed' : '● Synthetic Feed'}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6">
        {/* Left Column: Visual Scanner Frame */}
        <div className="lg:col-span-6 relative aspect-[4/3] rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col items-center justify-center p-4 shadow-inner">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

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
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-purple-950/40 to-slate-950 flex flex-col items-center justify-center text-center p-3">
              <Eye className={`w-10 h-10 mb-2 ${isScanning ? 'text-cyan-400 animate-pulse' : 'text-purple-400'}`} />
              <span className="text-xs font-mono font-medium text-slate-100">
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
            <span className="flex items-center gap-1 text-slate-300">
              <Activity className="w-3.5 h-3.5 text-purple-400" />
              FASTAPI / RESNET18
            </span>
          </div>
        </div>

        {/* Right Column: Dynamic Analysis Gauges & Report */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-wider text-gray-500 font-semibold flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              Multi-Layer Forensic Decomposition
            </h4>

            {/* 1. Spatial ResNet18 Layer */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-700">Spatial Feature Coherence (ResNet18)</span>
                <span className="text-purple-700 font-bold">
                  {showReport ? `${selectedPreset.spatialScore}%` : isScanning ? 'ANALYZING...' : '--'}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: showReport ? `${selectedPreset.spatialScore}%` : isScanning ? '60%' : '0%' }}
                  className="h-full bg-purple-600 rounded-full"
                />
              </div>
            </div>

            {/* 2. Fourier Frequency FFT Layer */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-700">High-Frequency Fourier Spectral Consistency</span>
                <span className="text-blue-700 font-bold">
                  {showReport ? `${selectedPreset.frequencyScore}%` : isScanning ? 'ANALYZING...' : '--'}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: showReport ? `${selectedPreset.frequencyScore}%` : isScanning ? '80%' : '0%' }}
                  className="h-full bg-blue-600 rounded-full"
                />
              </div>
            </div>

            {/* 3. Temporal Artifact Vector */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-700">Temporal Continuity & Biometric Vectors</span>
                <span className="text-indigo-700 font-bold">
                  {showReport ? `${selectedPreset.temporalScore}%` : isScanning ? 'ANALYZING...' : '--'}
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: showReport ? `${selectedPreset.temporalScore}%` : isScanning ? '45%' : '0%' }}
                  className="h-full bg-indigo-600 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Result Output Card */}
          <div className="mt-5 p-4 rounded-xl border transition-all">
            {showReport ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedPreset.type === 'GENUINE' ? (
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-600" />
                    )}
                    <span
                      className={`font-mono text-xs sm:text-sm font-bold ${
                        selectedPreset.type === 'GENUINE' ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {selectedPreset.verdict}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-900 border border-gray-200">
                    {selectedPreset.overallScore}% Authenticity
                  </span>
                </div>

                <ul className="text-xs text-gray-600 space-y-1 font-mono">
                  {selectedPreset.anomaliesDetected.map((anomaly, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{anomaly}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <div className="text-center py-4 text-xs font-mono text-gray-400">
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
              cursorLabel="EXECUTE"
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

