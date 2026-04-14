"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { categories, getNewProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import HeroSection from "@/components/HeroSection";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

export default function Home() {
  const newProducts = getNewProducts();

  return (
    <div className="flex flex-col min-h-screen bg-noir-950 text-warm-100">
      <HeroSection />

      <motion.section 
        {...fadeInUp}
        className="w-full py-24 px-8 md:px-16 bg-noir-950 relative"
      >
        <div className="flex gap-8 overflow-x-auto no-scrollbar">
          {categories.map((category) => (
            <Link 
              key={category.slug} 
              href={`/produtos?category=${category.slug}`}
              className="flex flex-col items-center gap-4 group min-w-[160px] md:min-w-[200px]"
            >
              <div className="relative w-full aspect-square overflow-hidden bg-noir-800 rounded-none border border-transparent group-hover:border-gold-500 transition-colors duration-500">
                <Image
                  src={category.image || "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  unoptimized
                />
              </div>
              <span className="font-serif text-warm-100 text-lg tracking-wide group-hover:text-gold-300 transition-colors duration-300">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </motion.section>

      <div className="w-full max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="w-full border-t border-gold-700/30"></div>
      </div>

      <motion.section 
        {...fadeInUp}
        className="w-full py-24 px-8 md:px-16 max-w-[1400px] mx-auto bg-noir-950"
      >
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-gold-300">
            Acabaram de chegar
          </h2>
          <Link href="/produtos?filter=novidades" className="text-[11px] uppercase tracking-[0.2em] text-warm-300 hover:text-gold-400 transition-colors border-b border-warm-300/30 hover:border-gold-400 pb-0.5 hidden sm:block">
            Ver tudo
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-10 flex justify-center sm:hidden">
          <Link href="/produtos?filter=novidades" className="text-[11px] uppercase tracking-[0.2em] text-warm-300 hover:text-gold-400 transition-colors border-b border-warm-300/30 hover:border-gold-400 pb-0.5">
            Ver tudo
          </Link>
        </div>
      </motion.section>

      <motion.section 
        {...fadeInUp}
        className="w-full relative h-[500px] md:h-[700px] flex items-center justify-center overflow-hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
          alt="Editorial"
          fill
          className="object-cover rounded-none opacity-60"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/40 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-gold-500 mb-6">
            Seleção exclusiva
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-gold-300 leading-tight mb-6 max-w-2xl drop-shadow-lg">
            Peças com história e sofisticação.
          </h2>
          <p className="font-sans text-sm md:text-base text-warm-200 leading-relaxed max-w-md mb-10 drop-shadow-md">
            Cada peça da nossa coleção é selecionada pela sua qualidade ímpar, design ousado e atemporalidade.
          </p>
          <Link 
            href="/produtos" 
            className="border border-gold-500 text-gold-400 hover:bg-gold-500 hover:text-noir-950 px-10 py-4 text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-500"
          >
            Descobrir a Coleção
          </Link>
        </div>
      </motion.section>

      <motion.section 
        {...fadeInUp}
        className="w-full py-32 px-8 bg-noir-800 border-t border-gold-700/20"
      >
        <div className="max-w-lg mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-gold-300 mb-4">
            Fique a par de tudo.
          </h2>
          <p className="font-sans text-sm md:text-base text-warm-300 mb-10">
            Receba novidades exclusivas e acesso antecipado a novas coleções.
          </p>
          
          <form className="flex flex-col sm:flex-row w-full items-center justify-center gap-4 sm:gap-0">
            <input 
              type="email" 
              placeholder="E-mail" 
              className="w-full sm:max-w-[300px] border-b border-warm-500/50 focus:border-gold-400 bg-transparent text-warm-100 placeholder:text-warm-500/70 py-3 px-2 outline-none transition-colors text-sm"
              required
            />
            <button 
              type="submit"
              className="w-full sm:w-auto sm:ml-6 bg-gold-400 text-noir-950 hover:bg-gold-300 px-8 py-3 text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 mt-4 sm:mt-0"
            >
              Subscrever
            </button>
          </form>
        </div>
      </motion.section>
    </div>
  );
}