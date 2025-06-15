import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { 
  ArrowLeft, 
  Calendar, 
  Filter, 
  Search,
  Camera,
  Video,
  Mic,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';


const MemoryTimeline = ({ vault, onViewChange }) => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(12);
  const [filterType, setFilterType] = useState('all');

  const years = [2024, 2023, 2022, 2021, 2020];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const timelineData = [
    {
      date: "December 25, 2024",
      memories: [
        {
          id: 1,
          type: 'photo',
          title: "Christmas Morning",
          thumbnail: "https://images.pexels.com/photos/1303098/pexels-photo-1303098.jpeg?auto=compress&cs=tinysrgb&w=300",
          uploadedBy: "Mom",
          likes: 12,
          comments: 5
        },
        {
          id: 2,
          type: 'video',
          title: "Opening Presents",
          thumbnail: "https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=300",
          uploadedBy: "Dad",
          likes: 8,
          comments: 3,
          duration: "3:45"
        }
      ]
    },
    {
      date: "December 20, 2024",
      memories: [
        {
          id: 3,
          type: 'photo',
          title: "Decorating the Tree",
          thumbnail: "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=300",
          uploadedBy: "Sarah",
          likes: 15,
          comments: 7
        }
      ]
    },
    {
      date: "December 18, 2024",
      memories: [
        {
          id: 4,
          type: 'audio',
          title: "Grandpa's Christmas Stories",
          thumbnail: null,
          uploadedBy: "Emma",
          likes: 9,
          comments: 4,
          duration: "12:30"
        },
        {
          id: 5,
          type: 'photo',
          title: "Baking Cookies",
          thumbnail: "https://images.pexels.com/photos/1134204/pexels-photo-1134204.jpeg?auto=compress&cs=tinysrgb&w=300",
          uploadedBy: "Mom",
          likes: 11,
          comments: 6
        }
      ]
    },
    {
      date: "December 15, 2024",
      memories: [
        {
          id: 6,
          type: 'video',
          title: "Shopping for Gifts",
          thumbnail: "https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=300",
          uploadedBy: "Dad",
          likes: 6,
          comments: 2,
          duration: "5:20"
        }
      ]
    }
  ];

  const filteredTimelineData = timelineData.map(day => ({
    ...day,
    memories: day.memories.filter(memory => {
      if (filterType === 'all') return true;
      if (filterType === 'photos') return memory.type === 'photo';
      if (filterType === 'videos') return memory.type === 'video';
      if (filterType === 'audio') return memory.type === 'audio';
      return true;
    })
  })).filter(day => day.memories.length > 0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Timeline animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      if (timelineItems) {
        gsap.fromTo(Array.from(timelineItems),
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.3
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [selectedYear, selectedMonth, filterType]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-white" />;
      case 'audio':
        return <Mic className="w-4 h-4 text-white" />;
      default:
        return <Camera className="w-4 h-4 text-white" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video':
        return 'from-purple-500 to-pink-500';
      case 'audio':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <div ref={containerRef} className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => onViewChange('dashboard')}
          className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Memory Timeline</h1>
          <p className="text-purple-200">
            {vault ? `Explore memories from ${vault}` : 'Explore your family memories through time'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-4">
          {/* Year/Month Navigation */}
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10">
            <button
              onClick={() => setSelectedMonth(selectedMonth > 1 ? selectedMonth - 1 : 12)}
              className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 px-4">
              <Calendar className="w-5 h-5 text-purple-300" />
              <span className="text-white font-medium">
                {months[selectedMonth - 1]} {selectedYear}
              </span>
            </div>
            <button
              onClick={() => setSelectedMonth(selectedMonth < 12 ? selectedMonth + 1 : 1)}
              className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Year Selector */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
            <input
              type="text"
              placeholder="Search memories..."
              className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-purple-300" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              <option value="photos">Photos</option>
              <option value="videos">Videos</option>
              <option value="audio">Audio</option>
            </select>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500"></div>

        {/* Timeline items */}
        <div className="space-y-8">
          {filteredTimelineData.map((day, dayIndex) => (
            <div key={dayIndex} className="timeline-item relative">
              {/* Date marker */}
              <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-slate-900"></div>
              
              {/* Content */}
              <div className="ml-16">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{day.date}</h3>
                  <p className="text-purple-300 text-sm">{day.memories.length} memories</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {day.memories.map((memory) => (
                    <div
                      key={memory.id}
                      onClick={() => onViewChange('memory-details', { memory })}
                      className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                    >
                      {/* Media preview */}
                      <div className="relative aspect-video overflow-hidden">
                        {memory.thumbnail ? (
                          <img
                            src={memory.thumbnail}
                            alt={memory.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${getTypeColor(memory.type)} flex items-center justify-center`}>
                            {getTypeIcon(memory.type)}
                          </div>
                        )}
                        
                        {memory.type !== 'photo' && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
                              {getTypeIcon(memory.type)}
                            </div>
                          </div>
                        )}

                        {memory.duration && (
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                            {memory.duration}
                          </div>
                        )}

                        {/* Type indicator */}
                        <div className={`absolute top-2 left-2 w-6 h-6 bg-gradient-to-br ${getTypeColor(memory.type)} rounded-full flex items-center justify-center`}>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h4 className="text-white font-semibold mb-2 truncate group-hover:text-purple-200 transition-colors duration-300">
                          {memory.title}
                        </h4>
                        <p className="text-purple-200 text-sm mb-3">
                          By {memory.uploadedBy}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-purple-300 text-sm">
                          <span className="flex items-center space-x-1 hover:text-pink-400 transition-colors duration-300">
                            <Heart className="w-4 h-4" />
                            <span>{memory.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1 hover:text-blue-400 transition-colors duration-300">
                            <MessageCircle className="w-4 h-4" />
                            <span>{memory.comments}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredTimelineData.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-purple-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No memories found</h3>
            <p className="text-purple-200">
              Try adjusting your filters or select a different time period
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryTimeline;