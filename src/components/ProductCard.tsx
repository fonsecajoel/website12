import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/data";
import { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produto/${product.slug}`} className="group block bg-noir-800 rounded-sm overflow-hidden border border-transparent hover:border-gold-500/30 transition-colors duration-500">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-noir-700">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            unoptimized
          />
        ) : null}
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="text-gold-400 text-xs uppercase tracking-widest font-medium drop-shadow-md">
              Novo
            </span>
          )}
          {product.isPromo && (
            <span className="bg-wine-500 text-warm-100 text-[10px] uppercase tracking-widest px-2 py-1">
              Promo
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col space-y-2">
        <h3 className="font-serif text-base md:text-lg text-warm-100 leading-snug group-hover:text-gold-400 transition-colors duration-300">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 font-sans text-sm">
          {product.isPromo && product.originalPrice ? (
            <>
              <span className="text-warm-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-gold-400 font-medium">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-gold-400 font-medium">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
