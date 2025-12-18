import React from 'react';
import { Pencil, Settings, Truck } from 'lucide-react';

const steps = [
  {
    icon: Pencil,
    number: '01',
    title: 'Projektuj',
    description: 'Stwórz swój projekt w naszym edytorze 3D. Wybierz model, kolor, części i styl.',
    color: '#87CEEB'
  },
  {
    icon: Settings,
    number: '02',
    title: 'Konfiguruj',
    description: 'Wybierz szczegóły i otrzymaj dokładną wycenę. Sprawdź dostępność części i czas realizacji.',
    color: '#87CEEB'
  },
  {
    icon: Truck,
    number: '03',
    title: 'Dostawa',
    description: 'Dostawa i instalacja na całym świecie przez UPS. Profesjonalny montaż w autoryzowanych serwisach.',
    color: '#87CEEB'
  }
];

export function StepsSection() {
  return (
    <section 
      id="steps" 
      className="py-20 px-6"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl text-center mb-4"
          style={{ color: '#3E2723', fontWeight: '700' }}
        >
          Jak zamówić
        </h2>
        <p 
          className="text-center mb-16 text-lg"
          style={{ color: '#5D4037' }}
        >
          Trzy proste kroki do Twojego wymarzonego samochodu
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div 
            className="hidden md:block absolute top-24 left-0 right-0 h-0.5 -z-0"
            style={{ 
              backgroundColor: '#E8DCC4',
              marginLeft: '16.666%',
              marginRight: '16.666%'
            }}
          />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Icon container */}
              <div 
                className="relative w-48 h-48 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 z-10"
                style={{ 
                  backgroundColor: '#3E2723',
                  boxShadow: '0 10px 40px rgba(62, 39, 35, 0.2)'
                }}
              >
                {/* Outer ring */}
                <div 
                  className="absolute inset-0 rounded-full border-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor: step.color }}
                />
                
                {/* Number badge */}
                <div 
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center text-xl"
                  style={{ 
                    backgroundColor: step.color,
                    color: '#3E2723',
                    fontWeight: '700',
                    boxShadow: '0 4px 12px rgba(135, 206, 235, 0.4)'
                  }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <step.icon size={64} style={{ color: step.color }} />
              </div>

              {/* Content */}
              <h3 
                className="text-2xl mb-4"
                style={{ color: '#3E2723', fontWeight: '600' }}
              >
                {step.title}
              </h3>
              <p 
                className="max-w-sm"
                style={{ color: '#5D4037' }}
              >
                {step.description}
              </p>

              {/* Hover effect background */}
              <div 
                className="absolute inset-0 -z-10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ 
                  backgroundColor: '#FAF8F3',
                  margin: '-1rem',
                  padding: '1rem'
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className="mt-16 p-8 rounded-2xl text-center"
          style={{ 
            backgroundColor: '#3E2723',
            backgroundImage: 'linear-gradient(135deg, #3E2723 0%, #5D4037 100%)'
          }}
        >
          <h3 
            className="text-3xl mb-4"
            style={{ color: '#ffffff', fontWeight: '600' }}
          >
            Gotowy, aby rozpocząć?
          </h3>
          <p 
            className="text-lg mb-6"
            style={{ color: '#F5F5DC' }}
          >
            Dołącz do tysięcy zadowolonych klientów na całym świecie
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('3d-editor');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-10 py-4 rounded-lg transition-all transform hover:scale-105"
            style={{
              backgroundColor: '#87CEEB',
              color: '#3E2723',
              fontWeight: '600',
              boxShadow: '0 8px 24px rgba(135, 206, 235, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#6BB6DD';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#87CEEB';
            }}
          >
            Rozpocznij swój projekt
          </button>
        </div>
      </div>
    </section>
  );
}
