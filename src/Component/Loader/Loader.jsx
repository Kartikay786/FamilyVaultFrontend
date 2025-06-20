import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Heart, Upload, Users, Camera } from 'lucide-react';

const Loader = ({ 
  size = 'medium', 
  text = 'Loading...', 
  variant = 'default',
  className = '' 
}) => {
  const loaderRef = useRef(null);
  const iconsRef = useRef(null);
  const dotsRef = useRef(null);
  const textRef = useRef(null);

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main loader animation
      gsap.fromTo(loaderRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
      );

      if (variant === 'default' || variant === 'processing') {
        // Floating icons animation
        const icons = iconsRef.current?.children;
        if (icons) {
          Array.from(icons).forEach((icon, index) => {
            gsap.set(icon, {
              rotation: index * 90,
              transformOrigin: "center"
            });

            gsap.to(icon, {
              rotation: `+=${360}`,
              duration: 3,
              ease: "none",
              repeat: -1,
              delay: index * 0.2
            });

            gsap.to(icon, {
              y: -10,
              duration: 1.5,
              ease: "power2.inOut",
              yoyo: true,
              repeat: -1,
              delay: index * 0.3
            });
          });
        }
      }

      if (variant === 'upload') {
        // Upload progress animation
        const progressBar = loaderRef.current?.querySelector('.progress-bar');
        if (progressBar) {
          gsap.fromTo(progressBar,
            { width: '0%' },
            { width: '100%', duration: 2, ease: "power2.inOut", repeat: -1 }
          );
        }
      }

      // Dots animation
      const dots = dotsRef.current?.children;
      if (dots) {
        Array.from(dots).forEach((dot, index) => {
          gsap.to(dot, {
            scale: 1.5,
            opacity: 0.5,
            duration: 0.6,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: index * 0.2
          });
        });
      }

      // Text pulse animation
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0.6,
          duration: 1,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        });
      }
    }, loaderRef);

    return () => ctx.revert();
  }, [variant]);

  const renderLoader = () => {
    switch (variant) {
      case 'upload':
        return (
          <div className="flex flex-col items-center space-y-4">
            <div className={`${sizeClasses[size]} bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center`}>
              <Upload className="w-1/2 h-1/2 text-white animate-pulse" />
            </div>
            <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="progress-bar h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
        );

      case 'minimal':
        return (
          <div className="flex items-center justify-center">
            <div className={`${sizeClasses[size]} border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin`}></div>
          </div>
        );

      case 'processing':
        return (
          <div className="relative flex items-center justify-center">
            <div ref={iconsRef} className="relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <Camera className="w-4 h-4 text-blue-400" />
              </div>
              <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                <Users className="w-4 h-4 text-green-400" />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <Upload className="w-4 h-4 text-purple-400" />
              </div>
              <div className="absolute top-1/2 -left-8 transform -translate-y-1/2">
                <Heart className="w-4 h-4 text-pink-400" />
              </div>
            </div>
            <div className={`${sizeClasses[size]} bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center`}>
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative flex items-center justify-center">
            {/* Outer ring */}
            <div className={`${sizeClasses[size]} border-2 border-purple-500/20 rounded-full animate-spin`}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
            
            {/* Inner ring */}
            <div className={`absolute ${sizeClasses[size]} border-2 border-pink-500/20 rounded-full animate-spin`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
            </div>

            {/* Center icon */}
            <div className="absolute">
              <Heart className="w-6 h-6 text-white animate-pulse" />
            </div>

            {/* Floating icons */}
            <div ref={iconsRef} className="absolute">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <Camera className="w-3 h-3 text-blue-400 opacity-60" />
              </div>
              <div className="absolute top-1/2 -right-12 transform -translate-y-1/2">
                <Users className="w-3 h-3 text-green-400 opacity-60" />
              </div>
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <Upload className="w-3 h-3 text-purple-400 opacity-60" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div ref={loaderRef} className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {renderLoader()}
      
      {text && (
        <div className="flex items-center space-x-1">
          <p ref={textRef} className={`text-white font-medium ${textSizeClasses[size]}`}>
            {text}
          </p>
          <div ref={dotsRef} className="flex space-x-1">
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;