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

const MemoryDetails = ({ memory, onViewChange }) => {
  const containerRef = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [newComment, setNewComment] = useState('');

  const memoryData = memory || {
    id: 1,
    type: 'photo',
    title: "Christmas Morning 2024",
    thumbnail: "https://images.pexels.com/photos/1303098/pexels-photo-1303098.jpeg?auto=compress&cs=tinysrgb&w=800",
    uploadedBy: "Mom",
    date: "Dec 25, 2024",
    likes: 12,
    comments: 5,
    description: "A beautiful Christmas morning with the whole family gathered around the tree. The kids were so excited to open their presents!",
    tags: ["Christmas", "Family", "Holiday", "2024"],
    vault: "Johnson Family Memories"
  };

  const comments = [
    { user: "Dad", avatar: "D", comment: "Such a wonderful morning! The kids' faces were priceless.", time: "2 hours ago" },
    { user: "Sarah", avatar: "S", comment: "I love how excited Emma was with her new bike!", time: "3 hours ago" },
    { user: "Grandma", avatar: "G", comment: "Beautiful family moment ❤️", time: "4 hours ago" }
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

  const handleLike = () => {
    setIsLiked(!isLiked);
    gsap.to('.like-button', {
      scale: 1.2,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment('');
    }
  };

  const renderMedia = () => {
    switch (memoryData.type) {
      case 'video':
        return (
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <img
              src={memoryData.thumbnail}
              alt={memoryData.title}
              className="w-full h-full object-cover"
            />
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
      
      case 'audio':
        return (
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg p-8 text-center">
            <Volume2 className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-4">{memoryData.title}</h3>
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
              src={memoryData.thumbnail}
              alt={memoryData.title}
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
          onClick={() => onViewChange('recent-memories')}
          className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-white mb-1">{memoryData.title}</h1>
          <div className="flex items-center space-x-4 text-purple-200 text-sm">
            <span className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>By {memoryData.uploadedBy}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{memoryData.date}</span>
            </span>
            <span>in {memoryData.vault}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onViewChange('edit-memory', { memory: memoryData })}
            className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
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
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
            <p className="text-purple-200 leading-relaxed">{memoryData.description}</p>
          </div>

          {/* Tags */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
              <Tag className="w-5 h-5" />
              <span>Tags</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {memoryData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm border border-purple-500/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Comments ({comments.length})</h3>
            
            {/* Add Comment */}
            <form onSubmit={handleAddComment} className="mb-6">
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  Y
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Post
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="flex space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium">{comment.user}</span>
                        <span className="text-purple-300 text-xs">{comment.time}</span>
                      </div>
                      <p className="text-purple-200">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Actions */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
            <div className="space-y-3">
              <button
                onClick={handleLike}
                className={`like-button w-full flex items-center justify-center space-x-2 py-3 rounded-lg transition-all duration-300 ${
                  isLiked 
                    ? 'bg-pink-600 text-white' 
                    : 'bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? 'Liked' : 'Like'} ({memoryData.likes + (isLiked ? 1 : 0)})</span>
              </button>
              
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
                <span className="text-white capitalize">{memoryData.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Uploaded</span>
                <span className="text-white">{memoryData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">By</span>
                <span className="text-white">{memoryData.uploadedBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Vault</span>
                <span className="text-white">{memoryData.vault}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Likes</span>
                <span className="text-white">{memoryData.likes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Comments</span>
                <span className="text-white">{comments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryDetails;