// src/app/lib/userData.ts
// Funções para salvar e carregar os dados de CADA usuário no Firestore.
// Os posts de exemplo da comunidade (COMMUNITY_POSTS, em data.ts) continuam
// aparecendo para todo mundo e NÃO são tocados por este arquivo — aqui só
// guardamos o que pertence de fato ao usuário logado.

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { Goal, Study, CommunityPost } from "../types";

export interface PersistedUserData {
  goals: Goal[];
  studies: Study[];
  myPosts: CommunityPost[]; // só os posts CRIADOS por este usuário (isFromUser)
  streak: number;
  totalHoursStudied: number;
  totalXP: number;
  notificationsEnabled: boolean;
  joinedAt?: string;
}

const EMPTY_USER_DATA: PersistedUserData = {
  goals: [],
  studies: [],
  myPosts: [],
  streak: 0,
  totalHoursStudied: 0,
  totalXP: 0,
  notificationsEnabled: true,
};

// Carrega os dados salvos deste usuário. Se ele nunca salvou nada
// (é novo, ou é a primeira vez usando esta versão do app), retorna vazio —
// nunca devolve dados de demonstração.
export async function loadUserData(uid: string): Promise<PersistedUserData> {
  try {
    const ref = doc(db, "userData", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      return {
        goals: data.goals ?? [],
        studies: data.studies ?? [],
        myPosts: data.myPosts ?? [],
        streak: data.streak ?? 0,
        totalHoursStudied: data.totalHoursStudied ?? 0,
        totalXP: data.totalXP ?? 0,
        notificationsEnabled: data.notificationsEnabled ?? true,
        joinedAt: data.joinedAt,
      };
    }
    return EMPTY_USER_DATA;
  } catch (err) {
    console.error("[userData] Falha ao carregar:", err);
    return EMPTY_USER_DATA;
  }
}

// Salva (mescla) os dados deste usuário no Firestore.
export async function saveUserData(uid: string, data: PersistedUserData): Promise<void> {
  const ref = doc(db, "userData", uid);
  await setDoc(ref, data, { merge: true });
}
