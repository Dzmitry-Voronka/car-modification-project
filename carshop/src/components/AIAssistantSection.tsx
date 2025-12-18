import React, { useState } from 'react';
import { Send, Bot } from 'lucide-react';

export function AIAssistantSection() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Here would be AI integration
      alert(`Pytanie wysłane: ${message}`);
      setMessage('');
    }
  };

  return (
    <section 
      id="ai-assistant" 
      className="py-20 px-6"
      style={{ backgroundColor: '#F5F5DC' }}
    >
      <div className="max-w-5xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl text-center mb-4"
          style={{ color: '#3E2723', fontWeight: '700' }}
        >
          Potrzebujesz pomocy? Zapytaj naszego bota
        </h2>
        <p 
          className="text-center mb-12 text-lg"
          style={{ color: '#5D4037' }}
        >
          Nie wiesz, jakie części wybrać? Nasz asystent AI podpowie optymalną konfigurację pod Twój styl i budżet.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Bot illustration */}
          <div className="flex justify-center">
            <div 
              className="relative w-full max-w-md aspect-square rounded-3xl flex items-center justify-center overflow-hidden"
              style={{ 
                backgroundColor: '#3E2723',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
              }}
            >
              {/* Animated circles background */}
              <div className="absolute inset-0">
                <div 
                  className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full animate-pulse"
                  style={{ backgroundColor: 'rgba(135, 206, 235, 0.1)' }}
                />
                <div 
                  className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full animate-pulse"
                  style={{ 
                    backgroundColor: 'rgba(135, 206, 235, 0.1)',
                    animationDelay: '1s'
                  }}
                />
              </div>

              {/* Bot icon */}
              <div className="relative z-10 flex flex-col items-center">
                <div 
                  className="w-32 h-32 rounded-full flex items-center justify-center mb-6"
                  style={{ 
                    backgroundColor: '#87CEEB',
                    boxShadow: '0 10px 40px rgba(135, 206, 235, 0.5)'
                  }}
                >
                  <Bot size={64} style={{ color: '#3E2723' }} />
                </div>
                <div 
                  className="text-2xl text-center"
                  style={{ color: '#F5F5DC', fontWeight: '600' }}
                >
                  AI Assistant
                </div>
                <div 
                  className="text-sm mt-2"
                  style={{ color: '#87CEEB' }}
                >
                  Dostępny 24/7
                </div>
              </div>

              {/* Decorative chat bubbles */}
              <div 
                className="absolute top-8 right-8 px-4 py-2 rounded-xl"
                style={{ backgroundColor: '#87CEEB' }}
              >
                <p className="text-sm" style={{ color: '#3E2723' }}>
                  Jak mogę pomóc?
                </p>
              </div>
              <div 
                className="absolute bottom-8 left-8 px-4 py-2 rounded-xl"
                style={{ backgroundColor: '#F5F5DC' }}
              >
                <p className="text-sm" style={{ color: '#3E2723' }}>
                  Polecasz części...
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Chat interface */}
          <div className="space-y-6">
            <div 
              className="p-6 rounded-2xl"
              style={{ 
                backgroundColor: '#ffffff',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            >
              <h3 
                className="text-xl mb-4"
                style={{ color: '#3E2723', fontWeight: '600' }}
              >
                Czat z AI
              </h3>
              
              {/* Sample messages */}
              <div className="space-y-4 mb-6 h-64 overflow-y-auto">
                {/* Bot message */}
                <div className="flex gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#87CEEB' }}
                  >
                    <Bot size={20} style={{ color: '#3E2723' }} />
                  </div>
                  <div 
                    className="flex-1 p-4 rounded-xl rounded-tl-none"
                    style={{ backgroundColor: '#FAF8F3' }}
                  >
                    <p style={{ color: '#3E2723' }}>
                      Cześć! Jestem twoim asystentem AI. Mogę pomóc ci wybrać idealne modyfikacje dla twojego samochodu. Jaki masz budżet i styl?
                    </p>
                  </div>
                </div>

                {/* User message example */}
                <div className="flex gap-3 justify-end">
                  <div 
                    className="flex-1 p-4 rounded-xl rounded-tr-none max-w-md"
                    style={{ backgroundColor: '#87CEEB' }}
                  >
                    <p style={{ color: '#3E2723' }}>
                      Szukam sportowego wyglądu dla BMW M3
                    </p>
                  </div>
                </div>

                {/* Bot message */}
                <div className="flex gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#87CEEB' }}
                  >
                    <Bot size={20} style={{ color: '#3E2723' }} />
                  </div>
                  <div 
                    className="flex-1 p-4 rounded-xl rounded-tl-none"
                    style={{ backgroundColor: '#FAF8F3' }}
                  >
                    <p style={{ color: '#3E2723' }}>
                      Świetny wybór! Dla BMW M3 w stylu sportowym polecam: spojler węglowy, felgi 19", zawieszenie obniżone o 30mm oraz system wydechowy ze stali nierdzewnej. Mogę przygotować szczegółową wycenę?
                    </p>
                  </div>
                </div>
              </div>

              {/* Input form */}
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Wpisz swoje pytanie..."
                  className="flex-1 px-4 py-3 rounded-lg outline-none transition-all"
                  style={{
                    backgroundColor: '#FAF8F3',
                    color: '#3E2723',
                    border: '2px solid transparent'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#87CEEB';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg transition-all hover:scale-105"
                  style={{
                    backgroundColor: '#87CEEB',
                    color: '#3E2723'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6BB6DD';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#87CEEB';
                  }}
                >
                  <Send size={20} />
                </button>
              </form>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: '🎨', label: 'Rekomendacje stylu' },
                { icon: '💰', label: 'Optymalizacja budżetu' },
                { icon: '⚡', label: 'Odpowiedzi natychmiastowe' }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl text-center"
                  style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <p className="text-sm" style={{ color: '#3E2723' }}>
                    {feature.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
