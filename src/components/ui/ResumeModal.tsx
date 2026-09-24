import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileDown, ExternalLink, Code2, Brain, Sparkles, CheckCircle2 } from 'lucide-react';

export interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const resumes = [
    {
      id: 'fullstack',
      title: 'Full Stack Software Engineer Resume',
      badge: 'Full Stack & Distributed Systems',
      badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
      icon: Code2,
      iconColor: 'text-[#00D2FF]',
      description:
        'Targeted for Full Stack Engineering, distributed backend microservices, resilient frontend architectures, and end-to-end web platforms.',
      technologies: ['React 18', 'Node.js', 'Nest.js', 'TypeScript', 'PostgreSQL', 'Docker', 'REST APIs'],
      filename: 'Swayam_Prabhu_Resume_Full_Stack_Software_Engineer.pdf',
      downloadName: 'Swayam_Prabhu_Resume_Full_Stack_Software_Engineer.pdf',
    },
    {
      id: 'aiml',
      title: 'AI & Machine Learning Engineer Resume',
      badge: 'AI, Deep Learning & LLMs',
      badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
      icon: Brain,
      iconColor: 'text-[#A855F7]',
      description:
        'Targeted for Machine Learning, Deep Learning forensics, Computer Vision, Multi-Agent LLM pipelines, and Edge Speech AI.',
      technologies: ['PyTorch', 'Computer Vision', 'Attention BiLSTM', 'Whisper STT', 'Gemini & Groq APIs', 'Autonomous Agents'],
      filename: 'Swayam_Prabhu_Resume_AI_Machine_Learning_Engineer.pdf',
      downloadName: 'Swayam_Prabhu_Resume_AI_Machine_Learning_Engineer.pdf',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#0B132B]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 text-white"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[#00D2FF] font-semibold">
                    Curriculum Vitae Selection
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  Select Targeted Resume
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-300 mt-1">
                  Choose the specialized resume aligned with your domain requirements.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close resume modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Resume Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumes.map((res) => {
                const IconComponent = res.icon;
                const fileUrl = `${import.meta.env.BASE_URL}resume/${res.filename}`;

                return (
                  <div
                    key={res.id}
                    className="p-5 rounded-xl bg-[#0E1738]/90 border border-white/10 hover:border-[#00D2FF]/40 transition-all flex flex-col justify-between space-y-4 group shadow-lg"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-lg bg-white/5 ${res.iconColor}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${res.badgeColor} font-semibold uppercase`}>
                          {res.badge}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-display font-bold text-base text-white group-hover:text-[#00D2FF] transition-colors">
                          {res.title}
                        </h4>
                        <p className="font-sans text-xs text-slate-300 mt-1 leading-relaxed">
                          {res.description}
                        </p>
                      </div>

                      {/* Pill tags */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {res.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#070D1E] text-slate-300 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                      <a
                        href={fileUrl}
                        download={res.downloadName}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-[#00D2FF] to-[#00A3FF] hover:from-[#33DCFF] hover:to-[#00B4FF] text-[#0B132B] font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,210,255,0.3)] transition-all cursor-pointer"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                        title="Open PDF in new tab"
                        aria-label={`View ${res.title} in new tab`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer Note */}
            <div className="pt-2 text-center text-slate-400 font-mono text-[11px]">
              PDF format • Updated September 2026 • Verified Authenticity
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
