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
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LogoutConfirm from '../../Pages/Website/Setting/LogoutConfrim';
import axios from 'axios';

const Navigation = ({ currentView, onViewChange, selectedVault, onLogout }) => {
  const navRef = useRef(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showDropdown, setShowDropdown] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const [logourPopupOpen, setLogoutPopupOpen] = useState(false);

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
        // console.log(result);
        localStorage.setItem('memberId',result?.data?.member?._id);
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
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      items: [
        { view: 'dashboard', label: 'Overview', path: '/family/dashboard', },
        { view: 'vault-overview', label: 'Vault Overview', path: '/family/vaultoverview', },
        { view: 'recent-memories', label: 'Recent Memories', path: '/family/recentMemory', }
      ]
    },
    {
      id: 'vault',
      label: 'Vault Management',
      icon: FolderOpen,
      items: [
        { view: 'create-vault', label: 'Create Vault', path: '/family/createvault', },
        { view: 'vault-detail', label: 'Vault Details', path: '/family/vaultdetail', },
        { view: 'edit-vault', label: 'Edit Settings', path: '/family/editvault', }
      ]
    },
    {
      id: 'memory',
      label: 'Memory Management',
      icon: Camera,
      items: [
        { view: 'upload-memory', label: 'Upload Memory', path: '/family/uploadmemory', },
        { view: 'memory-details', label: 'Memory Details', path: '/family/memorydetail', },
        { view: 'edit-memory', label: 'Edit Memory', path: '/family/editmemory', },
        { view: 'memory-timeline', label: 'Timeline', path: '/family/memorytimeline', },
        { view: 'memory-search', label: 'Search', path: '/family/memorysearch', }
      ]
    },
    {
      id: 'family',
      label: 'Family',
      icon: TreePine,
      items: [
        { view: 'family-tree', label: 'Family Tree', path: '/family/familytree' },
        { view: 'profile', label: 'Profile', path: '/family/familymember' },
        { view: 'legacy-access', label: 'Legacy Access', path: '/family/legacyacces' }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      items: [
        { view: 'settings', label: 'General Settings', path: '/family/setting' },
        { view: 'access-control', label: 'Access Control', path: '/family/accessControl' }
      ]
    }
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
                <h1 onClick={() => navigate('/')} className="text-xl cursor-pointer font-bold">Family Vault</h1>
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
                    {
                      tabs.map((tab) => (
                        <div key={tab.id} className="relative">
                          <button
                            onClick={() => { setShowDropdown(showDropdown === tab.id ? null : tab.id) }}
                            className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === tab.id
                              ? 'bg-white/20 text-white'
                              : 'text-purple-200 hover:text-white hover:bg-white/10'
                              }`}
                          >
                            <tab.icon className="w-5 h-5" />
                            <span className="text-sm">{tab.label}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showDropdown === tab.id ? 'rotate-180' : ''
                              }`} />
                          </button>

                          {/* Dropdown */}
                          {showDropdown === tab.id && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white/20 z-15 backdrop-blur-lg rounded-lg border border-white/20 shadow-xl">
                              {tab.items.map((item) => (
                                <button
                                  key={item.view}
                                  onClick={() => { handleNavClick(item.path) }}
                                  className={`w-full text-left px-4 py-3 text-sm transition-colors duration-300 first:rounded-t-lg last:rounded-b-lg ${currentView === item.view
                                    ? 'bg-purple-600/50 text-white'
                                    : 'text-purple-200 cursor-pointer hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                  {item.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    }
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
        <div className="lg:hidden border-t border-white/20">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-white/20 text-white border-b-2 border-purple-400'
                  : 'text-purple-200 hover:text-white hover:bg-white/10'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-xs whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {
        logourPopupOpen ? (
          <LogoutConfirm logourPopupOpen={logourPopupOpen} setLogoutPopupOpen={setLogoutPopupOpen} />
        ) : ''
      }
    </>
  );
};

export default Navigation;