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
import { toast } from 'react-toastify';

const MemoryDetails = () => {
  const containerRef = useRef(null);
  const videoref = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const navigate = useNavigate();
  const { memoryId } = useParams();
  const [memory, setMemory] = useState([]);
  const [duration, setDuration] = useState(null);

  const handlePlay = () => {
    if (videoref.current) {
      videoref.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  const handlePause = () => {
    if (videoref.current) {
      videoref.current.pause();
    }
    setIsPlaying(!isPlaying);
  }

  const handlemuted = () => {
    if (videoref.current) {
      videoref.current.muted = !isMuted;
    }
    setIsMuted(!isMuted)
  }

  const handleAudioPlay = () => {
    if (!audioRef) return;

    if (isPlaying) {
      audioRef.current.pause();
    }
    else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying)
  }

  const handleAudioMute = () => {
    if (!audioRef) return;

    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted)
  }

  const handleAudioDuration = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`
  }

  const deleteMemory = async (vaultId, id) => {
    const familyId = localStorage.getItem('familyId');
    try {
      const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/memory/deleteMemory/${familyId}/${vaultId}/${id}`);
      toast.success('Member delted from vault');
      navigate(`/family/dashboard`)
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data?.message)
    }
  }

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

  const getDownloadLink = () => {
    switch (memory.uploadType) {
      case 'Photo':
        return `${import.meta.env.VITE_BASE_URL}/images/${memory.media}`;
      case 'Video':
        return `${import.meta.env.VITE_BASE_URL}/video/${memory.media}`;
      case 'Audio':
        return `${import.meta.env.VITE_BASE_URL}/audio/${memory.media}`;
      default:
        return '#';
    }
  };

  const renderMedia = () => {
    switch (memory.uploadType) {
      case 'Video':
        return (
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {
              memory.uploadType === 'Video' ? (
                <video ref={videoref} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" >
                  <source src={`${import.meta.env.VITE_BASE_URL}/video/${memory.media}`} type='video/mp4' />
                </video>
              ) : (
                ''
              )}


            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => !isPlaying ? handlePlay() : handlePause()}
                className="w-16 h-16 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
            </div>
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() => handlemuted()}
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
            <button
              onClick={() => handleAudioMute()}
            >
              {isMuted ? <VolumeX className="w-16 h-16 text-white mx-auto mb-4" /> : <Volume2 className="w-16 h-16 text-white mx-auto mb-4" />}
            </button>

            <h3 className="text-white text-xl font-semibold mb-4">{memory.title}</h3>
            <div className="flex items-center justify-center space-x-4">
              <audio onLoadedMetadata={handleAudioDuration} ref={audioRef} src={`${import.meta.env.VITE_BASE_URL}/audio/${memory.media}`} />
              <button
                onClick={() => handleAudioPlay()}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              <div className="flex-1 bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <span className="text-white text-sm">{formatTime(duration)}</span>
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
          <div className="flex flex-wrap gap-1 items-center space-x-4 text-purple-200 text-sm">
            <span className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>By {memory.uploadBy?.memberName || 'Family'}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(memory.createdAt).toDateString()}</span>
            </span>
            <span>in {memory?.vaultId?.vaultName} Vault</span>
          </div>
        </div>
        {/* <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(`/family/editmemory/${memory._id}`)}
            className="p-2 text-purple-300 cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div> */}
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

              {/* <button className="w-full flex items-center justify-center space-x-2 bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white py-3 rounded-lg transition-all duration-300">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button> */}

              <a
                href={getDownloadLink()}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white py-3 rounded-lg transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                <span>Download</span>
              </a>


              <button onClick={() => deleteMemory(memory?.vaultId?._id, memory._id)} className="w-full cursor-pointer flex items-center justify-center space-x-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 hover:text-red-300 py-3 rounded-lg transition-all duration-300">
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
                <span className="text-white">{memory?.uploadBy?.memberName || 'Family'}</span>
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