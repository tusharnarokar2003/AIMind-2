import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { predictMood } from '../services/moodPredictor.js';

const router = express.Router();



const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);


router.post('/analyze', async (req, res) => {
  try {
    const { journalId, userId, noteText } = req.body;

  
    if (!noteText || !userId || !journalId) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['journalId', 'userId', 'noteText']
      });
    }

    console.log(`Analyzing mood for user ${userId}, journal ${journalId}`);

    
    const prediction = await predictMood(noteText);

    console.log('Mood prediction result:', prediction);

  
    const { data, error } = await supabase
      .from('mood_predictions')
      .insert({
        user_id: userId,
        journal_id: journalId,
        anger: prediction.emotions.anger,
        disgust: prediction.emotions.disgust,
        fear: prediction.emotions.fear,
        joy: prediction.emotions.joy,
        neutral: prediction.emotions.neutral,
        sadness: prediction.emotions.sadness,
        surprise: prediction.emotions.surprise,
        main_emotion: prediction.mainEmotion
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }

    res.json({
      success: true,
      mood: {
        id: data.id,
        mainEmotion: prediction.mainEmotion,
        emotions: prediction.emotions,
        createdAt: data.created_at
      }
    });

  } catch (error) {
    console.error('Mood analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze mood',
      details: error.message 
    });
  }
});


router.get('/latest/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from('mood_predictions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(); 
    if (error) throw error;


    if (!data) {
      return res.json({ mood: null });
    }

    res.json({
      mood: {
        id: data.id,
        mainEmotion: data.main_emotion,
        emotions: {
          anger: data.anger,
          disgust: data.disgust,
          fear: data.fear,
          joy: data.joy,
          neutral: data.neutral,
          sadness: data.sadness,
          surprise: data.surprise
        },
        createdAt: data.created_at
      }
    });

  } catch (error) {
    console.error('Get latest mood error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch mood' 
    });
  }
});


router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 30;

    const { data, error } = await supabase
      .from('mood_predictions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    const moods = data.map(item => ({
      id: item.id,
      mainEmotion: item.main_emotion,
      emotions: {
        anger: item.anger,
        disgust: item.disgust,
        fear: item.fear,
        joy: item.joy,
        neutral: item.neutral,
        sadness: item.sadness,
        surprise: item.surprise
      },
      createdAt: item.created_at
    }));

    res.json({ moods });

  } catch (error) {
    console.error('Get mood history error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch mood history' 
    });
  }
});

export default router;