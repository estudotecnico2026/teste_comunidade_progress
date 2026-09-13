import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";

// As chaves abaixo NÃO são segredos — são identificadores públicos do projeto
// Firebase, seguros para ficarem no código do navegador. Ainda assim, usamos
// variáveis de ambiente (prefixo VITE_) para facilitar trocar entre projetos
// de desenvolvimento/produção sem editar código.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// IMPORTANTE: este arquivo é importado bem no topo de App.tsx/AuthScreens.tsx,
// ou seja, o código abaixo roda ANTES de qualquer tela ser desenhada na
// página. Se getAuth() lançasse um erro aqui sem tratamento, o app inteiro
// travaria numa tela em branco, sem nenhuma mensagem visível ao usuário.
// Por isso, tudo é protegido por try/catch: se a configuração estiver
// errada/faltando, guardamos o motivo em `firebaseInitError` em vez de
// deixar o erro "estourar" — quem importar este arquivo decide o que
// mostrar na tela (ver App.tsx).
let firebaseApp: FirebaseApp | null = null;
let authInstance: Auth | null = null;
export let firebaseInitError: string | null = null;

try {
  const missing = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Variáveis de ambiente do Firebase ausentes: ${missing.join(", ")}. ` +
      `Configure-as em Vercel > Settings > Environment Variables (prefixo VITE_) ` +
      `e faça um redeploy.`,
    );
  }

  firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  authInstance = getAuth(firebaseApp);
} catch (err) {
  firebaseInitError = err instanceof Error ? err.message : "Falha desconhecida ao iniciar o Firebase.";
  // eslint-disable-next-line no-console
  console.error("[firebase] Falha ao iniciar:", firebaseInitError);
}

// `auth` pode ser null se a inicialização falhou. Sempre confira
// `firebaseInitError` antes de usar `auth` em produção (App.tsx já faz isso
// e evita renderizar qualquer tela que dependa do Firebase nesse caso).
export const auth = authInstance as Auth;

export const googleProvider = new GoogleAuthProvider();
// Sempre mostra a tela de seleção de conta do Google, mesmo se já houver
// uma sessão Google ativa no navegador — evita login "silencioso" indesejado.
googleProvider.setCustomParameters({ prompt: "select_account" });
