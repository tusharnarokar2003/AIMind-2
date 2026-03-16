import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Loader2, AlertCircle } from 'lucide-react';
import './MentalHealthChat.css';

export default function MentalHealthChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [checkingModel, setCheckingModel] = useState(true);
  const [userId] = useState(() => 'user_' + Math.random().toString(36).substr(2, 9));
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  
  useEffect(() => {
    const checkModelStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/health');
        const data = await response.json();
        setModelReady(data.model_loaded);
        setCheckingModel(false);
        
        
        if (!data.model_loaded) {
          setTimeout(checkModelStatus, 5000);
        }
      } catch (error) {
        console.error('Error checking model status:', error);
        setCheckingModel(false);
       
        setTimeout(checkModelStatus, 5000);
      }
    };

    checkModelStatus();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading || !modelReady) return;

    const userMessage = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    }]);

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          user_id: userId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString()
        }]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'error',
        content: error.message || 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      }]);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearConversation = async () => {
    try {
      await fetch('http://localhost:5000/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId })
      });
      setMessages([]);
    } catch (error) {
      console.error('Error clearing conversation:', error);
    }
  };

  return (
    <div className="mental-health-chat">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-header-content">
          <div>
            <h2 className="chat-title">AIMind Chat</h2>
            <p className="chat-subtitle">
              {checkingModel ? (
                "Connecting to AI..."
              ) : modelReady ? (
                "Your supportive companion"
              ) : (
                "Loading AI model, please wait..."
              )}
            </p>
          </div>
          <button onClick={clearConversation} className="clear-chat-btn">
            <Trash2 size={16} />
            <span>Clear Chat</span>
          </button>
        </div>
      </div>

      {!modelReady && !checkingModel && (
        <div className="model-warning">
          <AlertCircle size={20} />
          <p>AI model is loading... This may take 2-3 minutes on first startup.</p>
        </div>
      )}

  
      <div className="messages-container">
        <div className="messages-inner">
          {messages.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">
                <svg className="chat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="empty-title">Welcome to AIMind</h3>
              <p className="empty-text">
                I'm here to listen and support you. Share what's on your mind, and let's talk through it together.
              </p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-wrapper ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className={`message-bubble ${msg.role === 'user' ? 'user-bubble' : msg.role === 'error' ? 'error-bubble' : 'assistant-bubble'}`}>
                <p className="message-text">{msg.content}</p>
                <span className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message-wrapper assistant-message">
              <div className="message-bubble assistant-bubble loading-bubble">
                <Loader2 className="loading-icon" />
                <span className="loading-text">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="input-container">
        <div className="input-wrapper">
          <div className="input-group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={modelReady ? "Type your message..." : "Waiting for AI to load..."}
              className="message-input"
              disabled={loading || !modelReady}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim() || !modelReady}
              className="send-btn"
              title={!modelReady ? "Waiting for AI model to load" : "Send message"}
            >
              <Send size={18} />
            </button>
          </div>
          <p className="input-disclaimer">
            This is a supportive tool, not a replacement for professional help.
          </p>
        </div>
      </div>
    </div>
  );
}