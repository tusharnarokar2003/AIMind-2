
export const moodThemes = {
  joy: {
    greeting: "You're radiating joy! ✨",
    message: "Your positive energy is contagious. Keep shining!",
    colors: {
      primary: '#FFD93D',
      secondary: '#FFF9E6',
      text: '#2C1810',
      accent: '#FF6B35'
    },
    gradient: 'linear-gradient(135deg, #FFD93D 0%, #FF6B35 100%)',
    emoji: '😊',
    suggestions: [
      '🎉 Share your happiness with someone you care about',
      '🎨 Channel this energy into a creative project',
      '📸 Capture this moment in your photo journal',
      '🎵 Create a playlist of songs that match your mood'
    ],
    content: [
      {
        title: 'Gratitude Practice',
        description: 'Write down 3 things that made you smile today',
        icon: '🙏'
      },
      {
        title: 'Spread Positivity',
        description: 'Send an encouraging message to a friend',
        icon: '💌'
      },
      {
        title: 'Celebrate Wins',
        description: 'Acknowledge your recent achievements',
        icon: '🏆'
      }
    ]
  },

  sadness: {
    greeting: "It's okay to feel this way 💙",
    message: "Your feelings are valid. Take your time, and be gentle with yourself.",
    colors: {
      primary: '#7DB9DE',
      secondary: '#E8F4F8',
      text: '#1A4D5E',
      accent: '#4A90A4'
    },
    gradient: 'linear-gradient(135deg, #7DB9DE 0%, #4A90A4 100%)',
    emoji: '😔',
    suggestions: [
      '🤗 Reach out to someone you trust',
      '📝 Write about what youre feeling',
      '🎵 Listen to comforting music',
      '☕ Do something that brings you comfort'
    ],
    content: [
      {
        title: 'Self-Compassion',
        description: 'Practice being kind to yourself',
        icon: '💙'
      },
      {
        title: 'Talk It Out',
        description: 'Connect with supportive friends or family',
        icon: '💬'
      },
      {
        title: 'Gentle Activities',
        description: 'Watch a favorite movie or read a comforting book',
        icon: '📚'
      }
    ]
  },

  anger: {
    greeting: "Feeling intense? Let's channel it 🔥",
    message: "Your feelings matter. Let's find healthy ways to express them.",
    colors: {
      primary: '#FF6B6B',
      secondary: '#FFE5E5',
      text: '#4A1414',
      accent: '#C92A2A'
    },
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #C92A2A 100%)',
    emoji: '😤',
    suggestions: [
      '🏃 Physical activity can help release tension',
      '📝 Write out whats frustrating you',
      '🎨 Express yourself through art',
      '🧘 Try breathing exercises to calm down'
    ],
    content: [
      {
        title: 'Healthy Release',
        description: 'Exercise or physical activity',
        icon: '💪'
      },
      {
        title: 'Process Emotions',
        description: 'Journal about what triggered these feelings',
        icon: '📓'
      },
      {
        title: 'Problem Solving',
        description: 'Identify actionable steps for your situation',
        icon: '🎯'
      }
    ]
  },

  fear: {
    greeting: "Feeling anxious? You're safe here 🌙",
    message: "It's brave to acknowledge fear. Let's work through this together.",
    colors: {
      primary: '#B197FC',
      secondary: '#F3F0FF',
      text: '#2B1D47',
      accent: '#845EF7'
    },
    gradient: 'linear-gradient(135deg, #B197FC 0%, #845EF7 100%)',
    emoji: '😰',
    suggestions: [
      '🧘 Practice grounding techniques',
      '💭 Challenge anxious thoughts',
      '🌬️ Focus on your breathing',
      '📞 Talk to someone who makes you feel safe'
    ],
    content: [
      {
        title: 'Grounding Exercise',
        description: '5-4-3-2-1 sensory technique',
        icon: '🌟'
      },
      {
        title: 'Worry Time',
        description: 'Set aside 15 minutes to address concerns',
        icon: '⏰'
      },
      {
        title: 'Relaxation',
        description: 'Progressive muscle relaxation',
        icon: '🧘‍♀️'
      }
    ]
  },

  disgust: {
    greeting: "Something feels off? Let's address it 🌿",
    message: "Your boundaries and values matter. Honor how you feel.",
    colors: {
      primary: '#8FBC8F',
      secondary: '#F0F8F0',
      text: '#2C4A2C',
      accent: '#558B55'
    },
    gradient: 'linear-gradient(135deg, #8FBC8F 0%, #558B55 100%)',
    emoji: '😖',
    suggestions: [
      '🚪 Set healthy boundaries',
      '🧹 Cleanse your space (physically or mentally)',
      '📝 Identify whats bothering you',
      '🌱 Focus on what aligns with your values'
    ],
    content: [
      {
        title: 'Boundary Setting',
        description: 'Learn to say no when needed',
        icon: '🛡️'
      },
      {
        title: 'Values Check',
        description: 'Reconnect with what matters to you',
        icon: '⭐'
      },
      {
        title: 'Reset Ritual',
        description: 'Create a cleansing routine',
        icon: '🌊'
      }
    ]
  },

  surprise: {
    greeting: "Life threw you a curveball! 🎭",
    message: "Unexpected moments can lead to growth. How do you feel about it?",
    colors: {
      primary: '#FFB347',
      secondary: '#FFF5E6',
      text: '#5C3317',
      accent: '#FF8C00'
    },
    gradient: 'linear-gradient(135deg, #FFB347 0%, #FF8C00 100%)',
    emoji: '😲',
    suggestions: [
      '📝 Process what just happened',
      '🤔 Reflect on your reaction',
      '💬 Share the experience with someone',
      '🎯 Adapt your plans if needed'
    ],
    content: [
      {
        title: 'Reflection',
        description: 'Journal about this unexpected event',
        icon: '✍️'
      },
      {
        title: 'Adapt & Grow',
        description: 'Find opportunities in the unexpected',
        icon: '🌱'
      },
      {
        title: 'Share Your Story',
        description: 'Talk about what surprised you',
        icon: '💬'
      }
    ]
  },

  neutral: {
    greeting: "Welcome back! 👋",
    message: "A balanced mind is a powerful mind. What would you like to explore today?",
    colors: {
      primary: '#95A5A6',
      secondary: '#F8F9FA',
      text: '#2C3E50',
      accent: '#7F8C8D'
    },
    gradient: 'linear-gradient(135deg, #95A5A6 0%, #7F8C8D 100%)',
    emoji: '😐',
    suggestions: [
      '🎯 Set a goal for today',
      '📚 Learn something new',
      '🤝 Connect with your community',
      '🎨 Explore your creative side'
    ],
    content: [
      {
        title: 'Goal Setting',
        description: 'Plan your next steps',
        icon: '🎯'
      },
      {
        title: 'Skill Building',
        description: 'Work on personal development',
        icon: '📈'
      },
      {
        title: 'Community',
        description: 'Engage with others',
        icon: '👥'
      }
    ]
  }
};



/**
 * What: Helper function to get theme by emotion name
 * Why: Handles case variations and returns neutral as fallback
 */
export function getMoodTheme(emotion) {
  if (!emotion) return moodThemes.neutral;
  
  const normalizedEmotion = emotion.toLowerCase();
  return moodThemes[normalizedEmotion] || moodThemes.neutral;
}
