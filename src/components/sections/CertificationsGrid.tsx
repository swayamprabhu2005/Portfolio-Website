import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  BookOpen
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ShimmerCard } from '../ui/ShimmerCard';
import { CERTIFICATIONS, CERTIFICATION_CATEGORIES, Certification } from '../../data/certifications';
import { sounds } from '../ui/SoundEffects';

export const CertificationsGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredCerts =
    activeCategory === 'All'
      ? CERTIFICATIONS
      : CERTIFICATIONS.filter((c) => c.category === activeCategory);

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        number="07"
        tag="ACCREDITATIONS & COURSES"
        title="Verified Technical Certifications"
        description="Continuous learning spanning frontier AI architectures, agentic systems, academic CS theory, and industry simulations."
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none font-mono text-xs">
        {CERTIFICATION_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sounds.playClick();
              setActiveCategory(cat);
            }}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat
                ? 'bg-purple-600 text-white font-semibold shadow-[0_0_20px_rgba(139,92,246,0.4)] border border-purple-400/50'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Certification Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCerts.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
          >
            <ShimmerCard
              glowColor="purple"
              className="p-5 h-full flex flex-col justify-between"
              cursorLabel="CERTIFIED"
            >
              <div className="space-y-3">
                {/* Header: Issuer + Year */}
                <div className="flex items-center justify-between font-mono text-xs">
                  <span
                    className="font-bold px-2 py-0.5 rounded text-[11px]"
                    style={{
                      backgroundColor: `${cert.badgeColor || '#8b5cf6'}20`,
                      color: cert.badgeColor || '#a855f7',
                    }}
                  >
                    {cert.issuer}
                  </span>
                  <span className="text-slate-400">{cert.year}</span>
                </div>

                {/* Title */}
                <h4 className="font-display font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                  {cert.title}
                </h4>

                {/* Credential Note */}
                {cert.credentialNote && (
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {cert.credentialNote}
                  </p>
                )}
              </div>

              {/* Verified Skills */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 flex-wrap">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                  >
                    {skill}
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
