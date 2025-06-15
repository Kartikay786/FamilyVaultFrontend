import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { 
  Users, 
  Plus, 
  Edit, 
  Heart,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Camera,
  Gift,
  Crown,
  Baby
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const FamilyTree = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const treeRef = useRef(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const navigate = useNavigate();

  const familyData = {
    grandparents: [
      {
        id: 1,
        name: "Robert Johnson",
        role: "Grandfather",
        avatar: "R",
        birth: "1945",
        location: "Chicago, IL",
        status: "alive",
        spouse: "Margaret Johnson",
        children: ["David Johnson"],
        memories: 45,
        relationship: "Married 1968"
      },
      {
        id: 2,
        name: "Margaret Johnson",
        role: "Grandmother",
        avatar: "M",
        birth: "1947",
        location: "Chicago, IL",
        status: "alive",
        spouse: "Robert Johnson",
        children: ["David Johnson"],
        memories: 52,
        relationship: "Married 1968"
      }
    ],
    parents: [
      {
        id: 3,
        name: "David Johnson",
        role: "Father",
        avatar: "D",
        birth: "1970",
        location: "Seattle, WA",
        status: "alive",
        spouse: "Linda Johnson",
        children: ["Sarah Johnson", "Emma Johnson"],
        memories: 234,
        relationship: "Married 1995"
      },
      {
        id: 4,
        name: "Linda Johnson",
        role: "Mother",
        avatar: "L",
        birth: "1972",
        location: "Seattle, WA",
        status: "alive",
        spouse: "David Johnson",
        children: ["Sarah Johnson", "Emma Johnson"],
        memories: 312,
        relationship: "Married 1995"
      }
    ],
    children: [
      {
        id: 5,
        name: "Sarah Johnson",
        role: "Daughter",
        avatar: "S",
        birth: "1998",
        location: "Portland, OR",
        status: "alive",
        spouse: null,
        children: [],
        memories: 156,
        relationship: "Single"
      },
      {
        id: 6,
        name: "Emma Johnson",
        role: "Daughter",
        avatar: "E",
        birth: "2002",
        location: "Seattle, WA",
        status: "alive",
        spouse: null,
        children: [],
        memories: 89,
        relationship: "Single"
      }
    ]
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Animate family tree nodes
      const nodes = treeRef.current?.querySelectorAll('.family-node');
      if (nodes) {
        gsap.fromTo(Array.from(nodes),
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
            delay: 0.3
          }
        );
      }

      // Animate connection lines
      const lines = treeRef.current?.querySelectorAll('.connection-line');
      if (lines) {
        gsap.fromTo(Array.from(lines),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.8
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    gsap.to('.family-node', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  };

  const getStatusIcon = (member) => {
    if (member.role.includes('Grand')) return <Crown className="w-4 h-4 text-yellow-400" />;
    if (member.role.includes('Father') || member.role.includes('Mother')) return <Heart className="w-4 h-4 text-red-400" />;
    return <Baby className="w-4 h-4 text-blue-400" />;
  };

  const renderFamilyMember = (member, position) => (
    <div
      key={member.id}
      onClick={() => handleMemberClick(member)}
      className={`family-node relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer ${position}`}
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
          {member.avatar}
        </div>
        <h3 className="text-white font-semibold mb-1">{member.name}</h3>
        <p className="text-purple-300 text-sm mb-2">{member.role}</p>
        <div className="flex items-center justify-center space-x-1 mb-2">
          {getStatusIcon(member)}
          <span className="text-purple-200 text-xs">Born {member.birth}</span>
        </div>
        <div className="flex items-center justify-center space-x-1">
          <Camera className="w-3 h-3 text-purple-300" />
          <span className="text-purple-300 text-xs">{member.memories} memories</span>
        </div>
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  return (
    <div ref={containerRef} className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Family Tree</h1>
          <p className="text-purple-200">Explore your family connections and relationships</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onViewChange('profile')}
            className="flex items-center space-x-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
          <button onClick={()=>navigate('/family/addMember')} className="flex cursor-pointer items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Plus className="w-5 h-5" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Family Tree Visualization */}
        <div className="lg:col-span-2">
          <div ref={treeRef} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 min-h-[600px]">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Johnson Family Tree</h2>
            
            {/* Grandparents Level */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-purple-200 mb-6 text-center">Grandparents</h3>
              <div className="flex justify-center space-x-8">
                {familyData.grandparents.map(member => renderFamilyMember(member, ''))}
              </div>
              {/* Connection line */}
              <div className="connection-line w-32 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 mb-4"></div>
              <div className="connection-line w-0.5 h-8 bg-gradient-to-b from-purple-500 to-pink-500 mx-auto"></div>
            </div>

            {/* Parents Level */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-purple-200 mb-6 text-center">Parents</h3>
              <div className="flex justify-center space-x-8">
                {familyData.parents.map(member => renderFamilyMember(member, ''))}
              </div>
              {/* Connection line */}
              <div className="connection-line w-32 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 mb-4"></div>
              <div className="connection-line w-0.5 h-8 bg-gradient-to-b from-purple-500 to-pink-500 mx-auto"></div>
            </div>

            {/* Children Level */}
            <div>
              <h3 className="text-lg font-semibold text-purple-200 mb-6 text-center">Children</h3>
              <div className="flex justify-center space-x-8">
                {familyData.children.map(member => renderFamilyMember(member, ''))}
              </div>
            </div>
          </div>
        </div>

        {/* Member Details Sidebar */}
        <div className="lg:col-span-1">
          {selectedMember ? (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {selectedMember.avatar}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{selectedMember.name}</h3>
                <p className="text-purple-300">{selectedMember.role}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-purple-300" />
                  <div>
                    <p className="text-white text-sm">Born</p>
                    <p className="text-purple-200 text-xs">{selectedMember.birth}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-purple-300" />
                  <div>
                    <p className="text-white text-sm">Location</p>
                    <p className="text-purple-200 text-xs">{selectedMember.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-purple-300" />
                  <div>
                    <p className="text-white text-sm">Relationship</p>
                    <p className="text-purple-200 text-xs">{selectedMember.relationship}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Camera className="w-5 h-5 text-purple-300" />
                  <div>
                    <p className="text-white text-sm">Memories</p>
                    <p className="text-purple-200 text-xs">{selectedMember.memories} shared memories</p>
                  </div>
                </div>

                {selectedMember.children.length > 0 && (
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-purple-300 mt-0.5" />
                    <div>
                      <p className="text-white text-sm">Children</p>
                      {selectedMember.children.map((child, index) => (
                        <p key={index} className="text-purple-200 text-xs">{child}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => onViewChange('profile', { member: selectedMember })}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <Edit className="w-4 h-4" />
                  <span>View Profile</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 bg-white/10 border border-white/20 text-white py-3 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <Camera className="w-4 h-4" />
                  <span>View Memories</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 bg-white/10 border border-white/20 text-white py-3 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <Mail className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <Users className="w-16 h-16 text-purple-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Select a Family Member</h3>
              <p className="text-purple-200 text-sm">
                Click on any family member in the tree to view their details and information.
              </p>
            </div>
          )}

          {/* Family Statistics */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Family Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-purple-200">Total Members</span>
                <span className="text-white font-semibold">6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Generations</span>
                <span className="text-white font-semibold">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Total Memories</span>
                <span className="text-white font-semibold">888</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Active Members</span>
                <span className="text-white font-semibold">6</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button onClick={()=>navigate('/family/addMember')} className="w-full flex items-center space-x-2 text-purple-200 hover:text-white hover:bg-white/10 py-2 px-3 rounded-lg transition-all duration-300">
                <Plus className="w-4 h-4" />
                <span>Add Family Member</span>
              </button>
              <button className="w-full flex items-center space-x-2 text-purple-200 hover:text-white hover:bg-white/10 py-2 px-3 rounded-lg transition-all duration-300">
                <Gift className="w-4 h-4" />
                <span>Plan Family Event</span>
              </button>
              <button
                onClick={() => onViewChange('legacy-access')}
                className="w-full flex items-center space-x-2 text-purple-200 hover:text-white hover:bg-white/10 py-2 px-3 rounded-lg transition-all duration-300"
              >
                <Crown className="w-4 h-4" />
                <span>Legacy Access</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyTree;