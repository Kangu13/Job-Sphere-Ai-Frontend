import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CommunityHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [deviceOrientation, setDeviceOrientation] = useState({ beta: 0, gamma: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    const handleDeviceOrientation = (e) => {
      if (e.beta && e.gamma) {
        setDeviceOrientation({
          beta: e.beta * 0.1,
          gamma: e.gamma * 0.1
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
    };
  }, []);

  // Generate floating squares with 100% opacity
  const squares = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 100 + 50;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 20 + 10;
    const rotate = Math.random() * 45;

    return (
      <div
        key={i}
        className="absolute rounded-lg bg-emerald-900 border border-emerald-500"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${posX}%`,
          top: `${posY}%`,
          opacity: 1, // Changed to 100% opacity
          transform: `translate(${mousePosition.x * 20 + deviceOrientation.gamma * 10}px, 
                      ${mousePosition.y * 20 + deviceOrientation.beta * 10}px) 
                      rotate(${rotate}deg)`,
          transition: `transform 0.5s ease-out`,
          animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`
        }}
      />
    );
  });

  return (
    <section className="relative bg-gray-900 min-h-[70vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Floating squares background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {squares}
      </div>

      {/* Gradient overlay - made darker to compensate for opaque squares */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/85 to-gray-900/95" />

      {/* Content */}
      <div className="max-w-5xl text-center relative z-10">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-400 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        ><span className="bg-gradient-to-r from-emerald-400 to-teal-300 text-transparent bg-clip-text">
          Hello And Welcome To <br /> 
            Our Community Forum!
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          This is a no-code community forum! If you're new to no-code, you've
          come to the right place. Find like-minded individuals who are
          passionate about no-code and ready to help you take your skills to
          the next level.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-emerald-500/30">
            Join Community
          </button>
          <button className="px-6 py-3 bg-transparent border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-900/30 font-medium rounded-lg transition-all">
            Learn More
          </button>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(20px, 20px) rotate(5deg);
          }
          100% {
            transform: translate(-20px, -20px) rotate(-5deg);
          }
        }
      `}</style>
    </section>
  );
}