import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Heart, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import PageLoader from '../../Component/Loader/PageLoader';


const LoginScreen = ({ onLogin }) => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

 

    try {
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/family/loginfamily`, { email, familyName, password });
      console.log(result);
      localStorage.setItem('familyId', result?.data?.family?._id);
      localStorage.setItem('loginType', result?.data?.loginType);
      localStorage.setItem('role', result?.data?.family?.role);
      localStorage.setItem('loginByEmail', result?.data?.loginEmail);

        setTimeout(() => {
        navigate('/family/dashboard');
      }, 1000);
    }
    catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        position: 'top-center'
      });


    }
    finally {
      clearTimeout(timer);
      setLoading(false)
      setEmail('');
      setFamilyName('');
      setPassword('');
    }
  };

  return (
    <>
      {loading && <PageLoader isLoading={loading} onComplete={() => setLoading(false)} />}

      {
        !loading && (
          <div ref={containerRef} className="min-h-screen flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-blue-900/50"></div>

            <div ref={formRef} className="relative z-10 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                  <p className="text-purple-200">Sign in to access your family vault</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Family Name</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                      <input
                        type="text"
                        value={familyName}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500" />
                      <span className="ml-2 text-sm text-purple-200">Remember me</span>
                    </label>
                    {/* <button
                type="button"
                onClick={() => navigate('/auth/forgotpassword')}
                className="text-sm text-purple-300 hover:text-white transition-colors duration-300"
              >
                Forgot password?
              </button> */}
                  </div>

                  <button
                    type="submit"
                    className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {
                      loading ? 'Processing...' : 'Sign In'
                    }
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-purple-200">
                    Don't have an account?{' '}
                    <button
                      onClick={() => navigate('/auth/register')}
                      className="text-purple-300 cursor-pointer hover:text-white font-semibold transition-colors duration-300"
                    >
                      Sign up
                    </button>
                  </p>

                  <p className="text-purple-200">
                    <button
                      onClick={() => navigate('/')}
                      className="text-purple-300 cursor-pointer hover:text-white font-semibold transition-colors duration-300"
                    >
                      Go Back
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }


    </>
  );
};

export default LoginScreen;