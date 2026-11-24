"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { STORE } from "@/lib/store-config";
import { formatPrice } from "@/lib/format";

const MESSAGES = [
  `Frete grátis em compras acima de ${formatPrice(STORE.freeShippingThreshold)}`,
  `Até ${STORE.maxInstallments}x sem juros no cartão de crédito`,
  `${STORE.pixDiscount * 100}% de desconto pagando com Pix`,
  "Primeira troca grátis em até 30 dias",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative h-9 overflow-hidden bg-gold-400 text-noir-950">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold uppercase tracking-[0.2em] px-4 text-center"
        >
          {MESSAGES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
