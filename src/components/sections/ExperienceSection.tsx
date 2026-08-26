import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Calendar,
  Sparkles,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ShimmerCard } from '../ui/ShimmerCard';
import { VIRTUAL_EXPERIENCES } from '../../data/internships';

export const ExperienceSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs uppercase tracking-widest text-slate-400 font-semibold">
          PREVIOUS VIRTUAL INDUSTRY SIMULATIONS
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VIRTUAL_EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ShimmerCard glowColor="purple" className="p-6 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-purple-400">
                    <Building2 className="w-4 h-4" />
                    <span className="font-bold">{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.date}</span>
                  </div>
                </div>

                <h4 className="font-display font-bold text-base text-white">
                  {exp.program}
                </h4>

                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {exp.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                <div className="font-mono text-[10px] uppercase text-slate-500 font-semibold">
                  Competencies Gained
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {exp.skillsGained.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ShimmerCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
