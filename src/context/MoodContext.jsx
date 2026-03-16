import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { moodService } from '../services/moodService';
import { useAuth } from './AuthContext';


const MoodContext = createContext();

export function MoodProvider({ children }) {

  const [currentMood, setCurrentMood] = useState(null);
  

  const [loading, setLoading] = useState(true);
  

  const { user } = useAuth();


  const loadLatestMood = useCallback(async () => {
    try {
      setLoading(true);
      const mood = await moodService.getLatestMood();
      setCurrentMood(mood);
      console.log('Loaded latest mood:', mood);
    } catch (error) {
      console.error('Failed to load mood:', error);
      setCurrentMood(null);
    } finally {
      setLoading(false);
    }
  }, []);


  const refreshMood = useCallback(async () => {
    await loadLatestMood();
  }, [loadLatestMood]);


  useEffect(() => {
    if (user) {
      loadLatestMood();
    } else {
      setCurrentMood(null);
      setLoading(false);
    }
  }, [user, loadLatestMood]);


  const value = {
    currentMood,      
    loading,          
    refreshMood,      
    

    mainEmotion: currentMood?.mainEmotion || 'neutral',
    

    emotions: currentMood?.emotions || null
  };

  return (
    <MoodContext.Provider value={value}>
      {children}
    </MoodContext.Provider>
  );
}


export function useMood() {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within MoodProvider');
  }
  return context;
}