import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


export async function predictMood(journalText) {
  return new Promise((resolve, reject) => {
    
    const pythonScript = path.join(__dirname, '../model.py');
    
   
    const pythonPath = process.env.PYTHON_PATH || 'python';
    
    console.log(`Running Python model: ${pythonPath} ${pythonScript}`);
    
  
    const python = spawn(pythonPath, [pythonScript, journalText]);
    
    let dataString = '';
    let errorString = '';

   
    python.stdout.on('data', (data) => {
      dataString += data.toString();
    });

  
    python.stderr.on('data', (data) => {
      errorString += data.toString();
    });

   
    python.on('close', (code) => {
      if (code !== 0) {
        console.error('Python error:', errorString);
        reject(new Error(`Python process exited with code ${code}: ${errorString}`));
        return;
      }

      try {
   
        console.log('Python output:', dataString);
        
        const result = JSON.parse(dataString);

        resolve({
          mainEmotion: result.main_emotion,
          emotions: result.emotions
        });
        
      } catch (error) {
        console.error('Failed to parse model output:', dataString);
        reject(new Error('Failed to parse model output: ' + error.message));
      }
    });


    python.on('error', (error) => {
      console.error('Failed to start Python:', error);
      reject(new Error('Failed to start Python process: ' + error.message));
    });
  });
}