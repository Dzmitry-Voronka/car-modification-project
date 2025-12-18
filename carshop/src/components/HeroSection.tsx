import React from 'react';

export function HeroSection() {
  const scrollToEditor = () => {
    const element = document.getElementById('3d-editor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1743889292268-2e9f58a73fa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2RpZmllZCUyMHNwb3J0cyUyMGNhcnxlbnwxfHx8fDE3NjYwOTYzODB8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
        }}
      >
        {/* Dark overlay */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'rgba(62, 39, 35, 0.7)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 
          className="text-5xl md:text-7xl mb-6 tracking-tight"
          style={{ 
            color: '#ffffff',
            fontWeight: '700',
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)'
          }}
        >
          Dostosuj swój wymarzony samochód w czasie rzeczywistym
        </h1>
        
        <p 
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
          style={{ 
            color: '#F5F5DC',
            fontWeight: '400',
            textShadow: '1px 1px 4px rgba(0,0,0,0.5)'
          }}
        >
          Edytor 3D na żywo • Galeria wizualna • Asystent AI
        </p>

        <button
          onClick={scrollToEditor}
          className="px-10 py-5 rounded-lg text-lg transition-all transform hover:scale-105 hover:shadow-2xl"
          style={{
            backgroundColor: '#87CEEB',
            color: '#3E2723',
            fontWeight: '600',
            boxShadow: '0 10px 30px rgba(135, 206, 235, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#6BB6DD';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#87CEEB';
          }}
        >
          ROZPOCZNIJ PROJEKTOWANIE
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#87CEEB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
}
