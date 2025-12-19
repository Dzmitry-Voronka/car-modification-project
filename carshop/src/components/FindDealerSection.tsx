import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Search, Star } from 'lucide-react';

interface Dealer {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  rating: number;
  distance: number;
  hours: string;
  services: string[];
  coordinates: { lat: number; lng: number };
}

const dealers: Dealer[] = [
  {
    id: 1,
    name: 'Car Mod Warszawa Centrum',
    address: 'ul. Marszałkowska 15',
    city: 'Warszawa',
    phone: '+48 22 123 4567',
    email: 'warszawa@carmod.pl',
    rating: 4.8,
    distance: 2.5,
    hours: 'Pn-Pt: 9:00-18:00, Sob: 10:00-16:00',
    services: ['Montaż', 'Diagnostyka', 'Tuning', 'Serwis'],
    coordinates: { lat: 52.2297, lng: 21.0122 }
  },
  {
    id: 2,
    name: 'Car Mod Kraków',
    address: 'ul. Floriańska 45',
    city: 'Kraków',
    phone: '+48 12 345 6789',
    email: 'krakow@carmod.pl',
    rating: 4.9,
    distance: 5.2,
    hours: 'Pn-Pt: 9:00-18:00, Sob: 10:00-16:00',
    services: ['Montaż', 'Tuning', 'Wrapping', 'Felgi'],
    coordinates: { lat: 50.0647, lng: 19.9450 }
  },
  {
    id: 3,
    name: 'Car Mod Wrocław',
    address: 'ul. Świdnicka 12',
    city: 'Wrocław',
    phone: '+48 71 234 5678',
    email: 'wroclaw@carmod.pl',
    rating: 4.7,
    distance: 8.1,
    hours: 'Pn-Pt: 9:00-18:00, Sob: 10:00-16:00',
    services: ['Montaż', 'Serwis', 'Diagnostyka', 'Carbon'],
    coordinates: { lat: 51.1079, lng: 17.0385 }
  },
  {
    id: 4,
    name: 'Car Mod Gdańsk',
    address: 'ul. Długa 28',
    city: 'Gdańsk',
    phone: '+48 58 345 6789',
    email: 'gdansk@carmod.pl',
    rating: 4.6,
    distance: 12.3,
    hours: 'Pn-Pt: 9:00-18:00, Sob: 10:00-16:00',
    services: ['Montaż', 'Tuning', 'Aero', 'Wydech'],
    coordinates: { lat: 54.3520, lng: 18.6466 }
  },
];

export function FindDealerSection() {
  const [searchCity, setSearchCity] = useState('');
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [filteredDealers, setFilteredDealers] = useState(dealers);

  // Automatyczne filtrowanie przy zmianie tekstu
  React.useEffect(() => {
    if (searchCity.trim()) {
      const filtered = dealers.filter(dealer =>
        dealer.city.toLowerCase().includes(searchCity.toLowerCase()) ||
        dealer.name.toLowerCase().includes(searchCity.toLowerCase())
      );
      setFilteredDealers(filtered.length > 0 ? filtered : dealers);
    } else {
      setFilteredDealers(dealers);
    }
  }, [searchCity]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtrowanie już działa przez useEffect, więc tylko zapobiegamy domyślnemu zachowaniu
  };

  const handleGetDirections = (dealer: Dealer) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${dealer.coordinates.lat},${dealer.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <section 
      id="find-dealer"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)',
            top: '10%',
            left: '10%',
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FF4D8D 0%, transparent 70%)',
            bottom: '10%',
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
            Znajdź dealera
          </h2>
          <p className="text-xl" style={{ color: '#808080' }}>
            Znajdź najbliższego dealera w Twojej okolicy
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                size={20}
                style={{ color: '#808080' }}
              />
              <input
                type="text"
                value={searchCity}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchCity(value);
                }}
                placeholder="Wpisz miasto lub nazwę dealera..."
                className="w-full pl-12 pr-32 py-4 rounded-xl glass outline-none transition-all"
                style={{
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '16px',
                  backgroundColor: 'rgba(26, 26, 26, 0.7)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#00D4FF';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
                  e.currentTarget.style.backgroundColor = 'rgba(26, 26, 26, 0.9)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.backgroundColor = 'rgba(26, 26, 26, 0.7)';
                }}
              />
            </div>
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-lg font-bold transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #00D4FF 0%, #2CE2F2 100%)',
                color: '#0A0A0A'
              }}
            >
              Szukaj
            </button>
          </form>
        </div>

        {/* Dealers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDealers.map((dealer) => (
            <div
              key={dealer.id}
              className="glass-dark rounded-2xl p-6 transition-all hover:scale-[1.02] cursor-pointer"
              style={{
                border: selectedDealer?.id === dealer.id 
                  ? '2px solid #00D4FF' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: selectedDealer?.id === dealer.id
                  ? '0 0 30px rgba(0, 212, 255, 0.3)'
                  : 'none'
              }}
              onClick={() => setSelectedDealer(selectedDealer?.id === dealer.id ? null : dealer)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
                    {dealer.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} style={{ color: '#00D4FF' }} />
                    <span className="text-sm" style={{ color: '#808080' }}>
                      {dealer.address}, {dealer.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star size={16} style={{ color: '#FFD700' }} fill="#FFD700" />
                      <span className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                        {dealer.rating}
                      </span>
                    </div>
                    <span className="text-sm" style={{ color: '#808080' }}>
                      {dealer.distance} km
                    </span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="mb-4">
                <p className="text-xs mb-2 uppercase tracking-wider" style={{ color: '#808080' }}>
                  Usługi
                </p>
                <div className="flex flex-wrap gap-2">
                  {dealer.services.map((service, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs glass"
                      style={{
                        color: '#00D4FF',
                        border: '1px solid rgba(0, 212, 255, 0.3)'
                      }}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3">
                  <Phone size={16} style={{ color: '#00D4FF' }} />
                  <a 
                    href={`tel:${dealer.phone}`}
                    className="text-sm transition-all hover:text-cyan-400"
                    style={{ color: '#FFFFFF' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {dealer.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} style={{ color: '#FF4D8D' }} />
                  <a 
                    href={`mailto:${dealer.email}`}
                    className="text-sm transition-all hover:text-pink-400"
                    style={{ color: '#FFFFFF' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {dealer.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} style={{ color: '#2CE2F2' }} />
                  <span className="text-sm" style={{ color: '#808080' }}>
                    {dealer.hours}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGetDirections(dealer);
                  }}
                  className="flex-1 py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #00D4FF 0%, #2CE2F2 100%)',
                    color: '#0A0A0A'
                  }}
                >
                  <Navigation size={18} />
                  Nawigacja
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `tel:${dealer.phone}`;
                  }}
                  className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255, 77, 141, 0.1)',
                    color: '#FF4D8D',
                    border: '1px solid rgba(255, 77, 141, 0.3)'
                  }}
                >
                  <Phone size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 glass-dark rounded-2xl p-8 text-center">
          <MapPin size={48} style={{ color: '#00D4FF' }} className="mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
            Mapa wszystkich dealerów
          </h3>
          <p className="mb-6" style={{ color: '#808080' }}>
            Kliknij na dealera powyżej, aby zobaczyć szczegóły i uzyskać nawigację
          </p>
          <button
            onClick={() => window.open('https://www.google.com/maps/search/car+modification+poland', '_blank')}
            className="px-8 py-4 rounded-xl font-bold transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #FF4D8D 0%, #FF2E7A 100%)',
              color: '#FFFFFF'
            }}
          >
            Otwórz w Google Maps
          </button>
        </div>
      </div>
    </section>
  );
}

