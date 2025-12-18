import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
    const months = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
    
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayName}, ${day} ${month} ${year}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { label: 'Główna', id: 'hero', key: 'menu-home' },
    { label: 'Modele', id: 'hero', key: 'menu-models' },
    { label: 'Konfigurator', id: 'configurator', key: 'menu-configurator' },
    { label: 'Galeria', id: 'gallery', key: 'menu-gallery' },
    { label: 'Kontakt', id: 'contact', key: 'menu-contact' }
  ];

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 glass-dark"
      style={{
        borderBottom: '1px solid rgba(0, 212, 255, 0.2)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-12 h-12">
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 48 48" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-700 group-hover:rotate-180"
              >
                <circle 
                  cx="24" 
                  cy="24" 
                  r="20" 
                  stroke="url(#gradient1)" 
                  strokeWidth="2"
                  fill="none"
                />
                <circle 
                  cx="24" 
                  cy="24" 
                  r="14" 
                  stroke="#00D4FF" 
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle 
                  cx="24" 
                  cy="24" 
                  r="4" 
                  fill="#FF4D8D"
                />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
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
                      stroke="url(#gradient2)"
                      strokeWidth="1.5"
                    />
                  );
                })}
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D4FF" />
                    <stop offset="100%" stopColor="#FF4D8D" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00D4FF" />
                    <stop offset="100%" stopColor="#2CE2F2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="gradient-text text-xl font-bold tracking-tight">
                Car Modification
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className="relative text-sm font-medium transition-all duration-300 group"
                style={{ color: '#F5F5F5' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00D4FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#F5F5F5';
                }}
              >
                {item.label}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-pink-500 transition-all duration-300 group-hover:w-full"
                />
              </button>
            ))}
          </nav>

          {/* Right section: Clock & Cart */}
          <div className="flex items-center gap-6">
            {/* Real-time Clock */}
            <div className="hidden md:flex flex-col items-end mono text-xs">
              <div style={{ color: '#808080' }}>
                {formatDate(currentTime)}
              </div>
              <div 
                className="text-lg font-bold"
                style={{ color: '#00D4FF', letterSpacing: '0.1em' }}
              >
                {formatTime(currentTime)}
              </div>
            </div>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-3 rounded-xl glass transition-all duration-300 hover:scale-110 group"
              style={{
                border: '1px solid rgba(0, 212, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00D4FF';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <ShoppingCart size={20} style={{ color: '#00D4FF' }} />
              {cartItemsCount > 0 && (
                <span 
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold animate-pulse"
                  style={{
                    background: 'linear-gradient(135deg, #FF4D8D 0%, #FF2E7A 100%)',
                    color: '#FFFFFF'
                  }}
                >
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl glass"
              style={{ color: '#00D4FF' }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 glass-dark rounded-b-xl mt-2">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-6 py-3 transition-colors"
                style={{ color: '#F5F5F5' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 212, 255, 0.1)';
                  e.currentTarget.style.color = '#00D4FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#F5F5F5';
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
