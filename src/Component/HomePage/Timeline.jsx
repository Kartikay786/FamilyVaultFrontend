import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Camera, Video, Mic, Heart, Star, Gift } from 'lucide-react';

const Timeline = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const headerRef = useRef(null);

  const timelineEvents = [
    {
      date: "December 2024",
      title: "Family Christmas Celebration",
      description: "Our annual Christmas gathering with three generations sharing stories and laughter.",
      type: "photos",
      icon: Camera,
      color: "from-red-500 to-green-500",
      count: 47
    },
    {
      date: "November 2024",
      title: "Grandpa's Birthday Stories",
      description: "Voice recordings of grandpa sharing his childhood memories and family history.",
      type: "audio",
      icon: Mic,
      color: "from-blue-500 to-cyan-500",
      count: 12
    },
    {
      date: "October 2024",
      title: "Family Vacation Highlights",
      description: "Beautiful moments from our trip to the mountains, captured in stunning 4K video.",
      type: "videos",
      icon: Video,
      color: "from-purple-500 to-pink-500",
      count: 23
    },
    {
      date: "September 2024",
      title: "First Day of School",
      description: "Emotional moments as the kids start their new school year with pride and excitement.",
      type: "mixed",
      icon: Star,
      color: "from-orange-500 to-yellow-500",
      count: 89
    },
    {
      date: "August 2024",
      title: "Anniversary Celebration",
      description: "Mom and Dad's 25th wedding anniversary with heartfelt speeches and dancing.",
      type: "celebration",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      count: 156
    },
    {
      date: "July 2024",
      title: "Summer Garden Party",
      description: "Backyard barbecue with extended family, games, and delicious homemade treats.",
      type: "gathering",
      icon: Gift,
      color: "from-green-500 to-emerald-500",
      count: 78
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

      // Timeline line animation
      const timelineLine = timelineRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.fromTo(timelineLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 2,
            ease: "power2.out",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Timeline events animation
      const events = timelineRef.current?.querySelectorAll('.timeline-event');
      if (events) {
        events.forEach((event, index) => {
          gsap.fromTo(event,
            { 
              x: index % 2 === 0 ? -100 : 100,
              opacity: 0,
              scale: 0.8
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: event,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900/20 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Family's
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Memory Timeline
            </span>
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Navigate through your family's precious moments with our interactive timeline.
            Every memory organized beautifully by date and significance.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 rounded-full"></div>

          {/* Timeline events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`timeline-event relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Event card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}>
                  <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105">
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-purple-300 text-sm font-medium">{event.date}</span>
                        <span className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">
                          {event.count} items
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
                        {event.title}
                      </h3>
                      
                      <p className="text-purple-100 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {event.description}
                      </p>
                      
                      <div className="mt-4 flex items-center space-x-2">
                        <div className={`w-8 h-8 bg-gradient-to-br ${event.color} rounded-lg flex items-center justify-center`}>
                          <event.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-purple-200 capitalize">{event.type}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
                  <div className={`w-6 h-6 bg-gradient-to-br ${event.color} rounded-full border-4 border-slate-900 shadow-lg`}></div>
                  <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                </div>

                {/* Date indicator */}
                <div className={`w-5/12 flex ${index % 2 === 0 ? 'justify-start pl-8' : 'justify-end pr-8'}`}>
                  <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                    <Calendar className="w-5 h-5 text-purple-300" />
                    <span className="text-white text-sm font-medium">{event.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;