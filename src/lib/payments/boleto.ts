/** Linha digitável de boleto em modo sandbox (sem banco emissor). Em produção vem do gateway. */
function mod10(block: string): number {
  let sum = 0;
  let weight = 2;
  for (let i = block.length - 1; i >= 0; i--) {
    let r = Number(block[i]) * weight;
    if (r > 9) r = Math.floor(r / 10) + (r % 10);
    sum += r;
    weight = weight === 2 ? 1 : 2;
  }
  return (10 - (sum % 10)) % 10;
}

export function sandboxBoleto(amount: number, orderNumber: string, dueDate: Date) {
  const base = new Date(Date.UTC(1997, 9, 7));
  const factor = (Math.floor((dueDate.getTime() - base.getTime()) / 86400000) % 9000) + 1000;
  const value = Math.round(amount * 100).toString().padStart(10, "0");
  const free = orderNumber.replace(/\D/g, "").padStart(25, "0").slice(-25);
  const barcode = `0019${"0"}${factor}${value}${free}`;
  const f1 = `0019${free.slice(0, 5)}`;
  const f2 = free.slice(5, 15);
  const f3 = free.slice(15, 25);
  const digitableLine = `${f1.slice(0, 5)}.${f1.slice(5)}${mod10(f1)} ${f2.slice(0, 5)}.${f2.slice(5)}${mod10(f2)} ${f3.slice(0, 5)}.${f3.slice(5)}${mod10(f3)} 0 ${factor}${value}`;
  return { barcode, digitableLine };
}
