// Cria (ou promove) um administrador do painel /admin.
// Uso: node scripts/create-admin.mjs <email> <password>
// Lê NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY do .env.local.
import { createClient } from "@supabase/supabase-js";

try {
  process.loadEnvFile(".env.local");
} catch {
  console.error("Falta o ficheiro .env.local (copie o .env.example).");
  process.exit(1);
}

const [email, password] = process.argv.slice(2);
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!email || !password) {
  console.error("Uso: node scripts/create-admin.mjs <email> <password>");
  process.exit(1);
}
if (!url || !key) {
  console.error("Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local.");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

let userId;
const created = await supabase.auth.admin.createUser({ email, password, email_confirm: true });
if (created.error) {
  // Utilizador já existe: procura-o e atualiza a password.
  const { data, error } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  if (error) throw error;
  const existing = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!existing) throw created.error;
  userId = existing.id;
  await supabase.auth.admin.updateUserById(userId, { password });
} else {
  userId = created.data.user.id;
}

const { error: adminError } = await supabase.from("admins").upsert({ user_id: userId });
if (adminError) throw adminError;

console.log(`✔ ${email} é administrador. Entre em /admin/login.`);
