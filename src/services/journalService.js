import { supabase } from '../supabaseClient';
import { moodService } from './moodService';


export const journalService = {
  /**
   * What: Creates a new journal entry and triggers mood analysis
   * Why: Single function handles both save and mood detection
   * 
   * @param {string} noteText - The journal content
   * @returns {Promise<object>} Created journal entry
   */
  async createEntry(noteText) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log('Creating journal entry...');

  
      const { data: entry, error } = await supabase
        .from('journal')
        .insert({
          user_id: user.id,
          notetext: noteText,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      console.log('Journal entry created:', entry.id);

     
      moodService.analyzeMood(entry.id, noteText)
        .then(() => {
          console.log('Mood analysis completed for entry:', entry.id);
        })
        .catch(err => {
        
          console.error('Background mood analysis failed:', err);
        });

      return entry;
    } catch (error) {
      console.error('Create journal entry error:', error);
      throw error;
    }
  },

  /**
   * What: Gets user's journal entries
   * Why: Display journal history
   * 
   * @param {number} limit - Number of entries to fetch
   * @returns {Promise<Array>} Array of journal entries
   */
  async getEntries(limit = 50) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return [];

      const { data, error } = await supabase
        .from('journal')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Get journal entries error:', error);
      return [];
    }
  },


  async getEntryWithMood(entryId) {
    try {
      const { data: entry, error: entryError } = await supabase
        .from('journal')
        .select('*')
        .eq('id', entryId)
        .single();

      if (entryError) throw entryError;


      const { data: mood } = await supabase
        .from('mood_predictions')
        .select('*')
        .eq('journal_id', entryId)
        .single();

      return {
        ...entry,
        mood: mood ? {
          mainEmotion: mood.main_emotion,
          emotions: {
            anger: mood.anger,
            disgust: mood.disgust,
            fear: mood.fear,
            joy: mood.joy,
            neutral: mood.neutral,
            sadness: mood.sadness,
            surprise: mood.surprise
          }
        } : null
      };
    } catch (error) {
      console.error('Get entry with mood error:', error);
      throw error;
    }
  }
};