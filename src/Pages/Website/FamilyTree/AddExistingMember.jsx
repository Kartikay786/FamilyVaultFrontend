import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, Upload, Palette, Users, Save, Plus } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddExistingMember = ({ onViewChange }) => {
    const containerRef = useRef(null);
    const familyId = localStorage.getItem('familyId');
    const [email, setEmail] = useState('');
    const [relation, setRelation] = useState('');
    const [otherRelation, setOtherRelation] = useState('');
    const [role, setRole] = useState('');
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

    console.log(role);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!relation || !role) {
            alert('Please all fields');
            return
        }

        try {
            setRelation(relation === 'Other' ? otherRelation : relation)
            const formData = new FormData();
            formData.append('familyId', familyId);
            formData.append('email', email);
            formData.append('relation', relation === 'Other' ? otherRelation : relation);
            formData.append('role', role);

            const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/member/addexistingmember`, {
                email,familyId,role, relation
            }
            );
            toast.success('Member Added Successfully.', {
                position: 'top-center'
            });
        }
        catch (err) {
            console.log(err);
            toast.error(err.response.data.message, {
                position: 'top-center'
            });
        }
        finally {
          
            setEmail('');
            setRelation('');
            setRole('');
            setOtherRelation('');
        }
    };


    return (
        <div ref={containerRef} className="p-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
                <button
                    onClick={() => navigate('/family/dashboard')}
                    className="p-2 cursor-pointer text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Add New Existing Member</h1>
                    <p className="text-purple-200">Set up a new family member </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">

                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                            <h2 className="text-xl font-semibold text-white mb-4">Member Information</h2>

                            <div className="space-y-4">

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
                        {/* Cover Image */}

                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Theme Selection */}


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
                        <Plus className="w-5 h-5" />
                        <span>Add Member</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddExistingMember;