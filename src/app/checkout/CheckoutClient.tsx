"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Barcode, Check, ChevronLeft, Copy, CreditCard, Loader2, Lock, QrCode, Wallet } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";
import { formatPrice, isValidCpf, maskCardNumber, maskCep, maskCpf, maskExpiry, maskPhone, onlyDigits } from "@/lib/format";
import { STORE, shippingFor } from "@/lib/store-config";
import { installmentOptions, pixPrice } from "@/lib/payments/installments";
import { cardBrand, expiryValid, luhnValid } from "@/lib/payments/card";
import type { Address, Customer, Order, PaymentMethod } from "@/lib/types";

const STEPS = ["Identificação", "Entrega", "Pagamento"] as const;

const METHODS: { id: PaymentMethod; label: string; hint: string; icon: typeof QrCode }[] = [
  { id: "pix", label: "Pix", hint: `${STORE.pixDiscount * 100}% off · aprovação imediata`, icon: QrCode },
  { id: "credito", label: "Cartão de crédito", hint: `Em até ${STORE.maxInstallments}x sem juros`, icon: CreditCard },
  { id: "debito", label: "Cartão de débito", hint: "À vista", icon: Wallet },
  { id: "boleto", label: "Boleto bancário", hint: `À vista · vence em ${STORE.boletoDueDays} dias`, icon: Barcode },
];

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-[0.2em] text-warm-400">{label}</span>
      {children}
      {error && <span className="text-xs text-wine-500">{error}</span>}
    </label>
  );
}

const inputCls = "border border-noir-600 bg-noir-900 px-4 py-3.5 text-warm-100 outline-none transition-colors placeholder:text-warm-500 focus:border-gold-400";

export function CheckoutClient() {
  const hydrated = useHydrated();
  const { items, clearCart } = useCartStore();
  const [step, setStep] = useState(0);
  const [customer, setCustomer] = useState<Customer>({ name: "", email: "", phone: "", cpf: "" });
  const [address, setAddress] = useState<Address>({ cep: "", street: "", number: "", complement: "", district: "", city: "", state: "" });
  const [method, setMethod] = useState<PaymentMethod>("pix");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [installments, setInstallments] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cepLoading, setCepLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [apiError, setApiError] = useState("");

  if (!hydrated) return <div className="min-h-screen" />;
  if (order) return <Confirmation order={order} />;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="font-serif text-4xl">Sua sacola está vazia</h1>
        <Link href="/produtos" className="bg-gold-400 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-noir-950">Explorar coleção</Link>
      </div>
    );
  }

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shipping = shippingFor(subtotal);
  const gross = subtotal + shipping;
  const total = method === "pix" ? pixPrice(gross) : gross;
  const options = installmentOptions(gross);

  async function lookupCep(cep: string) {
    if (onlyDigits(cep).length !== 8) return;
    setCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${onlyDigits(cep)}/json/`);
      const data: { erro?: boolean; logradouro?: string; bairro?: string; localidade?: string; uf?: string } = await res.json();
      if (!data.erro) {
        setAddress((a) => ({ ...a, street: data.logradouro || a.street, district: data.bairro || a.district, city: data.localidade || a.city, state: data.uf || a.state }));
      } else setErrors((e) => ({ ...e, cep: "CEP não encontrado" }));
    } catch {
      /* preenchimento manual */
    } finally {
      setCepLoading(false);
    }
  }

  function validate(s: number): boolean {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (customer.name.trim().split(" ").length < 2) e.name = "Informe nome e sobrenome";
      if (!/^\S+@\S+\.\S+$/.test(customer.email)) e.email = "E-mail inválido";
      if (onlyDigits(customer.phone).length < 10) e.phone = "Telefone inválido";
      if (!isValidCpf(customer.cpf)) e.cpf = "CPF inválido";
    }
    if (s === 1) {
      if (onlyDigits(address.cep).length !== 8) e.cep = "CEP inválido";
      if (!address.street) e.street = "Obrigatório";
      if (!address.number) e.number = "Obrigatório";
      if (!address.district) e.district = "Obrigatório";
      if (!address.city) e.city = "Obrigatório";
      if (!/^[A-Za-z]{2}$/.test(address.state)) e.state = "UF";
    }
    if (s === 2 && (method === "credito" || method === "debito")) {
      if (!luhnValid(card.number)) e.cardNumber = "Número de cartão inválido";
      if (card.name.trim().length < 3) e.cardName = "Nome como no cartão";
      if (!expiryValid(card.expiry)) e.expiry = "Validade inválida";
      if (!/^\d{3,4}$/.test(card.cvv)) e.cvv = "CVV inválido";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const next = () => validate(step) && setStep((s) => s + 1);

  async function pay() {
    if (!validate(2)) return;
    setSubmitting(true);
    setApiError("");
    const digits = onlyDigits(card.number);
    const payment =
      method === "credito" || method === "debito"
        ? { method, brand: cardBrand(digits), last4: digits.slice(-4), installments: method === "credito" ? installments : 1 }
        : { method };
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          address: { ...address, state: address.state.toUpperCase() },
          items: items.map((i) => ({ productId: i.product.id, size: i.size, color: i.color, quantity: i.quantity })),
          payment,
        }),
      });
      const data: Order | { error: string } = await res.json();
      if (!res.ok || "error" in data) throw new Error("error" in data ? data.error : "Falha no pagamento");
      setOrder(data);
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Falha no pagamento");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-[1300px] px-6 pb-24 pt-12 md:px-12">
      <div className="mb-12 flex items-center justify-between">
        <h1 className="font-serif text-4xl md:text-5xl">Finalizar compra</h1>
        <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-warm-400"><Lock className="h-4 w-4 text-gold-400" /> Ambiente seguro</span>
      </div>

      <div className="mb-12 flex items-center">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <button onClick={() => i < step && setStep(i)} className="flex items-center gap-3">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-all duration-500 ${i < step ? "border-gold-400 bg-gold-400 text-noir-950" : i === step ? "border-gold-400 text-gold-300" : "border-noir-600 text-warm-500"}`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={`hidden text-[11px] uppercase tracking-[0.2em] sm:block ${i <= step ? "text-warm-100" : "text-warm-500"}`}>{label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className="mx-4 h-px flex-1 bg-noir-700">
                <motion.div className="h-full bg-gold-400" animate={{ width: i < step ? "100%" : "0%" }} transition={{ duration: 0.6 }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              {step === 0 && (
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2"><Field label="Nome completo" error={errors.name}><input className={inputCls} value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} autoComplete="name" /></Field></div>
                  <Field label="E-mail" error={errors.email}><input className={inputCls} type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} autoComplete="email" /></Field>
                  <Field label="Celular" error={errors.phone}><input className={inputCls} inputMode="tel" placeholder="(11) 90000-0000" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: maskPhone(e.target.value) })} autoComplete="tel" /></Field>
                  <Field label="CPF" error={errors.cpf}><input className={inputCls} inputMode="numeric" placeholder="000.000.000-00" value={customer.cpf} onChange={(e) => setCustomer({ ...customer, cpf: maskCpf(e.target.value) })} /></Field>
                </div>
              )}

              {step === 1 && (
                <div className="grid gap-5 md:grid-cols-6">
                  <div className="md:col-span-2">
                    <Field label="CEP" error={errors.cep}>
                      <div className="relative">
                        <input className={`${inputCls} w-full`} inputMode="numeric" placeholder="00000-000" value={address.cep} onChange={(e) => { const v = maskCep(e.target.value); setAddress({ ...address, cep: v }); void lookupCep(v); }} autoComplete="postal-code" />
                        {cepLoading && <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-gold-400" />}
                      </div>
                    </Field>
                  </div>
                  <div className="md:col-span-4"><Field label="Rua" error={errors.street}><input className={inputCls} value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} /></Field></div>
                  <div className="md:col-span-2"><Field label="Número" error={errors.number}><input className={inputCls} value={address.number} onChange={(e) => setAddress({ ...address, number: e.target.value })} /></Field></div>
                  <div className="md:col-span-4"><Field label="Complemento (opcional)"><input className={inputCls} value={address.complement} onChange={(e) => setAddress({ ...address, complement: e.target.value })} /></Field></div>
                  <div className="md:col-span-2"><Field label="Bairro" error={errors.district}><input className={inputCls} value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} /></Field></div>
                  <div className="md:col-span-3"><Field label="Cidade" error={errors.city}><input className={inputCls} value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} /></Field></div>
                  <div className="md:col-span-1"><Field label="UF" error={errors.state}><input className={inputCls} maxLength={2} value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value.toUpperCase() })} /></Field></div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {METHODS.map(({ id, label, hint, icon: Icon }) => (
                      <button key={id} onClick={() => { setMethod(id); setErrors({}); }} className={`relative flex items-center gap-4 border p-5 text-left transition-all duration-300 ${method === id ? "border-gold-400 bg-gold-400/5" : "border-noir-600 hover:border-noir-500"}`}>
                        <Icon className={`h-6 w-6 shrink-0 ${method === id ? "text-gold-400" : "text-warm-400"}`} strokeWidth={1.4} />
                        <span>
                          <span className="block text-sm text-warm-100">{label}</span>
                          <span className="block text-xs text-warm-400">{hint}</span>
                        </span>
                        {method === id && <motion.span layoutId="method-check" className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400"><Check className="h-3 w-3 text-noir-950" /></motion.span>}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={method} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="border border-noir-700 bg-noir-900 p-6">
                      {method === "pix" && (
                        <p className="text-sm leading-relaxed text-warm-300">
                          Ao confirmar, geramos um <strong className="text-warm-100">QR Code Pix</strong> e o código copia-e-cola. Você paga{" "}
                          <strong className="text-gold-300">{formatPrice(pixPrice(gross))}</strong> (economia de {formatPrice(gross - pixPrice(gross))}). O código expira em {STORE.pixExpiresMinutes} minutos.
                        </p>
                      )}
                      {method === "boleto" && (
                        <p className="text-sm leading-relaxed text-warm-300">
                          Boleto à vista de <strong className="text-warm-100">{formatPrice(gross)}</strong> com vencimento em {STORE.boletoDueDays} dias úteis. O pedido é enviado após a compensação (até 2 dias úteis).
                        </p>
                      )}
                      {(method === "credito" || method === "debito") && (
                        <div className="grid gap-4 md:grid-cols-4">
                          <div className="md:col-span-4">
                            <Field label="Número do cartão" error={errors.cardNumber}>
                              <div className="relative">
                                <input className={`${inputCls} w-full`} inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" value={card.number} onChange={(e) => setCard({ ...card, number: maskCardNumber(e.target.value) })} />
                                {card.number.length > 1 && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider text-gold-400">{cardBrand(card.number)}</span>}
                              </div>
                            </Field>
                          </div>
                          <div className="md:col-span-4"><Field label="Nome impresso no cartão" error={errors.cardName}><input className={inputCls} autoComplete="cc-name" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })} /></Field></div>
                          <div className="md:col-span-2"><Field label="Validade" error={errors.expiry}><input className={inputCls} inputMode="numeric" autoComplete="cc-exp" placeholder="MM/AA" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: maskExpiry(e.target.value) })} /></Field></div>
                          <div className="md:col-span-2"><Field label="CVV" error={errors.cvv}><input className={inputCls} inputMode="numeric" autoComplete="cc-csc" maxLength={4} value={card.cvv} onChange={(e) => setCard({ ...card, cvv: onlyDigits(e.target.value) })} /></Field></div>
                          {method === "credito" && (
                            <div className="md:col-span-4">
                              <Field label="Parcelamento">
                                <select className={inputCls} value={installments} onChange={(e) => setInstallments(Number(e.target.value))}>
                                  {options.map((o) => (
                                    <option key={o.count} value={o.count}>{o.count}x de {formatPrice(o.value)} sem juros {o.count === 1 ? "(à vista)" : ""}</option>
                                  ))}
                                </select>
                              </Field>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                  {apiError && <p className="text-sm text-wine-500">{apiError}</p>}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between">
            {step > 0 ? (
              <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-warm-400 hover:text-warm-100"><ChevronLeft className="h-4 w-4" /> Voltar</button>
            ) : <span />}
            {step < 2 ? (
              <button onClick={next} className="bg-gold-400 px-12 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-noir-950 hover:bg-gold-200">Continuar</button>
            ) : (
              <button onClick={pay} disabled={submitting} className="flex items-center gap-2 bg-gold-400 px-12 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-noir-950 hover:bg-gold-200 disabled:opacity-60">
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {method === "pix" ? "Gerar Pix" : method === "boleto" ? "Gerar boleto" : `Pagar ${formatPrice(total)}`}
              </button>
            )}
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-36 border border-noir-700 bg-noir-900 p-6">
            <h2 className="mb-6 font-serif text-2xl">Resumo</h2>
            <ul className="mb-6 flex max-h-[40vh] flex-col gap-4 overflow-y-auto">
              {items.map((i) => (
                <li key={`${i.product.id}-${i.size}-${i.color}`} className="flex gap-4">
                  <div className="relative h-20 w-16 shrink-0 bg-noir-800">
                    <Image src={i.product.images[0]} alt={i.product.name} fill sizes="64px" className="object-cover" />
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-[10px] font-bold text-noir-950">{i.quantity}</span>
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="text-warm-100">{i.product.name}</p>
                    <p className="text-xs text-warm-400">{i.color} · {i.size}</p>
                  </div>
                  <span className="text-sm text-warm-200">{formatPrice(i.product.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="flex flex-col gap-2 border-t border-noir-700 pt-4 text-sm">
              <div className="flex justify-between text-warm-400"><dt>Subtotal</dt><dd className="text-warm-100">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between text-warm-400"><dt>Frete</dt><dd className={shipping === 0 ? "text-gold-400" : "text-warm-100"}>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</dd></div>
              {method === "pix" && <div className="flex justify-between text-gold-400"><dt>Desconto Pix</dt><dd>-{formatPrice(gross - total)}</dd></div>}
            </dl>
            <div className="mt-4 flex items-end justify-between border-t border-noir-700 pt-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-warm-400">Total</span>
              <motion.span key={total} initial={{ scale: 1.15, color: "#F5E6B8" }} animate={{ scale: 1, color: "#D4B96A" }} className="font-serif text-3xl">{formatPrice(total)}</motion.span>
            </div>
            {method === "credito" && installments > 1 && <p className="mt-1 text-right text-xs text-warm-400">{installments}x de {formatPrice(total / installments)} sem juros</p>}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Confirmation({ order }: { order: Order }) {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const p = order.payment;
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }} className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gold-400">
        <Check className="h-10 w-10 text-noir-950" />
      </motion.div>
      <h1 className="mb-2 font-serif text-4xl md:text-5xl">
        {p.method === "pix" || p.method === "boleto" ? "Pedido reservado!" : "Pagamento aprovado!"}
      </h1>
      <p className="mb-10 text-warm-400">Pedido <strong className="text-warm-100">#{order.number}</strong> · {formatPrice(order.total)}</p>

      {p.method === "pix" && (
        <div className="border border-noir-700 bg-noir-900 p-8">
          <p className="mb-6 text-sm text-warm-300">Escaneie o QR Code no app do seu banco ou use o Pix copia-e-cola.</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.qrCodeDataUrl} alt="QR Code Pix" className="mx-auto mb-6 h-60 w-60 bg-white p-2" />
          <div className="flex gap-2">
            <input readOnly value={p.payload} className="flex-1 truncate border border-noir-600 bg-noir-950 px-3 py-3 text-xs text-warm-300" />
            <button onClick={() => copy(p.payload)} className="flex items-center gap-2 bg-gold-400 px-4 text-[11px] font-bold uppercase tracking-[0.15em] text-noir-950">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
          <p className="mt-4 text-xs text-warm-500">Expira às {new Date(p.expiresAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</p>
        </div>
      )}

      {p.method === "boleto" && (
        <div className="border border-noir-700 bg-noir-900 p-8">
          <Barcode className="mx-auto mb-4 h-12 w-12 text-gold-400" strokeWidth={1} />
          <p className="mb-4 text-sm text-warm-300">Vencimento: {new Date(p.dueDate).toLocaleDateString("pt-BR")}</p>
          <p className="mb-4 break-all border border-noir-600 bg-noir-950 p-4 font-mono text-sm text-warm-100">{p.digitableLine}</p>
          <button onClick={() => copy(p.digitableLine.replace(/\D/g, ""))} className="inline-flex items-center gap-2 bg-gold-400 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-noir-950">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copiado" : "Copiar linha digitável"}
          </button>
        </div>
      )}

      {(p.method === "credito" || p.method === "debito") && (
        <div className="border border-noir-700 bg-noir-900 p-8 text-sm text-warm-300">
          {p.brand} final {p.last4} · {p.method === "credito" ? `${p.installments}x de ${formatPrice(p.installmentValue)} sem juros` : "Débito à vista"}
          <p className="mt-2 text-xs text-warm-500">Autorização {p.authorizationCode}</p>
        </div>
      )}

      {order.sandbox && (
        <p className="mt-6 text-xs text-warm-500">Ambiente de testes: este pagamento não é real e nenhum valor foi cobrado.</p>
      )}
      <p className="mt-6 text-sm text-warm-400">Guarde o número do pedido para acompanhar a entrega.</p>
      <Link href="/produtos" className="mt-10 inline-block border border-gold-500 px-10 py-4 text-[11px] uppercase tracking-[0.2em] text-gold-300 hover:bg-gold-400 hover:text-noir-950">Continuar comprando</Link>
    </div>
  );
}
