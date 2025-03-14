import { useEffect, useState } from 'react';
import { LayoutDashboard, Users, Package, ClipboardCheck } from 'lucide-react';
import { NavLink } from './navLink';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Partner Management', icon: Users, href: '/partner' },
  { name: 'Order Management', icon: Package, href: '/orders' },
  { name: 'Assignment Management', icon: ClipboardCheck, href: '/assignment' },
];

export function BottomNav() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Only render on mobile
  if (!isMobile) return null;

  return (
    <nav
      className="
        fixed bottom-0 left-0 z-40 w-full
        bg-dark-800/50
        backdrop-blur-md
        border-t border-white/10
        shadow-lg
      "
    >
      {/* Adjusted padding to ensure icons/text fit nicely */}
      <div className="flex justify-around items-center py-3">
        {navigation.map((item) => (
          <NavLink key={item.name} {...item} isBottomNav />
        ))}
      </div>
    </nav>
  );
}
