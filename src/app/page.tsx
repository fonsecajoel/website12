import HeroSection from "@/components/HeroSection";
import { Marquee } from "@/components/Marquee";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Editorial } from "@/components/home/Editorial";
import { PaymentPerks } from "@/components/home/PaymentPerks";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { getCategories, getProducts } from "@/lib/catalog";

export const revalidate = 60;

export default async function Home() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return (
    <div className="flex flex-col bg-noir-950 text-warm-100">
      <HeroSection />
      <Marquee items={["Nova coleção", "Pix com 5% off", "12x sem juros", "Frete grátis", "Edição limitada"]} />
      <ProductShowcase products={products} />
      <CategoryGrid categories={categories} />
      <Editorial />
      <PaymentPerks />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
