from flask import Flask, request, jsonify
from flask_cors import CORS
from model_loader import smollm_model  
import threading

app = Flask(__name__)
CORS(app) 


conversations = {}


def load_model_background():
    try:
        smollm_model.load_model()  
    except Exception as e:
        print(f"❌ Error loading model: {e}")


model_thread = threading.Thread(target=load_model_background)
model_thread.start()

@app.route('/health', methods=['GET'])
def health_check():
    """Check if server and model are ready"""
    model_ready = smollm_model.pipe is not None 
    return jsonify({
        'status': 'healthy',
        'model_loaded': model_ready
    })

@app.route('/chat', methods=['POST'])
def chat():
    """
    Handle chat messages
    Expects JSON: { "message": "user message", "user_id": "unique_id" }
    """
    try:
       
        if not smollm_model.pipe:  
            return jsonify({
                'error': 'Model is still loading. Please wait a moment and try again.'
            }), 503
        
 
        data = request.json
        user_message = data.get('message', '')
        user_id = data.get('user_id', 'default')
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400
        
        
        if user_id not in conversations:
            conversations[user_id] = []
        
      
        conversations[user_id].append({
            "role": "user",
            "content": user_message
        })
        
        
        if len(conversations[user_id]) > 6:
            conversations[user_id] = conversations[user_id][-6:]
        
        
        assistant_response = smollm_model.generate_response(  
            conversations[user_id]
        )
    
        conversations[user_id].append({
            "role": "assistant",
            "content": assistant_response
        })
        
        return jsonify({
            'response': assistant_response,
            'user_id': user_id
        })
    
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({
            'error': 'An error occurred while processing your message. Please try again.'
        }), 500

@app.route('/clear', methods=['POST'])
def clear_conversation():
    """Clear conversation history for a user"""
    try:
        data = request.json
        user_id = data.get('user_id', 'default')
        
        if user_id in conversations:
            conversations[user_id] = []
        
        return jsonify({'message': 'Conversation cleared successfully'})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print(" Starting AIMind Chat Server...")
    print(" Loading SmolLM2-360M model (lightweight & fast!)...")
    print(" Server will be available at: http://localhost:5000")
    print(" Check /health endpoint to see when model is ready")
    print(" SmolLM2 loads in ~10-30 seconds (much faster than Mistral!)")
   
    app.run(debug=True, port=5000, host='0.0.0.0')