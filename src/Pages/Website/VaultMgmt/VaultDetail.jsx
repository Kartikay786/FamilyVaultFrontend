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
  MessageCircle,
  Edit,
  Accessibility
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const VaultDetail = () => {
  const containerRef = useRef(null);
  const { vaultId } = useParams();
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();
  const [vault, setVault] = useState({});

  useEffect(() => {

    const fetchVault = async () => {
      try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/vault/vaultbyId/${vaultId}`);
        setVault(result?.data?.vault);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchVault();
  }, [vaultId])


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
      case 'Video':
        return 'from-purple-500 to-pink-500';
      case 'Audio':
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
          src={`${import.meta.env.VITE_BASE_URL}/images/${vault.coverImage}`}
          alt={vault.vaultName}
          className="w-full h-auto object-center object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>



        <button
          onClick={() => navigate('/family/vaultoverview')}
          className="absolute top-6 left-6 p-2 cursor-pointer bg-black/30 backdrop-blur-sm rounded-lg text-white hover:bg-black/50 transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>


        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{vault.vaultName} Vaults</h1>
              <p className="text-white/80 mb-4 max-w-2xl">{vault.description}</p>
              <div className="flex items-center space-x-6 text-white/80">
                <span className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{vault.vaultMembers?.length === 0 ? 1 : vault.vaultMembers?.length} members</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{vault.memory?.length} memories</span>
                </span>
                <span>Updated {new Date(vault.updatedAt).toLocaleDateString()}</span>

                <span className="flex items-center space-x-1">
                  <Accessibility className="w-4 h-4" />
                  <span>{vault.privacy}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(`/family/editvault/${vault._id}`)}
                className="flex cursor-pointer items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Edit className="w-5 h-5" />
                <span>Edit Vault</span>
              </button>

              <button
                className="flex cursor-pointer items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Memory</span>
              </button>

            </div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">

            {/* member  */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Members</h3>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {
                    vault.createdBy?.profileImage ? (
                      <img className='h-auto w-10 bg-cover bg-center scale-150' src={`${import.meta.env.VITE_BASE_URL}/images/${vault.createdBy?.profileImage}`} />
                    ) : ''
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm font-medium truncate">{vault.createdBy?.memberName}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${vault.createdBy?.role === 'Admin'
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'bg-blue-500/20 text-blue-300'
                      }`}>
                      {vault.createdBy?.role}
                    </span>
                  </div>
                  <p className="text-purple-300 text-xs">2 hours ago</p>
                </div>
              </div>
              {/* other vault member  */}

              <button className="w-full mt-4 text-purple-300 hover:text-white text-sm transition-colors duration-300">
                + Invite Members
              </button>
            </div>
            {/* stasts */}
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

          {/* main content  */}
          <div className="lg:col-span-3">
            {/* filters  */}
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

            {/* memories  */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                  vault.memory?.map((memory) => (
                    <div
                      key={memory._id}
                      onClick={() => navigate(`/family/memorydetail/${memory._id}`)}
                      className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 hover:-translate-y-1 cursor-pointer"
                    >
                      {/* media  */}
                      <div className="relative aspect-square overflow-hidden">
                        {memory.uploadType === 'Photo' ? (
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}/images/${memory.media}`}
                            alt={memory?.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          ''
                        )}

                        {/* type indicator  */}
                        <div className={`absolute top-2 left-2 w-6 h-6 bg-gradient-to-br ${getTypeColor(memory.uploadType)} rounded-full flex items-center justify-center`}>
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>

                      {/* content  */}
                      <div className="p-4">
                        <h3 className="text-white font-semibold text-lg mb-2 truncate group-hover:text-purple-200 transition-colors duration-300">
                          {memory?.title}
                        </h3>



                        <p className="text-purple-200 text-sm mb-3">
                          {/* By {memory.createdBy.memberName} • 
                          &nbsp;&nbsp;&nbsp; */}
                          {new Date(memory.createdAt).toLocaleDateString()}
                        </p>

                        <div className="flex items-center justify-between">

                          <button className="p-1 text-purple-300 hover:text-white hover:bg-white/10 rounded transition-all duration-300">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>

                      </div>

                    </div>
                  ))
                }
              </div>
            ) : (
              <div className="space-y-4">
                {
                  vault.memory?.map((memory) => (
                    <div key={memory._id}
                      onClick={() => navigate(`/family/memorydetail/${memory._id}`)}
                      className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02] cursor-pointer"
                    >

                      <div className="flex items-center space-x-4">
                        {/* Thumbnail */}
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          {memory.uploadType  === 'Photo' ? (
                            <img
                              src={`${import.meta.env.VITE_BASE_URL}/images/${memory.media}`}
                              alt={memory?.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            ''
                          )}

                        </div>

                         {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-white font-semibold text-lg mb-1 truncate">
                              {memory?.title}
                            </h3>
                            <p className="text-purple-200 text-sm mb-2">
                              {/* Uploaded by {vault.createdBy.memberName} • &nbsp;&nbsp;&nbsp;  */}
                              {new Date(memory.createdAt).toLocaleDateString()}
                            </p>
                           
                          </div>
                          <button className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      </div>
                    </div>
                  ))
                }
              </div>
            )

            }
          </div>

        </div>

      </div>
    </div>
  );
};

export default VaultDetail;