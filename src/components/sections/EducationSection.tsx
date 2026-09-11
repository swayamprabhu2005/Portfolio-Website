import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ShimmerCard } from '../ui/ShimmerCard';
import { EDUCATION_DATA, ACHIEVEMENTS } from '../../data/education';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="07"
        tag="ACADEMIC BACKGROUND & HONORS"
        title="Education & Notable Honors"
        description="Formal computer engineering studies at Padre Conceicao College of Engineering paired with engineering competition honors."
        alignment="left"
      />

      {/* Achievement Spotlight Banner: IDEAS 4.0 Finalist */}
      <div className="mb-12 mt-10">
        {ACHIEVEMENTS.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 sm:p-7 rounded-2xl bg-[#0E1738]/85 backdrop-blur-xl border border-[#FFD700]/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 text-white hover:border-[#FFD700]/50 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFD700]/15 border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700] shrink-0 shadow-[0_0_15px_rgba(255,215,0,0.25)]">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/40">
                    {achievement.stage}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{achievement.year}</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  {achievement.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </div>

            <div className="md:text-right font-mono text-xs text-slate-400 font-medium shrink-0">
              <span>Padre Conceicao College of Engineering</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Education Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {EDUCATION_DATA.map((edu, idx) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <ShimmerCard
              className={`p-6 h-full flex flex-col justify-between ${
                edu.current ? 'ring-1 ring-[#00D2FF]/40 border-[#00D2FF]/30' : ''
              }`}
            >
              <div className="space-y-4">
                {/* Header: Period & Location */}
                <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-[#00D2FF] font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {edu.location.split(',')[0]}
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-bold text-lg sm:text-xl text-white">
                    {edu.institution}
                  </h4>
                  <div className="font-mono text-xs text-[#00D2FF] mt-1 font-semibold">
                    {edu.degree}
                  </div>
                  {edu.field && (
                    <div className="font-mono text-[11px] text-slate-400 mt-0.5">
                      {edu.field}
                    </div>
                  )}
                </div>

                {/* Score / Grade Badge */}
                <div className="p-3 rounded-xl bg-[#091024]/80 border border-white/10 flex items-center justify-between font-mono">
                  <span className="text-[11px] text-slate-400">{edu.gradeLabel}</span>
                  <span className="text-base font-bold text-[#00D2FF]">
                    {edu.gradeValue}
                  </span>
                </div>

                {/* Highlights (if present) */}
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="space-y-2 pt-2">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-[#00D2FF] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ShimmerCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

