import React from 'react';
import { Phone, Mail, Instagram, Facebook, Twitter, MapPin, Clock, Truck } from 'lucide-react';

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      id="contact"
      className="relative pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Animated world map background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          {/* Simplified world map paths */}
          <path
            d="M 100 200 Q 150 180 200 200 L 250 180 L 300 200 L 350 190 L 400 210 L 450 190 L 500 200 L 550 180 L 600 200 L 650 190 L 700 200 L 750 180 L 800 200 L 850 190 L 900 200"
            stroke="#00D4FF"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="100"
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
          {/* Delivery routes animation */}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              r="3"
              fill="#FF4D8D"
              opacity="0.6"
            >
              <animateMotion
                dur="15s"
                repeatCount="indefinite"
                begin={`${i * 3}s`}
              >
                <mpath href="#deliveryPath" />
              </animateMotion>
            </circle>
          ))}
          <path
            id="deliveryPath"
            d="M 50 300 Q 250 250 450 300 T 850 300 T 950 350"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 48 48" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="24" r="20" stroke="url(#footerGrad1)" strokeWidth="2" fill="none"/>
                <circle cx="24" cy="24" r="14" stroke="#00D4FF" strokeWidth="1.5" fill="none"/>
                <circle cx="24" cy="24" r="4" fill="#FF4D8D"/>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 24 + Math.cos(rad) * 6;
                  const y1 = 24 + Math.sin(rad) * 6;
                  const x2 = 24 + Math.cos(rad) * 14;
                  const y2 = 24 + Math.sin(rad) * 14;
                  return (
                    <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#footerGrad2)" strokeWidth="1.5"/>
                  );
                })}
                <defs>
                  <linearGradient id="footerGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D4FF" />
                    <stop offset="100%" stopColor="#FF4D8D" />
                  </linearGradient>
                  <linearGradient id="footerGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00D4FF" />
                    <stop offset="100%" stopColor="#2CE2F2" />
                  </linearGradient>
                </defs>
              </svg>
              <div>
                <div className="gradient-text text-xl font-bold">
                  Car Modification
                </div>
                <div className="text-xs" style={{ color: '#808080' }}>
                  Make your own future on wheels
                </div>
              </div>
            </div>
            <p className="mb-6" style={{ color: '#808080' }}>
              Profesjonalna modyfikacja samochodów z wykorzystaniem najnowszych technologii 3D i AI. Tworzymy unikalne projekty dla pasjonatów motoryzacji.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, color: '#FF4D8D', href: 'https://instagram.com' },
                { Icon: Facebook, color: '#00D4FF', href: 'https://facebook.com' },
                { Icon: Twitter, color: '#2CE2F2', href: 'https://twitter.com' },
              ].map(({ Icon, color, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center transition-all hover:scale-110"
                  style={{ border: `1px solid ${color}33` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 20px ${color}66`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={18} style={{ color }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6" style={{ color: '#FFFFFF' }}>
              Szybkie linki
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Główna', id: 'hero' },
                { label: 'Konfigurator 3D', id: 'configurator' },
                { label: 'Galeria projektów', id: 'gallery' },
                { label: 'Asystent AI', id: 'ai-assistant' },
                { label: 'O nas', id: 'contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="transition-all group flex items-center gap-2"
                    style={{ color: '#808080' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#00D4FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#808080';
                    }}
                  >
                    <span className="w-0 h-0.5 group-hover:w-4 transition-all" style={{ backgroundColor: '#00D4FF' }} />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6" style={{ color: '#FFFFFF' }}>
              Kontakt
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+48123456789"
                  className="flex items-center gap-3 transition-all group"
                  style={{ color: '#808080' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00D4FF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#808080';
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center"
                    style={{ border: '1px solid rgba(0, 212, 255, 0.3)' }}
                  >
                    <Phone size={18} style={{ color: '#00D4FF' }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#808080' }}>Telefon</p>
                    <p className="font-semibold" style={{ color: 'inherit' }}>+48 123 456 789</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@carmod.pl"
                  className="flex items-center gap-3 transition-all group"
                  style={{ color: '#808080' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FF4D8D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#808080';
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center"
                    style={{ border: '1px solid rgba(255, 77, 141, 0.3)' }}
                  >
                    <Mail size={18} style={{ color: '#FF4D8D' }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#808080' }}>Email</p>
                    <p className="font-semibold" style={{ color: 'inherit' }}>contact@carmod.pl</p>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-3" style={{ color: '#808080' }}>
                <div 
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center"
                  style={{ border: '1px solid rgba(0, 212, 255, 0.3)' }}
                >
                  <MapPin size={18} style={{ color: '#00D4FF' }} />
                </div>
                <div>
                  <p className="text-xs" style={{ color: '#808080' }}>Adres</p>
                  <p className="font-semibold">Warszawa, Polska</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Working Hours & Delivery */}
          <div>
            <h4 className="text-lg font-bold mb-6" style={{ color: '#FFFFFF' }}>
              Godziny pracy
            </h4>
            <div className="glass rounded-xl p-4 mb-6" style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div className="flex items-center gap-3 mb-4">
                <Clock size={20} style={{ color: '#00D4FF' }} />
                <span style={{ color: '#FFFFFF' }}>Jesteśmy otwarci</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: '#808080' }}>Pn - Pt:</span>
                  <span style={{ color: '#00D4FF' }}>9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#808080' }}>Sobota:</span>
                  <span style={{ color: '#00D4FF' }}>10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#808080' }}>Niedziela:</span>
                  <span style={{ color: '#FF4D8D' }}>Zamknięte</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-4" style={{ border: '1px solid rgba(255, 77, 141, 0.1)' }}>
              <div className="flex items-center gap-3 mb-2">
                <Truck size={20} style={{ color: '#FF4D8D' }} />
                <span className="font-semibold" style={{ color: '#FFFFFF' }}>Dostawa UPS</span>
              </div>
              <p className="text-sm" style={{ color: '#808080' }}>
                Wysyłka na cały świat. Czas dostawy: 3-7 dni roboczych.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <p style={{ color: '#808080' }}>
            © 2023 Car Modification. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6">
            <button 
              className="text-sm transition-all"
              style={{ color: '#808080' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#00D4FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#808080';
              }}
            >
              Polityka prywatności
            </button>
            <button 
              className="text-sm transition-all"
              style={{ color: '#808080' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#00D4FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#808080';
              }}
            >
              Regulamin
            </button>
            <button 
              className="text-sm transition-all"
              style={{ color: '#808080' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#00D4FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#808080';
              }}
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
