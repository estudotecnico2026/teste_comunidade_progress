import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDb } from "./firebase";

import type {
  Goal,
  Study,
  CommunityPost,
  AppSettings,
} from "../types";

export interface PersistedUserData {
  goals: Goal[];
  studies: Study[];
  myPosts: CommunityPost[];

  streak: number;
  totalHoursStudied: number;
  totalXP: number;
  notificationsEnabled: boolean;

  joinedAt?: string;

  name?: string;
  avatarUrl?: string;
  avatarInitials?: string;

  settings?: AppSettings;
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

export async function loadUserData(
  uid: string
): Promise<PersistedUserData> {

  if (!uid) {
    throw new Error("loadUserData: UID do usuário não informado.");
  }

  const ref = doc(getDb(), "userData", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return EMPTY_USER_DATA;
  }

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

    name: data.name,
    avatarUrl: data.avatarUrl,
    avatarInitials: data.avatarInitials,

    settings: data.settings,
  };
}

export async function saveUserData(
  uid: string,
  data: PersistedUserData
): Promise<void> {

  if (!uid) {
    throw new Error("saveUserData: UID do usuário não informado.");
  }

  const ref = doc(getDb(), "userData", uid);

  await setDoc(
    ref,
    {
      ...data,
      updatedAt: new Date().toISOString(),
    },
    { merge: true }
  );
}
