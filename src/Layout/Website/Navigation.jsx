import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  Heart,
  Home,
  Settings,
  Users,
  FolderOpen,
  Camera,
  TreePine,
  ChevronDown,
  LogOut,
  User2,
  Vault,
  Wallet
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LogoutConfirm from '../../Pages/Website/Setting/LogoutConfrim';
import axios from 'axios';
import Uploadmemory from '../../Pages/Website/MemoryMgmt/UploadMemory';

const Navigation = ({ currentView, onViewChange, selectedVault, onLogout }) => {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showDropdown, setShowDropdown] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);
  const [addMemoryPopupOpen, setAddMemoryPopupOpen] = useState(false);
  const loginType = localStorage.getItem('loginType');
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);


  useEffect(() => {
    const familyId = localStorage.getItem('familyId');
    familyId ? setLoggedIn(true) : setLoggedIn(false)
  })

  useEffect(() => {
    const loginType = localStorage.getItem('loginType');
    const loginemail = localStorage.getItem('loginByEmail');
    const familyId = localStorage.getItem('familyId');

    const fetchMemberData = async () => {
      try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/member/findMemberByEmailandFamilyId/${familyId}/${loginemail}`);
        console.log(result);
        localStorage.setItem('memberId', result?.data?.member?._id);
      }
      catch (err) {
        console.log(err);
      }
    }

    if (loginType === 'Member') {
      fetchMemberData();
    }

  }, [])

  const tabs = [
    {
      id: 'memory',
      label: 'Memory Management',
      icon: Camera,
      items: [
        { view: 'upload-memory', label: 'Upload Memory', open: true, },
        { view: 'All Media', label: 'All Memories', path: '/family/memorysearch', },
        { view: 'memory-timeline', label: 'Timeline', path: '/family/memorytimeline', },
      ]
    },
    // {
    //   id: 'family',
    //   label: 'Family',
    //   icon: TreePine,
    //   items: [
    //     { view: 'family-tree', label: 'Family Tree', path: '/family/familytree' },
    //     { view: 'profile', label: 'Profile', path: '/family/familymember' },
    //     // { view: 'legacy-access', label: 'Legacy Access', path: '/family/legacyacces' }
    //   ]
    // },
    // {
    //   id: 'settings',
    //   label: 'Settings',
    //   icon: Settings,
    //   items: [
    //     { view: 'settings', label: 'General Settings', path: '/family/setting' },
    //     { view: 'access-control', label: 'Access Control', path: '/family/accessControl' }
    //   ]
    // }
  ];

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    // Update active tab based on current view
    const tab = tabs.find(tab =>
      tab.items.some(item => item.view === currentView)
    );
    if (tab) {
      setActiveTab(tab.id);
    }
  }, [currentView]);

  const handleNavClick = (path) => {
    gsap.to(navRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      // onComplete: () => onViewChange(view, data)
    });
    navigate(path)
    setShowDropdown(null);
  };

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-white">
                <h1 onClick={() => navigate('/')} className="text-xl cursor-pointer font-bold">Yaadon Ka Pitara</h1>
                {selectedVault && (
                  <p className="text-sm text-purple-200">{selectedVault}</p>
                )}
              </div>
            </div>

            {/* Navigation Tabs */}
            {
              loggedIn ? (
                <>

                  <div className="hidden lg:flex items-center space-x-1">

                    <div className="relative">
                      <button
                        onClick={() => { navigate('/family/dashboard'); setActiveTab('Dashboard') }}
                        className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'dashboard'
                          ? 'bg-white/20 text-white'
                          : 'text-purple-200 hover:text-white hover:bg-white/10'
                          }`}
                      >
                        <Home className="w-5 h-5" />
                        <span className="text-sm">Dashboard</span>
                      </button>

                    </div>

                    <div className="relative">
                      <button
                        onClick={() => { navigate('/family/vaultoverview'); setActiveTab('Vault Management') }}
                        className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'Vault Management'
                          ? 'bg-white/20 text-white'
                          : 'text-purple-200 hover:text-white hover:bg-white/10'
                          }`}
                      >
                        <Wallet className="w-5 h-5" />
                        <span className="text-sm">Vault Management</span>
                      </button>

                    </div>


                    <div className="relative">
                      <button
                        onClick={() => { setShowDropdown(!showDropdown) }}
                        className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'Memory Management'
                          ? 'bg-white/20 text-white'
                          : 'text-purple-200 hover:text-white hover:bg-white/10'
                          }`}
                      >
                        <Camera className="w-5 h-5" />
                        <span className="text-sm">Memory Management</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showDropdown === true ? 'rotate-180' : ''
                          }`} />
                      </button>

                      {/* Dropdown */}
                      {showDropdown && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white/20 z-15 backdrop-blur-lg rounded-lg border border-white/20 shadow-xl">


                          <button
                            onClick={() => { setAddMemoryPopupOpen(true); setShowDropdown(!showDropdown) }}
                            className={`w-full text-left px-4 py-3 text-sm transition-colors duration-300 first:rounded-t-lg last:rounded-b-lg ${currentView === 'upload-memory'
                              ? 'bg-purple-600/50 text-white'
                              : 'text-purple-200 cursor-pointer hover:text-white hover:bg-white/10'
                              }`}
                          >
                            Upload Memory
                          </button>

                          <button
                            onClick={() => { navigate('/family/memorysearch'); setShowDropdown(!showDropdown) }}
                            className={`w-full text-left px-4 py-3 text-sm transition-colors duration-300 first:rounded-t-lg last:rounded-b-lg ${currentView === 'All Media'
                              ? 'bg-purple-600/50 text-white'
                              : 'text-purple-200 cursor-pointer hover:text-white hover:bg-white/10'
                              }`}
                          >
                            All Memories
                          </button>

                          <button
                            onClick={() => { navigate('/family/memorytimeline'); setShowDropdown(!showDropdown) }}
                            className={`w-full text-left px-4 py-3 text-sm transition-colors duration-300 first:rounded-t-lg last:rounded-b-lg ${currentView === 'memory-timeline'
                              ? 'bg-purple-600/50 text-white'
                              : 'text-purple-200 cursor-pointer hover:text-white hover:bg-white/10'
                              }`}
                          >
                            Timeline
                          </button>

                        </div>
                      )}
                    </div>


                    <div className="relative">
                      <button
                        onClick={() => { navigate('/family/familymember'); setActiveTab('Family') }}
                        className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'Family'
                          ? 'bg-white/20 text-white'
                          : 'text-purple-200 hover:text-white hover:bg-white/10'
                          }`}
                      >
                        <User2 className="w-5 h-5" />
                        <span className="text-sm">Family</span>
                      </button>

                    </div>

                    <div className="relative">
                      <button
                        onClick={() => { navigate('/family/setting'); setActiveTab('Settings') }}
                        className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'Settings'
                          ? 'bg-white/20 text-white'
                          : 'text-purple-200 hover:text-white hover:bg-white/10'
                          }`}
                      >
                        <Settings className="w-5 h-5" />
                        <span className="text-sm">Settings</span>
                      </button>

                    </div>
                  </div>


                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setLogoutPopupOpen(true)}
                      className="p-2 text-purple-200 cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) :
                (
                  <button onClick={() => navigate('/auth/login')}
                    type="submit"
                    className="px-6 cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Sign In
                  </button>
                )
            }

          </div>
        </div>

        {/* Mobile Navigation */}

        {
          loggedIn ? (
            <div className="lg:hidden border-t border-white/20">
              <div className="flex overflow-x-auto">


                <div className="relative">
                  <button
                    onClick={() => { navigate('/family/dashboard'); setActiveTab('Dashboard') }}
                    className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'Dashboard'
                      ? 'bg-white/20 text-white'
                      : 'text-purple-200 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <Home className="w-5 h-5" />
                    <span className="text-sm">Dashboard</span>
                  </button>

                </div>

                <div className="relative">
                  <button
                    onClick={() => { navigate('/family/vaultoverview'); setActiveTab('VaultManagement') }}
                    className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'VaultManagement'
                      ? 'bg-white/20 text-white'
                      : 'text-purple-200 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <Wallet className="w-5 h-5" />
                    <span className="text-sm w-32">Vault Management</span>
                  </button>

                </div>

                <div className="relative">

                  <button
                    onClick={() => { setAddMemoryPopupOpen(true); setShowDropdown(!showDropdown) }}
                    className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'UploadMemory'
                      ? 'bg-white/20 text-white'
                      : 'text-purple-200 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <Camera className="w-5 h-auto" />
                    <span className="text-sm w-28">Upload Memory</span>
                  </button>

                </div>


                <div className="relative">
                  <button
                    onClick={() => { navigate('/family/memorysearch'); setActiveTab('Memories') }}
                    className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'Memories'
                      ? 'bg-white/20 text-white'
                      : 'text-purple-200 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <Camera className="w-5 h-auto" />
                    <span className="text-sm w-24">All Memories</span>
                  </button>

                </div>

                <div className="relative">
                  <button
                    onClick={() => { navigate('/family/memorytimeline'); setActiveTab('Timeline') }}
                    className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'Timeline'
                      ? 'bg-white/20 text-white'
                      : 'text-purple-200 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <Camera className="w-5 h-auto" />
                    <span className="text-sm w-32">Memory Timeline</span>
                  </button>
                </div>

                <div className="relative">
                  <button
                    onClick={() => { navigate('/family/familymember'); setActiveTab('Family') }}
                    className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'Family'
                      ? 'bg-white/20 text-white'
                      : 'text-purple-200 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <User2 className="w-5 h-5" />
                    <span className="text-sm">Family</span>
                  </button>

                </div>

                <div className="relative">
                  <button
                    onClick={() => { navigate('/family/setting'); setActiveTab('Settings') }}
                    className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'Settings'
                      ? 'bg-white/20 text-white'
                      : 'text-purple-200 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="text-sm">Settings</span>
                  </button>

                </div>
              </div>
            </div>
          ) : ''
        }



      </nav>

      {
        logoutPopupOpen ? (
          <LogoutConfirm logourPopupOpen={logoutPopupOpen} setLogoutPopupOpen={setLogoutPopupOpen} />
        ) : ''
      }

      {
        addMemoryPopupOpen ? (
          <Uploadmemory openPopup={addMemoryPopupOpen} setAddMemoryPopupOpen={setAddMemoryPopupOpen} />
        ) : ''
      }
    </>
  );
};

export default Navigation;