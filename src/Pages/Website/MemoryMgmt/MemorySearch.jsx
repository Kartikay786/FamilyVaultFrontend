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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const MemorySearch = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [vaultFilter,setVaultFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filtertype, setFiltertype] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);
  const [memories, setMemories] = useState([]);
  const navigate = useNavigate();
  const [vaults, setVaults] = useState([]);

  useEffect(() => {
    const familyId = localStorage.getItem('familyId');
    const memberId = localStorage.getItem('memberId');

    const fetchAllVaults = async () => {
      try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/vault/getfamilyvaults/${familyId}/${memberId}`);
        // console.log(result);
        setVaults(result?.data?.vaults);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchAllVaults();
  }, [])

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



  const filterOptions = {
    uploadType: ['all', 'photo', 'video', 'audio'],
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

  const filteredMemories = memories?.filter((memory) => {
  const matchType = filtertype === 'all' || memory.uploadType?.toLowerCase() === filtertype.toLowerCase();
  
  const matchVault = vaultFilter === 'all' || memory?.vaultId?.vaultName?.toLowerCase() === vaultFilter.toLowerCase();
  
  const matchSearch = searchQuery === '' || 
    memory.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    memory.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    memory?.vaultId?.vaultName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    memory?.uploadBy?.memberName?.toLowerCase().includes(searchQuery.toLowerCase());

  return matchType && matchVault && matchSearch;
});


  return (
    <div ref={containerRef} className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Family Memories</h1>
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
              value={filtertype}
              onChange={(e) => setFiltertype(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {filterOptions.uploadType.map(option => (
                <option className='text-purple-900' key={option} value={option}>
                  {option === 'all' ? 'All Types' : option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>




          <div>
            <label className="block text-white text-sm font-medium mb-2">Vault</label>
            <select
              value={vaultFilter}
              onChange={(e) => setVaultFilter(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
                <option className='text-purple-900 capitalize'  value='all'>
                  All Vaults
                </option>
              {vaults.map(option => (
                <option className='text-purple-900 capitalize' key={option._id} value={option.vaultName}>
                  {option.vaultName}
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
            {filteredMemories.length} results found
          </span>
        </div>

        <div className="flex items-center space-x-4">


          {/* View Mode */}
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
      </div>

      {/* Results */}
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
                  By {memory.uploadBy?.memberName || 'Family'} • {new Date(memory.createdAt).toDateString()}
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
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${getTypeColor(memory.uploadType)} flex items-center justify-center`}>
                      {getTypeIcon(memory.uploadType)}
                    </div>
                  )}
                  {memory.uploadType !== 'Photo' && (
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
                    Uploaded by {memory.uploadBy?.memberName || 'Family'} • {new Date(memory.createdAt).toDateString()}
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

      {/* Empty state */}
      {memories.length === 0 && (
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