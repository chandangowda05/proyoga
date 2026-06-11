import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, X, CheckCircle2, RotateCcw } from 'lucide-react';
import { POSES } from '../data/poses';
import { usePoseDetection } from '../hooks/usePoseDetection';
import { evaluatePose } from '../utils/poseEvaluator';

export default function Guided() {
  const [selectedPose, setSelectedPose] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const { videoRef, canvasRef, isReady, angles } = usePoseDetection();
  
  const pose = POSES.find(p => p.id === selectedPose);

  // Timer logic
  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Session Complete
      setIsActive(false);
      setSessionComplete(true);
      const { score } = evaluatePose(pose?.name || '', angles);
      setFinalScore(score);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, pose, angles]);

  const handleStart = (poseId: string) => {
    const p = POSES.find(p => p.id === poseId);
    if (p) {
      setSelectedPose(poseId);
      setTimeLeft(p.holdTime);
      setSessionComplete(false);
    }
  };

  const togglePause = () => setIsActive(!isActive);

  const exitSession = () => {
    setSelectedPose(null);
    setIsActive(false);
    setSessionComplete(false);
  };

  if (selectedPose && pose) {
    return (
      <div className="flex flex-col h-full max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-display font-bold text-stone-900 tracking-tight uppercase">{pose.name}</h2>
            <p className="text-stone-500 italic font-medium">{pose.sanskrit}</p>
          </div>
          <button onClick={exitSession} className="p-3 bg-white rounded-2xl hover:bg-stone-100 transition-all border border-stone-200">
            <X className="w-6 h-6 text-stone-900" />
          </button>
        </div>

        {sessionComplete ? (
          <motion.div 
            className="flex-1 flex flex-col items-center justify-center text-center p-12 card-premium"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-24 h-24 bg-green-50 text-green-700 rounded-3xl flex items-center justify-center mb-8 border border-green-100">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-5xl font-display font-bold text-stone-900 mb-4 uppercase">Session Complete</h2>
            <p className="text-xl text-stone-600 mb-12 font-medium">You held {pose.name} for {pose.holdTime} seconds.</p>
            
            <div className="bg-stone-50 border border-stone-200 p-10 rounded-[24px] mb-12 flex flex-col items-center">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-4">Final Accuracy</span>
              <span className="text-7xl font-display font-bold text-green-700">{finalScore}%</span>
            </div>

            <div className="flex gap-6">
              <button onClick={() => handleStart(pose.id)} className="px-8 py-4 bg-white border border-stone-200 rounded-xl flex items-center gap-3 hover:bg-stone-50 transition-all text-sm font-bold text-stone-900 uppercase tracking-widest shadow-sm">
                <RotateCcw className="w-5 h-5" /> Retry
              </button>
              <button onClick={exitSession} className="bg-green-700 text-white px-10 py-4 font-bold rounded-xl shadow-lg hover:bg-green-800 transition-all uppercase tracking-widest text-sm">
                Choose Another
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-14rem)]">
            {/* Reference & Controls */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
              <div className="flex-1 rounded-[24px] overflow-hidden bg-white border border-stone-200 relative group shadow-sm">
                <img src={pose.image} alt={pose.name} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="font-bold text-white mb-4 uppercase tracking-widest text-xs">Instructions</h3>
                  <ul className="space-y-3 text-sm text-stone-200 font-medium">
                    {pose.steps.slice(0, 3).map((step, i) => (
                      <li key={i} className="flex gap-3"><span className="text-green-400 font-bold">{i+1}</span> {step}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="card-premium p-8 flex flex-col items-center justify-center shrink-0">
                <div className="relative w-36 h-36 flex items-center justify-center mb-8">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="#E7E5E4" strokeWidth="6" />
                    <motion.circle 
                      cx="50" cy="50" r="45" fill="transparent" 
                      stroke="#15803D" 
                      strokeWidth="6" 
                      strokeDasharray="282.7" 
                      animate={{ strokeDashoffset: 282.7 - (282.7 * (timeLeft / pose.holdTime)) }}
                      strokeLinecap="round" 
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className="text-5xl font-display font-bold text-stone-900">{timeLeft}</span>
                </div>
                
                <div className="flex items-center gap-4">
                  {!isActive && timeLeft === pose.holdTime ? (
                    <button onClick={() => setIsActive(true)} className="bg-green-700 text-white px-10 py-4 font-bold rounded-xl shadow-lg hover:bg-green-800 transition-all uppercase tracking-widest text-sm flex items-center gap-3">
                      <Play className="w-5 h-5 fill-current" /> Start
                    </button>
                  ) : (
                    <button onClick={togglePause} className="flex items-center gap-3 px-10 py-4 bg-white border border-stone-200 font-bold rounded-xl hover:bg-stone-50 transition-all uppercase tracking-widest text-sm text-stone-900 shadow-sm">
                      {isActive ? <><Pause className="w-5 h-5 fill-current" /> Pause</> : <><Play className="w-5 h-5 fill-current" /> Resume</>}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Live Camera Feed */}
            <div className="w-full lg:w-2/3 h-full rounded-[24px] overflow-hidden bg-stone-100 border border-stone-200 relative shadow-sm">
              {!isReady && (
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-stone-100">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-stone-500 font-bold uppercase tracking-widest text-xs">Initializing Camera Feed</p>
                  </div>
                </div>
              )}
              <video ref={videoRef} className="hidden" autoPlay playsInline muted />
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" width={1280} height={720} />
              
              <div className="absolute top-6 right-6 bg-white/90 border border-stone-200 px-5 py-2.5 rounded-full flex items-center gap-3 shadow-sm">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-sm" />
                 <span className="font-bold text-stone-900 text-[10px] tracking-[0.2em] uppercase">Visual Stream</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Selection Grid
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div>
        <h1 className="text-4xl font-display font-bold text-stone-900 mb-2 tracking-tight uppercase">Guided Sessions</h1>
        <p className="text-stone-600 font-medium">Select a pose to begin your guided practice with real-time feedback.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {POSES.map((p) => (
          <motion.div 
            key={p.id}
            className="group card-premium overflow-hidden cursor-pointer p-0 flex flex-col"
            whileHover={{ y: -8 }}
            onClick={() => handleStart(p.id)}
          >
            <div className="h-56 overflow-hidden relative">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-6">
                <span className="px-3 py-1 bg-white/90 text-[10px] font-bold rounded-lg text-stone-900 shadow-sm uppercase tracking-widest">
                  {p.holdTime}s HOLD
                </span>
              </div>
            </div>
            <div className="p-8 flex-1 bg-white">
              <h3 className="text-2xl font-display font-bold text-stone-900 group-hover:text-green-700 transition-colors uppercase tracking-tight mb-1">{p.name}</h3>
              <p className="text-sm italic text-stone-500 mb-4 font-medium">{p.sanskrit}</p>
              <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed">{p.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
