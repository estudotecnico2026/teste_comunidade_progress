import React, { useState, useEffect } from "react";
import {
  BookOpen, Plus, CheckCircle2, ArrowLeft, X, Zap,
  Edit3, Trash2, Archive, RotateCcw, Star, Trophy,
  ChevronRight,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./components/ui/utils";
import { useData } from "./contexts";
import type { StudyType, StudyStatus, StudySessionEntry } from "./types";
import {
  INIT_USER, CATEGORY_CONFIG, STUDY_TYPE_CONFIG, STUDY_STATUS_CONFIG,
  todayISO, sevenDaysAgoISO, daysLeft, formatDate,
  calcXP, getMilestones, computeLevel,
} from "./data";

const INPUT_CLS = "w-full px-3.5 py-2.5 rounded-xl bg-input-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all";
const LABEL_CLS = "text-xs font-medium text-muted-foreground mb-1.5 block";

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

// ─── StudyCreateModal ─────────────────────────────────────────────────────────
export function StudyCreateModal({ open, onClose, onAdd }: {
  open: boolean;
  onClose: () => void;
  onAdd: (s: import("./types").Study) => void;
}) {
  const { goals } = useData();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<StudyType>("curso");
  const [totalHours, setTotalHours] = useState("10");
  const [deadline, setDeadline] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [linkedGoalId, setLinkedGoalId] = useState("");
  const [step, setStep] = useState<"form" | "success">("form");

  const activeGoals = goals.filter(g => g.status === "ativo");
  const canSubmit = title.trim().length > 2;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const hours = Math.max(1, parseInt(totalHours) || 10);
    onAdd({
      id: `s${Date.now()}`,
      userId: user.uid,
      type,
      title: title.trim(),
      area: STUDY_TYPE_CONFIG[type].label,
      status: "nao-iniciado",
      progressPercent: 0,
      hoursCompleted: 0,
      totalHours: hours,
      deadline: deadline || undefined,
      url: url.trim() || undefined,
      notes: notes.trim() || undefined,
      goalId: linkedGoalId || undefined,
      createdAt: todayISO(),
    });
    setStep("success");
  };

  const handleClose = () => {
    setTitle(""); setType("curso"); setTotalHours("10"); setDeadline("");
    setUrl(""); setNotes(""); setLinkedGoalId(""); setStep("form");
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-32px)] max-w-[380px] -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-3xl shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200 overflow-hidden max-h-[90vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.div key="form" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }} className="p-6">
                <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground z-10" aria-label="Fechar">
                  <X size={15} />
                </Dialog.Close>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 mb-4">
                  <BookOpen size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-1">Adicionar material</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-5">Cursos, livros, artigos e mais — tudo organizado</Dialog.Description>

                <div className="space-y-4">
                  <div>
                    <label className={LABEL_CLS}>Título *</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: AWS Solutions Architect — Udemy" className={INPUT_CLS} autoFocus />
                  </div>

                  <div>
                    <label className={LABEL_CLS}>Tipo de material</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.entries(STUDY_TYPE_CONFIG) as [StudyType, typeof STUDY_TYPE_CONFIG[StudyType]][]).map(([key, cfg]) => {
                        const Icon = cfg.icon; const sel = type === key;
                        return (
                          <motion.button key={key} whileTap={{ scale: 0.93 }} onClick={() => setType(key)} className={cn("flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border text-xs font-medium transition-all", sel ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground hover:border-primary/30")}>
                            <Icon size={16} className={sel ? "text-primary" : cfg.color} />{cfg.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={LABEL_CLS}>Total de horas</label>
                      <input type="text" inputMode="numeric" pattern="[0-9]*" value={totalHours} onChange={e => setTotalHours(e.target.value.replace(/\D/g, ""))} placeholder="Ex: 120" className={INPUT_CLS} />
                    </div>
                    <div>
                      <label className={LABEL_CLS}>Prazo (opcional)</label>
                      <input type="date" value={deadline} min={todayISO()} onChange={e => setDeadline(e.target.value)} className={INPUT_CLS} />
                    </div>
                  </div>

                  <div>
                    <label className={LABEL_CLS}>Link do material <span className="text-muted-foreground/60">(opcional)</span></label>
                    <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://udemy.com/course/..." className={INPUT_CLS} />
                    <p className="text-[11px] text-muted-foreground mt-1">URL do curso, vídeo, artigo ou podcast</p>
                  </div>

                  <div>
                    <label className={LABEL_CLS}>Anotações e referências <span className="text-muted-foreground/60">(opcional)</span></label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Ex: Capítulo 3 tem exercícios extras. Ver também: livro Clean Code..." rows={3} className={cn(INPUT_CLS, "resize-none")} />
                  </div>

                  {activeGoals.length > 0 && (
                    <div>
                      <label className={LABEL_CLS}>Vincular a objetivo <span className="text-muted-foreground/60">(opcional)</span></label>
                      <div className="space-y-1.5">
                        {activeGoals.map(g => {
                          const cfg = CATEGORY_CONFIG[g.category]; const Icon = cfg.icon; const sel = linkedGoalId === g.id;
                          return (
                            <motion.button key={g.id} whileTap={{ scale: 0.97 }} onClick={() => setLinkedGoalId(sel ? "" : g.id)} className={cn("w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border text-left transition-all", sel ? "border-primary/50 bg-primary/5" : "border-border bg-muted/40 hover:border-primary/20")}>
                              <span className={cn("flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium flex-shrink-0", cfg.bg, cfg.color)}><Icon size={9} />{cfg.label}</span>
                              <span className="flex-1 text-xs text-foreground truncate">{g.title}</span>
                              {sel && <CheckCircle2 size={13} className="text-primary flex-shrink-0" />}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2.5 mt-5">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubmit} disabled={!canSubmit} className={cn("w-full py-3 rounded-2xl text-sm font-semibold transition-all", canSubmit ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed")}>Adicionar material</motion.button>
                  <button onClick={handleClose} className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-all">Cancelar</button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="p-6 text-center">
                <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.08, type: "spring", stiffness: 420, damping: 22 }} className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={28} className="text-blue-600 dark:text-blue-400" />
                </motion.div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-2">Material adicionado!</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-4">
                  <strong className="text-foreground">{title}</strong> está na sua lista{linkedGoalId ? " e vinculado ao objetivo" : ""}. Marque como "em andamento" quando começar.
                </Dialog.Description>
                {linkedGoalId && (() => {
                  const g = goals.find(g => g.id === linkedGoalId);
                  if (!g) return null;
                  const cfg = CATEGORY_CONFIG[g.category]; const Icon = cfg.icon;
                  return (
                    <div className={cn("flex items-center gap-2 px-3 py-2 rounded-xl mb-4 border", cfg.bg)}>
                      <Icon size={13} className={cfg.color} />
                      <span className={cn("text-xs font-medium truncate", cfg.color)}>{g.title}</span>
                    </div>
                  );
                })()}
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleClose} className="w-full py-3 rounded-2xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all">Ver meus estudos</motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── StudyDetailModal ─────────────────────────────────────────────────────────
type DetailStep = "detail" | "session" | "session-success" | "edit" | "confirm-discontinue" | "confirm-delete";

const HOUR_PRESETS = [0.5, 1, 1.5, 2, 3];

interface SessionResult {
  xp: number;
  newPct: number;
  milestones: number[];
  completed: boolean;
  levelBefore: ReturnType<typeof computeLevel>;
  levelAfter: ReturnType<typeof computeLevel>;
  leveledUp: boolean;
}

export function StudyDetailModal({ open, onClose, studyId, initialStep = "detail" }: {
  open: boolean;
  onClose: () => void;
  studyId: string | null;
  initialStep?: DetailStep;
}) {
  const { studies, goals, updateStudy, deleteStudy, user, updateUser } = useData();
  const study = studies.find(s => s.id === studyId) ?? null;

  const [step, setStep] = useState<DetailStep>(initialStep);
  const [sessionHours, setSessionHours] = useState<number>(1);
  const [sessionCustom, setSessionCustom] = useState(false);
  const [sessionDate, setSessionDate] = useState(todayISO());
  const [sessionNotes, setSessionNotes] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editType, setEditType] = useState<StudyType>("curso");
  const [editTotalHours, setEditTotalHours] = useState("10");
  const [editDeadline, setEditDeadline] = useState("");
  const [editStatus, setEditStatus] = useState<Exclude<StudyStatus, "descontinuado">>("em-andamento");
  const [editUrl, setEditUrl] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editGoalId, setEditGoalId] = useState("");
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);

  useEffect(() => {
    if (open && study) {
      setStep(initialStep);
      setSessionHours(1);
      setSessionCustom(false);
      setSessionDate(todayISO());
      setSessionNotes("");
      setEditTitle(study.title);
      setEditType(study.type);
      setEditTotalHours(String(study.totalHours));
      setEditDeadline(study.deadline ?? "");
      setEditUrl(study.url ?? "");
      setEditNotes(study.notes ?? "");
      setEditGoalId(study.goalId ?? "");
      const safeStatus = study.status === "descontinuado" || study.status === "concluido" ? "em-andamento" : study.status;
      setEditStatus(safeStatus as Exclude<StudyStatus, "descontinuado">);
    }
  }, [open, studyId]);

  if (!study) return null;

  const type       = STUDY_TYPE_CONFIG[study.type];
  const status     = STUDY_STATUS_CONFIG[study.status];
  const TypeIcon   = type.icon;
  const dl         = study.deadline ? daysLeft(study.deadline) : null;
  const sessions   = study.sessions ?? [];
  const recentSessions = sessions.slice(-3).reverse();
  const canSession = study.status !== "concluido" && study.status !== "descontinuado";

  const handleSaveSession = () => {
    if (sessionHours <= 0) return;
    const oldPct = study.progressPercent;
    const newHours = study.hoursCompleted + sessionHours;
    const newPct = Math.min(100, Math.round((newHours / study.totalHours) * 100));
    const xp = calcXP(sessionHours, oldPct, newPct);
    const milestones = getMilestones(oldPct, newPct);
    const completed = newPct >= 100;

    const newSession: StudySessionEntry = {
      id: `ss${Date.now()}`,
      date: sessionDate,
      hours: sessionHours,
      notes: sessionNotes.trim() || undefined,
      xpEarned: xp,
    };

    const levelBefore = computeLevel(user.totalXP);
    const levelAfter  = computeLevel(user.totalXP + xp);

    updateStudy(study.id, {
      hoursCompleted: newHours,
      progressPercent: newPct,
      status: completed ? "concluido" : (study.status === "nao-iniciado" ? "em-andamento" : study.status),
      lastSessionAt: sessionDate,
      sessions: [...sessions, newSession],
    });
    updateUser({ totalXP: user.totalXP + xp, totalHoursStudied: user.totalHoursStudied + sessionHours });

    setSessionResult({ xp, newPct, milestones, completed, levelBefore, levelAfter, leveledUp: levelAfter.level > levelBefore.level });
    setStep("session-success");
  };

  const handleSaveEdit = () => {
    const hours = Math.max(1, parseInt(editTotalHours) || study.totalHours);
    const newPct = Math.round((study.hoursCompleted / hours) * 100);
    updateStudy(study.id, {
      title: editTitle.trim() || study.title,
      type: editType,
      area: STUDY_TYPE_CONFIG[editType].label,
      totalHours: hours,
      progressPercent: Math.min(100, newPct),
      deadline: editDeadline || undefined,
      status: editStatus,
      url: editUrl.trim() || undefined,
      notes: editNotes.trim() || undefined,
      goalId: editGoalId || undefined,
    });
    setStep("detail");
  };

  const handleDiscontinue = () => { updateStudy(study.id, { status: "descontinuado" }); onClose(); };
  const handleRetomar = () => { updateStudy(study.id, { status: study.hoursCompleted > 0 ? "em-andamento" : "nao-iniciado" }); onClose(); };
  const handleDelete = () => { deleteStudy(study.id); onClose(); };

  const levelInfo = computeLevel(user.totalXP);

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-32px)] max-w-[400px] -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-3xl shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200 overflow-hidden max-h-[88vh] overflow-y-auto">
          <AnimatePresence mode="wait">

            {step === "detail" && (
              <motion.div key="detail" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }} className="p-6">
                <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground z-10" aria-label="Fechar"><X size={15} /></Dialog.Close>
                <div className="flex items-start gap-3.5 mb-4 pr-8">
                  <div className="w-11 h-11 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0"><TypeIcon size={20} className={type.color} /></div>
                  <div className="min-w-0">
                    <Dialog.Title className="font-semibold text-foreground leading-snug text-sm">{study.title}</Dialog.Title>
                    <p className="text-xs text-muted-foreground mt-0.5">{study.area}</p>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <span className={cn("flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium", status.bg, status.color)}><status.icon size={9} />{status.label}</span>
                      <span className="text-[11px] text-muted-foreground">{type.label}</span>
                      {(() => {
                        const linkedGoal = study.goalId ? goals.find(g => g.id === study.goalId) : null;
                        if (!linkedGoal) return null;
                        const cfg = CATEGORY_CONFIG[linkedGoal.category]; const GIcon = cfg.icon;
                        return <span className={cn("flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium", cfg.bg, cfg.color)}><GIcon size={8} />{cfg.label}</span>;
                      })()}
                    </div>
                  </div>
                </div>
                <Dialog.Description className="sr-only">Detalhes e ações do estudo {study.title}</Dialog.Description>

                {study.status !== "nao-iniciado" && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-muted-foreground">Progresso</span>
                      <span className="text-xs font-bold text-foreground">{study.progressPercent}%</span>
                    </div>
                    <ProgressBar value={study.progressPercent} />
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-muted/60 rounded-xl p-2.5 text-center"><p className="text-xs font-bold text-foreground">{study.hoursCompleted}h</p><p className="text-[10px] text-muted-foreground">concluídas</p></div>
                  <div className="bg-muted/60 rounded-xl p-2.5 text-center"><p className="text-xs font-bold text-foreground">{study.totalHours}h</p><p className="text-[10px] text-muted-foreground">total</p></div>
                  <div className="bg-muted/60 rounded-xl p-2.5 text-center">
                    {dl !== null ? (
                      <><p className={cn("text-xs font-bold", dl < 0 ? "text-red-500" : dl <= 7 ? "text-amber-500" : "text-foreground")}>{dl < 0 ? `${Math.abs(dl)}d` : `${dl}d`}</p><p className="text-[10px] text-muted-foreground">{dl < 0 ? "vencido" : "restantes"}</p></>
                    ) : (
                      <><p className="text-xs font-bold text-muted-foreground">—</p><p className="text-[10px] text-muted-foreground">sem prazo</p></>
                    )}
                  </div>
                </div>

                {recentSessions.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Sessões recentes</p>
                    <div className="space-y-1.5">
                      {recentSessions.map(s => (
                        <div key={s.id} className="flex items-center gap-2.5 py-2 px-3 bg-muted/50 rounded-xl">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-foreground font-medium">{formatDate(s.date)}</span>
                              <div className="flex items-center gap-1.5"><span className="text-xs text-muted-foreground">{s.hours}h</span><span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">+{s.xpEarned} XP</span></div>
                            </div>
                            {s.notes && <p className="text-[11px] text-muted-foreground truncate mt-0.5">{s.notes}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(study.url || study.notes) && (
                  <div className="mb-4 space-y-2.5">
                    {study.url && (
                      <a href={study.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-primary/8 border border-primary/20 hover:bg-primary/12 transition-colors group">
                        <div className="w-6 h-6 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0"><ChevronRight size={12} className="text-primary" /></div>
                        <span className="text-xs text-primary font-medium truncate flex-1">{study.url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}</span>
                        <span className="text-[10px] text-primary/60 flex-shrink-0 group-hover:text-primary transition-colors">Abrir →</span>
                      </a>
                    )}
                    {study.notes && (
                      <div className="px-3 py-2.5 rounded-xl bg-muted/60 border border-border/60">
                        <p className="text-[10px] font-medium text-muted-foreground mb-1">Anotações</p>
                        <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">{study.notes}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2.5">
                  {canSession && (
                    <motion.button whileTap={{ scale: 0.97 }} onClick={() => setStep("session")} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all">
                      <Plus size={16} />Registrar sessão de estudo
                    </motion.button>
                  )}
                  {study.status === "descontinuado" && (
                    <motion.button whileTap={{ scale: 0.97 }} onClick={handleRetomar} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-green-600 text-white text-sm font-semibold hover:opacity-90 transition-all">
                      <RotateCcw size={15} />Retomar este estudo
                    </motion.button>
                  )}
                  <div className="flex gap-2">
                    <motion.button whileTap={{ scale: 0.96 }} onClick={() => setStep("edit")} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-medium hover:bg-secondary transition-colors">
                      <Edit3 size={14} />Editar
                    </motion.button>
                    {study.status !== "descontinuado" && study.status !== "concluido" && (
                      <motion.button whileTap={{ scale: 0.96 }} onClick={() => setStep("confirm-discontinue")} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                        <Archive size={14} />Pausar
                      </motion.button>
                    )}
                    <motion.button whileTap={{ scale: 0.96 }} onClick={() => setStep("confirm-delete")} className="w-11 flex items-center justify-center py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors" aria-label="Excluir estudo">
                      <Trash2 size={15} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "session" && (
              <motion.div key="session" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }} className="p-6">
                <button onClick={() => setStep("detail")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5">
                  <ArrowLeft size={15} />Voltar
                </button>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-primary/10 mb-4"><Zap size={20} className="text-primary" /></div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-0.5">Registrar sessão</Dialog.Title>
                <Dialog.Description className="text-xs text-muted-foreground mb-5 truncate">{study.title}</Dialog.Description>

                <div className="space-y-4">
                  <div>
                    <label className={LABEL_CLS}>Quanto você estudou? *</label>
                    <div className="flex gap-2 mb-2">
                      {HOUR_PRESETS.map(h => (
                        <motion.button key={h} whileTap={{ scale: 0.92 }} onClick={() => { setSessionHours(h); setSessionCustom(false); }} className={cn("flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all", !sessionCustom && sessionHours === h ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary")}>
                          {h === 3 ? "3h+" : `${h}h`}
                        </motion.button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="custom-hours" checked={sessionCustom} onChange={e => setSessionCustom(e.target.checked)} className="w-3.5 h-3.5 rounded accent-primary" />
                      <label htmlFor="custom-hours" className="text-xs text-muted-foreground">Valor personalizado</label>
                      {sessionCustom && (
                        <div className="ml-auto flex items-center gap-1" role="group" aria-label="Horas de estudo">
                          <motion.button type="button" whileTap={{ scale: 0.88 }} onClick={() => setSessionHours(h => Math.max(0.5, parseFloat((h - 0.5).toFixed(1))))} disabled={sessionHours <= 0.5} aria-label="Diminuir" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-foreground text-base font-bold hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed">−</motion.button>
                          <span className="w-14 text-center text-sm font-semibold text-foreground tabular-nums" aria-live="polite">{sessionHours}h</span>
                          <motion.button type="button" whileTap={{ scale: 0.88 }} onClick={() => setSessionHours(h => Math.min(24, parseFloat((h + 0.5).toFixed(1))))} disabled={sessionHours >= 24} aria-label="Aumentar" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-foreground text-base font-bold hover:bg-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed">+</motion.button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className={LABEL_CLS}>Data da sessão</label>
                    <input type="date" value={sessionDate} min={sevenDaysAgoISO()} max={todayISO()} onChange={e => setSessionDate(e.target.value)} className={INPUT_CLS} />
                    <p className="text-[11px] text-muted-foreground mt-1">Pode registrar até 7 dias atrás</p>
                  </div>

                  <div>
                    <label className={LABEL_CLS}>O que aprendi? <span className="text-muted-foreground/60">(opcional)</span></label>
                    <textarea value={sessionNotes} onChange={e => setSessionNotes(e.target.value)} placeholder="Ex: Entendi como funciona o ciclo de vida dos componentes..." rows={3} className={cn(INPUT_CLS, "resize-none")} />
                  </div>

                  <div className="flex items-center gap-2 px-3.5 py-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                    <Star size={14} className="text-amber-500 flex-shrink-0" fill="currentColor" />
                    <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">Você vai ganhar ~{Math.round(15 + sessionHours * 10)} XP por esta sessão</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 mt-5">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleSaveSession} disabled={sessionHours <= 0} className="w-full py-3 rounded-2xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">Registrar sessão</motion.button>
                  <button onClick={() => setStep("detail")} className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-all">Cancelar</button>
                </div>
              </motion.div>
            )}

            {step === "session-success" && sessionResult && (
              <motion.div key="session-success" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.2 }} className="p-6">
                <div className="relative flex items-center justify-center mb-4">
                  {[...Array(8)].map((_, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0], x: Math.cos(i * 45 * (Math.PI / 180)) * 32, y: Math.sin(i * 45 * (Math.PI / 180)) * 32 }} transition={{ delay: 0.15 + i * 0.04, duration: 0.55 }} className="absolute w-1.5 h-1.5 rounded-full bg-amber-400" />
                  ))}
                  <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.06, type: "spring", stiffness: 420, damping: 22 }} className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                    {sessionResult.completed ? <Trophy size={30} className="text-amber-500" /> : <Star size={30} className="text-amber-500" fill="currentColor" />}
                  </motion.div>
                </div>
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl font-black text-center text-foreground mb-1">+{sessionResult.xp} XP</motion.p>
                <Dialog.Title className="text-base font-semibold text-foreground text-center mb-3">{sessionResult.completed ? "Estudo concluído! 🏆" : "Sessão registrada!"}</Dialog.Title>

                {sessionResult.milestones.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                    {sessionResult.milestones.map(m => (
                      <motion.span key={m} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className={cn("px-2.5 py-1 rounded-full text-[11px] font-semibold", m === 100 ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" : "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300")}>
                        {m === 25 ? "🎯 25% concluído" : m === 50 ? "🎯 Metade do caminho!" : m === 75 ? "🔥 Quase lá — 75%!" : "🏆 Conteúdo finalizado!"}
                      </motion.span>
                    ))}
                  </div>
                )}

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-muted rounded-2xl p-3.5 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className={cn("text-xs font-bold", sessionResult.levelAfter.color)}>Lv.{sessionResult.levelAfter.level}</span>
                      <span className="text-xs font-medium text-foreground">{sessionResult.levelAfter.title}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">{user.totalXP} XP</span>
                  </div>
                  <div className="h-1.5 bg-background rounded-full overflow-hidden mb-1.5">
                    <motion.div className="h-full bg-amber-500 rounded-full" initial={{ width: `${sessionResult.levelBefore.progress}%` }} animate={{ width: `${sessionResult.levelAfter.progress}%` }} transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }} />
                  </div>
                  {sessionResult.leveledUp ? (
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold text-center">🎊 Subiu de nível! {sessionResult.levelBefore.title} → {sessionResult.levelAfter.title}</p>
                  ) : sessionResult.levelAfter.next ? (
                    <p className="text-[11px] text-muted-foreground text-center">{sessionResult.levelAfter.nextXP - user.totalXP} XP para {sessionResult.levelAfter.next.title}</p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground text-center">Nível máximo atingido!</p>
                  )}
                </motion.div>

                <Dialog.Description className="sr-only">Sessão registrada com sucesso</Dialog.Description>
                <motion.button whileTap={{ scale: 0.97 }} onClick={onClose} className="w-full py-3 rounded-2xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all">Continuar estudando</motion.button>
              </motion.div>
            )}

            {step === "edit" && (
              <motion.div key="edit" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }} className="p-6">
                <button onClick={() => setStep("detail")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5">
                  <ArrowLeft size={15} />Voltar
                </button>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-muted mb-4"><Edit3 size={20} className="text-muted-foreground" /></div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-1">Editar estudo</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-5">Corrija as informações deste material</Dialog.Description>

                <div className="space-y-4">
                  <div>
                    <label className={LABEL_CLS}>Título *</label>
                    <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} className={INPUT_CLS} autoFocus />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Tipo de material</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.entries(STUDY_TYPE_CONFIG) as [StudyType, typeof STUDY_TYPE_CONFIG[StudyType]][]).map(([key, cfg]) => {
                        const Icon = cfg.icon; const sel = editType === key;
                        return (
                          <motion.button key={key} whileTap={{ scale: 0.93 }} onClick={() => setEditType(key)} className={cn("flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border text-xs font-medium transition-all", sel ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground hover:border-primary/30")}>
                            <Icon size={16} className={sel ? "text-primary" : cfg.color} />{cfg.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={LABEL_CLS}>Total de horas</label>
                      <input type="text" inputMode="numeric" pattern="[0-9]*" value={editTotalHours} onChange={e => setEditTotalHours(e.target.value.replace(/\D/g, ""))} placeholder="Ex: 120" className={INPUT_CLS} />
                    </div>
                    <div>
                      <label className={LABEL_CLS}>Prazo</label>
                      <input type="date" value={editDeadline} min={todayISO()} onChange={e => setEditDeadline(e.target.value)} className={INPUT_CLS} />
                    </div>
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Status atual</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["nao-iniciado", "em-andamento", "pausado", "concluido"] as const).map(s => {
                        const cfg = STUDY_STATUS_CONFIG[s]; const sel = editStatus === s;
                        return (
                          <motion.button key={s} whileTap={{ scale: 0.94 }} onClick={() => setEditStatus(s)} className={cn("flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all", sel ? cn(cfg.bg, cfg.color, "border-transparent") : "border-border bg-muted text-muted-foreground hover:border-primary/30")}>
                            <cfg.icon size={12} />{cfg.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Link do material <span className="text-muted-foreground/60">(opcional)</span></label>
                    <input type="url" value={editUrl} onChange={e => setEditUrl(e.target.value)} placeholder="https://..." className={INPUT_CLS} />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Anotações e referências <span className="text-muted-foreground/60">(opcional)</span></label>
                    <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} rows={3} className={cn(INPUT_CLS, "resize-none")} />
                  </div>
                  {(() => {
                    const activeGoals = goals.filter(g => g.status === "ativo");
                    if (activeGoals.length === 0) return null;
                    return (
                      <div>
                        <label className={LABEL_CLS}>Vincular a objetivo <span className="text-muted-foreground/60">(opcional)</span></label>
                        <div className="space-y-1.5">
                          {activeGoals.map(g => {
                            const cfg = CATEGORY_CONFIG[g.category]; const Icon = cfg.icon; const sel = editGoalId === g.id;
                            return (
                              <motion.button key={g.id} whileTap={{ scale: 0.97 }} onClick={() => setEditGoalId(sel ? "" : g.id)} className={cn("w-full flex items-center gap-2.5 px-3 py-2 rounded-xl border text-left transition-all", sel ? "border-primary/50 bg-primary/5" : "border-border bg-muted/40 hover:border-primary/20")}>
                                <span className={cn("flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium flex-shrink-0", cfg.bg, cfg.color)}><Icon size={9} />{cfg.label}</span>
                                <span className="flex-1 text-xs text-foreground truncate">{g.title}</span>
                                {sel && <CheckCircle2 size={13} className="text-primary flex-shrink-0" />}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="flex flex-col gap-2.5 mt-5">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleSaveEdit} disabled={editTitle.trim().length < 2} className="w-full py-3 rounded-2xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">Salvar alterações</motion.button>
                  <button onClick={() => setStep("detail")} className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-all">Cancelar</button>
                </div>
              </motion.div>
            )}

            {step === "confirm-discontinue" && (
              <motion.div key="confirm-discontinue" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }} className="p-6">
                <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground z-10" aria-label="Fechar"><X size={15} /></Dialog.Close>
                <motion.div initial={{ scale: 0.7, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.05, type: "spring", stiffness: 400, damping: 22 }} className="w-11 h-11 rounded-2xl flex items-center justify-center bg-amber-100 dark:bg-amber-900/40 mb-4">
                  <Archive size={20} className="text-amber-600 dark:text-amber-400" />
                </motion.div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-2 pr-8">Pausar este estudo?</Dialog.Title>
                <Dialog.Description asChild>
                  <div className="text-sm text-muted-foreground leading-relaxed mb-1.5">Pausar arquiva o material sem excluí-lo. Use quando um conteúdo <strong className="text-foreground">não está fazendo sentido</strong> para seus objetivos atuais.</div>
                </Dialog.Description>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">Você pode retomar a qualquer momento — o progresso de <strong className="text-foreground">{study.progressPercent}%</strong> e suas sessões serão preservados.</p>
                <div className="flex flex-col gap-2.5">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleDiscontinue} className="w-full py-3 rounded-2xl text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-all">Pausar estudo</motion.button>
                  <button onClick={() => setStep("detail")} className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-all">Manter ativo</button>
                </div>
              </motion.div>
            )}

            {step === "confirm-delete" && (
              <motion.div key="confirm-delete" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }} className="p-6">
                <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground z-10" aria-label="Fechar"><X size={15} /></Dialog.Close>
                <motion.div initial={{ scale: 0.7, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.05, type: "spring", stiffness: 400, damping: 22 }} className="w-11 h-11 rounded-2xl flex items-center justify-center bg-red-100 dark:bg-red-900/30 mb-4">
                  <Trash2 size={20} className="text-red-600 dark:text-red-400" />
                </motion.div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-2 pr-8">Excluir este estudo?</Dialog.Title>
                <Dialog.Description asChild>
                  <div className="text-sm text-muted-foreground leading-relaxed mb-5">Esta ação <strong className="text-foreground">não pode ser desfeita.</strong> Todo o seu histórico de sessões e o progresso de <strong className="text-foreground">{study.progressPercent}%</strong> serão perdidos permanentemente.</div>
                </Dialog.Description>
                <div className="flex flex-col gap-2.5">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleDelete} className="w-full py-3 rounded-2xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-all">Excluir definitivamente</motion.button>
                  <button onClick={() => setStep("detail")} className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-all">Cancelar</button>
                  {study.status !== "descontinuado" && study.status !== "concluido" && (
                    <button onClick={() => setStep("confirm-discontinue")} className="w-full py-2 text-xs text-amber-600 dark:text-amber-400 font-medium hover:underline transition-all">Prefiro só pausar (mantém histórico)</button>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
