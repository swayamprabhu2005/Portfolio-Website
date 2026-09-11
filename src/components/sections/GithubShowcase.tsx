import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  GitBranch,
  ExternalLink
} from 'lucide-react';

export const GithubShowcase: React.FC = () => {
  const featuredRepos = [
    {
      name: 'SONG-REGISTRATION (TuneVault)',
      desc: 'Full-stack song registration portal with trademark-style metadata licensing and RBAC permissions.',
      tech: 'JavaScript • Node.js • MySQL • Supabase',
      url: 'https://github.com/swayamprabhu2005/SONG-REGISTRATION',
      language: 'JavaScript',
      langColor: '#F59E0B',
    },
    {
      name: 'URBAN-GARDENING',
      desc: 'Full-stack botanical intelligence platform for automated gardening scheduling and plant records.',
      tech: 'HTML5 • CSS3 • Node.js • MySQL',
      url: 'https://github.com/swayamprabhu2005/URBAN-GARDENING',
      language: 'JavaScript',
      langColor: '#F59E0B',
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
      <div className="p-8 sm:p-10 rounded-2xl bg-white border border-gray-200/90 relative overflow-hidden shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gray-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-mono text-xs uppercase tracking-wider font-semibold">
              <Github className="w-4 h-4" />
              <span>OPEN SOURCE TELEMETRY</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 tracking-tight">
              GitHub Engineering Repositories
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm font-sans max-w-xl leading-relaxed">
              Explore public source code repositories across C++, Java, Node.js, and Python systems.
            </p>
          </div>

          <a
            href="https://github.com/swayamprabhu2005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-mono text-xs font-semibold border border-gray-200 transition-colors self-start lg:self-auto cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>@swayamprabhu2005</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
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
              className="p-5 rounded-xl bg-gray-50/70 border border-gray-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all group block shadow-none hover:shadow-sm"
            >
              <div className="flex items-center justify-between font-mono text-xs mb-2">
                <div className="flex items-center gap-2 text-gray-900 font-bold group-hover:text-blue-600 transition-colors">
                  <GitBranch className="w-3.5 h-3.5 text-blue-600" />
                  <span className="truncate">{repo.name}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
              </div>

              <p className="text-xs text-gray-600 font-sans leading-relaxed mb-4">
                {repo.desc}
              </p>

              <div className="flex items-center justify-between font-mono text-[11px] text-gray-500 pt-3 border-t border-gray-200/60">
                <div className="flex items-center gap-1.5 font-medium">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: repo.langColor }}
                  />
                  <span>{repo.language}</span>
                </div>
                <span className="text-gray-400">{repo.tech.split('•')[0]}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

