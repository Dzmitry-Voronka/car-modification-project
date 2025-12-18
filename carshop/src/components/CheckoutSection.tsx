import React, { useState, useEffect } from 'react';
import { CreditCard, MapPin, Truck, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { CartItem } from './CartPanel';

interface CheckoutSectionProps {
  cartItems: CartItem[];
  onBack: () => void;
}

export function CheckoutSection({ cartItems, onBack }: CheckoutSectionProps) {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Polska',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 50; // Koszt dostawy
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Walidacja podstawowa
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city) {
      alert('Proszę wypełnić wszystkie wymagane pola!');
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Walidacja karty
    if (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCVC) {
      alert('Proszę wypełnić wszystkie dane karty!');
      return;
    }
    // Symulacja płatności
    setTimeout(() => {
      setStep('confirmation');
      // Wyczyść koszyk po udanym zamówieniu
      localStorage.removeItem('carModCart');
    }, 1500);
  };

  if (step === 'confirmation') {
    return (
      <section 
        id="checkout"
        className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div 
            className="w-24 h-24 rounded-full glass flex items-center justify-center mx-auto mb-6"
            style={{
              border: '3px solid #00D4FF',
              boxShadow: '0 0 40px rgba(0, 212, 255, 0.5)'
            }}
          >
            <CheckCircle size={48} style={{ color: '#00D4FF' }} />
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
          >
            Zamówienie złożone!
          </h2>
          <p className="text-xl mb-8" style={{ color: '#808080' }}>
            Dziękujemy za zakup. Otrzymasz e-mail z potwierdzeniem i szczegółami dostawy.
          </p>
          <div className="glass rounded-2xl p-6 mb-6">
            <p className="text-sm mb-2" style={{ color: '#808080' }}>Numer zamówienia</p>
            <p className="text-2xl font-bold gradient-text">
              #{Date.now().toString().slice(-8)}
            </p>
          </div>
          <button
            onClick={() => {
              window.location.href = '#hero';
              onBack();
            }}
            className="px-10 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #00D4FF 0%, #2CE2F2 100%)',
              color: '#0A0A0A',
              boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)'
            }}
          >
            Powrót do strony głównej
          </button>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="checkout"
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-4 transition-all hover:scale-105"
            style={{ color: '#00D4FF' }}
          >
            <ArrowLeft size={20} />
            <span>Powrót</span>
          </button>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-2 gradient-text"
          >
            {step === 'shipping' ? 'Dane dostawy' : 'Płatność'}
          </h2>
          <p style={{ color: '#808080' }}>
            {step === 'shipping' 
              ? 'Wypełnij formularz, aby złożyć zamówienie'
              : 'Wprowadź dane karty płatniczej'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-dark rounded-3xl p-8">
              {step === 'shipping' ? (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                        Imię *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl glass outline-none transition-all"
                        style={{
                          color: '#FFFFFF',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#00D4FF';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                        Nazwisko *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl glass outline-none transition-all"
                        style={{
                          color: '#FFFFFF',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#00D4FF';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl glass outline-none transition-all"
                      style={{
                        color: '#FFFFFF',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00D4FF';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl glass outline-none transition-all"
                      style={{
                        color: '#FFFFFF',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00D4FF';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                      Adres *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl glass outline-none transition-all"
                      style={{
                        color: '#FFFFFF',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00D4FF';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                        Miasto *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl glass outline-none transition-all"
                        style={{
                          color: '#FFFFFF',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#00D4FF';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                        Kod pocztowy *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl glass outline-none transition-all"
                        style={{
                          color: '#FFFFFF',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#00D4FF';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                      Kraj
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl glass outline-none transition-all"
                      style={{
                        color: '#FFFFFF',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: 'rgba(26, 26, 26, 0.7)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00D4FF';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    >
                      <option value="Polska">Polska</option>
                      <option value="Niemcy">Niemcy</option>
                      <option value="Czechy">Czechy</option>
                      <option value="Słowacja">Słowacja</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #00D4FF 0%, #2CE2F2 100%)',
                      color: '#0A0A0A',
                      boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)'
                    }}
                  >
                    Przejdź do płatności
                  </button>
                </form>
              ) : (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="flex items-center gap-3 mb-6 p-4 rounded-xl glass" style={{ border: '1px solid rgba(0, 212, 255, 0.3)' }}>
                    <Lock size={20} style={{ color: '#00D4FF' }} />
                    <p className="text-sm" style={{ color: '#FFFFFF' }}>
                      Twoje dane są bezpieczne i szyfrowane
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                      Numer karty *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                      className="w-full px-4 py-3 rounded-xl glass outline-none transition-all"
                      style={{
                        color: '#FFFFFF',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00D4FF';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                      onInput={(e) => {
                        let value = (e.target as HTMLInputElement).value.replace(/\s/g, '');
                        value = value.match(/.{1,4}/g)?.join(' ') || value;
                        (e.target as HTMLInputElement).value = value;
                        setFormData(prev => ({ ...prev, cardNumber: value }));
                      }}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                      Imię i nazwisko na karcie *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl glass outline-none transition-all"
                      style={{
                        color: '#FFFFFF',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#00D4FF';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                        Ważność (MM/YY) *
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                        className="w-full px-4 py-3 rounded-xl glass outline-none transition-all"
                        style={{
                          color: '#FFFFFF',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#00D4FF';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                        onInput={(e) => {
                          let value = (e.target as HTMLInputElement).value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          (e.target as HTMLInputElement).value = value;
                          setFormData(prev => ({ ...prev, cardExpiry: value }));
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                        CVC *
                      </label>
                      <input
                        type="text"
                        name="cardCVC"
                        value={formData.cardCVC}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={3}
                        required
                        className="w-full px-4 py-3 rounded-xl glass outline-none transition-all"
                        style={{
                          color: '#FFFFFF',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#00D4FF';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                        onInput={(e) => {
                          (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/\D/g, '');
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-3"
                    style={{
                      background: 'linear-gradient(135deg, #FF4D8D 0%, #FF2E7A 100%)',
                      color: '#FFFFFF',
                      boxShadow: '0 0 30px rgba(255, 77, 141, 0.5)'
                    }}
                  >
                    <Lock size={20} />
                    Zapłać {total.toLocaleString('pl-PL')} PLN
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="glass-dark rounded-3xl p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6" style={{ color: '#FFFFFF' }}>
                Podsumowanie zamówienia
              </h3>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start pb-4 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="flex-1">
                      <p className="font-semibold text-sm" style={{ color: '#FFFFFF' }}>
                        {item.name}
                      </p>
                      <p className="text-xs" style={{ color: '#808080' }}>
                        Ilość: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold" style={{ color: '#00D4FF' }}>
                      {(item.price * item.quantity).toLocaleString('pl-PL')} PLN
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span style={{ color: '#808080' }}>Suma częściowa:</span>
                  <span style={{ color: '#FFFFFF' }}>{subtotal.toLocaleString('pl-PL')} PLN</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#808080' }}>Dostawa:</span>
                  <span style={{ color: '#FFFFFF' }}>{shipping.toLocaleString('pl-PL')} PLN</span>
                </div>
                <div 
                  className="flex justify-between text-xl font-bold pt-3 border-t"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <span className="gradient-text">Suma:</span>
                  <span style={{ color: '#00D4FF' }}>{total.toLocaleString('pl-PL')} PLN</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl glass mb-4" style={{ border: '1px solid rgba(0, 212, 255, 0.3)' }}>
                <Truck size={20} style={{ color: '#00D4FF' }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                    Dostawa UPS
                  </p>
                  <p className="text-xs" style={{ color: '#808080' }}>
                    3-7 dni roboczych
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl glass" style={{ border: '1px solid rgba(255, 77, 141, 0.3)' }}>
                <Lock size={20} style={{ color: '#FF4D8D' }} />
                <p className="text-xs" style={{ color: '#808080' }}>
                  Bezpieczna płatność SSL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

