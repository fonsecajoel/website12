/** Regras comerciais da loja — centralizadas para o checkout, carrinho e servidor usarem os mesmos valores. */
export const STORE = {
  name: "Aela.",
  freeShippingThreshold: 299,
  shippingFlat: 24.9,
  pixDiscount: 0.05,
  maxInstallments: 12,
  minInstallmentValue: 20,
  pixExpiresMinutes: 30,
  boletoDueDays: 3,
} as const;

export function shippingFor(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= STORE.freeShippingThreshold ? 0 : STORE.shippingFlat;
}
