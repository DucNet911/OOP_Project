import React from 'react';
import { Article } from '../types';

const AddIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
);

interface KnowledgeManagementViewProps {
    supplementArticles: Article[];
    nutritionArticles: Article[];
    onEdit: (article: Article) => void;
    onDelete: (article: Article) => void;
    onAddNew: () => void;
}

const ArticleTable: React.FC<{title: string, articles: Article[], onEdit: (a: Article) => void, onDelete: (a: Article) => void}> = ({ title, articles, onEdit, onDelete }) => (
    <div className="bg-[var(--admin-bg-card)] p-6 rounded-2xl shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-[var(--admin-text-secondary)] uppercase border-b border-[var(--admin-border-color)]">
                    <tr>
                        <th scope="col" className="px-6 py-3">Tiêu đề</th>
                        <th scope="col" className="px-6 py-3">Mô tả</th>
                        <th scope="col" className="px-6 py-3">Ngày đăng</th>
                        <th scope="col" className="px-6 py-3">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article.id} className="border-b border-[var(--admin-border-color)] hover:bg-[var(--admin-bg-hover)]">
                            <td className="px-6 py-4 font-medium flex items-center space-x-3">
                                <img src={article.image} alt={article.title} className="w-16 h-10 rounded-md object-cover flex-shrink-0"/>
                                <span>{article.title}</span>
                            </td>
                            <td className="px-6 py-4 text-[var(--admin-text-secondary)] max-w-sm truncate" title={article.snippet}>{article.snippet}</td>
                            <td className="px-6 py-4">{article.date}</td>
                            <td className="px-6 py-4 flex items-center space-x-3">
                                <button onClick={() => onEdit(article)} className="font-medium text-[var(--admin-text-accent)] hover:underline">Sửa</button>
                                <button onClick={() => onDelete(article)} className="font-medium text-red-500 hover:underline">Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);


const KnowledgeManagementView: React.FC<KnowledgeManagementViewProps> = ({ supplementArticles, nutritionArticles, onEdit, onDelete, onAddNew }) => {
    return (
        <>
            <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">Quản lý kiến thức</h1>
                <button 
                    onClick={onAddNew}
                    className="bg-[var(--admin-button-bg)] text-[var(--admin-button-text)] font-bold py-2.5 px-5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                >
                    <AddIcon />
                    <span>Thêm kiến thức</span>
                </button>
            </header>

            <ArticleTable title="Kiến thức Supplement" articles={supplementArticles} onEdit={onEdit} onDelete={onDelete} />
            <ArticleTable title="Kiến thức Dinh dưỡng" articles={nutritionArticles} onEdit={onEdit} onDelete={onDelete} />
        </>
    );
};

export default KnowledgeManagementView;
