from transformers import AutoTokenizer, AutoModelForSequenceClassification

model_name = "j-hartmann/emotion-english-distilroberta-base"

AutoTokenizer.from_pretrained(model_name)
AutoModelForSequenceClassification.from_pretrained(model_name)

print("Model downloaded and cached locally ✅")
