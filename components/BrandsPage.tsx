import React from 'react';
import { Brand } from '../types';
import Breadcrumbs from './Breadcrumbs';

interface BrandsPageProps {
  brands: Brand[];
  onGoHome: () => void;
  onBrandSelect: (brandName: string) => void;
}

const BrandsPage: React.FC<BrandsPageProps> = ({ brands, onGoHome, onBrandSelect }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: 'Trang chủ', onClick: onGoHome }, { label: 'Thương hiệu' }]} />
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold uppercase text-white tracking-wider">Thương hiệu nổi bật</h1>
        <p className="text-gym-gray mt-2">Các thương hiệu thực phẩm bổ sung hàng đầu thế giới, được tin dùng bởi các vận động viên chuyên nghiệp.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map(brand => (
          <div 
            key={brand.id}
            onClick={() => onBrandSelect(brand.name)}
            className="bg-gym-dark p-6 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-gym-yellow/20 cursor-pointer"
          >
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="max-h-16 w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;