import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { LogOut, X, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LogoutConfirm = ({ logourPopupOpen, setLogoutPopupOpen }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Backdrop animation
      gsap.fromTo(backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Modal animation
      gsap.fromTo(modalRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.1 }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleCancel = () => {
    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power2.in"
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: setLogoutPopupOpen(false)
    });
  };

  const logout = ()=>{
    setLogoutPopupOpen(false);
    navigate('/');
     localStorage.removeItem('familyId');
      localStorage.removeItem('loginType');
      localStorage.removeItem('role');
      localStorage.removeItem('loginByEmail');
      localStorage.removeItem('memberId');
   }

  const handleConfirm = () => {
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.0001,
      ease: "power2.in",
      onComplete: logout
    });
  };

  return (
    <div ref={backdropRef} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div ref={modalRef} className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <LogOut className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Confirm Logout</h2>
          </div>
          <button
            onClick={handleCancel}
            className="p-2 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start space-x-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white mb-2">
                Are you sure you want to log out of your Family Vault account?
              </p>
              <p className="text-purple-200 text-sm">
                You'll need to sign in again to access your family memories and vaults.
              </p>
            </div>
          </div>

          <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 mb-6">
            <h3 className="text-purple-200 font-medium mb-2">Before you go:</h3>
            <ul className="text-purple-300 text-sm space-y-1">
              <li>• Make sure you've saved any unsaved changes</li>
              <li>• Your memories and vaults will remain safe</li>
              <li>• You can sign back in anytime</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-white/20">
          <button
            onClick={handleCancel}
            className="px-6 py-3 cursor-pointer text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex cursor-pointer items-center space-x-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirm;