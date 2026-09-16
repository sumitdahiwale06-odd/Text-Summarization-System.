import React, { useState } from 'react';
import { Play, RotateCcw, Copy, Check, Download, ArrowRight, Sparkles, BookOpen, AlertCircle, BarChart3, Clock, Gauge } from 'lucide-react';
import { AlgorithmType, SummarizationResult } from '../types';
import { SAMPLE_ARTICLES, EDGE_CASES, STUDENT_INFO } from '../data/projectData';

interface SummarizerWorkbenchProps {
  inputText: string;
  setInputText: (text: string) => void;
  algorithm: AlgorithmType;
  setAlgorithm: (algo: AlgorithmType) => void;
  ratio: number;
  setRatio: (ratio: number) => void;
  maxSentences: number | undefined;
  setMaxSentences: (n: number | undefined) => void;
  result: SummarizationResult | null;
  onSummarize: () => void;
  onClear: () => void;
  onNavigateToPipeline?: () => void;
}

export const SummarizerWorkbench: React.FC<SummarizerWorkbenchProps> = ({
  inputText,
  setInputText,
  algorithm,
  setAlgorithm,
  ratio,
  setRatio,
  maxSentences,
  setMaxSentences,
  result,
  onSummarize,
  onClear,
  onNavigateToPipeline
}) => {
  const [copied, setCopied] = useState(false);
  const [showSentenceHighlights, setShowSentenceHighlights] = useState(true);

  const handleCopySummary = () => {
    if (!result?.summary) return;
    navigator.clipboard.writeText(result.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!result?.summary) return;
    const content = `TEXT SUMMARIZATION SYSTEM - OUTPUT SUMMARY\nStudent: ${STUDENT_INFO.name} (${STUDENT_INFO.rollNo})\nCourse: ${STUDENT_INFO.course}\nAlgorithm: ${result.algorithmUsed.toUpperCase()}\n\n--- SUMMARY ---\n${result.summary}\n\n--- STATISTICS ---\nOriginal Words: ${result.originalWordCount}\nSummary Words: ${result.summaryWordCount}\nCompression Ratio: ${result.compressionRatio}%\nLength Reduction: ${result.reductionPercentage}%\nSentences Retained: ${result.summarySentenceCount} of ${result.originalSentenceCount}\nFlesch Reading Ease: ${result.fleschScore}\nLatency: ${result.executionTimeMs} ms\n`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary_${result.algorithmUsed}_output.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCount = inputText.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Introduction Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Interactive Academic Demonstration Workbench
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Extractive Text Summarization Engine
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              Select or paste any article to run an authentic Natural Language Processing pipeline: 
              <strong> Tokenization → Stop-word Filtering → TF-IDF / Frequency Feature Extraction → Sentence Scoring → Chronological Re-ordering</strong>.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 flex flex-col gap-1 min-w-[220px]">
            <div className="font-semibold text-slate-800">Academic Submission:</div>
            <div>Student: <span className="font-medium text-slate-900">{STUDENT_INFO.name}</span></div>
            <div>Roll No: <span className="font-medium text-slate-900">{STUDENT_INFO.rollNo}</span></div>
            <div>Course: <span className="font-medium text-slate-900">{STUDENT_INFO.course}</span></div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Controls & Input, Right Output & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input & Configuration (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Controls Bar */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              1. NLP Algorithm & Length Parameters
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Algorithm Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Extractive Scoring Algorithm:
                </label>
                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="tfidf">TF-IDF Centroid Similarity (Recommended)</option>
                  <option value="frequency">Normalized Word Frequency Scoring</option>
                  <option value="textrank">TextRank Graph Centrality (PageRank)</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  {algorithm === 'tfidf' && 'Evaluates sentence vectors against document centroid using sub-linear TF-IDF.'}
                  {algorithm === 'frequency' && 'Scores sentences via normalized vocabulary frequencies with length normalization.'}
                  {algorithm === 'textrank' && 'Builds sentence affinity cosine graph and solves for stationary centrality.'}
                </p>
              </div>

              {/* Summary Ratio Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Summary Length / Compression Target:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { label: 'Short (20%)', val: 0.20 },
                    { label: 'Medium (35%)', val: 0.35 },
                    { label: 'Detailed (50%)', val: 0.50 }
                  ].map(preset => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setRatio(preset.val);
                        setMaxSentences(undefined);
                      }}
                      className={`text-xs py-2 px-1 rounded-md font-medium text-center transition-all ${
                        ratio === preset.val && maxSentences === undefined
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
                  <span>Target ratio: <strong>{Math.round(ratio * 100)}%</strong> of sentences</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (maxSentences) setMaxSentences(undefined);
                      else setMaxSentences(3);
                    }}
                    className="text-emerald-600 hover:underline"
                  >
                    {maxSentences ? 'Use % ratio instead' : 'Set explicit sentence count'}
                  </button>
                </div>
              </div>
            </div>

            {maxSentences !== undefined && (
              <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-700">Sentence Cap:</span>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={maxSentences}
                  onChange={(e) => setMaxSentences(parseInt(e.target.value))}
                  className="w-48 accent-emerald-600"
                />
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {maxSentences} sentences
                </span>
              </div>
            )}
          </div>

          {/* Sample Article & Quick Test Bar */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                2. Load Curated Dataset Articles:
              </span>
              <span className="text-[11px] text-slate-500">From dataset/sample_articles.txt</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {SAMPLE_ARTICLES.map(art => (
                <button
                  key={art.id}
                  type="button"
                  onClick={() => setInputText(art.text)}
                  className="text-xs px-2.5 py-1.5 bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-200 rounded-lg text-slate-700 transition-colors shadow-2xs text-left"
                >
                  <span className="font-semibold">{art.category}:</span> {art.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Edge Cases */}
            <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">Edge Case Bench:</span>
              {EDGE_CASES.map(ec => (
                <button
                  key={ec.label}
                  type="button"
                  onClick={() => setInputText(ec.text)}
                  className="text-[11px] px-2 py-0.5 bg-slate-200/70 hover:bg-slate-300 rounded text-slate-700 transition-colors"
                >
                  {ec.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Input Area */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-900">
                Source Document / Input Text
              </label>
              <div className="text-xs text-slate-500 flex items-center gap-3">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>{charCount} characters</span>
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste any article, research excerpt, technical documentation, or educational text here..."
              rows={9}
              className="w-full text-xs leading-relaxed font-mono bg-slate-50/50 border border-slate-300 rounded-lg p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-y"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onSummarize}
                  disabled={!inputText.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-900/20 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Generate Summary</span>
                </button>

                <button
                  type="button"
                  onClick={onClear}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>

              {result && onNavigateToPipeline && (
                <button
                  type="button"
                  onClick={onNavigateToPipeline}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  <span>Inspect Pipeline Steps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Generated Summary & Analytics (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {result ? (
            <>
              {/* Quantitative Metrics Bar */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    Quantitative Evaluation Metrics
                  </h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {result.executionTimeMs} ms
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-slate-900">{result.originalWordCount}</div>
                    <div className="text-[10px] uppercase font-semibold text-slate-500 mt-0.5">Original Words</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-emerald-700">{result.summaryWordCount}</div>
                    <div className="text-[10px] uppercase font-semibold text-slate-500 mt-0.5">Summary Words</div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-emerald-800">{result.compressionRatio}%</div>
                    <div className="text-[10px] uppercase font-semibold text-emerald-700 mt-0.5">Compression</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-slate-900">{result.reductionPercentage}%</div>
                    <div className="text-[10px] uppercase font-semibold text-slate-500 mt-0.5">Reduction</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-slate-400" />
                    Sentences Retained: <strong>{result.summarySentenceCount} of {result.originalSentenceCount}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Flesch Reading Ease: <strong>{result.fleschScore}</strong>
                  </span>
                </div>
              </div>

              {/* Generated Extractive Summary Card */}
              <div className="bg-white rounded-xl border-2 border-emerald-500/30 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <h3 className="text-base font-bold text-slate-900">
                      Generated Extractive Summary
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadTxt}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                      title="Download summary text file"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>.txt</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-lg text-xs leading-relaxed text-slate-800 font-sans shadow-inner">
                  {result.summary}
                </div>

                <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-200 flex items-center justify-between">
                  <span>Method: <strong>{result.algorithmUsed.toUpperCase()}</strong></span>
                  <span>Order: <strong>Chronological (Preserved)</strong></span>
                </div>
              </div>

              {/* Original Document with Extracted Sentences Highlighted */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Source Text with Extracted Sentences
                  </h4>
                  <label className="text-xs flex items-center gap-1.5 text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showSentenceHighlights}
                      onChange={(e) => setShowSentenceHighlights(e.target.checked)}
                      className="rounded text-emerald-600 accent-emerald-600"
                    />
                    <span>Highlight Selected</span>
                  </label>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg text-xs leading-relaxed max-h-64 overflow-y-auto font-sans text-slate-700 border border-slate-200">
                  {result.sentenceDetails.map((sent) => (
                    <span
                      key={sent.index}
                      className={
                        showSentenceHighlights && sent.selected
                          ? 'bg-emerald-200 text-emerald-950 font-medium px-1 py-0.5 rounded mx-0.5'
                          : 'mx-0.5 text-slate-600'
                      }
                      title={`Sentence #${sent.index + 1} | Score: ${sent.score} | Rank: #${sent.rank}`}
                    >
                      {sent.originalText}{' '}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  * Green highlighted sentences were mathematically scored and selected in the final summary.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 border-dashed p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Sparkles className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">
                No Summary Generated Yet
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Select a sample article from the left or type your own text, then click <strong>Generate Summary</strong> to view results and statistics.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
