"""
Streamlit Web Application: Text Summarization System
Course: Natural Language Processing (ET5M004) - V Semester ETC
Student: Sumit Dahiwale | Roll No: BT240017ET
GitHub Repository: https://github.com/sumitdahiwale06-odd/text-summarization-system.git

Run locally:
    streamlit run source_code/app.py
"""

import streamlit as st
import time
from summarizer import generate_extractive_summary
from utils import calculate_flesch_reading_ease, compute_word_count

# Page Configuration
st.set_page_config(
    page_title="Text Summarization System | Sumit Dahiwale",
    page_icon="📝",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling for Academic Polish
st.markdown("""
    <style>
    .main-header {
        font-size: 2.2rem;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 0.2rem;
    }
    .sub-header {
        font-size: 1rem;
        color: #64748b;
        margin-bottom: 1.5rem;
    }
    .metric-card {
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 16px;
        text-align: center;
    }
    .metric-val {
        font-size: 1.8rem;
        font-weight: 700;
        color: #0f172a;
    }
    .metric-lbl {
        font-size: 0.85rem;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }
    .highlighted-summary {
        background-color: #f0fdf4;
        border-left: 4px solid #22c55e;
        padding: 16px;
        border-radius: 6px;
        font-size: 1.05rem;
        line-height: 1.6;
        color: #14532d;
    }
    </style>
""", unsafe_allow_html=True)

# Sample Articles Library
SAMPLE_ARTICLES = {
    "Select an example article...": "",
    "Artificial Intelligence & Machine Learning": (
        "Artificial Intelligence (AI) and Machine Learning (ML) have fundamentally transformed modern technology and daily life. "
        "Machine learning algorithms learn patterns and correlations directly from extensive datasets rather than adhering strictly to handcrafted rules. "
        "Supervised learning trains models on labeled training pairs, whereas unsupervised learning discovers latent structures in unannotated data. "
        "Natural Language Processing, a specialized subfield of artificial intelligence, enables computers to read, interpret, and generate human language effectively. "
        "Modern deep learning architectures utilize multilayer neural networks to perform complex cognitive tasks including speech recognition, computer vision, and machine translation. "
        "However, deploying these sophisticated systems requires substantial computational power, rigorous data sanitization, and continuous monitoring. "
        "Ethical considerations regarding algorithmic bias, transparency, and data privacy remain critical challenges in ongoing AI governance. "
        "As researchers continue refining these architectures, future developments promise more energy-efficient and explainable intelligent systems."
    ),
    "Telecommunications: Evolution to 5G and 6G": (
        "Telecommunications infrastructure has experienced exponential advancement from early analog voice networks to high-speed digital cellular communications. "
        "The fifth generation of mobile technology, known as 5G, offers gigabit-per-second peak data speeds, ultra-low latency, and massive machine-type connectivity. "
        "Unlike earlier generations that operated solely on sub-6 GHz frequencies, 5G incorporates millimeter wave spectrum to support dense urban bandwidth demands. "
        "Network slicing allows operators to divide a single physical telecommunication network into multiple virtual, end-to-end logical networks tailored to specific applications. "
        "This capability proves indispensable for mission-critical applications such as autonomous vehicular communication, industrial automation, and remote telemedicine. "
        "Telecommunication engineers are now actively researching 6G networks, which aim to integrate terahertz communication and artificial intelligence directly into the physical radio layer. "
        "Security, interference mitigation, and power efficiency remain paramount research objectives in next-generation wireless communications."
    ),
    "Climate Change & Renewable Energy Transition": (
        "The global transition toward renewable energy has accelerated in response to worsening climate change and rising greenhouse gas emissions. "
        "Fossil fuels, which have historically dominated electrical power generation, release carbon dioxide that traps atmospheric heat and alters planetary weather patterns. "
        "Solar photovoltaic systems and wind turbines now represent the most cost-effective methods for generating clean, carbon-neutral electricity globally. "
        "However, the inherent intermittency of solar irradiance and wind velocity necessitates resilient grid infrastructure and scalable energy storage technologies. "
        "Lithium-ion battery installations, pumped hydroelectric storage, and emerging green hydrogen vectors provide critical load-balancing capabilities. "
        "International climate treaties have set ambitious net-zero emissions targets that require swift policy enforcement, infrastructural investment, and international cooperation. "
        "Decarbonizing industrial manufacturing and heavy transportation will be decisive in achieving long-term atmospheric stabilization."
    ),
    "Natural Language Processing in Clinical Healthcare": (
        "Natural Language Processing is playing an increasingly vital role in modern biomedical informatics and clinical decision support. "
        "Hospitals and clinical research centers generate vast quantities of unstructured textual documentation inside electronic health records each day. "
        "Physician progress notes, diagnostic discharge summaries, and pathology reports contain critical clinical insights that traditional relational databases cannot easily parse. "
        "Extractive and abstractive text summarization algorithms help healthcare providers rapidly review extensive patient medical histories before administering critical treatments. "
        "Clinical NLP systems also extract vital patient attributes, detect adverse drug-drug interactions, and categorize diagnostic billing codes with high consistency. "
        "Maintaining patient privacy in compliance with healthcare regulations requires robust named entity recognition pipelines that reliably de-identify protected health information. "
        "Implementing reliable clinical NLP workflows bridges the gap between raw medical documentation and accelerated patient diagnosis."
    )
}

# Sidebar: Student & Project Information
with st.sidebar:
    st.markdown("### 🎓 Academic Project Details")
    st.markdown("""
    **Course:** Natural Language Processing (ET5M004)  
    **Program:** B.Tech V Semester  
    **Branch:** Electronics & Telecommunication (ETC)  
    **Student:** Sumit Dahiwale  
    **Roll No:** BT240017ET  
    **Activity:** Creating GitHub Repositories
    """)
    st.markdown("---")

    st.markdown("### ⚙️ Summarizer Controls")
    
    # Algorithm Selection
    algorithm_choice = st.selectbox(
        "NLP Scoring Method:",
        options=["TF-IDF Centroid Scoring", "Word Frequency Scoring", "TextRank Graph Centrality"],
        index=0,
        help="Choose the mathematical technique used to assign importance scores to sentences."
    )
    method_key = {
        "TF-IDF Centroid Scoring": "tfidf",
        "Word Frequency Scoring": "frequency",
        "TextRank Graph Centrality": "textrank"
    }[algorithm_choice]

    # Summary Length / Ratio Selector
    ratio_mode = st.radio(
        "Summary Length Mode:",
        options=["Standard Ratio (Preset)", "Custom Sentence Count"],
        index=0
    )

    if ratio_mode == "Standard Ratio (Preset)":
        preset_choice = st.select_slider(
            "Target Summary Ratio:",
            options=["Short (20%)", "Medium (35%)", "Detailed (50%)"],
            value="Medium (35%)"
        )
        ratio_map = {
            "Short (20%)": 0.20,
            "Medium (35%)": 0.35,
            "Detailed (50%)": 0.50
        }
        selected_ratio = ratio_map[preset_choice]
        max_sentences = None
    else:
        max_sentences = st.slider("Max Sentences in Summary:", min_value=1, max_value=10, value=3)
        selected_ratio = 0.35

    st.markdown("---")
    st.markdown("### 🔗 Project Links")
    st.markdown("[GitHub Repository](https://github.com/sumitdahiwale06-odd/text-summarization-system.git)")

# Main Header Section
st.markdown('<div class="main-header">Text Summarization System</div>', unsafe_allow_html=True)
st.markdown(
    '<div class="sub-header">Extractive NLP pipeline: Preprocessing → Tokenization → Feature Extraction → Sentence Scoring → Chronological Reordering</div>',
    unsafe_allow_html=True
)

# Preset Sample Text Loader
sample_selection = st.selectbox("📚 Load Sample Academic/Technical Article:", options=list(SAMPLE_ARTICLES.keys()))

default_text = SAMPLE_ARTICLES[sample_selection] if sample_selection in SAMPLE_ARTICLES else ""

# Input Text Area
user_input = st.text_area(
    "Enter or paste the source text to summarize:",
    value=default_text,
    height=220,
    placeholder="Paste long articles, research papers, news reports, or lecture notes here..."
)

col_btns = st.columns([1, 1, 4])
with col_btns[0]:
    summarize_button = st.button("🚀 Generate Summary", type="primary", use_container_width=True)
with col_btns[1]:
    clear_button = st.button("🧹 Clear Input", use_container_width=True)

if clear_button:
    st.rerun()

# Execution & Output
if summarize_button:
    if not user_input.strip():
        st.error("⚠️ Input text is empty. Please enter text or select a sample article to summarize.")
    else:
        start_time = time.time()
        with st.spinner("Executing NLP Pipeline: Tokenizing, Computing Features, and Scoring Sentences..."):
            result = generate_extractive_summary(
                text=user_input,
                method=method_key,
                ratio=selected_ratio,
                max_sentences=max_sentences
            )
        elapsed_time = round((time.time() - start_time) * 1000, 2)

        if result.get("error"):
            st.error(f"⚠️ Error: {result['error']}")
        else:
            st.success(f"✅ Summary generated successfully using **{algorithm_choice}** in {elapsed_time} ms!")

            # Statistics Metric Row
            col1, col2, col3, col4 = st.columns(4)
            with col1:
                st.markdown(f"""
                <div class="metric-card">
                    <div class="metric-val">{result['original_word_count']}</div>
                    <div class="metric-lbl">Original Words</div>
                </div>
                """, unsafe_allow_html=True)
            with col2:
                st.markdown(f"""
                <div class="metric-card">
                    <div class="metric-val">{result['summary_word_count']}</div>
                    <div class="metric-lbl">Summary Words</div>
                </div>
                """, unsafe_allow_html=True)
            with col3:
                st.markdown(f"""
                <div class="metric-card">
                    <div class="metric-val">{result['compression_ratio']}%</div>
                    <div class="metric-lbl">Compression Ratio</div>
                </div>
                """, unsafe_allow_html=True)
            with col4:
                st.markdown(f"""
                <div class="metric-card">
                    <div class="metric-val">{result['num_summary_sentences']} / {result['num_original_sentences']}</div>
                    <div class="metric-lbl">Sentences Kept</div>
                </div>
                """, unsafe_allow_html=True)

            st.markdown("<br>", unsafe_allow_html=True)

            # Generated Summary Display
            st.markdown("### 📄 Generated Extractive Summary")
            st.markdown(f'<div class="highlighted-summary">{result["summary"]}</div>', unsafe_allow_html=True)

            st.download_button(
                label="📥 Download Summary (.txt)",
                data=f"EXTRACTIVE SUMMARY (Generated by NLP Text Summarization System)\nStudent: Sumit Dahiwale (BT240017ET)\nMethod: {algorithm_choice}\n\n{result['summary']}\n\nStatistics:\nOriginal Words: {result['original_word_count']}\nSummary Words: {result['summary_word_count']}\nCompression: {result['compression_ratio']}%\nSentences: {result['num_summary_sentences']}/{result['num_original_sentences']}",
                file_name="summary_output.txt",
                mime="text/plain"
            )

            # Side-by-side Text Comparison
            st.markdown("---")
            st.markdown("### 🔍 Sentence Comparison & Selection Analysis")
            col_orig, col_summ = st.columns(2)

            with col_orig:
                st.markdown("**Original Text (with Selected Sentences Highlighted):**")
                annotated_html = []
                for idx, sent in enumerate(result['original_sentences']):
                    is_selected = any(item['index'] == idx and item['selected'] for item in result['sentence_rankings'])
                    if is_selected:
                        annotated_html.append(f'<mark style="background-color: #bbf7d0; padding: 2px 4px; border-radius: 4px;">[{idx+1}] {sent}</mark>')
                    else:
                        annotated_html.append(f'<span style="color: #64748b;">[{idx+1}] {sent}</span>')
                st.markdown("<div style='line-height: 1.8; font-size: 0.95rem;'>" + " ".join(annotated_html) + "</div>", unsafe_allow_html=True)

            with col_summ:
                st.markdown("**Chronologically Re-Ordered Summary:**")
                st.info(result['summary'])
                ease = calculate_flesch_reading_ease(result['summary'])
                st.caption(f"Flesch Reading Ease Score: **{ease}** (Standard English Readability)")

            # Detailed Pipeline Inspector Expander
            with st.expander("🔬 Deep-Dive: NLP Pipeline Steps & Sentence Ranking Table", expanded=False):
                st.markdown("#### Sentence Importance Ranking Table")
                st.dataframe(
                    [
                        {
                            "Rank": item["rank"],
                            "Original Order": f"Sentence #{item['index'] + 1}",
                            "Importance Score": item["score"],
                            "Included in Summary": "✅ Yes" if item["selected"] else "❌ No",
                            "Sentence Content": item["sentence"]
                        }
                        for item in sorted(result["sentence_rankings"], key=lambda x: x["rank"])
                    ],
                    use_container_width=True
                )

                st.markdown("""
                **Why does Extractive Summarization re-order sentences chronologically?**  
                Even though sentences are selected by their ranking score (highest importance first), 
                presenting them in score order would scramble the natural narrative chronology and make the text confusing to read. 
                Sorting the selected sentences back to their original document sequence preserves discourse coherence.
                """)

# Footer
st.markdown("---")
st.caption(
    "NLP Academic Project (ET5M004) — Department of Electronics and Telecommunication Engineering | "
    "Student: Sumit Dahiwale (BT240017ET) | GitHub: [text-summarization-system](https://github.com/sumitdahiwale06-odd/text-summarization-system.git)"
)
