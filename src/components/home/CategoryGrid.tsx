"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/types";

const SPANS = ["md:col-span-2 md:row-span-2", "", "", "md:col-span-2", "", "", "md:col-span-2", ""];

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto w-full max-w-[1500px] px-6 py-24 md:px-16">
      <div className="mb-12 flex items-end justify-between">
        <h2 className="font-serif text-4xl text-warm-100 md:text-6xl">
          Compre por <span className="italic text-gold-300">categoria</span>
        </h2>
        <span className="hidden text-[11px] uppercase tracking-[0.3em] text-warm-400 md:block">{categories.length} universos</span>
      </div>
      <div className="grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4 md:gap-4">
        {categories.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.06 }}
            className={`${SPANS[i] ?? ""} group relative overflow-hidden bg-noir-800`}
          >
            <Link href={c.slug === "novidades" ? "/produtos?filtro=novos" : `/produtos?categoria=${c.slug}`} className="block h-full w-full">
              <Image
                src={c.image.replace("w=400&h=400", "w=900&h=900")}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover opacity-75 transition-all duration-[1400ms] ease-out group-hover:scale-110 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/90 via-noir-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400">0{i + 1}</p>
                  <h3 className="font-serif text-2xl text-warm-100 md:text-3xl">{c.name}</h3>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-warm-100/30 text-warm-100 transition-all duration-500 group-hover:rotate-45 group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-noir-950">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
