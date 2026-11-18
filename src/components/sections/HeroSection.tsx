import React from 'react';
import { HeroGlassShards } from '../ui/HeroGlassShards';

interface HeroSectionProps {
  onOpenResumeModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResumeModal }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-0 md:min-h-[80vh] lg:min-h-[88vh] flex items-center justify-center pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-20 pointer-events-none" />

      {/* 3-Shard Assembling Glass Container */}
      <div className="relative z-10 w-full">
        <HeroGlassShards
          onOpenResumeModal={onOpenResumeModal}
          scrollToSection={scrollToSection}
        />
      </div>
    </section>
  );
};
