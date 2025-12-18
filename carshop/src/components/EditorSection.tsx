import React, { useState } from 'react';
import { Palette, Settings, Zap, Circle } from 'lucide-react';

const carBrands = [
  { name: 'Mercedes', img: 'https://images.unsplash.com/photo-1683798749503-7ca7224c433a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2RpZmllZCUyME1lcmNlZGVzJTIwQU1HfGVufDF8fHx8MTc2NjAzOTEyOHww&ixlib=rb-4.1.0&q=80&w=400' },
  { name: 'BMW', img: 'https://images.unsplash.com/photo-1660680299167-28ee5175a6c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjB0dW5lZCUyMEJNV3xlbnwxfHx8fDE3NjYwOTYzODF8MA&ixlib=rb-4.1.0&q=80&w=400' },
  { name: 'Audi', img: 'https://images.unsplash.com/photo-1762028691705-dd369bfd7beb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBdWRpJTIwUlMlMjB0dW5pbmd8ZW58MXx8fHwxNzY2MDk2MzgzfDA&ixlib=rb-4.1.0&q=80&w=400' },
  { name: 'Porsche', img: 'https://images.unsplash.com/photo-1661515556930-776ded65be00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBQb3JzY2hlJTIwdHVuaW5nfGVufDF8fHx8MTc2NjA5NjM4Mnww&ixlib=rb-4.1.0&q=80&w=400' },
  { name: 'Ferrari', img: 'https://images.unsplash.com/photo-1661311928926-180711852306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGZXJyYXJpJTIwc3VwZXJjYXIlMjBsdXh1cnl8ZW58MXx8fHwxNzY2MDk2MzgyfDA&ixlib=rb-4.1.0&q=80&w=400' },
  { name: 'Lamborghini', img: 'https://images.unsplash.com/photo-1765643025153-0e31ea8035c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMYW1ib3JnaGluaSUyMGN1c3RvbXxlbnwxfHx8fDE3NjYwOTYzODN8MA&ixlib=rb-4.1.0&q=80&w=400' },
  { name: 'Tesla', img: 'https://images.unsplash.com/photo-1617704557258-635f239e9165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUZXNsYSUyMG1vZGlmaWVkJTIwZWxlY3RyaWN8ZW58MXx8fHwxNzY2MDk2MzgzfDA&ixlib=rb-4.1.0&q=80&w=400' },
];

const modificationTools = [
  { icon: Circle, label: 'Koła', color: '#87CEEB' },
  { icon: Zap, label: 'Spojlery', color: '#87CEEB' },
  { icon: Palette, label: 'Malowanie', color: '#87CEEB' },
  { icon: Settings, label: 'Części', color: '#87CEEB' },
];

export function EditorSection() {
  const [selectedBrand, setSelectedBrand] = useState(carBrands[0]);

  return (
    <section 
      id="3d-editor" 
      className="py-20 px-6"
      style={{ backgroundColor: '#F5F5DC' }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl text-center mb-4"
          style={{ color: '#3E2723', fontWeight: '700' }}
        >
          Studio modyfikacji na żywo
        </h2>
        <p 
          className="text-center mb-12 text-lg"
          style={{ color: '#5D4037' }}
        >
          Zmieniaj szczegóły w czasie rzeczywistym. Widzisz wynik natychmiast.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left panel - Brand selection */}
          <div className="space-y-4">
            <h3 
              className="text-xl mb-4"
              style={{ color: '#3E2723', fontWeight: '600' }}
            >
              Wybierz markę
            </h3>
            <div className="space-y-3">
              {carBrands.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => setSelectedBrand(brand)}
                  className="w-full flex items-center gap-4 p-4 rounded-lg transition-all transform hover:scale-105"
                  style={{
                    backgroundColor: selectedBrand.name === brand.name ? '#87CEEB' : '#ffffff',
                    color: selectedBrand.name === brand.name ? '#3E2723' : '#5D4037',
                    border: selectedBrand.name === brand.name ? '2px solid #87CEEB' : '2px solid transparent',
                    boxShadow: selectedBrand.name === brand.name ? '0 4px 12px rgba(135, 206, 235, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <div 
                    className="w-16 h-16 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${brand.img})` }}
                  />
                  <span className="text-lg font-semibold">{brand.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Center - 3D Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <div 
              className="relative rounded-2xl overflow-hidden"
              style={{
                backgroundColor: '#3E2723',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                aspectRatio: '16/9'
              }}
            >
              {/* 3D Placeholder with selected car */}
              <div className="absolute inset-0">
                <img 
                  src={selectedBrand.img}
                  alt={selectedBrand.name}
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(62, 39, 35, 0.5)' }}
                >
                  {/* 3D Grid overlay */}
                  <svg 
                    className="w-full h-full opacity-30" 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <pattern 
                        id="grid" 
                        width="10" 
                        height="10" 
                        patternUnits="userSpaceOnUse"
                      >
                        <path 
                          d="M 10 0 L 0 0 0 10" 
                          fill="none" 
                          stroke="#87CEEB" 
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                  
                  <div className="absolute text-center">
                    <div 
                      className="text-6xl mb-4"
                      style={{ color: '#87CEEB', fontWeight: '700' }}
                    >
                      3D
                    </div>
                    <p style={{ color: '#F5F5DC' }}>
                      {selectedBrand.name} Model
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modification tools */}
            <div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl"
              style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            >
              {modificationTools.map((tool) => (
                <button
                  key={tool.label}
                  className="flex flex-col items-center gap-3 p-4 rounded-lg transition-all hover:scale-110"
                  style={{ 
                    backgroundColor: '#FAF8F3',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#87CEEB';
                    e.currentTarget.style.backgroundColor = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.backgroundColor = '#FAF8F3';
                  }}
                >
                  <tool.icon size={32} style={{ color: tool.color }} />
                  <span style={{ color: '#3E2723' }}>{tool.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
