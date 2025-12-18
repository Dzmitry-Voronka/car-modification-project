import React, { useState } from 'react';
import { Palette, Circle, Lightbulb, Wind, Sofa, ShoppingCart } from 'lucide-react';
import { CartItem } from './CartPanel';

// Uwaga: Dla pełnej integracji Three.js wymagane jest:
// 1. npm install three @react-three/fiber @react-three/drei
// 2. Utworzenie komponentu Car3DViewer z Three.js
// 3. Załadowanie modeli 3D (GLTF/GLB format)
// Obecnie używamy ulepszonych wizualizacji CSS 3D z animacjami i efektami

interface ConfigOption {
  id: string;
  name: string;
  value: string;
  price: number;
}

interface ConfiguratorSectionProps {
  onAddToCart?: (item: CartItem) => void;
}

const categories = [
  {
    id: 'body',
    name: 'Kuzov',
    icon: Palette,
    options: [
      { id: 'color-black', name: 'Czarny metalik', value: '#0A0A0A', price: 5000 },
      { id: 'color-white', name: 'Biały perłowy', value: '#F5F5F5', price: 5000 },
      { id: 'color-red', name: 'Czerwony racing', value: '#FF2E7A', price: 6000 },
      { id: 'color-blue', name: 'Niebieski elektryczny', value: '#00D4FF', price: 6000 },
      { id: 'color-gray', name: 'Szary mat', value: '#808080', price: 7000 },
    ]
  },
  {
    id: 'wheels',
    name: 'Koła',
    icon: Circle,
    options: [
      { id: 'wheels-18', name: 'Felgi 18" Sport', value: '18-sport', price: 8000 },
      { id: 'wheels-19', name: 'Felgi 19" Racing', value: '19-racing', price: 10000 },
      { id: 'wheels-20', name: 'Felgi 20" Premium', value: '20-premium', price: 12000 },
      { id: 'wheels-carbon', name: 'Felgi węglowe 19"', value: '19-carbon', price: 25000 },
    ]
  },
  {
    id: 'interior',
    name: 'Wnętrze',
    icon: Sofa,
    options: [
      { id: 'int-leather', name: 'Skóra naturalna', value: 'leather', price: 15000 },
      { id: 'int-alcantara', name: 'Alcantara sportowa', value: 'alcantara', price: 18000 },
      { id: 'int-carbon', name: 'Carbon + skóra', value: 'carbon-leather', price: 30000 },
      { id: 'int-premium', name: 'Premium Nappa', value: 'nappa', price: 35000 },
    ]
  },
  {
    id: 'lights',
    name: 'Światła',
    icon: Lightbulb,
    options: [
      { id: 'light-led', name: 'LED standardowe', value: 'led-standard', price: 3000 },
      { id: 'light-matrix', name: 'Matrix LED', value: 'matrix', price: 8000 },
      { id: 'light-laser', name: 'Laser LED', value: 'laser', price: 12000 },
      { id: 'light-adaptive', name: 'Adaptive Matrix', value: 'adaptive', price: 15000 },
    ]
  },
  {
    id: 'aero',
    name: 'Aerodynamika',
    icon: Wind,
    options: [
      { id: 'aero-standard', name: 'Standardowy', value: 'standard', price: 0 },
      { id: 'aero-sport', name: 'Pakiet Sport', value: 'sport', price: 15000 },
      { id: 'aero-racing', name: 'Pakiet Racing', value: 'racing', price: 25000 },
      { id: 'aero-carbon', name: 'Full Carbon Aero', value: 'carbon', price: 50000 },
    ]
  },
];

export function ConfiguratorSection({ onAddToCart }: ConfiguratorSectionProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, ConfigOption>>({});
  const [carColor, setCarColor] = useState('#0A0A0A');
  const [rotation, setRotation] = useState(0);

  const handleOptionSelect = (categoryId: string, option: ConfigOption) => {
    setSelectedOptions(prev => ({
      ...prev,
      [categoryId]: option
    }));

    // Update car color if body category
    if (categoryId === 'body') {
      setCarColor(option.value);
    }
  };

  const getTotalPrice = () => {
    return Object.values(selectedOptions).reduce((sum, option) => sum + option.price, 0);
  };

  const handleAddToCart = () => {
    if (Object.keys(selectedOptions).length === 0) {
      alert('Wybierz przynajmniej jedną opcję przed dodaniem do koszyka!');
      return;
    }

    const configuration: CartItem = {
      id: `config-${Date.now()}`,
      name: 'Moja konfiguracja',
      description: `${Object.keys(selectedOptions).length} modyfikacji: ${Object.values(selectedOptions).map(opt => opt.name).join(', ')}`,
      price: getTotalPrice(),
      quantity: 1,
    };
    
    // Dodaj do koszyka przez callback
    if (onAddToCart) {
      onAddToCart(configuration);
      // Pokaż potwierdzenie
      const notification = document.createElement('div');
      notification.textContent = '✓ Konfiguracja dodana do koszyka!';
      notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00D4FF 0%, #2CE2F2 100%);
        color: #0A0A0A;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
        animation: slideIn 0.3s ease-out;
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, 2000);
    }
  };

  return (
    <section 
      id="configurator"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)',
            top: '20%',
            right: '10%',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #00D4FF 50%, #FF4D8D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Konfigurator na żywo
          </h2>
          <p className="text-xl" style={{ color: '#808080' }}>
            Dostosuj każdy szczegół swojego samochodu w czasie rzeczywistym
          </p>
        </div>

        {/* Main Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: 3D Viewer */}
          <div className="lg:col-span-2">
            <div 
              className="relative aspect-video rounded-3xl glass-dark overflow-hidden group"
              style={{
                border: '2px solid rgba(0, 212, 255, 0.3)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* 3D Car Visualization */}
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle at center, ${carColor}33 0%, transparent 70%)`
                }}
              >
                {/* Ulepszona reprezentacja 3D samochodu z animacjami */}
                <div 
                  className="relative transition-all duration-700"
                  style={{
                    transform: `perspective(1000px) rotateY(${rotation}deg) scale(1.2)`,
                    transformStyle: 'preserve-3d',
                    animation: 'float 6s ease-in-out infinite'
                  }}
                >
                  <svg width="400" height="200" viewBox="0 0 400 200" fill="none">
                    {/* Car body z gradientem */}
                    <defs>
                      <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={carColor} />
                        <stop offset="100%" stopColor={carColor} stopOpacity="0.8" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Car body */}
                    <path
                      d="M 80 120 L 120 80 L 280 80 L 320 120 L 320 150 L 80 150 Z"
                      fill="url(#carBodyGradient)"
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="2"
                      className="transition-all duration-500"
                      filter="url(#glow)"
                    />
                    {/* Car roof */}
                    <path
                      d="M 140 80 L 160 60 L 240 60 L 260 80 Z"
                      fill="url(#carBodyGradient)"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="2"
                      opacity="0.9"
                      className="transition-all duration-500"
                    />
                    {/* Wheels z animacją */}
                    <g className="wheel-animation">
                      <circle cx="120" cy="150" r="25" fill="#2A2A2A" stroke={carColor} strokeWidth="3"/>
                      <circle cx="120" cy="150" r="15" fill={carColor} opacity="0.5"/>
                      <circle cx="280" cy="150" r="25" fill="#2A2A2A" stroke={carColor} strokeWidth="3"/>
                      <circle cx="280" cy="150" r="15" fill={carColor} opacity="0.5"/>
                    </g>
                    {/* Windows z efektem szkła */}
                    <path
                      d="M 150 75 L 165 65 L 235 65 L 250 75 Z"
                      fill="rgba(0, 212, 255, 0.3)"
                      stroke="rgba(0, 212, 255, 0.6)"
                      strokeWidth="1"
                    />
                    {/* Lights z pulsowaniem */}
                    <circle cx="310" cy="110" r="8" fill="#00D4FF" opacity="0.9" className="animate-pulse"/>
                    <circle cx="90" cy="110" r="8" fill="#00D4FF" opacity="0.9" className="animate-pulse"/>
                    {/* Dodatkowe detale */}
                    <rect x="200" y="70" width="40" height="20" rx="2" fill="rgba(0, 212, 255, 0.2)" stroke="rgba(0, 212, 255, 0.4)"/>
                  </svg>
                </div>
              </div>

              {/* Grid overlay */}
              <svg 
                className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <pattern id="grid-config" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#00D4FF" strokeWidth="0.3"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid-config)" />
              </svg>

              {/* Rotation controls z ulepszonymi animacjami */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
                <button
                  onClick={() => setRotation(rotation - 30)}
                  className="px-6 py-3 rounded-xl glass transition-all hover:scale-110 active:scale-95"
                  style={{ 
                    border: '1px solid rgba(0, 212, 255, 0.3)', 
                    color: '#00D4FF',
                    boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.5)';
                    e.currentTarget.style.borderColor = '#00D4FF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                  }}
                >
                  ← Obróć
                </button>
                <button
                  onClick={() => setRotation(0)}
                  className="px-6 py-3 rounded-xl glass transition-all hover:scale-110 active:scale-95"
                  style={{ 
                    border: '1px solid rgba(255, 77, 141, 0.3)', 
                    color: '#FF4D8D',
                    boxShadow: '0 0 20px rgba(255, 77, 141, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 77, 141, 0.5)';
                    e.currentTarget.style.borderColor = '#FF4D8D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 77, 141, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(255, 77, 141, 0.3)';
                  }}
                >
                  Reset
                </button>
                <button
                  onClick={() => setRotation(rotation + 30)}
                  className="px-6 py-3 rounded-xl glass transition-all hover:scale-110 active:scale-95"
                  style={{ 
                    border: '1px solid rgba(0, 212, 255, 0.3)', 
                    color: '#00D4FF',
                    boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.5)';
                    e.currentTarget.style.borderColor = '#00D4FF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                  }}
                >
                  Obróć →
                </button>
              </div>

              {/* Configuration info */}
              <div className="absolute top-6 left-6 glass rounded-xl p-4">
                <p className="text-sm mb-1" style={{ color: '#808080' }}>
                  Całkowita cena
                </p>
                <p className="text-2xl font-bold gradient-text">
                  {getTotalPrice().toLocaleString('pl-PL')} PLN
                </p>
              </div>
            </div>
          </div>

          {/* Right: Configuration Panel */}
          <div className="space-y-6">
            {/* Category Tabs */}
            <div className="glass rounded-2xl p-4">
              <div className="grid grid-cols-3 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category)}
                    className="p-3 rounded-xl transition-all hover:scale-105"
                    style={{
                      background: activeCategory.id === category.id
                        ? 'linear-gradient(135deg, #00D4FF 0%, #2CE2F2 100%)'
                        : 'rgba(255, 255, 255, 0.05)',
                      color: activeCategory.id === category.id ? '#0A0A0A' : '#FFFFFF',
                      border: activeCategory.id === category.id 
                        ? 'none'
                        : '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <category.icon size={20} className="mx-auto mb-1" />
                    <p className="text-xs">{category.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="glass rounded-2xl p-6 max-h-[500px] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                {activeCategory.name}
              </h3>
              <div className="space-y-3">
                {activeCategory.options.map((option) => {
                  const isSelected = selectedOptions[activeCategory.id]?.id === option.id;
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(activeCategory.id, option)}
                      className="w-full p-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] text-left"
                      style={{
                        background: isSelected
                          ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(255, 77, 141, 0.2) 100%)'
                          : 'rgba(255, 255, 255, 0.03)',
                        border: isSelected
                          ? '2px solid #00D4FF'
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: isSelected ? '0 0 20px rgba(0, 212, 255, 0.3)' : 'none',
                        animation: isSelected ? 'pulse-glow 2s ease-in-out infinite' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                          e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold" style={{ color: '#FFFFFF' }}>
                          {option.name}
                        </p>
                        {activeCategory.id === 'body' && (
                          <div 
                            className="w-8 h-8 rounded-full border-2"
                            style={{ 
                              backgroundColor: option.value,
                              borderColor: isSelected ? '#00D4FF' : 'rgba(255, 255, 255, 0.3)'
                            }}
                          />
                        )}
                      </div>
                      <p 
                        className="text-sm"
                        style={{ color: isSelected ? '#00D4FF' : '#808080' }}
                      >
                        +{option.price.toLocaleString('pl-PL')} PLN
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, #FF4D8D 0%, #FF2E7A 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 0 30px rgba(255, 77, 141, 0.5)'
                }}
              >
                <ShoppingCart size={20} />
                Dodaj do koszyka
              </button>
              <button
                className="w-full py-4 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  background: 'rgba(0, 212, 255, 0.1)',
                  color: '#00D4FF',
                  border: '1px solid rgba(0, 212, 255, 0.3)'
                }}
              >
                Zapisz konfigurację
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
