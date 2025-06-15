import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, Upload, Palette, Users, Save } from 'lucide-react';

const CreateVault = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const [vaultData, setVaultData] = useState({
    name: '',
    description: '',
    coverImage: null,
    theme: 'from-purple-500 to-pink-500',
    privacy: 'private',
    inviteEmails: ''
  });

  const themes = [
    { name: 'Purple Pink', value: 'from-purple-500 to-pink-500' },
    { name: 'Blue Cyan', value: 'from-blue-500 to-cyan-500' },
    { name: 'Green Emerald', value: 'from-green-500 to-emerald-500' },
    { name: 'Orange Red', value: 'from-orange-500 to-red-500' },
    { name: 'Indigo Purple', value: 'from-indigo-500 to-purple-500' },
    { name: 'Teal Blue', value: 'from-teal-500 to-blue-500' }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate vault creation
    gsap.to(containerRef.current, {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      onComplete: () => onViewChange('vault-overview')
    });
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVaultData(prev => ({ ...prev, coverImage: e.target.files[0] }));
    }
  };

  return (
    <div ref={containerRef} className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => onViewChange('vault-overview')}
          className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Create New Vault</h1>
          <p className="text-purple-200">Set up a new family memory vault</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Vault Name</label>
                  <input
                    type="text"
                    value={vaultData.name}
                    onChange={(e) => setVaultData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter vault name..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={vaultData.description}
                    onChange={(e) => setVaultData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="Describe your vault..."
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
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Cover Image</h2>
              
              <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300">
                <Upload className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2">
                  Upload Cover Image
                </h3>
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
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Theme Selection */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Choose Theme</span>
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
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

            {/* Invite Members */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Invite Members</span>
              </h2>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email Addresses (comma separated)
                </label>
                <textarea
                  value={vaultData.inviteEmails}
                  onChange={(e) => setVaultData(prev => ({ ...prev, inviteEmails: e.target.value }))}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="mom@email.com, dad@email.com, sister@email.com..."
                />
                <p className="text-purple-300 text-xs mt-2">
                  Members will receive an invitation email to join your vault
                </p>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Preview</h2>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className={`w-full h-24 bg-gradient-to-r ${vaultData.theme} rounded-lg mb-3`}></div>
                <h3 className="text-white font-semibold">
                  {vaultData.name || 'Vault Name'}
                </h3>
                <p className="text-purple-200 text-sm">
                  {vaultData.description || 'Vault description will appear here...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/20">
          <button
            type="button"
            onClick={() => onViewChange('vault-overview')}
            className="px-6 py-3 text-purple-300 hover:text-white transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Save className="w-5 h-5" />
            <span>Create Vault</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVault;