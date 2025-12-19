import React, { useState } from 'react';
import { Eye, Heart, Share2 } from 'lucide-react';

const galleryItems = [
  {
    id: 1,
    title: 'BMW M4 Competition',
    description: 'Pełna modyfikacja Carbon',
    tags: ['Carbon', 'Obniżenie', 'Wydech'],
    image: 'https://images.unsplash.com/photo-1564730465543-e732e7fc9c10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBjYXIlMjB0dW5pbmd8ZW58MXx8fHwxNzY2MDk3NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 342,
  },
  {
    id: 2,
    title: 'Mercedes AMG GT R',
    description: 'Aerodynamika Racing',
    tags: ['Aero', 'Felgi 20"', 'Opony R'],
    image: 'https://images.unsplash.com/photo-1765607754385-61678dab1b94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXIlMjBtb2RpZmljYXRpb258ZW58MXx8fHwxNzY2MDk3NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 528,
  },
  {
    id: 3,
    title: 'Porsche 911 GT3',
    description: 'Track Edition',
    tags: ['Roll Cage', 'Bucket Seats', 'ECU'],
    image: 'https://images.unsplash.com/photo-1763165561886-a9391b2132c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjBzaG93cm9vbSUyMGRhcmt8ZW58MXx8fHwxNzY2MDk3NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 691,
  },
  {
    id: 4,
    title: 'Audi RS6 Avant',
    description: 'Pakiet Performance',
    tags: ['Stage 2', 'Wydech Akrapovic', 'Ceramika'],
    image: 'https://images.unsplash.com/photo-1581116536919-e906d33a4157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBpbnRlcmlvciUyMGN1c3RvbXxlbnwxfHx8fDE3NjYwOTc2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 445,
  },
  {
    id: 5,
    title: 'Tesla Model S Plaid',
    description: 'Elektryczny tuning',
    tags: ['Aero Kit', 'Felgi Forged', 'Wrap'],
    image: 'https://images.unsplash.com/photo-1635777076099-489c9b37ea3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUZXNsYSUyME1vZGVsJTIwUyUyMHN0dWRpb3xlbnwxfHx8fDE3NjYwOTczMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 389,
  },
  {
    id: 6,
    title: 'Lamborghini Huracán',
    description: 'Wide Body Liberty Walk',
    tags: ['Wide Body', 'Air Suspension', 'Wrap Chrome'],
    image: 'https://images.unsplash.com/photo-1764308060465-487a0b798f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXIlMjBzdHVkaW98ZW58MXx8fHwxNzY2MDk3MzE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    likes: 872,
  },
];

export function GallerySection3D() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const [itemLikes, setItemLikes] = useState<Record<number, number>>(
    galleryItems.reduce((acc, item) => {
      acc[item.id] = item.likes;
      return acc;
    }, {} as Record<number, number>)
  );

  const handleLike = (itemId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
        setItemLikes(prevLikes => ({
          ...prevLikes,
          [itemId]: prevLikes[itemId] - 1
        }));
      } else {
        newSet.add(itemId);
        setItemLikes(prevLikes => ({
          ...prevLikes,
          [itemId]: (prevLikes[itemId] || 0) + 1
        }));
      }
      return newSet;
    });
  };

  const handleShare = (item: typeof galleryItems[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = window.location.href.split('#')[0] + `#gallery-${item.id}`;
    const shareText = `Zobacz ten niesamowity projekt: ${item.title} - ${item.description}`;
    
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: shareText,
        url: shareUrl,
      }).catch(() => {
        // Fallback jeśli użytkownik anuluje
        copyToClipboard(shareUrl);
      });
    } else {
      // Fallback - kopiuj do schowka
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Pokaż powiadomienie
      const notification = document.createElement('div');
      notification.textContent = '✓ Link skopiowany do schowka!';
      notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00D4FF 0%, #2CE2F2 100%);
        color: #0A0A0A;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
        animation: slideIn 0.3s ease-out;
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, 2000);
    });
  };

  return (
    <section 
      id="gallery"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FF4D8D 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
            Galeria naszych prac
          </h2>
          <p className="text-xl" style={{ color: '#808080' }}>
            Inspiruj się najlepszymi projektami modyfikacji
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card container with tilt effect */}
              <div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  transform: hoveredCard === item.id 
                    ? 'translateY(-10px) rotateX(5deg) rotateY(5deg) scale(1.05)' 
                    : 'translateY(0) rotateX(0) rotateY(0) scale(1)',
                  transformStyle: 'preserve-3d',
                  boxShadow: hoveredCard === item.id
                    ? '0 25px 50px rgba(0, 212, 255, 0.3)'
                    : '0 10px 30px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                  style={{
                    transform: hoveredCard === item.id ? 'scale(1.1)' : 'scale(1)'
                  }}
                  onError={(e) => {
                    // Fallback do placeholder gdy obraz się nie załaduje
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%232a2a2a" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23808080" font-family="Arial" font-size="20"%3E🚗%3C/text%3E%3C/svg%3E';
                  }}
                />

                {/* Gradient overlay */}
                <div 
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(to top, rgba(10, 10, 10, 0.9) 0%, transparent 60%)',
                    opacity: hoveredCard === item.id ? 1 : 0.7
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  {/* Top: Action buttons */}
                  <div 
                    className="flex gap-2 justify-end transition-all duration-300"
                    style={{
                      opacity: hoveredCard === item.id ? 1 : 0,
                      transform: hoveredCard === item.id ? 'translateY(0)' : 'translateY(-20px)'
                    }}
                  >
                    <button 
                      onClick={(e) => handleLike(item.id, e)}
                      className="p-2 rounded-lg glass transition-all hover:scale-110 active:scale-95"
                      style={{ 
                        border: '1px solid rgba(255, 77, 141, 0.3)',
                        backgroundColor: likedItems.has(item.id) ? 'rgba(255, 77, 141, 0.2)' : 'transparent'
                      }}
                    >
                      <Heart 
                        size={18} 
                        style={{ color: '#FF4D8D' }}
                        fill={likedItems.has(item.id) ? '#FF4D8D' : 'none'}
                      />
                    </button>
                    <button 
                      onClick={(e) => handleShare(item, e)}
                      className="p-2 rounded-lg glass transition-all hover:scale-110 active:scale-95"
                      style={{ border: '1px solid rgba(0, 212, 255, 0.3)' }}
                    >
                      <Share2 size={18} style={{ color: '#00D4FF' }} />
                    </button>
                  </div>

                  {/* Bottom: Info */}
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: '#808080' }}>
                      {item.description}
                    </p>

                    {/* Tags */}
                    <div 
                      className="flex flex-wrap gap-2 mb-4 transition-all duration-300"
                      style={{
                        opacity: hoveredCard === item.id ? 1 : 0,
                        transform: hoveredCard === item.id ? 'translateY(0)' : 'translateY(20px)'
                      }}
                    >
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs glass"
                          style={{
                            color: '#00D4FF',
                            border: '1px solid rgba(0, 212, 255, 0.3)'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Eye size={16} style={{ color: '#808080' }} />
                        <span className="text-sm" style={{ color: '#808080' }}>
                          2.4k
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart 
                          size={16} 
                          style={{ color: '#FF4D8D' }}
                          fill={likedItems.has(item.id) ? '#FF4D8D' : 'none'}
                        />
                        <span className="text-sm" style={{ color: '#FF4D8D' }}>
                          {itemLikes[item.id] || item.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glowing border on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
                  style={{
                    border: '2px solid transparent',
                    borderImage: hoveredCard === item.id 
                      ? 'linear-gradient(135deg, #00D4FF, #FF4D8D) 1' 
                      : 'none',
                    opacity: hoveredCard === item.id ? 1 : 0
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button
            className="px-10 py-4 rounded-xl font-bold transition-all hover:scale-105"
            style={{
              background: 'rgba(0, 212, 255, 0.1)',
              color: '#00D4FF',
              border: '2px solid rgba(0, 212, 255, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0, 212, 255, 0.2)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Załaduj więcej projektów
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
