import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, type Auth, type User } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

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
let dbInstance: Firestore | null = null;
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
  dbInstance = getFirestore(firebaseApp);
} catch (err) {
  firebaseInitError = err instanceof Error ? err.message : "Falha desconhecida ao iniciar o Firebase.";
  // eslint-disable-next-line no-console
  console.error("[firebase] Falha ao iniciar:", firebaseInitError);
}

// `auth` pode ser null se a inicialização falhou. Antes o código fazia
// `authInstance as Auth`, o que "mentia" pro TypeScript dizendo que auth
// nunca é nulo — foi exatamente isso que escondeu o bug e deixou o erro
// "Cannot read properties of null (reading 'onAuthStateChanged')" estourar
// direto no navegador. Agora o tipo reflete a realidade: auth PODE ser null,
// e qualquer código que tentar usá-lo sem checar vai dar erro de compilação
// em vez de quebrar em produção.
export const auth: Auth | null = authInstance;

// Mesmo raciocínio do `auth` acima: `db` pode ser null se a inicialização
// falhou (variáveis de ambiente ausentes, por exemplo). Qualquer código que
// for ler/gravar no Firestore precisa checar isso antes de usar — ver
// `getDb()` logo abaixo, que já faz essa checagem por você.
export const db: Firestore | null = dbInstance;

/**
 * Versão segura de acesso ao Firestore: se o Firebase não foi inicializado
 * corretamente (db === null), lança um erro claro em vez de deixar o app
 * quebrar com uma mensagem confusa tipo "Cannot read properties of null".
 * Use isto em vez de importar `db` diretamente sempre que for ler/gravar
 * dados do usuário.
 */
export function getDb(): Firestore {
  if (!db) {
    const reason = firebaseInitError ?? "Verifique as variáveis de ambiente do Firebase.";
    throw new Error(`[firebase] Firestore indisponível: ${reason}`);
  }
  return db;
}

export const googleProvider = new GoogleAuthProvider();
// Sempre mostra a tela de seleção de conta do Google, mesmo se já houver
// uma sessão Google ativa no navegador — evita login "silencioso" indesejado.
googleProvider.setCustomParameters({ prompt: "select_account" });

/**
 * Versão segura de onAuthStateChanged: se o Firebase não foi inicializado
 * corretamente (auth === null), não quebra o app — apenas avisa no console
 * e chama o callback com `null` (usuário deslogado), permitindo que a tela
 * de login normal apareça em vez de uma página em branco.
 *
 * Troque no seu código:
 *   onAuthStateChanged(auth, (user) => { ... })
 * por:
 *   subscribeToAuthChanges((user) => { ... })
 */
export function subscribeToAuthChanges(
  callback: (user: User | null) => void,
): () => void {
  if (!auth) {
    console.error(
      "[firebase] subscribeToAuthChanges chamado, mas auth é null. " +
      (firebaseInitError ?? "Verifique as variáveis de ambiente do Firebase."),
    );
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
