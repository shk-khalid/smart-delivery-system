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

  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 z-40 w-full bg-white/10 backdrop-blur-lg border-t border-white/10 shadow-glow">
      <div className="flex justify-around py-2">
        {navigation.map((item) => (
          <NavLink key={item.name} {...item} isBottomNav />
        ))}
      </div>
    </nav>
  );
}