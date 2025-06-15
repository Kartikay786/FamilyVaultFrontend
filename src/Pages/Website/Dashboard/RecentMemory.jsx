import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Heart, MessageCircle, Play, Volume2, Camera, Filter, Grid, List } from 'lucide-react';



const RecentMemories = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');

  const memories = [
    {
      id: 1,
      type: 'photo',
      title: "Christmas Morning 2024",
      thumbnail: "https://images.pexels.com/photos/1303098/pexels-photo-1303098.jpeg?auto=compress&cs=tinysrgb&w=400",
      uploadedBy: "Mom",
      date: "Dec 25, 2024",
      likes: 12,
      comments: 5,
      vault: "Johnson Family Memories"
    },
    {
      id: 2,
      type: 'video',
      title: "Kids Playing in Garden",
      thumbnail: "https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=400",
      uploadedBy: "Dad",
      date: "Dec 20, 2024",
      likes: 8,
      comments: 3,
      duration: "2:45",
      vault: "Kids Growing Up"
    },
    {
      id: 3,
      type: 'audio',
      title: "Grandpa's War Stories",
      thumbnail: null,
      uploadedBy: "Sarah",
      date: "Dec 18, 2024",
      likes: 15,
      comments: 7,
      duration: "15:30",
      vault: "Grandparents Stories"
    },
    {
      id: 4,
      type: 'photo',
      title: "Family Dinner Night",
      thumbnail: "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=400",
      uploadedBy: "Emma",
      date: "Dec 15, 2024",
      likes: 9,
      comments: 2,
      vault: "Johnson Family Memories"
    },
    {
      id: 5,
      type: 'video',
      title: "Birthday Celebration",
      thumbnail: "https://images.pexels.com/photos/1134204/pexels-photo-1134204.jpeg?auto=compress&cs=tinysrgb&w=400",
      uploadedBy: "Mom",
      date: "Dec 10, 2024",
      likes: 18,
      comments: 9,
      duration: "4:12",
      vault: "Johnson Family Memories"
    },
    {
      id: 6,
      type: 'photo',
      title: "Sunset Walk",
      thumbnail: "https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=400",
      uploadedBy: "Dad",
      date: "Dec 8, 2024",
      likes: 6,
      comments: 1,
      vault: "Kids Growing Up"
    }
  ];

  const filteredMemories = memories.filter(memory => {
    if (filterType === 'all') return true;
    if (filterType === 'photos') return memory.type === 'photo';
    if (filterType === 'videos') return memory.type === 'video';
    if (filterType === 'audio') return memory.type === 'audio';
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
      case 'video':
        return <Play className="w-6 h-6 text-white" />;
      case 'audio':
        return <Volume2 className="w-6 h-6 text-white" />;
      default:
        return <Camera className="w-6 h-6 text-white" />;
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
              <option value="all">All Types</option>
              <option value="photos">Photos</option>
              <option value="videos">Videos</option>
              <option value="audio">Audio</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:text-white'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:text-white'
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
              key={memory.id}
              onClick={() => onViewChange('memory-details', { memory })}
              className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
            >
              {/* Media preview */}
              <div className="relative aspect-square overflow-hidden">
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
                    <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
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
                <h3 className="text-white font-semibold text-lg mb-2 truncate group-hover:text-purple-200 transition-colors duration-300">
                  {memory.title}
                </h3>
                <p className="text-purple-200 text-sm mb-1">
                  By {memory.uploadedBy} • {memory.date}
                </p>
                <p className="text-purple-300 text-xs mb-3">
                  {memory.vault}
                </p>
                
                <div className="flex items-center justify-between">
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
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMemories.map((memory) => (
            <div
              key={memory.id}
              onClick={() => onViewChange('memory-details', { memory })}
              className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  {memory.thumbnail ? (
                    <img
                      src={memory.thumbnail}
                      alt={memory.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${getTypeColor(memory.type)} flex items-center justify-center`}>
                      {getTypeIcon(memory.type)}
                    </div>
                  )}
                  {memory.type !== 'photo' && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      {getTypeIcon(memory.type)}
                    </div>
                  )}
                  {memory.duration && (
                    <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1 rounded">
                      {memory.duration}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-lg mb-1 truncate">
                    {memory.title}
                  </h3>
                  <p className="text-purple-200 text-sm mb-1">
                    Uploaded by {memory.uploadedBy} • {memory.date}
                  </p>
                  <p className="text-purple-300 text-xs mb-2">
                    {memory.vault}
                  </p>
                  <div className="flex items-center space-x-4 text-purple-300 text-sm">
                    <span className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{memory.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{memory.comments}</span>
                    </span>
                  </div>
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