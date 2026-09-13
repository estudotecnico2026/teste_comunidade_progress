import React from "react";

export type GoalCategory = "carreira" | "certificacao" | "habilidade" | "projeto";
export type GoalStatus   = "ativo" | "pausado" | "concluido";
export type StudyType    = "curso" | "livro" | "artigo" | "video" | "podcast" | "projeto";
export type StudyStatus  = "nao-iniciado" | "em-andamento" | "pausado" | "concluido" | "descontinuado";
export type Tab          = "dashboard" | "goals" | "studies" | "progress" | "community" | "profile";

export interface StudySessionEntry {
  id: string;
  date: string;
  hours: number;
  notes?: string;
  xpEarned: number;
}

export interface UserProfile {
  uid: string; name: string; email: string; avatarInitials: string;
  avatarUrl?: string;
  streak: number; totalHoursStudied: number; joinedAt: string;
  authProvider: "google.com" | "password" | "github.com";
  notificationsEnabled: boolean;
  totalXP: number;
}

export interface GoalTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Goal {
  id: string; userId: string; title: string; category: GoalCategory;
  targetDate: string; progress: number; status: GoalStatus;
  studiesLinked: number; createdAt: string; updatedAt: string;
  tasks?: GoalTask[];
}

export interface Study {
  id: string; userId: string; goalId?: string; type: StudyType;
  title: string; area: string; status: StudyStatus; progressPercent: number;
  hoursCompleted: number; totalHours: number;
  deadline?: string; lastSessionAt?: string; createdAt: string;
  sessions?: StudySessionEntry[];
  url?: string;
  notes?: string;
  statusBeforeGoalPause?: StudyStatus;
}

export interface AppSettings {
  reminderEnabled: boolean;
  reminderTime: string;
  dailyGoalHours: number;
}

export type ModalVariant = "info" | "success" | "warning" | "confirm";

export interface ModalConfig {
  variant?: ModalVariant;
  title: string;
  body: React.ReactNode;
  primaryLabel?: string;
  primaryAction?: () => void;
  secondaryLabel?: string;
  secondaryAction?: () => void;
  destructive?: boolean;
}

export type BadgeId =
  | "primeira-resposta"
  | "mao-amiga"
  | "guia-de-trilha"
  | "primeira-trilha"
  | "curador"
  | "referencia-da-area"
  | "caminho-aberto"
  | "rota-consultada"
  | "farol";

export type PostType     = "questao" | "recurso" | "trilha" | "conquista";
export type ResourceType = "livro" | "artigo" | "curso" | "podcast" | "video";

export interface CommunityPost {
  id: string;
  authorName: string;
  authorInitials: string;
  authorTransition: string;
  authorXP: number;
  type: PostType;
  title: string;
  body: string;
  tags: string[];
  likes: number;
  answers: number;
  createdAt: string;
  isAnswered?: boolean;
  resourceType?: ResourceType;
  isFromUser?: boolean;
}

export interface PostComment {
  id: string;
  authorName: string;
  authorInitials: string;
  authorTransition: string;
  body: string;
  createdAt: string;
  isFromUser?: boolean;
}

export interface CommunityMember {
  name: string;
  initials: string;
  transition: string;
  xp: number;
  posts: number;
  answers: number;
  badge?: BadgeId;
  isUser?: boolean;
}
