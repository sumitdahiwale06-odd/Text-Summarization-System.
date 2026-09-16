export type AlgorithmType = 'tfidf' | 'frequency' | 'textrank';

export interface SentenceDetail {
  index: number;
  originalText: string;
  cleanedTokens: string[];
  score: number;
  rank: number;
  selected: boolean;
}

export interface SummarizationResult {
  summary: string;
  originalSentences: string[];
  sentenceDetails: SentenceDetail[];
  topKeywords: { word: string; count: number; weight: number }[];
  originalWordCount: number;
  summaryWordCount: number;
  originalSentenceCount: number;
  summarySentenceCount: number;
  compressionRatio: number;
  reductionPercentage: number;
  fleschScore: number;
  executionTimeMs: number;
  algorithmUsed: AlgorithmType;
}

export interface SampleArticle {
  id: string;
  title: string;
  category: string;
  text: string;
}

export interface RepoFile {
  path: string;
  filename: string;
  language: string;
  content: string;
  description: string;
}

export interface GitCommitItem {
  commitNumber: number;
  hash: string;
  date: string;
  message: string;
  description: string;
  filesModified: string[];
  command: string;
}

export interface VivaQuestion {
  id: number;
  category: 'NLP Fundamentals' | 'Methodology & Math' | 'Tools & Libraries' | 'Engineering & Git' | 'Evaluation & Defense';
  question: string;
  answer: string;
  keyTakeaway: string;
}
