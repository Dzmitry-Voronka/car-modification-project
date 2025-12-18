import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

const carBrands = [
  { name: 'Tesla', model: 'Model S', img: 'https://images.unsplash.com/photo-1635777076099-489c9b37ea3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUZXNsYSUyME1vZGVsJTIwUyUyMHN0dWRpb3xlbnwxfHx8fDE3NjYwOTczMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'BMW', model: 'M Series', img: 'https://images.unsplash.com/photo-1588324163167-551ca7eb4335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCTVclMjBNJTIwc2VyaWVzJTIwYmxhY2t8ZW58MXx8fHwxNzY2MDk3MzE2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Mercedes', model: 'AMG GT', img: 'https://images.unsplash.com/photo-1728058522181-16935cfbda5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZXJjZWRlcyUyMEFNRyUyMHN0dWRpb3xlbnwxfHx8fDE3NjYwOTczMTd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Audi', model: 'RS Series', img: 'https://images.unsplash.com/photo-1764308060465-487a0b798f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXIlMjBzdHVkaW98ZW58MXx8fHwxNzY2MDk3MzE1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Porsche', model: '911 Turbo', img: 'https://images.unsplash.com/photo-1688763254487-5775c4467ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQb3JzY2hlJTIwOTExJTIwZGFyayUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY2MDk3MzE1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Ferrari', model: '488 GTB', img: 'https://images.unsplash.com/photo-1668037069509-ba4c569475b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGZXJyYXJpJTIwc3VwZXJjYXIlMjBkYXJrfGVufDF8fHx8MTc2NjA5NzMxNnww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Lamborghini', model: 'Huracán', img: 'https://images.unsplash.com/photo-1764308060465-487a0b798f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXIlMjBzdHVkaW98ZW58MXx8fHwxNzY2MDk3MzE1fDA&ixlib=rb-4.1.0&q=80&w=1080' },
];

export function HeroSection3D() {
  const [selectedBrand, setSelectedBrand] = useState(carBrands[4]); // Porsche by default
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    startPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleBrandChange = (brand: typeof carBrands[0]) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedBrand(brand);
      setIsLoading(false);
    }, 500);
  };

  const scrollToConfigurator = () => {
    const element = document.getElementById('configurator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)',
            top: '10%',
            left: '10%',
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, #FF4D8D 0%, transparent 70%)',
            bottom: '10%',
            right: '10%',
            animation: 'float 8s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div>
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #00D4FF 50%, #FF4D8D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Dostosuj swój samochód w 3D
              </h1>
              <p className="text-xl md:text-2xl mb-8" style={{ color: '#808080' }}>
                Interaktywna wizualizacja • Konfiguracja w czasie rzeczywistym • Asystent AI
              </p>
            </div>

            {/* Brand Selection */}
            <div>
              <p className="text-sm mb-4 uppercase tracking-wider" style={{ color: '#00D4FF' }}>
                Wybierz markę
              </p>
              <div className="grid grid-cols-4 gap-3">
                {carBrands.map((brand) => (
                  <button
                    key={brand.name}
                    onClick={() => handleBrandChange(brand)}
                    className="p-3 rounded-xl glass transition-all hover:scale-105 relative group"
                    style={{
                      border: selectedBrand.name === brand.name 
                        ? '2px solid #00D4FF' 
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: selectedBrand.name === brand.name 
                        ? '0 0 20px rgba(0, 212, 255, 0.4)' 
                        : 'none'
                    }}
                  >
                    <div className="text-center">
                      <p 
                        className="text-xs font-bold mb-1"
                        style={{ 
                          color: selectedBrand.name === brand.name ? '#00D4FF' : '#FFFFFF' 
                        }}
                      >
                        {brand.name}
                      </p>
                      <p className="text-[10px]" style={{ color: '#808080' }}>
                        {brand.model}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={scrollToConfigurator}
              className="group relative px-10 py-5 rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #FF4D8D 0%, #FF2E7A 100%)',
                color: '#FFFFFF',
                boxShadow: '0 0 40px rgba(255, 77, 141, 0.6)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 60px rgba(255, 77, 141, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 77, 141, 0.6)';
              }}
            >
              <span className="relative z-10">Rozpocznij kustomizację</span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity"
                style={{
                  transform: 'translateX(-100%)',
                  animation: 'shimmer 2s infinite'
                }}
              />
            </button>
          </div>

          {/* Right: 3D Viewer */}
          <div className="relative">
            {/* 3D Container */}
            <div 
              ref={containerRef}
              className="relative aspect-square rounded-3xl glass-dark overflow-hidden cursor-grab active:cursor-grabbing"
              style={{
                border: '2px solid rgba(0, 212, 255, 0.3)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Loading skeleton */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 glass-dark">
                  <div className="skeleton w-full h-full" />
                  <div className="absolute">
                    <div 
                      className="w-16 h-16 border-4 border-transparent rounded-full animate-spin"
                      style={{
                        borderTopColor: '#00D4FF',
                        borderRightColor: '#FF4D8D'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Car Image with 3D transform */}
              <div 
                className="w-full h-full flex items-center justify-center preserve-3d transition-transform duration-300"
                style={{
                  transform: `
                    perspective(1000px) 
                    rotateX(${rotation.x}deg) 
                    rotateY(${rotation.y}deg) 
                    scale(${zoom})
                  `
                }}
              >
                <img 
                  src={selectedBrand.img}
                  alt={selectedBrand.name}
                  className="max-w-full max-h-full object-contain"
                  draggable={false}
                  onError={(e) => {
                    // Fallback do placeholder gdy obraz się nie załaduje
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%232a2a2a" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2300D4FF" font-family="Arial" font-size="40"%3E🚗%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>

              {/* 3D Grid Overlay */}
              <svg 
                className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern 
                    id="grid3d" 
                    width="10" 
                    height="10" 
                    patternUnits="userSpaceOnUse"
                  >
                    <path 
                      d="M 10 0 L 0 0 0 10" 
                      fill="none" 
                      stroke="#00D4FF" 
                      strokeWidth="0.3"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid3d)" />
              </svg>

              {/* Info overlay */}
              <div className="absolute top-6 left-6 glass rounded-xl p-4">
                <p className="text-sm mb-1" style={{ color: '#808080' }}>
                  Model aktualny
                </p>
                <p className="font-bold text-lg gradient-text">
                  {selectedBrand.name} {selectedBrand.model}
                </p>
              </div>
            </div>

            {/* 3D Controls */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              <button
                onClick={() => setRotation({ x: 0, y: 0 })}
                className="p-3 rounded-xl glass transition-all hover:scale-110"
                style={{ border: '1px solid rgba(0, 212, 255, 0.3)' }}
                title="Reset rotacji"
              >
                <RotateCw size={20} style={{ color: '#00D4FF' }} />
              </button>
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="p-3 rounded-xl glass transition-all hover:scale-110"
                style={{ border: '1px solid rgba(0, 212, 255, 0.3)' }}
                title="Pomniejsz"
              >
                <ZoomOut size={20} style={{ color: '#00D4FF' }} />
              </button>
              <button
                onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                className="p-3 rounded-xl glass transition-all hover:scale-110"
                style={{ border: '1px solid rgba(0, 212, 255, 0.3)' }}
                title="Powiększ"
              >
                <ZoomIn size={20} style={{ color: '#00D4FF' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
