import React, { useState, useEffect } from 'react';
import { Brand } from '../types';

interface AddBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBrand: (brand: Omit<Brand, 'id'>) => void;
  onUpdateBrand: (brand: Brand) => void;
  brandToEdit: Brand | null;
}

const AddBrandModal: React.FC<AddBrandModalProps> = ({ isOpen, onClose, onAddBrand, onUpdateBrand, brandToEdit }) => {
  const [name, setName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [error, setError] = useState('');

  const isEditMode = !!brandToEdit;

  useEffect(() => {
    if (isOpen) {
        if (isEditMode && brandToEdit) {
            setName(brandToEdit.name);
            setLogoUrl(brandToEdit.logo);
        } else {
            setName('');
            setLogoUrl('');
        }
        setError('');
    }
  }, [isOpen, brandToEdit, isEditMode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) { setError('Tên thương hiệu là bắt buộc.'); return; }
    if (!logoUrl.trim()) { setError('URL logo là bắt buộc.'); return; }
    try { new URL(logoUrl.trim()); } catch (_) { setError('Vui lòng nhập URL logo hợp lệ.'); return; }

    setError('');

    const brandData = {
      name: name.trim(),
      logo: logoUrl.trim(),
    };

    if (isEditMode && brandToEdit) {
        onUpdateBrand({ ...brandToEdit, ...brandData });
    } else {
        onAddBrand({ ...brandData, isFeatured: false });
    }
    onClose();
  };
  
  const inputStyles = "w-full bg-[var(--admin-bg-hover)] border border-[var(--admin-border-color)] rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 ring-[var(--admin-text-accent)]";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div className="bg-[var(--admin-bg-card)] rounded-2xl shadow-xl w-full max-w-lg p-8" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6">{isEditMode ? 'Sửa thương hiệu' : 'Thêm thương hiệu mới'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="brandName" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Tên thương hiệu</label>
            <input type="text" id="brandName" value={name} onChange={e => setName(e.target.value)} className={inputStyles} placeholder="ví dụ: Optimum Nutrition" />
          </div>
          <div>
            <label htmlFor="logoUrl" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">URL Logo</label>
            <input type="text" id="logoUrl" value={logoUrl} onChange={e => setLogoUrl(e.target.value)} className={inputStyles} placeholder="https://example.com/logo.png" />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}

          <div className="flex justify-end items-center space-x-4 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-5 text-sm font-bold text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-main)] transition-colors">Hủy</button>
            <button type="submit" className="bg-[var(--admin-button-bg)] text-[var(--admin-button-text)] font-bold py-2.5 px-6 rounded-lg hover:opacity-90 transition-opacity">
              {isEditMode ? 'Cập nhật' : 'Thêm thương hiệu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrandModal;
