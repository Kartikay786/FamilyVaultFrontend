import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { 
  ArrowLeft, 
  Users, 
  Heart, 
  Upload, 
  Settings, 
  Search,
  Grid,
  List,
  Filter,
  Play,
  Volume2,
  Camera,
  MoreHorizontal,
  MessageCircle
} from 'lucide-react';

const VaultDetail = ({ vault, onViewChange }) => {
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');

  const vaultInfo = {
    name: vault || "Johnson Family Memories",
    coverImage: "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=1200",
    memberCount: 12,
    memoryCount: 347,
    theme: "from-blue-500 to-purple-600",
    lastUpdated: "2 hours ago",
    description: "Our main family vault with memories from all generations, capturing precious moments and stories that define who we are."
  };

  const members = [
    { name: 'Mom', avatar: 'M', role: 'Admin', lastActive: '2 hours ago' },
    { name: 'Dad', avatar: 'D', role: 'Admin', lastActive: '4 hours ago' },
    { name: 'Sarah', avatar: 'S', role: 'Member', lastActive: '1 day ago' },
    { name: 'Emma', avatar: 'E', role: 'Member', lastActive: '2 days ago' },
    { name: 'Grandpa', avatar: 'G', role: 'Member', lastActive: '3 days ago' }
  ];

  const memories = [
    {
      id: 1,
      type: 'photo',
      title: "Christmas Morning 2024",
      thumbnail: "https://images.pexels.com/photos/1303098/pexels-photo-1303098.jpeg?auto=compress&cs=tinysrgb&w=400",
      uploadedBy: "Mom",
      date: "Dec 25, 2024",
      likes: 12,
      comments: 5
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
      duration: "2:45"
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
      duration: "15:30"
    },
    {
      id: 4,
      type: 'photo',
      title: "Family Dinner Night",
      thumbnail: "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=400",
      uploadedBy: "Emma",
      date: "Dec 15, 2024",
      likes: 9,
      comments: 2
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
    <div ref={containerRef} className="max-w-7xl mx-auto">
      {/* Header with Cover */}
      <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
        <img
          src={vaultInfo.coverImage}
          alt={vaultInfo.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Back Button */}
        <button
          onClick={() => onViewChange('vault-overview')}
          className="absolute top-6 left-6 p-2 bg-black/30 backdrop-blur-sm rounded-lg text-white hover:bg-black/50 transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Vault Info */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{vaultInfo.name}</h1>
              <p className="text-white/80 mb-4 max-w-2xl">{vaultInfo.description}</p>
              <div className="flex items-center space-x-6 text-white/80">
                <span className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{vaultInfo.memberCount} members</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{vaultInfo.memoryCount} memories</span>
                </span>
                <span>Updated {vaultInfo.lastUpdated}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onViewChange('upload-memory', { vault: vaultInfo.name })}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Memory</span>
              </button>
              <button
                onClick={() => onViewChange('edit-vault', { vault: vaultInfo.name })}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all duration-300"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Members */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Members</h3>
              <div className="space-y-3">
                {members.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {member.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-white text-sm font-medium truncate">{member.name}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          member.role === 'Admin' 
                            ? 'bg-purple-500/20 text-purple-300' 
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {member.role}
                        </span>
                      </div>
                      <p className="text-purple-300 text-xs">{member.lastActive}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-purple-300 hover:text-white text-sm transition-colors duration-300">
                + Invite Members
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-purple-200">Photos</span>
                  <span className="text-white font-semibold">234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Videos</span>
                  <span className="text-white font-semibold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Audio</span>
                  <span className="text-white font-semibold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Total Size</span>
                  <span className="text-white font-semibold">4.2 GB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filters and Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                  <input
                    type="text"
                    placeholder="Search memories..."
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <p className="text-purple-200 text-sm mb-3">
                        By {memory.uploadedBy} • {memory.date}
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
                        <button className="p-1 text-purple-300 hover:text-white hover:bg-white/10 rounded transition-all duration-300">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
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
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-white font-semibold text-lg mb-1 truncate">
                              {memory.title}
                            </h3>
                            <p className="text-purple-200 text-sm mb-2">
                              Uploaded by {memory.uploadedBy} • {memory.date}
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
                          <button className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultDetail;