import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  FileDown,
  MapPin,
  Github,
  Linkedin
} from 'lucide-react';
import { ShimmerButton } from '../ui/ShimmerButton';
import { SecurePortrait } from '../ui/SecurePortrait';

export const HeroSection: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-20 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography, Narrative & CTAs (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6"
        >
          {/* Overline Tag */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#0E1738]/80 border border-[#00D2FF]/30 text-[#00D2FF] shadow-[0_0_12px_rgba(0,210,255,0.2)]">
              Computer Engineer
            </span>
            <span className="text-slate-500 font-mono text-xs">•</span>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-300">
              Full Stack Developer · Software Developer · AI Application Developer
            </span>
          </div>

          {/* Editorial Headline */}
          <div className="space-y-3">
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.02]">
              Swayam Kiran Prabhu
            </h1>
            <p className="font-display text-xl sm:text-2xl md:text-3xl text-slate-200 font-semibold tracking-tight leading-snug">
              Computer Engineer building software, AI & intelligent systems.
            </p>
          </div>

          {/* Short Supporting Paragraph */}
          <p className="text-slate-300 text-base sm:text-lg font-sans leading-relaxed max-w-xl">
            Undergraduate engineer at Padre Conceicao College of Engineering learning through building real systems — from full-stack web architectures and forensic deep learning models to agentic LLM workflows.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap pt-2">
            <ShimmerButton
              onClick={() => scrollToSection('work')}
              variant="primary"
              size="lg"
              icon={<ArrowDown className="w-4 h-4" />}
            >
              View Projects
            </ShimmerButton>

            <a
              href={`${import.meta.env.BASE_URL}resume/Swayam-Resume.pdf`}
              download="Swayam-Prabhu-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0E1738]/80 hover:bg-[#14214D] text-white border border-white/15 shadow-sm hover:shadow-md text-sm font-semibold transition-all focus-editorial hover:border-[#00D2FF]/40"
            >
              <FileDown className="w-4 h-4 text-[#00D2FF]" />
              <span>Download Resume</span>
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-2 pl-1">
              <a
                href="https://github.com/swayamprabhu2005"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#0E1738]/80 hover:bg-[#14214D] border border-white/15 text-slate-300 hover:text-white shadow-sm transition-all focus-editorial hover:border-[#00D2FF]/40"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/swayam-prabhu-b1490a287/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#0E1738]/80 hover:bg-[#14214D] border border-white/15 text-slate-300 hover:text-white shadow-sm transition-all focus-editorial hover:border-[#00D2FF]/40"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Metadata Row */}
          <div className="pt-6 border-t border-white/10 flex items-center gap-4 sm:gap-6 flex-wrap font-mono text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Goa, India
            </span>
          </div>
        </motion.div>

        {/* Right Column: Editorial Portrait (5 cols) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] group">
            {/* Vivid Flash & Kahhori Gradient Offset Backdrop */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#00D2FF]/30 via-[#DC143C]/25 to-[#FFD700]/25 rounded-3xl blur-xl -z-10 group-hover:blur-2xl transition-all" />

            {/* Portrait Frame */}
            <div className="relative w-full h-full rounded-3xl bg-[#0E1738]/90 border border-white/15 overflow-hidden shadow-2xl">
              <SecurePortrait
                src={`${import.meta.env.BASE_URL}swayam.jpeg`}
                alt="Swayam Kiran Prabhu"
                className="w-full h-full filter contrast-[1.03] transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Editorial Caption Bar in Dark Glass */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-[#0B132B]/90 backdrop-blur-md border border-white/15 shadow-lg flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-xs text-white">
                    Swayam Kiran Prabhu
                  </div>
                  <div className="font-mono text-[10px] text-slate-400">
                    Padre Conceicao College of Engineering
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
