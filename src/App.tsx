import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { CommandPalette } from './components/ui/CommandPalette';
import { Navbar } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { MindSystemsSection } from './components/sections/MindSystemsSection';
import { SkillsEcosystem } from './components/sections/SkillsEcosystem';
import { FeaturedProjects } from './components/sections/FeaturedProjects';
import { CurrentlyBuilding } from './components/sections/CurrentlyBuilding';
import { InternshipsSection } from './components/sections/InternshipsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { CertificationsGrid } from './components/sections/CertificationsGrid';
import { EducationSection } from './components/sections/EducationSection';
import { GithubShowcase } from './components/sections/GithubShowcase';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/sections/Footer';

export const App: React.FC = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // Quick minimal technical boot sequence (<800ms)
    const timer = setTimeout(() => {
      setBooting(false);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-[#060709] text-[#F8FAFC] min-h-screen overflow-x-hidden selection:bg-purple-600 selection:text-white font-sans">
      {/* 1. Desktop Spring Magnetic Custom Cursor */}
      <CustomCursor />

      {/* 2. Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 3. Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* 4. Minimal Technical Boot Flash */}
      <AnimatePresence>
        {booting && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 bg-[#060709] flex flex-col items-center justify-center font-mono text-xs text-purple-400 pointer-events-none"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>INITIALIZING SWAYAM PRABHU SYSTEMS...</span>
            </div>
            <div className="text-[10px] text-slate-500">
              CORE 3D & NEURAL ENGINE READY
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Floating Navigation Bar */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* 6. Main Portfolio Experience */}
      <main className="relative z-10">
        {/* Section: Hero */}
        <HeroSection />

        {/* Section 01: Engineering Narrative & Evolution */}
        <AboutSection />

        {/* Section 02: Dedicated Interactive 3D Neural Brain */}
        <MindSystemsSection />

        {/* Section 03: Technology Ecosystem & Interconnected Graph */}
        <SkillsEcosystem />

        {/* Section 04: Featured Work & Live VeritaScan AI Simulator */}
        <FeaturedProjects />

        {/* Section 05: Currently Building - Automotive Black Box (BITS Pilani Goa) */}
        <CurrentlyBuilding />

        {/* Section 06: Current Professional Internships (Creative Capsule) */}
        <InternshipsSection />

        {/* Section: Previous Virtual Simulations */}
        <ExperienceSection />

        {/* Section 07: Verified Certifications Wall */}
        <CertificationsGrid />

        {/* Section 08: Education & IDEAS 4.0 Finalist Milestone */}
        <EducationSection />

        {/* Open Source Telemetry & Repositories */}
        <GithubShowcase />

        {/* Section 09: Contact & Direct Message Terminal */}
        <ContactSection />
      </main>

      {/* 7. Colophon Footer */}
      <Footer />
    </div>
  );
};

export default App;
