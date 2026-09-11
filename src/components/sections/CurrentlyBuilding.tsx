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
  Layers
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ShimmerCard } from '../ui/ShimmerCard';
import { AutomotiveDemo } from './projects/AutomotiveDemo';

export const CurrentlyBuilding: React.FC = () => {
  const dataPipelineSteps = [
    {
      title: 'Vehicle OBD-II Port',
      tech: 'CAN 2.0B / 500 kbps',
      desc: 'High-speed polling of engine RPM, speed, throttle position, and fault frames.',
      icon: Car,
      color: 'border-blue-200 text-blue-700 bg-blue-50',
    },
    {
      title: 'MCP2515 & SPI Bus',
      tech: 'Hardware Transceiver',
      desc: 'Physical differential CAN signals converted to SPI frames for microcontroller.',
      icon: Radio,
      color: 'border-cyan-200 text-cyan-800 bg-cyan-50',
    },
    {
      title: 'ESP32 Controller Firmware',
      tech: 'Bare-Metal C/C++ / FreeRTOS',
      desc: 'Concurrent task scheduling across SPI, I²C, and UART peripheral buses.',
      icon: Cpu,
      color: 'border-purple-200 text-purple-700 bg-purple-50',
    },
    {
      title: 'IMU & GPS Sensor Fusion',
      tech: '6-DOF Accel + Gyro + GNSS',
      desc: 'Synchronizing microsecond timestamped kinematic motion with engine logs.',
      icon: Activity,
      color: 'border-indigo-200 text-indigo-700 bg-indigo-50',
    },
    {
      title: 'Edge ML Inference',
      tech: 'Time-Series Classifier',
      desc: 'On-device feature extraction predicting pre-crash risk pulses in real time.',
      icon: Zap,
      color: 'border-amber-200 text-amber-800 bg-amber-50',
    },
    {
      title: 'User-Owned Black Box Storage',
      tech: 'Tamper-Evident Ring Buffer',
      desc: 'Preserves -10s pre-crash, crash pulse, and +10s post-crash data securely.',
      icon: HardDrive,
      color: 'border-emerald-200 text-emerald-800 bg-emerald-50',
    },
  ];

  return (
    <section id="currently-building" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="03"
        tag="CURRENT ACTIVE RESEARCH"
        title="Automotive Black Box & Edge ML Telemetry"
        description="Engineering a user-owned vehicular black box with high-speed CAN bus acquisition and real-time crash prediction in collaboration with BITS Pilani Goa."
        alignment="left"
      />

      {/* Overview Card & Interactive Telemetry HUD */}
      <div className="space-y-12 mt-10">
        {/* Interactive Live Demo */}
        <AutomotiveDemo />

        {/* Animated Technical Dataflow Architecture Pipeline */}
        <div>
          <div className="flex items-center gap-2 mb-6 font-mono text-xs uppercase tracking-wider text-gray-500 font-semibold">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Vehicular Telemetry & Sensor Fusion Pipeline</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dataPipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                >
                  <ShimmerCard className="p-5 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-10 h-10 rounded-xl border flex items-center justify-center ${step.color}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-xs font-semibold text-gray-400">
                          STAGE 0{idx + 1}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-display font-bold text-base text-gray-900">
                          {step.title}
                        </h4>
                        <div className="font-mono text-xs text-blue-600 mt-0.5 font-medium">
                          {step.tech}
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 font-sans leading-relaxed">
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
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>PRIVACY-FIRST HARDWARE ARCHITECTURE</span>
            </div>
            <p className="text-gray-600 font-sans text-xs leading-relaxed">
              Unlike commercial telematics tracking boxes that continuously stream driver coordinates to third-party cloud servers, this architecture stores telemetry locally in a circular ring buffer that is locked only during verified high-G impact events.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
              <Cpu className="w-5 h-5 text-purple-600" />
              <span>MICROSECOND HARDWARE SYNCHRONIZATION</span>
            </div>
            <p className="text-gray-600 font-sans text-xs leading-relaxed">
              Achieves hardware-level timestamp synchronization between the vehicular CAN bus (engine RPM, brake switch, velocity) and external 6-axis IMU inertial sensors for forensic post-incident reconstruction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

