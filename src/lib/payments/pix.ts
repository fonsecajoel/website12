/** Gera o payload "Pix Copia e Cola" (BR Code EMV estático) conforme o manual do Banco Central. */
function field(id: string, value: string): string {
  return `${id}${value.length.toString().padStart(2, "0")}${value}`;
}

export function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function clean(value: string, max: number): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9 ]/g, "")
    .toUpperCase()
    .slice(0, max);
}

export interface PixInput {
  key: string;
  merchantName: string;
  merchantCity: string;
  amount: number;
  txid: string;
}

export function buildPixPayload({ key, merchantName, merchantCity, amount, txid }: PixInput): string {
  const account = field("00", "br.gov.bcb.pix") + field("01", key);
  const payload =
    field("00", "01") +
    field("26", account) +
    field("52", "0000") +
    field("53", "986") +
    field("54", amount.toFixed(2)) +
    field("58", "BR") +
    field("59", clean(merchantName, 25) || "LOJA") +
    field("60", clean(merchantCity, 15) || "SAO PAULO") +
    field("62", field("05", clean(txid, 25).replace(/ /g, "") || "***")) +
    "6304";
  return payload + crc16(payload);
}
