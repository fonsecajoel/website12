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
  { label: "Sapatos", href: "/produtos?subcategory=sapatos" },
  { label: "Malas", href: "/produtos?subcategory=malas" },
  { label: "Acessórios", href: "/acessorios" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 bg-noir-950/95 backdrop-blur-md ${
        isScrolled ? "border-b border-noir-700 shadow-md shadow-noir-950/50" : "border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          <div className="flex-1 lg:hidden">
            <button
              className="text-warm-300 hover:text-gold-400 transition-colors p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu strokeWidth={1.5} className="w-6 h-6" />
            </button>
          </div>

          <div className="hidden lg:flex flex-1"></div>

          <Link href="/" className="flex-shrink-0 flex items-center justify-center group">
            <Image
              src={logo}
              alt="Aela."
              width={140}
              height={46}
              className="w-28 sm:w-32 lg:w-36 h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300 brightness-0 invert"
              priority
            />
          </Link>

          <div className="flex flex-1 items-center justify-end space-x-4 lg:space-x-6">
            
            <div className="hidden lg:flex items-center space-x-2">
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isSearchOpen ? "w-48 opacity-100" : "w-0 opacity-0"
                }`}
              >
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full bg-transparent border-b border-noir-700 text-warm-200 text-xs uppercase tracking-[0.2em] px-0 py-1 placeholder:text-noir-600 focus:outline-none focus:border-gold-400 transition-colors duration-300 font-sans"
                />
              </div>
              <button 
                className="text-warm-300 hover:text-gold-400 transition-colors p-2" 
                aria-label="Buscar"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search strokeWidth={1.5} className="w-5 h-5" />
              </button>
            </div>

            <button className="lg:hidden text-warm-300 hover:text-gold-400 transition-colors p-2" aria-label="Buscar">
              <Search strokeWidth={1.5} className="w-5 h-5" />
            </button>

            <Link href="/conta" className="hidden sm:flex items-center justify-center text-warm-300 hover:text-gold-400 transition-colors p-2" aria-label="Minha Conta">
              <User strokeWidth={1.5} className="w-5 h-5" />
            </Link>

            <button 
              className="text-warm-300 hover:text-gold-400 transition-colors relative p-2" 
              aria-label="Carrinho"
              onClick={openCart}
            >
              <ShoppingBag strokeWidth={1.5} className="w-5 h-5" />
              {mounted && itemsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gold-400 rounded-full" />
              )}
            </button>

          </div>
        </div>

        <nav className="hidden lg:flex items-center justify-center space-x-10 pb-4 pt-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-medium font-sans text-warm-200 hover:text-gold-400 transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-gold-400 group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" />
            </Link>
          ))}
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden bg-noir-950/80 backdrop-blur-sm transition-opacity duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 w-[85%] max-w-sm h-full bg-noir-900 border-r border-noir-700 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-noir-700">
            <Image src={logo} alt="Aela." width={110} height={36} className="w-28 h-auto opacity-90 brightness-0 invert" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-warm-300 hover:text-gold-400 transition-colors p-2 -mr-2"
              aria-label="Fechar menu"
            >
              <X strokeWidth={1.5} className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col h-[calc(100%-80px)] overflow-y-auto">
            <div className="p-6">
              <div className="relative w-full mb-10">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full bg-transparent border-b border-noir-700 text-warm-200 text-xs uppercase tracking-[0.2em] px-0 py-2 placeholder:text-noir-600 focus:outline-none focus:border-gold-400 transition-colors duration-300 font-sans"
                />
                <Search strokeWidth={1.5} className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-300" />
              </div>

              <nav className="flex flex-col space-y-8">
                {NAV_LINKS.map((link, index) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xs uppercase tracking-[0.2em] font-medium font-sans text-warm-200 hover:text-gold-400 transition-colors duration-300"
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${index * 40 + 100}ms` : "0ms",
                      opacity: isMobileMenuOpen ? 1 : 0,
                      transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-15px)",
                      transition: "opacity 0.5s ease-out, transform 0.5s ease-out, color 0.3s ease",
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-auto p-6 border-t border-noir-700 bg-noir-950/50">
              <Link 
                href="/conta" 
                className="flex items-center space-x-3 text-warm-300 hover:text-gold-400 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User strokeWidth={1.5} className="w-5 h-5" />
                <span className="text-xs font-medium tracking-[0.2em] uppercase font-sans">Minha Conta</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
