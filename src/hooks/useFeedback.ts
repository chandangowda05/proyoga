import { useState, useRef } from 'react';
import type { Correction } from '../utils/poseEvaluator';

// Fallback to Web Speech API if Howler assets are missing
const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
};

export function useFeedback() {
  const [feedbackQueue, setFeedbackQueue] = useState<{ id: string; message: string; timestamp: Date; type: 'voice' | 'visual' }[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  
  const lastSpokenRef = useRef<Record<string, number>>({});

  const triggerFeedback = (corrections: Correction[]) => {
    if (corrections.length === 0) return;

    const now = Date.now();
    
    // Process only the most critical correction to avoid overwhelming the user
    const target = corrections.find(c => c.severity === 'error') || corrections[0];

    // Debounce: don't repeat same message within 5 seconds
    if (lastSpokenRef.current[target.message] && (now - lastSpokenRef.current[target.message] < 5000)) {
      return;
    }

    lastSpokenRef.current[target.message] = now;

    if (voiceEnabled) {
      speak(target.message);
    }

    setFeedbackQueue(prev => {
      const newQueue = [{ id: Math.random().toString(36).substring(7), message: target.message, timestamp: new Date(), type: 'voice' as const }, ...prev];
      return newQueue.slice(0, 5); // Keep last 5
    });
  };

  const toggleVoice = () => setVoiceEnabled(prev => !prev);

  return { feedbackQueue, triggerFeedback, voiceEnabled, toggleVoice };
}
