import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Upload
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Settings = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [familyName, setFamilyName] = useState('');
  const loginType = localStorage.getItem('loginType');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    privacy: {
      profileVisibility: "family",
      memoryVisibility: "family",
      allowComments: true,
      allowDownloads: true,
      showOnlineStatus: true,
      dataSharing: false
    },
  });

  const [familyData, setFamilyData] = useState({});

  useEffect(() => {
    const familyId = localStorage.getItem('familyId');
    const fetchProfile = async () => {
      const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/family/familyProfile/${familyId}`)
      // console.log(result);
      setFamilyData(result?.data?.family)
      setFamilyName(result?.data?.family?.familyName);
      setDescription(result?.data?.family?.description)
    }
    fetchProfile()
  }, [])

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));  // set preview
      setProfileImage(file);  // this is your existing state
    }
  };


  const editFamily = async (e) => {
    e.preventDefault();

    const familyId = localStorage.getItem('familyId');
    const formData = new FormData();
    formData.append('familyName', familyName);
    formData.append('description', description);
    formData.append('profileImage', profileImage);

    try {
      const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/family/editfamily/${familyId}`, formData)
      toast.success('Your Family Profile Updated .', {
        position: 'top-center'
      });
      console.log(result);
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data.message === 'Server Error' ? 'Family Name Alrady Exist. Please try some other..' : err.response.data.message, {
        position: 'top-center'
      });
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    // { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'data', label: 'Data & Storage', icon: Download }
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

  const changePassword = async () => {
    const familyId = localStorage.getItem('familyId');
    try {
      const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/family/changePassword`, { familyId, currentPassword, newPassword });
      toast.success('Password Updated');
    }
    catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message)
    }
    finally {
      setCurrentPassword('');
      setNewPassword('');
    }
  }


  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const deleteAccount = async () => {
    const familyId = localStorage.getItem('familyId');

    try {
      const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/family/deleteAccount/${familyId}`);
      toast.success('Account Deleted');
      navigate('/');
      localStorage.removeItem('familyId');
      localStorage.removeItem('loginType');
      localStorage.removeItem('role');
      localStorage.removeItem('loginByEmail');
      localStorage.removeItem('memberId');
    }
    catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message)
    }
  }



  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name='familyName'
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={familyData.email}
              disabled
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

        </div>
        <div className="mt-4">
          <label className="block text-white text-sm font-medium mb-2">Bio</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Profile Image</h3>
          <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300">
            <Upload className="w-12 h-12 text-purple-300 mx-auto mb-4" />
            <h4 className="text-white text-lg font-semibold mb-2">
              Upload New Profile Image
            </h4>
            <p className="text-purple-200 mb-4">
              Choose a beautiful image to represent your family
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="cover-upload"
            />
            <label
              htmlFor="cover-upload"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <Upload className="w-5 h-5" />
              <span>Select Image</span>
            </label>

            {previewImage && (
              <div className="mt-4">
                <h4 className="text-white mb-2">Preview:</h4>
                <img
                  src={previewImage}
                  alt="Cover Preview"
                  className="w-full max-h-64 object-cover rounded-lg border border-white/20"
                />
              </div>
            )}

          </div>
        </div>


      </div>

      {
        loginType === 'Family' ? (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">Account Security  <Shield className="w-5 h-5" /></h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Current Password</label>
                <input
                  type="text"
                  name='currentPassword'
                  placeholder='********'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">New Password</label>
                <input
                  type="text"
                  name='newPassword'
                  placeholder='********'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                onClick={changePassword}
                className="flex mb-4 items-center cursor-pointer space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Save className="w-5 h-5" />
                <span>Change Password</span>
              </button>

            </div>
          </div>
        ) : ''
      }

    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Visibility Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Profile Visibility</label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="public">Public</option>
              <option value="family">Family Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Memory Visibility</label>
            <select
              value={settings.privacy.memoryVisibility}
              onChange={(e) => handleSettingChange('privacy', 'memoryVisibility', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="public">Public</option>
              <option value="family">Family Only</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Interaction Settings</h3>
        <div className="space-y-4">
          {[
            { key: 'allowDownloads', label: 'Allow Downloads', desc: 'Let family members download your memories' },
            { key: 'dataSharing', label: 'Data Sharing', desc: 'Share usage data for service improvement' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{item.label}</h4>
                <p className="text-purple-300 text-sm">{item.desc}</p>
              </div>
              <button
                onClick={() => handleSettingChange('privacy', item.key, !settings.privacy[item.key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.privacy[item.key] ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.privacy[item.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Storage Usage</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-purple-200">Photos</span>
            <span className="text-white">2.4 GB</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-purple-200">Videos</span>
            <span className="text-white">1.8 GB</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '45%' }}></div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-purple-200">Audio</span>
            <span className="text-white">0.3 GB</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '15%' }}></div>
          </div>

          <div className="pt-4 border-t border-white/20">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Total Used</span>
              <span className="text-white font-semibold">4.5 GB of 10 GB</span>
            </div>
          </div>
        </div>
      </div>

      {
        loginType === 'Family' ? (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between bg-white/10 border border-white/20 text-white py-3 px-4 rounded-lg hover:bg-white/20 transition-all duration-300">
                <span>Download All Data</span>
                <Download className="w-5 h-5" />
              </button>
              <button className="w-full flex items-center justify-between bg-white/10 border border-white/20 text-white py-3 px-4 rounded-lg hover:bg-white/20 transition-all duration-300">
                <span>Clear Cache</span>
                <Trash2 className="w-5 h-5" />
              </button>

            </div>
          </div>

        ) : ' '}

      {
        loginType === 'Family' ? (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
            <div className="space-y-3">
              <button onClick={deleteAccount} className="w-full cursor-pointer flex items-center justify-center space-x-2 bg-red-600/20 border border-red-500/30 text-red-400 py-3 px-4 rounded-lg hover:bg-red-600/30 transition-all duration-300">
                <Trash2 className="w-5 h-5" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>

        ) : ' '}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'data':
        return renderDataSettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div ref={containerRef} className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-purple-200">Manage your account preferences and privacy settings</p>
        </div>
        <button
          onClick={editFamily}
          className=" hidden md:flex items-center cursor-pointer space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      <button
        onClick={editFamily}
        className="flex mb-4 md:hidden items-center cursor-pointer space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        <Save className="w-5 h-5" />
        <span>Save Changes</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-purple-600/50 text-white border-r-2 border-purple-400'
                  : 'text-purple-200 hover:text-white hover:bg-white/10'
                  }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;