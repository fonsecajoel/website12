import Image from "next/image";
import Link from "next/link";
import { categories, getNewProducts, getPromoProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";
import { Truck, CreditCard, RefreshCcw, Tag } from "lucide-react";

export default function Home() {
  const newProducts = getNewProducts();
  const promoProducts = getPromoProducts();

  return (
    <div className="flex flex-col min-h-screen bg-aela-black text-aela-cream">
      
      <HeroSection />

      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-aela-black border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto hide-scrollbar gap-8 pb-6 snap-x snap-mandatory">
            {categories.map((category) => (
              <Link 
                key={category.slug} 
                href={`/produtos?category=${category.slug}`}
                className="flex flex-col items-center gap-4 group min-w-[120px] snap-start"
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-transparent group-hover:border-aela-gold transition-colors duration-500 p-1">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={category.image || "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                  </div>
                </div>
                <span className="text-sm md:text-base font-medium tracking-widest uppercase text-aela-cream/80 group-hover:text-aela-gold transition-colors">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-aela-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight lowercase text-aela-cream">
              acabou de chegar
            </h2>
            <Link href="/produtos?filter=novidades" className="text-aela-gold hover:text-aela-gold-light text-sm uppercase tracking-widest font-semibold pb-1 border-b border-transparent hover:border-aela-gold transition-all hidden sm:block">
              Ver tudo
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-10 flex justify-center sm:hidden">
            <Link href="/produtos?filter=novidades" className="inline-flex justify-center items-center px-8 py-3 text-sm font-semibold border border-aela-gold text-aela-gold w-full rounded-sm uppercase tracking-wider">
              Ver tudo
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="flex flex-col md:flex-row h-auto md:h-[60vh] min-h-[500px]">
          <div className="w-full md:w-1/2 relative h-[300px] md:h-full">
            <Image
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
              alt="Promo Banner"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start p-12 md:p-24 bg-gradient-to-br from-aela-dark to-[#1a1814] border-l border-aela-gold/20">
            <h2 className="text-5xl md:text-6xl font-extrabold text-aela-gold mb-6">
              Até 40% OFF
            </h2>
            <p className="text-xl md:text-2xl text-aela-cream mb-10 font-light max-w-md text-center md:text-left">
              Aproveite as melhores ofertas da temporada na seleção exclusiva.
            </p>
            <Link 
              href="/produtos?filter=promo" 
              className="inline-flex justify-center items-center px-10 py-4 text-base font-semibold bg-aela-cream text-aela-black hover:bg-white transition-colors duration-300 rounded-sm uppercase tracking-wider"
            >
              Ver Promoções
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-aela-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight lowercase text-aela-cream">
              aproveite o precinho
            </h2>
            <Link href="/produtos?filter=promo" className="text-aela-gold hover:text-aela-gold-light text-sm uppercase tracking-widest font-semibold pb-1 border-b border-transparent hover:border-aela-gold transition-all hidden sm:block">
              Ver tudo
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {promoProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-10 flex justify-center sm:hidden">
            <Link href="/produtos?filter=promo" className="inline-flex justify-center items-center px-8 py-3 text-sm font-semibold border border-aela-gold text-aela-gold w-full rounded-sm uppercase tracking-wider">
              Ver tudo
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-aela-dark border-y border-aela-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            <div className="flex flex-col items-center text-center space-y-3 group">
              <Truck className="w-8 h-8 text-aela-gold group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <span className="text-sm font-medium text-aela-cream/90 uppercase tracking-wide">Frete Grátis acima de R$299</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 group">
              <CreditCard className="w-8 h-8 text-aela-gold group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <span className="text-sm font-medium text-aela-cream/90 uppercase tracking-wide">Até 5x sem juros</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 group">
              <RefreshCcw className="w-8 h-8 text-aela-gold group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <span className="text-sm font-medium text-aela-cream/90 uppercase tracking-wide">30 dias para troca</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 group">
              <Tag className="w-8 h-8 text-aela-gold group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <span className="text-sm font-medium text-aela-cream/90 uppercase tracking-wide">10% OFF na 1ª compra</span>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-aela-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-aela-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-aela-gold/30 to-transparent" />
        
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight lowercase text-aela-cream mb-4">
            quer ficar por dentro?
          </h2>
          <p className="text-aela-cream/70 text-lg mb-10 font-light">
            Cadastre-se e receba 10% OFF na primeira compra, além de novidades exclusivas.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="flex-1 bg-transparent border border-white/20 focus:border-aela-gold text-aela-cream px-6 py-4 outline-none rounded-sm transition-colors placeholder:text-white/30"
              required
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-aela-gold text-aela-black font-semibold hover:bg-aela-gold-light transition-colors rounded-sm uppercase tracking-wider whitespace-nowrap"
            >
              Cadastrar
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
