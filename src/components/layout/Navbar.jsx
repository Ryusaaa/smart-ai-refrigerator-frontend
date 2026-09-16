import { NavLink } from 'react-router-dom';
import { Package, ChefHat, MessageCircle, Settings, Home, Menu } from 'lucide-react';
import { useState } from 'react';

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
    `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl mr-2">🧊</span>
            <span className="font-bold text-xl text-primary-600">SMARTAI Fridge</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink key={to} to={to} className={getLinkClass}>
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
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
