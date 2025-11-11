import React, { useState, useEffect } from 'react';
import { Product, Brand } from '../types';

export interface ProductFormData {
    sku: string;
    name: string;
    originalPrice: number;
    discountPercentage: number;
    stockQuantity: number;
    images: string[];
    category: string;
    description: string;
    subCategory?: string;
    brand: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: ProductFormData) => void;
  onUpdateProduct: (product: ProductFormData) => void;
  productToEdit: Product | null;
  brands: Brand[];
}

const subCategoryMap: { [key: string]: string[] } = {
  "Whey Protein": [
    "Whey Protein Blend",
    "Whey Protein Isolate",
    "Hydrolyzed Whey",
    "Vegan Protein",
    "Protein Bar",
    "Meal Replacements",
  ],
  "Tăng sức mạnh": [
      "Pre-Workout",
      "Creatine",
      "BCAAs",
  ],
};

const RemoveIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);


const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAddProduct, onUpdateProduct, productToEdit, brands }) => {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [images, setImages] = useState<string[]>(['']);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const isEditMode = !!productToEdit;

  useEffect(() => {
    if (isOpen) {
        if (isEditMode && productToEdit) {
            setSku(productToEdit.sku || '');
            setName(productToEdit.name);
            setOriginalPrice(String(productToEdit.oldPrice || productToEdit.price));
            setDiscountPercentage(String(productToEdit.discountPercentage || ''));
            setStockQuantity(String(productToEdit.stockQuantity || 0));
            setImages(productToEdit.images.length > 0 ? productToEdit.images : ['']);
            setCategory(productToEdit.category);
            setSubCategory(productToEdit.subCategory || '');
            setBrand(productToEdit.brand || '');
            setDescription(productToEdit.description || '');
        } else {
            setSku('');
            setName('');
            setOriginalPrice('');
            setDiscountPercentage('');
            setStockQuantity('');
            setImages(['']);
            setCategory('');
            setSubCategory('');
            setBrand('');
            setDescription('');
        }
        setError('');
    }
  }, [isOpen, productToEdit, isEditMode]);

  useEffect(() => {
    // Reset subCategory when category changes
    setSubCategory('');
  }, [category]);

  if (!isOpen) {
    return null;
  }
  
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };
  
  const addImageField = () => {
    setImages([...images, '']);
  };
  
  const removeImageField = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!sku.trim()) { setError('SKU sản phẩm là bắt buộc.'); return; }
    if (!name.trim()) { setError('Tên sản phẩm là bắt buộc.'); return; }
    if (!originalPrice.trim()) { setError('Giá sản phẩm là bắt buộc.'); return; }
    const priceNum = parseFloat(originalPrice);
    if (isNaN(priceNum) || priceNum <= 0) { setError('Giá phải là một số dương hợp lệ.'); return; }
    
    const discountNum = discountPercentage ? parseFloat(discountPercentage) : 0;
    if (isNaN(discountNum) || discountNum < 0 || discountNum > 100) { setError('Giảm giá phải là số từ 0 đến 100.'); return; }

    if (!stockQuantity.trim()) { setError('Số lượng tồn kho là bắt buộc.'); return; }
    const stockNum = parseFloat(stockQuantity);
    if (isNaN(stockNum) || !Number.isInteger(stockNum) || stockNum < 0) { setError('Tồn kho phải là một số nguyên không âm.'); return; }
    
    const finalImages = images.map(img => img.trim()).filter(img => img !== '');
    if (finalImages.length === 0) { setError('Cần ít nhất một URL hình ảnh.'); return; }
    for (const imgUrl of finalImages) {
        try { new URL(imgUrl); } catch (_) { setError(`URL hình ảnh không hợp lệ: ${imgUrl}`); return; }
    }
    
    if (!category) { setError('Vui lòng chọn một danh mục sản phẩm.'); return; }
    if (!brand) { setError('Vui lòng chọn một thương hiệu.'); return; }
    if (!description.trim()) { setError('Mô tả sản phẩm là bắt buộc.'); return; }

    setError('');

    const productData: ProductFormData = {
      sku: sku.trim(),
      name: name.trim(),
      originalPrice: priceNum,
      discountPercentage: discountNum,
      stockQuantity: stockNum,
      images: finalImages,
      category: category,
      subCategory: subCategory,
      brand: brand,
      description: description.trim(),
    };

    if (isEditMode) {
        onUpdateProduct(productData);
    } else {
        onAddProduct(productData);
    }
  };
  
  const inputStyles = "w-full bg-[var(--admin-bg-hover)] border border-[var(--admin-border-color)] rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 ring-[var(--admin-text-accent)]";

  return (
    <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="bg-[var(--admin-bg-card)] rounded-2xl shadow-xl w-full max-w-lg p-8 overflow-y-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">{isEditMode ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Tên sản phẩm</label>
            <input type="text" id="productName" value={name} onChange={e => setName(e.target.value)} className={inputStyles} placeholder="ví dụ: Optimum Nutrition Gold Standard 100% Whey" />
          </div>
          <div>
              <label htmlFor="productSku" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">ID (SKU)</label>
              <input type="text" id="productSku" value={sku} onChange={e => setSku(e.target.value)} className={inputStyles} placeholder="ví dụ: ON-GSW-5LB" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="productCategory" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Danh mục</label>
              <select id="productCategory" value={category} onChange={e => setCategory(e.target.value)} className={inputStyles}>
                  <option value="" disabled>Chọn một danh mục</option>
                  <option value="Whey Protein">Whey Protein</option>
                  <option value="Tăng cân">Tăng cân</option>
                  <option value="Tăng sức mạnh">Tăng sức mạnh</option>
                  <option value="Hỗ trợ sức khỏe">Hỗ trợ sức khỏe</option>
                  <option value="Phụ kiện">Phụ kiện</option>
              </select>
            </div>
             <div>
                <label htmlFor="productBrand" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Thương hiệu</label>
                <select id="productBrand" value={brand} onChange={e => setBrand(e.target.value)} className={inputStyles}>
                    <option value="" disabled>Chọn một thương hiệu</option>
                    {brands.map(b => (
                        <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                </select>
            </div>
          </div>
          {subCategoryMap[category] && (
            <div>
              <label htmlFor="productSubCategory" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Loại</label>
              <select id="productSubCategory" value={subCategory} onChange={e => setSubCategory(e.target.value)} className={inputStyles}>
                <option value="">Chọn loại sản phẩm</option>
                {subCategoryMap[category].map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="productPrice" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Giá gốc (đ)</label>
              <input type="text" id="productPrice" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className={inputStyles} placeholder="ví dụ: 1850000" />
            </div>
            <div>
              <label htmlFor="productDiscount" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Giảm giá (%)</label>
              <input type="text" id="productDiscount" value={discountPercentage} onChange={e => setDiscountPercentage(e.target.value)} className={inputStyles} placeholder="ví dụ: 10"/>
            </div>
          </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="productStock" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Tồn kho</label>
              <input type="text" id="productStock" value={stockQuantity} onChange={e => setStockQuantity(e.target.value)} className={inputStyles} placeholder="ví dụ: 150"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-2">URL hình ảnh</label>
            <div className="space-y-2">
                {images.map((img, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={img}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            className={inputStyles}
                            placeholder={`https://example.com/image${index + 1}.png`}
                        />
                        {images.length > 1 && (
                            <button type="button" onClick={() => removeImageField(index)} className="p-2 text-red-500 hover:bg-[var(--admin-bg-hover)] rounded-md transition-colors" title="Xóa ảnh">
                                <RemoveIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button type="button" onClick={addImageField} className="mt-2 text-sm font-semibold text-[var(--admin-text-accent)] hover:underline">
                + Thêm hình ảnh
            </button>
          </div>
          <div>
            <label htmlFor="productDescription" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Mô tả</label>
            <textarea id="productDescription" value={description} onChange={e => setDescription(e.target.value)} rows={4} className={inputStyles} placeholder="Viết mô tả chi tiết cho sản phẩm..."></textarea>
          </div>
          
          {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}

          <div className="flex justify-end items-center space-x-4 pt-4">
            <button 
                type="button" 
                onClick={onClose}
                className="py-2 px-5 text-sm font-bold text-[var(--admin-text-secondary)] hover:text-[var(--admin-text-main)] transition-colors"
            >
              Hủy
            </button>
            <button 
                type="submit"
                className="bg-[var(--admin-button-bg)] text-[var(--admin-button-text)] font-bold py-2.5 px-6 rounded-lg hover:opacity-90 transition-opacity"
            >
              {isEditMode ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
