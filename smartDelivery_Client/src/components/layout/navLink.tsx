import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideProps } from 'lucide-react';

interface NavLinkProps {
  name: string;
  icon: React.ComponentType<LucideProps>;
  href: string;
  badge?: string;
  collapsed?: boolean;
  isBottomNav?: boolean;
  className?: string;
}

export function NavLink({
  name,
  icon: Icon,
  href,
  badge,
  collapsed,
  isBottomNav,
}: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={`
        flex items-center p-2 rounded-lg transition-colors
        ${isBottomNav ? 'flex-col text-xs' : 'space-x-3 text-base'}
        ${
          isActive
            ? 'bg-primary-700/20 text-primary-300'
            : 'hover:bg-dark-700/50 text-dark-200'
        }
      `}
    >
      <Icon
        className={`
          h-6 w-6
          ${isActive ? 'text-primary-300' : 'text-dark-300'}
          ${isBottomNav || collapsed ? 'mx-auto' : ''}
        `}
        strokeWidth={isActive ? 2 : 1.5}
      />

      {/* Show link text only if not collapsed and not in bottom nav */}
      {!collapsed && !isBottomNav && <span>{name}</span>}

      {/* Optional badge */}
      {badge && (
        <span
          className={`
            ml-auto text-xs font-medium
            bg-red-500 text-white
            rounded-full px-2 py-0.5
            ${isBottomNav ? 'mt-1' : ''}
          `}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}
