import { useState, useEffect, useRef } from "react";

// Mock Aurora component for demo
const Aurora = ({ colorStops, blend, amplitude, speed }) => (
  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800 opacity-30 animate-pulse" />
);

const CountUpCool = ({ from = 0, to = 100, duration = 3, onEnd }) => {
  const countRef = useRef(null);
  const containerRef = useRef(null);
  const [currentValue, setCurrentValue] = useState(from);
  const animationRef = useRef(null);

  useEffect(() => {
    let startTime = null;
    const startValue = from;
    const endValue = to;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function - ease out cubic
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(startValue + (endValue - startValue) * easeOutCubic);
      
      setCurrentValue(currentVal);
      
      if (countRef.current) {
        countRef.current.innerText = currentVal.toLocaleString();
        
        // Dynamic scale based on speed of change
        const speed = Math.abs(currentVal - (currentValue || from));
        const scaleIntensity = Math.min(1 + (speed * 0.02), 1.3);
        
        // Glitch effect on certain numbers
        if (currentVal % 10 === 0 && currentVal !== to) {
          countRef.current.style.transform = `scale(${scaleIntensity}) skew(${Math.random() * 2 - 1}deg)`;
          countRef.current.style.filter = `hue-rotate(${Math.random() * 20}deg)`;
          
          setTimeout(() => {
            if (countRef.current) {
              countRef.current.style.transform = `scale(1)`;
              countRef.current.style.filter = 'none';
            }
          }, 50);
        }
        
        // Particle burst effect on milestone numbers
        if (currentVal % 25 === 0 && currentVal !== from && currentVal !== to) {
          createParticles();
        }
      }
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Final celebration effect
        if (countRef.current) {
          countRef.current.style.animation = 'finalPulse 0.8s ease-out';
        }
        createFinalBurst();
        if (onEnd) setTimeout(onEnd, 800);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (countRef.current) {
        countRef.current.style.animation = '';
        countRef.current.style.transform = '';
        countRef.current.style.filter = '';
      }
    };
  }, []);

  const createParticles = () => {
    if (!containerRef.current) return;
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-blue-400 rounded-full pointer-events-none';
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.transform = 'translate(-50%, -50%)';
      
      const angle = (Math.PI * 2 * i) / 8;
      const distance = 50 + Math.random() * 30;
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;
      
      containerRef.current.appendChild(particle);
      
      particle.animate([
        { 
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: 1
        },
        { 
          transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1)`,
          opacity: 0
        }
      ], {
        duration: 600,
        easing: 'ease-out'
      }).onfinish = () => particle.remove();
    }
  };

  const createFinalBurst = () => {
    if (!containerRef.current) return;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute bg-gradient-to-r from-blue-400 to-blue-600 rounded-full pointer-events-none';
      particle.style.width = `${4 + Math.random() * 8}px`;
      particle.style.height = particle.style.width;
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.transform = 'translate(-50%, -50%)';
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 100;
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;
      
      containerRef.current.appendChild(particle);
      
      particle.animate([
        { 
          transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
          opacity: 1
        },
        { 
          transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(1) rotate(360deg)`,
          opacity: 0
        }
      ], {
        duration: 1200,
        easing: 'ease-out'
      }).onfinish = () => particle.remove();
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <span 
        ref={countRef} 
        className="text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text font-black tracking-wider drop-shadow-2xl"
        style={{
          textShadow: '0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        {currentValue.toLocaleString()}
      </span>
      
      {/* Animated ring around the number */}
      <div className="absolute inset-0 -m-8 border-2 border-blue-400/30 rounded-full animate-spin" style={{animationDuration: '3s'}} />
      <div className="absolute inset-0 -m-12 border border-blue-500/20 rounded-full animate-ping" />
    </div>
  );
};

const PreLoader = () => {
  const [loading, setLoading] = useState(true);
  const [countDone, setCountDone] = useState(false);
  const [fadeText, setFadeText] = useState(false);
  const [fadeScreen, setFadeScreen] = useState(false);

  useEffect(() => {
    if (countDone) {
      const fadeTextTimer = setTimeout(() => setFadeText(true), 800);
      const fadeScreenTimer = setTimeout(() => setFadeScreen(true), 1200);
      const hideTimer = setTimeout(() => setLoading(false), 2000);
      
      return () => {
        clearTimeout(fadeTextTimer);
        clearTimeout(fadeScreenTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [countDone]);

  return (
    <>
      <style jsx>{`
        @keyframes finalPulse {
          0% { 
            transform: scale(1); 
            filter: brightness(1); 
          }
          50% { 
            transform: scale(1.4); 
            filter: brightness(1.5) saturate(1.3);
          }
          100% { 
            transform: scale(1.2); 
            filter: brightness(1.2); 
          }
        }
        
        @keyframes matrixRain {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
      
      {loading && (
        <div
          className={`w-screen h-screen fixed flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black z-[10000] overflow-hidden transition-all duration-1000 ${
            fadeScreen ? "opacity-0 scale-110" : "opacity-100 scale-100"
          }`}
        >
          <Aurora colorStops={["#60A5FA", "#3B82F6", "#2563EB"]} blend={0.5} amplitude={1.0} speed={0.5} />
          
          {/* Matrix-like background effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-px bg-blue-400/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationName: 'matrixRain',
                  animationDuration: `${2 + Math.random() * 3}s`,
                  animationIterationCount: 'infinite',
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          <div
            className={`absolute text-white text-7xl font-black transition-all duration-1000 ${
              fadeText ? "opacity-0 -translate-y-20 scale-75" : "opacity-100 translate-y-0 scale-100"
            }`}
          >
            <CountUpCool 
              from={0} 
              to={100} 
              duration={3.5} 
              onEnd={() => setCountDone(true)} 
            />
          </div>
          
          {/* Loading text */}
          <div className={`absolute bottom-20 text-blue-300 text-lg font-medium tracking-widest transition-opacity duration-500 ${
            fadeText ? "opacity-0" : "opacity-100"
          }`}>
            <div className="flex items-center space-x-2">
              <span>LOADING</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PreLoader;