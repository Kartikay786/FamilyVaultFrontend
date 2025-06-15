import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart, Upload, Users, Clock, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Hero = ({ onCreateVault }) => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const floatingElementsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main content animation
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.fromTo(titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(buttonsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Floating elements animation
      const floatingIcons = floatingElementsRef.current?.children;
      if (floatingIcons) {
        Array.from(floatingIcons).forEach((icon, index) => {
          gsap.fromTo(icon,
            { 
              y: -50 + Math.random() * 100,
              x: -50 + Math.random() * 100,
              opacity: 0,
              scale: 0
            },
            { 
              y: 0,
              x: 0,
              opacity: 0.6,
              scale: 1,
              duration: 1.5 + index * 0.2,
              ease: "elastic.out(1, 0.5)",
              delay: 1 + index * 0.3
            }
          );

          // Continuous floating animation
          gsap.to(icon, {
            y: -20,
            duration: 3 + index,
            yoyo: true,
            repeat: -1,
            ease: "power2.inOut",
            delay: 2 + index * 0.5
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);


  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-blue-900/50"></div>
      
      {/* Floating elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
          <Upload className="w-6 h-6 text-white" />
        </div>
        <div className="absolute bottom-32 left-32 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
          <Users className="w-7 h-7 text-white" />
        </div>
        <div className="absolute top-60 right-20 w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div className="absolute bottom-20 right-40 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
          Your Family's
          <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Digital Memory Vault
          </span>
        </h1>
        
        <p ref={subtitleRef} className="text-xl sm:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Create, share, and preserve your most precious family moments in a beautiful, 
          secure digital space. Upload photos, videos, and voice notes to build your family's legacy together.
        </p>
        
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={()=>navigate('/auth/register')}
            className="group cursor-pointer relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <span className="relative z-10">Create Your Family Account</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button  onClick={()=>navigate('/auth/login')}
            className="px-8 py-4 cursor-pointer bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            Join Existing Vault
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
};

export default Hero;