"""
Utility Functions for Text Summarization System
Course: Natural Language Processing (ET5M004) - V Semester ETC
Student: Sumit Dahiwale | Roll No: BT240017ET
GitHub: https://github.com/sumitdahiwale06-odd/text-summarization-system.git

Provides metric calculations, text analytics, and file export helpers.
"""

import os
import re


def compute_word_count(text: str) -> int:
    """Calculates number of words in given text."""
    if not text:
        return 0
    return len(re.findall(r'\b\w+\b', text))


def compute_sentence_count(text: str) -> int:
    """Calculates sentence count using punctuation markers."""
    if not text:
        return 0
    sentences = re.split(r'[.!?]+', text)
    return len([s for s in sentences if s.strip()])


def compute_compression_ratio(original_words: int, summary_words: int) -> float:
    """
    Computes compression ratio: (Summary Words / Original Words) * 100.
    Lower compression ratio means a more condensed summary.
    """
    if original_words <= 0:
        return 0.0
    return round((summary_words / original_words) * 100.0, 2)


def compute_reduction_percentage(original_words: int, summary_words: int) -> float:
    """
    Computes percentage reduction: ((Original Words - Summary Words) / Original Words) * 100.
    """
    if original_words <= 0:
        return 0.0
    return round(((original_words - summary_words) / original_words) * 100.0, 2)


def estimate_syllables(word: str) -> int:
    """Helper to count syllables in an English word for readability estimation."""
    word = word.lower().strip()
    if len(word) <= 3:
        return 1
    # Count vowel groups
    vowels = "aeiouy"
    count = 0
    prev_is_vowel = False
    for char in word:
        is_vowel = char in vowels
        if is_vowel and not prev_is_vowel:
            count += 1
        prev_is_vowel = is_vowel
    if word.endswith("e") and not word.endswith("le") and count > 1:
        count -= 1
    return max(1, count)


def calculate_flesch_reading_ease(text: str) -> float:
    """
    Computes standard Flesch Reading Ease score:
    206.835 - 1.015 * (total_words / total_sentences) - 84.6 * (total_syllables / total_words)
    90-100: Very Easy, 60-70: Plain English, 30-50: Difficult (Academic), 0-30: Very Confusing.
    """
    words = re.findall(r'\b[a-zA-Z]+\b', text)
    if not words:
        return 0.0

    sentences = [s for s in re.split(r'[.!?]+', text) if s.strip()]
    num_sentences = max(1, len(sentences))
    num_words = len(words)
    num_syllables = sum(estimate_syllables(w) for w in words)

    asl = num_words / num_sentences  # Average Sentence Length
    asw = num_syllables / num_words  # Average Syllables per Word

    score = 206.835 - (1.015 * asl) - (84.6 * asw)
    return round(score, 2)


def save_summary_output(original_text: str, summary_text: str, stats: dict, filepath: str):
    """Saves structured summarization results to a text file."""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write("=" * 60 + "\n")
        f.write("TEXT SUMMARIZATION SYSTEM - EVALUATION REPORT\n")
        f.write("Student: Sumit Dahiwale | Roll No: BT240017ET\n")
        f.write(f"Algorithm: {stats.get('method', 'TF-IDF').upper()}\n")
        f.write("=" * 60 + "\n\n")

        f.write("1. SUMMARY STATISTICS:\n")
        f.write(f"   Original Sentences : {stats.get('num_original_sentences', 0)}\n")
        f.write(f"   Summary Sentences  : {stats.get('num_summary_sentences', 0)}\n")
        f.write(f"   Original Word Count: {stats.get('original_word_count', 0)}\n")
        f.write(f"   Summary Word Count : {stats.get('summary_word_count', 0)}\n")
        f.write(f"   Compression Ratio  : {stats.get('compression_ratio', 0.0)}%\n")
        f.write(f"   Reduction Rate     : {stats.get('reduction_percentage', 0.0)}%\n\n")

        f.write("2. ORIGINAL TEXT:\n")
        f.write(original_text + "\n\n")

        f.write("3. GENERATED SUMMARY:\n")
        f.write(summary_text + "\n\n")

        f.write("4. SENTENCE IMPORTANCE RANKINGS:\n")
        for item in stats.get("sentence_rankings", []):
            flag = "[SELECTED]" if item.get("selected") else "[SKIPPED] "
            f.write(f"   Rank #{item.get('rank', 0)} {flag} (Score: {item.get('score', 0):.4f}): {item.get('sentence')}\n")
