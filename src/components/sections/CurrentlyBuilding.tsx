import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Car,
  Activity,
  Zap,
  HardDrive,
  ShieldCheck,
  Radio,
  ArrowRight,
  Sparkles,
  Layers,
  Database
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ShimmerCard } from '../ui/ShimmerCard';
import { AutomotiveDemo } from './projects/AutomotiveDemo';

export const CurrentlyBuilding: React.FC = () => {
  const dataPipelineSteps = [
    {
      title: 'Vehicle OBD-II Port',
      tech: 'CAN 2.0B / 500 kbps',
      desc: 'High-speed polling of engine RPM, speed, throttle, and fault frames.',
      icon: Car,
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/20',
    },
    {
      title: 'MCP2515 & SPI Bus',
      tech: 'Hardware Transceiver',
      desc: 'Physical differential CAN signals converted to SPI frames for microcontroller.',
      icon: Radio,
      color: 'border-blue-500/40 text-blue-400 bg-blue-950/20',
    },
    {
      title: 'ESP32 Controller Firmware',
      tech: 'Bare-Metal C/C++ / FreeRTOS',
      desc: 'Concurrent task scheduling across SPI, I²C, and UART peripheral buses.',
      icon: Cpu,
      color: 'border-purple-500/40 text-purple-400 bg-purple-950/20',
    },
    {
      title: 'IMU & GPS Sensor Fusion',
      tech: '6-DOF Accel + Gyro + GNSS',
      desc: 'Synchronizing microsecond timestamped kinematic motion with engine logs.',
      icon: Activity,
      color: 'border-pink-500/40 text-pink-400 bg-pink-950/20',
    },
    {
      title: 'Edge ML Inference',
      tech: 'Time-Series Classifier',
      desc: 'On-device feature extraction predicting pre-crash risk pulses in real time.',
      icon: Zap,
      color: 'border-amber-500/40 text-amber-400 bg-amber-950/20',
    },
    {
      title: 'User-Owned Black Box Storage',
      tech: 'Tamper-Evident Ring Buffer',
      desc: 'Preserves -10s pre-crash, crash pulse, and +10s post-crash data securely.',
      icon: HardDrive,
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20',
    },
  ];

  return (
    <section id="currently-building" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="05"
        tag="CURRENT ACTIVE RESEARCH"
        title="Automotive Black Box & Edge ML Telemetry"
        description="Engineering a user-owned vehicular black box with high-speed CAN bus acquisition and real-time crash prediction in association with BITS Pilani Goa."
        gradient="pink-cyan"
      />

      {/* Overview Card & Interactive Telemetry HUD */}
      <div className="space-y-12">
        {/* Interactive Live Demo */}
        <AutomotiveDemo />

        {/* Animated Technical Dataflow Architecture Pipeline */}
        <div>
          <div className="flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-widest text-slate-400">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Vehicular Telemetry & Sensor Fusion Pipeline</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataPipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <ShimmerCard glowColor="cyan" className="p-5 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center ${step.color}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs font-bold text-slate-500">
                          STAGE 0{idx + 1}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-display font-bold text-base text-white">
                          {step.title}
                        </h4>
                        <div className="font-mono text-xs text-cyan-300 mt-0.5 font-medium">
                          {step.tech}
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </ShimmerCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Core Principles: Privacy First & Edge Computing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#0e111a] border border-cyan-500/30 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>PRIVACY-FIRST HARDWARE ARCHITECTURE</span>
            </div>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Unlike commercial telematics tracking boxes that continuously stream driver locations to corporate servers, this system stores telemetry locally in a circular ring buffer that is only permanently locked during anomalous high-G impact events.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e111a] border border-purple-500/30 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Cpu className="w-5 h-5" />
              <span>MICROSECOND SYNCHRONIZATION</span>
            </div>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Achieves hardware-level timestamp synchronization between the CAN bus (engine RPM, brake switch) and external 6-axis IMU inertial sensors for accurate post-crash forensic reconstruction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
