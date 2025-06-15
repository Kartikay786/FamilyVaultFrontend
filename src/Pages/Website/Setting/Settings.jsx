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
  EyeOff
} from 'lucide-react';

const Settings = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      bio: "Creative designer and family photographer",
      timezone: "America/Los_Angeles",
      language: "English"
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      newMemories: true,
      comments: true,
      likes: true,
      familyUpdates: true,
      weeklyDigest: false,
      monthlyReport: true
    },
    privacy: {
      profileVisibility: "family",
      memoryVisibility: "family",
      allowComments: true,
      allowDownloads: true,
      showOnlineStatus: true,
      dataSharing: false
    },
    appearance: {
      theme: "dark",
      accentColor: "purple",
      fontSize: "medium",
      animations: true,
      autoPlayVideos: true,
      highQualityImages: true
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
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

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category ],
        [setting]: value
      }
    }));
  };

  const handleSave = () => {
    gsap.to(containerRef.current, {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    });
    // Save settings logic here
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={settings.profile.name}
              onChange={(e) => handleSettingChange('profile', 'name', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={settings.profile.email}
              onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              value={settings.profile.phone}
              onChange={(e) => handleSettingChange('profile', 'phone', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Timezone</label>
            <select
              value={settings.profile.timezone}
              onChange={(e) => handleSettingChange('profile', 'timezone', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/New_York">Eastern Time</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-white text-sm font-medium mb-2">Bio</label>
          <textarea
            value={settings.profile.bio}
            onChange={(e) => handleSettingChange('profile', 'bio', e.target.value)}
            rows={3}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Account Security</h3>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between bg-white/10 border border-white/20 text-white py-3 px-4 rounded-lg hover:bg-white/20 transition-all duration-300">
            <span>Change Password</span>
            <Shield className="w-5 h-5" />
          </button>
          <button className="w-full flex items-center justify-between bg-white/10 border border-white/20 text-white py-3 px-4 rounded-lg hover:bg-white/20 transition-all duration-300">
            <span>Two-Factor Authentication</span>
            <Shield className="w-5 h-5" />
          </button>
          <button className="w-full flex items-center justify-between bg-white/10 border border-white/20 text-white py-3 px-4 rounded-lg hover:bg-white/20 transition-all duration-300">
            <span>Login Sessions</span>
            <Globe className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Email Notifications</h4>
              <p className="text-purple-300 text-sm">Receive notifications via email</p>
            </div>
            <button
              onClick={() => handleSettingChange('notifications', 'emailNotifications', !settings.notifications.emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications.emailNotifications ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Push Notifications</h4>
              <p className="text-purple-300 text-sm">Receive push notifications in browser</p>
            </div>
            <button
              onClick={() => handleSettingChange('notifications', 'pushNotifications', !settings.notifications.pushNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications.pushNotifications ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Activity Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'newMemories', label: 'New Memories', desc: 'When family members upload new memories' },
            { key: 'comments', label: 'Comments', desc: 'When someone comments on your memories' },
            { key: 'likes', label: 'Likes', desc: 'When someone likes your memories' },
            { key: 'familyUpdates', label: 'Family Updates', desc: 'Important family announcements' },
            { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of weekly family activity' },
            { key: 'monthlyReport', label: 'Monthly Report', desc: 'Monthly family memory statistics' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{item.label}</h4>
                <p className="text-purple-300 text-sm">{item.desc}</p>
              </div>
              <button
                onClick={() => handleSettingChange('notifications', item.key, !settings.notifications[item.key])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications[item.key] ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
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
            { key: 'allowComments', label: 'Allow Comments', desc: 'Let family members comment on your memories' },
            { key: 'allowDownloads', label: 'Allow Downloads', desc: 'Let family members download your memories' },
            { key: 'showOnlineStatus', label: 'Show Online Status', desc: 'Display when you are online' },
            { key: 'dataSharing', label: 'Data Sharing', desc: 'Share usage data for service improvement' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{item.label}</h4>
                <p className="text-purple-300 text-sm">{item.desc}</p>
              </div>
              <button
                onClick={() => handleSettingChange('privacy', item.key, !settings.privacy[item.key ])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.privacy[item.key ] ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.privacy[item.key ] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Theme Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Theme</label>
            <select
              value={settings.appearance.theme}
              onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Accent Color</label>
            <div className="grid grid-cols-6 gap-3">
              {['purple', 'blue', 'green', 'pink', 'orange', 'red'].map((color) => (
                <button
                  key={color}
                  onClick={() => handleSettingChange('appearance', 'accentColor', color)}
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r from-${color}-500 to-${color}-600 border-2 transition-all duration-300 ${
                    settings.appearance.accentColor === color ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Font Size</label>
            <select
              value={settings.appearance.fontSize}
              onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Media Settings</h3>
        <div className="space-y-4">
          {[
            { key: 'animations', label: 'Animations', desc: 'Enable smooth animations and transitions' },
            { key: 'autoPlayVideos', label: 'Auto-play Videos', desc: 'Automatically play videos when visible' },
            { key: 'highQualityImages', label: 'High Quality Images', desc: 'Load images in highest quality' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{item.label}</h4>
                <p className="text-purple-300 text-sm">{item.desc}</p>
              </div>
              <button
                onClick={() => handleSettingChange('appearance', item.key, !settings.appearance[item.key ])}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.appearance[item.key ] ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.appearance[item.key ] ? 'translate-x-6' : 'translate-x-1'
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
          <button
            onClick={() => onViewChange('access-control')}
            className="w-full flex items-center justify-between bg-white/10 border border-white/20 text-white py-3 px-4 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            <span>Access Control</span>
            <Shield className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center space-x-2 bg-red-600/20 border border-red-500/30 text-red-400 py-3 px-4 rounded-lg hover:bg-red-600/30 transition-all duration-300">
            <Trash2 className="w-5 h-5" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'appearance':
        return renderAppearanceSettings();
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
          onClick={handleSave}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-300 ${
                  activeTab === tab.id
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