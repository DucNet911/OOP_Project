import React from 'react';
import HeroSection from './HeroSection';
import TrendingProducts from './TrendingProducts';
import CategorySection from './CategorySection';
import KnowledgeSection from './KnowledgeSection';
import { Product, Article, Brand } from '../types';
import FeaturedBrands from './FeaturedBrands';

interface HomePageProps {
  products: Product[];
  featuredProducts: Product[];
  onProductSelect: (product: Product) => void;
  onCategorySelect: (category: string) => void;
  onViewAllKnowledge: (categoryTitle: string) => void;
  supplementArticles: Article[];
  nutritionArticles: Article[];
  featuredBrands: Brand[];
  onBrandSelect: (brandName: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, featuredProducts, onProductSelect, onCategorySelect, onViewAllKnowledge, supplementArticles, nutritionArticles, featuredBrands, onBrandSelect }) => {
  const trendingProducts = products.slice(0, 8);
  const wheyProducts = products.filter(p => p.category === 'Whey Protein').slice(0, 6);
  const strengthProducts = products.filter(p => p.category === 'Tăng sức mạnh').slice(0, 6);

  return (
    <>
      <HeroSection featuredProducts={featuredProducts} onProductSelect={onProductSelect} />
      <div className="container mx-auto px-4 space-y-16 py-12">
        <TrendingProducts products={trendingProducts} onProductSelect={onProductSelect} />
        <FeaturedBrands brands={featuredBrands} onBrandSelect={onBrandSelect} />
        <CategorySection 
          title="WHEY PROTEIN"
          categoryKey="Whey Protein"
          subCategories={['Whey Protein Blend', 'Whey Protein Isolate', 'Hydrolyzed Whey', 'Vegan Protein', 'Protein Bar']}
          products={wheyProducts}
          onProductSelect={onProductSelect}
          onCategorySelect={onCategorySelect}
        />
        <CategorySection 
          title="TĂNG SỨC MẠNH"
          categoryKey="Tăng sức mạnh"
          subCategories={['Pre-Workout', 'Creatine', 'BCAAs']}
          products={strengthProducts}
          onProductSelect={onProductSelect}
          onCategorySelect={onCategorySelect}
        />
        <KnowledgeSection 
          supplementArticles={supplementArticles}
          nutritionArticles={nutritionArticles}
          onViewAll={onViewAllKnowledge}
        />
      </div>
    </>
  );
};

export default HomePage;