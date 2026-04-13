"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/data";

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const close = useCartStore((state) => state.close);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const totalItems = useCartStore((state) => state.totalItems());

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-aela-black/60 backdrop-blur-sm transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[400px] bg-aela-dark border-l border-aela-dark-lighter shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between p-6 border-b border-aela-dark-lighter">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-aela-gold" />
            <h2 className="text-xl text-aela-cream font-medium tracking-widest uppercase">
              Carrinho
            </h2>
            <span className="bg-aela-gold text-aela-black text-xs font-bold px-2.5 py-0.5 rounded-full ml-1">
              {totalItems}
            </span>
          </div>
          <button
            onClick={close}
            className="text-aela-gray hover:text-aela-gold transition-colors p-2 -mr-2"
            aria-label="Fechar carrinho"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="w-24 h-24 bg-aela-dark-lighter rounded-full flex items-center justify-center text-aela-gold/30 mb-2 border border-aela-gold/10">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <p className="text-aela-gray-light text-lg tracking-wide">Seu carrinho está vazio</p>
              <button
                onClick={close}
                className="px-8 py-3 border border-aela-gold text-aela-gold hover:bg-aela-gold hover:text-aela-black transition-colors uppercase tracking-[0.2em] text-xs font-bold"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 relative group"
                >
                  <Link
                    href={`/produtos/${item.product.slug}`}
                    onClick={close}
                    className="relative w-[80px] h-[100px] shrink-0 bg-aela-dark-lighter overflow-hidden border border-aela-dark-lighter block"
                  >
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </Link>

                  <div className="flex flex-col flex-1 justify-between py-0.5">
                    <div className="flex justify-between items-start gap-2">
                      <div className="pr-4">
                        <h3 className="text-aela-cream font-medium text-sm line-clamp-2 leading-tight group-hover:text-aela-gold transition-colors">
                          <Link href={`/produtos/${item.product.slug}`} onClick={close}>
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="text-aela-gray-light text-xs mt-1.5 tracking-wide">
                          Cor: <span className="text-aela-cream">{item.color}</span>
                        </p>
                        <p className="text-aela-gray-light text-xs mt-0.5 tracking-wide">
                          Tam: <span className="text-aela-cream">{item.size}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                        className="text-aela-gray-light hover:text-aela-error transition-colors shrink-0 p-1 -mr-1"
                        aria-label="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-aela-dark-lighter bg-aela-dark overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.color,
                              item.quantity - 1
                            )
                          }
                          className="px-2.5 py-1.5 text-aela-gold hover:bg-aela-dark-lighter transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs text-aela-cream font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.color,
                              item.quantity + 1
                            )
                          }
                          className="px-2.5 py-1.5 text-aela-gold hover:bg-aela-dark-lighter transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-aela-gold font-medium text-sm tracking-wider">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-aela-dark-lighter bg-aela-dark/95 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <span className="text-aela-gray-light uppercase tracking-[0.15em] text-xs font-semibold">
                Subtotal
              </span>
              <span className="text-xl text-aela-cream font-medium tracking-wider">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <div className="space-y-4">
              <Link
                href="/checkout"
                onClick={close}
                className="w-full block text-center bg-aela-gold text-aela-black py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-aela-gold-light transition-all shadow-[0_0_20px_rgba(201,169,110,0.15)] hover:shadow-[0_0_30px_rgba(201,169,110,0.3)]"
              >
                Finalizar Compra
              </Link>

              <button
                onClick={close}
                className="w-full text-center text-aela-gray-light hover:text-aela-gold text-xs transition-colors tracking-widest uppercase py-2"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
