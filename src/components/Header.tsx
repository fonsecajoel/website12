"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import logo from "@/assets/logos/Logo-horizontal-02.png";
import { useCartStore } from "@/store/cart";

const NAV_LINKS = [
  { label: "Novidades", href: "/novidades" },
  { label: "Vestidos", href: "/produtos?subcategory=vestidos" },
  { label: "Tops & Blusas", href: "/produtos?subcategory=tops" },
  { label: "Saias", href: "/produtos?subcategory=saias" },
  { label: "Lingerie", href: "/produtos?subcategory=lingerie" },
  { label: "Sapatos", href: "/produtos?subcategory=sapatos" },
  { label: "Bolsas", href: "/produtos?subcategory=bolsas" },
  { label: "Acessórios", href: "/acessorios" },
  { label: "Promo", href: "/promo", isHighlight: true },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const itemsCount = useCartStore((state) => state.totalItems());
  const openCart = useCartStore((state) => state.open);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-aela-black/95 backdrop-blur-md border-b border-white/5 shadow-sm"
          : "bg-aela-black"
      }`}
    >
      <div className="bg-aela-gold text-aela-black text-[10px] sm:text-xs font-medium tracking-widest text-center py-2 px-4 uppercase">
        FRETE GRÁTIS acima de R$299 | Até 5x sem juros
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 border-b border-transparent">
          <button
            className="lg:hidden text-aela-cream hover:text-aela-gold transition-colors p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="flex-shrink-0 flex items-center justify-center lg:justify-start group">
            <Image
              src={logo}
              alt="Aela."
              width={140}
              height={46}
              className="w-28 sm:w-32 lg:w-36 h-auto group-hover:opacity-80 transition-opacity"
              priority
            />
          </Link>

          <div className="hidden lg:flex flex-1 max-w-xl mx-12">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="O que você procura?"
                className="w-full bg-transparent border-b border-aela-gray/30 text-aela-cream text-sm px-0 py-2 placeholder:text-aela-gray/70 focus:outline-none focus:border-aela-gold transition-colors duration-300"
              />
              <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-aela-gray/70 group-focus-within:text-aela-gold transition-colors duration-300" />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
            <button className="lg:hidden text-aela-cream hover:text-aela-gold transition-colors p-2" aria-label="Buscar">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/conta" className="hidden sm:flex items-center justify-center text-aela-cream hover:text-aela-gold transition-colors p-2" aria-label="Minha Conta">
              <User className="w-5 h-5" />
            </Link>
            <button 
              className="text-aela-cream hover:text-aela-gold transition-colors relative group p-2" 
              aria-label="Carrinho"
              onClick={openCart}
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && itemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-aela-gold text-aela-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center scale-100 group-hover:scale-110 transition-transform">
                  {itemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav className="hidden lg:flex items-center justify-center space-x-8 pb-5 pt-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                link.isHighlight 
                  ? "text-aela-gold hover:text-aela-gold-light" 
                  : "text-aela-cream hover:text-aela-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden bg-aela-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 w-[85%] max-w-sm h-full bg-aela-dark border-r border-white/5 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <Image src={logo} alt="Aela." width={110} height={36} className="w-28 h-auto" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-aela-gray hover:text-aela-gold transition-colors p-2 -mr-2"
              aria-label="Fechar menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col h-[calc(100%-80px)] overflow-y-auto">
            <div className="p-6">
              <div className="relative w-full mb-8">
                <input
                  type="text"
                  placeholder="O que você procura?"
                  className="w-full bg-transparent border-b border-aela-gray/30 text-aela-cream text-sm px-0 py-3 placeholder:text-aela-gray/70 focus:outline-none focus:border-aela-gold transition-colors"
                />
                <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-aela-gray/70" />
              </div>

              <nav className="flex flex-col space-y-6">
                {NAV_LINKS.map((link, index) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-sm uppercase tracking-[0.15em] font-medium transition-colors ${
                      link.isHighlight 
                        ? "text-aela-gold" 
                        : "text-aela-cream hover:text-aela-gold"
                    }`}
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                      opacity: isMobileMenuOpen ? 1 : 0,
                      transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-10px)",
                      transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-auto p-6 border-t border-white/5 bg-aela-black/20">
              <Link 
                href="/conta" 
                className="flex items-center space-x-3 text-aela-cream hover:text-aela-gold transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span className="text-xs font-medium tracking-[0.15em] uppercase">Minha Conta</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}