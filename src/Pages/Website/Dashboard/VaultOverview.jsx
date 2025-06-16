import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Users, Heart, Clock, Settings, Eye, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const VaultOverview = ({ onViewChange }) => {
  const containerRef = useRef(null);
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

  // console.log(vaults)

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
          onClick={() => navigate('/family/createvault')}
          className="flex items-center space-x-2 cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Vault</span>
        </button>
      </div>

      {/* Vaults Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {vaults.map((vault) => (
          <div
            key={vault._id}
            onClick={() => navigate(`/family/vaultdetail/${vault._id}`)}
            className="group cursor-pointer bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105"
          >
            {/* Cover Image */}
            <div className="relative h-48  overflow-hidden">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/images/${vault.coverImage}`}
                alt={vault.vaultName}
                className="w-full h-auto object-center object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Member count overlay */}
              <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                <Users className="w-4 h-4 text-white" />
                <span className="text-white text-sm">{vault.vaultMembers?.length === 0 ? 1 : vault.vaultMembers?.length}</span>
              </div>

              {/* Quick Actions */}
              <div className="absolute bottom-4 right-4 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               
                <button
                  // onClick={() => navigate('/family/editvault')}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors duration-300"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                {vault.vaultName}
              </h3>

              <p className="text-purple-200 text-sm mb-4 line-clamp-2">
                {vault.description}
              </p>

              <div className="flex items-center justify-between text-purple-200 text-sm mb-4">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{vault.memory?.length} memories</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(vault.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`w-16 h-1 bg-gradient-to-r ${vault.theme} rounded-full`}></div>
                <button
                  className="text-purple-300 hover:text-white text-sm font-medium transition-colors duration-300"
                >
                 {vault.privacy}
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