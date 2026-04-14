import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Aela. | Moda Feminina de Luxo",
  description: "Descubra vestidos, sapatos, malas e acessórios de luxo na Aela. Moda feminina com qualidade premium para mulheres que definem o seu próprio estilo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" className="h-full antialiased">
        <body className="min-h-full flex flex-col bg-noir-950 text-warm-100">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
