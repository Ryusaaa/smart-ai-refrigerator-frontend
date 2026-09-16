// client/src/components/common/Avatar.jsx
// User initials badge placeholder per REDESIGN-INSTRUCTIONS.MD Section 5

import React from 'react';

export default function Avatar({ name = 'Ibnu', role = 'Home User', size = 'md' }) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center space-x-2.5">
      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white font-semibold text-xs flex items-center justify-center shadow-xs border border-[var(--color-primary-hover)]/30 flex-shrink-0 select-none">
        {initials}
      </div>
      <div className="hidden sm:block text-left">
        <p className="text-xs font-semibold text-[var(--color-text)] leading-tight">{name}</p>
        <p className="text-[10px] text-[var(--color-text-muted)] leading-tight">{role}</p>
      </div>
    </div>
  );
}
