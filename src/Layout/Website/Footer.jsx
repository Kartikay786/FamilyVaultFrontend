import React from 'react';
import { Heart, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-slate-900 to-purple-900/20 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Yaadon Ka Pitara</h3>
            </div>
            <p className="text-purple-200 text-lg leading-relaxed max-w-md">
              Preserve your family's most precious memories in a beautiful, secure digital space. 
              Create lasting connections across generations.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Features</h4>
            <ul className="space-y-2">
              {['Smart Upload', 'Family Sharing', 'Memory Timeline', 'Voice Notes'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-purple-200 hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-purple-200 hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-purple-200 text-sm mb-4 md:mb-0">
            © 2025 Yaadon Ka Pitara. Made with love for families worldwide.
          </p>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-purple-300 hover:text-white hover:bg-white/20 transition-all duration-300">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-purple-300 hover:text-white hover:bg-white/20 transition-all duration-300">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-purple-300 hover:text-white hover:bg-white/20 transition-all duration-300">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;