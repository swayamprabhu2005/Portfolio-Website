import React, { useState } from 'react';
import { CustomCursor } from './components/ui/CustomCursor';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { CommandPalette } from './components/ui/CommandPalette';
import { Navbar } from './components/sections/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { FeaturedProjects } from './components/sections/FeaturedProjects';
import { MindSystemsSection } from './components/sections/MindSystemsSection';
import { SkillsEcosystem } from './components/sections/SkillsEcosystem';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { CertificationsGrid } from './components/sections/CertificationsGrid';
import { EducationSection } from './components/sections/EducationSection';
import { ContactSection } from './components/sections/ContactSection';
import { FlashKahhoriBackground } from './components/ui/FlashKahhoriBackground';
import { Footer } from './components/sections/Footer';

export const App: React.FC = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="relative text-white min-h-screen overflow-x-hidden selection:bg-[#00D2FF] selection:text-[#0B132B] font-sans">
      {/* 0. Ambient Joined Bubble Flash & Kahhori Theme Background */}
      <FlashKahhoriBackground />

      {/* 1. Desktop Spring Magnetic Custom Cursor */}
      <CustomCursor />

      {/* 2. Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 3. Command Palette Modal (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* 4. Floating Navigation Bar */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* 5. Main Editorial Portfolio Experience */}
      <main className="relative z-10">
        {/* Section: Hero */}
        <HeroSection />

        {/* Section 01: Engineering Narrative & Evolution */}
        <AboutSection />

        {/* Section 02: Selected Work & Production Systems */}
        <FeaturedProjects />

        {/* Section 03: Dedicated Interactive 3D Neural Brain */}
        <MindSystemsSection />

        {/* Section 04: Technology Ecosystem & Interconnected Graph */}
        <SkillsEcosystem />

        {/* Section 05: Professional Experience & Industry Simulations */}
        <ExperienceSection />

        {/* Section 06: Verified Certifications Wall & Lightbox */}
        <CertificationsGrid />

        {/* Section 07: Academic Background & IDEAS 4.0 Finalist Milestone */}
        <EducationSection />

        {/* Section 08: Contact & Direct Message Terminal */}
        <ContactSection />
      </main>

      {/* 6. Colophon Footer */}
      <Footer />
    </div>
  );
};

export default App;

