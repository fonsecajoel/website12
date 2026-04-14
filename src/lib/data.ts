import { Product, Category } from "./types";

function unsplash(id: string, w = 600, h = 800): string {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;
}

export const categories: Category[] = [
  { name: "Novidades", slug: "novidades", image: unsplash("1558618666-fcd25c85f82e", 400, 400) },
  { name: "Vestidos", slug: "vestidos", image: unsplash("1595777457583-95e4f5e7f7b8", 400, 400) },
  { name: "Tops & Blusas", slug: "tops", image: unsplash("1564257631407-4deb1f99d992", 400, 400) },
  { name: "Saias", slug: "saias", image: unsplash("1583496661160-fb5886a773b9", 400, 400) },
  { name: "Calças", slug: "calcas", image: unsplash("1594938298603-c8148c4dae35", 400, 400) },
  { name: "Sapatos", slug: "sapatos", image: unsplash("1543163521-1bf539c55dd2", 400, 400) },
  { name: "Malas", slug: "bolsas", image: unsplash("1548036328-c9fa89d128fa", 400, 400) },
  { name: "Acessórios", slug: "acessorios", image: unsplash("1611085583191-a3b181a88401", 400, 400) },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Blazer Oversized Linho",
    slug: "blazer-oversized-linho",
    price: 249.9,
    originalPrice: 329.9,
    images: [
      unsplash("1591047139829-d91aecb6caea"),
      unsplash("1594938298603-c8148c4dae35"),
    ],
    category: "feminino",
    subcategory: "blazers",
    sizes: ["XS", "S", "M", "L", "XL"],
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
    price: 59.9,
    images: [
      unsplash("1521572163474-6864f9cf17ab"),
      unsplash("1503342217505-b0a15ec515c5"),
    ],
    category: "feminino",
    subcategory: "t-shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
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
    price: 189.9,
    images: [
      unsplash("1541099649105-f69ad21f3246"),
      unsplash("1475180098004-ca77a66827be"),
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
    price: 149.9,
    originalPrice: 199.9,
    images: [
      unsplash("1595777457583-95e4f5e7f7b8"),
      unsplash("1496747611176-843222e1e57c"),
    ],
    category: "feminino",
    subcategory: "vestidos",
    sizes: ["XS", "S", "M", "L"],
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
    price: 449.9,
    images: [
      unsplash("1566174053879-31528523f8ae"),
      unsplash("1515886657613-9f3515b0c78f"),
    ],
    category: "feminino",
    subcategory: "vestidos",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Dourado", hex: "#c9a96e" },
      { name: "Preto", hex: "#1a1a1a" },
    ],
    description: "Vestido longo de festa com brilho sofisticado e fenda lateral. A peça perfeita para qualquer evento especial.",
    isNew: true,
  },
  {
    id: "7",
    name: "Mala Structured Couro Premium",
    slug: "bolsa-structured-couro-premium",
    price: 389.9,
    images: [
      unsplash("1548036328-c9fa89d128fa"),
      unsplash("1584917865442-de89df76afd3"),
    ],
    category: "acessorios",
    subcategory: "bolsas",
    sizes: ["Único"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Caramelo", hex: "#c9a96e" },
      { name: "Creme", hex: "#f5f0eb" },
    ],
    description: "Mala estruturada em couro premium com forro de seda. Design atemporal que eleva qualquer visual.",
    isNew: true,
  },
  {
    id: "8",
    name: "Scarpin Salto Alto Verniz",
    slug: "scarpin-salto-alto-verniz",
    price: 239.9,
    images: [
      unsplash("1543163521-1bf539c55dd2"),
      unsplash("1560343090-f0409e92791a"),
    ],
    category: "feminino",
    subcategory: "sapatos",
    sizes: ["35", "36", "37", "38", "39", "40"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Nude", hex: "#d2b48c" },
      { name: "Vermelho", hex: "#b22222" },
    ],
    description: "Scarpin clássico em verniz com salto de 10cm. Sofisticação absoluta.",
    isNew: true,
  },
  {
    id: "9",
    name: "Saia Midi Plissada",
    slug: "saia-midi-plissada",
    price: 139.9,
    images: [
      unsplash("1583496661160-fb5886a773b9"),
      unsplash("1558171813-01ed3d751f6b"),
    ],
    category: "feminino",
    subcategory: "saias",
    sizes: ["XS", "S", "M", "L"],
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
    price: 89.9,
    originalPrice: 119.9,
    images: [
      unsplash("1564257631407-4deb1f99d992"),
      unsplash("1485462537746-965f33f7f6a7"),
    ],
    category: "feminino",
    subcategory: "tricot",
    sizes: ["XS", "S", "M", "L"],
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
    price: 79.9,
    images: [
      unsplash("1469334031218-e382a71b716b"),
      unsplash("1509631179647-0177331693ae"),
    ],
    category: "feminino",
    subcategory: "bodys",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Branco", hex: "#f5f0eb" },
      { name: "Vinho", hex: "#722f37" },
    ],
    description: "Body de manga longa com decote V profundo. A base perfeita para looks elegantes.",
    isNew: true,
  },
  {
    id: "12",
    name: "Conjunto Alfaiataria Power",
    slug: "conjunto-alfaiataria-power",
    price: 379.9,
    originalPrice: 489.9,
    images: [
      unsplash("1594938298603-c8148c4dae35"),
      unsplash("1487222477894-8943e31ef7b2"),
    ],
    category: "feminino",
    subcategory: "conjuntos",
    sizes: ["XS", "S", "M", "L", "XL"],
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
    price: 269.9,
    images: [
      unsplash("1515886657613-9f3515b0c78f"),
      unsplash("1558618666-fcd25c85f82e"),
    ],
    category: "feminino",
    subcategory: "macacões",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Terracota", hex: "#cc7044" },
    ],
    description: "Macacão pantalona em crepe leve com decote envolvente.",
    isNew: true,
  },
  {
    id: "14",
    name: "Brincos Cascata Dourados",
    slug: "brincos-cascata-dourados",
    price: 59.9,
    images: [
      unsplash("1611085583191-a3b181a88401"),
      unsplash("1535632066927-ab7c9ab60908"),
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
    price: 199.9,
    originalPrice: 259.9,
    images: [
      unsplash("1560343090-f0409e92791a"),
      unsplash("1543163521-1bf539c55dd2"),
    ],
    category: "feminino",
    subcategory: "sapatos",
    sizes: ["35", "36", "37", "38", "39", "40"],
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
    price: 119.9,
    images: [
      unsplash("1485462537746-965f33f7f6a7"),
      unsplash("1469334031218-e382a71b716b"),
    ],
    category: "feminino",
    subcategory: "blusas",
    sizes: ["XS", "S", "M", "L", "XL"],
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
    price: 169.9,
    images: [
      unsplash("1584917865442-de89df76afd3"),
      unsplash("1548036328-c9fa89d128fa"),
    ],
    category: "acessorios",
    subcategory: "bolsas",
    sizes: ["Único"],
    colors: [
      { name: "Dourado", hex: "#c9a96e" },
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Prata", hex: "#c0c0c0" },
    ],
    description: "Clutch de festa com aplicação de cristais e corrente removível.",
    isNew: true,
  },
  {
    id: "18",
    name: "Vestido Tubinho Bandagem",
    slug: "vestido-tubinho-bandagem",
    price: 209.9,
    originalPrice: 279.9,
    images: [
      unsplash("1496747611176-843222e1e57c"),
      unsplash("1566174053879-31528523f8ae"),
    ],
    category: "feminino",
    subcategory: "vestidos",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Preto", hex: "#1a1a1a" },
      { name: "Vermelho", hex: "#b22222" },
    ],
    description: "Vestido tubinho em bandagem que modela o corpo com elegância.",
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
  return price.toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR",
  });
}
