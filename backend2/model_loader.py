"""
Loads and manages the SmolLM2-360M-Instruct model from Hugging Face
SmolLM3
Lightweight alternative to Mistral-7B - much faster and smaller!
"""
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
import torch
import accelerate  

class SmolLMModel:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.pipe = None
        self.system_prompt = """You are an emotionally intelligent mental health support assistant.

Your role is to:
• Understand the emotional state of the user from their words
• Respond with empathy, warmth, and clarity
• Keep replies short, calm, and human-like
• Never judge, shame, or dismiss the user's feelings

Guidelines:
• Acknowledge emotions before giving any suggestion
• Use simple, gentle language
• Avoid long explanations or lectures
• Do NOT diagnose medical conditions
• Do NOT replace a therapist or doctor
• Encourage self-reflection, grounding, and self-care when appropriate

Emotional Handling:
• If the user expresses sadness, depression, anxiety, fear, anger, joy, or confusion:
  – First validate how they feel
  – Then offer a small supportive thought or grounding idea

Crisis Handling:
• If the user expresses self-harm, suicidal thoughts, or extreme distress:
  – Respond with care and seriousness
  – Encourage them to seek immediate help from trusted people or local emergency services
  – Do not provide instructions or harmful details

Tone:
• Calm
• Supportive
• Understanding
• Human, not robotic

Response Length:
• 2–3 short sentences maximum
• Keep it brief and natural like texting a friend
• Avoid long paragraphs

Important:
• Do NOT ask repetitive questions
• Do NOT repeat yourself
• Focus on acknowledging feelings and offering gentle support
• Provide comfort, not interrogation

Goal:
Make the user feel heard, understood, and a little lighter than before."""
    
    def load_model(self):
        """Load SmolLM2 model and tokenizer - much faster than Mistral!"""
        print("Loading SmolLM2-360M-Instruct model...")
        print("✨ This is a lightweight model - loads in seconds!")
        
     
        model_name = "HuggingFaceTB/SmolLM2-360M-Instruct"
        
     
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        
    
        device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"📱 Using device: {device}")
        
        
        self.model = AutoModelForCausalLM.from_pretrained(
            model_name,
            dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            
            low_cpu_mem_usage=True
        )
        device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = self.model.to(device)
        
     
        self.pipe = pipeline(
            "text-generation",
            model=self.model, 
            tokenizer=self.tokenizer,
            max_new_tokens=40,  
            temperature=0.8,
            top_p=0.92,
            top_k=50,
            do_sample=True,
            repetition_penalty=1.2,
            pad_token_id=self.tokenizer.eos_token_id
        )
        
        print("✅ SmolLM2 model loaded successfully!")
        print("💡 Model size: ~360M parameters (~700MB)")
    
    def format_conversation(self, conversation_history):
        """Format conversation history for SmolLM2 with better structure"""
      
        formatted = f"<|im_start|>system\n{self.system_prompt}<|im_end|>\n"
        
    
        for msg in conversation_history:
            if msg["role"] == "user":
                formatted += f"<|im_start|>user\n{msg['content']}<|im_end|>\n"
            elif msg["role"] == "assistant":
                formatted += f"<|im_start|>assistant\n{msg['content']}<|im_end|>\n"
        
 
        formatted += "<|im_start|>assistant\n"
        return formatted
    
    def generate_response(self, conversation_history):
        """Generate response from SmolLM2 model"""
        if not self.pipe:
            raise Exception("Model not loaded. Call load_model() first.")
        
 
        prompt = self.format_conversation(conversation_history)
        
  
        result = self.pipe(
            prompt,
            max_new_tokens=150,
            pad_token_id=self.tokenizer.eos_token_id,
            eos_token_id=self.tokenizer.eos_token_id,
            return_full_text=False,
            num_return_sequences=1
        )
        
     
        response = result[0]['generated_text'].strip()
    
        response = self._clean_response(response, conversation_history)
        
        return response
    
    def _clean_response(self, response, conversation_history):
        """Clean and validate the response"""
      
        response = response.replace("<|im_start|>", "").replace("<|im_end|>", "")
        
        prefixes_to_remove = ["assistant\n", "Assistant:", "User:", "\n\n", "assistant"]
        for prefix in prefixes_to_remove:
            if response.startswith(prefix):
                response = response[len(prefix):].strip()
        
  
        if "<|im_start|>" in response:
            response = response.split("<|im_start|>")[0].strip()
        if "User:" in response:
            response = response.split("User:")[0].strip()
        if "\nuser\n" in response.lower():
            response = response.split("\nuser\n")[0].strip()
        
       
        if len(conversation_history) >= 2:
            last_assistant_msg = None
            for msg in reversed(conversation_history):
                if msg["role"] == "assistant":
                    last_assistant_msg = msg["content"]
                    break
            
            
            if last_assistant_msg and self._is_too_similar(response, last_assistant_msg):
                response = self._generate_fallback_response(conversation_history)
        
        
        sentences = [s.strip() for s in response.replace('!', '.').replace('?', '.').split('.') if s.strip()]
        
        if len(sentences) > 3:
            response = '. '.join(sentences[:3]) + '.'
        elif len(sentences) == 0 or len(response.strip()) < 10:
            
            response = self._generate_fallback_response(conversation_history)
        else:
            response = '. '.join(sentences) + '.'
        
        
        words = response.split()
        if len(words) > 50:
          
            sentences = response.split('.')
            truncated = []
            word_count = 0
            for sentence in sentences:
                sentence_words = sentence.split()
                if word_count + len(sentence_words) <= 50:
                    truncated.append(sentence)
                    word_count += len(sentence_words)
                else:
                    break
            response = '.'.join(truncated) + '.'
        
      
        response = response.strip()
        if not response.endswith(('.', '!', '?')):
            response += '.'
        
        return response
    
    def _is_too_similar(self, text1, text2):
        """Check if two texts are too similar (potential loop)"""
   
        words1 = set(text1.lower().split())
        words2 = set(text2.lower().split())
        
        if len(words1) == 0 or len(words2) == 0:
            return False
        
\
        intersection = len(words1.intersection(words2))
        union = len(words1.union(words2))
        similarity = intersection / union if union > 0 else 0
        
       
        return similarity > 0.7
    
    def _generate_fallback_response(self, conversation_history):
        """Generate a fallback response when model gets stuck"""
 
        last_user_msg = ""
        for msg in reversed(conversation_history):
            if msg["role"] == "user":
                last_user_msg = msg["content"].lower()
                break
        
      
        if "sad" in last_user_msg or "depressed" in last_user_msg or "down" in last_user_msg:
            return "I can hear the heaviness in your words. It's okay to feel this way. What would help you right now?"
        
        elif "anxious" in last_user_msg or "anxiety" in last_user_msg or "worried" in last_user_msg or "nervous" in last_user_msg:
            return "Anxiety can feel so overwhelming. Your feelings are valid. Want to try taking a slow breath together?"
        
        elif "angry" in last_user_msg or "mad" in last_user_msg or "frustrated" in last_user_msg:
            return "I hear your frustration. That anger is telling you something. What do you need most right now?"
        
        elif "scared" in last_user_msg or "afraid" in last_user_msg or "fear" in last_user_msg:
            return "Fear can make everything uncertain. You're brave for sharing this. What feels safe to you right now?"
        
        elif "lonely" in last_user_msg or "alone" in last_user_msg:
            return "Loneliness is such a deep ache. I'm here with you right now. What helps you feel connected?"
        
        elif "tired" in last_user_msg or "exhausted" in last_user_msg or "drained" in last_user_msg:
            return "Exhaustion takes so much from us. Rest isn't weakness. What would feel restorative right now?"
        
        elif "cheat" in last_user_msg or "cheated" in last_user_msg:
            return "That's such a painful betrayal. Your hurt is completely valid. How are you taking care of yourself?"
        
        elif "hurt" in last_user_msg or "pain" in last_user_msg:
            return "I hear that hurt. It's real and it matters. Be gentle with yourself as you process this."
        
        else:
            
            return "I'm here to listen. Your feelings matter. What would help you most right now?"


smollm_model = SmolLMModel()