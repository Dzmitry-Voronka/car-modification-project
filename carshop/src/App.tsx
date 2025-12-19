import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CartPanel, CartItem } from './components/CartPanel';
import { HeroSection3D } from './components/HeroSection3D';
import { ConfiguratorSection } from './components/ConfiguratorSection';
import { GallerySection3D } from './components/GallerySection3D';
import { AIAssistant } from './components/AIAssistant';
import { Footer } from './components/Footer';
import { CheckoutSection } from './components/CheckoutSection';
import { FindDealerSection } from './components/FindDealerSection';
import { CheckAvailabilitySection } from './components/CheckAvailabilitySection';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('carModCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('carModCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Listen for checkout event
  useEffect(() => {
    const handleShowCheckout = () => {
      setShowCheckout(true);
    };
    window.addEventListener('showCheckout', handleShowCheckout);
    return () => window.removeEventListener('showCheckout', handleShowCheckout);
  }, []);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(items => {
      const existingItem = items.find(i => i.id === item.id);
      if (existingItem) {
        return items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...items, item];
    });
  };

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#121212' }}>
      {/* Header */}
      <Header 
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Cart Panel */}
      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Main Content */}
      <main className="pt-20">
        {showCheckout ? (
          <CheckoutSection 
            cartItems={cartItems} 
            onBack={() => {
              setShowCheckout(false);
              window.location.href = '#hero';
            }} 
          />
        ) : (
          <>
            {/* Hero Section with 3D Viewer */}
            <HeroSection3D />

            {/* Live Configurator */}
            <ConfiguratorSection onAddToCart={handleAddToCart} />

            {/* Gallery with 3D Effects */}
            <GallerySection3D />

            {/* Find Dealer Section */}
            <FindDealerSection />

            {/* Check Availability Section */}
            <CheckAvailabilitySection />

            {/* AI Assistant */}
            <AIAssistant />

            {/* Footer with Contact */}
            <Footer />
          </>
        )}
      </main>

      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)',
            top: '10%',
            left: '-20%',
            animation: 'float 15s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FF4D8D 0%, transparent 70%)',
            top: '50%',
            right: '-10%',
            animation: 'float 20s ease-in-out infinite',
            animationDelay: '5s'
          }}
        />
        <div 
          className="absolute w-[700px] h-[700px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #2CE2F2 0%, transparent 70%)',
            bottom: '0%',
            left: '30%',
            animation: 'float 18s ease-in-out infinite',
            animationDelay: '10s'
          }}
        />
      </div>
    </div>
  );
}
