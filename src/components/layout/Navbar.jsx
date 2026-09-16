import { NavLink } from 'react-router-dom';
import { Package, ChefHat, MessageCircle, Settings, Home, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '../common/ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/refrigerator', icon: Package, label: 'Refrigerator' },
    { to: '/recipes', icon: ChefHat, label: 'Recipes' },
    { to: '/chat', icon: MessageCircle, label: 'Chat' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const getLinkClass = ({ isActive }) =>
    `flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? 'bg-[var(--color-primary)] text-white shadow-sm'
        : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text)]'
    }`;

  return (
    <nav className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🧊</span>
            <span className="font-bold text-xl text-[var(--color-primary)] font-serif">SMARTAI Kitchen</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink key={to} to={to} className={getLinkClass}>
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </NavLink>
            ))}
            <div className="pl-3 border-l border-[var(--color-border)] ml-2">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center space-x-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)] focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className={getLinkClass}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
