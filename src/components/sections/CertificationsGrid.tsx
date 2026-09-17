import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  X,
  FileCheck,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ShimmerCard } from '../ui/ShimmerCard';
import { CERTIFICATIONS, CERTIFICATION_CATEGORIES, Certification } from '../../data/certifications';

export const CertificationsGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const filteredCerts =
    activeCategory === 'All'
      ? CERTIFICATIONS
      : CERTIFICATIONS.filter((c) => c.category === activeCategory);

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div id="credentials" className="sr-only">Credentials Anchor</div>
      <SectionHeading
        number="06"
        tag="ACCREDITATIONS & CREDENTIALS"
        title="Verified Technical Certifications"
        description="Continuous technical mastery spanning frontier AI systems, agentic architectures, academic CS theory from IITs, and industry simulations."
        alignment="left"
      />

      {/* Filter Tabs & Header */}
      <div className="mt-10 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-gray-900">
            All Accredited Credentials ({CERTIFICATIONS.length} Total)
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono text-xs">
          {CERTIFICATION_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer text-xs ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#00D2FF] to-[#0099FF] text-[#0B132B] font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                  : 'bg-[#0E1738]/80 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Unified Single Grid of All 16 Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCerts.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: (idx % 6) * 0.05 }}
            onClick={() => setSelectedCert(cert)}
          >
            <ShimmerCard
              className="p-6 h-full flex flex-col justify-between cursor-pointer group hover:border-[#00D2FF]/40 transition-all bg-[#0E1738]/80 backdrop-blur-xl border border-white/10 shadow-2xl"
              cursorLabel="INSPECT"
            >
              <div className="space-y-3.5">
                {/* Header: Issuer + Year */}
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold px-2.5 py-0.5 rounded-md bg-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/30 text-[11px]">
                    {cert.issuer}
                  </span>
                  <span className="text-slate-400">{cert.year}</span>
                </div>

                {/* Title */}
                <div>
                  <h4 className="font-display font-bold text-lg text-white group-hover:text-[#00D2FF] transition-colors">
                    {cert.title}
                  </h4>
                  {cert.credentialNote && (
                    <p className="text-xs text-slate-300 font-sans leading-relaxed mt-1.5 line-clamp-2">
                      {cert.credentialNote}
                    </p>
                  )}
                </div>
              </div>

              {/* Verified Skills & Action */}
              <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {cert.skills.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#091024]/80 text-slate-300 border border-white/10 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 2 && (
                    <span className="font-mono text-[10px] text-slate-400">
                      +{cert.skills.length - 2}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 font-mono text-xs text-[#00D2FF] font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Inspect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </ShimmerCard>
          </motion.div>
        ))}
      </div>

      {/* CREDENTIAL LIGHTBOX MODAL WITH DOCUMENT VIEWER */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-28 pb-8 px-4 sm:px-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-2xl bg-[#0B132B]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-6 sm:p-7 shadow-2xl z-10 space-y-5 max-h-[calc(100vh-8.5rem)] overflow-y-auto text-white"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs uppercase px-2.5 py-0.5 rounded bg-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/30 font-semibold">
                    {selectedCert.category}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mt-2">
                    {selectedCert.title}
                  </h3>
                  <div className="font-mono text-xs text-slate-400 mt-0.5">
                    Issued by <span className="font-semibold text-white">{selectedCert.issuer}</span> • {selectedCert.year}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Verification Badge */}
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-mono text-xs font-bold text-emerald-300 uppercase">
                    Verified Academic / Industry Accreditation
                  </div>
                  <div className="text-[11px] text-emerald-400/90 font-sans">
                    Authenticated credential evaluated under curriculum standards.
                  </div>
                </div>
              </div>

              {/* Certificate Image or Preview with View-Only Security */}
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase text-slate-400 font-semibold flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <FileCheck className="w-3.5 h-3.5 text-[#00D2FF]" />
                    <span>Official Credential Record</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Protected View-Only</span>
                  </div>
                </div>

                <div
                  onContextMenu={(e) => e.preventDefault()}
                  className="relative select-none rounded-xl overflow-hidden border border-white/15 bg-[#070D1E] flex flex-col items-center justify-center p-2 min-h-[180px] shadow-inner"
                >
                  {selectedCert.fileUrl ? (
                    <div className="relative w-full flex justify-center items-center">
                      <img
                        src={`${import.meta.env.BASE_URL}${selectedCert.fileUrl.replace(/^\//, '')}`}
                        alt={selectedCert.title}
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                        className="max-h-[62vh] w-auto max-w-full object-contain rounded-lg shadow-lg pointer-events-auto select-none"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const notice = document.createElement('div');
                            notice.className = 'text-center py-6 space-y-1.5 font-mono text-xs text-slate-400';
                            notice.innerHTML = `<div class="text-white font-semibold">Verified Credential On Record</div><div class="text-[10px] text-slate-500">Official authentication authenticated by ${selectedCert.issuer}</div>`;
                            parent.appendChild(notice);
                          }
                        }}
                      />
                      {/* Transparent Anti-Right-Click / Anti-Drag Shield */}
                      <div
                        className="absolute inset-0 select-none bg-transparent cursor-default"
                        onContextMenu={(e) => e.preventDefault()}
                        title="Authenticated Credential • View-Only Record"
                      />
                    </div>
                  ) : (
                    <div className="text-center py-6 space-y-2">
                      <Award className="w-9 h-9 text-slate-500 mx-auto" />
                      <div className="font-mono text-xs font-semibold text-white">
                        Official Verified Credential Record
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans max-w-xs mx-auto">
                        Authenticated institutional accreditation registered under Swayam Prabhu.
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Credential Scope / Note */}
              {selectedCert.credentialNote && (
                <div className="space-y-1.5">
                  <div className="font-mono text-xs uppercase text-slate-400 font-semibold">
                    Curriculum & Scope
                  </div>
                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    {selectedCert.credentialNote}
                  </p>
                </div>
              )}

              {/* Skills Verified */}
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase text-slate-400 font-semibold">
                  Competencies Authenticated
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedCert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs px-2.5 py-1 rounded-lg bg-[#0E1738] text-slate-200 border border-white/10 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#0099FF] text-[#0B132B] font-mono text-xs font-bold transition-colors shadow-[0_0_15px_rgba(0,210,255,0.3)] cursor-pointer"
                >
                  Close Credential
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
