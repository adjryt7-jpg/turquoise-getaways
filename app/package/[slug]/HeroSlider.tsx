'use client';
import { useState } from 'react';

export default function HeroSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full h-full relative group">
      <img 
        src={images[currentIndex]} 
        alt="Trip cover" 
        className="w-full h-full object-cover opacity-80 transition-all duration-500" 
      />
      
      {/* Manual Navigation Arrows (Only show if there are multiple images) */}
      {images.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 text-white w-14 h-14 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40 hover:scale-110 z-20 backdrop-blur-md"
          >
            <span className="text-2xl font-bold -ml-1">❮</span>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 text-white w-14 h-14 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40 hover:scale-110 z-20 backdrop-blur-md"
          >
            <span className="text-2xl font-bold -mr-1">❯</span>
          </button>
        </>
      )}
    </div>
  );
}