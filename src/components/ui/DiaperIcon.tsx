import React from 'react';

export function DiaperIcon({
  className = 'w-6 h-6',
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Top Waistband */}
      <rect x="2.5" y="4" width="19" height="3.5" rx="1.5" />

      {/* Decorative waistband zig-zag pattern */}
      <path d="M4 5.75L5.5 5L7 6.5L8.5 5L10 6.5L11.5 5L13 6.5L14.5 5L16 6.5L17.5 5L19 6.5L20 5.75" />

      {/* Main diaper outer contour */}
      <path d="M3.5 7.5V11.5C3.5 16.5 7 20 12 20C17 20 20.5 16.5 20.5 11.5V7.5" />

      {/* Left leg cutout opening */}
      <path d="M3.5 12C5.5 13 8.2 16.2 8.5 19.8" />

      {/* Right leg cutout opening */}
      <path d="M20.5 12C18.5 13 15.8 16.2 15.5 19.8" />
    </svg>
  );
}
