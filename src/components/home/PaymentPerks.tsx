import { Barcode, CreditCard, QrCode, Truck, Wallet } from "lucide-react";
import { STORE } from "@/lib/store-config";
import { formatPrice } from "@/lib/format";

const PERKS = [
  { icon: QrCode, title: "Pix", text: `${STORE.pixDiscount * 100}% de desconto e aprovação imediata` },
  { icon: CreditCard, title: "Crédito", text: `Em até ${STORE.maxInstallments}x sem juros` },
  { icon: Wallet, title: "Débito", text: "Pagamento à vista, sem complicação" },
  { icon: Barcode, title: "Boleto", text: `À vista, vencimento em ${STORE.boletoDueDays} dias úteis` },
  { icon: Truck, title: "Frete grátis", text: `Acima de ${formatPrice(STORE.freeShippingThreshold)}` },
];

export function PaymentPerks() {
  return (
    <section className="border-y border-gold-700/20 bg-noir-900">
      <div className="mx-auto grid max-w-[1500px] grid-cols-2 md:grid-cols-5">
        {PERKS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="group flex flex-col items-center gap-3 border-noir-700 px-4 py-10 text-center transition-colors hover:bg-noir-800 md:border-r last:border-r-0">
            <Icon className="h-7 w-7 text-gold-400 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110" strokeWidth={1.2} />
            <p className="font-bold text-xl text-warm-100">{title}</p>
            <p className="text-xs text-warm-100">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
