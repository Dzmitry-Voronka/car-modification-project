import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const quickSuggestions = [
  'Jakie felgi polecasz do BMW M3?',
  'Ile kosztuje full carbon aero?',
  'Jak obniżyć zawieszenie?',
  'Najlepsze spojlery dla Porsche?',
];

const botResponses: Record<string, string> = {
  default: 'Dziękuję za pytanie! Mogę pomóc Ci wybrać najlepsze części do Twojego samochodu. O jaki model jesteś zainteresowany? Możesz zapytać o: felgi, carbon, zawieszenie, spojlery, ceny, dostawę, montaż lub gwarancję.',
  felgi: 'Dla BMW M3 polecam felgi 19" Racing Carbon w cenie 25,000 PLN. Oferują doskonałą równowagę między wyglądem a wydajnością. Są również dostępne w rozmiarze 20" Premium za 30,000 PLN. Wszystkie felgi są wykonane z lekkich stopów i dostępne w różnych kolorach.',
  carbon: 'Pełny pakiet Carbon Aero zawiera: przedni splitter, boczne progi, tylny dyfuzor i spojler. Całość kosztuje około 50,000 PLN. Montaż trwa 2-3 dni robocze. Wszystkie elementy są wykonane z autentycznego włókna węglowego i pokryte warstwą UV.',
  zawieszenie: 'Zalecam obniżenie o 30-40mm dla codziennego użytku. Dostępne są zestawy coilover od 8,000 PLN do 25,000 PLN (KW V3). Dla trackowych zastosowań - air suspension z możliwością pełnej regulacji. Wszystkie zestawy są regulowane i dostosowane do Twojego modelu.',
  spojlery: 'Dla Porsche 911 najlepiej sprawdzają się spojlery GT3 RS style (15,000 PLN) lub karbon aktywny (35,000 PLN). Oba znacznie poprawiają docisk przy wysokich prędkościach. Aktywny spojler automatycznie dostosowuje się do prędkości i warunków jazdy.',
};

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Cześć! Jestem Twoim asystentem AI. Jak mogę Ci pomóc w kustomizacji samochodu?',
      sender: 'bot',
      timestamp: new Date(),
      suggestions: quickSuggestions
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();
    
    // Rozszerzona logika rozpoznawania intencji
    if (lowerMsg.includes('felgi') || lowerMsg.includes('koła') || lowerMsg.includes('felga') || lowerMsg.includes('wheel')) {
      return botResponses.felgi;
    } else if (lowerMsg.includes('carbon') || lowerMsg.includes('aero') || lowerMsg.includes('karbon') || lowerMsg.includes('węgl')) {
      return botResponses.carbon;
    } else if (lowerMsg.includes('zawieszenie') || lowerMsg.includes('obniż') || lowerMsg.includes('suspension') || lowerMsg.includes('coilover')) {
      return botResponses.zawieszenie;
    } else if (lowerMsg.includes('spojler') || lowerMsg.includes('spoiler') || lowerMsg.includes('skrzydło')) {
      return botResponses.spojlery;
    } else if (lowerMsg.includes('cena') || lowerMsg.includes('koszt') || lowerMsg.includes('price') || lowerMsg.includes('ile kosztuje')) {
      return 'Ceny zależą od wybranych modyfikacji. W konfiguratorze możesz zobaczyć dokładne ceny dla każdej opcji. Podstawowe modyfikacje zaczynają się od 3,000 PLN, a premium pakiety mogą kosztować nawet 50,000 PLN.';
    } else if (lowerMsg.includes('dostawa') || lowerMsg.includes('wysyłka') || lowerMsg.includes('delivery') || lowerMsg.includes('czas')) {
      return 'Dostawa odbywa się przez UPS w ciągu 3-7 dni roboczych. Dla zamówień powyżej 10,000 PLN dostawa jest darmowa!';
    } else if (lowerMsg.includes('montaż') || lowerMsg.includes('instalacja') || lowerMsg.includes('installation')) {
      return 'Oferujemy profesjonalny montaż w naszym warsztacie w Warszawie. Możemy również wysłać części do Twojego mechanika. Montaż zajmuje zwykle 1-3 dni w zależności od zakresu modyfikacji.';
    } else if (lowerMsg.includes('gwarancja') || lowerMsg.includes('warranty') || lowerMsg.includes('zwrot')) {
      return 'Wszystkie nasze produkty objęte są 2-letnią gwarancją. W przypadku problemów możesz zwrócić produkt w ciągu 14 dni od zakupu.';
    } else if (lowerMsg.includes('witaj') || lowerMsg.includes('cześć') || lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return 'Cześć! 👋 Jestem Twoim asystentem AI. Mogę pomóc Ci w wyborze części, odpowiedzieć na pytania o ceny, dostawę i montaż. O co chciałbyś zapytać?';
    } else {
      return botResponses.default;
    }
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
        suggestions: Math.random() > 0.5 ? quickSuggestions : undefined
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <section 
      id="ai-assistant"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)',
            top: '30%',
            left: '20%',
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, #FF4D8D 0%, transparent 70%)',
            bottom: '30%',
            right: '20%',
            animation: 'float 10s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles size={32} style={{ color: '#00D4FF' }} className="animate-pulse" />
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #00D4FF 50%, #FF4D8D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Asystent AI
            </h2>
            <Sparkles size={32} style={{ color: '#FF4D8D' }} className="animate-pulse" />
          </div>
          <p className="text-xl" style={{ color: '#808080' }}>
            Zapytaj o porady dotyczące modyfikacji • Dostępny 24/7
          </p>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="rounded-3xl glass-dark overflow-hidden"
            style={{
              border: '2px solid rgba(0, 212, 255, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Chat Header */}
            <div 
              className="p-6 border-b"
              style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className="flex items-center gap-4">
                {/* Bot Avatar */}
                <div 
                  className="relative w-16 h-16 rounded-full glass flex items-center justify-center"
                  style={{
                    border: '2px solid #00D4FF',
                    boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)'
                  }}
                >
                  <Bot size={32} style={{ color: '#00D4FF' }} />
                  <div 
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse"
                    style={{ backgroundColor: '#00FF88' }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>
                    Car Mod AI
                  </h3>
                  <p className="text-sm" style={{ color: '#00D4FF' }}>
                    Online • Średni czas odpowiedzi: 2s
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div 
              className="p-6 space-y-6 overflow-y-auto"
              style={{ 
                height: '500px',
                scrollbarWidth: 'thin'
              }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  {message.sender === 'bot' && (
                    <div 
                      className="w-10 h-10 rounded-full glass flex items-center justify-center flex-shrink-0"
                      style={{ border: '2px solid #00D4FF' }}
                    >
                      <Bot size={20} style={{ color: '#00D4FF' }} />
                    </div>
                  )}

                  {/* Message Content */}
                  <div 
                    className={`max-w-[70%] ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-2`}
                  >
                    <div
                      className="px-6 py-4 rounded-2xl"
                      style={{
                        background: message.sender === 'user'
                          ? 'linear-gradient(135deg, #00D4FF 0%, #2CE2F2 100%)'
                          : 'rgba(255, 255, 255, 0.05)',
                        color: message.sender === 'user' ? '#0A0A0A' : '#FFFFFF',
                        borderRadius: message.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px'
                      }}
                    >
                      <p>{message.text}</p>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(suggestion)}
                            className="px-4 py-2 rounded-xl text-sm glass transition-all hover:scale-105"
                            style={{
                              color: '#00D4FF',
                              border: '1px solid rgba(0, 212, 255, 0.3)'
                            }}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* User Avatar */}
                  {message.sender === 'user' && (
                    <div 
                      className="w-10 h-10 rounded-full glass flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #FF4D8D 0%, #FF2E7A 100%)',
                        color: '#FFFFFF'
                      }}
                    >
                      U
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-4">
                  <div 
                    className="w-10 h-10 rounded-full glass flex items-center justify-center"
                    style={{ border: '2px solid #00D4FF' }}
                  >
                    <Bot size={20} style={{ color: '#00D4FF' }} />
                  </div>
                  <div 
                    className="px-6 py-4 rounded-2xl glass"
                  >
                    <div className="flex gap-2">
                      <div 
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ backgroundColor: '#00D4FF', animationDelay: '0s' }}
                      />
                      <div 
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ backgroundColor: '#00D4FF', animationDelay: '0.2s' }}
                      />
                      <div 
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ backgroundColor: '#00D4FF', animationDelay: '0.4s' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div 
              className="p-6 border-t"
              style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Wpisz swoje pytanie..."
                  className="flex-1 px-6 py-4 rounded-xl glass outline-none transition-all"
                  style={{
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#00D4FF';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl font-bold transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #00D4FF 0%, #2CE2F2 100%)',
                    color: '#0A0A0A',
                    boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.4)';
                  }}
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: '🎯', title: 'Precyzyjne rekomendacje', desc: 'Dopasowane do Twojego modelu' },
              { icon: '💡', title: 'Porady ekspertów', desc: 'Sprawdzona wiedza techniczna' },
              { icon: '⚡', title: 'Natychmiastowe odpowiedzi', desc: 'AI dostępny 24/7' }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass text-center transition-all hover:scale-105"
                style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h4 className="text-lg font-bold mb-2" style={{ color: '#FFFFFF' }}>
                  {feature.title}
                </h4>
                <p className="text-sm" style={{ color: '#808080' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
