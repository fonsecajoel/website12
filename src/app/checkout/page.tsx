"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, QrCode, Truck, ChevronRight, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/data";

const InputField = ({ label, placeholder, type = "text", className = "" }: any) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label className="text-xs uppercase tracking-wider text-aela-gray">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="bg-aela-dark border border-aela-dark-lighter text-aela-cream p-3 focus:outline-none focus:border-aela-gold transition-colors"
    />
  </div>
);

export default function CheckoutPage() { {
  const router = useRouter();
  const { items, totalPrice, updateQuantity, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cartao" | "boleto" | "pix">("cartao");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-aela-black flex flex-col items-center justify-center text-aela-cream p-4">
        <h1 className="text-3xl font-serif mb-4">Seu carrinho está vazio</h1>
        <p className="text-aela-gray mb-8 text-center max-w-md">
          Parece que você ainda não adicionou nenhum produto ao seu carrinho.
          Descubra nossas novidades e encontre a peça perfeita.
        </p>
        <Link 
          href="/categoria/novidades" 
          className="bg-aela-gold text-aela-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-aela-gold-light transition-colors"
        >
          Continuar Comprando
        </Link>
      </div>
    );
  }

  const subtotal = totalPrice();
  const shipping = subtotal > 299 ? 0 : 19.9;
  const total = subtotal + shipping;

  return (
    <div className="bg-aela-black min-h-screen pt-24 pb-16 text-aela-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl lg:text-4xl font-serif mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-[60%] flex flex-col gap-10">
            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center gap-2 border-b border-aela-dark-lighter pb-3">
                <span className="w-6 h-6 rounded-full bg-aela-dark text-aela-gold flex items-center justify-center text-xs font-sans">1</span>
                Dados Pessoais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Nome Completo" placeholder="Seu nome" className="md:col-span-2" />
                <InputField label="E-mail" placeholder="seu@email.com" type="email" />
                <InputField label="Telefone / WhatsApp" placeholder="(00) 00000-0000" type="tel" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center gap-2 border-b border-aela-dark-lighter pb-3">
                <span className="w-6 h-6 rounded-full bg-aela-dark text-aela-gold flex items-center justify-center text-xs font-sans">2</span>
                Endereço de Entrega
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <InputField label="CEP" placeholder="00000-000" className="md:col-span-2" />
                <InputField label="Rua / Avenida" placeholder="Nome da rua" className="md:col-span-4" />
                <InputField label="Número" placeholder="123" className="md:col-span-2" />
                <InputField label="Complemento" placeholder="Apto, Bloco (opcional)" className="md:col-span-4" />
                <InputField label="Bairro" placeholder="Bairro" className="md:col-span-2" />
                <InputField label="Cidade" placeholder="Cidade" className="md:col-span-3" />
                <InputField label="Estado" placeholder="UF" className="md:col-span-1" />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center gap-2 border-b border-aela-dark-lighter pb-3">
                <span className="w-6 h-6 rounded-full bg-aela-dark text-aela-gold flex items-center justify-center text-xs font-sans">3</span>
                Pagamento
              </h2>
              
              <div className="flex gap-2 mb-6 p-1 bg-aela-dark rounded-sm">
                <button 
                  onClick={() => setPaymentMethod("cartao")}
                  className={`flex-1 py-3 text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-colors ${
                    paymentMethod === "cartao" ? "bg-aela-black text-aela-gold shadow-sm" : "text-aela-gray hover:text-aela-cream"
                  }`}
                >
                  <CreditCard className="w-4 h-4" /> Cartão
                </button>
                <button 
                  onClick={() => setPaymentMethod("pix")}
                  className={`flex-1 py-3 text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-colors ${
                    paymentMethod === "pix" ? "bg-aela-black text-aela-gold shadow-sm" : "text-aela-gray hover:text-aela-cream"
                  }`}
                >
                  <QrCode className="w-4 h-4" /> PIX
                </button>
                <button 
                  onClick={() => setPaymentMethod("boleto")}
                  className={`flex-1 py-3 text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-colors ${
                    paymentMethod === "boleto" ? "bg-aela-black text-aela-gold shadow-sm" : "text-aela-gray hover:text-aela-cream"
                  }`}
                >
                  Boleto
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

              {paymentMethod === "pix" && (
                <div className="flex flex-col items-center justify-center p-8 border border-aela-dark-lighter border-dashed animate-in fade-in">
                  <div className="w-48 h-48 bg-aela-cream mb-6 flex items-center justify-center relative">
                    <QrCode className="w-32 h-32 text-aela-black" />
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center backdrop-blur-[1px]">
                      <span className="bg-aela-black text-aela-cream text-xs px-3 py-1 font-bold">QR CODE DEMO</span>
                    </div>
                  </div>
                  <p className="text-aela-gray text-sm text-center mb-4 max-w-xs">
                    Escaneie o QR Code com o app do seu banco ou copie o código abaixo.
                  </p>
                  <button className="text-aela-gold border border-aela-gold px-6 py-2 text-sm uppercase tracking-widest hover:bg-aela-gold hover:text-aela-black transition-colors font-bold">
                    Copiar Código PIX
                  </button>
                </div>
              )}

              {paymentMethod === "boleto" && (
                <div className="p-6 border border-aela-dark-lighter border-dashed text-center animate-in fade-in">
                  <p className="text-aela-cream mb-2">O boleto será gerado após a finalização da compra.</p>
                  <p className="text-aela-gray text-sm">Vencimento em 3 dias úteis. A aprovação pode levar até 48h.</p>
                </div>
              )}
            </section>
          </div>

          <div className="lg:w-[40%]">
            <div className="bg-aela-dark p-6 sticky top-24">
              <h2 className="text-xl font-serif mb-6 border-b border-aela-dark-lighter pb-4">Resumo do Pedido</h2>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4 border-b border-aela-dark-lighter pb-4 last:border-0 last:pb-0">
                    <div className="w-20 h-24 relative flex-shrink-0 bg-aela-black">
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
                        <h3 className="text-sm font-medium text-aela-cream line-clamp-1">{item.product.name}</h3>
                        <p className="text-xs text-aela-gray mt-1">
                          Cor: {item.color} | Tam: {item.size}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-aela-dark-lighter h-8">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="w-8 flex items-center justify-center text-aela-gray hover:text-aela-gold transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="w-8 flex items-center justify-center text-aela-gray hover:text-aela-gold transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium text-aela-gold">
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
                  placeholder="Cupom de desconto" 
                  className="flex-1 bg-aela-black border border-aela-dark-lighter text-aela-cream p-3 text-sm focus:outline-none focus:border-aela-gold transition-colors"
                />
                <button className="bg-aela-black border border-aela-gold text-aela-gold px-4 text-sm font-bold uppercase tracking-wider hover:bg-aela-gold hover:text-aela-black transition-colors">
                  Aplicar
                </button>
              </div>

              <div className="flex flex-col gap-3 text-sm mb-6 border-b border-aela-dark-lighter pb-6">
                <div className="flex justify-between text-aela-gray">
                  <span>Subtotal</span>
                  <span className="text-aela-cream">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-aela-gray">
                  <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Frete</span>
                  <span className={shipping === 0 ? "text-aela-gold" : "text-aela-cream"}>
                    {shipping === 0 ? "Grátis" : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-base uppercase tracking-widest text-aela-gray">Total</span>
                <span className="text-2xl font-serif text-aela-gold">{formatPrice(total)}</span>
              </div>

              <button 
                onClick={() => alert("Pedido finalizado com sucesso!")}
                className="w-full bg-aela-gold text-aela-black font-bold h-14 uppercase tracking-widest hover:bg-aela-gold-light transition-colors flex items-center justify-center gap-2"
              >
                Finalizar Pedido <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
}
