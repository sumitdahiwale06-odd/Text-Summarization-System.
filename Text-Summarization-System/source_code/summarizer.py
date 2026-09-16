"""
Extractive Summarization Engine
Course: Natural Language Processing (ET5M004) - V Semester ETC
Student: Sumit Dahiwale | Roll No: BT240017ET
GitHub: https://github.com/sumitdahiwale06-odd/text-summarization-system.git

Implements extractive summarization techniques:
1. Word Frequency-Based Sentence Scoring (Frequency Method)
2. TF-IDF-Based Sentence Importance Scoring (Term Frequency-Inverse Document Frequency)
3. TextRank / Graph-Based Cosine Similarity Scoring
"""

import collections
import math
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from preprocessing import preprocess_document, tokenize_sentences


class FrequencySummarizer:
    """
    Summarizer that scores sentences based on normalized word frequencies.
    A sentence containing frequently occurring significant words receives a higher score.
    """

    def __init__(self):
        pass

    def score_sentences(self, original_sentences: list, tokenized_sentences: list) -> list:
        """
        Calculates importance scores for each sentence using normalized word frequencies.

        Formula:
            Weight(w) = freq(w) / max_freq
            Score(S_i) = sum(Weight(w) for w in S_i) / (length(S_i) + dampening)
        """
        if not original_sentences or not tokenized_sentences:
            return []

        # 1. Count overall content word frequencies
        all_words = []
        for words in tokenized_sentences:
            all_words.extend(words)

        if not all_words:
            # Fallback if no content words survived stopword filtering
            return [1.0 / len(original_sentences)] * len(original_sentences)

        word_counts = collections.Counter(all_words)
        max_freq = max(word_counts.values())

        # 2. Compute normalized weights in range (0, 1]
        word_weights = {w: count / max_freq for w, count in word_counts.items()}

        # 3. Score each sentence
        scores = []
        for i, words in enumerate(tokenized_sentences):
            if not words:
                score = 0.001
            else:
                raw_score = sum(word_weights.get(w, 0.0) for w in words)
                # Normalize by sentence word count to avoid bias towards excessively long sentences
                # Using math.sqrt or dampening gives a balanced penalty
                length_penalty = math.sqrt(len(words))
                score = raw_score / (length_penalty if length_penalty > 0 else 1.0)

            # Lead sentence bonus: In academic and news writing, the first 1-2 sentences often introduce core concepts
            if i == 0:
                score *= 1.15
            elif i == 1:
                score *= 1.05

            scores.append(float(score))

        return scores


class TfidfSummarizer:
    """
    Summarizer using Term Frequency - Inverse Document Frequency (TF-IDF).
    Each sentence is evaluated as a document within the overall text corpus.
    High TF-IDF terms represent rare, highly informative keywords.
    """

    def __init__(self):
        pass

    def score_sentences(self, original_sentences: list) -> list:
        """
        Calculates sentence scores by computing TF-IDF vectors across sentences
        and measuring both average term informativeness and cosine similarity
        to the entire document centroid.
        """
        if not original_sentences:
            return []

        n = len(original_sentences)
        if n == 1:
            return [1.0]

        try:
            vectorizer = TfidfVectorizer(stop_words='english')
            tfidf_matrix = vectorizer.fit_transform(original_sentences)

            # Sentence vector magnitude / average TF-IDF
            matrix_dense = tfidf_matrix.toarray()
            sentence_mean_tfidf = np.mean(matrix_dense, axis=1)

            # Centroid of the entire document
            doc_centroid = np.mean(matrix_dense, axis=0, keepdims=True)
            # Cosine similarity between each sentence and the document centroid
            similarity_to_doc = cosine_similarity(matrix_dense, doc_centroid).flatten()

            # Combined score: 60% centroid similarity + 40% term informativeness
            combined_scores = 0.60 * similarity_to_doc + 0.40 * (sentence_mean_tfidf * 10.0)

            # Apply position weighting
            scores = []
            for i, score in enumerate(combined_scores):
                s = float(score)
                if i == 0:
                    s *= 1.15
                elif i == 1:
                    s *= 1.05
                scores.append(s)

            return scores
        except ValueError:
            # When text has no stopword-free vocabulary (e.g., all symbols or empty)
            return [1.0 / n] * n


class TextRankSummarizer:
    """
    Graph-based ranking algorithm inspired by PageRank.
    Sentences are nodes in a graph. An edge between two sentences represents
    their cosine similarity. Sentences that share significant information
    with many other sentences receive the highest centrality score.
    """

    def __init__(self, damping=0.85, max_iter=50, tol=1e-4):
        self.damping = damping
        self.max_iter = max_iter
        self.tol = tol

    def score_sentences(self, original_sentences: list) -> list:
        n = len(original_sentences)
        if n <= 1:
            return [1.0] * n

        try:
            vectorizer = TfidfVectorizer(stop_words='english')
            tfidf_matrix = vectorizer.fit_transform(original_sentences)
            similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)

            # Zero out the diagonal (self-loops)
            np.fill_diagonal(similarity_matrix, 0.0)

            # Row-normalize similarity matrix into transition probabilities
            row_sums = similarity_matrix.sum(axis=1)
            # Avoid division by zero for isolated sentences
            row_sums[row_sums == 0] = 1.0
            transition_matrix = similarity_matrix / row_sums[:, np.newaxis]

            # Power iteration to compute stationary distribution (PageRank)
            scores = np.ones(n) / n
            for _ in range(self.max_iter):
                next_scores = (1 - self.damping) / n + self.damping * transition_matrix.T.dot(scores)
                if np.sum(np.abs(next_scores - scores)) < self.tol:
                    break
                scores = next_scores

            # Convert to list and return
            return [float(s) for s in scores]
        except Exception:
            # Graceful fallback to uniform scores
            return [1.0 / n] * n


def generate_extractive_summary(
    text: str,
    method: str = "tfidf",
    ratio: float = 0.35,
    max_sentences: int = None
) -> dict:
    """
    Main orchestration function for Extractive Text Summarization.

    Steps:
    1. Preprocess raw input document
    2. Extract original sentences and tokenized representations
    3. Score sentences using the chosen NLP algorithm (TF-IDF, Frequency, or TextRank)
    4. Rank sentences in descending order of calculated importance
    5. Select top K sentences based on requested ratio or sentence cap
    6. Restore selected sentences to their original chronological order
    7. Form the final coherent summary

    Parameters:
        text (str): Input text article.
        method (str): "tfidf", "frequency", or "textrank".
        ratio (float): Fraction of sentences to retain (e.g. 0.2, 0.35, 0.5).
        max_sentences (int, optional): Explicit number of sentences if specified.

    Returns:
        dict: Complete structured result including summary, scores, statistics, and metadata.
    """
    original_sentences, tokenized_sentences, all_content_words = preprocess_document(text)
    num_original_sentences = len(original_sentences)

    if num_original_sentences == 0:
        return {
            "summary": "",
            "original_sentences": [],
            "selected_sentences": [],
            "sentence_scores": [],
            "sentence_rankings": [],
            "num_original_sentences": 0,
            "num_summary_sentences": 0,
            "original_word_count": 0,
            "summary_word_count": 0,
            "compression_ratio": 0.0,
            "method": method,
            "error": "Input text contains no valid sentences."
        }

    # Handle single sentence edge case
    if num_original_sentences == 1:
        orig_s = original_sentences[0]
        words = orig_s.split()
        return {
            "summary": orig_s,
            "original_sentences": original_sentences,
            "selected_sentences": [(0, orig_s, 1.0)],
            "sentence_scores": [1.0],
            "sentence_rankings": [{"index": 0, "sentence": orig_s, "score": 1.0, "rank": 1, "selected": True}],
            "num_original_sentences": 1,
            "num_summary_sentences": 1,
            "original_word_count": len(words),
            "summary_word_count": len(words),
            "compression_ratio": 100.0,
            "method": method,
            "error": None
        }

    # Select and compute scoring using chosen algorithm
    method_lower = method.lower().strip()
    if method_lower == "frequency":
        summarizer = FrequencySummarizer()
        scores = summarizer.score_sentences(original_sentences, tokenized_sentences)
    elif method_lower == "textrank":
        summarizer = TextRankSummarizer()
        scores = summarizer.score_sentences(original_sentences)
    else:  # Default to TF-IDF
        method_lower = "tfidf"
        summarizer = TfidfSummarizer()
        scores = summarizer.score_sentences(original_sentences)

    # Determine target number of sentences
    if max_sentences is not None and max_sentences > 0:
        k = min(max_sentences, num_original_sentences)
    else:
        k = max(1, math.ceil(num_original_sentences * ratio))
        # Summary should not exceed original document length
        k = min(k, num_original_sentences)

    # Pair each sentence with its original index and score
    indexed_scores = [(idx, score, original_sentences[idx]) for idx, score in enumerate(scores)]

    # Rank sentences by score descending
    ranked = sorted(indexed_scores, key=lambda x: x[1], reverse=True)

    # Select top k sentences
    selected_indices = set(idx for idx, score, sent in ranked[:k])

    # Re-order selected sentences back to their original document chronological order!
    # This is essential in Extractive Summarization to preserve narrative flow and discourse coherence.
    ordered_selected = [
        (idx, scores[idx], original_sentences[idx])
        for idx in range(num_original_sentences)
        if idx in selected_indices
    ]

    summary_text = " ".join([sent for _, _, sent in ordered_selected])

    # Word counts & statistics
    orig_words = sum(len(s.split()) for s in original_sentences)
    summ_words = sum(len(s.split()) for _, _, s in ordered_selected)
    compression_ratio = (summ_words / orig_words * 100.0) if orig_words > 0 else 0.0

    # Build detailed ranking list for UI and evaluation analysis
    rankings_metadata = []
    # Rank map
    rank_map = {item[0]: rank + 1 for rank, item in enumerate(ranked)}

    for idx, sentence in enumerate(original_sentences):
        rankings_metadata.append({
            "index": idx,
            "sentence": sentence,
            "score": round(scores[idx], 4),
            "rank": rank_map.get(idx, 0),
            "selected": idx in selected_indices
        })

    return {
        "summary": summary_text,
        "original_sentences": original_sentences,
        "selected_sentences": ordered_selected,
        "sentence_scores": scores,
        "sentence_rankings": rankings_metadata,
        "num_original_sentences": num_original_sentences,
        "num_summary_sentences": len(ordered_selected),
        "original_word_count": orig_words,
        "summary_word_count": summ_words,
        "compression_ratio": round(compression_ratio, 2),
        "reduction_percentage": round(100.0 - compression_ratio, 2),
        "method": method_lower,
        "error": None
    }
