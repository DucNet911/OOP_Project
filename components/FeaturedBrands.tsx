
import React from 'react';
import { Brand } from '../types';

interface FeaturedBrandsProps {
  brands: Brand[];
  onBrandSelect: (brandName: string) => void;
}

const FeaturedBrands: React.FC<FeaturedBrandsProps> = ({ brands, onBrandSelect }) => {
  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold uppercase text-white tracking-wider">Thương hiệu nổi bật</h2>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {brands.map(brand => (
          <div 
            key={brand.id} 
            onClick={() => onBrandSelect(brand.name)}
            className="bg-gym-dark p-4 rounded-lg flex items-center justify-center transition-transform hover:-translate-y-1 cursor-pointer"
          >
            <img src={brand.logo} alt={brand.name} className="max-h-16 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBrands;