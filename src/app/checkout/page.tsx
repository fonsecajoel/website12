"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, Smartphone, Landmark, Truck, ChevronRight, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/data";

const InputField = ({ label, placeholder, type = "text", className = "", defaultValue, readOnly }: any) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label className="text-xs uppercase tracking-wider text-warm-400">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      defaultValue={defaultValue}
      readOnly={readOnly}
      className={`bg-noir-800 border border-noir-600 text-warm-100 p-3 focus:outline-none focus:border-gold-400 placeholder:text-warm-500 transition-colors ${readOnly ? 'opacity-70 bg-noir-900 cursor-not-allowed' : ''}`}
    />
  </div>
);

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, updateQuantity, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cartao" | "mbway" | "transferencia">("cartao");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-noir-950 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-serif mb-4 text-warm-100">O seu carrinho está vazio</h1>
        <p className="text-warm-400 mb-8 text-center max-w-md">
          Ainda não adicionou nenhum produto ao seu carrinho.
          Descubra as nossas novidades e encontre a peça perfeita.
        </p>
        <Link 
          href="/produtos?filter=novidades" 
          className="bg-gold-400 text-noir-950 px-8 py-3 font-bold uppercase tracking-widest hover:bg-gold-300 transition-colors"
        >
          Continuar a Comprar
        </Link>
      </div>
    );
  }

  const subtotal = totalPrice();
  const shipping = subtotal > 150 ? 0 : 7.50;
  const total = subtotal + shipping;

  return (
    <div className="bg-noir-950 text-warm-100 min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl lg:text-4xl font-serif mb-8 text-gold-300">Finalizar Encomenda</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-[60%] flex flex-col gap-10">
            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center gap-2 border-b border-noir-700 pb-3 text-warm-100">
                <span className="w-6 h-6 rounded-full bg-gold-400 text-noir-950 flex items-center justify-center text-xs font-sans">1</span>
                Dados Pessoais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Nome Completo" placeholder="O seu nome" className="md:col-span-2" />
                <InputField label="E-mail" placeholder="seu@email.com" type="email" />
                <InputField label="Telemóvel" placeholder="+351 900 000 000" type="tel" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center gap-2 border-b border-noir-700 pb-3 text-warm-100">
                <span className="w-6 h-6 rounded-full bg-gold-400 text-noir-950 flex items-center justify-center text-xs font-sans">2</span>
                Morada de Envio
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <InputField label="País" defaultValue="Portugal" readOnly className="md:col-span-6" />
                <InputField label="Código Postal" placeholder="0000-000" className="md:col-span-2" />
                <InputField label="Morada" placeholder="Nome da rua" className="md:col-span-4" />
                <InputField label="Número" placeholder="123" className="md:col-span-2" />
                <InputField label="Andar / Porta" placeholder="Ex: 2º Dto (opcional)" className="md:col-span-4" />
                <InputField label="Cidade" placeholder="Sua cidade" className="md:col-span-6" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center gap-2 border-b border-noir-700 pb-3 text-warm-100">
                <span className="w-6 h-6 rounded-full bg-gold-400 text-noir-950 flex items-center justify-center text-xs font-sans">3</span>
                Pagamento
              </h2>
              
              <div className="flex gap-2 mb-6 p-1 bg-noir-800 rounded-sm">
                <button 
                  onClick={() => setPaymentMethod("cartao")}
                  className={`flex-1 py-3 text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-colors ${
                    paymentMethod === "cartao" ? "bg-noir-950 text-gold-400 shadow-sm" : "text-warm-400 hover:text-warm-200"
                  }`}
                >
                  <CreditCard className="w-4 h-4" /> Cartão
                </button>
                <button 
                  onClick={() => setPaymentMethod("mbway")}
                  className={`flex-1 py-3 text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-colors ${
                    paymentMethod === "mbway" ? "bg-noir-950 text-gold-400 shadow-sm" : "text-warm-400 hover:text-warm-200"
                  }`}
                >
                  <Smartphone className="w-4 h-4" /> MB Way
                </button>
                <button 
                  onClick={() => setPaymentMethod("transferencia")}
                  className={`flex-1 py-3 text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-colors ${
                    paymentMethod === "transferencia" ? "bg-noir-950 text-gold-400 shadow-sm" : "text-warm-400 hover:text-warm-200"
                  }`}
                >
                  <Landmark className="w-4 h-4" /> Transferência
                </button>
              </div>

              {paymentMethod === "cartao" && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-in fade-in">
                  <InputField label="Número do Cartão" placeholder="0000 0000 0000 0000" className="md:col-span-4" />
                  <InputField label="Nome no Cartão" placeholder="Como impresso no cartão" className="md:col-span-4" />
                  <InputField label="Validade" placeholder="MM/AA" className="md:col-span-2" />
                  <InputField label="CVV" placeholder="123" className="md:col-span-2" />
                </div>
              )}

              {paymentMethod === "mbway" && (
                <div className="flex flex-col items-center justify-center p-8 border border-noir-600 border-dashed animate-in fade-in">
                  <div className="w-24 h-24 bg-noir-900 rounded-full mb-6 flex items-center justify-center text-gold-400">
                    <Smartphone className="w-10 h-10" />
                  </div>
                  <p className="text-warm-300 text-center mb-6">
                    Efetue o pagamento através da app MB Way. Introduza o seu número de telemóvel.
                  </p>
                  <div className="w-full max-w-sm">
                    <InputField label="Telemóvel MB Way" placeholder="+351 900 000 000" type="tel" />
                  </div>
                </div>
              )}

              {paymentMethod === "transferencia" && (
                <div className="p-6 border border-noir-600 border-dashed text-center animate-in fade-in">
                  <p className="text-warm-100 mb-2">Os dados bancários serão enviados após a finalização da encomenda.</p>
                  <p className="text-warm-400 text-sm">A encomenda será processada após confirmação do pagamento.</p>
                </div>
              )}
            </section>
          </div>

          <div className="lg:w-[40%]">
            <div className="bg-noir-800 p-6 sticky top-24">
              <h2 className="text-xl font-serif mb-6 border-b border-noir-700 pb-4 text-warm-100">Resumo da Encomenda</h2>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4 border-b border-noir-700 pb-4 last:border-0 last:pb-0">
                    <div className="w-20 h-24 relative flex-shrink-0 bg-noir-700">
                      <Image 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-sm font-medium text-warm-100 line-clamp-2">{item.product.name}</h3>
                          <button 
                            onClick={() => removeItem(item.product.id, item.size, item.color)}
                            className="text-warm-400 hover:text-wine-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-warm-400 mt-1">
                          Cor: {item.color} | Tam: {item.size}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-noir-600 h-8 bg-noir-900">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, Math.max(1, item.quantity - 1))}
                            className="w-8 flex items-center justify-center text-warm-400 hover:text-gold-400 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs text-warm-100">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="w-8 flex items-center justify-center text-warm-400 hover:text-gold-400 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium text-gold-400">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Código promocional" 
                  className="flex-1 bg-noir-900 border border-noir-600 text-warm-100 p-3 text-sm focus:outline-none focus:border-gold-400 placeholder:text-warm-500 transition-colors"
                />
                <button className="bg-transparent border border-gold-500 text-gold-400 px-4 text-sm font-bold uppercase tracking-wider hover:bg-gold-400 hover:text-noir-950 transition-colors">
                  Aplicar
                </button>
              </div>

              <div className="flex flex-col gap-3 text-sm mb-6 border-b border-noir-700 pb-6">
                <div className="flex justify-between text-warm-400">
                  <span>Subtotal</span>
                  <span className="text-warm-100">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-warm-400">
                  <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Portes</span>
                  <span className={shipping === 0 ? "text-gold-400 font-medium" : "text-warm-100"}>
                    {shipping === 0 ? "Grátis" : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-base uppercase tracking-widest text-warm-400">Total</span>
                <span className="text-2xl font-serif text-gold-400">{formatPrice(total)}</span>
              </div>

              <button 
                onClick={() => alert("Encomenda realizada com sucesso!")}
                className="w-full bg-gold-400 text-noir-950 font-bold h-14 uppercase tracking-widest hover:bg-gold-300 transition-colors flex items-center justify-center gap-2"
              >
                Finalizar Encomenda <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
