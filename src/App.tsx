import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SummarizerWorkbench } from './components/SummarizerWorkbench';
import { AlgorithmType, SummarizationResult } from './types';
import { executeSummarization } from './nlpEngine';
import { SAMPLE_ARTICLES, STUDENT_INFO } from './data/projectData';
import { ExternalLink, Github } from 'lucide-react';

export function App() {
  const [inputText, setInputText] = useState<string>(SAMPLE_ARTICLES[0].text);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('tfidf');
  const [ratio, setRatio] = useState<number>(0.35);
  const [maxSentences, setMaxSentences] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<SummarizationResult | null>(null);

  // Generate initial summary on first load
  useEffect(() => {
    if (inputText.trim()) {
      const initialRes = executeSummarization(inputText, algorithm, ratio, maxSentences);
      setResult(initialRes);
    }
  }, []);

  const handleSummarize = () => {
    if (!inputText.trim()) return;
    const res = executeSummarization(inputText, algorithm, ratio, maxSentences);
    setResult(res);
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      {/* Top Academic Header */}
      <Navbar />

      {/* Main Single-View Summarization Workbench */}
      <main className="flex-1">
        <SummarizerWorkbench
          inputText={inputText}
          setInputText={setInputText}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          ratio={ratio}
          setRatio={setRatio}
          maxSentences={maxSentences}
          setMaxSentences={setMaxSentences}
          result={result}
          onSummarize={handleSummarize}
          onClear={handleClear}
        />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-white py-6 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-slate-400">
            <span className="font-semibold text-slate-200">{STUDENT_INFO.name}</span>
            <span>•</span>
            <span>Roll No: {STUDENT_INFO.rollNo}</span>
            <span>•</span>
            <span>{STUDENT_INFO.course}</span>
            <span>•</span>
            <span>{STUDENT_INFO.branch}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={STUDENT_INFO.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
