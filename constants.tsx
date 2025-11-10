import React from 'react';
import { Product, Article, NavLink, SortOption, Brand } from './types';

// FIX: Added SVG icon components that were missing.
export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);

export const HeartIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const ResetIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-11.664 0a8.25 8.25 0 0111.664 0m-11.664 0l-3.181 3.183A8.25 8.25 0 012.985 19.644l3.181-3.183m0 0l-3.181-3.183a8.25 8.25 0 0111.664 0l3.181 3.183" />
    </svg>
);

// FIX: Added navLinks data.
export const navLinks: NavLink[] = [
    {
      label: "Trang chủ",
      href: "#",
    },
    {
      label: "Whey Protein",
      href: "#",
      megaMenu: [
        {
          title: "Tăng cơ",
          links: [
            { label: "Whey Protein Blend", href: "#", category: "Whey Protein Blend" },
            { label: "Whey Protein Isolate", href: "#", category: "Whey Protein Isolate" },
            { label: "Hydrolyzed Whey", href: "#", category: "Hydrolyzed Whey" },
            { label: "Vegan Protein", href: "#", category: "Vegan Protein" },
          ],
        },
        {
          title: "Dạng sản phẩm",
          links: [
              { label: "Protein Bar", href: "#", category: "Protein Bar" },
              { label: "Meal Replacements", href: "#", category: "Meal Replacements" },
          ],
        },
      ],
    },
    {
      label: "Tăng cân",
      href: "#",
    },
    {
      label: "Tăng sức mạnh",
      href: "#",
      megaMenu: [
        {
          title: "Trước & Trong Tập",
          links: [
            { label: "Pre-Workout", href: "#", category: "Pre-Workout" },
          ],
        },
        {
          title: "Sức mạnh & Phục hồi",
          links: [
            { label: "Creatine", href: "#", category: "Creatine" },
            { label: "BCAAs", href: "#", category: "BCAAs" },
          ],
        },
      ],
    },
    {
      label: "Hỗ trợ sức khỏe",
      href: "#",
    },
    {
      label: "Phụ kiện",
      href: "#",
    },
    {
      label: "Thương hiệu",
      href: "#",
    },
  ];

// FIX: Added sort options data.
export const SORT_OPTIONS: SortOption[] = [
    { value: 'default', label: 'Mặc định' },
    { value: 'popularity', label: 'Phổ biến nhất' },
    { value: 'price-asc', label: 'Giá: Thấp đến cao' },
    { value: 'price-desc', label: 'Giá: Cao đến thấp' },
];

export const brands: Brand[] = [
  { id: 1, name: 'Optimum Nutrition', logo: 'https://picsum.photos/seed/onlogo/200/100', isFeatured: true },
  { id: 2, name: 'Myprotein', logo: 'https://picsum.photos/seed/mylogo/200/100', isFeatured: true },
  { id: 3, name: 'Rule 1', logo: 'https://picsum.photos/seed/r1logo/200/100', isFeatured: true },
  { id: 4, name: 'Applied Nutrition', logo: 'https://picsum.photos/seed/anlogo/200/100', isFeatured: true },
  { id: 5, name: 'Nutrabolt (C4)', logo: 'https://picsum.photos/seed/c4logo/200/100', isFeatured: true },
  { id: 6, name: 'BPI Sports', logo: 'https://picsum.photos/seed/bpilogo/200/100', isFeatured: true },
  { id: 7, name: 'Thorne Research', logo: 'https://picsum.photos/seed/thornelogo/200/100', isFeatured: false },
  { id: 8, name: 'Nutrex', logo: 'https://picsum.photos/seed/nutrexlogo/200/100', isFeatured: false },
  { id: 9, name: 'Redcon1', logo: 'https://picsum.photos/seed/redconlogo/200/100', isFeatured: false },
];

// FIX: Added product data.
export const allProducts: Product[] = [
    {
      id: 1,
      sku: 'ON-GSW-5LB',
      name: 'Optimum Nutrition Gold Standard 100% Whey Protein 5Lbs',
      images: ['https://picsum.photos/seed/product1/1200/600', 'https://picsum.photos/seed/product1-2/400/400'],
      price: 1850000,
      oldPrice: 2200000,
      rating: 4.8,
      reviews: 1250,
      sold: 88,
      stockQuantity: 100,
      category: 'Whey Protein',
      subCategory: 'Whey Protein Blend',
      brand: 'Optimum Nutrition',
      inStock: true,
      description: 'Gold Standard 100% Whey Blend – 24g protein pha trộn bao gồm Whey Protein Isolate, Whey Protein Concentrate, và Whey Peptides/Hydrolysates để hỗ trợ khối lượng cơ nạc.',
      sizes: ['5Lbs', '10Lbs'],
      flavors: ['Double Rich Chocolate', 'Vanilla Ice Cream', 'Mocha Cappuccino'],
      productReviews: [
        { id: 1, author: 'Trần Văn Mạnh', rating: 5, comment: 'Sản phẩm tuyệt vời, vị chocolate uống rất ngon, tan nhanh. Giao hàng nhanh chóng. Sẽ ủng hộ shop dài dài!', date: '20/07/2023' },
        { id: 2, author: 'Nguyễn Thị Hằng', rating: 4, comment: 'Mình dùng vị Vani, hơi ngọt so với mình một chút nhưng chất lượng thì không có gì để chê. Tăng cơ khá tốt.', date: '18/07/2023' },
        { id: 3, author: 'Lê Minh Khôi', rating: 5, comment: 'Best whey protein in the market! Been using it for years.', date: '15/07/2023' },
      ],
      isFeatured: true,
    },
    {
      id: 2,
      sku: 'R1-PRO-5LB',
      name: 'Rule 1 R1 Protein 5Lbs',
      images: ['https://picsum.photos/seed/product2/1200/600'],
      price: 1950000,
      rating: 4.9,
      reviews: 980,
      sold: 65,
      stockQuantity: 100,
      category: 'Whey Protein',
      subCategory: 'Whey Protein Isolate',
      brand: 'Rule 1',
      inStock: true,
      description: 'R1 Protein được làm bằng 100% whey isolate siêu tinh khiết, whey hydrolysate tác dụng nhanh và hầu như không có gì khác.',
      sizes: ['5Lbs'],
      flavors: ['Chocolate Fudge', 'Vanilla Creme', 'Strawberries & Creme'],
      productReviews: [
         { id: 1, author: 'Phạm Tuấn Anh', rating: 5, comment: 'Độ tinh khiết cao, uống không bị đầy bụng. Hiệu quả rõ rệt sau 1 tháng sử dụng.', date: '22/07/2023' },
      ],
      isFeatured: true,
    },
    {
        id: 3,
        sku: 'MP-IMPISO-5.5LB',
        name: 'Myprotein Impact Whey Isolate 5.5Lbs',
        images: ['https://picsum.photos/seed/product3/400/400'],
        price: 1790000,
        oldPrice: 2000000,
        rating: 4.7,
        reviews: 850,
        sold: 112,
        stockQuantity: 100,
        category: 'Whey Protein',
        subCategory: 'Whey Protein Isolate',
        brand: 'Myprotein',
        inStock: true,
        description: 'Impact Whey Isolate cung cấp 23g protein mỗi lần dùng với hàm lượng chất béo và carb thấp, là lựa chọn lý tưởng cho người muốn tăng cơ giảm mỡ.',
        sizes: ['5.5Lbs'],
        flavors: ['Chocolate Brownie', 'Salted Caramel', 'Unflavored'],
    },
    {
        id: 4,
        sku: 'AN-ISOXP-2KG',
        name: 'Applied Nutrition ISO-XP 100% Whey Isolate 2kg',
        images: ['https://picsum.photos/seed/product4/400/400'],
        price: 2100000,
        rating: 4.9,
        reviews: 720,
        sold: 0,
        stockQuantity: 100,
        category: 'Whey Protein',
        subCategory: 'Whey Protein Isolate',
        brand: 'Applied Nutrition',
        inStock: true,
        description: 'ISO-XP là một trong những sản phẩm whey isolate tinh khiết nhất trên thị trường, không chứa đường, carb, lactose và chất béo.',
        flavors: ['Choco Coco', 'Cafe Latte', 'Mango & Passion Fruit'],
    },
    {
        id: 5,
        sku: 'ON-SM-12LB',
        name: 'Optimum Nutrition Serious Mass 12Lbs',
        images: ['https://picsum.photos/seed/product5/1200/600'],
        price: 1650000,
        rating: 4.6,
        reviews: 2100,
        sold: 0,
        stockQuantity: 100,
        category: 'Tăng cân',
        brand: 'Optimum Nutrition',
        inStock: true,
        description: 'Serious Mass là sản phẩm tăng cân tối ưu, cung cấp 1250 calories, 50g protein, và hơn 250g carbohydrate mỗi liều dùng để hỗ trợ tăng cân và cơ bắp hiệu quả.',
        flavors: ['Chocolate', 'Vanilla', 'Banana'],
        productReviews: [
            { id: 1, author: 'Vũ Đức', rating: 5, comment: 'Tăng 3kg trong 1 tháng. Rất hiệu quả cho người gầy khó tăng cân như mình.', date: '19/07/2023' },
            { id: 2, author: 'Hoàng Long', rating: 4, comment: 'Vị chuối ngon, dễ uống. Hơi nhiều đường nên các bạn chú ý.', date: '17/07/2023' },
        ],
        isFeatured: true,
    },
    {
        id: 6,
        sku: 'R1-LBS-12LB',
        name: 'Rule 1 LBS High-Calorie Mass Gainer 12Lbs',
        images: ['https://picsum.photos/seed/product6/400/400'],
        price: 1550000,
        oldPrice: 1700000,
        rating: 4.7,
        reviews: 1500,
        sold: 95,
        stockQuantity: 100,
        category: 'Tăng cân',
        brand: 'Rule 1',
        inStock: false,
        description: 'Rule 1 LBS cung cấp hơn 1000 calories, 40g protein và một phức hợp carb chất lượng cao để giúp bạn tăng cân nhanh chóng.',
        flavors: ['Chocolate Fudge', 'Vanilla Creme'],
    },
    {
        id: 7,
        sku: 'C4-ORIG-60SRV',
        name: 'C4 Original Pre Workout 60 Servings',
        images: ['https://picsum.photos/seed/product7/1200/600'],
        price: 950000,
        rating: 4.8,
        reviews: 3200,
        sold: 0,
        stockQuantity: 100,
        category: 'Tăng sức mạnh',
        subCategory: 'Pre-Workout',
        brand: 'Nutrabolt (C4)',
        inStock: true,
        description: 'C4 Original là một trong những sản phẩm pre-workout phổ biến nhất thế giới, giúp tăng cường năng lượng, sự tập trung và sức bền cho buổi tập.',
        flavors: ['Icy Blue Razz', 'Fruit Punch', 'Watermelon'],
        isFeatured: true,
    },
    {
        id: 8,
        sku: 'AN-ABE-30SRV',
        name: 'Applied Nutrition ABE Pre-Workout 30 Servings',
        images: ['https://picsum.photos/seed/product8/400/400'],
        price: 850000,
        rating: 4.9,
        reviews: 1800,
        sold: 0,
        stockQuantity: 100,
        category: 'Tăng sức mạnh',
        subCategory: 'Pre-Workout',
        brand: 'Applied Nutrition',
        inStock: true,
        description: 'ABE (All Black Everything) mang đến sự kết hợp độc đáo của các thành phần được nghiên cứu khoa học để tăng hiệu suất thể chất, giảm mệt mỏi và cung cấp sự tập trung liên tục.',
        flavors: ['Energy Flavour', 'Cherry Cola', 'Bubblegum Crush'],
    },
    {
        id: 9,
        sku: 'ON-FISH-200CAP',
        name: 'Optimum Nutrition Fish Oil Omega-3 200 viên',
        images: ['https://picsum.photos/seed/product9/400/400'],
        price: 450000,
        rating: 4.9,
        reviews: 5000,
        sold: 0,
        stockQuantity: 100,
        category: 'Hỗ trợ sức khỏe',
        brand: 'Optimum Nutrition',
        inStock: true,
        description: 'Dầu cá Omega-3 hỗ trợ sức khỏe tim mạch, não bộ và khớp. Mỗi viên nang mềm chứa 300mg Omega-3 (EPA & DHA).',
    },
    {
        id: 10,
        sku: 'MP-VITD3-180CAP',
        name: 'Myprotein Vitamin D3 Elite 180 viên',
        images: ['https://picsum.photos/seed/product10/400/400'],
        price: 350000,
        rating: 4.8,
        reviews: 1200,
        sold: 0,
        stockQuantity: 100,
        category: 'Hỗ trợ sức khỏe',
        brand: 'Myprotein',
        inStock: true,
        description: 'Vitamin D3 rất cần thiết cho sức khỏe xương, chức năng miễn dịch và tâm trạng. Sản phẩm được kiểm nghiệm Informed-Sport.',
    },
    {
        id: 11,
        sku: 'GS-SHAKER-700ML',
        name: 'GymSup Premium Shaker 700ml',
        images: ['https://picsum.photos/seed/product11/400/400'],
        price: 150000,
        rating: 4.5,
        reviews: 350,
        sold: 0,
        stockQuantity: 100,
        category: 'Phụ kiện',
        brand: 'GymSup',
        inStock: true,
        description: 'Bình lắc cao cấp chống rò rỉ, có bi lắc lò xo giúp hòa tan bột dễ dàng. Chất liệu nhựa không chứa BPA.',
    },
    {
        id: 12,
        sku: 'R1-TRAIN-BCAA',
        name: 'Rule 1 R1 Train BCAAs + Electrolytes',
        images: ['https://picsum.photos/seed/product12/400/400'],
        price: 750000,
        rating: 4.7,
        reviews: 640,
        sold: 0,
        stockQuantity: 100,
        category: 'Tăng sức mạnh',
        subCategory: 'BCAAs',
        brand: 'Rule 1',
        inStock: true,
        description: 'Bổ sung BCAA giúp phục hồi cơ bắp trong và sau khi tập, kết hợp với chất điện giải để bù nước và khoáng chất.',
        flavors: ['Blue Raspberry', 'Orange Burst', 'Watermelon Splash'],
    },
    {
        id: 13,
        sku: 'TR-CRE-450G',
        name: 'Thorne Creatine 450g',
        images: ['https://picsum.photos/seed/product13/400/400'],
        price: 950000,
        rating: 5.0,
        reviews: 890,
        sold: 0,
        stockQuantity: 100,
        category: 'Tăng sức mạnh',
        subCategory: 'Creatine',
        brand: 'Thorne Research',
        inStock: true,
        description: 'Creatine tinh khiết, được chứng nhận NSF for Sport®, hỗ trợ sản xuất năng lượng, sức bền và sức mạnh cơ bắp.',
    },
    {
        id: 14,
        sku: 'NTRX-OUTLIFT-20SRV',
        name: 'Nutrex Outlift Pre-Workout 20 Servings',
        images: ['https://picsum.photos/seed/product14/400/400'],
        price: 890000,
        rating: 4.7,
        reviews: 1100,
        sold: 0,
        stockQuantity: 100,
        category: 'Tăng sức mạnh',
        subCategory: 'Pre-Workout',
        brand: 'Nutrex',
        inStock: true,
        description: 'Outlift là một sản phẩm pre-workout mạnh mẽ với các thành phần được định lượng lâm sàng để mang lại kết quả tối đa.',
        flavors: ['Miami Vice', 'Italian Ice'],
    },
    {
        id: 15,
        sku: 'RC1-TOTALWAR-30SRV',
        name: 'Redcon1 Total War Pre-Workout 30 Servings',
        images: ['https://picsum.photos/seed/product15/400/400'],
        price: 920000,
        rating: 4.8,
        reviews: 2500,
        sold: 0,
        stockQuantity: 100,
        category: 'Tăng sức mạnh',
        subCategory: 'Pre-Workout',
        brand: 'Redcon1',
        inStock: true,
        description: 'Total War là pre-workout chuyên nghiệp, mang lại sự kết hợp mạnh mẽ của các chất kích thích và yếu tố tập trung cùng với các hợp chất bơm cơ.',
        flavors: ['Tiger\'s Blood', 'Blue Lemonade'],
    }
];

export const trendingProducts = allProducts.slice(0, 4);
export const wheyProducts = allProducts.filter(p => p.category === 'Whey Protein').slice(0, 6);
export const strengthProducts = allProducts.filter(p => p.category === 'Tăng sức mạnh').slice(0, 6);

// FIX: Added articles data.
export const supplementArticles: Article[] = [
    { 
      id: 5, 
      title: 'Uống Magie B6 nhiều có tốt không? Liều dùng và cảnh báo tác dụng phụ', 
      date: '03/11/2025', 
      snippet: 'Magie B6 là những chất dinh dưỡng cần thiết cho sức khỏe mà bạn có thể hấp thụ từ chế độ ăn uống hàng ngày hoặc qua việc sử dụng các loại thực phẩm bổ sung.', 
      image: 'https://picsum.photos/seed/magnesium/400/200', 
      category: 'Kiến thức Supplement', 
      url: 'https://hellobacsi.com/thuoc/magnesium-vitamin-b6/' 
    },
    { id: 1, title: 'Whey Protein là gì? Tác dụng và cách dùng hiệu quả', date: '15/07/2023', snippet: 'Tìm hiểu sâu về Whey Protein, lợi ích đối với người tập gym và cách sử dụng để tối ưu hóa sự phát triển cơ bắp.', image: 'https://picsum.photos/seed/article1/400/200', category: 'Kiến thức Supplement', url: 'https://www.thegioiwhey.com/blogs/kien-thuc-the-hinh/whey-protein-la-gi-tac-dung-huu-ich-cua-whey-protein' },
    { id: 2, title: 'Creatine: "Vua" của các loại thực phẩm bổ sung tăng sức mạnh', date: '12/07/2023', snippet: 'Creatine đã được chứng minh là một trong những chất bổ sung hiệu quả nhất để tăng cường sức mạnh và hiệu suất tập luyện.', image: 'https://picsum.photos/seed/article2/400/200', category: 'Kiến thức Supplement', url: 'https://gymstore.vn/creatine-la-gi' },
];

export const nutritionArticles: Article[] = [
    { id: 3, title: 'BMR là gì? Hướng dẫn tính BMR để tăng/giảm cân khoa học', date: '10/07/2023', snippet: 'Chỉ số BMR giúp bạn xác định lượng calo cần thiết mỗi ngày để duy trì hoặc thay đổi cân nặng một cách hiệu quả.', image: 'https://picsum.photos/seed/article3/400/200', category: 'Kiến thức Dinh dưỡng', url: 'https://tamanhhospital.vn/bmr' },
    { id: 4, title: 'Top 10 thực phẩm giàu protein cho người tập gym', date: '08/07/2023', snippet: 'Xây dựng cơ bắp không chỉ đến từ việc tập luyện mà còn phụ thuộc rất nhiều vào chế độ ăn uống giàu protein.', image: 'https://picsum.photos/seed/article4/400/200', category: 'Kiến thức Dinh dưỡng', url: 'https://www.wheystore.vn/news/thuc-pham-giau-protein-1154' },
];