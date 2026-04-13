import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-aela-dark text-aela-cream-dark pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-aela-gold font-medium tracking-[0.15em] uppercase text-sm">Departamentos</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/novidades" className="text-sm hover:text-aela-gold transition-colors">
                  Novidades
                </Link>
              </li>
              <li>
                <Link href="/feminino" className="text-sm hover:text-aela-gold transition-colors">
                  Feminino
                </Link>
              </li>
              <li>
                <Link href="/masculino" className="text-sm hover:text-aela-gold transition-colors">
                  Masculino
                </Link>
              </li>
              <li>
                <Link href="/jeans" className="text-sm hover:text-aela-gold transition-colors">
                  Jeans
                </Link>
              </li>
              <li>
                <Link href="/acessorios" className="text-sm hover:text-aela-gold transition-colors">
                  Acessórios
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-aela-gold font-medium tracking-[0.15em] uppercase text-sm">Sobre Nós</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/sobre" className="text-sm hover:text-aela-gold transition-colors">
                  A Marca
                </Link>
              </li>
              <li>
                <Link href="/lojas" className="text-sm hover:text-aela-gold transition-colors">
                  Nossas Lojas
                </Link>
              </li>
              <li>
                <Link href="/sustentabilidade" className="text-sm hover:text-aela-gold transition-colors">
                  Sustentabilidade
                </Link>
              </li>
              <li>
                <Link href="/trabalhe-conosco" className="text-sm hover:text-aela-gold transition-colors">
                  Trabalhe Conosco
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-aela-gold font-medium tracking-[0.15em] uppercase text-sm">Ajuda</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/faq" className="text-sm hover:text-aela-gold transition-colors">
                  Dúvidas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/entregas" className="text-sm hover:text-aela-gold transition-colors">
                  Entregas e Frete
                </Link>
              </li>
              <li>
                <Link href="/trocas" className="text-sm hover:text-aela-gold transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm hover:text-aela-gold transition-colors">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-aela-gold font-medium tracking-[0.15em] uppercase text-sm">Redes Sociais</h3>
              <div className="flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-aela-black flex items-center justify-center text-aela-cream hover:text-aela-black hover:bg-aela-gold transition-all duration-300 group">
                  <span className="text-xs font-mono group-hover:scale-110 transition-transform">IG</span>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-aela-black flex items-center justify-center text-aela-cream hover:text-aela-black hover:bg-aela-gold transition-all duration-300 group">
                  <span className="text-xs font-mono group-hover:scale-110 transition-transform">FB</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-aela-black flex items-center justify-center text-aela-cream hover:text-aela-black hover:bg-aela-gold transition-all duration-300 group">
                  <span className="text-xs font-mono group-hover:scale-110 transition-transform">X</span>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-aela-black flex items-center justify-center text-aela-cream hover:text-aela-black hover:bg-aela-gold transition-all duration-300 group">
                  <span className="text-xs font-mono group-hover:scale-110 transition-transform">YT</span>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-aela-gold font-medium tracking-[0.15em] uppercase text-sm">Newsletter</h3>
              <p className="text-xs text-aela-gray-light leading-relaxed">
                Receba novidades e promoções exclusivas em primeira mão.
              </p>
              <form className="flex border-b border-aela-gray/30 group">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="bg-transparent w-full py-2 text-sm text-aela-cream focus:outline-none placeholder:text-aela-gray/50"
                  required
                />
                <button 
                  type="submit" 
                  className="p-2 text-aela-gray hover:text-aela-gold transition-colors"
                  aria-label="Assinar newsletter"
                >
                  <ArrowRight className="w-5 h-5 group-focus-within:text-aela-gold transition-colors" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-6">
          <div className="flex flex-wrap justify-center items-center gap-3">
            <span className="text-xs font-mono text-aela-gray-light px-2 py-1 bg-aela-black rounded">PIX</span>
            <span className="text-xs font-mono text-aela-gray-light px-2 py-1 bg-aela-black rounded">VISA</span>
            <span className="text-xs font-mono text-aela-gray-light px-2 py-1 bg-aela-black rounded">MASTERCARD</span>
            <span className="text-xs font-mono text-aela-gray-light px-2 py-1 bg-aela-black rounded">AMEX</span>
            <span className="text-xs font-mono text-aela-gray-light px-2 py-1 bg-aela-black rounded">BOLETO</span>
          </div>

          <p className="text-xs text-aela-gray-light text-center md:text-right">
            Aela. © 2025. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
