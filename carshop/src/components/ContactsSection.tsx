import React from 'react';
import { Phone, Mail, Instagram, MapPin, Clock, Globe } from 'lucide-react';

export function ContactsSection() {
  return (
    <section 
      id="contacts" 
      className="py-20 px-6"
      style={{ backgroundColor: '#F5F5DC' }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl text-center mb-4"
          style={{ color: '#3E2723', fontWeight: '700' }}
        >
          Skontaktuj się z nami
        </h2>
        <p 
          className="text-center mb-12 text-lg"
          style={{ color: '#5D4037' }}
        >
          Jesteśmy tutaj, aby odpowiedzieć na wszystkie Twoje pytania
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div 
              className="p-6 rounded-2xl"
              style={{ 
                backgroundColor: '#ffffff',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            >
              <h3 
                className="text-2xl mb-6"
                style={{ color: '#3E2723', fontWeight: '600' }}
              >
                Informacje kontaktowe
              </h3>

              <div className="space-y-4">
                {/* Phone */}
                <a
                  href="tel:+48123456789"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all group"
                  style={{ backgroundColor: '#FAF8F3' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#87CEEB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FAF8F3';
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#87CEEB' }}
                  >
                    <Phone size={20} style={{ color: '#3E2723' }} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#5D4037' }}>
                      Telefon
                    </p>
                    <p className="text-lg" style={{ color: '#3E2723', fontWeight: '600' }}>
                      +48 123 456 789
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:Gmail@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all group"
                  style={{ backgroundColor: '#FAF8F3' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#87CEEB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FAF8F3';
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#87CEEB' }}
                  >
                    <Mail size={20} style={{ color: '#3E2723' }} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#5D4037' }}>
                      Email
                    </p>
                    <p className="text-lg" style={{ color: '#3E2723', fontWeight: '600' }}>
                      Gmail@gmail.com
                    </p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all group"
                  style={{ backgroundColor: '#FAF8F3' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#87CEEB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FAF8F3';
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#87CEEB' }}
                  >
                    <Instagram size={20} style={{ color: '#3E2723' }} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#5D4037' }}>
                      Instagram
                    </p>
                    <p className="text-lg" style={{ color: '#3E2723', fontWeight: '600' }}>
                      @carmodification
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div 
              className="p-6 rounded-2xl"
              style={{ 
                backgroundColor: '#3E2723',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock size={24} style={{ color: '#87CEEB' }} />
                <h3 
                  className="text-xl"
                  style={{ color: '#ffffff', fontWeight: '600' }}
                >
                  Godziny pracy
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span style={{ color: '#F5F5DC' }}>Poniedziałek - Piątek:</span>
                  <span style={{ color: '#87CEEB', fontWeight: '600' }}>9:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#F5F5DC' }}>Sobota:</span>
                  <span style={{ color: '#87CEEB', fontWeight: '600' }}>10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#F5F5DC' }}>Niedziela:</span>
                  <span style={{ color: '#87CEEB', fontWeight: '600' }}>Zamknięte</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className="p-8 rounded-2xl"
            style={{ 
              backgroundColor: '#ffffff',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}
          >
            <h3 
              className="text-2xl mb-6"
              style={{ color: '#3E2723', fontWeight: '600' }}
            >
              Wyślij wiadomość
            </h3>

            <form className="space-y-4">
              <div>
                <label 
                  htmlFor="name"
                  className="block mb-2"
                  style={{ color: '#3E2723' }}
                >
                  Imię i nazwisko
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg outline-none transition-all"
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
                  placeholder="Jan Kowalski"
                />
              </div>

              <div>
                <label 
                  htmlFor="email"
                  className="block mb-2"
                  style={{ color: '#3E2723' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg outline-none transition-all"
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
                  placeholder="jan@example.com"
                />
              </div>

              <div>
                <label 
                  htmlFor="message"
                  className="block mb-2"
                  style={{ color: '#3E2723' }}
                >
                  Wiadomość
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg outline-none transition-all resize-none"
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
                  placeholder="Twoja wiadomość..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg transition-all transform hover:scale-105"
                style={{
                  backgroundColor: '#87CEEB',
                  color: '#3E2723',
                  fontWeight: '600',
                  boxShadow: '0 4px 20px rgba(135, 206, 235, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6BB6DD';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#87CEEB';
                }}
              >
                Wyślij wiadomość
              </button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t" style={{ borderColor: '#E8DCC4' }}>
              <div className="flex items-start gap-3">
                <Globe size={20} style={{ color: '#87CEEB' }} className="mt-1" />
                <div>
                  <p className="text-sm" style={{ color: '#5D4037' }}>
                    Dostawa części i usług na całym świecie przez UPS. Profesjonalna instalacja w autoryzowanych serwisach partnerskich.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
