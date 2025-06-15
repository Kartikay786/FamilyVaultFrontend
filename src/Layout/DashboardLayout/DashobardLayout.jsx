import React, { useEffect, useState } from 'react'
import Navigation from '../Website/Navigation'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Outlet } from 'react-router-dom'

const DashobardLayout = () => {

  const [currentView, setCurrentView] = useState('home');
  const [selectedVault, setSelectedVault] = useState(null);

  useEffect(() => {
    // Initialize smooth scrolling
    gsap.set('body', { overflow: 'hidden' });

    setTimeout(() => {
      gsap.set('body', { overflow: 'auto' });
    }, 100);

    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();
  }, [currentView]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation
          currentView={currentView}
          onViewChange={setCurrentView}
          selectedVault={selectedVault}
        />
        <main className="pt-16">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default DashobardLayout