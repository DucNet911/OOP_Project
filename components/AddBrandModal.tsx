import React, { useState, useEffect } from 'react';
import { Brand, Product } from '../types';

const AddIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
);

interface AddBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  brands: Brand[];
  products: Product[];
  onAddBrand: (brand: Omit<Brand, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
}

const AddBrandModal: React.FC<AddBrandModalProps> = ({ isOpen, onClose, brands, products, onAddBrand, onUpdateProduct }) => {
  const [sku, setSku] = useState('');
  const [selectedBrandName, setSelectedBrandName] = useState('');
  const [showNewBrandForm, setShowNewBrandForm] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandLogo, setNewBrandLogo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSku('');
      setSelectedBrandName('');
      setShowNewBrandForm(false);
      setNewBrandName('');
      setNewBrandLogo('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const productToUpdate = products.find(p => p.sku.toLowerCase() === sku.trim().toLowerCase());
    if (!productToUpdate) {
      setError('Không tìm thấy sản phẩm với SKU đã nhập.');
      return;
    }

    let targetBrandName = '';

    if (showNewBrandForm) {
      if (!newBrandName.trim()) { setError('Tên thương hiệu mới là bắt buộc.'); return; }
      if (!newBrandLogo.trim()) { setError('URL logo mới là bắt buộc.'); return; }
      try { new URL(newBrandLogo.trim()); } catch (_) { setError('Vui lòng nhập URL logo hợp lệ.'); return; }
      
      targetBrandName = newBrandName.trim();
      onAddBrand({
        name: targetBrandName,
        logo: newBrandLogo.trim(),
        isFeatured: false,
      });

    } else {
      if (!selectedBrandName) { setError('Vui lòng chọn một thương hiệu.'); return; }
      targetBrandName = selectedBrandName;
    }

    onUpdateProduct({ ...productToUpdate, brand: targetBrandName });
    onClose();
  };
  
  const inputStyles = "w-full bg-[var(--admin-bg-hover)] border border-[var(--admin-border-color)] rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 ring-[var(--admin-text-accent)]";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div className="bg-[var(--admin-bg-card)] rounded-2xl shadow-xl w-full max-w-lg p-8" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6">Gán sản phẩm vào thương hiệu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="productSku" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">1. Nhập SKU sản phẩm</label>
            <input type="text" id="productSku" value={sku} onChange={e => setSku(e.target.value)} className={inputStyles} placeholder="ví dụ: ON-GSW-5LB" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">2. Chọn thương hiệu</label>
            <div className="flex items-center space-x-2">
                <select 
                    value={selectedBrandName} 
                    onChange={e => { setSelectedBrandName(e.target.value); setShowNewBrandForm(false); }} 
                    className={inputStyles}
                    disabled={showNewBrandForm}
                >
                    <option value="" disabled>Chọn thương hiệu có sẵn</option>
                    {brands.map(b => (
                        <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                </select>
                <button 
                    type="button" 
                    onClick={() => { setShowNewBrandForm(!showNewBrandForm); setSelectedBrandName(''); }}
                    className={`p-2.5 rounded-lg transition-colors ${showNewBrandForm ? 'bg-[var(--admin-text-accent)] text-[var(--admin-button-text)]' : 'bg-[var(--admin-bg-hover)]'}`}
                    title="Thêm thương hiệu mới"
                >
                    <AddIcon />
                </button>
            </div>
          </div>
          
          {showNewBrandForm && (
              <div className="space-y-4 p-4 border border-[var(--admin-border-color)] rounded-lg animate-fade-in">
                  <h3 className="font-semibold">Tạo thương hiệu mới</h3>
                  <div>
                    <label htmlFor="newBrandName" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Tên thương hiệu mới</label>
                    <input type="text" id="newBrandName" value={newBrandName} onChange={e => setNewBrandName(e.target.value)} className={inputStyles} />
                  </div>
                  <div>
                    <label htmlFor="newBrandLogo" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">URL Logo mới</label>
                    <input type="text" id="newBrandLogo" value={newBrandLogo} onChange={e => setNewBrandLogo(e.target.value)} className={inputStyles} />
                  </div>
              </div>
          )}

          {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}

          <div className="flex justify-end items-center space-x-4 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-5 text-sm font-bold text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-main)] transition-colors">Hủy</button>
            <button type="submit" className="bg-[var(--admin-button-bg)] text-[var(--admin-button-text)] font-bold py-2.5 px-6 rounded-lg hover:opacity-90 transition-opacity">
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrandModal;