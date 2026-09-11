import React from 'react';

/**
 * FlashKahhoriBackground
 * 
 * Implements the color theme palette from "Portfolio Flash and Kahhori theme color Pallets.docx":
 * - Space Void / Dark Navy (#0B132B) -> Deep cosmic base
 * - Deep Crimson Red (#8B0000) -> The Flash primary suit
 * - Bright Scarlet (#DC143C) -> The Flash vibrant lightning/accent
 * - Tesseract Cosmic Blue (#00D2FF) -> Kahhori glowing cosmic energy
 * - Lightning Gold / Yellow (#FFD700) -> Speedster lightning sparks
 */
export const FlashKahhoriBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-[#0B132B]"
    >
      {/* 1. Base Gradient Foundation */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B] via-[#091024] to-[#060B18] opacity-95" />

      {/* 2. Ambient Joined Bubble Cluster Container */}
      <div className="absolute inset-0 filter blur-[60px] sm:blur-[85px] opacity-75 sm:opacity-85 mix-blend-screen">
        {/* --- Top Viewport (Hero & About) Joined Bubble Cluster --- */}
        {/* Kahhori Cosmic Blue Giant Bubble */}
        <div className="absolute -top-24 -left-20 w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full bg-gradient-to-tr from-[#00D2FF] via-[#0099FF] to-[#0B132B] animate-bubble-float-1" />

        {/* The Flash Bright Scarlet Energy Bubble (Joined to Blue) */}
        <div className="absolute -top-10 left-[22%] w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full bg-gradient-to-br from-[#DC143C] via-[#8B0000] to-transparent animate-bubble-float-2" />

        {/* The Flash Deep Crimson Red Primary Bubble (Top Right) */}
        <div className="absolute -top-20 -right-24 w-[450px] sm:w-[620px] h-[450px] sm:h-[620px] rounded-full bg-gradient-to-bl from-[#8B0000] via-[#DC143C] to-[#0B132B] animate-bubble-float-3" />

        {/* Speedster Lightning Gold Electric Spark Connector Bubble */}
        <div className="absolute top-48 left-[45%] w-[260px] sm:w-[380px] h-[260px] sm:h-[380px] rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#DC143C] opacity-70 animate-bubble-float-4" />

        {/* --- Mid Viewport (Featured Projects & Mind Systems) Bubble Cluster --- */}
        {/* Kahhori Cosmic Blue Mid Orb */}
        <div className="absolute top-[32%] -right-16 w-[400px] sm:w-[560px] h-[400px] sm:h-[560px] rounded-full bg-gradient-to-l from-[#00D2FF] via-[#0080FF] to-transparent animate-bubble-float-2" />

        {/* The Flash Deep Crimson Mid Orb (Joined with Cosmic Blue) */}
        <div className="absolute top-[38%] left-[5%] w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] rounded-full bg-gradient-to-tr from-[#8B0000] via-[#DC143C] to-[#0B132B] animate-bubble-float-1" />

        {/* Gold Bridge Orb in Mid Section */}
        <div className="absolute top-[45%] left-[40%] w-[240px] sm:w-[340px] h-[240px] sm:h-[340px] rounded-full bg-gradient-to-br from-[#FFD700] via-[#DC143C] to-transparent opacity-65 animate-bubble-float-3" />

        {/* --- Lower Viewport (Skills, Experience, Credentials) Bubble Cluster --- */}
        {/* Bright Scarlet Speedster Orb */}
        <div className="absolute top-[65%] -left-20 w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full bg-gradient-to-r from-[#DC143C] via-[#8B0000] to-transparent animate-bubble-float-4" />

        {/* Kahhori Tesseract Blue Orb */}
        <div className="absolute top-[70%] right-[10%] w-[440px] sm:w-[600px] h-[440px] sm:h-[600px] rounded-full bg-gradient-to-tl from-[#00D2FF] via-[#0066CC] to-[#0B132B] animate-bubble-float-1" />

        {/* --- Footer & Contact Section Bubble Cluster --- */}
        {/* Deep Crimson Base Bubble */}
        <div className="absolute -bottom-24 left-[15%] w-[480px] sm:w-[650px] h-[480px] sm:h-[650px] rounded-full bg-gradient-to-t from-[#8B0000] via-[#DC143C] to-transparent animate-bubble-float-3" />

        {/* Kahhori Blue Cosmic Trail at Bottom */}
        <div className="absolute -bottom-20 right-[5%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-gradient-to-t from-[#00D2FF] via-[#0B132B] to-transparent animate-bubble-float-2" />

        {/* Lightning Gold Anchor */}
        <div className="absolute -bottom-10 left-[48%] w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-transparent opacity-60 animate-bubble-float-4" />
      </div>

      {/* 3. High-Tech Subtle Cosmic Grid Pattern for Visual Texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] pointer-events-none" />

      {/* 4. Subtle Vignette for Cinematic Focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(6,11,24,0.65)_100%)] pointer-events-none" />
    </div>
  );
};
