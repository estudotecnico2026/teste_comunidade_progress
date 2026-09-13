import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  type Auth,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  type Firestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

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
      `Variáveis do Firebase ausentes: ${missing.join(", ")}`
    );
  }

  firebaseApp = getApps().length
    ? getApp()
    : initializeApp(firebaseConfig);

  authInstance = getAuth(firebaseApp);
  dbInstance = getFirestore(firebaseApp);

} catch (err) {
  firebaseInitError =
    err instanceof Error
      ? err.message
      : "Falha desconhecida ao iniciar o Firebase.";

  console.error("[firebase] Falha ao iniciar:", firebaseInitError);
}

if (!authInstance || !dbInstance) {
  throw new Error(
    firebaseInitError ??
      "Firebase não foi inicializado corretamente."
  );
}

export const auth = authInstance;
export const db = dbInstance;

export function getDb(): Firestore {
  return db;
}

export function subscribeToAuthChanges(
  callback: (user: User | null) => void
) {
  return onAuthStateChanged(auth, callback);
}

export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});
