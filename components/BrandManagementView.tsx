import React from 'react';
import { Brand } from '../types';

const AddIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
);

interface BrandManagementViewProps {
    brands: Brand[];
    onToggleFeatured: (brandId: number) => void;
    onAddNew: () => void;
    onEdit: (brand: Brand) => void;
    onDelete: (brand: Brand) => void;
}

const BrandManagementView: React.FC<BrandManagementViewProps> = ({ brands, onToggleFeatured, onAddNew, onEdit, onDelete }) => {
    return (
        <>
            <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Quản lý thương hiệu</h1>
                    <p className="text-[var(--admin-text-secondary)] mt-1">Thêm, sửa, xóa và chọn các thương hiệu nổi bật trên trang chủ.</p>
                </div>
                 <button 
                    onClick={onAddNew}
                    className="bg-[var(--admin-button-bg)] text-[var(--admin-button-text)] font-bold py-2.5 px-5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                >
                    <AddIcon />
                    <span>Thêm thương hiệu mới</span>
                </button>
            </header>
            <div className="bg-[var(--admin-bg-card)] p-6 rounded-2xl shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-[var(--admin-text-secondary)] uppercase border-b border-[var(--admin-border-color)]">
                            <tr>
                                <th scope="col" className="px-6 py-3">Thương hiệu</th>
                                <th scope="col" className="px-6 py-3">Trạng thái</th>
                                <th scope="col" className="px-6 py-3 text-center">Nổi bật</th>
                                <th scope="col" className="px-6 py-3">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.map(brand => (
                                <tr key={brand.id} className="border-b border-[var(--admin-border-color)] hover:bg-[var(--admin-bg-hover)]">
                                    <td className="px-6 py-4 font-medium flex items-center space-x-4">
                                        <div className="h-10 w-24 flex items-center justify-center bg-white p-1 rounded">
                                            <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain"/>
                                        </div>
                                        <span>{brand.name}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${brand.isFeatured ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                            {brand.isFeatured ? 'Nổi bật' : 'Không nổi bật'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                checked={!!brand.isFeatured}
                                                onChange={() => onToggleFeatured(brand.id)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--admin-text-accent)]"></div>
                                        </label>
                                    </td>
                                     <td className="px-6 py-4 flex items-center space-x-3">
                                        <button onClick={() => onEdit(brand)} className="font-medium text-[var(--admin-text-accent)] hover:underline">Sửa</button>
                                        <button onClick={() => onDelete(brand)} className="font-medium text-red-500 hover:underline">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default BrandManagementView;
