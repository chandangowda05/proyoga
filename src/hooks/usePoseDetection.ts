import { useEffect, useRef, useState } from 'react';

// Shims to fix Emscripten "Aborted(Module.arguments...)" error in some environments
if (typeof window !== 'undefined') {
  (window as any).Module = (window as any).Module || {};
  (window as any).arguments = (window as any).arguments || [];
}

// MediaPipe is loaded via CDN in index.html
const getPose = () => (window as any).Pose;
// const getDrawingUtils = () => (window as any);

// Re-map common drawing functions
const getDrawConnectors = () => (window as any).drawConnectors;
const getDrawLandmarks = () => (window as any).drawLandmarks;

type Results = any;
import { getElbowAngles, getKneeAngles, getHipAngles, getShoulderAlignment } from '../utils/angleCalculator';

export function usePoseDetection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [angles, setAngles] = useState({
    leftElbow: 0, rightElbow: 0,
    leftKnee: 0, rightKnee: 0,
    leftHip: 0, rightHip: 0,
    shoulderAlignment: 0
  });
  
  // Dummy pose classification for now
  const [detectedPose] = useState('Mountain Pose');
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    let pose: any;

    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        const PoseCtor = getPose();
        if (!PoseCtor) {
          throw new Error("MediaPipe Pose library not loaded yet.");
        }

        pose = new PoseCtor({
          locateFile: (file: string) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}`;
          }
        });

        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          smoothSegmentation: false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        pose.onResults((results: Results) => {
          if (!canvasRef.current || !videoRef.current) return;
          const canvasCtx = canvasRef.current.getContext('2d');
          if (!canvasCtx) return;

          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          
          // Draw video frame on canvas (mirrored)
          canvasCtx.translate(canvasRef.current.width, 0);
          canvasCtx.scale(-1, 1);
          canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

          if (results.poseLandmarks) {
            const dc = getDrawConnectors();
            const dl = getDrawLandmarks();
            if (dc && dl) {
              dc(canvasCtx, results.poseLandmarks, (window as any).POSE_CONNECTIONS, { color: '#00D4AA', lineWidth: 4 });
              dl(canvasCtx, results.poseLandmarks, { color: '#FFFFFF', lineWidth: 2, radius: 4 });
            }
            
            // Calculate angles
            const e = getElbowAngles(results.poseLandmarks);
            const k = getKneeAngles(results.poseLandmarks);
            const h = getHipAngles(results.poseLandmarks);
            const s = getShoulderAlignment(results.poseLandmarks);
            
            setAngles({
              leftElbow: e.left, rightElbow: e.right,
              leftKnee: k.left, rightKnee: k.right,
              leftHip: h.left, rightHip: h.right,
              shoulderAlignment: s
            });
            
            // Mock confidence
            setConfidence(Math.round(results.poseLandmarks[0]?.visibility ? results.poseLandmarks[0].visibility * 100 : 0));
          }
          canvasCtx.restore();
        });

        // Loop video processing
        const processVideo = async () => {
          if (videoRef.current && videoRef.current.readyState >= 2) {
            await pose.send({ image: videoRef.current });
          }
          requestAnimationFrame(processVideo);
        };
        
        videoRef.current?.addEventListener('loadeddata', () => {
          setIsReady(true);
          processVideo();
        });
        
      } catch (err: any) {
        console.error(err);
        setError("Camera permission denied or device not found.");
      }
    }

    init();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      if (pose) pose.close();
    };
  }, []);

  return { videoRef, canvasRef, isReady, error, angles, detectedPose, confidence };
}
