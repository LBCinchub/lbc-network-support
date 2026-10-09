import React from 'react';

// Exact approved LBC Support logo asset (blue/cyan connected-node radial mark on black)
export const SUPPORT_LOGO_URL = '/lbc-support.png?v=1';

const SIZE_CLASSES = {
  sm: 'w-7 h-7 rounded-lg p-[3px]',
  md: 'w-9 h-9 rounded-xl p-1',
  lg: 'w-12 h-12 rounded-xl p-1.5',
  xl: 'w-16 h-16 rounded-2xl p-2',
};

export default function SupportLogo({ size = 'md', className = '' }) {
  return (
    <span
      className={`inline-flex flex-shrink-0 items-center justify-center overflow-hidden bg-black ${SIZE_CLASSES[size]} ${className}`}
    >
      <img
        src={SUPPORT_LOGO_URL}
        alt="LBC Support"
        className="h-full w-full object-contain"
        draggable="false"
      />
    </span>
  );
}