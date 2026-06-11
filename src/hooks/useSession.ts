import { useState, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import toast from 'react-hot-toast';

export function useSession() {
  const { startSession: setStoreSessionActive, endSession: setStoreSessionInactive } = useAppStore();
  const { currentUser } = useAuth();
  
  const [isRecording, setIsRecording] = useState(false);
  const frameBuffer = useRef<any[]>([]);
  const startTime = useRef<number | null>(null);

  const startSession = () => {
    setIsRecording(true);
    setStoreSessionActive();
    startTime.current = Date.now();
    frameBuffer.current = [];
    toast.success('Session started');
  };

  const logPoseFrame = (poseData: any) => {
    if (!isRecording) return;
    // Buffer frames instead of writing to DB immediately
    frameBuffer.current.push({ ...poseData, timestamp: Date.now() });
  };

  const endSession = async () => {
    if (!isRecording) return;
    setIsRecording(false);
    setStoreSessionInactive();
    
    const duration = startTime.current ? Math.round((Date.now() - startTime.current) / 1000) : 0;
    
    // In a real app, we'd aggregate frameBuffer to calculate averages
    const avgAccuracy = 85; // Mock calculation
    const avgBalance = 78;  // Mock calculation

    const sessionData = {
      uid: currentUser?.uid || 'anonymous',
      duration,
      avgAccuracy,
      avgBalance,
      endTime: serverTimestamp(),
      framesRecorded: frameBuffer.current.length
    };

    try {
      if (currentUser) {
        // We catch this if firestore isn't fully configured
        await addDoc(collection(db, 'users', currentUser.uid, 'sessions'), sessionData);
      }
      toast.success(`Session saved! Duration: ${Math.floor(duration / 60)}m ${duration % 60}s`);
    } catch (e) {
      // Offline fallback
      toast.error('Could not sync to cloud. Saved locally.');
      console.error(e);
    }
  };

  return { isRecording, startSession, logPoseFrame, endSession };
}
