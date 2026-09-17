import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Award,
  Info
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { INTERNSHIPS } from '../../data/internships';

export const ExperienceSection: React.FC = () => {
  const [certNotice, setCertNotice] = useState<string | null>(null);

  const handleCertificateClick = (company: string) => {
    setCertNotice(`The verification credential for ${company} is documented upon internship program graduation.`);
    setTimeout(() => setCertNotice(null), 4000);
  };

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="05"
        tag="EXPERIENCE & INDUSTRY PRACTICE"
        title="Professional Experience & Applied Practice"
        description="Hands-on software engineering across live industry environments at Creative Capsule, Persistent Systems, and Bodhami."
        alignment="left"
      />

      {/* TIER 1: PROFESSIONAL INDUSTRY INTERNSHIPS */}
      <div className="mt-12 space-y-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            Professional Engineering Internships (3 Practice Tracks)
          </h3>
        </div>

        {INTERNSHIPS.map((internship, index) => (
          <motion.div
            key={internship.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="rounded-2xl bg-[#0E1738]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-2xl hover:border-[#00D2FF]/40 transition-all text-white">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-white/10">
                {/* Company & Role */}
                <div className="space-y-2 min-w-0 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`font-mono text-xs font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                      internship.status === 'CURRENTLY COMPLETING'
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-[#00D2FF]/15 text-[#00D2FF] border-[#00D2FF]/30'
                    }`}>
                      {internship.status === 'CURRENTLY COMPLETING' && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      )}
                      {internship.status}
                    </span>
                    {internship.duration && (
                      <span className="font-mono text-xs text-slate-400">
                        {internship.duration} Track
                      </span>
                    )}
                  </div>

                  <h4 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight break-words">
                    {internship.company}
                  </h4>

                  <div className="font-mono text-sm text-[#00D2FF] font-semibold">
                    {internship.role}
                  </div>
                </div>

                {/* Location & Period & Certificate Button */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 text-xs font-mono text-slate-400 shrink-0">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{internship.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{internship.location}</span>
                  </div>

                  <button
                    onClick={() => handleCertificateClick(internship.company)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#091024]/80 hover:bg-white/10 text-slate-300 border border-white/10 font-mono text-xs font-medium transition-colors cursor-pointer mt-1"
                  >
                    <Award className="w-3.5 h-3.5 text-[#00D2FF]" />
                    <span>Verification Record</span>
                  </button>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="my-6 space-y-3">
                <h5 className="font-mono text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Engineering Scope & Responsibilities
                </h5>
                <ul className="space-y-2.5">
                  {internship.description.map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-[#00D2FF] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Applied */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider shrink-0 py-0.5 mr-1">
                  CORE TECHNOLOGIES:
                </span>
                {internship.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-[#091024]/80 text-slate-300 border border-white/10 font-medium text-[11px] leading-tight"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Certificate notice toast */}
        {certNotice && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-3.5 rounded-xl bg-[#091024] border border-blue-500/30 text-xs font-mono text-blue-300 flex items-center gap-2"
          >
            <Info className="w-4 h-4 text-[#00D2FF] shrink-0" />
            <span>{certNotice}</span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

