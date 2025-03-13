import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/sideNav';
import { BottomNav } from '../components/layout/bottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth > 768;
      setIsDesktop(isNowDesktop);
      setIsMobile(!isNowDesktop);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-800 to-dark-900 flex">
      {isDesktop && (
        <Sidebar />
      )}

      <main
        className={`
          flex-1 min-h-screen transition-all duration-300 overflow-x-hidden
          ${isDesktop ? 'ml-20' : 'ml-0'}
          ${isMobile ? 'pb-16' : ''}
        `}
      >
        {children}
      </main>

      {isMobile && <BottomNav />}
    </div>
  );
}