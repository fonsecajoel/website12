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
    <div className="bg-noir-950 text-warm-100 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <nav className="flex items-center text-sm text-warm-400 mb-8">
          <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href={`/${product.category === "acessorios" ? "acessorios" : "produtos"}`} className="hover:text-gold-400 transition-colors capitalize">
            {product.category === "acessorios" ? "Acessórios" : product.subcategory}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-warm-100">{product.name}</span>
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
                    mainImage === img ? "border-gold-400" : "border-transparent opacity-70 hover:opacity-100"
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
            <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-[800px] rounded-md overflow-hidden bg-noir-800">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                unoptimized
                className="object-cover transition-opacity duration-300 ease-in-out"
              />
              {product.isPromo && (
                <span className="absolute top-4 left-4 bg-gold-400 text-noir-950 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
                  Promo
                </span>
              )}
            </div>
          </div>

          {/* PRODUCT INFO (right side, 45% width on desktop) */}
          <div className="lg:w-[45%] flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl lg:text-4xl font-serif text-warm-100 leading-tight">
                {product.name}
              </h1>
              <div className="flex gap-3 text-warm-400">
                <button className="hover:text-gold-400 transition-colors" aria-label="Adicionar aos favoritos">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="hover:text-gold-400 transition-colors" aria-label="Compartilhar">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="mb-6 flex items-end gap-3">
              <span className="font-light text-2xl text-gold-400">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-warm-400 line-through pb-0.5">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="w-full h-px bg-noir-700 mb-8"></div>

            {/* Colors */}
            <div className="mb-8">
              <h3 className="text-sm uppercase tracking-widest text-warm-400 mb-3">
                Cor: <span className="text-warm-100">{selectedColor}</span>
              </h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      selectedColor === color.name ? "ring-2 ring-gold-400 ring-offset-2 ring-offset-noir-950" : ""
                    }`}
                    aria-label={`Cor ${color.name}`}
                  >
                    <span
                      className="w-full h-full rounded-full border border-noir-700"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm uppercase tracking-widest text-warm-400">
                  Tamanho: <span className="text-warm-100">{selectedSize}</span>
                </h3>
                <button className="text-xs text-gold-400 hover:underline underline-offset-4 transition-colors">
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
                        ? "border-gold-400 bg-gold-400 text-noir-950 font-semibold"
                        : "border-noir-600 text-warm-400 hover:border-gold-500 hover:text-warm-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="mb-10 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex items-center border border-noir-600 px-4 py-3 h-14">
                  <button onClick={decreaseQty} className="text-warm-400 hover:text-gold-400 transition-colors">
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="w-10 text-center text-warm-100">{quantity}</span>
                  <button onClick={increaseQty} className="text-warm-400 hover:text-gold-400 transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gold-400 hover:bg-gold-300 text-noir-950 font-bold h-14 tracking-widest uppercase transition-colors"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
              <button className="w-full border border-gold-500 text-gold-400 hover:bg-gold-400 hover:text-noir-950 font-bold h-14 tracking-widest uppercase transition-colors">
                Comprar Agora
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-noir-700">
              {/* Detalhes */}
              <div className="border-b border-noir-700">
                <button
                  onClick={() => toggleAccordion("detalhes")}
                  className="w-full flex justify-between items-center py-4 text-sm uppercase tracking-widest text-warm-100 hover:text-gold-400 transition-colors"
                >
                  Detalhes do Produto
                  <Plus className={`w-5 h-5 transition-transform ${openAccordion === "detalhes" ? "rotate-45" : ""}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openAccordion === "detalhes" ? "max-h-40 opacity-100 pb-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-warm-300 leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Medidas */}
              <div className="border-b border-noir-700">
                <button
                  onClick={() => toggleAccordion("medidas")}
                  className="w-full flex justify-between items-center py-4 text-sm uppercase tracking-widest text-warm-100 hover:text-gold-400 transition-colors"
                >
                  Medidas
                  <Plus className={`w-5 h-5 transition-transform ${openAccordion === "medidas" ? "rotate-45" : ""}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openAccordion === "medidas" ? "max-h-40 opacity-100 pb-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-warm-300 leading-relaxed text-sm">
                    Consulte nosso guia de medidas para encontrar o tamanho ideal. A modelo veste tamanho P e tem 1,75m de altura.
                  </p>
                </div>
              </div>

              {/* Envio e Devoluções */}
              <div className="border-b border-noir-700">
                <button
                  onClick={() => toggleAccordion("envio")}
                  className="w-full flex justify-between items-center py-4 text-sm uppercase tracking-widest text-warm-100 hover:text-gold-400 transition-colors"
                >
                  Envios e Devoluções
                  <Plus className={`w-5 h-5 transition-transform ${openAccordion === "envio" ? "rotate-45" : ""}`} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openAccordion === "envio" ? "max-h-40 opacity-100 pb-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-warm-300 leading-relaxed text-sm">
                    Portes grátis para encomendas acima de €299,00. Primeira troca gratuita até 30 dias após a receção.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-noir-700">
            <h2 className="text-2xl font-serif text-center mb-12 text-gold-300">Poderá também gostar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link href={`/produto/${p.slug}`} key={p.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] mb-4 bg-noir-800 overflow-hidden">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-warm-100 group-hover:text-gold-400 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-warm-300 mt-1">{formatPrice(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
