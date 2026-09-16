"""
Text Preprocessing Module for Text Summarization System
Course: Natural Language Processing (ET5M004) - V Semester ETC
Student: Sumit Dahiwale | Roll No: BT240017ET
GitHub: https://github.com/sumitdahiwale06-odd/text-summarization-system.git

This module handles:
1. NLTK resource verification and downloading
2. Text normalization and noise cleaning
3. Sentence tokenization (preserving original casing for summary output)
4. Word tokenization
5. Lowercasing and stop-word filtering for feature extraction
"""

import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize


def ensure_nltk_resources():
    """
    Safely ensures that all required NLTK tokenizers and corpora
    are downloaded locally before processing.
    """
    required_packages = ['punkt', 'stopwords']
    for pkg in required_packages:
        try:
            nltk.data.find(f'tokenizers/{pkg}' if pkg == 'punkt' else f'corpora/{pkg}')
        except LookupError:
            try:
                nltk.download(pkg, quiet=True)
            except Exception as e:
                # Fallback to local regex if offline
                print(f"Warning: Could not download {pkg}: {e}")


# Initialize downloads on import
ensure_nltk_resources()


def clean_text(raw_text: str) -> str:
    """
    Normalizes whitespace and removes unwanted non-printable characters,
    while preserving sentence structure and punctuation marks needed for sentence boundary detection.

    Parameters:
        raw_text (str): The raw input string provided by the user.

    Returns:
        str: Cleaned and normalized text.
    """
    if not raw_text or not isinstance(raw_text, str):
        return ""

    # Replace multiple whitespace characters and newlines with a single space
    cleaned = re.sub(r'\s+', ' ', raw_text)
    # Remove control characters
    cleaned = re.sub(r'[\x00-\x1f\x7f-\x9f]', '', cleaned)
    return cleaned.strip()


def tokenize_sentences(text: str) -> list:
    """
    Splits text into constituent sentences using NLTK's sentence tokenizer.
    Falls back to regular expressions if NLTK data is unavailable.

    Preserves the EXACT capitalization and punctuation of original sentences
    so that the final generated summary is grammatically coherent.

    Parameters:
        text (str): Cleaned document string.

    Returns:
        list[str]: List of individual sentences.
    """
    if not text:
        return []

    try:
        sentences = sent_tokenize(text)
    except Exception:
        # Robust regex fallback for sentence boundary detection
        sentences = re.split(r'(?<=[.!?])\s+', text)

    # Filter out empty or whitespace-only sentences
    cleaned_sentences = [s.strip() for s in sentences if s.strip()]
    return cleaned_sentences


def get_english_stopwords() -> set:
    """
    Retrieves standard English stop words from NLTK corpus,
    with a reliable fallback set if offline.

    Returns:
        set[str]: Set of lowercase stop words.
    """
    try:
        return set(stopwords.words('english'))
    except Exception:
        # Fallback standard English stop words
        return {
            'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an',
            'and', 'any', 'are', 'aren\'t', 'as', 'at', 'be', 'because', 'been',
            'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can',
            'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do',
            'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each',
            'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t',
            'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her',
            'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how',
            'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into',
            'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more',
            'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off',
            'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves',
            'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll',
            'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that',
            'that\'s', 'the', 'their', 'theirs', 'them', 'themselves', 'then',
            'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re',
            'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until',
            'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re',
            'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s',
            'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why',
            'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d',
            'you\'ll', 'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves'
        }


def tokenize_words(sentence: str) -> list:
    """
    Tokenizes a single sentence into lowercase alphabetical words,
    filtering out punctuation and numerical digits for feature extraction.

    Parameters:
        sentence (str): Sentence string.

    Returns:
        list[str]: List of lowercase alpha word tokens.
    """
    if not sentence:
        return []

    try:
        raw_words = word_tokenize(sentence.lower())
    except Exception:
        raw_words = re.findall(r'\b\w+\b', sentence.lower())

    # Keep only alphabetical tokens without punctuation
    words = [
        w for w in raw_words
        if w.isalpha() and w not in string.punctuation
    ]
    return words


def filter_stopwords(word_list: list, stop_words: set = None) -> list:
    """
    Filters out high-frequency grammatical stop words from a list of tokens.

    Parameters:
        word_list (list[str]): Tokens to filter.
        stop_words (set[str], optional): Custom stop words set.

    Returns:
        list[str]: Filtered content tokens.
    """
    if stop_words is None:
        stop_words = get_english_stopwords()

    return [w for w in word_list if w not in stop_words and len(w) > 1]


def preprocess_document(text: str) -> tuple:
    """
    Executes the full preprocessing pipeline:
    1. Normalizes raw text
    2. Extracts original sentences (for final summary output)
    3. Tokenizes and filters each sentence (for numerical analysis)

    Returns:
        tuple: (original_sentences: list[str], tokenized_sentences: list[list[str]], all_content_words: list[str])
    """
    cleaned = clean_text(text)
    original_sentences = tokenize_sentences(cleaned)

    stop_words = get_english_stopwords()
    tokenized_sentences = []
    all_content_words = []

    for sentence in original_sentences:
        words = tokenize_words(sentence)
        filtered = filter_stopwords(words, stop_words)
        tokenized_sentences.append(filtered)
        all_content_words.extend(filtered)

    return original_sentences, tokenized_sentences, all_content_words
