// client/src/components/layout/Sidebar.jsx
// Fixed dark sidebar navigation per REDESIGN-INSTRUCTIONS.MD Section 3.B

import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ChefHat,
  MessageCircle,
  Settings,
  Sparkles,
  X,
  Bot
} from 'lucide-react';

const DRAWER_TRANSITION_MS = 320;

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/refrigerator', icon: Package, label: 'Refrigerator' },
    { to: '/recipes', icon: ChefHat, label: 'Recipes' },
    { to: '/chat', icon: MessageCircle, label: 'AI Assistant' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const linkClass = ({ isActive }) =>
    `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
      isActive
        ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]'
        : 'text-[var(--sidebar-text-muted)] hover:bg-white/[0.05] hover:text-[var(--sidebar-text)]'
    }`;

  // `mobile` = true untuk versi drawer: item menu muncul bergantian (stagger).
  const renderContent = (mobile) => {
    const staggerClass = mobile ? 'sidebar-stagger-item' : '';

    return (
      <div className="h-full flex flex-col justify-between p-4 sm:p-5 bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] border-r border-[var(--sidebar-border)] select-none">
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[var(--sidebar-border)]">
            <div className="flex items-center space-x-3">
              <div
                className="w-9 h-9 rounded-xl text-white flex items-center justify-center shadow-sm flex-shrink-0"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="font-bold text-base tracking-tight text-[var(--sidebar-text)]">SMARTAI</span>
                <span className="block text-[10px] uppercase font-semibold tracking-wider text-[var(--color-primary)]">
                  Refrigerator OS
                </span>
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1.5 rounded-lg text-[var(--sidebar-text-muted)] hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Section */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] uppercase font-bold tracking-wider text-[var(--sidebar-text-muted)]/70 mb-2">
              Main Menu
            </p>
            {navItems.map(({ to, icon: Icon, label }, index) => (
              <div key={to} className={staggerClass} style={{ '--stagger-index': index }}>
                <NavLink
                  to={to}
                  onClick={onClose ? onClose : undefined}
                  className={linkClass}
                >
                  <Icon className="w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-105" />
                  <span>{label}</span>
                </NavLink>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Card / System Status */}
        <div
          className={`mt-6 pt-4 border-t border-[var(--sidebar-border)] ${staggerClass}`}
          style={{ '--stagger-index': navItems.length }}
        >
          <div className="p-3.5 rounded-2xl bg-[var(--sidebar-surface)] border border-[var(--sidebar-border)]">
            <div className="flex items-center space-x-2.5 mb-2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              <span className="text-[11px] font-semibold text-[var(--sidebar-text)]">System Connected</span>
            </div>
            <p className="text-[10px] text-[var(--sidebar-text-muted)] leading-relaxed">
              AI Fridge model active & inventory memory synchronized.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 flex-shrink-0 z-30">
        {renderContent(false)}
      </aside>

      {/* Mobile Drawer: selalu ter-render supaya animasi buka DAN tutup bisa berjalan */}
      <div
        className={`lg:hidden fixed inset-0 z-50 ${
          isOpen ? 'visible sidebar-drawer-open' : 'invisible pointer-events-none'
        }`}
        // Saat menutup, `visibility` baru berubah setelah animasi geser selesai.
        style={{ transition: 'visibility 0s linear', transitionDelay: isOpen ? '0ms' : `${DRAWER_TRANSITION_MS}ms` }}
        aria-hidden={!isOpen}
      >
        {/* Overlay gelap: fade in/out */}
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        />

        {/* Panel: geser dari kiri */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi"
          className={`relative w-72 max-w-[80vw] h-full z-10 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {renderContent(true)}
        </aside>
      </div>
    </>
  );
}