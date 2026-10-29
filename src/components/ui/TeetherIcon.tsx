import React, { useId } from 'react';

export function TeetherIcon({
  className = 'w-6 h-6',
  ...props
}: React.SVGProps<SVGSVGElement>) {
  const maskId = useId();

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      {...props}
    >
      <defs>
        <mask id={maskId}>
          {/* Base visible mask */}
          <rect width="24" height="24" fill="white" />

          {/* Group rotated 45 degrees around center (12, 12) */}
          <g transform="rotate(45 12 12)">
            {/* Cutout slot inside the shield */}
            <line
              x1="7"
              y1="11"
              x2="17"
              y2="11"
              stroke="black"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Cutout crescent reflection highlight on teat bulb */}
            <path
              d="M12.8 3.5C13.8 4 14.1 5 13.7 5.8"
              fill="none"
              stroke="black"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
          </g>
        </mask>
      </defs>

      <g transform="rotate(45 12 12)">
        {/* Loop Handle */}
        <path
          d="M9.5 12C8 14 6.5 16.5 7.8 19.2C9 21.8 15 21.8 16.2 19.2C17.5 16.5 16 14 14.5 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Shield and Nipple bulb with cutout mask */}
        <g mask={`url(#${maskId})`}>
          {/* Shield pill collar */}
          <rect
            x="4.5"
            y="9.2"
            width="15"
            height="3.6"
            rx="1.8"
            fill="currentColor"
          />

          {/* Nipple / Teat bulb with neck */}
          <path
            d="M10.2 9.5V7C9.6 6.5 9.5 4.8 10.5 3.3C11.5 1.8 12.5 1.8 13.5 3.3C14.5 4.8 14.4 6.5 13.8 7V9.5Z"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>
  );
}

