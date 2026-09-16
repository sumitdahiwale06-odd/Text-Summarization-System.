import React, { useState } from 'react';
import { Award, Mic, Volume2, Copy, Check, ChevronDown, ChevronUp, Search, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { VIVA_QUESTIONS, TWO_MINUTE_PITCH, FIVE_MINUTE_EXPLANATION, STUDENT_INFO } from '../data/projectData';

export const VivaVoceGuide: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'pitch' | 'technical' | 'questions'>('technical');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedTech, setCopiedTech] = useState(false);

  const categories = ['All', 'NLP Fundamentals', 'Methodology & Math', 'Tools & Libraries', 'Engineering & Git', 'Evaluation & Defense'];

  const filteredQuestions = VIVA_QUESTIONS.filter((q) => {
    const matchesCat = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(TWO_MINUTE_PITCH.trim());
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const handleCopyTech = () => {
    navigator.clipboard.writeText(FIVE_MINUTE_EXPLANATION.trim());
    setCopiedTech(true);
    setTimeout(() => setCopiedTech(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Exam & Viva Voce Defense Center
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-2">
              Comprehensive Viva Preparation & Technical Presentation
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl">
              Prepared specifically for <strong>{STUDENT_INFO.name}</strong> (Roll No: <strong>{STUDENT_INFO.rollNo}</strong>) 
              for the V Semester ETC Natural Language Processing course evaluation.
            </p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 shrink-0">
            <button
              onClick={() => setActiveSubTab('technical')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeSubTab === 'technical' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              5-Min Technical Defense
            </button>
            <button
              onClick={() => setActiveSubTab('pitch')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeSubTab === 'pitch' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2-Min Project Pitch
            </button>
            <button
              onClick={() => setActiveSubTab('questions')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeSubTab === 'questions' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Viva Q&A Bank ({VIVA_QUESTIONS.length})
            </button>
          </div>
        </div>
      </div>

      {/* 5-Minute Technical Defense View */}
      {activeSubTab === 'technical' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <Mic className="w-4 h-4" />
                <span>5-MINUTE IN-DEPTH TECHNICAL WALKTHROUGH (SECTION 27)</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Step-by-Step Technical Defense for Evaluators
              </h3>
            </div>

            <button
              onClick={handleCopyTech}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              {copiedTech ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTech ? 'Copied!' : 'Copy Script'}</span>
            </button>
          </div>

          <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg text-slate-900">
              <strong className="block text-emerald-900 font-bold mb-1">Pillar 1: Introduction & Academic Context</strong>
              "Respected examiners, my name is Sumit Dahiwale, Roll No. BT240017ET, V Semester Electronics and Telecommunication Engineering. 
              I am presenting my Natural Language Processing project titled <em>'Text Summarization System'</em> for course ET5M004. 
              The project is publicly available on GitHub at <code>github.com/sumitdahiwale06-odd/text-summarization-system</code>."
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <strong className="block text-slate-900 font-bold">Pillar 2: Problem Definition & Motivation</strong>
              <p>
                In the telecommunications and computing sectors, massive streams of unstructured technical documents, news broadcasts, 
                and research literature lead to cognitive fatigue and information overload. Our objective is to design an automated 
                semantic compression engine that accepts arbitrary raw text and distills it into a concise, readable summary retaining all salient key points.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <strong className="block text-slate-900 font-bold">Pillar 3: The Architectural Rationale — Why Extractive Summarization?</strong>
              <p>
                Unlike generative abstractive summarization models that synthesize novel phrasing and frequently hallucinate unsubstantiated claims, 
                our extractive approach guarantees 100% factual accuracy and grammatical validity. Every sentence in our output is an authentic sentence 
                from the original text. Furthermore, it runs instantaneously on standard CPU hardware with complete mathematical explainability.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <strong className="block text-slate-900 font-bold">Pillar 4: Dual-Tier NLP Preprocessing Pipeline</strong>
              <p>
                In <code>preprocessing.py</code>, we implement a two-tier tokenization pipeline:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
                <li><strong>Sentence Tokenization:</strong> Divides raw input into grammatical sentences, strictly preserving original casing, commas, and punctuation for the final summary.</li>
                <li><strong>Word Tokenization & Stop-Word Filtering:</strong> Converts words to lowercase and filters against NLTK's 179 English stop words (like 'the', 'is', 'at'). Only content words survive for mathematical feature scoring.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <strong className="block text-slate-900 font-bold">Pillar 5: Mathematical Feature Extraction & Scoring Models</strong>
              <p>
                In <code>summarizer.py</code>, we developed three distinct scoring models:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
                <li><strong>Word Frequency Scoring:</strong> Sums normalized term weights with length normalization (<code className="bg-slate-100 px-1 py-0.5 rounded">score / sqrt(len)</code>) to prevent long sentences from monopolizing scores.</li>
                <li><strong>TF-IDF Centroid Similarity:</strong> Builds TF-IDF vectors for each sentence using scikit-learn, constructs the document centroid vector, and calculates sentence-to-document cosine similarity.</li>
                <li><strong>TextRank:</strong> Constructs a graph of sentences connected by cosine similarity and executes PageRank power iterations with damping factor 0.85 until convergence.</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <strong className="block text-slate-900 font-bold">Pillar 6: Chronological Re-Ordering (Guaranteed Discourse Coherence)</strong>
              <p>
                A classic flaw in naive extractive systems is sorting sentences by rank, which causes sentence #8 to appear before sentence #2. 
                Our engine tracks the original document indices and sorts the selected subset back into ascending chronological order (<code className="bg-slate-100 px-1 py-0.5 rounded">i_1 &lt; i_2 &lt; ... &lt; i_k</code>). 
                This maintains the author's logical progression and eliminates discourse disorientation.
              </p>
            </div>

            <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg text-slate-900">
              <strong className="block text-emerald-900 font-bold mb-1">Pillar 7: Empirical Results & Conclusion</strong>
              "We benchmarked our system across AI, 5G wireless networks, healthcare, and renewable energy. At 35% ratio, the average length reduction is 59.9% with an average execution latency of under 15 milliseconds on CPU. The project is fully documented in README.md with 13 progressive commits on GitHub. Thank you, and I look forward to your questions."
            </div>
          </div>
        </div>
      )}

      {/* 2-Minute Project Pitch View */}
      {activeSubTab === 'pitch' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <Volume2 className="w-4 h-4" />
                <span>2-MINUTE ELEVATOR PITCH FOR FAST-PACED VIVA SESSIONS</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Concise, High-Impact Summary for Viva Opening
              </h3>
            </div>

            <button
              onClick={handleCopyPitch}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPitch ? 'Copied!' : 'Copy Pitch'}</span>
            </button>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-xs text-slate-800 leading-relaxed space-y-4">
            <p>
              "Good morning, respected examiners. My name is <strong>Sumit Dahiwale</strong>, Roll Number <strong>BT240017ET</strong>, 
              V Semester Electronics and Telecommunication Engineering. I am presenting my Natural Language Processing project titled 
              <strong> 'Text Summarization System'</strong> for course <strong>ET5M004</strong>.
            </p>
            <p>
              The core objective of this project is to build an automated extractive text summarization system that accepts long articles, 
              technical papers, or news reports, and distills them into a concise, readable summary retaining the most essential topical information.
            </p>
            <p>
              Our NLP pipeline operates across modular stages: First, input text is cleaned and tokenized through a dual-tier mechanism—preserving 
              sentence casing for output presentation while extracting lowercase content words filtered against 179 NLTK English stop words. 
              Second, we implemented three distinct scoring algorithms: Normalized Word Frequency, TF-IDF Centroid Similarity, and TextRank graph centrality. 
              Finally, the top K sentences are selected and re-ordered chronologically to guarantee narrative coherence.
            </p>
            <p>
              The application is implemented in Python with Streamlit and scikit-learn, and maintained on GitHub with 13 progressive commits. Thank you."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900">
              <strong>Speaking Pace:</strong> ~130 words per minute (approx. 110 seconds total).
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
              <strong>Tone:</strong> Confident, technical, and precise.
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-700">
              <strong>Key Emphasis:</strong> Extractive accuracy, dual-tier tokenization, chronological re-ordering.
            </div>
          </div>
        </div>
      )}

      {/* Viva Q&A Bank View */}
      {activeSubTab === 'questions' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search viva questions or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <span className="text-xs text-slate-500 font-medium self-end sm:self-center">
                Showing {filteredQuestions.length} of {VIVA_QUESTIONS.length} Questions
              </span>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Q&A Accordion List */}
          <div className="space-y-3">
            {filteredQuestions.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-200">
                        Q{item.id}
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          {item.category}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {item.question}
                        </h4>
                      </div>
                    </div>

                    <div className="text-slate-400 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 pt-0 border-t border-slate-100 space-y-3 text-xs bg-slate-50/50">
                      <div className="text-slate-700 leading-relaxed mt-3">
                        {item.answer}
                      </div>

                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-emerald-950">One-Line Viva Takeaway: </strong>
                          <span>{item.keyTakeaway}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
