"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, Share2, Minus, Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { products as allProducts, formatPrice } from "@/lib/data";
import { useCartStore } from "@/store/cart";

export default function ProductDetail({ product }: { product: Product }) {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>("detalhes");

  const addItem = useCartStore((state) => state.addItem);

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor, selecione um tamanho");
      return;
    }
    const colorToUse = selectedColor || product.colors[0]?.name;
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, colorToUse);
    }
  };

  const decreaseQty = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increaseQty = () => setQuantity((prev) => prev + 1);

  const toggleAccordion = (section: string) => {
    setOpenAccordion((prev) => (prev === section ? null : section));
  };

  return (
    <div className="bg-aela-black text-aela-cream min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <nav className="flex items-center text-sm text-aela-gray mb-8">
          <Link href="/" className="hover:text-aela-gold transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href={`/categoria/${product.category}`} className="hover:text-aela-gold transition-colors capitalize">
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-aela-cream">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* IMAGE GALLERY (left side, 55% width on desktop) */}
          <div className="lg:w-[55%] flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`relative w-20 h-24 lg:w-24 lg:h-32 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                    mainImage === img ? "border-aela-gold" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-[800px] rounded-md overflow-hidden bg-aela-dark">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                unoptimized
                className="object-cover transition-opacity duration-300 ease-in-out"
              />
              {product.isPromo && (
                <span className="absolute top-4 left-4 bg-aela-gold text-aela-black text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
                  Promo
                </span>
              )}
            </div>
          </div>

          {/* PRODUCT INFO (right side, 45% width on desktop) */}
          <div className="lg:w-[45%] flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl lg:text-4xl font-serif text-aela-cream leading-tight">
                {product.name}
              </h1>
              <div className="flex gap-3 text-aela-gray">
                <button className="hover:text-aela-gold transition-colors" aria-label="Adicionar aos favoritos">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="hover:text-aela-gold transition-colors" aria-label="Compartilhar">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="mb-6 flex items-end gap-3">
              <span className="text-2xl font-light text-aela-gold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-aela-gray line-through pb-0.5">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="w-full h-px bg-aela-dark-lighter mb-8"></div>

            {/* Colors */}
            <div className="mb-8">
              <h3 className="text-sm uppercase tracking-widest text-aela-gray mb-3">
                Cor: <span className="text-aela-cream">{selectedColor}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      selectedColor === color.name ? "ring-2 ring-aela-gold ring-offset-2 ring-offset-aela-black" : ""
                    }`}
                    aria-label={`Cor ${color.name}`}
                  >
                    <span
                      className="w-full h-full rounded-full border border-aela-dark"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm uppercase tracking-widest text-aela-gray">
                  Tamanho: <span className="text-aela-cream">{selectedSize}</span>
                </h3>
                <button className="text-xs text-aela-gold hover:underline underline-offset-4">
                  Guia de medidas
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] h-12 border transition-all flex items-center justify-center text-sm ${
                      selectedSize === size
                        ? "border-aela-gold bg-aela-gold text-aela-black font-semibold"
                        : "border-aela-dark-lighter text-aela-gray hover:border-aela-gold hover:text-aela-cream"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="mb-10">
              <div className="flex gap-4 mb-4">
                <div className="flex items-center border border-aela-dark-lighter px-4 py-3 h-14">
                  <button onClick={decreaseQty} className="text-aela-gray hover:text-aela-gold transition-colors">
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-10 text-center text-aela-cream">{quantity}</span>
                  <button onClick={increaseQty} className="text-aela-gray hover:text-aela-gold transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-aela-gold hover:bg-aela-gold-light text-aela-black font-bold h-14 tracking-widest uppercase transition-colors"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
              <button className="w-full border border-aela-gold text-aela-gold hover:bg-aela-gold hover:text-aela-black font-bold h-14 tracking-widest uppercase transition-colors">
                Comprar Agora
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-aela-dark-lighter">
              {/* Detalhes */}
              <div className="border-b border-aela-dark-lighter">
                <button
                  onClick={() => toggleAccordion("detalhes")}
                  className="w-full flex justify-between items-center py-4 text-sm uppercase tracking-widest text-aela-cream hover:text-aela-gold transition-colors"
                >
                  Detalhes do Produto
                  <Plus className={`w-5 h-5 transition-transform ${openAccordion === "detalhes" ? "rotate-45" : ""}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openAccordion === "detalhes" ? "max-h-40 opacity-100 pb-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-aela-gray leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Medidas */}
              <div className="border-b border-aela-dark-lighter">
                <button
                  onClick={() => toggleAccordion("medidas")}
                  className="w-full flex justify-between items-center py-4 text-sm uppercase tracking-widest text-aela-cream hover:text-aela-gold transition-colors"
                >
                  Medidas
                  <Plus className={`w-5 h-5 transition-transform ${openAccordion === "medidas" ? "rotate-45" : ""}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openAccordion === "medidas" ? "max-h-40 opacity-100 pb-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-aela-gray leading-relaxed text-sm">
                    Consulte nosso guia de medidas para encontrar o tamanho ideal. A modelo veste tamanho P e tem 1,75m de altura.
                  </p>
                </div>
              </div>

              {/* Envio e Devoluções */}
              <div className="border-b border-aela-dark-lighter">
                <button
                  onClick={() => toggleAccordion("envio")}
                  className="w-full flex justify-between items-center py-4 text-sm uppercase tracking-widest text-aela-cream hover:text-aela-gold transition-colors"
                >
                  Envio e Devoluções
                  <Plus className={`w-5 h-5 transition-transform ${openAccordion === "envio" ? "rotate-45" : ""}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openAccordion === "envio" ? "max-h-40 opacity-100 pb-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-aela-gray leading-relaxed text-sm">
                    Frete grátis para compras acima de R$ 299,00. Primeira troca grátis em até 30 dias após o recebimento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-aela-dark-lighter">
            <h2 className="text-2xl font-serif text-center mb-12 text-aela-cream">Você também pode gostar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link href={`/produto/${p.slug}`} key={p.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] mb-4 bg-aela-dark overflow-hidden">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-aela-cream group-hover:text-aela-gold transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-aela-gray mt-1">{formatPrice(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
