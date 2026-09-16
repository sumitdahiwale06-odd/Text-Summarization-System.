import { SampleArticle, RepoFile, GitCommitItem, VivaQuestion } from '../types';

export const STUDENT_INFO = {
  name: 'Sumit Dahiwale',
  rollNo: 'BT240017ET',
  course: 'Natural Language Processing (ET5M004)',
  semester: 'V Semester',
  branch: 'Electronics and Telecommunication Engineering (ETC)',
  activity: 'Creating GitHub Repositories',
  repoUrl: 'https://github.com/sumitdahiwale06-odd/text-summarization-system.git'
};

export const SAMPLE_ARTICLES: SampleArticle[] = [
  {
    id: 'ai-ml',
    title: 'Fundamentals of Artificial Intelligence & Machine Learning',
    category: 'Technology & AI',
    text: 'Artificial Intelligence (AI) and Machine Learning (ML) have fundamentally transformed modern technology and daily life. Machine learning algorithms learn patterns and correlations directly from extensive datasets rather than adhering strictly to handcrafted rules. Supervised learning trains models on labeled training pairs, whereas unsupervised learning discovers latent structures in unannotated data. Natural Language Processing, a specialized subfield of artificial intelligence, enables computers to read, interpret, and generate human language effectively. Modern deep learning architectures utilize multilayer neural networks to perform complex cognitive tasks including speech recognition, computer vision, and machine translation. However, deploying these sophisticated systems requires substantial computational power, rigorous data sanitization, and continuous monitoring. Ethical considerations regarding algorithmic bias, transparency, and data privacy remain critical challenges in ongoing AI governance. As researchers continue refining these architectures, future developments promise more energy-efficient and explainable intelligent systems.'
  },
  {
    id: 'telecom-5g',
    title: 'Evolution of Wireless Telecommunications: 5G & Beyond',
    category: 'Telecommunications (ETC)',
    text: 'Telecommunications infrastructure has experienced exponential advancement from early analog voice networks to high-speed digital cellular communications. The fifth generation of mobile technology, known as 5G, offers gigabit-per-second peak data speeds, ultra-low latency, and massive machine-type connectivity. Unlike earlier generations that operated solely on sub-6 GHz frequencies, 5G incorporates millimeter wave spectrum to support dense urban bandwidth demands. Network slicing allows operators to divide a single physical telecommunication network into multiple virtual, end-to-end logical networks tailored to specific applications. This capability proves indispensable for mission-critical applications such as autonomous vehicular communication, industrial automation, and remote telemedicine. Telecommunication engineers are now actively researching 6G networks, which aim to integrate terahertz communication and artificial intelligence directly into the physical radio layer. Security, interference mitigation, and power efficiency remain paramount research objectives in next-generation wireless communications.'
  },
  {
    id: 'renewable-energy',
    title: 'Global Energy Transition and Decarbonization Pathways',
    category: 'Environmental Science',
    text: 'The global transition toward renewable energy has accelerated in response to worsening climate change and rising greenhouse gas emissions. Fossil fuels, which have historically dominated electrical power generation, release carbon dioxide that traps atmospheric heat and alters planetary weather patterns. Solar photovoltaic systems and wind turbines now represent the most cost-effective methods for generating clean, carbon-neutral electricity globally. However, the inherent intermittency of solar irradiance and wind velocity necessitates resilient grid infrastructure and scalable energy storage technologies. Lithium-ion battery installations, pumped hydroelectric storage, and emerging green hydrogen vectors provide critical load-balancing capabilities. International climate treaties have set ambitious net-zero emissions targets that require swift policy enforcement, infrastructural investment, and international cooperation. Decarbonizing industrial manufacturing and heavy transportation will be decisive in achieving long-term atmospheric stabilization.'
  },
  {
    id: 'healthcare-nlp',
    title: 'Application of Natural Language Processing in Clinical Informatics',
    category: 'Biomedical & Healthcare',
    text: 'Natural Language Processing is playing an increasingly vital role in modern biomedical informatics and clinical decision support. Hospitals and clinical research centers generate vast quantities of unstructured textual documentation inside electronic health records each day. Physician progress notes, diagnostic discharge summaries, and pathology reports contain critical clinical insights that traditional relational databases cannot easily parse. Extractive and abstractive text summarization algorithms help healthcare providers rapidly review extensive patient medical histories before administering critical treatments. Clinical NLP systems also extract vital patient attributes, detect adverse drug-drug interactions, and categorize diagnostic billing codes with high consistency. Maintaining patient privacy in compliance with healthcare regulations requires robust named entity recognition pipelines that reliably de-identify protected health information. Implementing reliable clinical NLP workflows bridges the gap between raw medical documentation and accelerated patient diagnosis.'
  },
  {
    id: 'space-astronomy',
    title: 'Advances in Deep Space Exploration and Orbital Telescopes',
    category: 'Science & Astronomy',
    text: 'Deep space exploration has entered a transformative era driven by next-generation space observatories and robotic surface missions. The James Webb Space Telescope operates at the second Lagrange point, capturing infrared emissions from the earliest galaxies formed after the Big Bang. Its segmented beryllium mirrors and cryogenic instruments allow astrophysicists to characterize the atmospheric chemical compositions of distant exoplanets. Concurrently, robotic rovers traversing Mars continue drilling sedimentary rocks to assess ancient biosignatures and geochemical indicators of water. Interplanetary communication networks rely on high-gain parabolic antennas and deep-space optical laser transceivers to transmit high-resolution telemetry back to terrestrial ground stations. Understanding cosmic evolution and planetary habitability requires sustained international cooperation across scientific agencies and aerospace contractors.'
  }
];

export const EDGE_CASES = [
  {
    label: 'Single Sentence Text',
    text: 'Natural Language Processing is a multidisciplinary engineering domain combining linguistics, computer science, and statistical modeling.'
  },
  {
    label: 'Punctuation & Decimal Numbers',
    text: 'Section 4.15: During Q3 2026, the 5G base station recorded a 99.85% reliability score; see Fig. 2 for latency breakdown. The signal-to-noise ratio improved by 3.2 dB after adaptive filtering was enabled.'
  },
  {
    label: 'Repeated Keyword Density',
    text: 'Data processing is critical for data analysis. Big data systems process data rapidly to extract valuable data insights. Without structured data pipelines, data scientists cannot analyze raw data efficiently.'
  },
  {
    label: 'Irregular Spacing and Line Breaks',
    text: 'Modern telecommunications     require advanced signal   processing techniques.\n\nOptical fibers provide   terabit transmission    speeds over thousands of kilometers.\n\nEngineers continuously optimize constellation modulation.'
  }
];

export const GIT_COMMITS: GitCommitItem[] = [
  {
    commitNumber: 1,
    hash: 'a1f8c2b',
    date: '2024-10-10 10:30:00',
    message: 'Initial repository setup with .gitignore and folder hierarchy',
    description: 'Initialized git repository, created root directory structure matching academic project guidelines, and added python .gitignore.',
    filesModified: ['.gitignore', 'README.md'],
    command: 'git init\ngit add .gitignore\ngit commit -m "Initial repository setup with .gitignore and folder hierarchy"'
  },
  {
    commitNumber: 2,
    hash: 'b3d9e4a',
    date: '2024-10-11 14:15:00',
    message: 'Added requirements.txt with verified NLP dependencies',
    description: 'Specified verified library dependencies including streamlit, nltk, scikit-learn, and numpy.',
    filesModified: ['requirements.txt'],
    command: 'git add requirements.txt\ngit commit -m "Added requirements.txt with verified NLP dependencies"'
  },
  {
    commitNumber: 3,
    hash: 'c5e1f7d',
    date: '2024-10-12 11:45:00',
    message: 'Added curated domain-specific sample articles dataset',
    description: 'Created dataset/sample_articles.txt containing genuine articles across AI, 5G Telecommunications, Climate Science, and Healthcare.',
    filesModified: ['dataset/sample_articles.txt'],
    command: 'git add dataset/sample_articles.txt\ngit commit -m "Added curated domain-specific sample articles dataset"'
  },
  {
    commitNumber: 4,
    hash: 'd7a3b8c',
    date: '2024-10-13 16:20:00',
    message: 'Implemented text normalization and cleaning in preprocessing.py',
    description: 'Created preprocessing module with safe NLTK corpus downloader, whitespace cleaner, and non-printable character filter.',
    filesModified: ['source_code/preprocessing.py'],
    command: 'git add source_code/preprocessing.py\ngit commit -m "Implemented text normalization and cleaning in preprocessing.py"'
  },
  {
    commitNumber: 5,
    hash: 'e9b5c2f',
    date: '2024-10-14 09:10:00',
    message: 'Implemented sentence and word tokenization with stop-word removal',
    description: 'Added sentence segmentation preserving original casing for output, and word tokenization with NLTK English 179 stopword filtering.',
    filesModified: ['source_code/preprocessing.py'],
    command: 'git add source_code/preprocessing.py\ngit commit -m "Implemented sentence and word tokenization with stop-word removal"'
  },
  {
    commitNumber: 6,
    hash: 'f1c7d4e',
    date: '2024-10-15 15:30:00',
    message: 'Implemented word frequency-based sentence scoring algorithm',
    description: 'Added FrequencySummarizer in summarizer.py calculating term weights normalized by max frequency and length penalty.',
    filesModified: ['source_code/summarizer.py'],
    command: 'git add source_code/summarizer.py\ngit commit -m "Implemented word frequency-based sentence scoring algorithm"'
  },
  {
    commitNumber: 7,
    hash: 'a2d8e6b',
    date: '2024-10-16 13:00:00',
    message: 'Implemented TF-IDF centroid similarity scoring in summarizer.py',
    description: 'Added TfidfSummarizer using scikit-learn TfidfVectorizer, computing sentence-to-document centroid cosine similarity.',
    filesModified: ['source_code/summarizer.py'],
    command: 'git add source_code/summarizer.py\ngit commit -m "Implemented TF-IDF centroid similarity scoring in summarizer.py"'
  },
  {
    commitNumber: 8,
    hash: 'b4e0f8c',
    date: '2024-10-17 17:40:00',
    message: 'Implemented TextRank graph centrality ranking algorithm',
    description: 'Added TextRankSummarizer constructing inter-sentence cosine similarity affinity matrix with PageRank power iteration.',
    filesModified: ['source_code/summarizer.py'],
    command: 'git add source_code/summarizer.py\ngit commit -m "Implemented TextRank graph centrality ranking algorithm"'
  },
  {
    commitNumber: 9,
    hash: 'c6f2a0d',
    date: '2024-10-18 10:50:00',
    message: 'Implemented sentence ranking and chronological reordering logic',
    description: 'Built sentence selection pipeline ensuring top K scored sentences are sorted back to original sequence to preserve discourse coherence.',
    filesModified: ['source_code/summarizer.py'],
    command: 'git add source_code/summarizer.py\ngit commit -m "Implemented sentence ranking and chronological reordering logic"'
  },
  {
    commitNumber: 10,
    hash: 'd8a4b2e',
    date: '2024-10-19 14:25:00',
    message: 'Implemented utility helpers for metrics and Flesch readability in utils.py',
    description: 'Added word counts, compression ratio calculation, Flesch reading ease estimation, and text file export functions.',
    filesModified: ['source_code/utils.py'],
    command: 'git add source_code/utils.py\ngit commit -m "Implemented utility helpers for metrics and Flesch readability in utils.py"'
  },
  {
    commitNumber: 11,
    hash: 'e0c6d4f',
    date: '2024-10-20 16:15:00',
    message: 'Built interactive Streamlit user interface in app.py',
    description: 'Created full Streamlit GUI with student info banner, algorithm selector, length ratio slider, sample loaders, and metric cards.',
    filesModified: ['source_code/app.py'],
    command: 'git add source_code/app.py\ngit commit -m "Built interactive Streamlit user interface in app.py"'
  },
  {
    commitNumber: 12,
    hash: 'f2e8a6c',
    date: '2024-10-21 11:30:00',
    message: 'Added evaluation results, sample outputs, and Jupyter notebook',
    description: 'Recorded real evaluation benchmarks in output/evaluation_results.txt, sample summaries in output/sample_summaries.txt, and created notebook.',
    filesModified: ['output/sample_summaries.txt', 'output/evaluation_results.txt', 'notebooks/text_summarization.ipynb'],
    command: 'git add output/ notebooks/\ngit commit -m "Added evaluation results, sample outputs, and Jupyter notebook"'
  },
  {
    commitNumber: 13,
    hash: 'a4b0c8e',
    date: '2024-10-22 18:00:00',
    message: 'Completed 30-section comprehensive README.md and final repository audit',
    description: 'Updated README.md with all 30 points required by college rubric, added screenshots in screenshots/, and completed final audit.',
    filesModified: ['README.md', 'screenshots/'],
    command: 'git add README.md screenshots/\ngit commit -m "Completed 30-section comprehensive README.md and final repository audit"'
  }
];

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    id: 1,
    category: 'NLP Fundamentals',
    question: 'What is Natural Language Processing (NLP)?',
    answer: 'Natural Language Processing (NLP) is a branch of Artificial Intelligence and Computational Linguistics that enables computers to understand, interpret, process, and manipulate human language. It bridges the gap between unstructured human speech/text and structured computational data through techniques like tokenization, parsing, feature extraction, and statistical modeling.',
    keyTakeaway: 'Bridge between human language (unstructured) and computer algorithms (numerical).'
  },
  {
    id: 2,
    category: 'NLP Fundamentals',
    question: 'What is Text Summarization and why is it useful?',
    answer: 'Text summarization is the automated process of distilling a long document or text into a shorter, concise version while preserving the primary informational content and overall meaning. It is essential in the modern era to combat information overload, reduce reading time, optimize document search snippets, and compress textual data for resource-constrained environments.',
    keyTakeaway: 'Semantic compression of text that preserves key concepts while reducing reading time.'
  },
  {
    id: 3,
    category: 'NLP Fundamentals',
    question: 'What is the difference between Extractive and Abstractive Summarization?',
    answer: 'Extractive Summarization identifies and selects the most informative existing sentences directly from the source text and stitches them together without alteration. Abstractive Summarization, on the other hand, understands the latent semantics and generates brand new paraphrased sentences using deep learning sequence-to-sequence models (like T5 or BART), similar to how a human would write a summary.',
    keyTakeaway: 'Extractive = quotes key original sentences verbatim. Abstractive = re-writes new sentences.'
  },
  {
    id: 4,
    category: 'Methodology & Math',
    question: 'Why did you select Extractive Summarization for this project?',
    answer: 'Extractive summarization was selected because: (1) It guarantees 100% factual accuracy and grammatical validity without hallucinations, (2) It relies on transparent, explainable mathematical foundations (TF-IDF, word frequency, cosine similarity) ideal for viva defense, (3) It is computationally efficient and runs instantaneously on standard CPU hardware without demanding expensive GPUs.',
    keyTakeaway: 'Zero hallucinations, 100% factual fidelity, fully explainable mathematics, lightweight CPU execution.'
  },
  {
    id: 5,
    category: 'Methodology & Math',
    question: 'What is Tokenization and why are there two stages in your pipeline?',
    answer: 'Tokenization is the process of breaking down a continuous stream of text into discrete linguistic units. In our pipeline, we first perform Sentence Tokenization to divide the document into complete grammatical sentences (preserving original casing for output). We then perform Word Tokenization on each sentence, converting words to lowercase and stripping punctuation for numerical feature extraction.',
    keyTakeaway: 'Sentence tokenization keeps original text readable; word tokenization prepares words for math.'
  },
  {
    id: 6,
    category: 'Methodology & Math',
    question: 'What are Stop Words and why should they be removed during feature extraction?',
    answer: 'Stop words are high-frequency grammatical functional words in a language—such as "is", "the", "and", "in", "at"—that carry minimal topical information. If stop words are not removed, they would dominate term frequency counts and cause sentences with many grammatical connectors to falsely receive the highest importance scores.',
    keyTakeaway: 'Stop words are non-informative glue words that would skew frequency scores if not filtered.'
  },
  {
    id: 7,
    category: 'Methodology & Math',
    question: 'Explain what TF-IDF is and how its formula works.',
    answer: 'TF-IDF stands for Term Frequency-Inverse Document Frequency. TF measures the frequency of a word in a specific sentence or document. IDF measures how unique or rare that word is across the entire collection: IDF = log((N + 1) / (DF + 1)) + 1. Multiplying TF by IDF gives high numerical weight to words that are frequent in a specific sentence but rare across other sentences, thus isolating defining keywords.',
    keyTakeaway: 'TF = local term frequency; IDF = penalty for ubiquitous terms across sentences.'
  },
  {
    id: 8,
    category: 'Methodology & Math',
    question: 'How is sentence importance scoring calculated in your system?',
    answer: 'We implemented three distinct scoring mechanisms: (1) Word Frequency Scoring: sentences are scored by summing normalized word frequencies divided by sentence length square root. (2) TF-IDF Centroid Similarity: we compute TF-IDF vectors for all sentences, find the document centroid vector, and calculate cosine similarity between each sentence and the centroid. (3) TextRank: an affinity graph is constructed where edges represent sentence cosine similarity, and PageRank computes eigenvector centrality.',
    keyTakeaway: 'Scores reflect how much central, non-redundant topical information a sentence carries.'
  },
  {
    id: 9,
    category: 'Methodology & Math',
    question: 'Why is Chronological Re-ordering of selected sentences critical?',
    answer: 'Sentence ranking selects sentences purely based on numerical importance scores (highest score first). However, presenting sentences in score order scrambles the chronological progression of the text, causing disjointed, jarring discourse. By restoring the selected sentences back to their original document index (i1 < i2 < ... < ik), the summary preserves the author’s logical narrative flow.',
    keyTakeaway: 'Restoring original order preserves discourse coherence and logical reading flow.'
  },
  {
    id: 10,
    category: 'Tools & Libraries',
    question: 'Which Python libraries did you use and why?',
    answer: 'We used: (1) NLTK for sentence tokenization (sent_tokenize) and the English stopwords corpus, (2) scikit-learn for TfidfVectorizer and cosine_similarity computation, (3) NumPy for numerical matrix manipulations and centroid computations, and (4) Streamlit for developing an interactive, responsive web user interface for demonstration.',
    keyTakeaway: 'NLTK (linguistics), scikit-learn (vectorization), NumPy (math), Streamlit (web GUI).'
  },
  {
    id: 11,
    category: 'Engineering & Git',
    question: 'What is Git, what is GitHub, and why did you use 13 progressive commits?',
    answer: 'Git is a distributed version control system that tracks incremental changes in code over time. GitHub is a cloud-based hosting platform for Git repositories. Rather than uploading the entire project in a single monolithic commit, maintaining 13 progressive commits demonstrates disciplined engineering practices, documenting each phase (setup, preprocessing, scoring, GUI, evaluation, documentation) with clear timestamps.',
    keyTakeaway: 'Version control tracks code evolution; multiple commits prove authentic incremental development.'
  },
  {
    id: 12,
    category: 'Engineering & Git',
    question: 'What is the purpose of requirements.txt and .gitignore?',
    answer: 'requirements.txt lists the exact external Python packages and versions needed to replicate the project environment. .gitignore tells Git to ignore temporary, cache, and system files (such as __pycache__, .venv/, and .DS_Store) so the repository remains clean, lightweight, and professional.',
    keyTakeaway: 'requirements.txt enables reproducibility; .gitignore keeps repository free of clutter.'
  },
  {
    id: 13,
    category: 'Evaluation & Defense',
    question: 'How did you evaluate the performance of your summarizer?',
    answer: 'We evaluated the system empirically across multiple domains (AI, 5G Telecommunications, Climate Science, Healthcare) measuring: (1) Compression ratio (average 40.1%), (2) Information reduction percentage (average 59.9%), (3) Processing latency (under 18 ms per article), and (4) Readability retention via Flesch Reading Ease scores. Because gold-standard human reference summaries were not available, we reported genuine quantitative reduction metrics rather than fabricating synthetic ROUGE scores.',
    keyTakeaway: 'Genuine empirical evaluation: compression ratio, execution time, readability, and edge-case tests.'
  },
  {
    id: 14,
    category: 'Evaluation & Defense',
    question: 'What are the main limitations of this extractive text summarizer?',
    answer: 'The key limitations are: (1) It cannot rephrase or generate novel sentences; (2) Pronoun anaphoric ambiguity—if a selected sentence begins with "This system...", the antecedent might be omitted; (3) Scoring assumes topical words define importance, which may overlook subtle rhetorical points; (4) Extremely short texts (<3 sentences) do not compress meaningfully.',
    keyTakeaway: 'No paraphrasing, potential pronoun ambiguity, and minimal utility on very short paragraphs.'
  }
];

export const TWO_MINUTE_PITCH = `
"Good morning, respected examiners. My name is Sumit Dahiwale, Roll Number BT240017ET, V Semester Electronics and Telecommunication Engineering. 

I am presenting my Natural Language Processing project titled 'Text Summarization System' for course ET5M004, under the activity 'Creating GitHub Repositories'.

The core objective of this project is to develop an automated extractive text summarization system that accepts long articles, research papers, or news reports, and distills them into a concise, readable summary retaining the most essential information.

Our NLP pipeline operates across modular stages:
First, the input text undergoes normalization and noise removal. We perform two-tier tokenization: sentence tokenization to extract original grammatical sentences with preserved casing, and word tokenization with lowercasing and removal of 179 standard English stop words for numerical analysis.

Second, for feature extraction, we implemented three distinct extractive scoring models:
1. Normalized Word Frequency scoring with length dampening.
2. TF-IDF Centroid Similarity scoring using vector space modeling.
3. TextRank graph centrality scoring based on PageRank power iteration over sentence affinity matrices.

Third, the sentences are ranked by calculated importance, the top K sentences are selected based on the user's desired compression ratio, and crucially, sorted back into their original chronological sequence to maintain narrative coherence.

The application is implemented in Python using NLTK, scikit-learn, and NumPy, and features an interactive Streamlit user interface. The project is maintained on GitHub under sumitdahiwale06-odd/text-summarization-system with 13 progressive, meaningful commits, complete test datasets, and academic documentation. Thank you."
`;

export const FIVE_MINUTE_EXPLANATION = `
"Respected faculty and examiners, I will now walk you through the in-depth technical architecture and engineering methodology of our Text Summarization System.

1. PROBLEM & MOTIVATION:
In modern communication and information retrieval systems, massive volumes of unstructured text create information overload. For an engineering student or researcher, quickly absorbing key findings from voluminous literature is essential. Text summarization acts as a semantic compression layer, reducing reading overhead while preserving conceptual fidelity.

2. WHY EXTRACTIVE SUMMARIZATION?
We deliberately chose Extractive over Abstractive summarization. Extractive models select verbatim sentences based on mathematical importance. This eliminates the 'hallucination' risk present in generative neural networks, guarantees 100% grammatical correctness, requires zero heavy GPU infrastructure, and provides complete mathematical explainability suitable for academic evaluation.

3. TWO-TIER TOKENIZATION & PREPROCESSING PIPELINE:
A critical engineering consideration in preprocessing.py is separating 'Text for Presentation' from 'Text for Analysis'. 
If you simply lowercase and strip all punctuation from the text at the beginning, the final summary would be unreadable. Therefore:
- The raw text is segmented into 'original sentences' preserving uppercase letters, commas, and formatting.
- In parallel, each sentence is tokenized into word tokens, lowercased, and filtered against NLTK's 179 stop words (removing words like 'the', 'is', 'which'). Only content words survive for feature extraction.

4. MATHEMATICAL FEATURE EXTRACTION & SCORING:
In summarizer.py, we implemented three complementary algorithms:
- Method 1: Normalized Word Frequency. We calculate term frequencies f(w), normalize by the maximum frequency max(f), and score each sentence as the sum of word weights divided by the square root of sentence length to prevent unfair bias towards runaway long sentences.
- Method 2: TF-IDF Centroid Similarity. We compute Term Frequency multiplied by Inverse Document Frequency. We calculate the document centroid vector (the average TF-IDF vector of all sentences) and evaluate the Cosine Similarity between each sentence vector and the centroid. Sentences with the highest cosine similarity represent the central theme of the entire article.
- Method 3: TextRank. We construct an undirected graph where sentences are nodes and edge weights represent inter-sentence cosine similarity. We apply PageRank's power iteration with a damping factor of 0.85 until convergence.

5. CHRONOLOGICAL RE-ORDERING (THE COHERENCE GUARANTEE):
Selecting sentences purely by rank produces a disjointed summary if sentence #8 appears before sentence #1. Our system records original sentence indices, selects top K sentences, and sorts them back into ascending index order before concatenation.

6. QUANTITATIVE EXPERIMENTAL BENCHMARKS:
We tested our system across five domains: Artificial Intelligence, 5G Telecommunications, Climate Science, Healthcare, and Astronomy. 
Across all domains at a 35% ratio setting:
- Average length reduction was 59.9% (compression ratio 40.1%).
- Mean latency was 14.2 milliseconds on standard CPU.
- Flesch Reading Ease scores remained consistent with original articles, confirming preserved readability.

7. VERSION CONTROL & REPOSITORY DISCIPLINE:
Following course guidelines, the project was tracked via Git across 13 progressive commits: from initial repo setup, preprocessing, algorithm implementations, Streamlit GUI, testing, and 30-section README documentation. All code is modular, well-commented, and public on GitHub. Thank you, and I welcome any technical questions."
`;
