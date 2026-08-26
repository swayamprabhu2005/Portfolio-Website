import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  ExternalLink,
  CheckCircle2,
  Calendar,
  MapPin,
  Sparkles,
  Award
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ShimmerCard } from '../ui/ShimmerCard';
import { ShimmerButton } from '../ui/ShimmerButton';
import { INTERNSHIPS } from '../../data/internships';
import { sounds } from '../ui/SoundEffects';

export const InternshipsSection: React.FC = () => {
  const handleViewCertificate = (url?: string) => {
    sounds.playClick();
    if (url && url !== '#CERTIFICATE_URL_1' && url !== '#CERTIFICATE_URL_2' && url !== '#CERTIFICATE_URL_3') {
      window.open(url, '_blank');
    } else {
      alert('Certificate will be accessible upon internship completion.');
    }
  };

  return (
    <section id="internships" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="06"
        tag="PROFESSIONAL DEVELOPMENT"
        title="Current Internships & Industry Experience"
        description="Active hands-on industry engineering roles developing production software, distributed workflows, and scalable architectures."
      />

      <div className="space-y-8">
        {INTERNSHIPS.map((internship, index) => (
          <motion.div
            key={internship.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <ShimmerCard
              glowColor="purple"
              className="p-6 sm:p-8 border-purple-500/30 bg-gradient-to-r from-[#0d101a] via-[#101422] to-[#0d101a]"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                {/* Company & Role */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {internship.status}
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {internship.duration} Internship
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                    {internship.company}
                  </h3>

                  <div className="font-mono text-sm text-cyan-300 font-medium">
                    {internship.role}
                  </div>
                </div>

                {/* Location & Period & Certificate Button */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3">
                  <div className="font-mono text-xs text-slate-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>{internship.period}</span>
                  </div>
                  <div className="font-mono text-xs text-slate-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span>{internship.location}</span>
                  </div>

                  <ShimmerButton
                    onClick={() => handleViewCertificate(internship.certificateUrl)}
                    variant="outline"
                    size="sm"
                    icon={<Award className="w-4 h-4 text-purple-400" />}
                    cursorLabel="CERTIFICATE"
                    className="mt-2"
                  >
                    View Certificate
                  </ShimmerButton>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="my-6 space-y-2.5">
                <h4 className="font-mono text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Engineering Scope & Contributions
                </h4>
                <ul className="space-y-2">
                  {internship.description.map((desc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Applied */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-2 flex-wrap font-mono text-xs">
                <span className="text-slate-500 font-semibold text-[11px]">CORE STACK:</span>
                {internship.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/5 text-slate-200 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ShimmerCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
