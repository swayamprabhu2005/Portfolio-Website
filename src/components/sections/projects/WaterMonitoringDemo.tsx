import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Droplets,
  ShieldCheck,
  AlertTriangle,
  Activity,
  Award,
  Sparkles
} from 'lucide-react';

type WaterSample = 'PRISTINE' | 'MONSOON_RUNOFF' | 'CONTAMINATED';

export const WaterMonitoringDemo: React.FC = () => {
  const [sample, setSample] = useState<WaterSample>('PRISTINE');

  const metrics = {
    PRISTINE: {
      ph: 7.35,
      phStatus: 'OPTIMAL (6.5 - 8.5)',
      turbidity: 1.12,
      turbidityStatus: 'CLEAR (<5.0 NTU)',
      tds: 168,
      tdsStatus: 'EXCELLENT (<300 PPM)',
      potability: 98.2,
      alert: 'SAFE POTABLE WATER — ALL SENSORS NOMINAL',
      safe: true,
    },
    MONSOON_RUNOFF: {
      ph: 6.82,
      phStatus: 'ACCEPTABLE (NEAR NEUTRAL)',
      turbidity: 6.45,
      turbidityStatus: 'ELEVATED (>5.0 NTU)',
      tds: 295,
      tdsStatus: 'MODERATE RUNOFF',
      potability: 71.4,
      alert: 'FILTRATION REQUIRED — MONSOON SILT RUNOFF DETECTED',
      safe: false,
    },
    CONTAMINATED: {
      ph: 9.14,
      phStatus: 'ALKALINE SPIKE (>8.5)',
      turbidity: 18.9,
      turbidityStatus: 'CRITICAL (>10.0 NTU)',
      tds: 640,
      tdsStatus: 'HAZARDOUS (>500 PPM)',
      potability: 14.8,
      alert: 'UNSAFE FOR CONSUMPTION — CONTAMINATION ALARM ACTIVE',
      safe: false,
    },
  }[sample];

  const changeSample = (newSample: WaterSample) => {
    setSample(newSample);
  };

  return (
    <div className="rounded-2xl bg-white border border-gray-200/90 p-5 sm:p-7 shadow-sm">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-lg text-gray-900">Smart Water Telemetry & Predictive AI</h3>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1 font-semibold">
                <Award className="w-3 h-3" /> IDEAS 4.0 Finalist
              </span>
            </div>
            <p className="text-xs text-gray-500 font-mono">
              Multi-Probe Hardware Ingestion (pH + Turbidity + TDS) & Time-Series Alerts
            </p>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => changeSample('PRISTINE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              sample === 'PRISTINE'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-semibold'
                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            Fresh Spring Source
          </button>
          <button
            onClick={() => changeSample('MONSOON_RUNOFF')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              sample === 'MONSOON_RUNOFF'
                ? 'bg-amber-50 text-amber-800 border border-amber-300 font-semibold'
                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            Monsoon Runoff
          </button>
          <button
            onClick={() => changeSample('CONTAMINATED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              sample === 'CONTAMINATED'
                ? 'bg-rose-50 text-rose-800 border border-rose-300 font-semibold'
                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            Chemical Spike
          </button>
        </div>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        {/* pH Sensor */}
        <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-200/80">
          <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-1">
            <span>pH ELECTRODE PROBE</span>
            <Activity className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold font-mono text-gray-900">
            {metrics.ph.toFixed(2)}
          </div>
          <div className="text-[11px] font-mono text-gray-500 mt-1">{metrics.phStatus}</div>
        </div>

        {/* Turbidity Sensor */}
        <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-200/80">
          <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-1">
            <span>OPTICAL TURBIDITY</span>
            <Droplets className="w-3.5 h-3.5 text-cyan-600" />
          </div>
          <div className="text-3xl font-bold font-mono text-gray-900">
            {metrics.turbidity.toFixed(2)} <span className="text-sm font-normal text-gray-500">NTU</span>
          </div>
          <div className="text-[11px] font-mono text-gray-500 mt-1">{metrics.turbidityStatus}</div>
        </div>

        {/* TDS Sensor */}
        <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-200/80">
          <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-1">
            <span>TOTAL DISSOLVED SOLIDS</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="text-3xl font-bold font-mono text-gray-900">
            {metrics.tds} <span className="text-sm font-normal text-gray-500">PPM</span>
          </div>
          <div className="text-[11px] font-mono text-gray-500 mt-1">{metrics.tdsStatus}</div>
        </div>
      </div>

      {/* Live Status & Alert Banner */}
      <motion.div
        key={sample}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-xl border flex items-center justify-between font-mono ${
          metrics.safe
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
            : 'bg-rose-50/80 border-rose-200 text-rose-900'
        }`}
      >
        <div className="flex items-center gap-3">
          {metrics.safe ? (
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <div className="text-xs sm:text-sm font-bold uppercase">{metrics.alert}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">{metrics.potability}%</div>
          <div className="text-[10px] opacity-75">POTABILITY SCORE</div>
        </div>
      </motion.div>
    </div>
  );
};

