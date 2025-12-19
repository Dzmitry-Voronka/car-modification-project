import React, { useState } from 'react';
import { Package, CheckCircle, XCircle, Clock, Search, Calendar, AlertCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock' | 'pre-order';
  stockCount?: number;
  estimatedDelivery?: string;
}

const products: Product[] = [
  {
    id: 'felgi-19-racing',
    name: 'Felgi 19" Racing Carbon',
    category: 'Felgi',
    price: 25000,
    availability: 'in-stock',
    stockCount: 12
  },
  {
    id: 'carbon-aero-full',
    name: 'Full Carbon Aero Kit',
    category: 'Aerodynamika',
    price: 50000,
    availability: 'low-stock',
    stockCount: 3,
    estimatedDelivery: '2-3 dni'
  },
  {
    id: 'coilover-kw-v3',
    name: 'KW V3 Coilover Set',
    category: 'Zawieszenie',
    price: 25000,
    availability: 'out-of-stock',
    estimatedDelivery: '14-21 dni'
  },
  {
    id: 'spojler-gt3',
    name: 'Spojler GT3 RS Style',
    category: 'Aerodynamika',
    price: 15000,
    availability: 'in-stock',
    stockCount: 8
  },
  {
    id: 'wydech-akrapovic',
    name: 'Wydech Akrapovic Full System',
    category: 'Wydech',
    price: 35000,
    availability: 'pre-order',
    estimatedDelivery: '30-45 dni'
  },
  {
    id: 'felgi-20-premium',
    name: 'Felgi 20" Premium',
    category: 'Felgi',
    price: 30000,
    availability: 'in-stock',
    stockCount: 15
  },
  {
    id: 'interior-carbon',
    name: 'Carbon Interior Package',
    category: 'Wnętrze',
    price: 30000,
    availability: 'low-stock',
    stockCount: 2,
    estimatedDelivery: '5-7 dni'
  },
  {
    id: 'led-matrix',
    name: 'Matrix LED Lights',
    category: 'Światła',
    price: 15000,
    availability: 'in-stock',
    stockCount: 20
  },
];

export function CheckAvailabilitySection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterProducts();
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  React.useEffect(() => {
    filterProducts();
  }, [selectedCategory]);

  const getAvailabilityBadge = (product: Product) => {
    switch (product.availability) {
      case 'in-stock':
        return (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full glass" style={{ backgroundColor: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.3)' }}>
            <CheckCircle size={14} style={{ color: '#00FF88' }} />
            <span className="text-xs font-semibold" style={{ color: '#00FF88' }}>
              Na magazynie {product.stockCount && `(${product.stockCount})`}
            </span>
          </div>
        );
      case 'low-stock':
        return (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full glass" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)', border: '1px solid rgba(255, 193, 7, 0.3)' }}>
            <AlertCircle size={14} style={{ color: '#FFC107' }} />
            <span className="text-xs font-semibold" style={{ color: '#FFC107' }}>
              Mała ilość {product.stockCount && `(${product.stockCount})`}
            </span>
          </div>
        );
      case 'out-of-stock':
        return (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full glass" style={{ backgroundColor: 'rgba(255, 77, 141, 0.1)', border: '1px solid rgba(255, 77, 141, 0.3)' }}>
            <XCircle size={14} style={{ color: '#FF4D8D' }} />
            <span className="text-xs font-semibold" style={{ color: '#FF4D8D' }}>
              Brak na magazynie
            </span>
          </div>
        );
      case 'pre-order':
        return (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full glass" style={{ backgroundColor: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
            <Clock size={14} style={{ color: '#00D4FF' }} />
            <span className="text-xs font-semibold" style={{ color: '#00D4FF' }}>
              Zamówienie z wyprzedzeniem
            </span>
          </div>
        );
    }
  };

  return (
    <section 
      id="check-availability"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen"
    >
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, #2CE2F2 0%, transparent 70%)',
            top: '20%',
            right: '20%',
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FF4D8D 0%, transparent 70%)',
            bottom: '20%',
            left: '20%',
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
            Sprawdź dostępność
          </h2>
          <p className="text-xl" style={{ color: '#808080' }}>
            Sprawdź dostępność produktów w czasie rzeczywistym
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                size={20}
                style={{ color: '#808080' }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  filterProducts();
                }}
                placeholder="Szukaj produktu..."
                className="w-full pl-12 pr-6 py-4 rounded-xl glass outline-none transition-all"
                style={{
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '16px'
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
            </div>
          </form>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                style={{
                  background: selectedCategory === category
                    ? 'linear-gradient(135deg, #00D4FF 0%, #2CE2F2 100%)'
                    : 'rgba(255, 255, 255, 0.05)',
                  color: selectedCategory === category ? '#0A0A0A' : '#FFFFFF',
                  border: selectedCategory === category
                    ? 'none'
                    : '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {category === 'all' ? 'Wszystkie' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="glass-dark rounded-2xl p-6 transition-all hover:scale-[1.02]"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold flex-1" style={{ color: '#FFFFFF' }}>
                      {product.name}
                    </h3>
                    <Package size={20} style={{ color: '#00D4FF' }} />
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full glass" style={{ color: '#808080' }}>
                    {product.category}
                  </span>
                </div>

                {/* Availability Badge */}
                <div className="mb-4">
                  {getAvailabilityBadge(product)}
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-2xl font-bold gradient-text">
                    {product.price.toLocaleString('pl-PL')} PLN
                  </p>
                </div>

                {/* Delivery Info */}
                {product.estimatedDelivery && (
                  <div className="mb-4 p-3 rounded-lg glass" style={{ backgroundColor: 'rgba(0, 212, 255, 0.05)' }}>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} style={{ color: '#00D4FF' }} />
                      <span className="text-xs" style={{ color: '#808080' }}>
                        Szacowana dostawa: {product.estimatedDelivery}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <button
                  className="w-full py-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{
                    background: product.availability === 'in-stock' || product.availability === 'low-stock'
                      ? 'linear-gradient(135deg, #00D4FF 0%, #2CE2F2 100%)'
                      : 'rgba(255, 77, 141, 0.1)',
                    color: product.availability === 'in-stock' || product.availability === 'low-stock'
                      ? '#0A0A0A'
                      : '#FF4D8D',
                    border: product.availability === 'in-stock' || product.availability === 'low-stock'
                      ? 'none'
                      : '1px solid rgba(255, 77, 141, 0.3)'
                  }}
                  disabled={product.availability === 'out-of-stock'}
                >
                  {product.availability === 'in-stock' || product.availability === 'low-stock'
                    ? 'Dodaj do koszyka'
                    : product.availability === 'pre-order'
                    ? 'Zamów z wyprzedzeniem'
                    : 'Powiadom o dostępności'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search size={64} style={{ color: '#808080' }} className="mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
              Nie znaleziono produktów
            </h3>
            <p style={{ color: '#808080' }}>
              Spróbuj zmienić kryteria wyszukiwania
            </p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 glass-dark rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle size={24} style={{ color: '#00D4FF' }} className="flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#FFFFFF' }}>
                Informacje o dostępności
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: '#808080' }}>
                <li>• <strong style={{ color: '#00FF88' }}>Na magazynie</strong> - produkt dostępny do natychmiastowej wysyłki</li>
                <li>• <strong style={{ color: '#FFC107' }}>Mała ilość</strong> - produkt dostępny, ale w ograniczonej ilości</li>
                <li>• <strong style={{ color: '#FF4D8D' }}>Brak na magazynie</strong> - produkt niedostępny, możesz zapisać się na powiadomienie</li>
                <li>• <strong style={{ color: '#00D4FF' }}>Zamówienie z wyprzedzeniem</strong> - produkt dostępny na zamówienie</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

