import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Users, Heart, Clock, Settings, Eye, Plus } from 'lucide-react';


const VaultOverview = ({ onViewChange }) => {
  const containerRef = useRef(null);

  const vaults = [
    {
      id: 1,
      name: "Johnson Family Memories",
      coverImage: "https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=800",
      memberCount: 12,
      memoryCount: 347,
      theme: "from-blue-500 to-purple-600",
      lastUpdated: "2 hours ago",
      description: "Our main family vault with memories from all generations"
    },
    {
      id: 2,
      name: "Grandparents Stories",
      coverImage: "https://images.pexels.com/photos/1134204/pexels-photo-1134204.jpeg?auto=compress&cs=tinysrgb&w=800",
      memberCount: 8,
      memoryCount: 156,
      theme: "from-green-500 to-teal-600",
      lastUpdated: "1 day ago",
      description: "Precious stories and memories from grandma and grandpa"
    },
    {
      id: 3,
      name: "Kids Growing Up",
      coverImage: "https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=800",
      memberCount: 6,
      memoryCount: 892,
      theme: "from-pink-500 to-orange-600",
      lastUpdated: "3 hours ago",
      description: "Watching our children grow through the years"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Vault Overview</h1>
          <p className="text-purple-200">Manage and explore your family vaults</p>
        </div>
        <button
          onClick={() => onViewChange('create-vault')}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Vault</span>
        </button>
      </div>

      {/* Vaults Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {vaults.map((vault) => (
          <div
            key={vault.id}
            className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105"
          >
            {/* Cover Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={vault.coverImage}
                alt={vault.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Member count overlay */}
              <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                <Users className="w-4 h-4 text-white" />
                <span className="text-white text-sm">{vault.memberCount}</span>
              </div>

              {/* Quick Actions */}
              <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => onViewChange('vault-detail', { vault: vault.name })}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors duration-300"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onViewChange('edit-vault', { vault: vault.name })}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors duration-300"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                {vault.name}
              </h3>
              
              <p className="text-purple-200 text-sm mb-4 line-clamp-2">
                {vault.description}
              </p>
              
              <div className="flex items-center justify-between text-purple-200 text-sm mb-4">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{vault.memoryCount} memories</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{vault.lastUpdated}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`w-16 h-1 bg-gradient-to-r ${vault.theme} rounded-full`}></div>
                <button
                  onClick={() => onViewChange('vault-detail', { vault: vault.name })}
                  className="text-purple-300 hover:text-white text-sm font-medium transition-colors duration-300"
                >
                  Open Vault →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vault Statistics */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Vault Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Storage Usage</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Photos</span>
                <span className="text-white">2.4 GB</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Videos</span>
                <span className="text-white">1.8 GB</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-200">Audio</span>
                <span className="text-white">0.3 GB</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Activity This Week</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-purple-200">Uploads</span>
                <span className="text-2xl font-bold text-white">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-200">Comments</span>
                <span className="text-2xl font-bold text-white">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-200">Likes</span>
                <span className="text-2xl font-bold text-white">156</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Top Contributors</h3>
            <div className="space-y-3">
              {['Mom', 'Dad', 'Sarah', 'Grandpa'].map((name, index) => (
                <div key={name} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-white text-sm">{name}</span>
                      <span className="text-purple-300 text-sm">{45 - index * 8} uploads</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultOverview;