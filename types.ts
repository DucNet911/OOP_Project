// FIX: Removed self-import of 'Product' which causes a conflict with the local declaration.
export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  images: string[]; // Changed from image to images
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  sold?: number;
  stockQuantity?: number;
  category: string;
  subCategory?: string;
  brand: string;
  inStock: boolean;
  description: string;
  sizes?: string[];
  flavors?: string[];
  productReviews?: Review[];
  isFeatured?: boolean;
}

export interface Brand {
  id: number;
  name: string;
  logo: string;
  isFeatured: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
  flavor?: string;
}

export interface Article {
  id: number;
  title: string;
  date: string;
  snippet: string;
  image: string;
  category: string;
  url: string;
}

export interface MegaMenuLink {
  label: string;
  href: string;
  category?: string;
}

export interface MegaMenuItem {
  title: string;
  links: MegaMenuLink[];
}

export interface NavLink {
  label: string;
  href: string;
  megaMenu?: MegaMenuItem[];
}

export type SortOptionValue = 'default' | 'popularity' | 'price-asc' | 'price-desc';

export interface SortOption {
  value: SortOptionValue;
  label: string;
}

export type Theme = 'default' | 'light' | 'black';

export interface User {
  name: string;
  role: 'customer' | 'admin';
}

export type OrderStatus = "Chờ xác nhận" | "Đang xử lý" | "Đang giao hàng" | "Hoàn thành" | "Đã Hủy" | "Trả hàng";
export type PaymentStatus = 'Chưa thanh toán' | 'Đã thanh toán';

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: CartItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  paymentStatus: PaymentStatus;
  paymentMethod: 'cod' | 'card';
}
