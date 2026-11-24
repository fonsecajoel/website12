"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, QrCode, Sparkles } from "lucide-react";

const img = (id: string, w = 1200, h = 1600): string =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=85&auto=format`;

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const ySide = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const yTop = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="grain relative min-h-[calc(100svh-7.5rem)] w-full overflow-hidden bg-noir-950">
      {/* brilho ambiente */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[600px] w-[600px] rounded-full bg-gold-500/15 blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-cafe-500/60 blur-[140px]" />

      <div className="relative mx-auto grid min-h-[calc(100svh-7.5rem)] max-w-[1600px] grid-cols-1 items-center gap-10 px-6 py-14 md:px-12 lg:grid-cols-12">
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 lg:col-span-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-400/10 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-gold-300"
          >
            <Sparkles className="h-3.5 w-3.5" /> Coleção Verão 2026
          </motion.span>

          <h1 className="font-bold leading-[0.88] tracking-tight text-[clamp(3.5rem,8vw,8.5rem)]">
            {["Vista o seu", "estilo", "de viver."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease }}
                  className={`block ${i === 1 ? "italic text-shimmer pl-[0.6em]" : "text-warm-100"}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-8 max-w-md text-base leading-relaxed text-warm-100"
          >
            Peças de alfaiataria, festa e dia a dia com acabamento de ateliê. Edição limitada, entrega para todo o Brasil.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/produtos"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-gold-400 px-10 py-5 text-[11px] font-bold uppercase tracking-[0.25em] text-noir-950"
            >
              <span className="absolute inset-0 -translate-x-full bg-warm-100 transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">Comprar agora</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/produtos?filtro=promo"
              className="inline-flex items-center justify-center border border-warm-100/25 px-10 py-5 text-[11px] uppercase tracking-[0.25em] text-warm-100 transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              Até 30% off
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-12 grid max-w-md grid-cols-3 divide-x divide-noir-600 border-y border-noir-600 py-5"
          >
            {[
              ["12x", "sem juros"],
              ["5%", "off no Pix"],
              ["30d", "troca grátis"],
            ].map(([big, small]) => (
              <div key={big} className="px-4 first:pl-0">
                <dt className="font-black text-3xl text-gold-300">{big}</dt>
                <dd className="text-[10px] uppercase tracking-[0.2em] text-warm-100">{small}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* colagem editorial */}
        <div className="relative hidden h-[78vh] max-h-[820px] lg:col-span-6 lg:block">
          <motion.div
            style={{ y: yMain }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.4, ease }}
            className="absolute right-[18%] top-0 h-[88%] w-[58%] overflow-hidden"
          >
            <Image src={img("1581044777550-4cfa60707c03")} alt="Look romântico Aela." fill priority sizes="35vw" className="object-cover" />
          </motion.div>
          <motion.div
            style={{ y: ySide }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 1.4, delay: 0.3, ease }}
            className="absolute bottom-0 right-0 h-[46%] w-[34%] overflow-hidden border-4 border-noir-950"
          >
            <Image src={img("1566174053879-31528523f8ae", 700, 900)} alt="Vestido de festa" fill sizes="20vw" className="object-cover" />
          </motion.div>
          <motion.div
            style={{ y: yTop }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.4, delay: 0.5, ease }}
            className="absolute bottom-[6%] left-0 h-[38%] w-[30%] overflow-hidden border-4 border-noir-950"
          >
            <Image src={img("1554412933-514a83d2f3c8", 700, 900)} alt="Casaco e chapéu" fill sizes="20vw" className="object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.2, type: "spring", damping: 12 }}
            className="absolute right-[10%] top-[8%] z-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gold-400 text-noir-950"
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <defs><path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
                <text className="fill-noir-950 text-[8px] font-bold uppercase tracking-[0.25em]">
                  <textPath href="#circle">Nova coleção • Aela • 2026 •</textPath>
                </text>
              </svg>
            </motion.div>
            <span className="absolute inset-0 flex items-center justify-center font-black text-3xl italic text-noir-950">26</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease }}
            className="absolute left-[8%] top-[22%] z-10 flex items-center gap-3 border border-gold-500/30 bg-noir-950/80 px-4 py-3 backdrop-blur-md"
          >
            <QrCode className="h-6 w-6 text-gold-400" strokeWidth={1.3} />
            <div>
              <p className="text-xs font-semibold text-warm-100">5% off no Pix</p>
              <p className="text-[10px] text-warm-100">Aprovação na hora</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
