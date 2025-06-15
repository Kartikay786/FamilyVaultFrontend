import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { 
  ArrowLeft, 
  Shield, 
  Users, 
  Key, 
  Eye, 
  EyeOff,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Clock,
  AlertTriangle,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

const AccessControl = ({ onViewChange }) => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('permissions');

  const familyMembers = [
    {
      id: 1,
      name: "David Johnson",
      email: "david.johnson@email.com",
      role: "Admin",
      avatar: "D",
      status: "active",
      lastLogin: "2 hours ago",
      permissions: {
        viewMemories: true,
        uploadMemories: true,
        editMemories: true,
        deleteMemories: true,
        manageVaults: true,
        inviteMembers: true,
        manageSettings: true
      }
    },
    {
      id: 2,
      name: "Linda Johnson",
      email: "linda.johnson@email.com",
      role: "Admin",
      avatar: "L",
      status: "active",
      lastLogin: "1 day ago",
      permissions: {
        viewMemories: true,
        uploadMemories: true,
        editMemories: true,
        deleteMemories: true,
        manageVaults: true,
        inviteMembers: true,
        manageSettings: true
      }
    },
    {
      id: 3,
      name: "Emma Johnson",
      email: "emma.johnson@email.com",
      role: "Member",
      avatar: "E",
      status: "active",
      lastLogin: "3 hours ago",
      permissions: {
        viewMemories: true,
        uploadMemories: true,
        editMemories: false,
        deleteMemories: false,
        manageVaults: false,
        inviteMembers: false,
        manageSettings: false
      }
    },
    {
      id: 4,
      name: "Robert Johnson",
      email: "robert.johnson@email.com",
      role: "Viewer",
      avatar: "R",
      status: "inactive",
      lastLogin: "1 week ago",
      permissions: {
        viewMemories: true,
        uploadMemories: false,
        editMemories: false,
        deleteMemories: false,
        manageVaults: false,
        inviteMembers: false,
        manageSettings: false
      }
    }
  ];

  const accessLogs = [
    { user: "Emma Johnson", action: "Uploaded 3 photos", timestamp: "2 hours ago", ip: "192.168.1.105", status: "success" },
    { user: "David Johnson", action: "Created new vault", timestamp: "1 day ago", ip: "192.168.1.102", status: "success" },
    { user: "Unknown User", action: "Failed login attempt", timestamp: "2 days ago", ip: "203.0.113.45", status: "failed" },
    { user: "Linda Johnson", action: "Modified vault settings", timestamp: "3 days ago", ip: "192.168.1.103", status: "success" },
    { user: "Emma Johnson", action: "Downloaded memory", timestamp: "1 week ago", ip: "192.168.1.105", status: "success" }
  ];

  const securitySettings = {
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginNotifications: true,
    suspiciousActivityAlerts: true,
    ipWhitelist: false,
    deviceTracking: true
  };

  const tabs = [
    { id: 'permissions', label: 'Permissions', icon: Shield },
    { id: 'members', label: 'Family Members', icon: Users },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'logs', label: 'Access Logs', icon: Clock }
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
      case 'success':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'inactive':
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'failed':
      case 'blocked':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin':
        return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'Member':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'Viewer':
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
      default:
        return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
    }
  };

  const renderPermissions = () => (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Role-Based Permissions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left text-white font-medium py-3">Permission</th>
                <th className="text-center text-white font-medium py-3">Admin</th>
                <th className="text-center text-white font-medium py-3">Member</th>
                <th className="text-center text-white font-medium py-3">Viewer</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: 'viewMemories', label: 'View Memories' },
                { key: 'uploadMemories', label: 'Upload Memories' },
                { key: 'editMemories', label: 'Edit Memories' },
                { key: 'deleteMemories', label: 'Delete Memories' },
                { key: 'manageVaults', label: 'Manage Vaults' },
                { key: 'inviteMembers', label: 'Invite Members' },
                { key: 'manageSettings', label: 'Manage Settings' }
              ].map((permission) => (
                <tr key={permission.key} className="border-b border-white/10">
                  <td className="text-purple-200 py-3">{permission.label}</td>
                  <td className="text-center py-3">
                    <div className="flex justify-center">
                      <UserCheck className="w-5 h-5 text-green-400" />
                    </div>
                  </td>
                  <td className="text-center py-3">
                    <div className="flex justify-center">
                      {['viewMemories', 'uploadMemories'].includes(permission.key) ? (
                        <UserCheck className="w-5 h-5 text-green-400" />
                      ) : (
                        <UserX className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  </td>
                  <td className="text-center py-3">
                    <div className="flex justify-center">
                      {permission.key === 'viewMemories' ? (
                        <UserCheck className="w-5 h-5 text-green-400" />
                      ) : (
                        <UserX className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Custom Permissions</h3>
        <p className="text-purple-200 mb-4">Create custom permission sets for specific family members</p>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
          <Plus className="w-4 h-4" />
          <span>Create Custom Role</span>
        </button>
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Family Members</h3>
          <p className="text-purple-200">Manage access and permissions for family members</p>
        </div>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300">
          <Plus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="space-y-4">
          {familyMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  {member.avatar}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{member.name}</h4>
                  <p className="text-purple-300 text-sm">{member.email}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getRoleColor(member.role)}`}>
                      {member.role}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                    <span className="text-purple-200 text-xs">Last login: {member.lastLogin}</span>
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

  const renderSecurity = () => (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Authentication Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Two-Factor Authentication</h4>
              <p className="text-purple-300 text-sm">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${securitySettings.twoFactorAuth ? 'text-green-400' : 'text-red-400'}`}>
                {securitySettings.twoFactorAuth ? 'Enabled' : 'Disabled'}
              </span>
              {securitySettings.twoFactorAuth ? <Lock className="w-4 h-4 text-green-400" /> : <Unlock className="w-4 h-4 text-red-400" />}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Session Timeout</h4>
              <p className="text-purple-300 text-sm">Automatically log out after inactivity</p>
            </div>
            <select className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="15">15 minutes</option>
              <option value="30" selected>30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Password Expiry</h4>
              <p className="text-purple-300 text-sm">Require password change every</p>
            </div>
            <select className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90" selected>90 days</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Security Monitoring</h3>
        <div className="space-y-4">
          {[
            { key: 'loginNotifications', label: 'Login Notifications', desc: 'Get notified of new login attempts' },
            { key: 'suspiciousActivityAlerts', label: 'Suspicious Activity Alerts', desc: 'Alert on unusual account activity' },
            { key: 'deviceTracking', label: 'Device Tracking', desc: 'Track and manage logged-in devices' },
            { key: 'ipWhitelist', label: 'IP Whitelist', desc: 'Only allow access from specific IP addresses' }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">{setting.label}</h4>
                <p className="text-purple-300 text-sm">{setting.desc}</p>
              </div>
              <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings[setting.key] ? 'bg-purple-600' : 'bg-gray-600'
              }`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  securitySettings[setting.key] ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-amber-400 font-semibold mb-2">Security Recommendations</h3>
            <ul className="text-amber-200 text-sm space-y-1">
              <li>• Enable two-factor authentication for all admin accounts</li>
              <li>• Use strong, unique passwords for each family member</li>
              <li>• Regularly review access logs for suspicious activity</li>
              <li>• Keep family member permissions up to date</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Access Logs</h3>
        <p className="text-purple-200">Monitor all access and activity in your family vaults</p>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="space-y-3">
          {accessLogs.map((log, index) => (
            <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(log.status)}`}>
                  {log.status === 'success' ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-white font-medium">{log.action}</p>
                  <p className="text-purple-300 text-sm">by {log.user}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-purple-200 text-sm">{log.timestamp}</p>
                <p className="text-purple-300 text-xs">IP: {log.ip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">Log Retention</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-purple-200">Keep logs for</span>
            <select className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="30">30 days</option>
              <option value="90" selected>90 days</option>
              <option value="180">6 months</option>
              <option value="365">1 year</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-purple-200">Export logs</span>
            <button className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300">
              Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'permissions':
        return renderPermissions();
      case 'members':
        return renderMembers();
      case 'security':
        return renderSecurity();
      case 'logs':
        return renderLogs();
      default:
        return renderPermissions();
    }
  };

  return (
    <div ref={containerRef} className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => onViewChange('settings')}
          className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Access Control</h1>
          <p className="text-purple-200">Manage permissions, security, and access for your family vaults</p>
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
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AccessControl;