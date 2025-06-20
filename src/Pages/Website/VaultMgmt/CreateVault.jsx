import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, Upload, Palette, Users, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateVault = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const familyId = localStorage.getItem('familyId');
  const memberId = localStorage.getItem('memberId');
  const [vaultName, setVaultName] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [theme, setTheme] = useState('from-purple-500 to-pink-500');
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);


  const [vaultData, setVaultData] = useState({
    name: '',
    description: '',
    profileImage: null,
    theme: 'from-purple-500 to-pink-500',
    privacy: 'private',
    inviteEmails: ''
  });

  console.log(theme.theme);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('vaultName', vaultName);
    formData.append('description', description);
    formData.append('profileImage', profileImage);
    formData.append('privacy', privacy);
    formData.append('theme', theme.theme);
    formData.append('familyId', familyId);
    formData.append('createdBy', memberId);

    console.log(formData);
    setLoading(true);
    try {
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/vault/createVault`, formData);
      console.log(result);
      toast.success('Vault Created Successfully.', {
        position: 'top-center'
      });
      navigate('/family/vaultoverview')
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        position: 'top-center'
      });
    }
    finally {
      setLoading(false)
      setVaultName('');
      setPreviewImage('');
      setDescription('');
      setPrivacy('');
      setProfileImage(null);
      setTheme('');
    }
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));  // set preview
      setProfileImage(file);  // this is your existing state
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
                    value={vaultName}
                    onChange={(e) => setVaultName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter vault name..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="Describe your vault..."
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Privacy Setting</label>
                  <select
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Private">Private - Vault members </option>
                    <option value="Public">Public - All Family Members can View</option>
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

          {/* Right Column */}
          <div className="space-y-6">
            {/* Theme Selection */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Choose Theme</span>
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {themes.map((theem) => (
                  <button
                    key={theem.value}
                    type="button"
                    onClick={() => setTheme(prev => ({ ...prev, theme: theem.value }))}
                    className={`p-4 rounded-lg cursor-pointer border-2 transition-all duration-300 ${theme === theem.value
                      ? 'border-white bg-white/10'
                      : 'border-white/20 hover:border-white/40'
                      }`}
                  >
                    <div className={`w-full h-8 bg-gradient-to-r ${theem.value} rounded mb-2`}></div>
                    <span className="text-white text-sm">{theem.name}</span>
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
                <div className={`w-full h-24 bg-gradient-to-r ${theme.theme} rounded-lg mb-3`}></div>
                <h3 className="text-white font-semibold">
                  {vaultName || 'Vault Name'}
                </h3>
                <p className="text-purple-200 text-sm">
                  {description || 'Vault description will appear here...'}
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
            className="px-6 py-3 cursor-pointer text-purple-300 hover:text-white transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex cursor-pointer items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {
              loading ? 'Creating...' : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Create Vault</span>
                </>
              )
            }

          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateVault;