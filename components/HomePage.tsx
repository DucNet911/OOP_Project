import React from 'react';
import HeroSection from './HeroSection';
import TrendingProducts from './TrendingProducts';
import CategorySection from './CategorySection';
import KnowledgeSection from './KnowledgeSection';
import { Product, Article } from '../types';

interface HomePageProps {
  products: Product[];
  featuredProducts: Product[];
  onProductSelect: (product: Product) => void;
  onCategorySelect: (category: string) => void;
  onViewAllKnowledge: (categoryTitle: string) => void;
  supplementArticles: Article[];
  nutritionArticles: Article[];
  onOpenQuickAddModal: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, featuredProducts, onProductSelect, onCategorySelect, onViewAllKnowledge, supplementArticles, nutritionArticles, onOpenQuickAddModal }) => {
  const trendingProducts = [...products]
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 12);
  const wheyProducts = products.filter(p => p.category === 'Whey Protein').slice(0, 6);
  const strengthProducts = products.filter(p => p.category === 'Tăng sức mạnh').slice(0, 6);
  const healthProducts = products.filter(p => p.category === 'Hỗ trợ sức khỏe').slice(0, 6);

  return (
    <>
      <HeroSection featuredProducts={featuredProducts} onProductSelect={onProductSelect} />
      <div className="container mx-auto px-4 space-y-16 py-12">
        <TrendingProducts products={trendingProducts} onProductSelect={onProductSelect} onOpenQuickAddModal={onOpenQuickAddModal} />
        <CategorySection 
          title="WHEY PROTEIN"
          categoryKey="Whey Protein"
          subCategories={['Whey Protein Blend', 'Whey Protein Isolate', 'Hydrolyzed Whey', 'Vegan Protein', 'Protein Bar']}
          products={wheyProducts}
          onProductSelect={onProductSelect}
          onCategorySelect={onCategorySelect}
          onOpenQuickAddModal={onOpenQuickAddModal}
        />
        <CategorySection 
          title="TĂNG SỨC MẠNH"
          categoryKey="Tăng sức mạnh"
          subCategories={['Pre-Workout', 'Creatine', 'BCAAs']}
          products={strengthProducts}
          onProductSelect={onProductSelect}
          onCategorySelect={onCategorySelect}
          onOpenQuickAddModal={onOpenQuickAddModal}
        />
        <CategorySection 
          title="HỖ TRỢ SỨC KHỎE"
          categoryKey="Hỗ trợ sức khỏe"
          subCategories={['Vitamin', 'Dầu cá & Omega 3', 'Hỗ trợ xương khớp']}
          products={healthProducts}
          onProductSelect={onProductSelect}
          onCategorySelect={onCategorySelect}
          onOpenQuickAddModal={onOpenQuickAddModal}
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
