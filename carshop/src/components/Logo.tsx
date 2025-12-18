import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg 
        width="48" 
        height="48" 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Stylized wheel design */}
        <circle 
          cx="24" 
          cy="24" 
          r="20" 
          stroke="#87CEEB" 
          strokeWidth="2"
          fill="none"
        />
        <circle 
          cx="24" 
          cy="24" 
          r="14" 
          stroke="#3E2723" 
          strokeWidth="1.5"
          fill="none"
        />
        <circle 
          cx="24" 
          cy="24" 
          r="4" 
          fill="#87CEEB"
        />
        {/* Spokes */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 24 + Math.cos(rad) * 6;
          const y1 = 24 + Math.sin(rad) * 6;
          const x2 = 24 + Math.cos(rad) * 14;
          const y2 = 24 + Math.sin(rad) * 14;
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#3E2723"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
      <div className="flex flex-col">
        <span className="text-[20px] font-semibold tracking-tight" style={{ color: '#3E2723' }}>
          Car Modification
        </span>
      </div>
    </div>
  );
}
