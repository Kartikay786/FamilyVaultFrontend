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
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const EditVaultSettings = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const { vaultId } = useParams();
  const [activeTab, setActiveTab] = useState('general');
  const naivgate = useNavigate();
  const [vaultData, setVaultData] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);


  useEffect(() => {

    const fetchVault = async () => {
      try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/vault/vaultbyId/${vaultId}`);
        setVaultData(result?.data?.vault);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchVault();
  }, [])

  console.log(vaultData)

  const themes = [
    { name: 'Purple Pink', value: 'from-purple-500 to-pink-500' },
    { name: 'Blue Cyan', value: 'from-blue-500 to-cyan-500' },
    { name: 'Green Emerald', value: 'from-green-500 to-emerald-500' },
    { name: 'Orange Red', value: 'from-orange-500 to-red-500' },
    { name: 'Indigo Purple', value: 'from-indigo-500 to-purple-500' },
    { name: 'Teal Blue', value: 'from-teal-500 to-blue-500' }
  ];

  const tabs = [
    { id: 'general', label: 'General', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'members', label: 'Members', icon: Users },
    // { id: 'privacy', label: 'Privacy', icon: Eye },
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));  // set preview
      setProfileImage(file);  // this is your existing state
    }
  };



  const handleEditvault = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('vaultName', vaultData.vaultName);
    formdata.append('description', vaultData.description);
    formdata.append('privacy', vaultData.privacy);
    formdata.append('theme', vaultData.theme);
    formdata.append('profileImage', profileImage);


    try {
      const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/vault/editVault/${vaultId}`, formdata);

      toast.success('Vault Edited');
      naivgate(`/family/vaultdetail/${vaultData._id}`)
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data?.message)
    }

  }

  const deleteMember = async (id) => {
    try {
      const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/vault/deleteMemberToVault/${vaultId}/${id}`);

      toast.success('Member delted from vault');
      naivgate(`/family/vaultdetail/${vaultData._id}`)
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data?.message)
    }
  }


  const deleteVault = async (id) => {
    const familyId = localStorage.getItem('familyId');
    try {
      const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/vault/deleteVault/${vaultId}/${familyId}`);

      toast.success('vault deleted');
      naivgate(`/family/vaultoverview`)
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data?.message)
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Vault Name</label>
              <input
                type="text"
                name='vaultName'
                value={vaultData.vaultName}
                disabled
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
                <option value="Private">Private - Invite only</option>
                <option value="Public">Public - Anyone can request to join</option>
              </select>
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

            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Color Theme</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.value}
                    type="button"
                    onClick={() => setVaultData(prev => ({ ...prev, theme: theme.value }))}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${vaultData.theme === theme.value
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
                <h4 className="text-white font-semibold">{vaultData.vaultName}</h4>
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
              {/* <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
                <Users className="w-4 h-4" />
                <span>Invite Members</span>
              </button> */}
            </div>

            <div className="flex items-center justify-between bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {
                    vaultData.createdBy?.profileImage ? (
                      <img className='h-auto w-12 bg-cover bg-center scale-150' src={`${import.meta.env.VITE_BASE_URL}/images/${vaultData.createdBy?.profileImage}`} />
                    ) : ''
                  }
                </div>
                <div>
                  <p className="text-white font-medium">{vaultData.createdBy.memberName}</p>
                  <p className="text-purple-300 text-sm">{vaultData.createdBy.email}</p>
                </div>
              </div>

            </div>

            <div className="space-y-3">
              {vaultData.vaultMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {
                        member?.profileImage ? (
                          <img className='h-auto w-12 bg-cover bg-center scale-150' src={`${import.meta.env.VITE_BASE_URL}/images/${member?.profileImage}`} />
                        ) : ''
                      }
                    </div>
                    <div>
                      <p className="text-white font-medium">{member.memberName}</p>
                      <p className="text-purple-300 text-sm">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">

                    <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-all duration-300">
                      <Trash2 onClick={() => deleteMember(member._id)} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* <div>
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
            </div> */}
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


      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => naivgate(`/family/vaultdetail/${vaultData._id}`)}
          className="p-2 cursor-pointer text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Vault Settings</h1>
          <p className="text-purple-200">Manage settings for "{vaultData.vaultName}"</p>
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
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            {renderTabContent()}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button onClick={deleteVault} className="flex cursor-pointer items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-300">
              <Trash2 className="w-5 h-5" />
              <span>Delete Vault</span>
            </button>

            <div className="flex items-center space-x-4">

              <button
                onClick={handleEditvault}
                className="flex items-center cursor-pointer space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
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