import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, Tag, Truck } from 'lucide-react';

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function CartPanel({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartPanelProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;
  const deliveryDays = 5; // UPS delivery estimation

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'tuning10') {
      setDiscount(0.1);
    } else if (promoCode.toLowerCase() === 'vip20') {
      setDiscount(0.2);
    } else {
      alert('Nieprawidłowy kod promocyjny');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with glassmorphism */}
      <div 
        className="fixed inset-0 z-50 glass-dark"
        onClick={onClose}
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}
      />

      {/* Cart Panel */}
      <div 
        className="fixed right-0 top-0 h-full w-full sm:w-[480px] z-50 glass-dark flex flex-col"
        style={{
          animation: 'slideInRight 0.3s ease-out',
          borderLeft: '1px solid rgba(0, 212, 255, 0.2)'
        }}
      >
        {/* Header */}
        <div 
          className="p-6 border-b"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold gradient-text">Koszyk</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg glass transition-all hover:scale-110"
              style={{ color: '#FF4D8D' }}
            >
              <X size={24} />
            </button>
          </div>
          <p style={{ color: '#808080' }}>
            {items.length} {items.length === 1 ? 'przedmiot' : 'przedmiotów'}
          </p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div 
                className="w-32 h-32 rounded-full glass flex items-center justify-center mb-4"
                style={{ border: '2px dashed rgba(0, 212, 255, 0.3)' }}
              >
                <ShoppingCart size={48} style={{ color: '#808080' }} />
              </div>
              <p style={{ color: '#808080' }}>Twój koszyk jest pusty</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="glass rounded-xl p-4 transition-all hover:scale-[1.02]"
                style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                <div className="flex gap-4">
                  {/* 3D Preview */}
                  <div 
                    className="w-20 h-20 rounded-lg glass flex items-center justify-center flex-shrink-0"
                    style={{
                      background: item.image 
                        ? `url(${item.image})` 
                        : 'linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(255, 77, 141, 0.2) 100%)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {!item.image && (
                      <div className="text-2xl">🚗</div>
                    )}
                  </div>

                  {/* Item details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                      {item.name}
                    </h4>
                    <p className="text-sm mb-2" style={{ color: '#808080' }}>
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold" style={{ color: '#00D4FF' }}>
                        {item.price.toLocaleString('pl-PL')} PLN
                      </p>
                      
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 rounded-lg glass flex items-center justify-center transition-all hover:scale-110"
                          style={{ color: '#00D4FF' }}
                        >
                          <Minus size={16} />
                        </button>
                        <span 
                          className="w-8 text-center font-bold mono"
                          style={{ color: '#FFFFFF' }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg glass flex items-center justify-center transition-all hover:scale-110"
                          style={{ color: '#00D4FF' }}
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="w-8 h-8 rounded-lg glass flex items-center justify-center transition-all hover:scale-110 ml-2"
                          style={{ color: '#FF4D8D' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer - Summary & Checkout */}
        {items.length > 0 && (
          <div 
            className="p-6 border-t space-y-4"
            style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            {/* Promo Code */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: '#808080' }}
                />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Kod promocyjny"
                  className="w-full pl-10 pr-4 py-3 rounded-lg glass outline-none transition-all"
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
              <button
                onClick={applyPromoCode}
                className="px-6 py-3 rounded-lg glass transition-all hover:scale-105"
                style={{
                  color: '#00D4FF',
                  border: '1px solid rgba(0, 212, 255, 0.3)'
                }}
              >
                Zastosuj
              </button>
            </div>

            {/* Delivery info */}
            <div className="flex items-center gap-3 p-3 rounded-lg glass">
              <Truck size={20} style={{ color: '#00D4FF' }} />
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#FFFFFF' }}>
                  Dostawa UPS
                </p>
                <p className="text-xs" style={{ color: '#808080' }}>
                  Szacowany czas: {deliveryDays} dni roboczych
                </p>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span style={{ color: '#808080' }}>Suma częściowa:</span>
                <span style={{ color: '#FFFFFF' }}>{subtotal.toLocaleString('pl-PL')} PLN</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between">
                  <span style={{ color: '#808080' }}>Rabat ({discount * 100}%):</span>
                  <span style={{ color: '#FF4D8D' }}>-{discountAmount.toLocaleString('pl-PL')} PLN</span>
                </div>
              )}
              <div 
                className="flex justify-between text-xl font-bold pt-2 border-t"
                style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <span className="gradient-text">Suma:</span>
                <span style={{ color: '#00D4FF' }}>{total.toLocaleString('pl-PL')} PLN</span>
              </div>
            </div>

            {/* Checkout button */}
            <button
              onClick={() => {
                onClose();
                // Użyj custom event do komunikacji z App
                window.dispatchEvent(new CustomEvent('showCheckout'));
              }}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #FF4D8D 0%, #FF2E7A 100%)',
                color: '#FFFFFF',
                boxShadow: '0 0 30px rgba(255, 77, 141, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 40px rgba(255, 77, 141, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 77, 141, 0.5)';
              }}
            >
              Przejdź do kasy
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

function ShoppingCart({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );
}
