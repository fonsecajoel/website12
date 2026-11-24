import { Sparkles } from "lucide-react";

export function Marquee({ items, fast = false }: { items: string[]; fast?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-gold-700/30 bg-noir-900 py-5">
      <div className={`flex w-max gap-12 ${fast ? "animate-marquee-fast" : "animate-marquee"}`}>
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-12 font-serif text-2xl md:text-4xl italic text-warm-200 whitespace-nowrap">
            {item}
            <Sparkles className="w-5 h-5 text-gold-400" strokeWidth={1.2} />
          </span>
        ))}
      </div>
    </div>
  );
}
