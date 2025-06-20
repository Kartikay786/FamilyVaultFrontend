import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Heart } from 'lucide-react';

const PageLoader = ({ isLoading, onComplete }) => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      // Initial setup
      gsap.set(loaderRef.current, { opacity: 1 });
      gsap.set(logoRef.current, { scale: 0, rotation: -180 });
      gsap.set(progressRef.current, { width: '0%' });
      gsap.set(textRef.current, { opacity: 0, y: 20 });

      // Animation sequence
      tl.to(logoRef.current, {
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      })
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
      }, "-=0.3")
      .to(progressRef.current, {
        width: '100%',
        duration: 2,
        ease: "power2.inOut"
      }, "-=0.2")
      .to(loaderRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "power3.in"
      }, "+=0.5");

      // Logo pulse animation
      gsap.to(logoRef.current, {
        scale: 1.1,
        duration: 1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1
      });

    }, loaderRef);

    return () => ctx.revert();
  }, [isLoading, onComplete]);

  useEffect(() => {
    if (!isLoading) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "power3.in"
      });
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"
    >
      <div className="text-center">
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Family Vault</h1>
        </div>

        {/* Loading text */}
        <p ref={textRef} className="text-purple-200 text-lg mb-8">
          Loading your family memories...
        </p>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          ></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;