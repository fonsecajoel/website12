export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: "feminino" | "masculino" | "acessorios";
  subcategory: string;
  sizes: string[];
  colors: ProductColor[];
  description: string;
  isNew?: boolean;
  isPromo?: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
}
