
import React from 'react';
// FIX: Add .ts extension to import.
import { KnowledgeArticle } from '../types.ts';
import Breadcrumbs from './Breadcrumbs.tsx';

interface KnowledgeBasePageProps {
  articles: KnowledgeArticle[];
  onArticleSelect: (articleId: number) => void;
  onBack: () => void;
}

const KnowledgeBasePage: React.FC<KnowledgeBasePageProps> = ({ articles, onArticleSelect, onBack }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: 'Trang chủ', onClick: onBack }, { label: 'Kiến thức' }]} />
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold uppercase text-white tracking-wider">Kiến thức Gym</h1>
        <p className="text-gym-gray mt-2">Tổng hợp các bài viết về dinh dưỡng, tập luyện và thực phẩm bổ sung.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <div
            key={article.id}
            onClick={() => onArticleSelect(article.id)}
            className="bg-gym-dark rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-gym-yellow/20 hover:-translate-y-1"
          >
            <div className="relative overflow-hidden">
              <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-5">
              <p className="text-xs font-bold text-gym-yellow uppercase">{article.category}</p>
              <h3 className="font-semibold text-white text-xl mt-1 mb-2 group-hover:text-gym-yellow transition-colors leading-tight">{article.title}</h3>
              <p className="text-sm text-gym-gray line-clamp-3">{article.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBasePage;
