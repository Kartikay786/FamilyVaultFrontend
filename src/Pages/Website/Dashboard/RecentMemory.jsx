import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Heart, MessageCircle, Play, Volume2, Camera, Filter, Grid, List } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const RecentMemories = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');
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
    }

    fetchMemories();
  }, [])

  // console.log(memories);

  const filteredMemories = memories.filter(memory => {
    if (filterType === 'all') return true;
    if (filterType === 'photos') return memory.uploadType === 'Photo';
    if (filterType === 'videos') return memory.uploadType === 'Video';
    if (filterType === 'audio') return memory.uploadType === 'Audio';
    return true;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video':
        return <Play className="w-6 h-6 text-white" />;
      case 'Audio':
        return <Volume2 className="w-6 h-6 text-white" />;
      default:
        return <Camera className="w-6 h-6 text-white" />;
    }
  };

  const getTypeColor = (uploadType) => {
    switch (uploadType) {
      case 'Video':
        return 'from-purple-500 to-pink-500';
      case 'Audio':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  return (
    <div ref={containerRef} className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Recent Memories</h1>
        <p className="text-purple-200">Latest memories shared by your family</p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-purple-300" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option className='text-purple-900' value="all">All Types</option>
              <option className='text-purple-900' value="photos">Photos</option>
              <option className='text-purple-900' value="videos">Videos</option>
              <option className='text-purple-900' value="audio">Audio</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors duration-300 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:text-white'
              }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors duration-300 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:text-white'
              }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Memories Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMemories.map((memory) => (
            <div
              key={memory._id}
              onClick={() => navigate(`/family/memorydetail/${memory._id}`)}
              className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
            >
              {/* Media preview */}
              <div className="relative aspect-square overflow-hidden">
                {memory.uploadType === 'Photo' ? (
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/images/${memory.media}`}
                    alt={memory.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${getTypeColor(memory.uploadType)} flex items-center justify-center`}>
                    {getTypeIcon(memory.uploadType)}
                  </div>
                )}

                {memory.uploadType !== 'Photo' && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
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
                <h3 className="text-white font-semibold text-lg mb-2 truncate group-hover:text-purple-200 transition-colors duration-300">
                  {memory.title}
                </h3>
                <p className="text-purple-200 text-sm mb-1">
                  By {memory.uploadBy?.memberName || 'Family'}
                </p>
                <p className="text-purple-200 text-sm mb-1">
                  • {new Date(memory.createdAt).toDateString()}
                </p>
                <p className="text-purple-300 text-xs mb-3">
                  {memory?.vaultId?.vaultName}
                </p>


              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMemories.map((memory) => (
            <div
              key={memory._id}
              onClick={() => navigate(`/family/memorydetail/${memory._id}`)}
              className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  {memory.uploadType === 'Photo' ? (
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/images/${memory.media}`}
                      alt={memory.title}
                      className="w-full h-full object-cover"
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
                      {getTypeIcon(memory.uploadType)}
                    </div>
                  )}

                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-lg mb-1 truncate">
                    {memory.title}
                  </h3>
                  <p className="text-purple-200 text-sm mb-1">
                    Upload  By {memory.uploadBy?.memberName || 'Family'} • {new Date(memory.createdAt).toDateString()}
                  </p>
                  <p className="text-purple-300 text-xs mb-2">
                    {memory?.vaultId?.vaultName}
                  </p>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentMemories;