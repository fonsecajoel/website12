// Configuração num só passo: `pnpm setup:loja`
// 1. pede as chaves (escondidas) e escreve o .env.local
// 2. carrega os produtos no Supabase
// 3. cria o administrador do painel
// 4. (opcional) envia as variáveis para a Vercel
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import readline from "node:readline";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://chrtkapilvqbhxnsimjr.supabase.co";

function ask(question, { hidden = false, fallback = "" } = {}) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (hidden) {
      rl._writeToOutput = (s) => {
        if (s.includes(question)) rl.output.write(s);
        else if (s !== "\r\n" && s !== "\n") rl.output.write("*");
      };
    }
    rl.question(question, (answer) => {
      rl.close();
      if (hidden) process.stdout.write("\n");
      resolve(answer.trim() || fallback);
    });
  });
}

function readEnv() {
  if (!existsSync(".env.local")) return {};
  return Object.fromEntries(
    readFileSync(".env.local", "utf8")
      .split("\n")
      .filter((l) => l.includes("=") && !l.startsWith("#"))
      .map((l) => [l.slice(0, l.indexOf("=")), l.slice(l.indexOf("=") + 1)]),
  );
}

const isJwt = (v) => /^eyJ[\w-]+\.[\w-]+\.[\w-]+$/.test(v) || /^sb_(publishable|secret)_/.test(v);

console.log("\n✨ Configuração da loja Aela.\n");
console.log("Chaves em: Supabase → Settings → API Keys (Legacy)\n");

const current = readEnv();
const env = {
  NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY:
    isJwt(current.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "") ? current.NEXT_PUBLIC_SUPABASE_ANON_KEY : await ask("Cole a chave anon/public: ", { hidden: true }),
  SUPABASE_SERVICE_ROLE_KEY:
    isJwt(current.SUPABASE_SERVICE_ROLE_KEY ?? "") ? current.SUPABASE_SERVICE_ROLE_KEY : await ask("Cole a chave service_role: ", { hidden: true }),
  PIX_KEY: current.PIX_KEY ?? "",
  PIX_MERCHANT_NAME: current.PIX_MERCHANT_NAME || "AELA MODA",
  PIX_MERCHANT_CITY: current.PIX_MERCHANT_CITY || "SAO PAULO",
};

for (const k of ["NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]) {
  if (!isJwt(env[k])) {
    console.error(`\n✖ ${k} não parece uma chave válida (deve começar por "eyJ"). Corra de novo.`);
    process.exit(1);
  }
}
if (!env.PIX_KEY) env.PIX_KEY = await ask("Chave Pix (email, CPF, telefone ou aleatória): ");

writeFileSync(".env.local", Object.entries(env).map(([k, v]) => `${k}=${v}`).join("\n") + "\n", { mode: 0o600 });
console.log("✔ .env.local escrito");

const db = createClient(SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const products = JSON.parse(readFileSync("supabase/products.json", "utf8"));
const { error: seedError } = await db.from("products").upsert(products, { onConflict: "id", ignoreDuplicates: true });
if (seedError) {
  console.error("✖ Erro a carregar produtos:", seedError.message);
  process.exit(1);
}
console.log(`✔ ${products.length} produtos no Supabase`);

const email = await ask("Email do admin [admin@aela.com.br]: ", { fallback: "admin@aela.com.br" });
const password = await ask("Password do admin: ", { hidden: true });
if (password.length < 6) {
  console.error("✖ A password precisa de pelo menos 6 caracteres.");
  process.exit(1);
}
const admin = spawnSync(process.execPath, ["scripts/create-admin.mjs", email, password], { stdio: "inherit" });
if (admin.status !== 0) process.exit(admin.status ?? 1);

const sendVercel = (await ask("\nEnviar as variáveis para a Vercel agora? (s/N): ")).toLowerCase() === "s";
if (sendVercel) {
  const vercel = (args, input) =>
    spawnSync("npx", ["--yes", "vercel@latest", ...args], { stdio: [input === undefined ? "inherit" : "pipe", "inherit", "inherit"], input });
  if (vercel(["link", "--yes", "--project", "website12"]).status !== 0) {
    console.error("✖ Não foi possível ligar ao projeto (faça login quando o browser abrir e tente de novo).");
    process.exit(1);
  }
  for (const [k, v] of Object.entries(env)) {
    for (const target of ["production", "preview"]) {
      vercel(["env", "rm", k, target, "--yes"], "");
      const r = vercel(["env", "add", k, target], v);
      console.log(r.status === 0 ? `✔ ${k} → ${target}` : `✖ ${k} → ${target} (adicione no painel da Vercel)`);
    }
  }
  console.log("\nFaça Redeploy em Vercel → Deployments, ou o merge do PR para publicar.");
}

console.log("\n🎉 Pronto! Corra `pnpm dev` e abra http://localhost:3000/admin/login\n");
