import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Heart, Eye, EyeOff, Mail, Lock, User, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const RegisterScreen = ({ onRegister }) => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [familyName, setFamilyName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => setProfileImage(e.target.files[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(formRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);


  const handleRegisterFamily = async (e) => {
    e.preventDefault();

    const newformData = new FormData();
    newformData.append('familyName', familyName);
    newformData.append('description', description);
    newformData.append('email', email);
    newformData.append('password', password);
    newformData.append('profileImage', profileImage);

    console.log(newformData);
    setLoading(true);
    try {
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/family/registerfamily`, newformData);
      console.log(result);
      toast.success('Your Family Registered Successfully. Now Login...', {
        position: 'top-center'
      });
      navigate('/auth/login');
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        position: 'top-center'
      });
    }
    finally {
      setLoading(false)
      setDescription('');
      setEmail('');
      setFamilyName('');
      setPassword('');
      setProfileImage(null)
    }

  }

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-blue-900/50"></div>

      <div ref={formRef} className="relative z-10 w-full max-w-lg">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-purple-200">Join your family's digital memory vault</p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegisterFamily} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="block text-white text-sm font-medium mb-2">Family Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                  <input
                    type="text"
                    value={familyName}
                    name='familyName'
                    onChange={(e) => setFamilyName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your family name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                  <input
                    type="email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Family Short Description</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="text"
                  value={description}
                  name='description'
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Short Description"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Family Profile Image</label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type="file"
                  accept='image/*'
                  onChange={handleImage}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Create password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2  transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>



            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500" required />
              <span className="ml-2 text-sm text-purple-200">
                I agree to the <span className="text-purple-300 hover:text-white cursor-pointer">Terms of Service</span> and <span className="text-purple-300 hover:text-white cursor-pointer">Privacy Policy</span>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {
                loading ? 'Processing...' : 'Create Account'
              }
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-purple-200">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/auth/login')}
                className="text-purple-300 hover:text-white font-semibold transition-colors duration-300"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;