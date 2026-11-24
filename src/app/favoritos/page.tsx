import { getProducts } from "@/lib/catalog";
import { WishlistClient } from "./WishlistClient";

export const revalidate = 60;

export const metadata = { title: "Favoritos | Aela." };

export default async function FavoritosPage() {
  return <WishlistClient products={await getProducts()} />;
}
