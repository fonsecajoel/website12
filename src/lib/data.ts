import { Product, Category } from "./types";

const PLACEHOLDER = "https://placehold.co";

function img(w: number, h: number, text: string, bg = "1a1a1a", fg = "c9a96e"): string {
  return `${PLACEHOLDER}/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(text)}`;
}

export const categories: Category[] = [
  { name: "Novidades", slug: "novidades", image: img(200, 200, "New") },
  { name: "Vestidos", slug: "vestidos", image: img(200, 200, "Vestidos") },
  { name: "Tops & Blusas", slug: "tops", image: img(200, 200, "Tops") },
  { name: "Saias", slug: "saias", image: img(200, 200, "Saias") },
  { name: "Calças", slug: "calcas", image: img(200, 200, "Calças") },
  { name: "Lingerie", slug: "lingerie", image: img(200, 200, "Lingerie") },
  { name: "Sapatos", slug: "sapatos", image: img(200, 200, "Sapatos") },
  { name: "Bolsas", slug: "bolsas", image: img(200, 200, "Bolsas") },
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
    name: "Vestido Longo Festa Dourado",
    slug: "vestido-longo-festa-dourado",
    price: 599.9,
    images: [
      img(600, 800, "VestidoFesta+1"),
      img(600, 800, "VestidoFesta+2"),
      img(600, 800, "VestidoFesta+3"),
    ],
    category: "feminino",
    subcategory: "vestidos",
    sizes: ["PP", "P", "M", "G"],
    colors: [
      { name: "Dourado", hex: "#c9a96e" },
      { name: "Preto", hex: "#1a1a1a" },
    ],
    description: "Vestido longo de festa com brilho sofisticado e fenda lateral. A peça perfeita para arrasar em qualquer evento especial.",
    isNew: true,
  },
  {
    id: "6",
    name: "Conjunto Lingerie Renda Francesa",
    slug: "conjunto-lingerie-renda-francesa",
    price: 189.9,
    originalPrice: 249.9,
    images: [
      img(600, 800, "Lingerie+1"),
      img(600, 800, "Lingerie+2"),
    ],
    category: "feminino",
    subcategory: "lingerie",
    sizes: ["PP", "P", "M", "G"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Bordô", hex: "#800020" },
      { name: "Nude Rosé", hex: "#c8a2a2" },
    ],
    description: "Conjunto de lingerie em renda francesa com acabamento artesanal. Delicadeza e sensualidade que te fazem sentir poderosa.",
    isPromo: true,
  },
  {
    id: "7",
    name: "Bolsa Structured Couro Premium",
    slug: "bolsa-structured-couro-premium",
    price: 489.9,
    images: [
      img(600, 800, "Bolsa+1"),
      img(600, 800, "Bolsa+2"),
      img(600, 800, "Bolsa+3"),
    ],
    category: "acessorios",
    subcategory: "bolsas",
    sizes: ["Único"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Caramelo", hex: "#c9a96e" },
      { name: "Creme", hex: "#f5f0eb" },
    ],
    description: "Bolsa estruturada em couro premium com forro de seda. Design atemporal que eleva qualquer visual.",
    isNew: true,
  },
  {
    id: "8",
    name: "Scarpin Salto Alto Verniz",
    slug: "scarpin-salto-alto-verniz",
    price: 329.9,
    images: [
      img(600, 800, "Scarpin+1"),
      img(600, 800, "Scarpin+2"),
    ],
    category: "feminino",
    subcategory: "sapatos",
    sizes: ["34", "35", "36", "37", "38", "39"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Nude", hex: "#d2b48c" },
      { name: "Vermelho", hex: "#b22222" },
    ],
    description: "Scarpin clássico em verniz com salto de 10cm. Sofisticação absoluta para mulheres que comandam.",
    isNew: true,
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
    name: "Body Manga Longa Decote V",
    slug: "body-manga-longa-decote-v",
    price: 119.9,
    images: [
      img(600, 800, "Body+1"),
      img(600, 800, "Body+2"),
    ],
    category: "feminino",
    subcategory: "bodys",
    sizes: ["PP", "P", "M", "G"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Branco", hex: "#f5f0eb" },
      { name: "Vinho", hex: "#722f37" },
    ],
    description: "Body de manga longa com decote V profundo. A base perfeita para looks sensuais e elegantes.",
    isNew: true,
  },
  {
    id: "12",
    name: "Conjunto Alfaiataria Power",
    slug: "conjunto-alfaiataria-power",
    price: 499.9,
    originalPrice: 649.9,
    images: [
      img(600, 800, "Alfaiataria+1"),
      img(600, 800, "Alfaiataria+2"),
      img(600, 800, "Alfaiataria+3"),
    ],
    category: "feminino",
    subcategory: "conjuntos",
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Branco", hex: "#f5f0eb" },
    ],
    description: "Conjunto de alfaiataria com blazer cropped e calça palazzo. Power dressing para mulheres que lideram.",
    isPromo: true,
  },
  {
    id: "13",
    name: "Macacão Pantalona Crepe",
    slug: "macacao-pantalona-crepe",
    price: 359.9,
    images: [
      img(600, 800, "Macacao+1"),
      img(600, 800, "Macacao+2"),
    ],
    category: "feminino",
    subcategory: "macacões",
    sizes: ["PP", "P", "M", "G"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Terracota", hex: "#cc7044" },
    ],
    description: "Macacão pantalona em crepe leve com decote envolvente. Uma peça que faz qualquer momento parecer especial.",
    isNew: true,
  },
  {
    id: "14",
    name: "Brincos Cascata Dourados",
    slug: "brincos-cascata-dourados",
    price: 79.9,
    images: [
      img(600, 800, "Brincos+1"),
      img(600, 800, "Brincos+2"),
    ],
    category: "acessorios",
    subcategory: "bijuteria",
    sizes: ["Único"],
    colors: [
      { name: "Dourado", hex: "#c9a96e" },
      { name: "Prata", hex: "#c0c0c0" },
    ],
    description: "Brincos em cascata com banho de ouro 18k. O toque final de luxo para qualquer look.",
  },
  {
    id: "15",
    name: "Sandália Tiras Finas Metalizada",
    slug: "sandalia-tiras-finas-metalizada",
    price: 279.9,
    originalPrice: 349.9,
    images: [
      img(600, 800, "Sandalia+1"),
      img(600, 800, "Sandalia+2"),
    ],
    category: "feminino",
    subcategory: "sapatos",
    sizes: ["34", "35", "36", "37", "38", "39"],
    colors: [
      { name: "Dourado", hex: "#c9a96e" },
      { name: "Prata", hex: "#c0c0c0" },
      { name: "Preto", hex: "#1a1a1a" },
    ],
    description: "Sandália de tiras finas metalizadas com salto bloco de 8cm. Conforto e glamour em cada passo.",
    isPromo: true,
  },
  {
    id: "16",
    name: "Blusa Cetim Gola Laço",
    slug: "blusa-cetim-gola-laco",
    price: 169.9,
    images: [
      img(600, 800, "Blusa+1"),
      img(600, 800, "Blusa+2"),
    ],
    category: "feminino",
    subcategory: "blusas",
    sizes: ["PP", "P", "M", "G", "GG"],
    colors: [
      { name: "Champagne", hex: "#f7e7ce" },
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Bordô", hex: "#800020" },
    ],
    description: "Blusa em cetim com gola laço e mangas bufantes. Feminilidade e sofisticação em cada detalhe.",
    isNew: true,
  },
  {
    id: "17",
    name: "Clutch Festa Cristais",
    slug: "clutch-festa-cristais",
    price: 229.9,
    images: [
      img(600, 800, "Clutch+1"),
      img(600, 800, "Clutch+2"),
    ],
    category: "acessorios",
    subcategory: "bolsas",
    sizes: ["Único"],
    colors: [
      { name: "Dourado", hex: "#c9a96e" },
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Prata", hex: "#c0c0c0" },
    ],
    description: "Clutch de festa com aplicação de cristais e corrente removível. O acessório que rouba a cena.",
    isNew: true,
  },
  {
    id: "18",
    name: "Vestido Tubinho Bandagem",
    slug: "vestido-tubinho-bandagem",
    price: 289.9,
    originalPrice: 379.9,
    images: [
      img(600, 800, "Tubinho+1"),
      img(600, 800, "Tubinho+2"),
    ],
    category: "feminino",
    subcategory: "vestidos",
    sizes: ["PP", "P", "M", "G"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Vermelho", hex: "#b22222" },
    ],
    description: "Vestido tubinho em bandagem que modela o corpo com elegância. Confiança que se veste.",
    isPromo: true,
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
