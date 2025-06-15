import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { 
  ArrowLeft, 
  Shield, 
  Key, 
  Clock, 
  Users, 
  FileText, 
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

const LegacyAccess = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview');

  const legacyPlans = [
    {
      id: 1,
      name: "Family Memories Legacy",
      status: "active",
      trustees: ["David Johnson", "Linda Johnson"],
      beneficiaries: ["Sarah Johnson", "Emma Johnson"],
      triggerCondition: "Inactivity for 12 months",
      vaults: ["Johnson Family Memories", "Grandparents Stories"],
      createdDate: "January 15, 2024",
      lastUpdated: "March 10, 2024"
    },
    {
      id: 2,
      name: "Emergency Access Plan",
      status: "pending",
      trustees: ["Robert Johnson"],
      beneficiaries: ["All Family Members"],
      triggerCondition: "Manual activation",
      vaults: ["All Vaults"],
      createdDate: "February 20, 2024",
      lastUpdated: "February 20, 2024"
    }
  ];

  const trustedContacts = [
    {
      id: 1,
      name: "David Johnson",
      email: "david.johnson@email.com",
      role: "Primary Trustee",
      status: "verified",
      addedDate: "January 15, 2024"
    },
    {
      id: 2,
      name: "Linda Johnson",
      email: "linda.johnson@email.com",
      role: "Secondary Trustee",
      status: "verified",
      addedDate: "January 15, 2024"
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@email.com",
      role: "Emergency Contact",
      status: "pending",
      addedDate: "February 20, 2024"
    }
  ];

  const accessLogs = [
    { action: "Legacy plan created", user: "Sarah Johnson", date: "March 10, 2024", status: "success" },
    { action: "Trustee verification sent", user: "System", date: "March 9, 2024", status: "pending" },
    { action: "Emergency contact added", user: "Sarah Johnson", date: "February 20, 2024", status: "success" },
    { action: "Legacy plan activated", user: "Sarah Johnson", date: "January 15, 2024", status: "success" }
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'verified':
      case 'success':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'inactive':
      case 'error':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
      case 'verified':
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'inactive':
      case 'error':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Active Plans</h3>
              <p className="text-green-400 text-2xl font-bold">1</p>
            </div>
          </div>
          <p className="text-purple-200 text-sm">Your legacy plans are active and monitoring</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Trusted Contacts</h3>
              <p className="text-blue-400 text-2xl font-bold">3</p>
            </div>
          </div>
          <p className="text-purple-200 text-sm">People who can access your memories</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Protected Vaults</h3>
              <p className="text-purple-400 text-2xl font-bold">3</p>
            </div>
          </div>
          <p className="text-purple-200 text-sm">Vaults covered by legacy plans</p>
        </div>
      </div>

      {/* Legacy Plans */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Legacy Plans</h3>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
            <Plus className="w-4 h-4" />
            <span>Create Plan</span>
          </button>
        </div>

        <div className="space-y-4">
          {legacyPlans.map((plan) => (
            <div key={plan.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-semibold">{plan.name}</h4>
                    <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(plan.status)}`}>
                      {getStatusIcon(plan.status)}
                      <span className="capitalize">{plan.status}</span>
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-purple-300">Trustees:</p>
                      <p className="text-white">{plan.trustees.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-purple-300">Trigger:</p>
                      <p className="text-white">{plan.triggerCondition}</p>
                    </div>
                    <div>
                      <p className="text-purple-300">Vaults:</p>
                      <p className="text-white">{plan.vaults.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-purple-300">Last Updated:</p>
                      <p className="text-white">{plan.lastUpdated}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrustedContacts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Trusted Contacts</h3>
          <p className="text-purple-200">People who can access your memories in case of emergency</p>
        </div>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
          <Plus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="space-y-4">
          {trustedContacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{contact.name}</h4>
                  <p className="text-purple-300 text-sm">{contact.email}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-purple-200 text-xs">{contact.role}</span>
                    <span className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(contact.status)}`}>
                      {getStatusIcon(contact.status)}
                      <span className="capitalize">{contact.status}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAccessLogs = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Access Logs</h3>
        <p className="text-purple-200">Track all legacy access activities and changes</p>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="space-y-3">
          {accessLogs.map((log, index) => (
            <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(log.status)}`}>
                  {getStatusIcon(log.status)}
                </div>
                <div>
                  <p className="text-white font-medium">{log.action}</p>
                  <p className="text-purple-300 text-sm">by {log.user}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-purple-200 text-sm">{log.date}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getStatusColor(log.status)}`}>
                  <span className="capitalize">{log.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'contacts', label: 'Trusted Contacts', icon: Users },
    { id: 'logs', label: 'Access Logs', icon: FileText }
  ];

  return (
    <div ref={containerRef} className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => onViewChange('family-tree')}
          className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Legacy Access</h1>
          <p className="text-purple-200">Ensure your family memories are preserved and accessible for future generations</p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-amber-400 font-semibold mb-2">Important Information</h3>
            <p className="text-amber-200 text-sm leading-relaxed">
              Legacy Access ensures your family memories remain accessible even if something happens to you. 
              Set up trusted contacts who can access your vaults under specific conditions. This feature helps 
              preserve your family's digital heritage for future generations.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 flex-1 justify-center ${
              activeTab === tab.id
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'contacts' && renderTrustedContacts()}
        {activeTab === 'logs' && renderAccessLogs()}
      </div>
    </div>
  );
};

export default LegacyAccess;