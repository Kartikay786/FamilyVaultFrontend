import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, Save, Trash2, Upload, Tag, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const EditMemory = ({onViewChange }) => {
  const containerRef = useRef(null);
  const {memoryId} = useParams();
  const navigate = useNavigate();
  const [newTag, setNewTag] = useState(''); 
  const [memory, setMemory] = useState([]);

  useEffect(() => {
    const fetchVault = async () => {
      try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/memory/memory/${memoryId}`);
        setMemory(result?.data?.memory);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchVault();
  }, [memoryId])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSave = () => {
    gsap.to(containerRef.current, {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      onComplete: () => onViewChange('memory-details', { memory: { ...memory, ...memoryData } })
    });
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !memoryData.tags.includes(newTag.trim())) {
      setMemoryData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setMemoryData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };



  return (
    <div ref={containerRef} className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate(`/family/memorydetail/${memory._id}`)}
          className="p-2 text-purple-300 cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Edit Memory</h1>
          <p className="text-purple-200">Update your memory details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={memory.title}
                  onChange={(e) => setMemoryData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter memory title..."
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Description</label>
                <textarea
                  value={memory.description}
                  onChange={(e) => setMemoryData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Describe your memory..."
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Vault</label>
                <select
                  // value={memory.vault}
                  // onChange={(e) => setMemoryData(prev => ({ ...prev, vault: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Johnson Family Memories">Johnson Family Memories</option>
                  <option value="Grandparents Stories">Grandparents Stories</option>
                  <option value="Kids Growing Up">Kids Growing Up</option>
                </select>
              </div>
            </div>
          </div>

          {/* Replace Media */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Replace Media</h2>
            
            <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300">
              <Upload className="w-12 h-12 text-purple-300 mx-auto mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">
                Upload New Media
              </h3>
              <p className="text-purple-200 mb-4">
                Replace the current media with a new file
              </p>
              <input
                type="file"
                accept="image/*,video/*,audio/*"
                className="hidden"
                id="media-upload"
              />
              <label
                htmlFor="media-upload"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <Upload className="w-5 h-5" />
                <span>Select File</span>
              </label>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Current Media Preview */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Current Media</h3>
            <div className="aspect-square bg-black rounded-lg overflow-hidden mb-4">
              <img
                src={`${import.meta.env.VITE_BASE_URL}/images/${memory?.media}`}
                alt={memory.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm text-purple-200">
              <p>Type: {memory?.uploadType }</p>
              <p>Uploaded: {new Date(memory.createdAt).toDateString() }</p>
            </div>
          </div>

      

          {/* Privacy Settings */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Privacy</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-purple-200 text-sm">Allow downloads</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-200 text-sm">Show in timeline</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
        <button className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-300">
          <Trash2 className="w-5 h-5" />
          <span>Delete Memory</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <button
            // onClick={() => onViewChange('memory-details', { memory })}
            className="px-6 py-3 text-purple-300 hover:text-white transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            // onClick={handleSave}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Save className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMemory;