import React from 'react';
import { Article } from '../types';
import Breadcrumbs from './Breadcrumbs';
import ArticleCard from './ArticleCard';

interface KnowledgeListPageProps {
  title: string;
  articles: Article[];
  onBack: () => void;
}

const KnowledgeListPage: React.FC<KnowledgeListPageProps> = ({ title, articles, onBack }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: 'Trang chủ', onClick: onBack }, { label: title }]} />
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold uppercase text-white tracking-wider">{title}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default KnowledgeListPage;
