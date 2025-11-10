import React, { useState, useMemo } from 'react';
import { Brand, Product } from '../types';

const AddIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
);

interface BrandManagementViewProps {
    brands: Brand[];
    products: Product[];
    onAddNew: () => void;
    onUpdateProduct: (product: Product) => void;
}

const BrandManagementView: React.FC<BrandManagementViewProps> = ({ brands, products, onAddNew, onUpdateProduct }) => {
    const [selectedBrand, setSelectedBrand] = useState<string>('');

    const brandProducts = useMemo(() => {
        if (!selectedBrand) return [];
        return products.filter(p => p.brand === selectedBrand);
    }, [products, selectedBrand]);
    
    const handleRemoveProductFromBrand = (product: Product) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}" khỏi thương hiệu "${product.brand}"?`)) {
            onUpdateProduct({ ...product, brand: '' });
        }
    };
    
    const inputStyles = "w-full sm:w-72 bg-[var(--admin-bg-card)] border border-[var(--admin-border-color)] rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 ring-[var(--admin-text-accent)]";

    return (
        <>
            <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Quản lý thương hiệu</h1>
                    <p className="text-[var(--admin-text-secondary)] mt-1">Gán sản phẩm vào thương hiệu hoặc tạo thương hiệu mới.</p>
                </div>
                 <button 
                    onClick={onAddNew}
                    className="bg-[var(--admin-button-bg)] text-[var(--admin-button-text)] font-bold py-2.5 px-5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                >
                    <AddIcon />
                    <span>Gán sản phẩm / Thêm mới</span>
                </button>
            </header>
            <div className="bg-[var(--admin-bg-card)] p-6 rounded-2xl shadow-sm">
                <div className="mb-4">
                    <label htmlFor="brand-selector" className="block text-sm font-medium text-[var(--admin-text-secondary)] mb-1">Chọn thương hiệu để xem sản phẩm</label>
                    <select
                        id="brand-selector"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className={inputStyles}
                    >
                        <option value="">-- Chọn một thương hiệu --</option>
                        {brands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                    </select>
                </div>
                
                {selectedBrand && (
                    <div className="overflow-x-auto mt-6">
                        <h3 className="text-lg font-bold mb-4">Sản phẩm thuộc thương hiệu: <span className="text-[var(--admin-text-accent)]">{selectedBrand}</span></h3>
                        {brandProducts.length > 0 ? (
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-[var(--admin-text-secondary)] uppercase border-b border-[var(--admin-border-color)]">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Sản phẩm</th>
                                        <th scope="col" className="px-6 py-3">SKU</th>
                                        <th scope="col" className="px-6 py-3">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {brandProducts.map(product => (
                                        <tr key={product.id} className="border-b border-[var(--admin-border-color)] hover:bg-[var(--admin-bg-hover)]">
                                            <td className="px-6 py-4 font-medium flex items-center space-x-3">
                                                <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded-md object-cover"/>
                                                <span>{product.name}</span>
                                            </td>
                                            <td className="px-6 py-4 font-mono">{product.sku}</td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => handleRemoveProductFromBrand(product)} className="font-medium text-red-500 hover:underline">Xóa khỏi thương hiệu</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                             <p className="text-center text-[var(--admin-text-secondary)] py-8">Không có sản phẩm nào thuộc thương hiệu này.</p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default BrandManagementView;