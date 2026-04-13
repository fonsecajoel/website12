import ProductListingClient from "@/components/ProductListingClient";
import { products } from "@/lib/data";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ProdutosPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined;
  const filter = typeof searchParams.filter === "string" ? searchParams.filter : undefined;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Produtos" },
  ];

  return (
    <ProductListingClient
      initialProducts={products}
      title="Todos os Produtos"
      breadcrumbs={breadcrumbs}
      initialCategory={category}
      initialFilter={filter}
    />
  );
}
