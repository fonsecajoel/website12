import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-cafe-500 text-warm-100 pt-20 pb-10 border-t border-gold-400/20 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-medium text-gold-300 mb-8">Comprar</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/produtos?filtro=novos" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  Novidades
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=vestidos" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  Vestidos
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=blusas" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  Tops & Blusas
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=saias" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  Saias
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=sapatos" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  Sapatos
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=bolsas" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  Bolsas
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=bijuteria" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  Acessórios
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-medium text-gold-300 mb-8">Sobre</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/sobre" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  A Marca
                </Link>
              </li>
              <li>
                <Link href="/lojas" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  As Nossas Lojas
                </Link>
              </li>
              <li>
                <Link href="/sustentabilidade" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  Sustentabilidade
                </Link>
              </li>
              <li>
                <Link href="/carreiras" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  Carreiras
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-medium text-gold-300 mb-8">Ajuda</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/faq" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/entregas" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  Entregas e Portes
                </Link>
              </li>
              <li>
                <Link href="/trocas" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                  Contacte-nos
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest font-medium text-gold-300 mb-8">Newsletter</h3>
              <form className="flex border-b border-warm-100/30 group relative focus-within:border-gold-400 transition-colors duration-300">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="bg-transparent w-full py-2 text-sm text-warm-100 focus:outline-none placeholder:text-warm-100/60"
                  required
                />
                <button 
                  type="submit" 
                  className="p-2 text-warm-100 hover:text-gold-300 transition-colors"
                  aria-label="Subscrever newsletter"
                >
                  <ArrowRight className="w-5 h-5 group-focus-within:text-gold-300 transition-colors" />
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest font-medium text-gold-300 mb-8">Redes Sociais</h3>
              <ul className="space-y-4">
                <li>
                  <a href="https://www.instagram.com/oneaela?igsh=Zm5lYXp3ODZqOTRx&utm_source=qr" target="_blank" rel="noreferrer" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="text-sm text-warm-100 hover:text-gold-300 transition-colors duration-300">
                    Pinterest
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-gold-400/20 gap-6">
          <div className="text-[10px] uppercase tracking-widest text-warm-100">
            Pix · Cartão de débito · Crédito em até 12x · Boleto à vista
          </div>

          <p className="text-[11px] text-warm-100 text-center md:text-right tracking-wide">
            <span className="text-gold-300 font-bold mr-1">Aela.</span> © 2026. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
