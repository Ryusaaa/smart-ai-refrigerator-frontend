// client/src/components/layout/Topbar.jsx
// Topbar header with search, notification, theme toggle, and user avatar per REDESIGN-INSTRUCTIONS.MD Section 3.B

import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';
import Avatar from '../common/Avatar';

export default function Topbar({ onOpenSidebar }) {
  return (
    <header className="h-16 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-md sticky top-0 z-20 transition-colors px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile menu toggle & Search bar */}
      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 max-w-lg">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1 hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Quick search recipes, ingredients..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-[var(--color-surface-alt)] border border-[var(--color-border)]/60 rounded-xl text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/20 transition-all"
          />
        </div>
      </div>

      {/* Right: Actions, Theme, and Avatar */}
      <div className="flex items-center space-x-2 sm:space-x-3.5">
        <button
          type="button"
          className="p-2 rounded-xl text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-text)] transition-colors cursor-pointer relative"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--color-primary)] ring-2 ring-[var(--color-surface)]" />
        </button>

        <ThemeToggle />

        <div className="h-6 w-px bg-[var(--color-border)] mx-1" />

        <Avatar name="Ibnu" role="Home User" />
      </div>
    </header>
  );
}
