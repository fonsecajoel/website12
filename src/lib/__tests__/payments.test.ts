import { describe, expect, it } from "vitest";
import { buildPixPayload, crc16 } from "../payments/pix";
import { installmentOptions, maxInstallment, pixPrice } from "../payments/installments";
import { cardBrand, expiryValid, luhnValid } from "../payments/card";
import { sandboxBoleto } from "../payments/boleto";
import { isValidCpf, maskCep, maskCpf, formatPrice } from "../format";
import { shippingFor } from "../store-config";

describe("pix", () => {
  it("calcula CRC16-CCITT", () => {
    expect(crc16("123456789")).toBe("29B1");
  });
  it("gera BR Code válido com CRC no fim", () => {
    const p = buildPixPayload({ key: "pix@aela.com.br", merchantName: "Aela Moda", merchantCity: "São Paulo", amount: 142.4, txid: "AE123" });
    expect(p.startsWith("000201")).toBe(true);
    expect(p).toContain("br.gov.bcb.pix");
    expect(p).toContain("5406142.40");
    expect(p.slice(-4)).toBe(crc16(p.slice(0, -4)));
  });
});

describe("parcelamento", () => {
  it("limita a 12x", () => {
    expect(installmentOptions(1000)).toHaveLength(12);
    expect(maxInstallment(1000).value).toBe(83.33);
  });
  it("respeita parcela mínima", () => {
    expect(installmentOptions(59.9)).toHaveLength(2);
    expect(installmentOptions(10)).toHaveLength(1);
  });
  it("aplica 5% no Pix", () => {
    expect(pixPrice(100)).toBe(95);
  });
});

describe("cartão", () => {
  it("valida Luhn e marca", () => {
    expect(luhnValid("4111 1111 1111 1111")).toBe(true);
    expect(luhnValid("4111 1111 1111 1112")).toBe(false);
    expect(cardBrand("4111111111111111")).toBe("Visa");
    expect(cardBrand("5555555555554444")).toBe("Mastercard");
    expect(cardBrand("378282246310005")).toBe("Amex");
  });
  it("valida validade", () => {
    const now = new Date(2026, 10, 24);
    expect(expiryValid("12/30", now)).toBe(true);
    expect(expiryValid("01/20", now)).toBe(false);
    expect(expiryValid("13/30", now)).toBe(false);
  });
});

describe("boleto sandbox", () => {
  it("gera linha digitável com 47 dígitos", () => {
    const b = sandboxBoleto(199.9, "AE12345678", new Date(2026, 11, 1));
    expect(b.digitableLine.replace(/\D/g, "")).toHaveLength(47);
  });
});

describe("formatação", () => {
  it("valida CPF", () => {
    expect(isValidCpf("529.982.247-25")).toBe(true);
    expect(isValidCpf("111.111.111-11")).toBe(false);
  });
  it("aplica máscaras e moeda", () => {
    expect(maskCpf("52998224725")).toBe("529.982.247-25");
    expect(maskCep("01310100")).toBe("01310-100");
    expect(formatPrice(1234.5).replace(/\s/g, " ")).toBe("R$ 1.234,50");
  });
  it("frete grátis acima do limite", () => {
    expect(shippingFor(300)).toBe(0);
    expect(shippingFor(100)).toBe(24.9);
  });
});
