import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { STUDENT_INFO } from '../data/projectData';

export const Navbar: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      {/* Top Academic Credential Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Academic NLP Project (ET5M004)
          </span>
          <span className="text-slate-400 hidden sm:inline">
            V Semester B.Tech | ETC Engineering
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-300">
          <div>
            <span className="text-slate-400">Student: </span>
            <strong className="text-white font-semibold">{STUDENT_INFO.name}</strong>
            <span className="text-slate-400 ml-1.5">({STUDENT_INFO.rollNo})</span>
          </div>
          <a
            href={STUDENT_INFO.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-900/30">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Text Summarization System
              <span className="text-xs font-normal px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Workbench
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Department of Electronics & Telecommunication Engineering • Extractive Summarization Engine
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
