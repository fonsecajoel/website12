import { STORE } from "@/lib/store-config";

export interface InstallmentOption {
  count: number;
  value: number;
  total: number;
}

/** Parcelas sem juros até 12x, respeitando a parcela mínima. */
export function installmentOptions(total: number): InstallmentOption[] {
  const max = Math.max(
    1,
    Math.min(STORE.maxInstallments, Math.floor(total / STORE.minInstallmentValue)),
  );
  return Array.from({ length: max }, (_, i) => {
    const count = i + 1;
    return { count, value: Math.round((total / count) * 100) / 100, total };
  });
}

export function maxInstallment(total: number): InstallmentOption {
  const opts = installmentOptions(total);
  return opts[opts.length - 1];
}

export function pixPrice(total: number): number {
  return Math.round(total * (1 - STORE.pixDiscount) * 100) / 100;
}
