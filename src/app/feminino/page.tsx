import ProductListingClient from "@/components/ProductListingClient";
import { getProductsByCategory } from "@/lib/data";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function FemininoPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const filter = typeof searchParams.filter === "string" ? searchParams.filter : undefined;
  const femininoProducts = getProductsByCategory("feminino");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Feminino" },
  ];

  return (
    <ProductListingClient
      initialProducts={femininoProducts}
      title="Feminino"
      breadcrumbs={breadcrumbs}
      initialCategory="feminino"
      initialFilter={filter}
    />
  );
}
