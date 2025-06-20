import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import {
    ArrowLeft,
    Edit,
    MessageCircle,
    Mail,
    Calendar,
    Heart,
    Camera,
    Video,
    Mic,
    Users,
    Shield,
    Crown,
    Baby,
    Plus
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { familProfileFunction } from '../../../Redux/Reducers/FamilyProfile.slice.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FamilyMember = ({ member, onViewChange }) => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    const { family, loading } = useSelector((state) => state.familyProfile);
    const [activeTab, setActiveTab] = useState('overview');
    const [familyData,setFamilyData] = useState({});
      const [statsdata,setStatsdata] = useState([]);

    useEffect(() => {
        const familyId = localStorage.getItem('familyId');
        const fetchProfile = async () => {
            const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/family/familyProfile/${familyId}`)
            // console.log(result);
            setFamilyData(result?.data?.family)
        }
        fetchProfile()
    }, [])

    console.log(familyData.member)
    const memberData = member || {
        id: 1,
        name: "David Johnson",
        role: "Father",
        avatar: "D",
        email: "david.johnson@email.com",
        phone: "+1 (555) 123-4567",
        birth: "March 15, 1970",
        location: "Seattle, WA",
        bio: "Loving father and husband. Enjoys photography and capturing family moments. Works as a software engineer and loves spending time outdoors with the family.",
        joinedDate: "January 2020",
        status: "active",
        lastActive: "2 hours ago",
        relationship: "Married to Linda Johnson",
        children: ["Sarah Johnson", "Emma Johnson"],
        parents: ["Robert Johnson", "Margaret Johnson"],
        spouse: "Linda Johnson",
        memories: {
            uploaded: 234,
            liked: 156,
            commented: 89,
            shared: 45
        },
        badges: [
            { name: "Family Historian", icon: "📚", description: "Uploaded 200+ memories" },
            { name: "Active Member", icon: "⭐", description: "Active for 4+ years" },
            { name: "Photo Master", icon: "📸", description: "Uploaded 100+ photos" }
        ],
        favoriteMemories: [
            {
                id: 1,
                title: "Christmas Morning 2024",
                thumbnail: "https://images.pexels.com/photos/1303098/pexels-photo-1303098.jpeg?auto=compress&cs=tinysrgb&w=300",
                type: "photo",
                date: "Dec 25, 2024"
            },
            {
                id: 2,
                title: "Family Vacation",
                thumbnail: "https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg?auto=compress&cs=tinysrgb&w=300",
                type: "video",
                date: "Jul 15, 2024"
            },
            {
                id: 3,
                title: "Birthday Celebration",
                thumbnail: "https://images.pexels.com/photos/1134204/pexels-photo-1134204.jpeg?auto=compress&cs=tinysrgb&w=300",
                type: "photo",
                date: "Mar 15, 2024"
            }
        ],
        recentActivity: [
            { action: "Uploaded 3 photos", memory: "Weekend BBQ", time: "2 hours ago", type: "upload" },
            { action: "Commented on", memory: "Kids Playing", time: "1 day ago", type: "comment" },
            { action: "Liked", memory: "Family Dinner", time: "2 days ago", type: "like" },
            { action: "Shared", memory: "Vacation Photos", time: "3 days ago", type: "share" },
            { action: "Created vault", memory: "Dad's Adventures", time: "1 week ago", type: "vault" }
        ],
        connections: [
            { name: "Linda Johnson", relation: "Spouse", avatar: "L", status: "active" },
            { name: "Sarah Johnson", relation: "Daughter", avatar: "S", status: "active" },
            { name: "Emma Johnson", relation: "Daughter", avatar: "E", status: "active" },
            { name: "Robert Johnson", relation: "Father", avatar: "R", status: "active" },
            { name: "Margaret Johnson", relation: "Mother", avatar: "M", status: "active" }
        ]
    };

    useEffect(()=>{
    const familyId = localStorage.getItem('familyId');

    const fetchStats = async () => {
      const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/family/allstats/${familyId}`);
      console.log(result.data);
      setStatsdata(result.data);
    }

    fetchStats()
  },[])

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Users },
        { id: 'connections', label: 'Members', icon: Heart },
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

    const getStatusIcon = (role) => {
        if (role.includes('Father') || role.includes('Mother')) return <Crown className="w-4 h-4 text-yellow-400" />;
        if (role.includes('Grand')) return <Shield className="w-4 h-4 text-purple-400" />;
        return <Baby className="w-4 h-4 text-blue-400" />;
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'video':
                return <Video className="w-4 h-4 text-purple-400" />;
            case 'audio':
                return <Mic className="w-4 h-4 text-green-400" />;
            default:
                return <Camera className="w-4 h-4 text-blue-400" />;
        }
    };



    const renderOverview = () => (
        <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-purple-300" />
                            <div>
                                <p className="text-white text-sm font-medium">Email</p>
                                <p className="text-purple-200 text-sm">{familyData.email}</p>
                            </div>
                        </div>
                        {/* <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-purple-300" />
                            <div>
                                <p className="text-white text-sm font-medium">Phone</p>
                                <p className="text-purple-200 text-sm">{familyData.number}</p>
                            </div>
                        </div> */}
                        <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-purple-300" />
                            <div>
                                <p className="text-white text-sm font-medium">Family Account Since </p>
                                <p className="text-purple-200 text-sm">{new Date(familyData.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <Users className="w-5 h-5 text-purple-300" />
                            <div>
                                <p className="text-white text-sm font-medium">Members</p>
                                <p className="text-purple-200 text-sm">{familyData.member?.length}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Heart className="w-5 h-5 text-purple-300" />
                            <div>
                                <p className="text-white text-sm font-medium">Relationship</p>
                                <p className="text-purple-200 text-sm">{memberData.relationship}</p>
                            </div>
                        </div>
                        {/* <div className="flex items-center space-x-3">
                            <Users className="w-5 h-5 text-purple-300" />
                            <div>
                                <p className="text-white text-sm font-medium">Member Since</p>
                                <p className="text-purple-200 text-sm">{memberData.joinedDate}</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Bio */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">About</h3>
                <p className="text-purple-200 leading-relaxed">{familyData.description}</p>
            </div>

            {/* Memory Statistics */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Family Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-1">{statsdata?.totalMemory}</div>
                        <div className="text-purple-200 text-sm">Memories</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-400 mb-1">{statsdata?.totalmember}</div>
                        <div className="text-purple-200 text-sm">Members</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-400 mb-1">{statsdata?.totalvault}</div>
                        <div className="text-purple-200 text-sm">Vault</div>
                    </div>

                </div>
            </div>
        </div>
    );

     const renderConnections = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-white mb-4">Family Connections</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {familyData.member.map((member) => (
                        <div
                            key={member._id}
                            onClick={() => onViewChange('member-details', { member: member })}
                            className="flex items-center space-x-4 bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer hover:transform hover:scale-105"
                        >
                            <div className="w-20 h-20 overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                {
                                    member.member?.profileImage ? (
                                        <img className='h-auto w-20 bg-cover bg-center scale-150' src={`${import.meta.env.VITE_BASE_URL}/images/${member.member.profileImage}`}/>
                                    ): ''
                                }
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-medium">{member.member.memberName}</h4>
                                <p className="text-purple-300 text-sm capitalize">{member.relation}</p>
                                <p className="text-purple-300 text-sm capitalize">{member.member.Dob}</p>
                                <p className="text-purple-300 text-sm ">{member.member.email}</p>
                                <p className="text-purple-300 text-sm capitalize">{member.member.phone}</p>
                                <p className="text-purple-300 text-sm capitalize">{member.role}</p>
                                <p className="text-purple-300 text-sm mt-2 ">{member.member.bio}</p>
                            </div>
                            <div className={`w-3 h-3 rounded-full ${'active' === 'active' ? 'bg-green-400' : 'bg-gray-400'
                                }`}></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Family Tree Preview */}
            {/* <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Family Tree Position</h3>
                    <button
                        onClick={() => onViewChange('family-tree')}
                        className="text-purple-300 hover:text-white text-sm transition-colors duration-300"
                    >
                        View Full Tree →
                    </button>
                </div>
                <div className="text-center">
                    <div className="inline-block bg-white/10 rounded-lg p-4 border border-white/20">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                            {memberData.avatar}
                        </div>
                        <h4 className="text-white font-medium">{memberData.name}</h4>
                        <p className="text-purple-300 text-sm">{memberData.role}</p>
                    </div>
                </div>
            </div> */}
        </div>
    );

    const renderMemories = () => (
        <div className="space-y-6">
                <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Favorite Memories</h3>
                <button className="text-purple-300 hover:text-white text-sm transition-colors duration-300">
                    View All →
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {memberData.favoriteMemories.map((memory) => (
                    <div
                        key={memory.id}
                        onClick={() => onViewChange('memory-details', { memory })}
                        className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
                    >
                        <div className="relative aspect-video overflow-hidden">
                            <img
                                src={memory.thumbnail}
                                alt={memory.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center">
                                {getTypeIcon(memory.type)}
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="text-white font-medium mb-1 truncate">{memory.title}</h4>
                            <p className="text-purple-300 text-sm">{memory.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload Statistics */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Upload Breakdown</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Camera className="w-4 h-4 text-blue-400" />
                            <span className="text-purple-200">Photos</span>
                        </div>
                        <span className="text-white font-semibold">156</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Video className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-200">Videos</span>
                        </div>
                        <span className="text-white font-semibold">67</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Mic className="w-4 h-4 text-green-400" />
                            <span className="text-purple-200">Audio</span>
                        </div>
                        <span className="text-white font-semibold">11</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );

   

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return renderOverview();
            case 'memories':
                return renderMemories();
            case 'connections':
                return renderConnections();
            default:
                return renderOverview();
        }
    };

    return (
        <div ref={containerRef} className="p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
                <button
                    onClick={() => navigate('/family/dashboard')}
                    className="p-2 text-purple-300 cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex-1">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                            {
                                familyData.profileImage ? (
                                    <img className='h-auto w-20 bg-center bg-cover' src={`${import.meta.env.VITE_BASE_URL}/images/${familyData.profileImage}`}/>
                                ) : ''
                            }
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-1">{familyData.familyName}</h1>
                            <div className="flex items-center space-x-3 text-purple-200">
                              
                                <span className={`w-2 h-2 rounded-full ${memberData.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                                    }`}></span>
                                <span>Last active {memberData.lastActive}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex items-center space-x-3">
                     <button
                        onClick={() => navigate('/family/addMember')}
                        className="flex items-center cursor-pointer space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Member</span>
                    </button>

                    <button
                        onClick={() => navigate('/family/setting')}
                        className="flex items-center cursor-pointer space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        <Edit className="w-4 h-4" />
                        <span>Edit Profile</span>
                    </button>
                    {/* <button className="p-3 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                        <MoreHorizontal className="w-5 h-5" />
                    </button> */}
                </div>
            </div>

            <div className="flex md:hidden mb-4 flex-wrap gap-2  items-center space-x-3">
                     <button
                        onClick={() => navigate('/family/addMember')}
                        className="flex items-center cursor-pointer space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Member</span>
                    </button>

                    <button
                        onClick={() => navigate('/family/setting')}
                        className="flex items-center cursor-pointer space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                    </button>
                    {/* <button className="p-3 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                        <MoreHorizontal className="w-5 h-5" />
                    </button> */}
                </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-8 bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 flex-1 justify-center ${activeTab === tab.id
                            ? 'bg-purple-600 text-white'
                            : 'text-purple-200 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        <tab.icon className="w-5 h-5" />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default FamilyMember;