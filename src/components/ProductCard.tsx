import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/data";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produto/${product.slug}`} className="group block w-full relative">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-aela-dark-lighter rounded-sm mb-4">
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-aela-gold text-aela-black text-[10px] font-bold tracking-widest uppercase px-2 py-1">
              Novo
            </span>
          )}
          {product.isPromo && (
            <span className="bg-red-700 text-aela-cream text-[10px] font-bold tracking-widest uppercase px-2 py-1">
              Promo
            </span>
          )}
        </div>

        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-aela-dark text-aela-gray">
            Sem imagem
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"></div>
      </div>

      <div className="flex flex-col space-y-1">
        <h3 className="text-aela-cream text-sm font-medium tracking-wide uppercase truncate transition-colors duration-300 group-hover:text-aela-gold">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mt-1">
          {product.isPromo && product.originalPrice ? (
            <>
              <span className="text-aela-gray text-sm line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-aela-gold text-sm font-semibold">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-aela-cream-dark text-sm font-semibold">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
