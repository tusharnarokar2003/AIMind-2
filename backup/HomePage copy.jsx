import Navbar from "../components/Navbar";
import "./HomePage.css";

import { useMood } from '../context/MoodContext';
import { getMoodTheme } from '../utils/moodThemes';


export default function HomePage() {

  const { currentMood, mainEmotion, loading } = useMood();

 
  if (loading) {
    return (
      <div className="home-page loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Preparing your personalized experience...</p>
        </div>
      </div>
    );
  }

 
  const theme = getMoodTheme(mainEmotion);

  return (
    <div 
      className="home-page"
      style={{
        background: theme.gradient,
        color: theme.colors.text
      }}
    >
     
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-greeting">{theme.greeting}</h1>
          <p className="hero-message">{theme.message}</p>
          
      
          {currentMood && (
            <div 
              className="mood-badge"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.text
              }}
            >
              <span className="mood-emoji">{theme.emoji}</span>
              <span className="mood-text">
                Currently feeling: {mainEmotion}
              </span>
            </div>
          )}
        </div>
      </header>


      <main className="main-content">
 
        <section className="suggestions-section">
          <h2 style={{ color: theme.colors.accent }}>
            Suggested Activities
          </h2>
          <div className="suggestions-grid">
            {theme.suggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="suggestion-card"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderLeft: `4px solid ${theme.colors.accent}`
                }}
              >
                <p>{suggestion}</p>
              </div>
            ))}
          </div>
        </section>

   
        <section className="content-section">
          <h2 style={{ color: theme.colors.accent }}>
            Recommended for You
          </h2>
          <div className="content-grid">
            {theme.content.map((item, index) => (
              <div 
                key={index}
                className="content-card"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)'
                }}
              >
                <div 
                  className="content-icon"
                  style={{ backgroundColor: theme.colors.secondary }}
                >
                  {item.icon}
                </div>
                <h3 style={{ color: theme.colors.accent }}>{item.title}</h3>
                <p>{item.description}</p>
                <button 
                  className="explore-button"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.text
                  }}
                >
                  Explore
                </button>
              </div>
            ))}
          </div>
        </section>

      
        {currentMood && currentMood.emotions && (
          <section className="emotions-section">
            <h2 style={{ color: theme.colors.accent }}>
              Your Emotional Profile
            </h2>
            <div className="emotions-chart">
              {Object.entries(currentMood.emotions).map(([emotion, value]) => (
                <div key={emotion} className="emotion-bar">
                  <span className="emotion-label">{emotion}</span>
                  <div className="emotion-progress">
                    <div 
                      className="emotion-fill"
                      style={{
                        width: `${(value / 5) * 100}%`,
                        backgroundColor: theme.colors.accent
                      }}
                    />
                  </div>
                  <span className="emotion-value">{value}/5</span>
                </div>
              ))}
            </div>
          </section>
        )}

       
        {!currentMood && (
          <section className="no-mood-section">
            <div className="no-mood-card">
              <h2>Start Your Journey 🌱</h2>
              <p>
                Write your first journal entry to unlock personalized
                insights and recommendations based on your emotions.
              </p>
              <button 
                className="cta-button"
                onClick={() => window.location.href = '/journaling'}
              >
                Write Your First Entry
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
