"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function Editorial() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 160]);
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      <motion.p style={{ x }} className="pointer-events-none whitespace-nowrap font-black text-[18vw] italic leading-none text-outline opacity-30">
        Sofisticação atemporal
      </motion.p>
      <div className="mx-auto -mt-[8vw] grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:px-16">
        <motion.div style={{ y: y1 }} className="relative aspect-[3/4] md:col-span-5">
          <Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop" alt="Editorial" fill sizes="40vw" className="object-cover" />
        </motion.div>
        <div className="md:col-span-4 md:col-start-7">
          <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-gold-400">Editorial</p>
          <h2 className="mb-6 font-bold text-4xl leading-tight text-warm-100 md:text-5xl">
            Peças com história, feitas para <span className="italic text-gold-300">durar</span>.
          </h2>
          <p className="mb-10 leading-relaxed text-warm-100">
            Tecidos nobres, acabamento artesanal e um olhar atento a cada detalhe. Cada peça é selecionada para acompanhar
            você em todos os momentos — do café da manhã ao jantar de gala.
          </p>
          <Link href="/produtos" className="inline-block border border-gold-500 px-10 py-4 text-[11px] uppercase tracking-[0.25em] text-gold-300 transition-all duration-500 hover:bg-gold-400 hover:text-noir-950">
            Descobrir a coleção
          </Link>
        </div>
        <motion.div style={{ y: y2 }} className="relative hidden aspect-[3/4] md:col-span-2 md:block">
          <Image src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=800&auto=format&fit=crop" alt="Detalhe" fill sizes="20vw" className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}
