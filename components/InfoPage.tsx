import React from 'react';
import Breadcrumbs from './Breadcrumbs';

interface InfoPageProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

const InfoPage: React.FC<InfoPageProps> = ({ title, onBack, children }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: 'Trang chủ', onClick: onBack }, { label: title }]} />
      <div className="max-w-4xl mx-auto bg-gym-dark p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-white tracking-wider mb-6 border-b border-gray-700 pb-4">{title}</h1>
        <div className="text-gym-gray leading-relaxed space-y-4">
            {children}
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
