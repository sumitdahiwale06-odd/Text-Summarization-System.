import React, { useState } from 'react';
import { Layers, ArrowDown, Hash, Filter, Calculator, ListOrdered, CheckCircle2, XCircle, Info } from 'lucide-react';
import { SummarizationResult } from '../types';

interface PipelineInspectorProps {
  result: SummarizationResult | null;
  onReturnToWorkbench: () => void;
}

export const PipelineInspector: React.FC<PipelineInspectorProps> = ({ result, onReturnToWorkbench }) => {
  const [activeStep, setActiveStep] = useState<number>(5);

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <Layers className="w-6 h-6 text-emerald-600" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">No NLP Pipeline Data</h3>
        <p className="text-xs text-slate-500">
          Please run a summarization on the Summarizer Workbench first to inspect intermediate pipeline states.
        </p>
        <button
          onClick={onReturnToWorkbench}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold"
        >
          Go to Workbench
        </button>
      </div>
    );
  }

  const steps = [
    { id: 1, title: 'Input Normalization', icon: Hash, desc: 'Sanitizes raw characters & standardizes whitespace' },
    { id: 2, title: 'Sentence Tokenization', icon: ListOrdered, desc: 'Segments document while preserving original casing' },
    { id: 3, title: 'Word Tokenization & Stopwords', icon: Filter, desc: 'Lowercases & strips 179 non-informative stop words' },
    { id: 4, title: 'Feature Extraction Matrix', icon: Calculator, desc: 'Computes TF-IDF vectors & term frequency weights' },
    { id: 5, title: 'Sentence Scoring & Ranking', icon: Layers, desc: 'Calculates importance scores and ranks sentences' },
    { id: 6, title: 'Chronological Assembly', icon: CheckCircle2, desc: 'Restores selected sentences to original sequence' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Under-the-Hood NLP Pipeline Inspector
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Linguistic & Mathematical Pipeline Breakdown
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              Step-by-step verification of text transformation from raw natural language strings to vector representations, 
              mathematical scoring matrices, and the final synthesized extractive summary.
            </p>
          </div>

          <div className="text-xs text-right bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500">Scoring Engine:</span>{' '}
            <strong className="text-slate-900 uppercase font-mono">{result.algorithmUsed}</strong>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Execution Time: {result.executionTimeMs} ms
            </div>
          </div>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-6 pt-6 border-t border-slate-100">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCurrent = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-3 rounded-lg text-left transition-all border ${
                  isCurrent
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold mb-1">
                  <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-emerald-600'}`} />
                  <span>Step {step.id}</span>
                </div>
                <div className={`text-[11px] font-bold truncate ${isCurrent ? 'text-white' : 'text-slate-900'}`}>
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content Details */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* Step 1: Input Normalization */}
        {activeStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">1</span>
              <h3 className="text-base font-bold text-slate-900">Step 1: Text Sanitization & Normalization</h3>
            </div>
            <p className="text-xs text-slate-600">
              Raw text entered by users often contains carriage returns, variable line breaks, non-printable control characters, 
              and erratic spacing. Normalization strips noise while strictly preserving sentence-ending punctuation marks (<code className="bg-slate-100 px-1 py-0.5 rounded">. ! ?</code>) 
              vital for boundary disambiguation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div className="text-slate-500 font-semibold mb-1">Original Characters:</div>
                <div className="text-xl font-bold text-slate-900">{result.originalWordCount * 6} (approx)</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div className="text-slate-500 font-semibold mb-1">Original Words:</div>
                <div className="text-xl font-bold text-slate-900">{result.originalWordCount} words</div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 text-xs">
                <div className="text-emerald-700 font-semibold mb-1">Identified Sentences:</div>
                <div className="text-xl font-bold text-emerald-800">{result.originalSentenceCount} sentences</div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Sentence Tokenization */}
        {activeStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">2</span>
              <h3 className="text-base font-bold text-slate-900">Step 2: Sentence Tokenization (Preserving Output Casing)</h3>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
              <span>
                <strong>Academic Distinction:</strong> In Extractive Summarization, we preserve the original typography, capitalization, 
                and punctuation of each sentence. Unlike text classification, we must never lowercase the sentences intended for the final summary.
              </span>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <div className="bg-slate-100 px-4 py-2.5 font-bold text-slate-700 border-b border-slate-200 flex justify-between">
                <span>Sentence Index</span>
                <span>Segmented Sentence Text</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                {result.originalSentences.map((sent, idx) => (
                  <div key={idx} className="p-3 flex items-start gap-3 hover:bg-slate-50">
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] shrink-0">
                      S_{idx + 1}
                    </span>
                    <span className="text-slate-800 leading-relaxed">{sent}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Word Tokenization & Stopwords */}
        {activeStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">3</span>
              <h3 className="text-base font-bold text-slate-900">Step 3: Word Tokenization & Stop-Word Filtering</h3>
            </div>
            <p className="text-xs text-slate-600">
              Each sentence is tokenized into word tokens, lowercased, and filtered against NLTK's standard English 179 stopword lexicon. 
              High-frequency function words like <em>'the', 'is', 'and', 'in'</em> are filtered out so that only salient topical keywords contribute to sentence scores.
            </p>

            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <div className="bg-slate-100 px-4 py-2 font-bold text-slate-700 border-b border-slate-200">
                Sentence Breakdown: Kept Content Keywords vs Filtered Length
              </div>
              <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                {result.sentenceDetails.map((item) => (
                  <div key={item.index} className="p-3 space-y-1.5 hover:bg-slate-50">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-700">Sentence #{item.index + 1}</span>
                      <span className="text-[11px] text-slate-500">
                        {item.cleanedTokens.length} content tokens
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.cleanedTokens.map((token, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-mono text-[11px] border border-slate-200"
                        >
                          {token}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Feature Extraction Matrix */}
        {activeStep === 4 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">4</span>
              <h3 className="text-base font-bold text-slate-900">Step 4: Feature Weights & Salient Keywords</h3>
            </div>
            <p className="text-xs text-slate-600">
              Calculated term frequency and TF-IDF weights identify the most critical keywords across the document. 
              Sentences containing these high-weight terms are rewarded during importance scoring.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Top 10 High-Weight Keywords
                </h4>
                <div className="space-y-2">
                  {result.topKeywords.map((kw, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="font-mono font-medium text-slate-800">{kw.word}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full"
                            style={{ width: `${Math.min(100, kw.weight * 100)}%` }}
                          />
                        </div>
                        <span className="font-mono text-slate-600 text-[11px] w-10 text-right">{kw.weight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3 text-xs text-slate-600">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Mathematical Formulas Applied
                </h4>
                <div className="space-y-2 font-mono text-[11px] bg-white p-3 rounded border border-slate-200">
                  <div>TF(t, s) = count(t in s) / total_words(s)</div>
                  <div>IDF(t, D) = log((N + 1) / (DF(t) + 1)) + 1</div>
                  <div>TF-IDF = TF(t, s) * IDF(t, D)</div>
                  <div>Cosine Similarity = (v_s · v_centroid) / (|v_s| * |v_centroid|)</div>
                </div>
                <p className="text-[11px] text-slate-500">
                  High TF-IDF terms represent rare, defining concepts. Words that appear in every sentence receive an IDF of 0, effectively muting redundant phrases.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Sentence Scoring & Ranking */}
        {activeStep === 5 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">5</span>
              <h3 className="text-base font-bold text-slate-900">Step 5: Sentence Importance Ranking Matrix</h3>
            </div>
            <p className="text-xs text-slate-600">
              Every sentence in the document is scored by the selected extractive NLP model. 
              The table below lists all sentences sorted by their importance rank, showing which sentences were selected for the summary.
            </p>

            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left divide-y divide-slate-200">
                <thead className="bg-slate-100 text-slate-700 font-semibold">
                  <tr>
                    <th className="px-3 py-2.5">Rank</th>
                    <th className="px-3 py-2.5">ID</th>
                    <th className="px-3 py-2.5">Score</th>
                    <th className="px-3 py-2.5">Status</th>
                    <th className="px-3 py-2.5">Sentence Excerpt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[...result.sentenceDetails]
                    .sort((a, b) => a.rank - b.rank)
                    .map((item) => (
                      <tr
                        key={item.index}
                        className={item.selected ? 'bg-emerald-50/70 font-medium' : 'hover:bg-slate-50'}
                      >
                        <td className="px-3 py-2.5 font-bold">
                          #{item.rank}
                        </td>
                        <td className="px-3 py-2.5 font-mono text-slate-500">
                          S_{item.index + 1}
                        </td>
                        <td className="px-3 py-2.5 font-mono text-emerald-700">
                          {item.score.toFixed(4)}
                        </td>
                        <td className="px-3 py-2.5">
                          {item.selected ? (
                            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Selected
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                              <XCircle className="w-3 h-3 text-slate-400" />
                              Omitted
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2.5 text-slate-800 max-w-lg truncate">
                          {item.originalText}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Step 6: Chronological Re-ordering */}
        {activeStep === 6 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">6</span>
              <h3 className="text-base font-bold text-slate-900">Step 6: Chronological Re-Ordering & Summary Generation</h3>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-2 text-emerald-900">
              <div className="font-bold flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-700" />
                Why is Chronological Re-Ordering Mandatory in Extractive Summarization?
              </div>
              <p>
                Sentences are selected according to their importance rank (highest score first). However, concatenating sentences directly in rank order (e.g., Sentence #7 followed by Sentence #2) 
                destroys narrative continuity, introduces pronoun disconnects, and produces incomprehensible summaries.
              </p>
              <p className="font-semibold">
                Our system takes the subset of selected sentences and sorts them back into original document sequence (<code className="bg-emerald-100 px-1 rounded">i_1 &lt; i_2 &lt; ... &lt; i_k</code>) before producing the final text.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-700">Final Assembled Summary:</div>
              <p className="text-xs leading-relaxed text-slate-800 bg-white p-3 rounded border border-slate-200">
                {result.summary}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
