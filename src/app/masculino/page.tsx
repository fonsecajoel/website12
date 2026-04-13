import ProductListingClient from "@/components/ProductListingClient";
import { getProductsByCategory } from "@/lib/data";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function MasculinoPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const filter = typeof searchParams.filter === "string" ? searchParams.filter : undefined;
  const masculinoProducts = getProductsByCategory("masculino");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Masculino" },
  ];

  return (
    <ProductListingClient
      initialProducts={masculinoProducts}
      title="Masculino"
      breadcrumbs={breadcrumbs}
      initialCategory="masculino"
      initialFilter={filter}
    />
  );
}
