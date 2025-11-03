
import React from 'react';

interface FooterProps {
  onInfoLinkClick: (title: string, content: React.ReactNode) => void;
}

const PlaceholderContent: React.FC<{title: string}> = ({ title }) => (
    <div>
        <p>Nội dung cho trang <strong>{title}</strong> hiện đang được cập nhật.</p>
        <p>Chúng tôi sẽ sớm cung cấp thông tin chi tiết. Cảm ơn bạn đã ghé thăm!</p>
    </div>
);


const Footer: React.FC<FooterProps> = ({ onInfoLinkClick }) => {
  return (
    <footer className="bg-gym-dark border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Hệ thống cửa hàng */}
          <div>
            <h3 className="text-lg font-bold text-gym-yellow uppercase mb-4">Hệ thống cửa hàng GymSup</h3>
            <ul className="space-y-3 text-sm text-gym-gray">
              <li><strong className="text-white">GYMSUP HÀ NỘI:</strong> 96A Đ. Trần Phú, P. Mộ Lao, Hà Đông, Hà Nội</li>
              <li><strong className="text-white">Hotline:</strong> 1800 6969</li>
              <li><strong className="text-white">Giờ mở cửa:</strong> 8:30 - 21:30 (T2-CN)</li>
            </ul>
          </div>

          {/* Hỗ trợ khách hàng */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2 text-sm text-gym-gray">
              <li><button onClick={() => onInfoLinkClick('Hướng dẫn thanh toán', <PlaceholderContent title="Hướng dẫn thanh toán" />)} className="hover:text-gym-yellow text-left">Hướng dẫn thanh toán</button></li>
              <li><button onClick={() => onInfoLinkClick('Chính sách khách hàng', <PlaceholderContent title="Chính sách khách hàng" />)} className="hover:text-gym-yellow text-left">Chính sách khách hàng</button></li>
              <li><button onClick={() => onInfoLinkClick('Tích điểm đổi quà', <PlaceholderContent title="Tích điểm đổi quà" />)} className="hover:text-gym-yellow text-left">Tích điểm đổi quà</button></li>
              <li><button onClick={() => onInfoLinkClick('So sánh sản phẩm', <PlaceholderContent title="So sánh sản phẩm" />)} className="hover:text-gym-yellow text-left">So sánh sản phẩm</button></li>
            </ul>
          </div>
          
          {/* Chính sách chung */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4">Chính sách chung</h3>
            <ul className="space-y-2 text-sm text-gym-gray">
              <li><button onClick={() => onInfoLinkClick('Chính sách đổi trả', <PlaceholderContent title="Chính sách đổi trả" />)} className="hover:text-gym-yellow text-left">Chính sách đổi trả</button></li>
              <li><button onClick={() => onInfoLinkClick('Chính sách vận chuyển', <PlaceholderContent title="Chính sách vận chuyển" />)} className="hover:text-gym-yellow text-left">Chính sách vận chuyển</button></li>
              <li><button onClick={() => onInfoLinkClick('Chính sách bảo mật', <PlaceholderContent title="Chính sách bảo mật" />)} className="hover:text-gym-yellow text-left">Chính sách bảo mật</button></li>
              <li><button onClick={() => onInfoLinkClick('Điều khoản sử dụng', <PlaceholderContent title="Điều khoản sử dụng" />)} className="hover:text-gym-yellow text-left">Điều khoản sử dụng</button></li>
            </ul>
          </div>

          {/* Giới thiệu */}
          <div>
            <h3 className="text-lg font-bold uppercase mb-4">Giới thiệu GymSup</h3>
            <ul className="space-y-2 text-sm text-gym-gray">
              <li><button onClick={() => onInfoLinkClick('Về chúng tôi', <PlaceholderContent title="Về chúng tôi" />)} className="hover:text-gym-yellow text-left">Về chúng tôi</button></li>
              <li><button onClick={() => onInfoLinkClick('Hệ thống cửa hàng', <PlaceholderContent title="Hệ thống cửa hàng" />)} className="hover:text-gym-yellow text-left">Hệ thống cửa hàng</button></li>
              <li><button onClick={() => onInfoLinkClick('Tuyển dụng', <PlaceholderContent title="Tuyển dụng" />)} className="hover:text-gym-yellow text-left">Tuyển dụng</button></li>
              <li><button onClick={() => onInfoLinkClick('Liên hệ', <PlaceholderContent title="Liên hệ" />)} className="hover:text-gym-yellow text-left">Liên hệ</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-center">
          <p className="text-sm text-gym-gray mb-4 md:mb-0">© Bản quyền thuộc về GYMSUP.</p>
          <div className="flex space-x-4">
            {/* Social Icons Placeholder */}
            <a href="#" className="text-gym-gray hover:text-gym-yellow">FB</a>
            <a href="#" className="text-gym-gray hover:text-gym-yellow">IG</a>
            <a href="#" className="text-gym-gray hover:text-gym-yellow">YT</a>
            <a href="#" className="text-gym-gray hover:text-gym-yellow">TT</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;