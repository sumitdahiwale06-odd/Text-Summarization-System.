import { AlgorithmType, SentenceDetail, SummarizationResult } from './types';

// Standard 179 English stopwords as defined in NLTK corpus
export const ENGLISH_STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing',
  'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t',
  'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers',
  'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in',
  'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most', 'mustn\'t',
  'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our',
  'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll', 'she\'s',
  'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re',
  'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t',
  'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s',
  'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t',
  'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself',
  'yourselves'
]);

export function cleanText(rawText: string): string {
  if (!rawText) return '';
  return rawText
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Intelligent sentence tokenization that handles abbreviations (Dr., Fig., e.g., i.e.)
 * and numeric decimals without premature splitting.
 */
export function tokenizeSentences(text: string): string[] {
  if (!text) return [];

  // Protect common abbreviations and dots in decimals
  let protectedText = text
    .replace(/\b(Dr|Mr|Mrs|Ms|Prof|Fig|e\.g|i\.e|vs|etc|al)\./gi, '$1___DOT___')
    .replace(/(\d+)\.(\d+)/g, '$1___DEC___$2');

  // Split at sentence terminal punctuation (. ! ?)
  const segments = protectedText.split(/(?<=[.!?])\s+/);

  const sentences: string[] = [];
  for (const seg of segments) {
    const restored = seg
      .replace(/___DOT___/g, '.')
      .replace(/___DEC___/g, '.')
      .trim();
    if (restored.length > 0) {
      sentences.push(restored);
    }
  }

  return sentences;
}

export function tokenizeWords(sentence: string): string[] {
  if (!sentence) return [];
  const words = sentence.toLowerCase().match(/\b[a-z]{2,}\b/g) || [];
  return words;
}

export function filterStopwords(words: string[]): string[] {
  return words.filter(w => !ENGLISH_STOPWORDS.has(w));
}

export function estimateSyllables(word: string): number {
  const w = word.toLowerCase().trim();
  if (w.length <= 3) return 1;
  const vowels = 'aeiouy';
  let count = 0;
  let prevVowel = false;
  for (let i = 0; i < w.length; i++) {
    const isV = vowels.includes(w[i]);
    if (isV && !prevVowel) count++;
    prevVowel = isV;
  }
  if (w.endsWith('e') && !w.endsWith('le') && count > 1) {
    count--;
  }
  return Math.max(1, count);
}

export function computeFleschReadingEase(text: string): number {
  const words = text.match(/\b[a-zA-Z]+\b/g) || [];
  const sentences = tokenizeSentences(text);
  if (words.length === 0 || sentences.length === 0) return 0;

  const totalWords = words.length;
  const totalSentences = sentences.length;
  let totalSyllables = 0;
  for (const w of words) {
    totalSyllables += estimateSyllables(w);
  }

  const asl = totalWords / totalSentences;
  const asw = totalSyllables / totalWords;
  const score = 206.835 - 1.015 * asl - 84.6 * asw;
  return Math.round(score * 10) / 10;
}

// 1. Frequency-based Sentence Scoring
function scoreByFrequency(
  sentences: string[],
  sentenceTokens: string[][]
): { scores: number[]; topKeywords: { word: string; count: number; weight: number }[] } {
  const counts: Record<string, number> = {};
  for (const tokens of sentenceTokens) {
    for (const w of tokens) {
      counts[w] = (counts[w] || 0) + 1;
    }
  }

  const entries = Object.entries(counts);
  if (entries.length === 0) {
    return {
      scores: sentences.map(() => 1.0 / sentences.length),
      topKeywords: []
    };
  }

  let maxCount = 1;
  for (const [, cnt] of entries) {
    if (cnt > maxCount) maxCount = cnt;
  }

  const weights: Record<string, number> = {};
  for (const [w, cnt] of entries) {
    weights[w] = cnt / maxCount;
  }

  const sortedKeywords = entries
    .map(([w, cnt]) => ({ word: w, count: cnt, weight: Math.round((cnt / maxCount) * 100) / 100 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const scores: number[] = [];
  for (let i = 0; i < sentences.length; i++) {
    const tokens = sentenceTokens[i];
    if (tokens.length === 0) {
      scores.push(0.01);
      continue;
    }
    let sumWeight = 0;
    for (const t of tokens) {
      sumWeight += weights[t] || 0;
    }
    // Length normalization
    let score = sumWeight / Math.sqrt(tokens.length);
    // Lead sentence bonus
    if (i === 0) score *= 1.15;
    else if (i === 1) score *= 1.05;

    scores.push(score);
  }

  return { scores, topKeywords: sortedKeywords };
}

// 2. TF-IDF Centroid Similarity Scoring
function scoreByTfidf(
  sentences: string[],
  sentenceTokens: string[][]
): { scores: number[]; topKeywords: { word: string; count: number; weight: number }[] } {
  const N = sentences.length;
  if (N <= 1) {
    return { scores: [1.0], topKeywords: [] };
  }

  // Document frequencies (how many sentences contain word w)
  const df: Record<string, number> = {};
  const tfPerSentence: Record<string, number>[] = [];
  const vocabularySet = new Set<string>();

  for (const tokens of sentenceTokens) {
    const tfMap: Record<string, number> = {};
    const seen = new Set<string>();
    for (const w of tokens) {
      vocabularySet.add(w);
      tfMap[w] = (tfMap[w] || 0) + 1;
      if (!seen.has(w)) {
        seen.add(w);
        df[w] = (df[w] || 0) + 1;
      }
    }
    tfPerSentence.push(tfMap);
  }

  const vocab = Array.from(vocabularySet);
  if (vocab.length === 0) {
    return { scores: sentences.map(() => 1.0 / N), topKeywords: [] };
  }

  // Calculate IDF for each word: log((N + 1) / (DF + 1)) + 1
  const idf: Record<string, number> = {};
  for (const w of vocab) {
    idf[w] = Math.log((N + 1) / ((df[w] || 0) + 1)) + 1;
  }

  // Build TF-IDF vectors for sentences and compute centroid
  const sentenceVectors: number[][] = [];
  const centroid: number[] = new Array(vocab.length).fill(0);

  for (let i = 0; i < N; i++) {
    const tfMap = tfPerSentence[i];
    const vec: number[] = [];
    const totalTokens = sentenceTokens[i].length || 1;

    for (let j = 0; j < vocab.length; j++) {
      const term = vocab[j];
      const termTf = (tfMap[term] || 0) / totalTokens;
      const tfidfVal = termTf * (idf[term] || 1);
      vec.push(tfidfVal);
      centroid[j] += tfidfVal / N;
    }
    sentenceVectors.push(vec);
  }

  // Compute top keywords by aggregate TF-IDF
  const keywordAgg: { word: string; count: number; weight: number }[] = [];
  for (let j = 0; j < vocab.length; j++) {
    const term = vocab[j];
    let totalScore = 0;
    for (let i = 0; i < N; i++) {
      totalScore += sentenceVectors[i][j];
    }
    keywordAgg.push({
      word: term,
      count: df[term] || 0,
      weight: Math.round((totalScore / N) * 1000) / 1000
    });
  }
  keywordAgg.sort((a, b) => b.weight - a.weight);

  // Cosine similarity between each sentence vector and the centroid vector
  const centroidNorm = Math.sqrt(centroid.reduce((acc, v) => acc + v * v, 0)) || 1e-6;

  const scores: number[] = [];
  for (let i = 0; i < N; i++) {
    const vec = sentenceVectors[i];
    let dot = 0;
    let vecNormSq = 0;
    for (let j = 0; j < vocab.length; j++) {
      dot += vec[j] * centroid[j];
      vecNormSq += vec[j] * vec[j];
    }
    const vecNorm = Math.sqrt(vecNormSq) || 1e-6;
    const cosSim = dot / (vecNorm * centroidNorm);

    // Combine centroid similarity with average informative magnitude
    const avgTfidf = vec.reduce((a, b) => a + b, 0) / (vec.length || 1);
    let finalScore = 0.7 * cosSim + 0.3 * (avgTfidf * 10);

    // Position lead bonus
    if (i === 0) finalScore *= 1.15;
    else if (i === 1) finalScore *= 1.05;

    scores.push(Math.max(0.001, finalScore));
  }

  return { scores, topKeywords: keywordAgg.slice(0, 10) };
}

// 3. TextRank / Graph Centrality Scoring
function scoreByTextRank(
  sentences: string[],
  sentenceTokens: string[][]
): { scores: number[]; topKeywords: { word: string; count: number; weight: number }[] } {
  const N = sentences.length;
  if (N <= 1) {
    return { scores: [1.0], topKeywords: [] };
  }

  // First compute TF-IDF vectors to measure sentence similarity
  const { topKeywords } = scoreByTfidf(sentences, sentenceTokens);

  // Bag-of-words / shared word similarity between sentences
  const similarityMatrix: number[][] = Array.from({ length: N }, () => new Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    const setA = new Set(sentenceTokens[i]);
    for (let j = i + 1; j < N; j++) {
      const setB = new Set(sentenceTokens[j]);
      let intersection = 0;
      for (const w of setA) {
        if (setB.has(w)) intersection++;
      }
      const normalizer = Math.log(sentenceTokens[i].length + 1) + Math.log(sentenceTokens[j].length + 1);
      const weight = normalizer > 0 ? intersection / normalizer : 0;
      similarityMatrix[i][j] = weight;
      similarityMatrix[j][i] = weight;
    }
  }

  // Row-normalize into transition matrix
  const transitionMatrix: number[][] = Array.from({ length: N }, () => new Array(N).fill(0));
  for (let i = 0; i < N; i++) {
    const rowSum = similarityMatrix[i].reduce((a, b) => a + b, 0);
    for (let j = 0; j < N; j++) {
      transitionMatrix[i][j] = rowSum > 0 ? similarityMatrix[i][j] / rowSum : 1 / N;
    }
  }

  // PageRank power iteration
  const d = 0.85;
  let ranks: number[] = new Array(N).fill(1 / N);
  const maxIter = 30;

  for (let iter = 0; iter < maxIter; iter++) {
    const nextRanks = new Array(N).fill((1 - d) / N);
    for (let j = 0; j < N; j++) {
      for (let i = 0; i < N; i++) {
        nextRanks[j] += d * transitionMatrix[i][j] * ranks[i];
      }
    }
    ranks = nextRanks;
  }

  return { scores: ranks, topKeywords };
}

export function executeSummarization(
  text: string,
  algorithm: AlgorithmType = 'tfidf',
  ratio: number = 0.35,
  maxSentencesCount?: number
): SummarizationResult {
  const startTime = performance.now();
  const cleaned = cleanText(text);
  const originalSentences = tokenizeSentences(cleaned);
  const totalSentences = originalSentences.length;

  if (totalSentences === 0) {
    return {
      summary: '',
      originalSentences: [],
      sentenceDetails: [],
      topKeywords: [],
      originalWordCount: 0,
      summaryWordCount: 0,
      originalSentenceCount: 0,
      summarySentenceCount: 0,
      compressionRatio: 0,
      reductionPercentage: 0,
      fleschScore: 0,
      executionTimeMs: 0,
      algorithmUsed: algorithm
    };
  }

  // Preprocess tokens for each sentence
  const sentenceTokens = originalSentences.map(s => filterStopwords(tokenizeWords(s)));

  // Calculate scores
  let scoringOutput: { scores: number[]; topKeywords: { word: string; count: number; weight: number }[] };

  if (algorithm === 'frequency') {
    scoringOutput = scoreByFrequency(originalSentences, sentenceTokens);
  } else if (algorithm === 'textrank') {
    scoringOutput = scoreByTextRank(originalSentences, sentenceTokens);
  } else {
    scoringOutput = scoreByTfidf(originalSentences, sentenceTokens);
  }

  const { scores, topKeywords } = scoringOutput;

  // Determine number of sentences to keep
  let k: number;
  if (maxSentencesCount !== undefined && maxSentencesCount > 0) {
    k = Math.min(maxSentencesCount, totalSentences);
  } else {
    k = Math.max(1, Math.ceil(totalSentences * ratio));
    k = Math.min(k, totalSentences);
  }

  // Create indexed list and rank descending
  const indexed = originalSentences.map((s, idx) => ({
    index: idx,
    originalText: s,
    cleanedTokens: sentenceTokens[idx],
    score: scores[idx] || 0
  }));

  const sortedByScore = [...indexed].sort((a, b) => b.score - a.score);
  const rankMap = new Map<number, number>();
  sortedByScore.forEach((item, r) => {
    rankMap.set(item.index, r + 1);
  });

  const selectedIndices = new Set(sortedByScore.slice(0, k).map(item => item.index));

  // Build sentence details with rank and selection status
  const sentenceDetails: SentenceDetail[] = indexed.map(item => ({
    index: item.index,
    originalText: item.originalText,
    cleanedTokens: item.cleanedTokens,
    score: Math.round(item.score * 10000) / 10000,
    rank: rankMap.get(item.index) || 0,
    selected: selectedIndices.has(item.index)
  }));

  // CHRONOLOGICAL REORDERING:
  // Sort selected sentences back to their original index
  const selectedSentences = sentenceDetails
    .filter(item => item.selected)
    .sort((a, b) => a.index - b.index);

  const summary = selectedSentences.map(item => item.originalText).join(' ');

  // Metrics
  const origWords = cleaned.match(/\b\w+\b/g)?.length || 0;
  const summWords = summary.match(/\b\w+\b/g)?.length || 0;
  const compressionRatio = origWords > 0 ? Math.round((summWords / origWords) * 1000) / 10 : 0;
  const reductionPercentage = Math.round((100 - compressionRatio) * 10) / 10;
  const fleschScore = computeFleschReadingEase(summary);
  const executionTimeMs = Math.round((performance.now() - startTime) * 10) / 10;

  return {
    summary,
    originalSentences,
    sentenceDetails,
    topKeywords,
    originalWordCount: origWords,
    summaryWordCount: summWords,
    originalSentenceCount: totalSentences,
    summarySentenceCount: selectedSentences.length,
    compressionRatio,
    reductionPercentage,
    fleschScore,
    executionTimeMs,
    algorithmUsed: algorithm
  };
}
