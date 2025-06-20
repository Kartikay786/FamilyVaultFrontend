import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, Upload, Palette, Users, Save, Plus } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddMember = ({ onViewChange }) => {
    const containerRef = useRef(null);
    const familyId = localStorage.getItem('familyId');
    const [memberName, setMemberName] = useState('');
    const [bio, setBio] = useState('');
    const [Dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [relation, setRelation] = useState('');
    const [otherRelation, setOtherRelation] = useState('');
    const [role, setRole] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    const [loading,setLoading] = useState(false);


    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    console.log(role);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));  // set preview
            setProfileImage(file);  // this is your existing state
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!memberName || !Dob || !bio || !email || !phone || !role) {
            alert('Please all fields');
            return
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('familyId', familyId);
            formData.append('memberName', memberName);
            formData.append('bio', bio);
            formData.append('Dob', Dob);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('relation', relation === 'Other' ? otherRelation : relation);
            formData.append('role', role);
            formData.append('profileImage', profileImage);

            const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/member/addmember`, formData);
            toast.success('Member Added Successfully.', {
                position: 'top-center'
            });
            navigate('/family/familymember');
        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data.message, {
                position: 'top-center'
            });
        }
        finally {
            setMemberName('');
            setBio('');
            setDob('');
            setEmail('');
            setPhone('');
            setRelation('');
            setRole('');
            setProfileImage(null);
            setOtherRelation('');
            setPreviewImage('');
            setLoading(false)
        }
    };


    return (
        <div ref={containerRef} className="p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between space-x-4 md:mb-8">
                <div className="flex items-center space-x-4 mb-8">
                    <button
                        onClick={() => navigate('/family/dashboard')}
                        className="p-2 cursor-pointer text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Add New Member</h1>
                        <p className="text-purple-200">Set up a new family member </p>
                    </div>

                </div>
                <div className=" hidden md:flex items-center space-x-3">
                    <button
                        onClick={() => navigate('/family/addexistingmember')}
                        className="flex items-center cursor-pointer space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Existing Member</span>
                    </button>
                </div>
            </div>

            <div className=" flex md:hidden mb-8  items-center space-x-3">
                <button
                    onClick={() => navigate('/family/addexistingmember')}
                    className="flex items-center cursor-pointer space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Existing Member</span>
                </button>
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
                                    <label className="block text-white text-sm font-medium mb-2">Member Name</label>
                                    <input
                                        type="text"
                                        value={memberName}
                                        onChange={(e) => setMemberName(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter member name..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm font-medium mb-2">Bio</label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                        placeholder="Describe member..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm font-medium mb-2">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={Dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter vault name..."
                                        required
                                    />
                                </div>
                                {/* <div>
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
                </div> */}
                            </div>
                        </div>

                        {/* Cover Image */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                            <h2 className="text-xl font-semibold text-white mb-4">Profile Image</h2>

                            <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300">
                                <Upload className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                                <h3 className="text-white text-lg font-semibold mb-2">
                                    Upload profile Image
                                </h3>
                                <p className="text-purple-200 mb-4">
                                    Choose a beautiful image to represent your profile
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
                            <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>

                            <div className="space-y-4">

                                <div>
                                    <label className="block text-white text-sm font-medium mb-2">Member Phone</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter Phone"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm font-medium mb-2"> Email</label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        placeholder="Enter Email..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white text-sm font-medium mb-2">Family Realtion</label>
                                    <select
                                        value={relation}
                                        onChange={(e) => setRelation(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >

                                        <option className='text-purple-900' value="">Choose family Relation </option>
                                        <option className='text-purple-900' value="GreatGrandFather">GreatGrandFather </option>
                                        <option className='text-purple-900' value="GreatGrandMother">GreatGrandMother</option>
                                        <option className='text-purple-900' value="GrandFather">GrandFather </option>
                                        <option className='text-purple-900' value="GrandMother">GrandMother</option>
                                        <option className='text-purple-900' value="Father">Father </option>
                                        <option className='text-purple-900' value="Mother">Mother</option>
                                        <option className='text-purple-900' value="Brother">Brother </option>
                                        <option className='text-purple-900' value="Sister">Sister</option>
                                        <option className='text-purple-900' value="Husband">Husband</option>
                                        <option className='text-purple-900' value="Wife">Wife</option>
                                        <option className='text-purple-900' value="Children">Children</option>
                                        <option className='text-purple-900' value="Friend">Friend</option>
                                        <option className='text-purple-900' value="Other">Other</option>
                                    </select>
                                </div>
                                {
                                    relation === 'Other' ? (
                                        <div>
                                            <label className="block text-white text-sm font-medium mb-2"> Relation</label>
                                            <input
                                                type="text"
                                                value={otherRelation}
                                                onChange={(e) => setOtherRelation(e.target.value)}
                                                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                placeholder="Enter Relation..."
                                                required
                                            />
                                        </div>
                                    ) : ''
                                }

                                <div>
                                    <label className="block text-white text-sm font-medium mb-2">Access Role</label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option className='text-purple-900' value="">Choose Family Member Role </option>

                                        <option className='text-purple-900' value="Member">Member - Family members Limited Access </option>
                                        <option className='text-purple-900' value="Admin">Admin - Super Access</option>
                                    </select>
                                </div>
                            </div>
                        </div>

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


                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-white/20">
                    <button
                        type="button"
                        onClick={() => navigate('/family/dashboard')}
                        className="px-6 py-3 text-purple-300 cursor-pointer hover:text-white transition-colors duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center cursor-pointer space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        {
                        loading ? 'Adding...' :(
                            <>
                        <Plus className="w-5 h-5" />
                        <span> Add Member</span>
                        </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMember;