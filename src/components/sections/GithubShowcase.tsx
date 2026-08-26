import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  GitBranch,
  Star,
  ExternalLink,
  Code2,
  Terminal,
  Activity
} from 'lucide-react';
import { ShimmerCard } from '../ui/ShimmerCard';
import { ShimmerButton } from '../ui/ShimmerButton';
import { sounds } from '../ui/SoundEffects';

export const GithubShowcase: React.FC = () => {
  const featuredRepos = [
    {
      name: 'SONG-REGISTRATION (TuneVault)',
      desc: 'Full-stack song registration portal with trademark-style metadata licensing and RBAC permissions.',
      tech: 'JavaScript • Node.js • MySQL • Supabase',
      url: 'https://github.com/swayamprabhu2005/SONG-REGISTRATION',
      language: 'JavaScript',
      langColor: '#FBBF24',
    },
    {
      name: 'URBAN-GARDENING',
      desc: 'Full-stack botanical intelligence platform for automated gardening scheduling and plant records.',
      tech: 'HTML5 • CSS3 • Node.js • MySQL',
      url: 'https://github.com/swayamprabhu2005/URBAN-GARDENING',
      language: 'JavaScript',
      langColor: '#FBBF24',
    },
    {
      name: 'Online-Recipe-Book',
      desc: 'C++ object-oriented culinary management system with polymorphism and persistent fstream file handling.',
      tech: 'C++ • OOP • fstream • CLI',
      url: 'https://github.com/swayamprabhu2005/Online-Recipe-Book',
      language: 'C++',
      langColor: '#3B82F6',
    },
    {
      name: 'JAVA-STUDENT-MANAGEMENT',
      desc: 'Multi-tier Java application utilizing JDBC relational drivers for transactional student records.',
      tech: 'Java • JDBC • MySQL • CRUD',
      url: 'https://github.com/swayamprabhu2005/JAVA-STUDENT-MANAGEMENT',
      language: 'Java',
      langColor: '#EF4444',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="p-8 sm:p-10 rounded-3xl bg-[#090c14] border border-white/15 relative overflow-hidden shadow-2xl">
        {/* Background Subtle Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-widest font-semibold">
              <Github className="w-4 h-4" />
              <span>OPEN SOURCE TELEMETRY</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              GitHub Engineering Repositories
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm font-sans max-w-xl leading-relaxed">
              Explore public source code repositories across C++, Java, Node.js, and Python systems.
            </p>
          </div>

          <a
            href="https://github.com/swayamprabhu2005"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold border border-white/15 transition-all self-start lg:self-auto cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>@swayamprabhu2005</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {featuredRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.04] transition-all group block"
            >
              <div className="flex items-center justify-between font-mono text-xs mb-2">
                <div className="flex items-center gap-2 text-white font-bold group-hover:text-purple-300 transition-colors">
                  <GitBranch className="w-3.5 h-3.5 text-purple-400" />
                  <span className="truncate">{repo.name}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors shrink-0" />
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed mb-4">
                {repo.desc}
              </p>

              <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 pt-2 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: repo.langColor }}
                  />
                  <span>{repo.language}</span>
                </div>
                <span className="text-slate-500">{repo.tech.split('•')[0]}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
