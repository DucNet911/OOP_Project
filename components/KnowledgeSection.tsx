
import React from 'react';
import { Article } from '../types';
import ArticleCard from './ArticleCard';

interface KnowledgeSectionProps {
  supplementArticles: Article[];
  nutritionArticles: Article[];
  onViewAll: (categoryTitle: string) => void;
}

const KnowledgeSection: React.FC<KnowledgeSectionProps> = ({ supplementArticles, nutritionArticles, onViewAll }) => {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Supplement Knowledge */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold uppercase text-white">Kiến thức Supplement</h3>
            <a href="#" onClick={(e) => { e.preventDefault(); onViewAll('Kiến thức Supplement'); }} className="text-gym-yellow font-semibold hover:underline">Xem tất cả</a>
          </div>
          <div className="space-y-6">
            {supplementArticles.slice(0, 2).map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Nutrition Knowledge */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold uppercase text-white">Kiến thức Dinh dưỡng</h3>
            <a href="#" onClick={(e) => { e.preventDefault(); onViewAll('Kiến thức Dinh dưỡng'); }} className="text-gym-yellow font-semibold hover:underline">Xem tất cả</a>
          </div>
          <div className="space-y-6">
            {nutritionArticles.slice(0, 2).map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeSection;