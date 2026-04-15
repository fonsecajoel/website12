"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] min-h-[700px] overflow-hidden flex flex-col justify-end bg-noir-950">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
           alt="Vista o seu estilo de viver"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/60 to-noir-950/30 pointer-events-none z-0" />

      <div className="absolute bottom-20 left-8 md:left-16 lg:left-24 max-w-4xl z-10 flex flex-col items-start">
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="font-sans text-sm md:text-base uppercase tracking-[0.3em] text-warm-200 font-light mb-4"
        >
          Coleção Primavera Verão 2026
        </motion.p>

        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-gold-300 leading-none mb-2"
        >
          Vista o seu estilo de viver.
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
          className="h-[1px] w-32 bg-gradient-to-r from-gold-300 via-gold-500/50 to-transparent mt-4 mb-10 origin-left"
        />

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
        >
          <Link
            href="/produtos"
            className="inline-block bg-gold-400 text-noir-950 hover:bg-gold-300 px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-500"
          >
            Explorar Coleção
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-16 bg-gradient-to-b from-gold-400/50 to-transparent"
        />
      </div>
    </section>
  );
}
