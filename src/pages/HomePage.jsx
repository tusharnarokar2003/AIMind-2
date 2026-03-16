import Navbar from "../components/Navbar";
import "./HomePage.css";

import { useMood } from '../context/MoodContext';
import { getMoodTheme } from '../utils/moodThemes';


const getYouTubeRecommendations = (mainEmotion) => {
  const recommendations = {
    joy: [
      {
        id: 1,
        title: "Uplifting Music Mix",
        channel: "Chill Vibes",
        thumbnail: "🎵",
        duration: "1:24:30",
        url: "https://www.youtube.com/watch?v=jfKfPfyJRdk"
      },
      {
        id: 2,
        title: "Feel Good Comedy",
        channel: "Laugh Factory",
        thumbnail: "😄",
        duration: "15:42",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      },
      {
        id: 3,
        title: "Inspiring Success Stories",
        channel: "Motivation Hub",
        thumbnail: "🌟",
        duration: "22:15",
        url: "https://www.youtube.com/watch?v=ZXsQAXx_ao0"
      }
    ],
    sadness: [
      {
        id: 1,
        title: "Uplifting Motivation",
        channel: "Hope & Healing",
        thumbnail: "🌈",
        duration: "16:20",
        url: "https://www.youtube.com/watch?v=HW_Rduet230"
      },
      {
        id: 2,
        title: "Feel Better Playlist",
        channel: "Music Therapy",
        thumbnail: "🎶",
        duration: "45:10",
        url: "https://www.youtube.com/watch?v=1ZYbU82GVz4"
      },
      {
        id: 3,
        title: "Self-Care Tips",
        channel: "Wellness Journey",
        thumbnail: "💝",
        duration: "14:35",
        url: "https://www.youtube.com/watch?v=O-6f5wQXSu8"
      }
    ],
    anger: [
      {
        id: 1,
        title: "Anger Management Techniques",
        channel: "Wellness Guide",
        thumbnail: "🔥",
        duration: "12:45",
        url: "https://www.youtube.com/watch?v=BsVq5R_F6RA"
      },
      {
        id: 2,
        title: "Calming Workout",
        channel: "Fitness Therapy",
        thumbnail: "💪",
        duration: "25:30",
        url: "https://www.youtube.com/watch?v=sTANio_2E0Q"
      },
      {
        id: 3,
        title: "Release Stress",
        channel: "Mental Health Hub",
        thumbnail: "🌊",
        duration: "18:15",
        url: "https://www.youtube.com/watch?v=hDEavLJmcCY"
      }
    ],
    fear: [
      {
        id: 1,
        title: "Anxiety Relief Breathing",
        channel: "Wellness Guide",
        thumbnail: "💨",
        duration: "10:15",
        url: "https://www.youtube.com/watch?v=odADwWzHR24"
      },
      {
        id: 2,
        title: "Grounding Techniques",
        channel: "Mental Health Hub",
        thumbnail: "🌱",
        duration: "12:45",
        url: "https://www.youtube.com/watch?v=30VMIEmA114"
      },
      {
        id: 3,
        title: "Stress Relief Meditation",
        channel: "Calm Mind",
        thumbnail: "🕊️",
        duration: "18:30",
        url: "https://www.youtube.com/watch?v=inpok4MKVLM"
      }
    ],
    disgust: [
      {
        id: 1,
        title: "Setting Healthy Boundaries",
        channel: "Life Coach",
        thumbnail: "🛡️",
        duration: "14:20",
        url: "https://www.youtube.com/watch?v=5U5anz2e7WQ"
      },
      {
        id: 2,
        title: "Cleansing Meditation",
        channel: "Mindful Journey",
        thumbnail: "🌿",
        duration: "20:30",
        url: "https://www.youtube.com/watch?v=QS2yDmWk0vs"
      },
      {
        id: 3,
        title: "Reset Your Energy",
        channel: "Wellness Path",
        thumbnail: "✨",
        duration: "16:45",
        url: "https://www.youtube.com/watch?v=aEqlQvczMJQ"
      }
    ],
    surprise: [
      {
        id: 1,
        title: "Adapting to Change",
        channel: "Life Skills",
        thumbnail: "🎭",
        duration: "13:25",
        url: "https://www.youtube.com/watch?v=BQ4yd2W50No"
      },
      {
        id: 2,
        title: "Embrace the Unexpected",
        channel: "Growth Mindset",
        thumbnail: "🌟",
        duration: "17:50",
        url: "https://www.youtube.com/watch?v=8jPQjjsBbIc"
      },
      {
        id: 3,
        title: "Finding Opportunity",
        channel: "Success Coach",
        thumbnail: "💡",
        duration: "19:15",
        url: "https://www.youtube.com/watch?v=mgmVOuLgFB0"
      }
    ],
    neutral: [
      {
        id: 1,
        title: "Productivity Tips",
        channel: "Get Things Done",
        thumbnail: "⚡",
        duration: "19:25",
        url: "https://www.youtube.com/watch?v=Jkl1vMNvvHU"
      },
      {
        id: 2,
        title: "Learn Something New",
        channel: "Knowledge Hub",
        thumbnail: "📚",
        duration: "22:40",
        url: "https://www.youtube.com/watch?v=5MgBikgcWnY"
      },
      {
        id: 3,
        title: "Daily Inspiration",
        channel: "Motivation Daily",
        thumbnail: "🎯",
        duration: "15:30",
        url: "https://www.youtube.com/watch?v=ZXsQAXx_ao0"
      }
    ]
  };

  return recommendations[mainEmotion] || recommendations.neutral;
};

export default function HomePage() {

  const { currentMood, mainEmotion, loading } = useMood();


  if (loading) {
    return (
      <>
        <Navbar />
        <div className="home-page loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <h3>Preparing your personalized experience...</h3>
          </div>
        </div>
      </>
    );
  }

 
  const theme = getMoodTheme(mainEmotion);
  

  const youtubeVideos = getYouTubeRecommendations(mainEmotion);

  return (
    <>
      <Navbar />
      <div 
        className="home-page"
        style={{
          background: theme.gradient || 'linear-gradient(180deg, #f5e6d3 0%, #f0d9bf 50%, #ead1b8 100%)',
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

        
          <section className="youtube-section">
            <h2 style={{ color: theme.colors.accent }}>
              📺 Personalized Videos for You
            </h2>
            <div className="youtube-grid">
              {youtubeVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="youtube-card"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)'
                  }}
                >
                  <div 
                    className="youtube-thumbnail"
                    style={{ backgroundColor: theme.colors.secondary }}
                  >
                    <span className="youtube-emoji">{video.thumbnail}</span>
                    <span className="youtube-duration">{video.duration}</span>
                  </div>
                  <div className="youtube-info">
                    <h3>{video.title}</h3>
                    <p className="youtube-channel">{video.channel}</p>
                  </div>
                </a>
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
    </>
  );
}