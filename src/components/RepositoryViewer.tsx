import React, { useState } from 'react';
import { Folder, FileCode, FileText, Copy, Check, Download, ExternalLink, Terminal } from 'lucide-react';
import { REPO_FILES } from '../data/repoFilesData';
import { RepoFile } from '../types';
import { STUDENT_INFO } from '../data/projectData';

interface RepositoryViewerProps {
  onDownloadZip: () => void;
  isDownloadingZip: boolean;
}

export const RepositoryViewer: React.FC<RepositoryViewerProps> = ({ onDownloadZip, isDownloadingZip }) => {
  const [selectedFile, setSelectedFile] = useState<RepoFile>(REPO_FILES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = selectedFile.content.split('\n').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Official GitHub Repository Explorer
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            Project Source Code & Architecture
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Inspect the modular Python codebase, dataset files, evaluation records, and documentation adhering to the college rubric for course ET5M004.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={STUDENT_INFO.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            <span>View on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onDownloadZip}
            disabled={isDownloadingZip}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition-all active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloadingZip ? 'Archiving...' : 'Download Full Repo (.ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* Main Code View Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* File Tree (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Folder className="w-4 h-4 text-emerald-600" />
              Repository File Tree
            </span>
            <span className="text-[11px] text-slate-500 font-mono">10 files</span>
          </div>

          <div className="p-2 space-y-1 max-h-[580px] overflow-y-auto">
            {REPO_FILES.map((file) => {
              const isSelected = selectedFile.path === file.path;
              const isPy = file.path.endsWith('.py');
              const Icon = isPy ? FileCode : FileText;

              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2.5 text-xs ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <div className="truncate flex-1">
                    <div className="truncate font-mono">{file.path}</div>
                    <div className="text-[10px] text-slate-500 truncate">{file.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Terminal Guide */}
          <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-500" />
              Local Execution Command:
            </div>
            <pre className="bg-slate-900 text-emerald-400 p-2 rounded text-[11px] font-mono overflow-x-auto">
              streamlit run source_code/app.py
            </pre>
          </div>
        </div>

        {/* Code Content Display (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 rounded-xl border border-slate-800 shadow-md overflow-hidden text-slate-200">
          {/* File Tab Header */}
          <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-emerald-400 font-semibold">
                {selectedFile.path}
              </span>
              <span className="text-[11px] text-slate-500">
                ({lineCount} lines)
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy File'}</span>
            </button>
          </div>

          {/* File Description Header */}
          <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800/80 text-xs text-slate-400">
            {selectedFile.description}
          </div>

          {/* Code Viewer with Line Numbers */}
          <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto max-h-[520px] overflow-y-auto">
            <table className="w-full border-collapse">
              <tbody>
                {selectedFile.content.split('\n').map((line, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="pr-4 select-none text-slate-600 text-right w-10 text-[11px]">
                      {idx + 1}
                    </td>
                    <td className="text-slate-200 whitespace-pre font-mono">
                      {line || ' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
