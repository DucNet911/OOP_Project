import React, { useState, useEffect } from 'react';
import { Article } from '../types';

export interface ArticleFormData {
    title: string;
    url: string;
    snippet: string;
    image: string;
    category: 'Kiến thức Supplement' | 'Kiến thức Dinh dưỡng' | '';
}

interface AddKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddArticle: (article: Omit<Article, 'id' | 'date'>) => void;
  onUpdateArticle: (article: Article) => void;
  articleToEdit: Article | null;
}

const AddKnowledgeModal: React.FC<AddKnowledgeModalProps> = ({ isOpen, onClose, onAddArticle, onUpdateArticle, articleToEdit }) => {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '', url: '', snippet: '', image: '', category: ''
  });
  const [error, setError] = useState('');

  const isEditMode = !!articleToEdit;

  useEffect(() => {
    if (isOpen) {
        if (isEditMode && articleToEdit) {
            setFormData({
                title: articleToEdit.title,
                url: articleToEdit.url,
                snippet: articleToEdit.snippet,
                image: articleToEdit.image,
                category: articleToEdit.category as ArticleFormData['category'],
            });
        } else {
            setFormData({ title: '', url: '', snippet: '', image: '', category: '' });
        }
        setError('');
    }
  }, [isOpen, articleToEdit, isEditMode]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) { setError('Tiêu đề là bắt buộc.'); return; }
    if (!formData.url.trim()) { setError('URL là bắt buộc.'); return; }
    if (!formData.snippet.trim()) { setError('Mô tả là bắt buộc.'); return; }
    if (!formData.image.trim()) { setError('URL hình ảnh là bắt buộc.'); return; }
    if (!formData.category) { setError('Vui lòng chọn một danh mục.'); return; }
    setError('');

    const articleData = {
        ...formData,
        title: formData.title.trim(),
        url: formData.url.trim(),
        snippet: formData.snippet.trim(),
        image: formData.image.trim(),
    };

    if (isEditMode && articleToEdit) {
        onUpdateArticle({ ...articleToEdit, ...articleData });
    } else {
        onAddArticle(articleData);
    }
    onClose();
  };
  
  const inputStyles = "w-full bg-[var(--admin-bg-hover)] border border-[var(--admin-border-color)] rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 ring-[var(--admin-text-accent)]";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div className="bg-[var(--admin-bg-card)] rounded-2xl shadow-xl w-full max-w-lg p-8" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6">{isEditMode ? 'Sửa bài viết' : 'Thêm kiến thức'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Tiêu đề</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className={inputStyles} placeholder="ví dụ: Whey Protein là gì?" />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Danh mục</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} className={inputStyles}>
                <option value="" disabled>Chọn một danh mục</option>
                <option value="Kiến thức Supplement">Kiến thức Supplement</option>
                <option value="Kiến thức Dinh dưỡng">Kiến thức Dinh dưỡng</option>
            </select>
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Đường link</label>
            <input type="text" id="url" name="url" value={formData.url} onChange={handleChange} className={inputStyles} placeholder="https://example.com/article-link" />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Ảnh mô tả</label>
            <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} className={inputStyles} placeholder="https://example.com/image.png" />
          </div>
          <div>
            <label htmlFor="snippet" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Mô tả</label>
            <textarea id="snippet" name="snippet" value={formData.snippet} onChange={handleChange} rows={3} className={inputStyles} placeholder="Viết mô tả ngắn..."></textarea>
          </div>
          
          {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}

          <div className="flex justify-end items-center space-x-4 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-5 text-sm font-bold text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-main)] transition-colors">Hủy</button>
            <button type="submit" className="bg-[var(--admin-button-bg)] text-[var(--admin-button-text)] font-bold py-2.5 px-6 rounded-lg hover:opacity-90 transition-opacity">
              {isEditMode ? 'Cập nhật' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKnowledgeModal;
