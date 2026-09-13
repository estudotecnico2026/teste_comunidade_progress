import { createContext, useContext } from "react";
import type {
  Goal, Study, UserProfile, CommunityPost, ModalConfig, ModalVariant,
} from "./types";

// ─── Modal Context ────────────────────────────────────────────────────────────
export const ModalCtx = createContext<{ openModal: (c: ModalConfig) => void }>({
  openModal: () => {},
});

export function useModal() {
  return useContext(ModalCtx);
}

// ─── Data Context ─────────────────────────────────────────────────────────────
export interface DataCtxType {
  goals: Goal[];
  studies: Study[];
  posts: CommunityPost[];
  user: UserProfile;
  addGoal: (g: Goal) => void;
  addStudy: (s: Study) => void;
  addPost: (p: CommunityPost) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  updateStudy: (id: string, updates: Partial<Study>) => void;
  updatePost: (id: string, updates: Partial<CommunityPost>) => void;
  deleteGoal: (id: string) => void;
  deleteStudy: (id: string) => void;
  deletePost: (id: string) => void;
  updateUser: (p: Partial<UserProfile>) => void;
  pauseGoalCascade: (goalId: string) => void;
  resumeGoalCascade: (goalId: string) => void;
}

export const DataCtx = createContext<DataCtxType>({
  goals: [], studies: [], posts: [], user: {} as UserProfile,
  addGoal: () => {}, addStudy: () => {}, addPost: () => {}, updateGoal: () => {},
  updateStudy: () => {}, updatePost: () => {}, deleteGoal: () => {}, deleteStudy: () => {}, deletePost: () => {}, updateUser: () => {},
  pauseGoalCascade: () => {}, resumeGoalCascade: () => {},
});

export function useData() { return useContext(DataCtx); }
