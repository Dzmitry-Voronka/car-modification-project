import React, { useState } from 'react';
import { Home, Car, Wrench, Package, Phone, ChevronDown } from 'lucide-react';

const carBrands = [
  'Mercedes',
  'BMW',
  'Audi',
  'Porsche',
  'Ferrari',
  'Lamborghini',
  'Tesla'
];

export function Navigation() {
  const [isModelsOpen, setIsModelsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 z-50 flex flex-col" style={{ backgroundColor: '#3E2723' }}>
      {/* Logo section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 48 48" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="20" stroke="#87CEEB" strokeWidth="2" fill="none"/>
            <circle cx="24" cy="24" r="14" stroke="#F5F5DC" strokeWidth="1.5" fill="none"/>
            <circle cx="24" cy="24" r="4" fill="#87CEEB"/>
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
                  stroke="#F5F5DC"
                  strokeWidth="1.5"
                />
              );
            })}
          </svg>
          <div className="flex flex-col">
            <span className="text-[16px] font-semibold text-white leading-tight">
              Car
            </span>
            <span className="text-[16px] font-semibold leading-tight" style={{ color: '#87CEEB' }}>
              Modification
            </span>
          </div>
        </div>
      </div>

      {/* Navigation items */}
      <div className="flex-1 py-6 overflow-y-auto">
        <div className="space-y-2 px-4">
          {/* Główna */}
          <button
            onClick={() => scrollToSection('hero')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-white/10 text-white"
          >
            <Home size={20} />
            <span>Główna</span>
          </button>

          {/* Modele avto with dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsModelsOpen(!isModelsOpen)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-white/10 text-white"
            >
              <Car size={20} />
              <span>Modele aut</span>
              <ChevronDown 
                size={16} 
                className={`ml-auto transition-transform ${isModelsOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isModelsOpen && (
              <div className="mt-2 ml-8 space-y-1">
                {carBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => scrollToSection('3d-editor')}
                    className="w-full text-left px-4 py-2 rounded-lg transition-all text-sm"
                    style={{ color: '#F5F5DC' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.color = '#87CEEB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#F5F5DC';
                    }}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Utworzyć */}
          <button
            onClick={() => scrollToSection('3d-editor')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-white/10 text-white"
          >
            <Wrench size={20} />
            <span>Utworzyć</span>
          </button>

          {/* Zamówienie */}
          <button
            onClick={() => scrollToSection('steps')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-white/10 text-white"
          >
            <Package size={20} />
            <span>Zamówienie</span>
          </button>

          {/* Kontakty */}
          <button
            onClick={() => scrollToSection('contacts')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-white/10 text-white"
          >
            <Phone size={20} />
            <span>Kontakty</span>
          </button>
        </div>
      </div>

      {/* Slogan button */}
      <div className="p-4 border-t border-white/10">
        <button 
          className="w-full px-4 py-3 rounded-lg transition-all text-sm"
          style={{ backgroundColor: '#87CEEB', color: '#3E2723' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#6BB6DD';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#87CEEB';
          }}
        >
          Make your own future on wheels
        </button>
      </div>
    </nav>
  );
}
