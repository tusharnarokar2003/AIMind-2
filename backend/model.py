import sys
import json
import warnings
import os
import logging
import spacy
from transformers import pipeline
import torch

# Suppress ALL output except our JSON result
warnings.filterwarnings('ignore')
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['TRANSFORMERS_VERBOSITY'] = 'error'
os.environ['TOKENIZERS_PARALLELISM'] = 'false'

# Suppress transformers logging
logging.getLogger('transformers').setLevel(logging.ERROR)

# Redirect stderr temporarily during model loading
import io
stderr_backup = sys.stderr
sys.stderr = io.StringIO()

# Check if CUDA (NVIDIA GPU) is available
device = 0 if torch.cuda.is_available() else -1  # 0 = first GPU, -1 = CPU

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Load emotion classifier with GPU support
classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None,
    truncation=True,
    device=device  # Using GPU (cuda:0)
)

# Restore stderr after model loading
sys.stderr = stderr_backup

def analyze_journal_text(text):
    """
    Analyzes mood from journal text using spaCy and emotion classification
    Returns emotions dict and main emotion
    """

    doc = nlp(text)
    sentences = [sent.text for sent in doc.sents]
    
   
    if not sentences:
        return {
            'emotions': {
                'anger': 0,
                'disgust': 0,
                'fear': 0,
                'joy': 0,
                'neutral': 0,
                'sadness': 0,
                'surprise': 0
            },
            'main_emotion': 'neutral'
        }
    

    emotion_totals = {}
    
    for sentence in sentences:
        results = classifier(sentence)[0]
        for res in results:
            if res['label'] not in emotion_totals:
                emotion_totals[res['label']] = 0
            emotion_totals[res['label']] += res['score']
    
    
    emotions = {e: round((score / len(sentences)) * 5) for e, score in emotion_totals.items()}
    
   
    main_emotion = max(emotions, key=emotions.get)
    
    return {
        'emotions': emotions,
        'main_emotion': main_emotion
    }

if __name__ == '__main__':
    
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No journal text provided'}))
        sys.exit(1)
    
    journal_text = sys.argv[1]
    
    
    result = analyze_journal_text(journal_text)
    
    
    print(json.dumps(result))


