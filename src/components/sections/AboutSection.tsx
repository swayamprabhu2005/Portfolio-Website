import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      label: 'Academic Distinction',
      value: '9.3 / 10.0 CGPA',
      detail: 'Consistent top percentile at Padre Conceicao College of Engineering across core CS & systems coursework.',
    },
    {
      label: 'Production Exposure',
      value: '3x Engineering Intern',
      detail: 'Hands-on software engineering across Creative Capsule, Persistent Systems, and Bodhami.',
    },
    {
      label: 'Innovation Recognition',
      value: 'IDEAS 4.0 Finalist',
      detail: 'Recognized for engineering the IoT-Based Smart Water Quality Monitoring & Predictive Anomaly platform.',
    },
    {
      label: 'Open Source & Projects',
      value: '21 Public Repositories',
      detail: 'Deep learning forensics, agentic LLM graphs, procedural engines, and full-stack systems.',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Editorial Section Header */}
      <SectionHeading
        number="01"
        tag="ABOUT & BACKGROUND"
        title="Engineering Intelligent Software & Applied AI Systems"
        description="I am a Computer Engineering student and developer passionate about Artificial Intelligence, agentic LLM workflows, full-stack development, and algorithmic problem solving."
      />

      {/* Concise Core Statement */}
      <div className="bg-[#0E1738]/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl hover:border-[#00D2FF]/30 transition-all">
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#00D2FF] font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse" />
            Engineering Perspective
          </span>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-snug">
            &ldquo;From training deep learning models to deploying resilient web applications, I enjoy turning complex ideas into functional, scalable products.&rdquo;
          </h3>
          <p className="text-slate-300 text-base leading-relaxed font-sans">
            My work spans developing forensic computer vision models (such as spatial-frequency deepfake inspection in VeritaScan), engineering agentic LLM workflows with LangGraph and OpenAI, and architecting modern full-stack platforms with React, Node.js, and TypeScript. Grounded in strong data structures and algorithmic problem solving, I prioritize clean architectural boundaries, reproducible pipelines, and practical utility.
          </p>
        </div>

        {/* 4 Concise Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 mt-8 border-t border-white/10">
          {highlights.map((item) => (
            <div key={item.label} className="space-y-1.5 p-3 rounded-xl bg-[#091024]/60 border border-white/5">
              <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                {item.label}
              </div>
              <div className="font-display font-bold text-base text-white">
                {item.value}
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
