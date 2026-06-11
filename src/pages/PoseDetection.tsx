import { motion } from 'framer-motion';
import { Camera, AlertCircle, RefreshCw } from 'lucide-react';
import { usePoseDetection } from '../hooks/usePoseDetection';
import { evaluatePose } from '../utils/poseEvaluator';
import { useFeedback } from '../hooks/useFeedback';
import { useEffect, useState } from 'react';

export default function PoseDetection() {
  const { videoRef, canvasRef, isReady, error, angles, detectedPose, confidence } = usePoseDetection();
  const { triggerFeedback } = useFeedback();
  const [evaluation, setEvaluation] = useState({ score: 100, corrections: [] as any[] });

  // Run evaluation at 2fps
  useEffect(() => {
    const interval = setInterval(() => {
      if (isReady && detectedPose) {
        const result = evaluatePose(detectedPose, angles);
        setEvaluation(result);
        triggerFeedback(result.corrections);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [angles, detectedPose, isReady, triggerFeedback]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <div className="w-20 h-20 bg-status-danger/10 text-status-danger rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">Camera Access Denied</h2>
        <p className="text-text-secondary max-w-md mb-8">
          ProYoga needs access to your camera to detect your poses and provide feedback. Please allow camera permissions in your browser.
        </p>
        <button onClick={() => window.location.reload()} className="bg-white border border-stone-200 px-6 py-3 rounded-xl font-medium hover:bg-stone-50 transition-colors flex items-center gap-2 text-stone-900">
          <RefreshCw className="w-5 h-5" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Left side: Camera feed */}
      <div className="w-full lg:w-2/3 h-[50vh] lg:h-full relative rounded-[24px] overflow-hidden bg-white border border-stone-200 shadow-sm flex-shrink-0">
        
        {!isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-stone-100">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-700 rounded-full animate-spin mb-4" />
            <p className="font-medium animate-pulse text-green-700">Initializing AI Models...</p>
          </div>
        )}

        {/* Hidden video element used as source */}
        <video 
          ref={videoRef} 
          className="hidden" 
          autoPlay 
          playsInline
          muted
        />
        
        {/* Visible canvas element */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover"
          width={1280}
          height={720}
        />

        {/* Overlays */}
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <div className="bg-white/90 backdrop-blur border border-stone-200 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success"></span>
            </span>
            <span className="font-mono text-sm font-medium tracking-wide text-status-success">LIVE</span>
          </div>

          <div className="bg-white/90 backdrop-blur border border-green-200 px-5 py-2 rounded-full flex items-center gap-3 shadow-sm text-stone-900">
            <span className="font-display font-bold">{detectedPose}</span>
            <div className="w-px h-4 bg-stone-200"></div>
            <span className="font-mono text-green-700">{confidence}%</span>
          </div>
        </div>
      </div>

      {/* Right side: Telemetry Data */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4 h-full overflow-y-auto custom-scrollbar pr-2">
        {/* Accuracy Score Ring */}
        <div className="bg-white p-6 rounded-[24px] border border-stone-200 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="font-display font-bold text-lg text-stone-900">AI Accuracy</h3>
            <p className="text-sm text-stone-500 mt-1">{detectedPose}</p>
          </div>
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E7E5E4" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="40" fill="transparent" 
                stroke={evaluation.score > 80 ? 'var(--tw-colors-status-success)' : evaluation.score > 50 ? 'var(--tw-colors-status-warning)' : 'var(--tw-colors-status-danger)'}
                strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * evaluation.score) / 100}
                strokeLinecap="round" className="transition-all duration-500 ease-out"
                style={{ filter: `drop-shadow(0 0 8px ${evaluation.score > 80 ? 'var(--tw-colors-status-success)' : 'var(--tw-colors-status-warning)'})` }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-display font-bold text-stone-900">{evaluation.score}%</span>
            </div>
          </div>
        </div>

        {/* Live Corrections */}
        {evaluation.corrections.length > 0 && (
          <div className="bg-orange-50 p-4 rounded-[24px] border border-orange-200">
            <h4 className="text-sm font-medium text-status-warning mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Form Corrections
            </h4>
            <div className="space-y-2">
              {evaluation.corrections.map((c, i) => (
                <div key={i} className="flex items-start gap-2 text-sm bg-white p-2 rounded-lg border border-orange-100">
                  <span className={`mt-0.5 ${c.severity === 'error' ? 'text-red-500' : 'text-orange-500'}`}>•</span>
                  <span><span className="font-bold text-stone-900">{c.joint}:</span> <span className="text-stone-600">{c.message}</span></span>
                </div>
              ))}
            </div>
          </div>
        )}

        <h3 className="font-display font-bold text-lg text-stone-900 sticky top-0 bg-stone-50 py-2 z-10 mt-2">Joint Telemetry</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <AngleCard label="Left Elbow" value={angles.leftElbow} ideal={180} />
          <AngleCard label="Right Elbow" value={angles.rightElbow} ideal={180} />
          <AngleCard label="Left Knee" value={angles.leftKnee} ideal={180} />
          <AngleCard label="Right Knee" value={angles.rightKnee} ideal={180} />
          <AngleCard label="Left Hip" value={angles.leftHip} ideal={180} />
          <AngleCard label="Right Hip" value={angles.rightHip} ideal={180} />
        </div>

        <div className="bg-white p-5 rounded-[24px] mt-2 border border-green-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Camera className="w-16 h-16 text-green-900" />
          </div>
          <h4 className="text-sm font-bold text-stone-600 mb-1">Shoulder Alignment</h4>
          <div className="flex items-end gap-2 text-stone-900">
            <span className="text-4xl font-mono font-bold text-green-700">{angles.shoulderAlignment}°</span>
            <span className="text-sm mb-1 pb-1 text-stone-400">offset</span>
          </div>
          
          {/* Visual indicator bar */}
          <div className="w-full h-2 bg-stone-100 rounded-full mt-4 relative overflow-hidden">
            <div 
              className="absolute top-0 bottom-0 bg-green-700 transition-all duration-200"
              style={{ 
                left: '50%',
                width: '4px',
                transform: `translateX(calc(-50% + ${angles.shoulderAlignment * 2}px))`
              }}
            />
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-stone-300 -translate-x-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AngleCard({ label, value, ideal }: { label: string, value: number, ideal: number }) {
  const difference = Math.abs(value - ideal);
  let statusColor = 'text-status-success';
  let bgColor = 'bg-status-success/10';
  let borderColor = 'border-status-success/30';
  
  if (difference > 15 && difference <= 30) {
    statusColor = 'text-status-warning';
    bgColor = 'bg-status-warning/10';
    borderColor = 'border-status-warning/30';
  } else if (difference > 30) {
    statusColor = 'text-status-danger';
    bgColor = 'bg-status-danger/10';
    borderColor = 'border-status-danger/30';
  }

  return (
    <motion.div 
      className={`p-4 rounded-[16px] border ${borderColor} ${bgColor} flex flex-col justify-between h-24`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`text-3xl font-mono font-bold ${statusColor}`}>{value}°</span>
      </div>
    </motion.div>
  );
}
