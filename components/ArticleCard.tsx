import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="block bg-gym-dark rounded-lg overflow-hidden group h-full flex flex-col">
      <img src={article.image} alt={article.title} className="w-full h-40 object-cover group-hover:opacity-80 transition-opacity" />
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-gym-yellow font-semibold mb-1">{article.category}</p>
        <h3 className="font-bold text-white mb-2 h-12 overflow-hidden">{article.title}</h3>
        <p className="text-sm text-gym-gray mb-3 h-10 overflow-hidden">{article.snippet}</p>
        <span className="text-xs text-gray-500 mt-auto pt-2">{article.date}</span>
      </div>
    </a>
  );
};

export default ArticleCard;
