"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import { SlidersHorizontal, ChevronDown, X, ChevronRight, Check } from "lucide-react";

interface ProductListingClientProps {
  initialProducts: Product[];
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  initialCategory?: string | null;
  initialFilter?: string | null;
}

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevância" },
  { value: "price_asc", label: "Menor Preço" },
  { value: "price_desc", label: "Maior Preço" },
  { value: "newest", label: "Novidades" },
];

const PRICE_RANGES = [
  { id: "under_100", label: "Até R$ 100", min: 0, max: 100 },
  { id: "100_200", label: "R$ 100 - R$ 200", min: 100, max: 200 },
  { id: "200_300", label: "R$ 200 - R$ 300", min: 200, max: 300 },
  { id: "over_300", label: "Acima de R$ 300", min: 300, max: Infinity },
];

export default function ProductListingClient({
  initialProducts,
  title,
  breadcrumbs,
  initialCategory,
  initialFilter,
}: ProductListingClientProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory.toLowerCase()] : []
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("relevance");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    if (initialFilter === "novidades") {
      setSortOption("newest");
    }
  }, [initialFilter]);

  const availableCategories = useMemo(() => {
    return Array.from(new Set(initialProducts.map((p) => p.category))).filter(Boolean);
  }, [initialProducts]);

  const availableSubcategories = useMemo(() => {
    let filtered = initialProducts;
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }
    return Array.from(new Set(filtered.map((p) => p.subcategory))).filter(Boolean);
  }, [initialProducts, selectedCategories]);

  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    initialProducts.forEach((p) => p.sizes?.forEach((s) => sizes.add(s)));
    return Array.from(sizes);
  }, [initialProducts]);

  const availableColors = useMemo(() => {
    const colors = new Map<string, string>();
    initialProducts.forEach((p) => {
      p.colors?.forEach((c) => {
        colors.set(c.name, c.hex);
      });
    });
    return Array.from(colors.entries()).map(([name, hex]) => ({ name, hex }));
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category.toLowerCase())) {
        return false;
      }
      if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(product.subcategory)) {
        return false;
      }
      if (selectedPriceRanges.length > 0) {
        const matchesPrice = selectedPriceRanges.some((rangeId) => {
          const range = PRICE_RANGES.find((r) => r.id === rangeId);
          if (!range) return false;
          return product.price >= range.min && product.price <= range.max;
        });
        if (!matchesPrice) return false;
      }
      if (selectedSizes.length > 0) {
        if (!product.sizes || !product.sizes.some((s) => selectedSizes.includes(s))) {
          return false;
        }
      }
      if (selectedColors.length > 0) {
        if (!product.colors || !product.colors.some((c) => selectedColors.includes(c.name))) {
          return false;
        }
      }
      return true;
    });
  }, [
    initialProducts,
    selectedCategories,
    selectedSubcategories,
    selectedPriceRanges,
    selectedSizes,
    selectedColors,
  ]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortOption) {
      case "price_asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price_desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest":
        return sorted.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
      case "relevance":
      default:
        return sorted;
    }
  }, [filteredProducts, sortOption]);

  const clearFilters = () => {
    setSelectedCategories(initialCategory ? [initialCategory.toLowerCase()] : []);
    setSelectedSubcategories([]);
    setSelectedPriceRanges([]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const hasActiveFilters =
    selectedCategories.length > (initialCategory ? 1 : 0) ||
    selectedSubcategories.length > 0 ||
    selectedPriceRanges.length > 0 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0;

  const toggleArrayItem = (item: string, array: string[], setArray: (val: string[]) => void) => {
    if (array.includes(item)) {
      setArray(array.filter((i) => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const renderFilters = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-aela-cream font-medium tracking-widest uppercase text-sm">Filtros</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-aela-gray hover:text-aela-gold text-xs tracking-wider uppercase transition-colors"
          >
            Limpar
          </button>
        )}
      </div>

      {!initialCategory && availableCategories.length > 0 && (
        <div className="space-y-3 border-t border-aela-dark-lighter pt-5">
          <h4 className="text-aela-cream text-xs tracking-widest uppercase">Categoria</h4>
          <div className="space-y-2">
            {["feminino", "acessorios"].map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                  selectedCategories.includes(cat)
                    ? 'border-aela-gold bg-aela-gold text-aela-black'
                    : 'border-aela-gray group-hover:border-aela-cream'
                }`}>
                  {selectedCategories.includes(cat) && <Check className="w-3 h-3" />}
                </div>
                <span className={`text-sm transition-colors ${
                  selectedCategories.includes(cat) ? 'text-aela-cream' : 'text-aela-gray group-hover:text-aela-cream'
                }`}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </span>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleArrayItem(cat, selectedCategories, setSelectedCategories)}
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {availableSubcategories.length > 0 && (
        <div className="space-y-3 border-t border-aela-dark-lighter pt-5">
          <h4 className="text-aela-cream text-xs tracking-widest uppercase">Tipo</h4>
          <div className="space-y-2">
            {availableSubcategories.map((subcat) => (
              <label key={subcat} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                  selectedSubcategories.includes(subcat)
                    ? 'border-aela-gold bg-aela-gold text-aela-black'
                    : 'border-aela-gray group-hover:border-aela-cream'
                }`}>
                  {selectedSubcategories.includes(subcat) && <Check className="w-3 h-3" />}
                </div>
                <span className={`text-sm transition-colors ${
                  selectedSubcategories.includes(subcat) ? 'text-aela-cream' : 'text-aela-gray group-hover:text-aela-cream'
                }`}>
                  {subcat}
                </span>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedSubcategories.includes(subcat)}
                  onChange={() => toggleArrayItem(subcat, selectedSubcategories, setSelectedSubcategories)}
                />
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3 border-t border-aela-dark-lighter pt-5">
        <h4 className="text-aela-cream text-xs tracking-widest uppercase">Preço</h4>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <label key={range.id} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                selectedPriceRanges.includes(range.id)
                  ? 'border-aela-gold bg-aela-gold text-aela-black'
                  : 'border-aela-gray group-hover:border-aela-cream'
              }`}>
                {selectedPriceRanges.includes(range.id) && <Check className="w-3 h-3" />}
              </div>
              <span className={`text-sm transition-colors ${
                selectedPriceRanges.includes(range.id) ? 'text-aela-cream' : 'text-aela-gray group-hover:text-aela-cream'
              }`}>
                {range.label}
              </span>
              <input
                type="checkbox"
                className="hidden"
                checked={selectedPriceRanges.includes(range.id)}
                onChange={() => toggleArrayItem(range.id, selectedPriceRanges, setSelectedPriceRanges)}
              />
            </label>
          ))}
        </div>
      </div>

      {availableSizes.length > 0 && (
        <div className="space-y-3 border-t border-aela-dark-lighter pt-5">
          <h4 className="text-aela-cream text-xs tracking-widest uppercase">Tamanho</h4>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleArrayItem(size, selectedSizes, setSelectedSizes)}
                className={`min-w-[40px] h-10 px-2 flex items-center justify-center border text-xs transition-all ${
                  selectedSizes.includes(size)
                    ? 'border-aela-gold bg-aela-gold text-aela-black font-semibold'
                    : 'border-aela-dark-lighter text-aela-gray hover:border-aela-cream hover:text-aela-cream'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {availableColors.length > 0 && (
        <div className="space-y-3 border-t border-aela-dark-lighter pt-5">
          <h4 className="text-aela-cream text-xs tracking-widest uppercase">Cor</h4>
          <div className="flex flex-wrap gap-3">
            {availableColors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleArrayItem(color.name, selectedColors, setSelectedColors)}
                className={`w-8 h-8 rounded-full border-2 transition-all relative ${
                  selectedColors.includes(color.name)
                    ? 'border-aela-gold scale-110'
                    : 'border-transparent hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {selectedColors.includes(color.name) && (
                  <Check className={`absolute inset-0 m-auto w-4 h-4 ${
                    ['#ffffff', '#f5f0eb', '#f3f4f6'].includes(color.hex.toLowerCase()) ? 'text-black' : 'text-white'
                  }`} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-aela-black min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        
        <div className="mb-10">
          <nav className="flex items-center gap-2 text-xs tracking-widest uppercase text-aela-gray mb-6">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-aela-gold transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-aela-cream">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3" />}
              </div>
            ))}
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-light text-aela-cream tracking-wider uppercase">
                {title}
              </h1>
              <p className="text-aela-gray mt-2 font-light tracking-wide">
                {sortedProducts.length} {sortedProducts.length === 1 ? 'produto' : 'produtos'}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-aela-dark-lighter text-aela-cream text-xs tracking-widest uppercase hover:border-aela-gold transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
              </button>

              <div className="relative w-full md:w-auto z-10">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex w-full md:w-[220px] items-center justify-between py-3 px-4 border border-aela-dark-lighter bg-aela-black text-aela-cream text-xs tracking-widest uppercase hover:border-aela-gold transition-colors"
                >
                  <span className="truncate mr-2">
                    {SORT_OPTIONS.find(o => o.value === sortOption)?.label}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSortOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 border border-aela-dark-lighter bg-aela-black py-2 shadow-2xl">
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        className={`w-full text-left px-4 py-2 text-xs tracking-widest uppercase transition-colors ${
                          sortOption === option.value
                            ? 'text-aela-gold bg-aela-dark/50'
                            : 'text-aela-gray hover:text-aela-cream hover:bg-aela-dark/30'
                        }`}
                        onClick={() => {
                          setSortOption(option.value);
                          setIsSortOpen(false);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              {renderFilters()}
            </div>
          </aside>

          <main className="flex-1">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-aela-dark-lighter">
                <p className="text-aela-cream text-lg tracking-wide mb-4">Nenhum produto encontrado</p>
                <p className="text-aela-gray max-w-md mx-auto mb-8">
                  Tente ajustar seus filtros ou remover algumas seleções para ver mais resultados.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-3 border border-aela-gold text-aela-gold hover:bg-aela-gold hover:text-aela-black transition-colors text-xs font-bold tracking-widest uppercase"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-aela-black h-full flex flex-col shadow-2xl border-l border-aela-dark-lighter transform transition-transform">
            <div className="flex items-center justify-between p-6 border-b border-aela-dark-lighter">
              <h2 className="text-aela-cream text-lg tracking-widest uppercase">Filtros</h2>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-aela-gray hover:text-aela-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {renderFilters()}
            </div>
            <div className="p-6 border-t border-aela-dark-lighter bg-aela-black flex gap-4">
              <button
                onClick={clearFilters}
                className="flex-1 py-4 border border-aela-dark-lighter text-aela-cream text-xs tracking-widest uppercase hover:border-aela-gold transition-colors"
              >
                Limpar
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-4 bg-aela-gold text-aela-black font-bold text-xs tracking-widest uppercase hover:bg-aela-cream transition-colors"
              >
                Ver ({sortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
