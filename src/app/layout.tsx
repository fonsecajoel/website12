import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { AnnouncementBar } from "@/components/AnnouncementBar";

// Brand Guide Aela: Lato Regular (400), Bold (700) e Black (900)
const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"], style: ["normal", "italic"], variable: "--font-lato" });

export const metadata: Metadata = {
  title: "Aela. | Moda Feminina de Luxo",
  description: "Vestidos, sapatos, bolsas e acessórios de luxo. Pix com 5% off, até 12x sem juros e boleto. Moda feminina com qualidade premium para mulheres que definem o seu próprio estilo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${lato.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col bg-noir-950 text-warm-100">
        <AnnouncementBar />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
