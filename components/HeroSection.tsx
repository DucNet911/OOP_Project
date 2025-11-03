import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';

// Icons
const ChevronLeftIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);
const ChevronRightIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

interface HeroSectionProps {
  featuredProducts: Product[];
  onProductSelect: (product: Product) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ featuredProducts, onProductSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    if (featuredProducts.length > 1) {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? featuredProducts.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }
  };

  const goToNext = useCallback(() => {
    if (featuredProducts.length > 1) {
        const isLastSlide = currentIndex === featuredProducts.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }
  }, [currentIndex, featuredProducts.length]);

  useEffect(() => {
    if (featuredProducts.length > 1) {
      const slider = setTimeout(goToNext, 4000);
      return () => clearTimeout(slider);
    }
  }, [currentIndex, goToNext, featuredProducts.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  
  if (featuredProducts.length === 0) {
      return (
        <section className="w-full h-[300px] md:h-[500px] bg-cover bg-center bg-gym-dark flex items-center justify-center">
            <p className="text-gym-gray">Chưa có sản phẩm quảng cáo nào được chọn.</p>
        </section>
      );
  }

  const currentProduct = featuredProducts[currentIndex];

  return (
    <section className="relative w-full h-[300px] md:h-[500px] group overflow-hidden">
        {/* Slides */}
        <div 
          className="w-full h-full bg-cover bg-center transition-opacity duration-1000"
          key={currentIndex}
          style={{ backgroundImage: `url(${currentProduct.images[0]})` }}
        >
            <div className="w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-center p-4">
                <div className="text-white max-w-2xl animate-fade-in">
                    <p className="text-gym-yellow font-bold uppercase tracking-widest mb-2">{currentProduct.brand}</p>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">{currentProduct.name}</h1>
                    <button 
                        onClick={() => onProductSelect(currentProduct)}
                        className="bg-gym-yellow text-gym-darker font-bold py-3 px-8 rounded-md hover:bg-yellow-300 transition-colors mt-4 text-lg"
                    >
                        Xem Ngay
                    </button>
                </div>
            </div>
        </div>
      
        {/* Navigation Arrows */}
        {featuredProducts.length > 1 && (
            <>
                <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-5 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Previous slide"
                >
                    <ChevronLeftIcon className="h-6 w-6 text-white" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-5 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                    aria-label="Next slide"
                >
                    <ChevronRightIcon className="h-6 w-6 text-white" />
                </button>
            </>
        )}
      
        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
            {featuredProducts.map((_, slideIndex) => (
                <button
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className={`w-3 h-3 rounded-full transition-colors ${currentIndex === slideIndex ? 'bg-gym-yellow' : 'bg-white/50 hover:bg-white/80'}`}
                    aria-label={`Go to slide ${slideIndex + 1}`}
                ></button>
            ))}
        </div>
    </section>
  );
};

export default HeroSection;