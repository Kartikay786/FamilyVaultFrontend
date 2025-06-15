import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  Users, 
  Heart, 
  Upload, 
  Clock, 
  TrendingUp, 
  Calendar,
  Camera,
  Video,
  Mic,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: 'Total Memories', value: '1,247', icon: Heart, color: 'from-pink-500 to-rose-500' },
    { label: 'Family Members', value: '12', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Vaults', value: '3', icon: Upload, color: 'from-purple-500 to-pink-500' },
    { label: 'This Month', value: '89', icon: TrendingUp, color: 'from-green-500 to-emerald-500' }
  ];

  const recentActivity = [
    { user: 'Mom', action: 'uploaded 5 photos', time: '2 hours ago', type: 'photo' },
    { user: 'Dad', action: 'added a voice note', time: '4 hours ago', type: 'audio' },
    { user: 'Sarah', action: 'created new vault', time: '1 day ago', type: 'vault' },
    { user: 'Grandpa', action: 'shared a video', time: '2 days ago', type: 'video' }
  ];

  const quickActions = [
    { label: 'Upload Memory', icon: Upload, path: '/family/uploadmemory', color: 'from-purple-600 to-pink-600' },
    { label: 'Create Vault', icon: Plus, path: '/family/createvault', color: 'from-blue-600 to-cyan-600' },
    { label: 'Family Tree', icon: Users, path: '/family/familytree', color: 'from-orange-600 to-red-600' },
    { label: 'Add Member', icon: Plus, path: '/family/addMember', color: 'from-green-600 to-emerald-600' },
  ];

  return (
    <div ref={containerRef} className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-purple-200">Welcome back! Here's what's happening with your family memories.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className={`w-full flex items-center space-x-4 p-4 bg-gradient-to-r ${action.color} rounded-xl text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
              >
                <action.icon className="w-6 h-6" />
                <span className="font-semibold">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            <button 
              onClick={() => onViewChange('recent-memories')}
              className="text-purple-300 hover:text-white transition-colors duration-300"
            >
              View All →
            </button>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            {recentActivity.map((activity, index) => (
              <div key={index} className="p-4 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    {activity.type === 'photo' && <Camera className="w-5 h-5 text-white" />}
                    {activity.type === 'video' && <Video className="w-5 h-5 text-white" />}
                    {activity.type === 'audio' && <Mic className="w-5 h-5 text-white" />}
                    {activity.type === 'vault' && <Plus className="w-5 h-5 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-purple-300 text-sm">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Memory Calendar Preview */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">This Month's Memories</h2>
          <button 
            onClick={() => onViewChange('memory-timeline')}
            className="text-purple-300 hover:text-white transition-colors duration-300"
          >
            View Timeline →
          </button>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-purple-300 text-sm font-medium py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 6;
              const hasMemory = Math.random() > 0.7;
              return (
                <div
                  key={i}
                  className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-300 ${
                    day > 0 && day <= 31
                      ? hasMemory
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white cursor-pointer hover:scale-110'
                        : 'text-purple-200 hover:bg-white/10 cursor-pointer'
                      : 'text-purple-400'
                  }`}
                >
                  {day > 0 && day <= 31 ? day : ''}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;