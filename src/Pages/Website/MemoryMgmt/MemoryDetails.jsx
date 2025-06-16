import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Edit,
  Trash2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MoreHorizontal,
  User,
  Calendar,
  Tag
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const MemoryDetails = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();
  const { memoryId } = useParams();
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

  // console.log(memory)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);


  const renderMedia = () => {
    switch (memory.uploadType) {
      case 'Video':
        return (
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {
              memory.uploadType === 'Photo' ? (
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/images/${memory.media}`}
                  alt={memory.title}
                  className="w-full h-full object-cover"
                />
              ) : ''
            }

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
            </div>
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-black/60 backdrop-blur-sm rounded-lg text-white hover:bg-black/80 transition-all duration-300"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
        );

      case 'Audio':
        return (
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg p-8 text-center">
            <Volume2 className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-4">{memory.title}</h3>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              <div className="flex-1 bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <span className="text-white text-sm">15:30</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <img
              src={`${import.meta.env.VITE_BASE_URL}/images/${memory.media}`}
              alt={memory.title}
              className="w-full h-full object-cover"
            />
          </div>
        );
    }
  };

  return (
    <div ref={containerRef} className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/family/vaultoverview')}
          className="p-2 text-purple-300 cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-1">{memory.title}</h1>
          <div className="flex items-center space-x-4 text-purple-200 text-sm">
            <span className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>By {memory.uploadBy?.memberName}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(memory.createdAt).toDateString()}</span>
            </span>
            <span>in {memory?.vaultId?.vaultName} Vault</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(`/family/editmemory/${memory._id}`)}
            className="p-2 text-purple-300 cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Media */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
            {renderMedia()}
          </div>

          {/* Description */}
          {
            memory.description ? (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-purple-200 leading-relaxed">{memory.description}</p>
              </div>

            ) : ''
          }  

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Actions */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
            <div className="space-y-3">

              <button className="w-full flex items-center justify-center space-x-2 bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white py-3 rounded-lg transition-all duration-300">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>

              <button className="w-full flex items-center justify-center space-x-2 bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white py-3 rounded-lg transition-all duration-300">
                <Download className="w-5 h-5" />
                <span>Download</span>
              </button>

              <button className="w-full flex items-center justify-center space-x-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 hover:text-red-300 py-3 rounded-lg transition-all duration-300">
                <Trash2 className="w-5 h-5" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Memory Info */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Memory Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-200">Type</span>
                <span className="text-white capitalize">{memory.uploadType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Uploaded</span>
                <span className="text-white">{new Date(memory.createdAt).toDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">By</span>
                <span className="text-white">{memory?.uploadBy?.memberName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Vault</span>
                <span className="text-white">{memory?.vaultId?.vaultName}</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryDetails;