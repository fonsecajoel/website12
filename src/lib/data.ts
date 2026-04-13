import { Product, Category } from "./types";

const PLACEHOLDER = "https://placehold.co";

function img(w: number, h: number, text: string, bg = "1a1a1a", fg = "c9a96e"): string {
  return `${PLACEHOLDER}/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(text)}`;
}

export const categories: Category[] = [
  { name: "Novidades", slug: "novidades", image: img(200, 200, "New") },
  { name: "Feminino", slug: "feminino", image: img(200, 200, "Fem") },
  { name: "Masculino", slug: "masculino", image: img(200, 200, "Masc") },
  { name: "Jeans", slug: "jeans", image: img(200, 200, "Jeans") },
  { name: "Básicos", slug: "basicos", image: img(200, 200, "Basics") },
  { name: "Acessórios", slug: "acessorios", image: img(200, 200, "Acc") },
  { name: "Promo", slug: "promo", image: img(200, 200, "Promo") },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Blazer Oversized Linho",
    slug: "blazer-oversized-linho",
    price: 349.9,
    originalPrice: 449.9,
    images: [
      img(600, 800, "Blazer+1"),
      img(600, 800, "Blazer+2"),
      img(600, 800, "Blazer+3"),
    ],
    category: "feminino",
    subcategory: "blazers",
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: [
      { name: "Areia", hex: "#d2b48c" },
      { name: "Preto", hex: "#1a1a1a" },
    ],
    description: "Blazer oversized em linho com corte moderno e elegante. Perfeito para ocasiões casuais e formais.",
    isNew: true,
    isPromo: true,
  },
  {
    id: "2",
    name: "T-shirt Essential Algodão",
    slug: "t-shirt-essential-algodao",
    price: 89.9,
    images: [
      img(600, 800, "Tee+1"),
      img(600, 800, "Tee+2"),
    ],
    category: "feminino",
    subcategory: "t-shirts",
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: [
      { name: "Branco", hex: "#f5f0eb" },
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Caramelo", hex: "#c9a96e" },
    ],
    description: "T-shirt essencial em algodão orgânico. Base perfeita para qualquer look.",
    isNew: false,
  },
  {
    id: "3",
    name: "Calça Wide Leg Jeans",
    slug: "calca-wide-leg-jeans",
    price: 259.9,
    images: [
      img(600, 800, "Jeans+1"),
      img(600, 800, "Jeans+2"),
      img(600, 800, "Jeans+3"),
    ],
    category: "feminino",
    subcategory: "calças",
    sizes: ["34", "36", "38", "40", "42", "44"],
    colors: [
      { name: "Azul Médio", hex: "#5b8fb9" },
      { name: "Azul Escuro", hex: "#1e3a5f" },
    ],
    description: "Calça wide leg em denim premium com lavagem contemporânea.",
    isNew: true,
  },
  {
    id: "4",
    name: "Vestido Midi Canelado",
    slug: "vestido-midi-canelado",
    price: 199.9,
    originalPrice: 279.9,
    images: [
      img(600, 800, "Dress+1"),
      img(600, 800, "Dress+2"),
    ],
    category: "feminino",
    subcategory: "vestidos",
    sizes: ["PP", "P", "M", "G"],
    colors: [
      { name: "Verde Oliva", hex: "#556b2f" },
      { name: "Terracota", hex: "#cc7044" },
      { name: "Preto", hex: "#1a1a1a" },
    ],
    description: "Vestido midi em malha canelada com caimento fluido e elegante.",
    isPromo: true,
  },
  {
    id: "5",
    name: "Camisa Oxford Slim",
    slug: "camisa-oxford-slim",
    price: 179.9,
    images: [
      img(600, 800, "Shirt+1"),
      img(600, 800, "Shirt+2"),
    ],
    category: "masculino",
    subcategory: "camisas",
    sizes: ["P", "M", "G", "GG", "XGG"],
    colors: [
      { name: "Branco", hex: "#f5f0eb" },
      { name: "Azul Claro", hex: "#87ceeb" },
    ],
    description: "Camisa Oxford em algodão com corte slim fit. Clássica e versátil.",
    isNew: true,
  },
  {
    id: "6",
    name: "Calça Chino Slim",
    slug: "calca-chino-slim",
    price: 219.9,
    originalPrice: 279.9,
    images: [
      img(600, 800, "Chino+1"),
      img(600, 800, "Chino+2"),
    ],
    category: "masculino",
    subcategory: "calças",
    sizes: ["38", "40", "42", "44", "46"],
    colors: [
      { name: "Caqui", hex: "#c3b091" },
      { name: "Marinho", hex: "#1e2d3d" },
      { name: "Preto", hex: "#1a1a1a" },
    ],
    description: "Calça chino em sarja com corte slim e acabamento premium.",
    isPromo: true,
  },
  {
    id: "7",
    name: "Jaqueta Bomber",
    slug: "jaqueta-bomber",
    price: 399.9,
    images: [
      img(600, 800, "Bomber+1"),
      img(600, 800, "Bomber+2"),
      img(600, 800, "Bomber+3"),
    ],
    category: "masculino",
    subcategory: "jaquetas",
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Verde Militar", hex: "#4b5320" },
    ],
    description: "Jaqueta bomber com acabamento premium e detalhes em ribana.",
    isNew: true,
  },
  {
    id: "8",
    name: "Polo Piquet Premium",
    slug: "polo-piquet-premium",
    price: 149.9,
    images: [
      img(600, 800, "Polo+1"),
      img(600, 800, "Polo+2"),
    ],
    category: "masculino",
    subcategory: "polos",
    sizes: ["P", "M", "G", "GG", "XGG"],
    colors: [
      { name: "Marinho", hex: "#1e2d3d" },
      { name: "Branco", hex: "#f5f0eb" },
      { name: "Preto", hex: "#1a1a1a" },
    ],
    description: "Polo em piquet premium com toque macio e caimento impecável.",
  },
  {
    id: "9",
    name: "Saia Midi Plissada",
    slug: "saia-midi-plissada",
    price: 189.9,
    images: [
      img(600, 800, "Skirt+1"),
      img(600, 800, "Skirt+2"),
    ],
    category: "feminino",
    subcategory: "saias",
    sizes: ["PP", "P", "M", "G"],
    colors: [
      { name: "Dourado", hex: "#c9a96e" },
      { name: "Preto", hex: "#1a1a1a" },
    ],
    description: "Saia midi plissada com brilho sofisticado para ocasiões especiais.",
    isNew: true,
  },
  {
    id: "10",
    name: "Cropped Tricot",
    slug: "cropped-tricot",
    price: 129.9,
    originalPrice: 169.9,
    images: [
      img(600, 800, "Cropped+1"),
      img(600, 800, "Cropped+2"),
    ],
    category: "feminino",
    subcategory: "tricot",
    sizes: ["PP", "P", "M", "G"],
    colors: [
      { name: "Creme", hex: "#f5f0eb" },
      { name: "Rosa Antigo", hex: "#c08081" },
    ],
    description: "Cropped em tricot macio com textura delicada. Perfeito para meia estação.",
    isPromo: true,
  },
  {
    id: "11",
    name: "Bermuda Cargo",
    slug: "bermuda-cargo",
    price: 169.9,
    images: [
      img(600, 800, "Cargo+1"),
      img(600, 800, "Cargo+2"),
    ],
    category: "masculino",
    subcategory: "bermudas",
    sizes: ["38", "40", "42", "44", "46"],
    colors: [
      { name: "Bege", hex: "#d2b48c" },
      { name: "Preto", hex: "#1a1a1a" },
    ],
    description: "Bermuda cargo em sarja com bolsos utilitários e corte moderno.",
  },
  {
    id: "12",
    name: "Moletom Oversized Logo",
    slug: "moletom-oversized-logo",
    price: 229.9,
    images: [
      img(600, 800, "Hoodie+1"),
      img(600, 800, "Hoodie+2"),
    ],
    category: "masculino",
    subcategory: "moletons",
    sizes: ["P", "M", "G", "GG"],
    colors: [
      { name: "Cinza Mescla", hex: "#808080" },
      { name: "Preto", hex: "#1a1a1a" },
    ],
    description: "Moletom oversized com logo bordado em linha premium.",
    isNew: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getPromoProducts(): Product[] {
  return products.filter((p) => p.isPromo);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
