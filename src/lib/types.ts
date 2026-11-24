export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory: string;
  sizes: string[];
  colors: ProductColor[];
  description: string;
  details?: string[];
  stock: number;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isPromo?: boolean;
  isFeatured?: boolean;
  active?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  tagline?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export type PaymentMethod = "pix" | "debito" | "credito" | "boleto";

export type OrderStatus =
  | "aguardando_pagamento"
  | "pago"
  | "em_separacao"
  | "enviado"
  | "entregue"
  | "cancelado";

export interface Address {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
}

export interface PixPayment {
  method: "pix";
  payload: string;
  qrCodeDataUrl: string;
  expiresAt: string;
}

export interface BoletoPayment {
  method: "boleto";
  digitableLine: string;
  barcode: string;
  dueDate: string;
}

export interface CardPayment {
  method: "credito" | "debito";
  brand: string;
  last4: string;
  installments: number;
  installmentValue: number;
  authorizationCode: string;
}

export type PaymentResult = PixPayment | BoletoPayment | CardPayment;

export interface Order {
  id: string;
  number: string;
  createdAt: string;
  status: OrderStatus;
  customer: Customer;
  address: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  installments: number;
  payment: PaymentResult;
  persisted: boolean;
  sandbox: boolean;
}
