import { supabase } from '../supabaseClient';

const MOOD_API_URL = import.meta.env.VITE_MOOD_API_URL || 'http://localhost:3001';


export const moodService = {
  /**
   * What: Triggers mood analysis for a journal entry
   * Why: Called after user saves a journal note
   * 
   * @param {string} journalId - ID of the journal entry
   * @param {string} noteText - The journal text to analyze
   * @returns {Promise<object>} Mood prediction result
   */
  async analyzeMood(journalId, noteText) {
    try {
    
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log('Requesting mood analysis for journal:', journalId);

 
      const response = await fetch(`${MOOD_API_URL}/api/mood/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          journalId,
          userId: user.id,
          noteText
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Mood analysis failed');
      }

      const data = await response.json();
      console.log('Mood analysis result:', data);
      
      return data.mood;
    } catch (error) {
      console.error('Mood analysis error:', error);
      throw error;
    }
  },

  /**
   * What: Gets the user's most recent mood
   * Why: HomePage needs this to personalize UI
   * 
   * @returns {Promise<object|null>} Latest mood or null
   */
  async getLatestMood() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      const response = await fetch(`${MOOD_API_URL}/api/mood/latest/${user.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch mood');
      }

      const data = await response.json();
      return data.mood; // Can be null for new users
    } catch (error) {
      console.error('Get latest mood error:', error);
      return null; // Return null on error so app still works
    }
  },

  /**
   * What: Gets mood history for the user
   * Why: Can be used for mood tracking/charts feature
   * 
   * @param {number} limit - Number of moods to fetch
   * @returns {Promise<Array>} Array of mood predictions
   */
  async getMoodHistory(limit = 30) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return [];

      const response = await fetch(
        `${MOOD_API_URL}/api/mood/history/${user.id}?limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch mood history');
      }

      const data = await response.json();
      return data.moods || [];
    } catch (error) {
      console.error('Get mood history error:', error);
      return [];
    }
  }
};