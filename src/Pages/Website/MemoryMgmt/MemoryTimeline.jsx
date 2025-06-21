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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const MemoryTimeline = ({ vault, onViewChange }) => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(12);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery,setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const years = [2025, 2024, 2023, 2022, 2021, 2020];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [memories, setMemories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchMemories = async () => {
      const familyId = localStorage.getItem('familyId');

      try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/memory/allfamilymemory/${familyId}`);

        setMemories(result?.data?.memory);

        // console.log(result?.data?.memory)
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setLoading(false); // Hide loader after data is fetched
      }
    }

    fetchMemories();
  }, [])


  const filteredTimelineData = memories.filter(memory => {
    const matchType = filterType === 'all' || memory.uploadType?.toLowerCase() === filterType ;

    const searchType = memory.title?.toLowerCase()?.includes(searchQuery.toLowerCase())
    return matchType && searchType
  });



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
      case 'Video':
        return <Video className="w-4 h-4 text-white" />;
      case 'Audio':
        return <Mic className="w-4 h-4 text-white" />;
      default:
        return <Camera className="w-4 h-4 text-white" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Video':
        return 'from-purple-500 to-pink-500';
      case 'Audio':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  const groupedMemories = filteredTimelineData.reduce((acc, memory) => {
    const date = new Date(memory.createdAt).toDateString(); // Group by date only (not time)

    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(memory);
    return acc;
  }, {});

  // console.log(groupedMemories)
  const allmemory = Object.entries(groupedMemories);

  console.log(allmemory)

  return (
    <div ref={containerRef} className="p-6 max-w-6xl mx-auto">
      {/* Header */}
       {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-solid"></div>
        </div>
      ) : (
        <>
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/family/dashboard')}
          className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Memory Timeline</h1>
          <p className="text-purple-200">
            {false ? `Explore memories from Family` : 'Explore your family memories through time'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <div className="flex flex-wrap gap-4 items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
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
              <option className='text-purple-900' value="all">All Types</option>
              <option className='text-purple-900' value="photo">Photos</option>
              <option className='text-purple-900' value="video">Videos</option>
              <option className='text-purple-900' value="audio">Audio</option>
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
          {allmemory.map((memory, dayIndex) => (
            <div key={dayIndex} className="timeline-item relative">
              
              <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-slate-900"></div>

              {/* Content */}
              <div className="ml-16">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{memory[0]}</h3>
                  <p className="text-purple-300 text-sm">{memory[1].length} memories</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {
                    memory[1].map((memory) => (
                      <div
                        key={memory._id}
                        onClick={() => navigate(`/family/memorydetail/${memory._id}`)}
                        className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                      >
                        {/* Media preview */}
                        <div className="relative aspect-video overflow-hidden">
                          {memory.uploadType === 'Photo' ? (
                            <img
                              src={`${import.meta.env.VITE_BASE_URL}/images/${memory.media}`}
                              alt={memory.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : memory.uploadType === 'Video' ? (
                          <video muted autoPlay className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" >
                            <source src={`${import.meta.env.VITE_BASE_URL}/video/${memory.media}`} type='video/mp4' />
                          </video>
                        ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${getTypeColor(memory.uploadType)} flex items-center justify-center`}>
                              {getTypeIcon(memory.uploadType)}
                            </div>
                          )}

                          {memory.uploadType !== 'photo' && (
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <div className="w-8 h-8 bg-black/60 rounded-full flex items-center justify-center">
                                {getTypeIcon(memory.uploadType)}
                              </div>
                            </div>
                          )}



                          {/* Type indicator */}
                          <div className={`absolute top-2 left-2 w-6 h-6 bg-gradient-to-br ${getTypeColor(memory.uploadType)} rounded-full flex items-center justify-center`}>
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h4 className="text-white font-semibold mb-2 truncate group-hover:text-purple-200 transition-colors duration-300">
                            {memory.title}
                          </h4>
                          <p className="text-purple-200 text-sm mb-3">
                            By {memory.uploadBy?.memberName || 'Family'}
                          </p>

                        </div>
                      </div>
                    ))
                  }


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
        </>
      )}
    </div>
  );

};

export default MemoryTimeline;