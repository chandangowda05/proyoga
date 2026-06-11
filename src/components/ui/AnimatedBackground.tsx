export default function AnimatedBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-bg-primary flex">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute -inset-[100%] animate-[spin_60s_linear_infinite]"
             style={{
               background: 'conic-gradient(from 90deg at 50% 50%, #080B10 0%, #0E1420 25%, #00D4AA20 50%, #0E1420 75%, #080B10 100%)',
               filter: 'blur(100px)'
             }}
        />
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-accent-teal/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent-violet/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full flex flex-col md:flex-row">
        {children}
      </div>
    </div>
  );
}
