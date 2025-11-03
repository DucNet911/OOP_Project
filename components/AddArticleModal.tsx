
import React, { useState, useEffect } from 'react';
// FIX: Add .ts extension to import.
import { KnowledgeArticle } from '../types.ts';

interface AddArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddArticle: (article: Omit<KnowledgeArticle, 'id' | 'content'>) => void;
  onUpdateArticle: (article: Omit<KnowledgeArticle, 'id' | 'content'>) => void;
  articleToEdit: Omit<KnowledgeArticle, 'content'> | null;
}

const AddArticleModal: React.FC<AddArticleModalProps> = ({ isOpen, onClose, onAddArticle, onUpdateArticle, articleToEdit }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [summary, setSummary] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const isEditMode = !!articleToEdit;

  useEffect(() => {
    if (isOpen) {
        if (isEditMode && articleToEdit) {
            setTitle(articleToEdit.title);
            setCategory(articleToEdit.category);
            setSummary(articleToEdit.summary);
            setImageUrl(articleToEdit.imageUrl);
        } else {
            setTitle('');
            setCategory('');
            setSummary('');
            setImageUrl('');
        }
        setError('');
    }
  }, [isOpen, articleToEdit, isEditMode]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Tiêu đề là bắt buộc.'); return; }
    if (!category.trim()) { setError('Danh mục là bắt buộc.'); return; }
    if (!summary.trim()) { setError('Tóm tắt là bắt buộc.'); return; }
    if (!imageUrl.trim()) { setError('URL hình ảnh là bắt buộc.'); return; }

    const articleData = { title, category, summary, imageUrl };
    if (isEditMode && articleToEdit) {
      onUpdateArticle({ ...articleToEdit, ...articleData });
    } else {
      onAddArticle(articleData);
    }
  };
  
  const inputStyles = "w-full bg-[var(--admin-bg-hover)] border border-[var(--admin-border-color)] rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 ring-[var(--admin-text-accent)]";

  return (
    <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="bg-[var(--admin-bg-card)] rounded-2xl shadow-xl w-full max-w-lg p-8"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">{isEditMode ? 'Sửa bài viết' : 'Thêm bài viết mới'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Tiêu đề</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputStyles} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Danh mục</label>
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} className={inputStyles} placeholder="ví dụ: Dinh dưỡng" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">URL hình ảnh</label>
            <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className={inputStyles} placeholder="https://example.com/image.png" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Tóm tắt</label>
            <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={3} className={inputStyles}></textarea>
          </div>
          
          {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}

          <div className="flex justify-end items-center space-x-4 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-5 text-sm font-bold">Hủy</button>
            <button type="submit" className="bg-[var(--admin-button-bg)] text-[var(--admin-button-text)] font-bold py-2.5 px-6 rounded-lg">
              {isEditMode ? 'Cập nhật' : 'Thêm bài viết'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticleModal;
