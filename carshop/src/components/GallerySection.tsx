import React from 'react';
import { Upload } from 'lucide-react';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1660680299167-28ee5175a6c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjB0dW5lZCUyMEJNV3xlbnwxfHx8fDE3NjYwOTYzODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Custom BMW M3',
    description: 'Pełna modyfikacja'
  },
  {
    url: 'https://images.unsplash.com/photo-1683798749503-7ca7224c433a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2RpZmllZCUyME1lcmNlZGVzJTIwQU1HfGVufDF8fHx8MTc2NjAzOTEyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Mercedes AMG GT',
    description: 'Sportowy tuning'
  },
  {
    url: 'https://images.unsplash.com/photo-1661515556930-776ded65be00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBQb3JzY2hlJTIwdHVuaW5nfGVufDF8fHx8MTc2NjA5NjM4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Porsche 911 Turbo',
    description: 'Aerodynamiczny kit'
  },
  {
    url: 'https://images.unsplash.com/photo-1661311928926-180711852306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGZXJyYXJpJTIwc3VwZXJjYXIlMjBsdXh1cnl8ZW58MXx8fHwxNzY2MDk2MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Ferrari 488',
    description: 'Wydajność premium'
  },
  {
    url: 'https://images.unsplash.com/photo-1765643025153-0e31ea8035c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMYW1ib3JnaGluaSUyMGN1c3RvbXxlbnwxfHx8fDE3NjYwOTYzODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Lamborghini Huracán',
    description: 'Agresywny design'
  },
  {
    url: 'https://images.unsplash.com/photo-1617704557258-635f239e9165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUZXNsYSUyMG1vZGlmaWVkJTIwZWxlY3RyaWN8ZW58MXx8fHwxNzY2MDk2MzgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Tesla Model S',
    description: 'Elektryczna przyszłość'
  },
  {
    url: 'https://images.unsplash.com/photo-1762028691705-dd369bfd7beb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBdWRpJTIwUlMlMjB0dW5pbmd8ZW58MXx8fHwxNzY2MDk2MzgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Audi RS6',
    description: 'Moc i styl'
  },
  {
    url: 'https://images.unsplash.com/photo-1743889292268-2e9f58a73fa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2RpZmllZCUyMHNwb3J0cyUyMGNhcnxlbnwxfHx8fDE3NjYwOTYzODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Supercar Elite',
    description: 'Luksusowy tuning'
  }
];

export function GallerySection() {
  return (
    <section 
      id="gallery" 
      className="py-20 px-6"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl text-center mb-4"
          style={{ color: '#3E2723', fontWeight: '700' }}
        >
          Galeria naszych modyfikacji
        </h2>
        <p 
          className="text-center mb-12 text-lg"
          style={{ color: '#5D4037' }}
        >
          Zobacz nasze najlepsze projekty i zainspiruj się
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105"
              style={{ 
                aspectRatio: '4/3',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              {/* Image */}
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${image.url})` }}
              />
              
              {/* Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                style={{ 
                  background: 'linear-gradient(to top, rgba(62, 39, 35, 0.9) 0%, transparent 100%)'
                }}
              >
                <h3 
                  className="text-lg mb-1"
                  style={{ color: '#ffffff', fontWeight: '600' }}
                >
                  {image.title}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: '#87CEEB' }}
                >
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Button */}
        <div className="text-center">
          <button 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg transition-all transform hover:scale-105"
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
            <Upload size={20} />
            <span>Prześlij swój projekt</span>
          </button>
        </div>
      </div>
    </section>
  );
}
