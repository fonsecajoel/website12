import { Star } from "lucide-react";

const QUOTES = [
  { name: "Mariana S.", city: "São Paulo", text: "O vestido chegou impecável, embalagem de luxo. Já virei cliente fiel!" },
  { name: "Camila R.", city: "Rio de Janeiro", text: "Paguei no Pix com desconto e recebi em dois dias. Qualidade absurda." },
  { name: "Juliana P.", city: "Belo Horizonte", text: "Parcelei em 12x sem juros e o caimento do blazer é perfeito." },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-16">
      <h2 className="mb-16 text-center font-serif text-4xl text-warm-100 md:text-6xl">
        Quem veste, <span className="italic text-gold-300">aprova</span>.
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {QUOTES.map((q) => (
          <figure key={q.name} className="flex flex-col gap-6 border border-noir-700 bg-noir-900 p-8 transition-colors hover:border-gold-700">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <blockquote className="font-serif text-2xl leading-snug text-warm-100">“{q.text}”</blockquote>
            <figcaption className="mt-auto text-[11px] uppercase tracking-[0.25em] text-warm-400">
              {q.name} — {q.city}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
