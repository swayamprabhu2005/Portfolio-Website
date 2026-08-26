import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Trophy
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ShimmerCard } from '../ui/ShimmerCard';
import { EDUCATION_DATA, ACHIEVEMENTS } from '../../data/education';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="08"
        tag="ACADEMIC RIGOR & HONORS"
        title="Education & Notable Achievements"
        description="Formal academic track record at Padre Conceicao College of Engineering paired with engineering competition honors."
      />

      {/* Achievement Spotlight Banner: IDEAS 4.0 Finalist */}
      <div className="mb-12">
        {ACHIEVEMENTS.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-black/60 border border-amber-500/40 shadow-[0_10px_35px_rgba(245,158,11,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 shadow-lg">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {achievement.stage}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{achievement.year}</span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl text-white">
                  {achievement.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </div>

            <div className="md:text-right font-mono text-xs text-amber-300 shrink-0">
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
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ShimmerCard
              glowColor={edu.current ? 'purple' : 'cyan'}
              className={`p-6 h-full flex flex-col justify-between ${
                edu.current ? 'border-purple-500/40' : ''
              }`}
            >
              <div className="space-y-4">
                {/* Header: Period & Location */}
                <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-purple-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    {edu.location.split(',')[0]}
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-bold text-lg sm:text-xl text-white">
                    {edu.institution}
                  </h4>
                  <div className="font-mono text-xs text-cyan-300 mt-1 font-semibold">
                    {edu.degree}
                  </div>
                  {edu.field && (
                    <div className="font-mono text-[11px] text-slate-400 mt-0.5">
                      {edu.field}
                    </div>
                  )}
                </div>

                {/* Score / Grade Badge */}
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between font-mono">
                  <span className="text-[11px] text-slate-400">{edu.gradeLabel}</span>
                  <span className="text-base font-bold text-white text-gradient-purple-cyan">
                    {edu.gradeValue}
                  </span>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 pt-2">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ShimmerCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
