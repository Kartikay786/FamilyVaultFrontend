import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  Upload, 
  Palette, 
  Users, 
  Shield,
  Bell,
  Eye,
  EyeOff
} from 'lucide-react';


const EditVaultSettings = ({ vault, onViewChange }) => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('general');
  const [vaultData, setVaultData] = useState({
    name: vault || 'Johnson Family Memories',
    description: 'Our main family vault with memories from all generations',
    coverImage: null,
    theme: 'from-blue-500 to-purple-600',
    privacy: 'private',
    allowComments: true,
    allowDownloads: true,
    notifications: true,
    autoBackup: true
  });

  const themes = [
    { name: 'Purple Pink', value: 'from-purple-500 to-pink-500' },
    { name: 'Blue Cyan', value: 'from-blue-500 to-cyan-500' },
    { name: 'Green Emerald', value: 'from-green-500 to-emerald-500' },
    { name: 'Orange Red', value: 'from-orange-500 to-red-500' },
    { name: 'Indigo Purple', value: 'from-indigo-500 to-purple-500' },
    { name: 'Teal Blue', value: 'from-teal-500 to-blue-500' }
  ];

  const members = [
    { name: 'Mom', email: 'mom@email.com', role: 'Admin', avatar: 'M' },
    { name: 'Dad', email: 'dad@email.com', role: 'Admin', avatar: 'D' },
    { name: 'Sarah', email: 'sarah@email.com', role: 'Member', avatar: 'S' },
    { name: 'Emma', email: 'emma@email.com', role: 'Member', avatar: 'E' },
    { name: 'Grandpa', email: 'grandpa@email.com', role: 'Member', avatar: 'G' }
  ];

  const tabs = [
    { id: 'general', label: 'General', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'notifications', label: 'Notifications', icon: Bell }
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
    gsap.to(containerRef.current, {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      onComplete: () => onViewChange('vault-detail', { vault: vaultData.name })
    });
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVaultData(prev => ({ ...prev, coverImage: e.target.files[0] }));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Vault Name</label>
              <input
                type="text"
                value={vaultData.name}
                onChange={(e) => setVaultData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Description</label>
              <textarea
                value={vaultData.description}
                onChange={(e) => setVaultData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Privacy Setting</label>
              <select
                value={vaultData.privacy}
                onChange={(e) => setVaultData(prev => ({ ...prev, privacy: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="private">Private - Invite only</option>
                <option value="family">Family - Family members can join</option>
                <option value="public">Public - Anyone can request to join</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Allow Comments</h3>
                  <p className="text-purple-300 text-sm">Let members comment on memories</p>
                </div>
                <button
                  onClick={() => setVaultData(prev => ({ ...prev, allowComments: !prev.allowComments }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    vaultData.allowComments ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      vaultData.allowComments ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Allow Downloads</h3>
                  <p className="text-purple-300 text-sm">Let members download memories</p>
                </div>
                <button
                  onClick={() => setVaultData(prev => ({ ...prev, allowDownloads: !prev.allowDownloads }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    vaultData.allowDownloads ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      vaultData.allowDownloads ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Auto Backup</h3>
                  <p className="text-purple-300 text-sm">Automatically backup memories to cloud</p>
                </div>
                <button
                  onClick={() => setVaultData(prev => ({ ...prev, autoBackup: !prev.autoBackup }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    vaultData.autoBackup ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      vaultData.autoBackup ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Cover Image</h3>
              <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300">
                <Upload className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                <h4 className="text-white text-lg font-semibold mb-2">
                  Upload New Cover Image
                </h4>
                <p className="text-purple-200 mb-4">
                  Choose a beautiful image to represent your vault
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
                {vaultData.coverImage && (
                  <p className="text-green-300 text-sm mt-2">
                    ✓ {vaultData.coverImage.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Color Theme</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.value}
                    type="button"
                    onClick={() => setVaultData(prev => ({ ...prev, theme: theme.value }))}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      vaultData.theme === theme.value
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className={`w-full h-8 bg-gradient-to-r ${theme.value} rounded mb-2`}></div>
                    <span className="text-white text-sm">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Preview</h3>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className={`w-full h-24 bg-gradient-to-r ${vaultData.theme} rounded-lg mb-3`}></div>
                <h4 className="text-white font-semibold">{vaultData.name}</h4>
                <p className="text-purple-200 text-sm">{vaultData.description}</p>
              </div>
            </div>
          </div>
        );

      case 'members':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-lg font-semibold">Vault Members</h3>
              <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                <Users className="w-4 h-4" />
                <span>Invite Members</span>
              </button>
            </div>

            <div className="space-y-3">
              {members.map((member, index) => (
                <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="text-white font-medium">{member.name}</p>
                      <p className="text-purple-300 text-sm">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <select
                      value={member.role}
                      className="bg-white/10 border border-white/20 rounded px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Member">Member</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                    <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-all duration-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">Invite New Members</h4>
              <div className="flex space-x-3">
                <input
                  type="email"
                  placeholder="Enter email address..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300">
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Privacy Settings</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-medium">Vault Visibility</h4>
                    <Eye className="w-5 h-5 text-purple-300" />
                  </div>
                  <p className="text-purple-300 text-sm mb-3">Control who can see and access your vault</p>
                  <select
                    value={vaultData.privacy}
                    onChange={(e) => setVaultData(prev => ({ ...prev, privacy: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="private">Private - Invite only</option>
                    <option value="family">Family - Family members can join</option>
                    <option value="public">Public - Anyone can request to join</option>
                  </select>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-medium mb-3">Member Permissions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm">Can upload memories</p>
                        <p className="text-purple-300 text-xs">Allow members to add new memories</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm">Can comment on memories</p>
                        <p className="text-purple-300 text-xs">Allow members to leave comments</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm">Can download memories</p>
                        <p className="text-purple-300 text-xs">Allow members to download files</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white text-sm">Can invite others</p>
                        <p className="text-purple-300 text-xs">Allow members to invite new people</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Email Notifications</h4>
                    <p className="text-purple-300 text-sm">Receive email updates about vault activity</p>
                  </div>
                  <button
                    onClick={() => setVaultData(prev => ({ ...prev, notifications: !prev.notifications }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      vaultData.notifications ? 'bg-purple-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        vaultData.notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="text-white font-medium mb-3">Email Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-200 text-sm">New memory uploads</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-200 text-sm">New comments</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-200 text-sm">New members joined</span>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-200 text-sm">Weekly digest</span>
                      <input type="checkbox" className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => onViewChange('vault-detail', { vault: vaultData.name })}
          className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Vault Settings</h1>
          <p className="text-purple-200">Manage settings for "{vaultData.name}"</p>
        </div>
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
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            {renderTabContent()}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-300">
              <Trash2 className="w-5 h-5" />
              <span>Delete Vault</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onViewChange('vault-detail', { vault: vaultData.name })}
                className="px-6 py-3 text-purple-300 hover:text-white transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVaultSettings;