import React, { useRef } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

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


interface TrendingProductsProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onOpenQuickAddModal: (product: Product) => void;
}

const TrendingProducts: React.FC<TrendingProductsProps> = ({ products, onProductSelect, onOpenQuickAddModal }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.offsetWidth;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-white tracking-wider">Sản phẩm <span className="text-gym-yellow">Trending</span></h2>
        <a href="#" className="text-gym-yellow font-semibold hover:underline">Xem tất cả</a>
      </div>

      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide -mx-2 md:-mx-3"
        >
          {products.map(product => (
            <div key={product.id} className="flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4 snap-start px-2 md:px-3">
              <ProductCard product={product} onProductSelect={onProductSelect} onOpenQuickAddModal={onOpenQuickAddModal} />
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
            onClick={() => scroll('left')}
            className="absolute top-1/2 left-0 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 -translate-x-1/2"
            aria-label="Previous products"
        >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
        </button>
        <button
            onClick={() => scroll('right')}
            className="absolute top-1/2 right-0 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 translate-x-1/2"
            aria-label="Next products"
        >
            <ChevronRightIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </section>
  );
};

export default TrendingProducts;