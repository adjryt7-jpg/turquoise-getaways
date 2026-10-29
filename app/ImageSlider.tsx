'use client';
import { useState, useEffect } from 'react';

export default function ImageSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 
    
    return () => clearInterval(interval);
  }, [images]);

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents the card link from clicking
    e.stopPropagation(); // Stops the click from bubbling up
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) {
    return <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold bg-gray-200">No Image</div>;
  }

  return (
    <div className="relative w-full h-full group">
      <img 
        src={images[currentIndex]} 
        alt="Trip preview" 
        className="w-full h-full object-cover transition-opacity duration-500" 
      />
      
      {/* Slider Arrows (Only show if there is more than 1 image) */}
      {images.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 hover:scale-110 z-20"
          >
            ❮
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 hover:scale-110 z-20"
          >
            ❯
          </button>
        </>
      )}
    </div>
  );
}