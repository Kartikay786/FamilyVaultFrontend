import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { 
  Search, 
  Filter, 
  Calendar,
  User,
  Tag,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Camera,
  Video,
  Mic,
  Heart,
  MessageCircle,
  X
} from 'lucide-react';


const MemorySearch = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all',
    uploader: 'all',
    vault: 'all'
  });
  const [activeFilters, setActiveFilters] = useState([]);

  const searchResults = [
    {
      id: 1,
      type: 'photo',
      title: "Christmas Morning 2024",
      thumbnail: "https://images.pexels.com/photos/1303098/pexels-photo-1303098.jpeg?auto=compress&cs=tinysrgb&w=400",
      uploadedBy: "Mom",
      date: "Dec 25, 2024",
      likes: 12,
      comments: 5,
      vault: "Johnson Family Memories",
      tags: ["Christmas", "Family", "Holiday"]
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
      vault: "Kids Growing Up",
      tags: ["Kids", "Garden", "Playing"]
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
      vault: "Grandparents Stories",
      tags: ["Stories", "History", "Grandpa"]
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
      vault: "Johnson Family Memories",
      tags: ["Dinner", "Family", "Food"]
    }
  ];

  const filterOptions = {
    type: ['all', 'photos', 'videos', 'audio'],
    dateRange: ['all', 'today', 'this-week', 'this-month', 'this-year'],
    uploader: ['all', 'Mom', 'Dad', 'Sarah', 'Emma', 'Grandpa'],
    vault: ['all', 'Johnson Family Memories', 'Grandparents Stories', 'Kids Growing Up']
  };

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

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    
    // Update active filters
    const newActiveFilters = [];
    if (value !== 'all') {
      newActiveFilters.push(`${filterType}:${value}`);
    }
    setActiveFilters(prev => {
      const filtered = prev.filter(f => !f.startsWith(`${filterType}:`));
      return [...filtered, ...newActiveFilters];
    });
  };

  const removeFilter = (filterToRemove) => {
    const [filterType] = filterToRemove.split(':');
    setFilters(prev => ({ ...prev, [filterType]: 'all' }));
    setActiveFilters(prev => prev.filter(f => f !== filterToRemove));
  };

  const clearAllFilters = () => {
    setFilters({
      type: 'all',
      dateRange: 'all',
      uploader: 'all',
      vault: 'all'
    });
    setActiveFilters([]);
    setSearchQuery('');
  };

  return (
    <div ref={containerRef} className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Vault Memories</h1>
        <p className="text-purple-200">Find specific memories across all your family vaults</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-purple-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, description, tags, or uploader..."
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Type</label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {filterOptions.type.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Types' : option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Date Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {filterOptions.dateRange.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Time' : option.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Uploader</label>
            <select
              value={filters.uploader}
              onChange={(e) => handleFilterChange('uploader', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {filterOptions.uploader.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Uploaders' : option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Vault</label>
            <select
              value={filters.vault}
              onChange={(e) => handleFilterChange('vault', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {filterOptions.vault.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Vaults' : option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-purple-200 text-sm">Active filters:</span>
            {activeFilters.map((filter) => {
              const [type, value] = filter.split(':');
              return (
                <span
                  key={filter}
                  className="flex items-center space-x-2 px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm border border-purple-500/30"
                >
                  <span>{type}: {value}</span>
                  <button
                    onClick={() => removeFilter(filter)}
                    className="text-purple-300 hover:text-white transition-colors duration-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
            <button
              onClick={clearAllFilters}
              className="text-purple-300 hover:text-white text-sm transition-colors duration-300"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <span className="text-purple-200 text-sm">
            {searchResults.length} results found
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort */}
          <div className="flex items-center space-x-2">
            <span className="text-purple-200 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="date">Date</option>
              <option value="likes">Likes</option>
              <option value="comments">Comments</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
            </button>
          </div>

          {/* View Mode */}
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
      </div>

      {/* Results */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((memory) => (
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

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {memory.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {memory.tags.length > 2 && (
                    <span className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs">
                      +{memory.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {searchResults.map((memory) => (
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
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {memory.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

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

      {/* Empty state */}
      {searchResults.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-purple-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No memories found</h3>
          <p className="text-purple-200">
            Try adjusting your search query or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default MemorySearch;