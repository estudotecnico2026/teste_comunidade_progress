import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Home, Target, BookOpen, TrendingUp, User,
  Plus, ChevronRight, Clock, Flame, Bell,
  Sun, Moon, LogOut, Calendar,
  CheckCircle2, Zap, Trophy, Star,
  X, AlertTriangle, Info, Archive, Users,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "firebase/auth";
import { auth } from "./lib/firebase";
import { cn } from "./components/ui/utils";
import type {
  GoalCategory, GoalStatus, StudyStatus, Tab,
  UserProfile, Goal, Study,
  AppSettings, ModalVariant, ModalConfig,
  CommunityPost,
} from "./types";
import {
  INIT_USER, INIT_GOALS, INIT_STUDIES,
  COMMUNITY_POSTS,
  WEEKLY_HOURS, ANNUAL_HOURS,
  STUDY_TYPE_CONFIG, STUDY_STATUS_CONFIG,
  CATEGORY_CONFIG,
  daysLeft, weeklyTotal, todayISO,
  computeLevel, getGoalStats,
} from "./data";
import { ModalCtx, DataCtx, useModal, useData } from "./contexts";
import { GoalCreateModal, GoalDetailModal } from "./GoalModals";
import { StudyCreateModal, StudyDetailModal } from "./StudyModals";
import { CommunityScreen } from "./CommunityScreens";
import { ProfileScreen } from "./ProfileScreens";
import { AuthScreen, OnboardingScreen } from "./AuthScreens";

// ─── AppModal ─────────────────────────────────────────────────────────────────
function AppModal({ config, open, onClose }: {
  config: ModalConfig | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!config) return null;

  const v = config.variant ?? "info";
  const variantMap: Record<ModalVariant, { iconBg: string; icon: React.ReactNode }> = {
    info: {
      iconBg: "bg-blue-100 dark:bg-blue-900/40",
      icon: <Info size={20} className="text-blue-600 dark:text-blue-400" />,
    },
    success: {
      iconBg: "bg-green-100 dark:bg-green-900/40",
      icon: <CheckCircle2 size={20} className="text-green-600 dark:text-green-400" />,
    },
    warning: {
      iconBg: "bg-amber-100 dark:bg-amber-900/40",
      icon: <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400" />,
    },
    confirm: {
      iconBg: config.destructive ? "bg-red-100 dark:bg-red-900/30" : "bg-amber-100 dark:bg-amber-900/40",
      icon: config.destructive
        ? <LogOut size={20} className="text-red-600 dark:text-red-400" />
        : <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400" />,
    },
  };

  const { iconBg, icon } = variantMap[v];

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-32px)] max-w-[360px] -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-3xl p-6 shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200">
          <Dialog.Close
            className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground"
            aria-label="Fechar"
          >
            <X size={15} />
          </Dialog.Close>
          <motion.div
            initial={{ scale: 0.7, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.05, type: "spring", stiffness: 400, damping: 22 }}
            className={cn("w-11 h-11 rounded-2xl flex items-center justify-center mb-4", iconBg)}
          >
            {icon}
          </motion.div>
          <Dialog.Title className="text-base font-semibold text-foreground mb-2 pr-8 leading-snug">
            {config.title}
          </Dialog.Title>
          <Dialog.Description asChild>
            <div className="text-sm text-muted-foreground leading-relaxed mb-5">
              {config.body}
            </div>
          </Dialog.Description>
          <div className="flex flex-col gap-2.5">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { config.primaryAction?.(); onClose(); }}
              className={cn(
                "w-full py-3 rounded-2xl text-sm font-semibold transition-all",
                config.destructive
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-primary text-primary-foreground hover:opacity-90"
              )}
            >
              {config.primaryLabel ?? "Entendido"}
            </motion.button>
            {config.secondaryLabel && (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { config.secondaryAction?.(); onClose(); }}
                className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-all"
              >
                {config.secondaryLabel}
              </motion.button>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── Motion Variants ──────────────────────────────────────────────────────────
const listContainer = { animate: { transition: { staggerChildren: 0.055 } } };
const listItem = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" as const } } };
const statsContainer = { animate: { transition: { staggerChildren: 0.08 } } };
const statCard = { initial: { opacity: 0, scale: 0.88 }, animate: { opacity: 1, scale: 1, transition: { duration: 0.22, ease: "easeOut" as const } } };

// ─── Atomic Components ────────────────────────────────────────────────────────
function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("h-1.5 bg-muted rounded-full overflow-hidden", className)}>
      <motion.div
        className={cn("h-full rounded-full", value >= 100 ? "bg-green-500" : "bg-primary")}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(value, 100)}%` }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}

const INPUT_CLS = "w-full px-3.5 py-2.5 rounded-xl bg-input-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all";
const LABEL_CLS = "text-xs font-medium text-muted-foreground mb-1.5 block";

// ─── Dashboard ────────────────────────────────────────────────────────────────
function DashboardScreen({ onTabChange }: { onTabChange: (tab: Tab) => void }) {
  const { openModal }   = useModal();
  const { goals, studies, user } = useData();
  const activeGoals     = goals.filter(g => g.status === "ativo").length;
  const inProgress      = studies.filter(s => s.status === "em-andamento").length;
  const weekHours       = weeklyTotal();
  const recentStudies   = studies.filter(s => s.status === "em-andamento").slice(0, 3);
  const levelInfo       = computeLevel(user.totalXP);

  const [showGoalCreate, setShowGoalCreate]         = useState(false);
  const [showStudyDetail, setShowStudyDetail]       = useState(false);
  const [showStudyPicker, setShowStudyPicker]       = useState(false);
  const [quickStudyId, setQuickStudyId]             = useState<string | null>(null);
  const [viewStudyId, setViewStudyId]               = useState<string | null>(null);
  const [notificationsRead, setNotificationsRead]   = useState(false);

  const activeStudies = studies.filter(s => s.status === "em-andamento");

  const handleQuickSession = () => {
    if (activeStudies.length === 0) {
      setShowGoalCreate(true);
    } else if (activeStudies.length === 1) {
      setQuickStudyId(activeStudies[0].id);
      setShowStudyDetail(true);
    } else {
      setShowStudyPicker(true);
    }
  };

  return (
    <div className="px-4 pt-12 pb-24 max-w-lg mx-auto md:max-w-4xl md:px-8 md:pt-8 md:pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">Olá, {user.name.split(" ")[0]} 👋</p>
          <h1 className="text-xl font-semibold text-foreground">Sua jornada hoje</h1>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => openModal({
              variant: "info",
              title: "Notificações",
              body: (
                <div className="space-y-3">
                  {[
                    { color: "bg-blue-500",  text: "Next.js 14: novo módulo de Server Actions disponível" },
                    { color: "bg-amber-500", text: "AWS: sua prova está em 30 dias — hora de reforçar!" },
                    { color: "bg-green-500", text: "Streak de 12 dias — você está no top 10% dos usuários!" },
                  ].map((n, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0", n.color)} />
                      <span className="text-sm leading-snug">{n.text}</span>
                    </div>
                  ))}
                </div>
              ),
              primaryLabel: "Marcar como lidas",
              primaryAction: () => setNotificationsRead(true),
              secondaryLabel: "Fechar",
            })}
            className="relative p-2 rounded-xl bg-card border border-border hover:bg-muted transition-colors"
            aria-label="Notificações"
          >
            <Bell size={18} />
            {!notificationsRead && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold leading-none"
              >
                3
              </motion.span>
            )}
          </motion.button>
          <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-sm font-bold select-none">
                {user.avatarInitials}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Streak Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
        className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white flex items-center justify-between overflow-hidden relative"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <motion.div
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Flame size={18} className="text-amber-300" />
            </motion.div>
            <span className="font-semibold">{user.streak} {user.streak === 1 ? "dia seguido" : "dias seguidos"}</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-white/75 text-sm">
              {user.streak === 0
                ? "Comece hoje e construa sua sequência!"
                : user.streak < 3
                ? "Bom começo! Volte amanhã para continuar."
                : user.streak < 7
                ? "Você está criando um hábito. Continue!"
                : "Continue assim! Você está no caminho certo."}
            </p>
          </div>
          <div className="mt-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-white/70">Progresso do nível</span>
              <span className="text-[11px] text-white/70">
                {levelInfo.next ? `${levelInfo.nextXP - user.totalXP} XP para ${levelInfo.next.title}` : "Nível máximo!"}
              </span>
            </div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/75 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${levelInfo.progress}%` }}
                transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
        <span className="text-[72px] font-black text-white/10 leading-none select-none">{user.streak}</span>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        className="grid grid-cols-3 gap-3 mb-5"
        variants={statsContainer} initial="initial" animate="animate"
      >
        {([
          { label: "Objetivos", value: activeGoals,     Icon: Target,   color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-900/20" },
          { label: "Em estudo", value: inProgress,      Icon: BookOpen, color: "text-blue-600 dark:text-blue-400",     bg: "bg-blue-50 dark:bg-blue-900/20" },
          { label: "Horas/sem", value: `${weekHours}h`, Icon: Clock,    color: "text-green-600 dark:text-green-400",   bg: "bg-green-50 dark:bg-green-900/20" },
        ] as const).map(({ label, value, Icon, color, bg }) => (
          <motion.div key={label} variants={statCard} className="bg-card border border-border rounded-2xl p-3 flex flex-col gap-2">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", bg)}>
              <Icon size={16} className={color} />
            </div>
            <span className="text-xl font-bold text-foreground">{value}</span>
            <span className="text-xs text-muted-foreground leading-tight">{label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Weekly Chart + Recent Studies: 2-col on desktop */}
      <div className="md:grid md:grid-cols-[1fr_1.4fr] md:gap-5 md:items-start">

      {/* Weekly Mini Chart */}
      <div className="mb-5 bg-card border border-border rounded-2xl p-4 md:mb-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground text-sm">Esta semana</h2>
          <span className="text-xs text-muted-foreground">{weekHours}h de 14h meta</span>
        </div>
        <div className="flex items-end gap-1.5 h-14">
          {WEEKLY_HOURS.map((d, i) => {
            const pct = d.h / 5;
            const isToday = i === 5;
            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-sm bg-muted relative" style={{ height: 44 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(pct * 100, d.h === 0 ? 0 : 4)}%` }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                    className={cn("absolute bottom-0 left-0 right-0 rounded-sm", isToday ? "bg-primary" : "bg-primary/35")}
                  />
                </div>
                <span className="text-[9px] text-muted-foreground">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Studies */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground text-sm">Em andamento</h2>
          {recentStudies.length > 0 && (
            <button onClick={() => onTabChange("studies")} className="text-xs text-primary font-medium hover:underline">
              Ver todos
            </button>
          )}
        </div>
        {recentStudies.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-6 text-center bg-card border border-dashed border-border rounded-2xl"
          >
            <BookOpen size={22} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Nenhum material em andamento</p>
            <button
              onClick={() => onTabChange("studies")}
              className="mt-2 text-xs text-primary font-medium hover:underline"
            >
              Adicionar material de estudo
            </button>
          </motion.div>
        )}
        <motion.div className="space-y-2.5" variants={listContainer} initial="initial" animate="animate">
          {recentStudies.map(study => {
            const type = STUDY_TYPE_CONFIG[study.type];
            const TypeIcon = type.icon;
            const linkedGoal = study.goalId ? goals.find(g => g.id === study.goalId) : null;
            const goalCat = linkedGoal ? CATEGORY_CONFIG[linkedGoal.category] : null;
            return (
              <motion.button
                key={study.id}
                variants={listItem}
                whileHover={{ x: 2, transition: { duration: 0.12 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setViewStudyId(study.id)}
                className="w-full bg-card border border-border rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer hover:border-primary/30 hover:shadow-sm transition-all text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <TypeIcon size={18} className={type.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                    <p className="text-sm font-medium text-foreground truncate">{study.title}</p>
                  </div>
                  {goalCat && (() => {
                    const GIcon = goalCat.icon;
                    return (
                      <div className="flex items-center gap-1 mb-1">
                        <span className={cn("flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium", goalCat.bg, goalCat.color)}>
                          <GIcon size={8} />{goalCat.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{study.hoursCompleted}h / {study.totalHours}h</span>
                      </div>
                    );
                  })()}
                  {!goalCat && (
                    <p className="text-[10px] text-muted-foreground mb-1">{study.hoursCompleted}h / {study.totalHours}h</p>
                  )}
                  <div className="flex items-center gap-2">
                    <ProgressBar value={study.progressPercent} className="flex-1" />
                    <span className="text-xs text-muted-foreground flex-shrink-0">{study.progressPercent}%</span>
                  </div>
                </div>
                <ChevronRight size={15} className="text-muted-foreground flex-shrink-0" />
              </motion.button>
            );
          })}
        </motion.div>
      </div>
      </div>{/* end 2-col grid */}

      {/* Quick Action */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleQuickSession}
        className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all"
      >
        <Plus size={18} />
        Registrar sessão de estudo
      </motion.button>

      <GoalCreateModal open={showGoalCreate} onClose={() => setShowGoalCreate(false)} />
      <StudyDetailModal
        open={!!viewStudyId}
        onClose={() => setViewStudyId(null)}
        studyId={viewStudyId}
        initialStep="detail"
      />
      <StudyDetailModal
        open={showStudyDetail}
        onClose={() => { setShowStudyDetail(false); setQuickStudyId(null); }}
        studyId={quickStudyId}
        initialStep="session"
      />
      <QuickStudyPickerModal
        open={showStudyPicker}
        onClose={() => setShowStudyPicker(false)}
        studies={activeStudies}
        onSelect={(id) => {
          setShowStudyPicker(false);
          setQuickStudyId(id);
          setShowStudyDetail(true);
        }}
        onCreateGoal={() => {
          setShowStudyPicker(false);
          setShowGoalCreate(true);
        }}
      />
    </div>
  );
}

// ─── Quick Study Picker Modal ─────────────────────────────────────────────────
function QuickStudyPickerModal({ open, onClose, studies, onSelect, onCreateGoal }: {
  open: boolean;
  onClose: () => void;
  studies: Study[];
  onSelect: (id: string) => void;
  onCreateGoal: () => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-32px)] max-w-[380px] -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-3xl p-6 shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200 overflow-hidden">
          <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground z-10" aria-label="Fechar">
            <X size={15} />
          </Dialog.Close>

          <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-primary/10 mb-4">
            <Zap size={20} className="text-primary" />
          </div>
          <Dialog.Title className="text-base font-semibold text-foreground mb-1">Registrar sessão</Dialog.Title>
          <Dialog.Description className="text-sm text-muted-foreground mb-4">Em qual material você estudou agora?</Dialog.Description>

          <motion.div
            className="space-y-2 max-h-52 overflow-y-auto pr-1 mb-3"
            variants={listContainer}
            initial="initial"
            animate="animate"
          >
            {studies.map(s => {
              const tCfg = STUDY_TYPE_CONFIG[s.type];
              const TIcon = tCfg.icon;
              return (
                <motion.button
                  key={s.id}
                  variants={listItem}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ x: 2 }}
                  onClick={() => onSelect(s.id)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl border border-border bg-muted/40 hover:border-primary/40 hover:bg-primary/5 text-left transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <TIcon size={15} className={tCfg.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{s.title}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary/60 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${s.progressPercent}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground flex-shrink-0 tabular-nums">{s.progressPercent}%</span>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground/60 flex-shrink-0" />
                </motion.button>
              );
            })}
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onCreateGoal}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-muted-foreground/30 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all"
          >
            <Plus size={14} />
            Adicionar novo material de estudo
          </motion.button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── Goals ────────────────────────────────────────────────────────────────────
function GoalsScreen() {
  const { goals, studies } = useData();
  const [filter, setFilter] = useState<GoalStatus | "todos">("todos");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);

  const filtered = filter === "todos" ? goals : goals.filter(g => g.status === filter);
  const countByStatus: Record<GoalStatus, number> = {
    ativo:     goals.filter(g => g.status === "ativo").length,
    pausado:   goals.filter(g => g.status === "pausado").length,
    concluido: goals.filter(g => g.status === "concluido").length,
  };
  const filters: { key: GoalStatus | "todos"; label: string }[] = [
    { key: "todos",     label: "Todos" },
    { key: "ativo",     label: "Ativo" },
    { key: "pausado",   label: "Em pausa" },
    { key: "concluido", label: "Concluído" },
  ];

  return (
    <div className="px-4 pt-12 pb-24 max-w-lg mx-auto md:max-w-4xl md:px-8 md:pt-8 md:pb-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Objetivos</h1>
          <p className="text-sm text-muted-foreground">
            {countByStatus.ativo > 0
              ? `${countByStatus.ativo} objetivo${countByStatus.ativo !== 1 ? "s" : ""} ativo${countByStatus.ativo !== 1 ? "s" : ""}`
              : "Nenhum objetivo ativo no momento"}
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => setShowCreate(true)}
          className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all"
          aria-label="Novo objetivo"
        >
          <Plus size={18} />
        </motion.button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {filters.map(f => {
          const count = f.key === "todos" ? goals.length : countByStatus[f.key as GoalStatus];
          const showBadge = f.key !== "todos" && count > 0;
          return (
            <motion.button
              key={f.key}
              whileTap={{ scale: 0.94 }}
              onClick={() => setFilter(f.key)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors",
                filter === f.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              )}
            >
              {f.label}
              {showBadge && (
                <span className={cn(
                  "px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none",
                  filter === f.key ? "bg-white/25 text-white" : "bg-foreground/10 text-foreground/60"
                )}>
                  {count}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3">
            <Target size={24} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">
            {filter === "todos" ? "Nenhum objetivo ainda" : `Nenhum objetivo ${filters.find(f => f.key === filter)?.label.toLowerCase()}`}
          </p>
          <p className="text-xs text-muted-foreground">
            {filter === "todos" || filter === "ativo"
              ? "Crie seu primeiro objetivo para começar"
              : "Seus objetivos aparecerão aqui"}
          </p>
          {(filter === "todos" || filter === "ativo") && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowCreate(true)}
              className="mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all"
            >
              Criar objetivo
            </motion.button>
          )}
        </motion.div>
      )}

      <motion.div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0" variants={listContainer} initial="initial" animate="animate">
        {filtered.map(goal => {
          const cat = CATEGORY_CONFIG[goal.category];
          const CatIcon = cat.icon;
          const dl = goal.status !== "concluido" ? daysLeft(goal.targetDate) : null;
          const stats = getGoalStats(goal, studies);

          return (
            <motion.div
              key={goal.id}
              variants={listItem}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setSelectedGoalId(goal.id)}
              className="bg-card border border-border rounded-2xl p-4 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium", cat.bg, cat.color)}>
                  <CatIcon size={11} />{cat.label}
                </div>
                <span className={cn("text-xs font-medium px-2 py-0.5 rounded-md",
                  goal.status === "ativo"   ? "text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/40" :
                  goal.status === "pausado" ? "text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/40" :
                                              "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/40"
                )}>
                  {goal.status === "ativo" ? "Ativo" : goal.status === "pausado" ? "Pausado" : "Concluído"}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-3 leading-snug">{goal.title}</h3>
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-muted-foreground">Progresso geral</span>
                  <span className="text-xs font-bold text-foreground">{stats.progress}%</span>
                </div>
                <ProgressBar value={stats.progress} />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <BookOpen size={12} />
                    <span>{stats.linkedCount} estudo{stats.linkedCount !== 1 ? "s" : ""}</span>
                  </div>
                  {stats.linkedCount > 0 && (
                    <div className="flex items-center gap-0.5">
                      {stats.linked.slice(0, 5).map(s => (
                        <div
                          key={s.id}
                          className={cn("w-1.5 h-1.5 rounded-full",
                            s.status === "concluido" ? "bg-green-500" :
                            s.status === "em-andamento" ? "bg-primary" :
                            s.status === "pausado" || s.status === "descontinuado" ? "bg-amber-400" :
                            "bg-muted-foreground/30"
                          )}
                          title={STUDY_STATUS_CONFIG[s.status].label}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {stats.totalXP > 0 ? (
                  <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                    <Zap size={11} /><span>{stats.totalXP} XP</span>
                  </div>
                ) : dl !== null ? (
                  <div className={cn("flex items-center gap-1", dl < 0 ? "text-red-500" : dl <= 30 ? "text-amber-500" : "")}>
                    <Calendar size={12} />
                    <span>{dl < 0 ? `Venceu há ${Math.abs(dl)}d` : dl === 0 ? "Vence hoje" : `${dl} dias restantes`}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                    <CheckCircle2 size={12} /><span>Concluído</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <GoalCreateModal open={showCreate} onClose={() => setShowCreate(false)} />
      <GoalDetailModal
        open={!!selectedGoalId}
        goalId={selectedGoalId}
        onClose={() => setSelectedGoalId(null)}
      />
    </div>
  );
}

// ─── Studies ──────────────────────────────────────────────────────────────────
function StudiesScreen() {
  const { studies, goals, addStudy } = useData();
  const [filter, setFilter] = useState<StudyStatus | "todos">("todos");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);
  const [quickSessionStudyId, setQuickSessionStudyId] = useState<string | null>(null);

  const activeStudies = studies.filter(s => s.status !== "descontinuado");

  const filtered = filter === "todos"
    ? activeStudies
    : studies.filter(s => s.status === filter);

  const studyCountByStatus: Record<StudyStatus, number> = {
    "em-andamento":  studies.filter(s => s.status === "em-andamento").length,
    "nao-iniciado":  studies.filter(s => s.status === "nao-iniciado").length,
    "concluido":     studies.filter(s => s.status === "concluido").length,
    "pausado":       studies.filter(s => s.status === "pausado").length,
    "descontinuado": studies.filter(s => s.status === "descontinuado").length,
  };
  const filters: { key: StudyStatus | "todos"; label: string }[] = [
    { key: "todos",         label: "Todos" },
    { key: "em-andamento",  label: "Em andamento" },
    { key: "nao-iniciado",  label: "Não iniciado" },
    { key: "concluido",     label: "Concluído" },
    { key: "descontinuado", label: "Em pausa" },
  ];

  const discontinuedCount = studyCountByStatus["descontinuado"];

  return (
    <div className="px-4 pt-12 pb-24 max-w-lg mx-auto md:max-w-4xl md:px-8 md:pt-8 md:pb-10">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Estudos</h1>
          <p className="text-sm text-muted-foreground">
            {filter === "descontinuado"
              ? `${discontinuedCount} material${discontinuedCount !== 1 ? "is" : ""} pausado${discontinuedCount !== 1 ? "s" : ""}`
              : `${activeStudies.length} material${activeStudies.length !== 1 ? "is" : ""}`}
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => setShowCreate(true)}
          className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all"
          aria-label="Novo estudo"
        >
          <Plus size={18} />
        </motion.button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {filters.map(f => {
          const count = f.key === "todos" ? activeStudies.length : studyCountByStatus[f.key as StudyStatus];
          const showBadge = f.key !== "todos" && count > 0;
          const isDiscontinued = f.key === "descontinuado";
          return (
            <motion.button
              key={f.key}
              whileTap={{ scale: 0.94 }}
              onClick={() => setFilter(f.key)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors",
                filter === f.key
                  ? isDiscontinued
                    ? "bg-slate-500 text-white"
                    : "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              )}
            >
              {f.label}
              {showBadge && (
                <span className={cn(
                  "px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none",
                  filter === f.key ? "bg-white/25 text-white" : "bg-foreground/10 text-foreground/60"
                )}>
                  {count}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Discontinued hint */}
      {filter === "descontinuado" && filtered.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 flex items-start gap-2.5"
        >
          <Archive size={14} className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
            Estes materiais estão pausados. Avalie se faz sentido retomá-los ou excluí-los.
          </p>
        </motion.div>
      )}

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3">
            <BookOpen size={24} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Nenhum estudo aqui</p>
          <p className="text-xs text-muted-foreground">
            {filter === "todos" ? "Adicione seu primeiro material de estudo" : `Nenhum material com status "${filters.find(f => f.key === filter)?.label}"`}
          </p>
        </motion.div>
      )}

      <motion.div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0" variants={listContainer} initial="initial" animate="animate">
        {filtered.map(study => {
          const type       = STUDY_TYPE_CONFIG[study.type];
          const status     = STUDY_STATUS_CONFIG[study.status];
          const TypeIcon   = type.icon;
          const StatusIcon = status.icon;
          const dl         = study.deadline ? daysLeft(study.deadline) : null;
          const isDiscontinued = study.status === "descontinuado";

          const linkedGoal = study.goalId ? goals.find(g => g.id === study.goalId) : null;
          const goalCat = linkedGoal ? CATEGORY_CONFIG[linkedGoal.category] : null;

          return (
            <motion.div
              key={study.id}
              variants={listItem}
              whileHover={!isDiscontinued ? { y: -2, transition: { duration: 0.15 } } : {}}
              className={cn(
                "bg-card border rounded-2xl transition-all",
                isDiscontinued
                  ? "border-dashed border-border/60 opacity-75"
                  : "border-border hover:border-primary/30 hover:shadow-sm"
              )}
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => setSelectedStudyId(study.id)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                    isDiscontinued ? "bg-muted/60" : "bg-muted"
                  )}>
                    <TypeIcon size={18} className={isDiscontinued ? "text-muted-foreground" : type.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("font-medium leading-snug mb-0.5 truncate", isDiscontinued ? "text-muted-foreground" : "text-foreground")}>{study.title}</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-xs text-muted-foreground">{study.area}</p>
                      {goalCat && (() => {
                        const GIcon = goalCat.icon;
                        return (
                          <span className={cn("flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium", goalCat.bg, goalCat.color)}>
                            <GIcon size={8} />{goalCat.label}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {study.status === "em-andamento" && (
                      <motion.button
                        whileTap={{ scale: 0.88 }}
                        onClick={e => { e.stopPropagation(); setQuickSessionStudyId(study.id); }}
                        className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                        aria-label="Registrar sessão"
                        title="Registrar sessão de estudo"
                      >
                        <Zap size={13} className="text-primary" />
                      </motion.button>
                    )}
                    <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium flex-shrink-0", status.bg, status.color)}>
                      <StatusIcon size={10} />
                      <span className="hidden sm:inline">{status.label}</span>
                    </div>
                  </div>
                </div>
                {study.status !== "nao-iniciado" && (
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-muted-foreground">Progresso</span>
                      <span className="text-xs font-medium text-foreground">{study.progressPercent}%</span>
                    </div>
                    <ProgressBar value={study.progressPercent} />
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock size={11} />
                    <span>{study.hoursCompleted}h / {study.totalHours}h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {dl !== null ? (
                      <div className={cn("flex items-center gap-1", dl < 0 ? "text-red-500" : dl <= 7 ? "text-amber-500" : "")}>
                        <Calendar size={11} />
                        <span>{dl < 0 ? `Vencido há ${Math.abs(dl)}d` : dl === 0 ? "Vence hoje" : `${dl}d restantes`}</span>
                      </div>
                    ) : (
                      <span>{type.label}</span>
                    )}
                    <ChevronRight size={13} className="text-muted-foreground/60" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <StudyCreateModal open={showCreate} onClose={() => setShowCreate(false)} onAdd={addStudy} />
      <StudyDetailModal
        open={!!selectedStudyId}
        studyId={selectedStudyId}
        onClose={() => setSelectedStudyId(null)}
        initialStep="detail"
      />
      <StudyDetailModal
        open={!!quickSessionStudyId}
        studyId={quickSessionStudyId}
        onClose={() => setQuickSessionStudyId(null)}
        initialStep="session"
      />
    </div>
  );
}

// ─── Custom Charts ────────────────────────────────────────────────────────────
function WeeklyBars({ data }: { data: typeof WEEKLY_HOURS }) {
  const max = Math.max(...data.map(d => d.h), 1);
  return (
    <div className="flex items-end gap-1.5" style={{ height: 120 }}>
      {data.map((d, index) => (
        <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full">
          <div className="flex-1 w-full flex items-end">
            <div className="w-full bg-muted rounded-t-lg relative overflow-hidden" style={{ height: "100%" }}>
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg"
                initial={{ height: 0 }}
                animate={{ height: `${Math.max((d.h / max) * 100, d.h === 0 ? 0 : 5)}%` }}
                transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
              />
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground leading-none">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

function MonthlyArea({ data }: { data: Array<{ m: string; h: number }> }) {
  const W = 280; const H = 90;
  const pad = { t: 10, b: 4, l: 0, r: 0 };
  const innerH = H - pad.t - pad.b;
  const innerW = W - pad.l - pad.r;
  const vals = data.map(d => d.h);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const toX = (i: number) => pad.l + (i / (data.length - 1)) * innerW;
  const toY = (v: number) => pad.t + innerH - ((v - min) / range) * innerH;
  const pts = data.map((d, i) => ({ x: toX(i), y: toY(d.h) }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = `${line} L${pts[pts.length - 1].x},${H} L${pts[0].x},${H} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 110 }} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="monthlyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#2563eb" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#monthlyGrad)" />
        <path d={line} fill="none" stroke="#2563eb" strokeWidth={2} strokeLinejoin="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="#2563eb" />
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {data.map(d => (
          <span key={d.m} className="text-[10px] text-muted-foreground flex-1 text-center">{d.m}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Progress ─────────────────────────────────────────────────────────────────
function ProgressScreen() {
  const { studies, goals, user } = useData();
  const completedStudies = studies.filter(s => s.status === "concluido").length;
  const completionRate   = Math.round((completedStudies / Math.max(studies.filter(s => s.status !== "descontinuado").length, 1)) * 100);
  const levelInfo        = computeLevel(user.totalXP);
  const nextLevelInfo    = levelInfo.next;

  const annualTotal  = ANNUAL_HOURS.reduce((s, m) => s + m.h, 0);
  const bestMonth    = ANNUAL_HOURS.reduce((best, m) => m.h > best.h ? m : best, ANNUAL_HOURS[0]);
  const monthsActive = ANNUAL_HOURS.filter(m => m.h > 0).length;

  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const categoryStats = useMemo(() => {
    const catColorMap: Record<GoalCategory, string> = {
      carreira: "#7c3aed", certificacao: "#2563eb", habilidade: "#0891b2", projeto: "#ea580c",
    };
    const cats: GoalCategory[] = ["carreira", "certificacao", "habilidade", "projeto"];

    const items = cats.map(cat => {
      const catGoals = goals.filter(g => g.category === cat);
      const goalIds  = new Set(catGoals.map(g => g.id));
      const catStudies = studies.filter(s => s.goalId && goalIds.has(s.goalId));
      const hours = catStudies.reduce((sum, s) => sum + s.hoursCompleted, 0);
      return {
        name:  CATEGORY_CONFIG[cat].label,
        hours,
        color: catColorMap[cat],
        goals: catGoals.map(g => {
          const stats = getGoalStats(g, studies);
          return { id: g.id, title: g.title, progress: stats.progress, status: g.status };
        }),
        studies: catStudies.map(s => ({ id: s.id, title: s.title, hours: s.hoursCompleted, status: s.status })),
      };
    });

    // Fundamentos CS — area-based synthetic group
    const csStudies = studies.filter(s =>
      s.area === "Fundamentos de Computação" ||
      s.area.toLowerCase().includes("algoritmo") ||
      s.area.toLowerCase().includes("estrutura de dado")
    );
    if (csStudies.length > 0) {
      const csGoalIds = [...new Set(csStudies.filter(s => s.goalId).map(s => s.goalId!))];
      const csGoals   = goals.filter(g => csGoalIds.includes(g.id));
      items.push({
        name:  "Fundamentos CS",
        hours: csStudies.reduce((sum, s) => sum + s.hoursCompleted, 0),
        color: "#16a34a",
        goals: csGoals.map(g => {
          const stats = getGoalStats(g, studies);
          return { id: g.id, title: g.title, progress: stats.progress, status: g.status };
        }),
        studies: csStudies.map(s => ({ id: s.id, title: s.title, hours: s.hoursCompleted, status: s.status })),
      });
    }

    return items;
  }, [goals, studies]);
  const maxH = Math.max(1, ...categoryStats.map(c => c.hours));

  return (
    <div className="px-4 pt-12 pb-24 max-w-lg mx-auto md:max-w-4xl md:px-8 md:pt-8 md:pb-10">
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-foreground">Progresso</h1>
        <p className="text-sm text-muted-foreground">Jornada UX → Engenharia de Software</p>
      </div>

      {/* Level card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-5 bg-card border border-border rounded-2xl p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center", levelInfo.bg)}>
              <Star size={20} className={levelInfo.color} fill="currentColor" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={cn("text-sm font-bold", levelInfo.color)}>Nível {levelInfo.level}</span>
                <span className="text-sm font-semibold text-foreground">{levelInfo.title}</span>
              </div>
              <p className="text-xs text-muted-foreground">{user.totalXP} XP acumulados</p>
            </div>
          </div>
          {nextLevelInfo && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Próximo</p>
              <p className={cn("text-xs font-semibold", nextLevelInfo.color)}>{nextLevelInfo.title}</p>
            </div>
          )}
        </div>
        <div className="mb-1.5">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progresso do nível</span>
            <span className="font-medium text-foreground">{levelInfo.progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-amber-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${levelInfo.progress}%` }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>
        {nextLevelInfo && (
          <p className="text-[11px] text-muted-foreground text-right">
            {nextLevelInfo.minXP - user.totalXP} XP para {nextLevelInfo.title}
          </p>
        )}
      </motion.div>

      <motion.div className="grid grid-cols-3 gap-3 mb-5" variants={statsContainer} initial="initial" animate="animate">
        {([
          { label: "Streak",         value: `${user.streak}d`,              Icon: Flame,  color: "text-amber-500" },
          { label: "Total horas",    value: `${user.totalHoursStudied}h`,  Icon: Clock,  color: "text-blue-500" },
          { label: "Taxa conclusão", value: `${completionRate}%`,          Icon: Trophy, color: "text-green-500" },
        ] as const).map(({ label, value, Icon, color }) => (
          <motion.div key={label} variants={statCard} className="bg-card border border-border rounded-2xl p-3 text-center">
            <Icon size={20} className={cn("mx-auto mb-1.5", color)} />
            <p className="text-lg font-bold text-foreground">{value}</p>
            <p className="text-[11px] text-muted-foreground">{label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="md:grid md:grid-cols-2 md:gap-5 mb-5">
        <div className="bg-card border border-border rounded-2xl p-4 mb-5 md:mb-0">
          <h2 className="font-semibold text-foreground text-sm mb-4">Horas esta semana</h2>
          <WeeklyBars data={WEEKLY_HOURS} />
        </div>

        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground text-sm">Evolução anual</h2>
            <span className="text-xs text-muted-foreground">{annualTotal}h no ano</span>
          </div>
          <MonthlyArea data={ANNUAL_HOURS} />
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center">
              <p className="text-sm font-bold text-foreground">{annualTotal}h</p>
              <p className="text-[10px] text-muted-foreground">Total no ano</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-sm font-bold text-foreground">{bestMonth.m}</p>
              <p className="text-[10px] text-muted-foreground">Melhor mês ({bestMonth.h}h)</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-foreground">{monthsActive}</p>
              <p className="text-[10px] text-muted-foreground">Meses ativos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-4">
        <h2 className="font-semibold text-foreground text-sm mb-1">Horas por categoria</h2>
        <p className="text-[11px] text-muted-foreground mb-4">Toque em uma categoria para ver os detalhes</p>
        <div className="space-y-3.5">
          {categoryStats.map(cat => {
            const isOpen = selectedCat === cat.name;
            const statusLabel: Record<string, string> = {
              "ativo": "Ativo", "concluido": "Concluído", "pausado": "Pausado",
              "em-andamento": "Em andamento", "nao-iniciado": "Não iniciado",
              "descontinuado": "Descontinuado", "concluída": "Concluída",
            };
            const statusColor: Record<string, string> = {
              "ativo": "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30",
              "concluido": "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30",
              "pausado": "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30",
              "em-andamento": "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30",
              "nao-iniciado": "text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/40",
              "descontinuado": "text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30",
            };
            return (
              <div key={cat.name}>
                <button
                  className="w-full text-left focus:outline-none group"
                  onClick={() => setSelectedCat(isOpen ? null : cat.name)}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.18 }}
                        className="w-3.5 h-3.5 flex items-center justify-center text-muted-foreground"
                      >
                        <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                          <path d="M1 1l6 4-6 4V1z"/>
                        </svg>
                      </motion.div>
                      <span className="text-xs font-medium text-foreground group-hover:opacity-80 transition-opacity">{cat.name}</span>
                    </div>
                    <span className="font-semibold text-xs" style={{ color: cat.color }}>{cat.hours}h</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(cat.hours / maxH) * 100}%` }}
                      transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 rounded-xl border border-border bg-muted/30 p-3 space-y-3">
                        {/* Goals */}
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                            Objetivos vinculados
                          </p>
                          <div className="space-y-2">
                            {cat.goals.map(g => (
                              <div key={g.id} className="flex items-center gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-foreground truncate">{g.title}</p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden max-w-[80px]">
                                      <div className="h-full rounded-full" style={{ width: `${g.progress}%`, backgroundColor: cat.color, opacity: 0.7 }} />
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">{g.progress}%</span>
                                    <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-md", statusColor[g.status] ?? "text-muted-foreground bg-muted")}>
                                      {statusLabel[g.status] ?? g.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-border" />

                        {/* Studies */}
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                            Estudos nesta categoria
                          </p>
                          <div className="space-y-2">
                            {cat.studies.map(s => (
                              <div key={s.id} className="flex items-start gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: cat.color, opacity: 0.5 }} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-foreground truncate">{s.title}</p>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="text-[10px] text-muted-foreground">{s.hours}h registradas</span>
                                    <span className="text-[10px] text-muted-foreground">·</span>
                                    <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-md", statusColor[s.status] ?? "text-muted-foreground bg-muted")}>
                                      {statusLabel[s.status] ?? s.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar Nav (desktop only) ───────────────────────────────────────────────
function SidebarNav({ active, onChange, user, darkMode, onToggleDark }: {
  active: Tab; onChange: (tab: Tab) => void;
  user: UserProfile; darkMode: boolean; onToggleDark: () => void;
}) {
  const tabs = [
    { id: "dashboard" as Tab, label: "Início",     Icon: Home },
    { id: "goals"     as Tab, label: "Objetivos",  Icon: Target },
    { id: "studies"   as Tab, label: "Estudos",    Icon: BookOpen },
    { id: "progress"  as Tab, label: "Progresso",  Icon: TrendingUp },
    { id: "community" as Tab, label: "Comunidade", Icon: Users },
    { id: "profile"   as Tab, label: "Perfil",     Icon: User },
  ];
  return (
    <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-60 bg-card border-r border-border z-40">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <TrendingUp size={14} className="text-primary-foreground" />
          </div>
          <span className="font-bold text-base text-foreground">Progress</span>
        </div>
      </div>
      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <motion.button
              key={id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon size={17} />
              {label}
              {isActive && (
                <motion.span
                  layoutId="sidebarActivePill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>
      {/* User footer */}
      <div className="px-3 pb-5 pt-3 border-t border-border flex-shrink-0">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-muted transition-colors cursor-default">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary flex-shrink-0">
              {user.avatarInitials}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">{user.name.split(" ")[0]}</p>
            <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
          </div>
          <button
            onClick={onToggleDark}
            className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            aria-label="Alternar tema"
          >
            {darkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>
    </aside>
  );
}

// ─── Bottom Navigation ────────────────────────────────────────────────────────
function BottomNav({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  const tabs: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: "dashboard", label: "Início",     Icon: Home },
    { id: "goals",     label: "Objetivos",  Icon: Target },
    { id: "studies",   label: "Estudos",    Icon: BookOpen },
    { id: "progress",  label: "Progresso",  Icon: TrendingUp },
    { id: "community", label: "Comunidade", Icon: Users },
    { id: "profile",   label: "Perfil",     Icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border md:hidden" aria-label="Navegação principal">
      <div className="flex items-center max-w-lg mx-auto pb-safe">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <motion.button
              key={id}
              onClick={() => onChange(id)}
              whileTap={{ scale: 0.88 }}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors relative",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <motion.div
                animate={{ scale: isActive ? 1.12 : 1, y: isActive ? -1 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
              >
                <Icon size={18} />
              </motion.div>
              <span className="text-[9px] font-medium leading-none">{label}</span>
              {isActive && (
                <motion.span
                  layoutId="activeNavPill"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}

// ─── App Phase ────────────────────────────────────────────────────────────────
type AppPhase = "loading" | "auth" | "onboarding" | "app";
const ONBOARDING_DONE_KEY = "progress_onboarding_v1";

// Monta um UserProfile a partir dos dados reais do Firebase, preenchendo
// o restante (streak, XP, etc.) com valores padrão de conta nova. Enquanto
// não houver um banco de dados conectado (Firestore/Supabase), o progresso
// de contas que já existiam antes é reconstituído a partir dos dados de
// demonstração (INIT_USER/INIT_GOALS/INIT_STUDIES) — apenas a identidade
// (uid, nome, e-mail, foto, provedor) vem do Firebase de verdade.
function buildUserFromFirebase(firebaseUser: FirebaseUser): UserProfile {
  const provider = firebaseUser.providerData[0]?.providerId as UserProfile["authProvider"] | undefined;
  const name = firebaseUser.displayName?.trim() || firebaseUser.email?.split("@")[0] || "Usuário";
  return {
    uid: firebaseUser.uid,
    name,
    email: firebaseUser.email ?? "",
    avatarInitials: name.slice(0, 2).toUpperCase(),
    avatarUrl: firebaseUser.photoURL ?? undefined,
    streak: 0,
    totalHoursStudied: 0,
    joinedAt: todayISO(),
    authProvider: provider === "google.com" ? "google.com" : "password",
    notificationsEnabled: true,
    totalXP: 0,
  };
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase]       = useState<AppPhase>("loading");
  const [tab, setTab]           = useState<Tab>("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [modalState, setModalState] = useState<{ open: boolean; config: ModalConfig | null }>({ open: false, config: null });
  const [goals, setGoals]       = useState<Goal[]>([]);
  const [studies, setStudies]   = useState<Study[]>([]);
  const [posts, setPosts]       = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [user, setUser]         = useState<UserProfile>(INIT_USER);
  const [settings, setSettings] = useState<AppSettings>({ reminderEnabled: true, reminderTime: "20:00", dailyGoalHours: 2 });

  const openModal    = useCallback((config: ModalConfig) => setModalState({ open: true, config }), []);
  const closeModal   = useCallback(() => setModalState(s => ({ ...s, open: false })), []);
  const addGoal      = useCallback((g: Goal) => setGoals(prev => [g, ...prev]), []);
  const updateGoal   = useCallback((id: string, updates: Partial<Goal>) =>
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g)), []);
  const addStudy     = useCallback((s: Study) => setStudies(prev => [s, ...prev]), []);
  const updateStudy  = useCallback((id: string, updates: Partial<Study>) =>
    setStudies(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s)), []);
  const addPost      = useCallback((p: CommunityPost) => setPosts(prev => [p, ...prev]), []);
  const updatePost   = useCallback((id: string, updates: Partial<CommunityPost>) =>
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p)), []);
  const deleteGoal   = useCallback((id: string) =>
    setGoals(prev => prev.filter(g => g.id !== id)), []);
  const deleteStudy  = useCallback((id: string) =>
    setStudies(prev => prev.filter(s => s.id !== id)), []);
  const deletePost   = useCallback((id: string) =>
    setPosts(prev => prev.filter(p => p.id !== id)), []);
  const updateUser   = useCallback((p: Partial<UserProfile>) =>
    setUser(prev => ({ ...prev, ...p })), []);

  const pauseGoalCascade = useCallback((goalId: string) => {
    setGoals(prev => prev.map(g =>
      g.id === goalId ? { ...g, status: "pausado" as GoalStatus, updatedAt: todayISO() } : g
    ));
    setStudies(prev => prev.map(s => {
      if (s.goalId !== goalId) return s;
      if (s.status === "concluido" || s.status === "descontinuado") return s;
      const next: StudyStatus = s.status === "em-andamento" ? "pausado" : s.status;
      return { ...s, statusBeforeGoalPause: s.status, status: next };
    }));
  }, []);

  const resumeGoalCascade = useCallback((goalId: string) => {
    setGoals(prev => prev.map(g =>
      g.id === goalId ? { ...g, status: "ativo" as GoalStatus, updatedAt: todayISO() } : g
    ));
    setStudies(prev => prev.map(s => {
      if (s.goalId !== goalId || !s.statusBeforeGoalPause) return s;
      return { ...s, status: s.statusBeforeGoalPause, statusBeforeGoalPause: undefined };
    }));
  }, []);

  // ── Auth / onboarding handlers ────────────────────────────────────────────
  // Ouve o estado de autenticação real do Firebase. Isso cobre dois casos:
  // 1) usuário recarrega a página com uma sessão já ativa (mantém logado);
  // 2) signOut() é chamado (ex: botão "Sair da conta") — o listener detecta
  //    a mudança e devolve a pessoa para a tela de login automaticamente.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser((prev) => {
          // Se já temos progresso carregado para este mesmo uid (ex: acabou
          // de se cadastrar/entrar nesta mesma sessão), não sobrescreve.
          if (prev.uid === firebaseUser.uid) return prev;
          return buildUserFromFirebase(firebaseUser);
        });
        setPhase((prevPhase) => {
          // Evita reabrir onboarding/app se já estamos no meio desses fluxos
          // por causa de um signup que acabou de acontecer nesta sessão.
          if (prevPhase === "onboarding" || prevPhase === "app") return prevPhase;
          return "app";
        });
        setGoals((prev) => (prev.length ? prev : INIT_GOALS));
        setStudies((prev) => (prev.length ? prev : INIT_STUDIES));
        setPosts((prev) => (prev.length ? prev : COMMUNITY_POSTS));
      } else {
        setPhase("auth");
      }
    });
    return unsubscribe;
  }, []);

  const handleAuthSuccess = useCallback((firebaseUser: FirebaseUser, isNewUser: boolean) => {
    const profile = buildUserFromFirebase(firebaseUser);
    setUser(profile);
    if (isNewUser) {
      setGoals([]);
      setStudies([]);
      setPosts(COMMUNITY_POSTS);
      const alreadySeen = localStorage.getItem(ONBOARDING_DONE_KEY) === "done";
      setPhase(alreadySeen ? "app" : "onboarding");
    } else {
      setGoals(INIT_GOALS);
      setStudies(INIT_STUDIES);
      setPosts(COMMUNITY_POSTS);
      setPhase("app");
    }
  }, []);

  const handleLogout = useCallback(async () => {
    await signOut(auth);
    // onAuthStateChanged (acima) detecta o logout e ajusta a fase/tela
    // automaticamente; aqui só limpamos o estado local em memória.
    setUser(INIT_USER);
    setGoals([]);
    setStudies([]);
    setTab("dashboard");
  }, []);

  const handleOnboardingComplete = useCallback((goalData: { title: string; category: GoalCategory; targetDate: string } | null) => {
    if (goalData) {
      const today = todayISO();
      setGoals([{
        id: `g${Date.now()}`,
        userId: user.uid,
        title: goalData.title,
        category: goalData.category,
        targetDate: goalData.targetDate || today,
        progress: 0,
        status: "ativo",
        studiesLinked: 0,
        createdAt: today,
        updatedAt: today,
      }]);
    }
    localStorage.setItem(ONBOARDING_DONE_KEY, "done");
    setPhase("app");
  }, [user.uid]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Auto-transition studies at 100% progress to concluido
  useEffect(() => {
    setStudies(prev => prev.map(s => {
      if (s.progressPercent >= 100 && s.status !== "concluido" && s.status !== "descontinuado") {
        return { ...s, status: "concluido" };
      }
      return s;
    }));
  }, []);

  // Auto-transition goals to concluido when computed progress from linked studies reaches 100%
  useEffect(() => {
    setGoals(prev => prev.map(g => {
      if (g.status === "concluido") return g;
      const linked = studies.filter(s => s.goalId === g.id);
      const progress = linked.length > 0
        ? Math.round(linked.reduce((sum, s) => sum + s.progressPercent, 0) / linked.length)
        : g.progress;
      if (progress >= 100) return { ...g, status: "concluido", updatedAt: todayISO() };
      return g;
    }));
  }, [studies]);

  // Loading phase — aguardando o Firebase confirmar se já existe uma sessão
  if (phase === "loading") {
    return (
      <div className={cn("min-h-screen flex items-center justify-center bg-background", darkMode ? "dark" : "")}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full"
        />
      </div>
    );
  }

  // Auth phase — renders outside DataCtx (no data needed)
  if (phase === "auth") {
    return (
      <div className={darkMode ? "dark" : ""}>
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  // Onboarding phase — renders outside DataCtx (creates first goal on complete)
  if (phase === "onboarding") {
    return (
      <div className={cn("min-h-screen", darkMode ? "dark" : "")}>
        <div className="bg-background min-h-screen">
          <OnboardingScreen userName={user.name} onComplete={handleOnboardingComplete} onBack={() => setPhase("auth")} />
        </div>
      </div>
    );
  }

  return (
    <DataCtx.Provider value={{ goals, studies, posts, user, addGoal, updateGoal, addStudy, updateStudy, addPost, updatePost, deleteGoal, deleteStudy, deletePost, updateUser, pauseGoalCascade, resumeGoalCascade }}>
      <ModalCtx.Provider value={{ openModal }}>
        <div className="min-h-screen bg-background md:flex">
          <SidebarNav active={tab} onChange={setTab} user={user} darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} />
          <div className="flex-1 md:ml-60 min-h-screen overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.14 }}
                className="min-h-screen"
              >
                {tab === "dashboard" && <DashboardScreen onTabChange={setTab} />}
                {tab === "goals"     && <GoalsScreen />}
                {tab === "studies"   && <StudiesScreen />}
                {tab === "progress"  && <ProgressScreen />}
                {tab === "community" && <CommunityScreen />}
                {tab === "profile"   && (
                  <ProfileScreen
                    darkMode={darkMode}
                    onToggleDark={() => setDarkMode(d => !d)}
                    settings={settings}
                    onSaveSettings={setSettings}
                    onCommunityNav={() => setTab("community")}
                    onLogout={handleLogout}
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <BottomNav active={tab} onChange={setTab} />
          </div>
          <AppModal config={modalState.config} open={modalState.open} onClose={closeModal} />
        </div>
      </ModalCtx.Provider>
    </DataCtx.Provider>
  );
}
