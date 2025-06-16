import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { 
  ArrowLeft, 
  Edit, 
  Save, 
  Camera, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail,
  Heart,
  Users,
  Gift,
  Upload,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    role: "Daughter",
    avatar: "S",
    birth: "March 15, 1998",
    location: "Portland, OR",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    bio: "Creative designer and family photographer. I love capturing special moments and creating beautiful memories for our family.",
    relationship: "Single",
    interests: ["Photography", "Design", "Travel", "Cooking"],
    favoriteMemories: 12,
    uploadedMemories: 156,
    joinedDate: "January 2020"
  });

  const familyConnections = [
    { name: "David Johnson", relation: "Father", avatar: "D" },
    { name: "Linda Johnson", relation: "Mother", avatar: "L" },
    { name: "Emma Johnson", relation: "Sister", avatar: "E" },
    { name: "Robert Johnson", relation: "Grandfather", avatar: "R" },
    { name: "Margaret Johnson", relation: "Grandmother", avatar: "M" }
  ];

  const recentActivity = [
    { action: "Uploaded 5 photos", memory: "Christmas Morning 2024", time: "2 days ago" },
    { action: "Commented on", memory: "Family Dinner Night", time: "1 week ago" },
    { action: "Liked", memory: "Kids Playing in Garden", time: "2 weeks ago" },
    { action: "Created vault", memory: "Sarah's Adventures", time: "1 month ago" }
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

  const handleSave = () => {
    setIsEditing(false);
    gsap.to(containerRef.current, {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const addInterest = (interest) => {
    if (interest && !profileData.interests.includes(interest)) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const removeInterest = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  return (
    <div ref={containerRef} className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => onViewChange('family-tree')}
          className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
          <p className="text-purple-200">Manage your personal information and family connections</p>
        </div>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-purple-300 hover:text-white transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/family/settings')}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Edit className="w-5 h-5" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-start space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {profileData.avatar}
                </div>
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors duration-300">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-xl font-bold placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      value={profileData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-purple-300 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-1">{profileData.name}</h2>
                    <p className="text-purple-300 mb-4">{profileData.role}</p>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-purple-300" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.birth}
                        onChange={(e) => handleInputChange('birth', e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-1 text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <span className="text-purple-200 text-sm">{profileData.birth}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-purple-300" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-1 text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <span className="text-purple-200 text-sm">{profileData.location}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-purple-300" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-1 text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <span className="text-purple-200 text-sm">{profileData.phone}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-purple-300" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-1 text-white text-sm placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    ) : (
                      <span className="text-purple-200 text-sm">{profileData.email}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">About</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-purple-200 leading-relaxed">{profileData.bio}</p>
            )}
          </div>

          {/* Interests */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Interests</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {profileData.interests.map((interest, index) => (
                <span
                  key={index}
                  className="flex items-center space-x-2 px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm border border-purple-500/30"
                >
                  <span>{interest}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeInterest(interest)}
                      className="text-purple-300 hover:text-white transition-colors duration-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Add an interest..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addInterest((e.target ).value);
                      (e.target ).value = '';
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-medium">{activity.action}</span> {activity.memory}
                    </p>
                    <p className="text-purple-300 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Stats */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Upload className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-200 text-sm">Uploaded</span>
                </div>
                <span className="text-white font-semibold">{profileData.uploadedMemories}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-200 text-sm">Favorites</span>
                </div>
                <span className="text-white font-semibold">{profileData.favoriteMemories}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-purple-300" />
                  <span className="text-purple-200 text-sm">Member since</span>
                </div>
                <span className="text-white font-semibold">{profileData.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Family Connections */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Family Connections</h3>
            <div className="space-y-3">
              {familyConnections.map((connection, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {connection.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{connection.name}</p>
                    <p className="text-purple-300 text-xs">{connection.relation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-2 text-purple-200 hover:text-white hover:bg-white/10 py-2 px-3 rounded-lg transition-all duration-300">
                <Upload className="w-4 h-4" />
                <span>Upload Memory</span>
              </button>
              <button className="w-full flex items-center space-x-2 text-purple-200 hover:text-white hover:bg-white/10 py-2 px-3 rounded-lg transition-all duration-300">
                <Users className="w-4 h-4" />
                <span>View Family Tree</span>
              </button>
              <button className="w-full flex items-center space-x-2 text-purple-200 hover:text-white hover:bg-white/10 py-2 px-3 rounded-lg transition-all duration-300">
                <Gift className="w-4 h-4" />
                <span>Plan Event</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;