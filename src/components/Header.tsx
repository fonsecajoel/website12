"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";
import logo from "@/assets/logos/Logo-horizontal-02.png";
import { useCartStore } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";

const NAV_LINKS = [
  { label: "Novidades", href: "/produtos?filtro=novos" },
  { label: "Vestidos", href: "/produtos?categoria=vestidos" },
  { label: "Conjuntos", href: "/produtos?categoria=conjuntos" },
  { label: "Saias", href: "/produtos?categoria=saias" },
  { label: "Sapatos", href: "/produtos?categoria=sapatos" },
  { label: "Bolsas", href: "/produtos?categoria=bolsas" },
  { label: "Promoções", href: "/produtos?filtro=promo" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const mounted = useHydrated();
  const router = useRouter();
  const wishCount = useCartStore((state) => state.wishlist.length);
  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    setIsMobileMenuOpen(false);
    router.push(q ? `/produtos?q=${encodeURIComponent(q)}` : "/produtos");
  };
  
  const itemsCount = useCartStore((state) => state.totalItems());
  const openCart = useCartStore((state) => state.open);

  useEffect(() => {
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
      document.body.style.overflow = "";
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
              className="text-warm-100 hover:text-gold-400 transition-colors p-2 -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu strokeWidth={1.5} className="w-6 h-6" />
            </button>
          </div>

          <div className="hidden lg:flex flex-1"></div>

          <Link href="/" className="flex-shrink-0 flex items-center justify-center">
            <Image
              src={logo}
              alt="Aela."
              width={140}
              height={46}
              className="w-28 sm:w-32 lg:w-36 h-auto"
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
                <form onSubmit={search}><input
                  name="q"
                  type="search"
                  placeholder="Buscar..."
                  className="w-full bg-transparent border-b border-noir-700 text-warm-100 text-xs uppercase tracking-[0.2em] px-0 py-1 placeholder:text-warm-100/60 focus:outline-none focus:border-gold-400 transition-colors duration-300 font-sans"
                /></form>
              </div>
              <button 
                className="text-warm-100 hover:text-gold-400 transition-colors p-2" 
                aria-label="Buscar"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search strokeWidth={1.5} className="w-5 h-5" />
              </button>
            </div>

            <button className="lg:hidden text-warm-100 hover:text-gold-400 transition-colors p-2" aria-label="Buscar" onClick={() => setIsMobileMenuOpen(true)}>
              <Search strokeWidth={1.5} className="w-5 h-5" />
            </button>

            <Link href="/favoritos" className="relative hidden sm:flex items-center justify-center text-warm-100 hover:text-gold-400 transition-colors p-2" aria-label="Favoritos">
              <Heart strokeWidth={1.5} className="w-5 h-5" />
              {mounted && wishCount > 0 && <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-gold-400 text-noir-950 text-[9px] font-bold flex items-center justify-center">{wishCount}</span>}
            </Link>

            <button 
              className="text-warm-100 hover:text-gold-400 transition-colors relative p-2" 
              aria-label="Carrinho"
              onClick={openCart}
            >
              <ShoppingBag strokeWidth={1.5} className="w-5 h-5" />
              {mounted && itemsCount > 0 && (
                <span key={itemsCount} className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-gold-400 text-noir-950 text-[9px] font-bold flex items-center justify-center animate-[ping_0.6s_ease-out_1_reverse]">{itemsCount}</span>
              )}
            </button>

          </div>
        </div>

        <nav className="hidden lg:flex items-center justify-center space-x-10 pb-4 pt-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-medium font-sans text-warm-100 hover:text-gold-400 transition-colors duration-300 relative group"
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
            <Image src={logo} alt="Aela." width={110} height={36} className="w-28 h-auto" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-warm-100 hover:text-gold-400 transition-colors p-2 -mr-2"
              aria-label="Fechar menu"
            >
              <X strokeWidth={1.5} className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col h-[calc(100%-80px)] overflow-y-auto">
            <div className="p-6">
              <form onSubmit={search} className="relative w-full mb-10">
                <input
                  name="q"
                  type="search"
                  placeholder="Buscar..."
                  className="w-full bg-transparent border-b border-noir-700 text-warm-100 text-xs uppercase tracking-[0.2em] px-0 py-2 placeholder:text-warm-100/60 focus:outline-none focus:border-gold-400 transition-colors duration-300 font-sans"
                />
                <Search strokeWidth={1.5} className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-100" />
              </form>

              <nav className="flex flex-col space-y-8">
                {NAV_LINKS.map((link, index) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xs uppercase tracking-[0.2em] font-medium font-sans text-warm-100 hover:text-gold-400 transition-colors duration-300"
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
                href="/favoritos" 
                className="flex items-center space-x-3 text-warm-100 hover:text-gold-400 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart strokeWidth={1.5} className="w-5 h-5" />
                <span className="text-xs font-medium tracking-[0.2em] uppercase font-sans">Favoritos</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
