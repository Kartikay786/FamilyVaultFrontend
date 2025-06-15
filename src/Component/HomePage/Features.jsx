import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, Users, Heart, Clock, Vote, Palette, Shield, Play } from 'lucide-react';

const Features = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const features = [
    {
      icon: Upload,
      title: "Smart Media Upload",
      description: "Drag and drop photos, videos, and voice notes with intelligent organization and compression.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Family Collaboration",
      description: "Invite family members to contribute and share memories in your private digital space.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Memory Timeline",
      description: "Navigate through your family's history with our beautiful interactive timeline interface.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Palette,
      title: "Custom Themes",
      description: "Personalize your vault with custom colors, cover photos, and unique family branding.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Vote,
      title: "Democratic Decisions",
      description: "Family voting system for important decisions like removing shared memories.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Bank-level encryption ensures your precious memories stay safe and private.",
      color: "from-teal-500 to-blue-500"
    },
    {
      icon: Play,
      title: "Rich Media Support",
      description: "Full support for high-quality photos, 4K videos, and crystal-clear audio recordings.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Heart,
      title: "Emotion Tracking",
      description: "Tag memories with emotions and moods to create deeper connections with your stories.",
      color: "from-red-500 to-pink-500"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Feature cards staggered animation
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(Array.from(cards),
          { 
            y: 100, 
            opacity: 0, 
            scale: 0.8 
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-purple-900/20">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Powerful Features for
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Modern Families
            </span>
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Everything you need to create, organize, and preserve your family's most precious memories
            in one beautiful, secure platform.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-purple-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;