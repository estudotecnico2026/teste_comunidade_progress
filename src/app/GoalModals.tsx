import React, { useState, useEffect } from "react";
import {
  Target, Plus, CheckCircle2, Circle, ArrowLeft, X, Zap, BookOpen,
  Edit3, Trash2, PauseCircle, RotateCcw, Share2, Trophy, ChevronRight,
} from "lucide-react";
import { StudyDetailModal as StudyDetailModalInline } from "./StudyModals";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./components/ui/utils";
import { useData } from "./contexts";
import { useModal } from "./contexts";
import type { GoalCategory, GoalTask, Study } from "./types";
import {
  INIT_USER, CATEGORY_TASK_TEMPLATES,
  CATEGORY_CONFIG, STUDY_TYPE_CONFIG, STUDY_STATUS_CONFIG,
  todayISO, daysLeft, getGoalStats,
} from "./data";

// ─── Shared atoms ─────────────────────────────────────────────────────────────
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

// ─── StudyCreateModal (nested in GoalCreateModal) ─────────────────────────────
function StudyCreateModalNested({ open, onClose, onAdd }: {
  open: boolean;
  onClose: () => void;
  onAdd: (s: Study) => void;
}) {
  const { goals } = useData();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<import("./types").StudyType>("curso");
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
      userId: INIT_USER.uid,
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
                      {(Object.entries(STUDY_TYPE_CONFIG) as [import("./types").StudyType, typeof STUDY_TYPE_CONFIG[import("./types").StudyType]][]).map(([key, cfg]) => {
                        const Icon = cfg.icon;
                        const sel = type === key;
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
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Anotações <span className="text-muted-foreground/60">(opcional)</span></label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className={cn(INPUT_CLS, "resize-none")} />
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
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubmit} disabled={!canSubmit} className={cn("w-full py-3 rounded-2xl text-sm font-semibold transition-all", canSubmit ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed")}>
                    Adicionar material
                  </motion.button>
                  <button onClick={handleClose} className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-all">Cancelar</button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="p-6 text-center">
                <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.08, type: "spring", stiffness: 420, damping: 22 }} className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={28} className="text-blue-600 dark:text-blue-400" />
                </motion.div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-2">Material adicionado!</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-4"><strong className="text-foreground">{title}</strong> está na sua lista{linkedGoalId ? " e vinculado ao objetivo" : ""}.</Dialog.Description>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleClose} className="w-full py-3 rounded-2xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all">Ver meus estudos</motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── GoalCreateModal ──────────────────────────────────────────────────────────
export function GoalCreateModal({ open, onClose }: {
  open: boolean;
  onClose: () => void;
}) {
  const { studies, addGoal, addStudy, updateStudy, updateUser, user } = useData();
  const [title, setTitle]       = useState("");
  const [category, setCategory] = useState<GoalCategory>("carreira");
  const [targetDate, setTargetDate] = useState("");
  const [step, setStep]         = useState<"form" | "link" | "success">("form");
  const [newGoalId, setNewGoalId] = useState("");

  const [selectedTaskTitles, setSelectedTaskTitles] = useState<string[]>([]);
  const [customTaskInput, setCustomTaskInput]       = useState("");
  const [selectedStudyIds, setSelectedStudyIds]     = useState<string[]>([]);
  const [showNestedStudyCreate, setShowNestedStudyCreate] = useState(false);

  const linkableStudies = studies.filter(s => !s.goalId && s.status !== "descontinuado");
  const canSubmit = title.trim().length > 2 && targetDate !== "";
  const linkXP = selectedStudyIds.length >= 2 ? 50 : selectedStudyIds.length === 1 ? 25 : 0;
  const templates = CATEGORY_TASK_TEMPLATES[category];

  const handleFormSubmit = () => {
    if (!canSubmit) return;
    setNewGoalId(`g${Date.now()}`);
    setSelectedTaskTitles([]);
    setCustomTaskInput("");
    setStep("link");
  };

  const toggleTemplate = (t: string) =>
    setSelectedTaskTitles(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const addCustomTask = () => {
    const v = customTaskInput.trim();
    if (!v || selectedTaskTitles.includes(v)) return;
    setSelectedTaskTitles(prev => [...prev, v]);
    setCustomTaskInput("");
  };

  const buildTasks = (): GoalTask[] =>
    selectedTaskTitles.map((t, i) => ({ id: `task-${Date.now()}-${i}`, title: t, completed: false }));

  const handleFinish = () => {
    const today = todayISO();
    addGoal({
      id: newGoalId,
      userId: INIT_USER.uid,
      title: title.trim(),
      category,
      targetDate,
      progress: 0,
      status: "ativo",
      studiesLinked: selectedStudyIds.length,
      createdAt: today,
      updatedAt: today,
      tasks: buildTasks(),
    });
    selectedStudyIds.forEach(sid => updateStudy(sid, { goalId: newGoalId }));
    if (selectedStudyIds.length > 0) {
      updateUser({ totalXP: user.totalXP + linkXP });
    }
    setStep("success");
  };

  const toggleStudy = (id: string) => {
    setSelectedStudyIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleClose = () => {
    setTitle(""); setCategory("carreira"); setTargetDate("");
    setStep("form"); setNewGoalId(""); setSelectedStudyIds([]);
    setSelectedTaskTitles([]); setCustomTaskInput("");
    setShowNestedStudyCreate(false);
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-32px)] max-w-[380px] -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-3xl shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200 overflow-hidden max-h-[90vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === "form" && (
              <motion.div key="form" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }} className="p-6">
                <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground z-10" aria-label="Fechar">
                  <X size={15} />
                </Dialog.Close>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-violet-100 dark:bg-violet-900/40 mb-4">
                  <Target size={20} className="text-violet-600 dark:text-violet-400" />
                </div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-1">Novo objetivo</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-5">Defina onde você quer chegar na sua jornada</Dialog.Description>
                <div className="space-y-4">
                  <div>
                    <label className={LABEL_CLS}>Título do objetivo *</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Tornar-me desenvolvedora Full Stack" className={INPUT_CLS} autoFocus />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Categoria</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(Object.entries(CATEGORY_CONFIG) as [GoalCategory, typeof CATEGORY_CONFIG[GoalCategory]][]).map(([key, cfg]) => {
                        const Icon = cfg.icon; const sel = category === key;
                        return (
                          <motion.button key={key} whileTap={{ scale: 0.94 }} onClick={() => setCategory(key)} className={cn("flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all", sel ? cn(cfg.bg, cfg.color, "border-transparent") : "border-border bg-muted text-muted-foreground hover:border-primary/30")}>
                            <Icon size={13} />{cfg.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Data alvo *</label>
                    <input type="date" value={targetDate} min={todayISO()} onChange={e => setTargetDate(e.target.value)} className={INPUT_CLS} />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 mt-5">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleFormSubmit} disabled={!canSubmit} className={cn("w-full py-3 rounded-2xl text-sm font-semibold transition-all", canSubmit ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed")}>
                    Próximo: vincular estudos
                  </motion.button>
                  <button onClick={handleClose} className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-all">Cancelar</button>
                </div>
              </motion.div>
            )}
            {step === "link" && (
              <motion.div key="link" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }} className="p-6">
                <button onClick={() => setStep("form")} className="absolute left-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground" aria-label="Voltar">
                  <ArrowLeft size={15} />
                </button>
                <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground z-10" aria-label="Fechar">
                  <X size={15} />
                </Dialog.Close>
                <Dialog.Title className="text-base font-semibold text-foreground mb-1 mt-2">Vincular estudos</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-4">Conecte estudos existentes e defina as atividades do objetivo</Dialog.Description>

                <div className="mb-5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Atividades do objetivo</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {templates.map(t => {
                      const sel = selectedTaskTitles.includes(t);
                      return (
                        <motion.button key={t} whileTap={{ scale: 0.95 }} onClick={() => toggleTemplate(t)} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all", sel ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground hover:border-primary/30")}>
                          {sel ? <CheckCircle2 size={11} /> : <Circle size={11} />}{t}
                        </motion.button>
                      );
                    })}
                  </div>
                  <div className="flex gap-2 mb-2">
                    <input type="text" value={customTaskInput} onChange={e => setCustomTaskInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addCustomTask()} placeholder="Adicionar atividade personalizada…" className={cn(INPUT_CLS, "flex-1 text-xs")} />
                    <motion.button whileTap={{ scale: 0.94 }} onClick={addCustomTask} disabled={!customTaskInput.trim()} className="px-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-40 transition-all flex items-center">
                      <Plus size={15} />
                    </motion.button>
                  </div>
                  {selectedTaskTitles.filter(t => !templates.includes(t)).length > 0 && (
                    <div className="mb-2 space-y-1">
                      {selectedTaskTitles.filter(t => !templates.includes(t)).map(t => (
                        <div key={t} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/5 border border-primary/20">
                          <CheckCircle2 size={11} className="text-primary flex-shrink-0" />
                          <span className="flex-1 text-xs text-foreground">{t}</span>
                          <button onClick={() => setSelectedTaskTitles(prev => prev.filter(x => x !== t))} className="text-muted-foreground hover:text-red-500 transition-colors"><X size={12} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  {selectedTaskTitles.length > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40">
                      <CheckCircle2 size={12} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-xs font-medium text-green-700 dark:text-green-300">{selectedTaskTitles.length} atividade{selectedTaskTitles.length !== 1 ? "s" : ""} selecionada{selectedTaskTitles.length !== 1 ? "s" : ""}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Estudos vinculados</p>
                <AnimatePresence>
                  {linkXP > 0 && (
                    <motion.div key="xp-hint" initial={{ opacity: 0, y: -4, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -4, height: 0 }} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 mb-4 overflow-hidden">
                      <Zap size={13} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">+{linkXP} XP por vincular {selectedStudyIds.length} estudo{selectedStudyIds.length !== 1 ? "s" : ""}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {linkableStudies.length === 0 ? (
                  <div className="py-5 text-center">
                    <BookOpen size={26} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground leading-relaxed">Nenhum estudo disponível para vincular.</p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">Crie um novo estudo abaixo.</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1 mb-3">
                    {linkableStudies.map(s => {
                      const tCfg = STUDY_TYPE_CONFIG[s.type]; const TIcon = tCfg.icon; const sel = selectedStudyIds.includes(s.id);
                      return (
                        <motion.button key={s.id} whileTap={{ scale: 0.97 }} onClick={() => toggleStudy(s.id)} className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all", sel ? "border-primary/50 bg-primary/5" : "border-border bg-muted/40 hover:border-border/60")}>
                          <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", sel ? "bg-primary/10" : "bg-muted")}>
                            <TIcon size={13} className={sel ? "text-primary" : tCfg.color} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{s.title}</p>
                            <p className="text-[10px] text-muted-foreground">{s.area} · {s.progressPercent}%</p>
                          </div>
                          <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all", sel ? "border-primary bg-primary" : "border-muted-foreground/40")}>
                            {sel && <CheckCircle2 size={11} className="text-white" />}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                <motion.button whileTap={{ scale: 0.96 }} onClick={() => setShowNestedStudyCreate(true)} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-primary/40 text-sm font-medium text-primary hover:bg-primary/5 transition-all mb-3">
                  <Plus size={14} />Criar novo estudo e vincular
                </motion.button>

                <motion.button whileTap={{ scale: 0.97 }} onClick={handleFinish} className="w-full py-3 rounded-2xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all">
                  {selectedStudyIds.length > 0 ? `Vincular ${selectedStudyIds.length} estudo${selectedStudyIds.length !== 1 ? "s" : ""} e criar objetivo` : "Criar objetivo sem vincular"}
                </motion.button>

                <StudyCreateModalNested
                  open={showNestedStudyCreate}
                  onClose={() => setShowNestedStudyCreate(false)}
                  onAdd={(s) => { addStudy(s); setSelectedStudyIds(prev => [...prev, s.id]); setShowNestedStudyCreate(false); }}
                />
              </motion.div>
            )}
            {step === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="p-6 text-center">
                <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.08, type: "spring", stiffness: 420, damping: 22 }} className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={28} className="text-green-600 dark:text-green-400" />
                </motion.div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-2">Objetivo criado!</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-4">
                  <strong className="text-foreground">{title}</strong> foi criado
                  {selectedTaskTitles.length > 0 ? ` com ${selectedTaskTitles.length} atividade${selectedTaskTitles.length !== 1 ? "s" : ""}` : ""}
                  {selectedStudyIds.length > 0 ? ` e ${selectedStudyIds.length} estudo${selectedStudyIds.length !== 1 ? "s" : ""} vinculado${selectedStudyIds.length !== 1 ? "s" : ""}` : ""}.
                </Dialog.Description>
                {selectedStudyIds.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 mb-4">
                    <Zap size={14} className="text-amber-600 dark:text-amber-400" />
                    <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">+{linkXP} XP ganhos!</span>
                  </motion.div>
                )}
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleClose} className="w-full py-3 rounded-2xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all">Ver meus objetivos</motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── GoalDetailModal ──────────────────────────────────────────────────────────
type GoalDetailStep = "detail" | "edit" | "confirm-pause" | "confirm-delete";

export function GoalDetailModal({ open, onClose, goalId }: {
  open: boolean;
  onClose: () => void;
  goalId: string | null;
}) {
  const { goals, studies, updateGoal, deleteGoal, pauseGoalCascade, resumeGoalCascade } = useData();
  const { openModal } = useModal();
  const goal = goals.find(g => g.id === goalId) ?? null;

  const [step, setStep] = useState<GoalDetailStep>("detail");
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState<GoalCategory>("carreira");
  const [editTargetDate, setEditTargetDate] = useState("");
  const [linkedStudyToView, setLinkedStudyToView] = useState<string | null>(null);

  useEffect(() => {
    if (open && goal) {
      setStep("detail");
      setEditTitle(goal.title);
      setEditCategory(goal.category);
      setEditTargetDate(goal.targetDate);
    }
  }, [open, goalId]);

  if (!goal) return null;

  const cat = CATEGORY_CONFIG[goal.category];
  const CatIcon = cat.icon;
  const stats = getGoalStats(goal, studies);
  const dl = goal.status !== "concluido" ? daysLeft(goal.targetDate) : null;
  const isPaused = goal.status === "pausado";
  const isCompleted = goal.status === "concluido";
  const canEdit = !isCompleted;
  const studiesWillPause = stats.linked.filter(s => s.status === "em-andamento").length;
  const studiesWillRestore = stats.linked.filter(s => s.statusBeforeGoalPause !== undefined).length;

  const handleSaveEdit = () => {
    updateGoal(goal.id, {
      title: editTitle.trim() || goal.title,
      category: editCategory,
      targetDate: editTargetDate || goal.targetDate,
      updatedAt: todayISO(),
    });
    setStep("detail");
  };

  const handlePause = () => { pauseGoalCascade(goal.id); onClose(); };
  const handleResume = () => { resumeGoalCascade(goal.id); onClose(); };
  const handleDelete = () => { deleteGoal(goal.id); onClose(); };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-32px)] max-w-[400px] -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-3xl shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200 overflow-hidden max-h-[88vh] overflow-y-auto">
          <AnimatePresence mode="wait">

            {step === "detail" && (
              <motion.div key="detail" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }} className="p-6">
                <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground z-10" aria-label="Fechar">
                  <X size={15} />
                </Dialog.Close>
                <div className="flex items-start gap-3.5 mb-4 pr-8">
                  <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0", cat.bg)}>
                    <CatIcon size={20} className={cat.color} />
                  </div>
                  <div className="min-w-0">
                    <Dialog.Title className="font-semibold text-foreground leading-snug text-sm">{goal.title}</Dialog.Title>
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <span className={cn("flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium", cat.bg, cat.color)}><CatIcon size={9} />{cat.label}</span>
                      <span className={cn("px-2 py-0.5 rounded-md text-[11px] font-medium", goal.status === "ativo" ? "text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/40" : goal.status === "pausado" ? "text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/40" : "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/40")}>
                        {goal.status === "ativo" ? "Ativo" : goal.status === "pausado" ? "Pausado" : "Concluído"}
                      </span>
                    </div>
                  </div>
                </div>
                <Dialog.Description className="sr-only">Detalhes e ações do objetivo {goal.title}</Dialog.Description>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-muted-foreground">Progresso geral</span>
                    <span className="text-xs font-bold text-foreground">{stats.progress}%</span>
                  </div>
                  <ProgressBar value={stats.progress} />
                  {stats.linkedCount > 0 && <p className="text-[10px] text-muted-foreground mt-1">Média do progresso dos estudos vinculados</p>}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-muted/60 rounded-xl p-2.5 text-center">
                    <p className="text-xs font-bold text-foreground">{stats.linkedCount}</p>
                    <p className="text-[10px] text-muted-foreground">estudo{stats.linkedCount !== 1 ? "s" : ""}</p>
                  </div>
                  <div className="bg-muted/60 rounded-xl p-2.5 text-center">
                    <p className="text-xs font-bold text-foreground">{stats.totalHours}h</p>
                    <p className="text-[10px] text-muted-foreground">estudadas</p>
                  </div>
                  <div className="bg-muted/60 rounded-xl p-2.5 text-center">
                    {dl !== null ? (
                      <>
                        <p className={cn("text-xs font-bold", dl < 0 ? "text-red-500" : dl <= 30 ? "text-amber-500" : "text-foreground")}>{dl < 0 ? `${Math.abs(dl)}d` : `${dl}d`}</p>
                        <p className="text-[10px] text-muted-foreground">{dl < 0 ? "vencido" : "restantes"}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs font-bold text-green-600 dark:text-green-400">✓</p>
                        <p className="text-[10px] text-muted-foreground">concluído</p>
                      </>
                    )}
                  </div>
                </div>

                {isPaused && studiesWillRestore > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-800/30 mb-4">
                    <PauseCircle size={13} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <p className="text-xs text-amber-700 dark:text-amber-300"><strong>{studiesWillRestore} estudo{studiesWillRestore !== 1 ? "s" : ""}</strong> pausado{studiesWillRestore !== 1 ? "s" : ""} junto com este objetivo — retomam ao retomar o objetivo.</p>
                  </div>
                )}

                {stats.totalXP > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-800/30 mb-4">
                    <Zap size={13} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">{stats.totalXP} XP acumulados</p>
                      <p className="text-[10px] text-muted-foreground">{stats.totalHours}h de estudo neste objetivo</p>
                    </div>
                  </div>
                )}

                {isCompleted && (
                  <motion.button initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.97 }}
                    onClick={() => openModal({
                      variant: "success",
                      title: "Compartilhar objetivo concluído",
                      body: (
                        <div className="space-y-3">
                          <p>Inspire a comunidade compartilhando esta conquista! Outros profissionais em transição de carreira podem se beneficiar da sua trilha.</p>
                          <div className="p-3 rounded-xl bg-muted/60 border border-border">
                            <div className="flex items-center gap-2 mb-1.5">
                              <Trophy size={13} className="text-amber-500 flex-shrink-0" />
                              <p className="text-xs font-semibold text-foreground">{goal.title}</p>
                            </div>
                            <p className="text-[11px] text-muted-foreground">{stats.totalHours}h estudadas · {stats.linkedCount} material{stats.linkedCount !== 1 ? "is" : ""} · {stats.totalXP > 0 ? `${stats.totalXP} XP` : "100% concluído"}</p>
                          </div>
                        </div>
                      ),
                      primaryLabel: "Publicar no fórum",
                      primaryAction: () => openModal({ variant: "success", title: "Conquista publicada! 🎉", body: "Seu objetivo concluído foi publicado na comunidade.", primaryLabel: "Ótimo!" }),
                      secondaryLabel: "Agora não",
                    })}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/40 text-sm font-medium text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-all mb-4"
                  >
                    <Share2 size={14} />Compartilhar no fórum da comunidade
                  </motion.button>
                )}

                {goal.tasks && goal.tasks.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-muted-foreground">Atividades</p>
                      <span className="text-[10px] text-muted-foreground">{goal.tasks.filter(t => t.completed).length}/{goal.tasks.length} concluídas</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden mb-2.5">
                      <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} animate={{ width: `${goal.tasks.length > 0 ? (goal.tasks.filter(t => t.completed).length / goal.tasks.length) * 100 : 0}%` }} transition={{ duration: 0.5 }} />
                    </div>
                    <div className="space-y-1.5">
                      {goal.tasks.map(task => (
                        <motion.button key={task.id} whileTap={{ scale: 0.97 }}
                          onClick={() => { const updatedTasks = goal.tasks!.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t); updateGoal(goal.id, { tasks: updatedTasks, updatedAt: todayISO() }); }}
                          className={cn("w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all", task.completed ? "bg-green-50 dark:bg-green-900/15 border border-green-200/60 dark:border-green-800/30" : "bg-muted/50 hover:bg-muted border border-transparent")}
                        >
                          <div className={cn("w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all", task.completed ? "border-green-500 bg-green-500" : "border-muted-foreground/40")}>
                            {task.completed && <CheckCircle2 size={10} className="text-white" />}
                          </div>
                          <span className={cn("text-xs font-medium flex-1", task.completed ? "line-through text-muted-foreground" : "text-foreground")}>{task.title}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {stats.linked.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Estudos vinculados</p>
                    <div className="space-y-1.5">
                      {stats.linked.map(s => {
                        const tCfg = STUDY_TYPE_CONFIG[s.type]; const sCfg = STUDY_STATUS_CONFIG[s.status]; const TIcon = tCfg.icon;
                        const sXP = (s.sessions ?? []).reduce((sum, se) => sum + se.xpEarned, 0);
                        return (
                          <motion.button key={s.id} whileTap={{ scale: 0.97 }} onClick={() => setLinkedStudyToView(s.id)}
                            className={cn("w-full flex items-center gap-2 py-2.5 px-3 rounded-xl text-left transition-all hover:shadow-sm", s.statusBeforeGoalPause ? "bg-amber-50/70 dark:bg-amber-900/10 border border-amber-200/60 dark:border-amber-800/30 hover:bg-amber-100/60 dark:hover:bg-amber-900/20" : "bg-muted/50 hover:bg-muted")}
                          >
                            <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center flex-shrink-0"><TIcon size={12} className={tCfg.color} /></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-foreground truncate font-medium">{s.title}</p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="flex-1 h-1 bg-background rounded-full overflow-hidden"><div className="h-full bg-primary/50 rounded-full" style={{ width: `${s.progressPercent}%` }} /></div>
                                <span className="text-[10px] text-muted-foreground flex-shrink-0">{s.progressPercent}%</span>
                              </div>
                            </div>
                            {sXP > 0 && <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 flex-shrink-0 flex items-center gap-0.5"><Zap size={8} />{sXP}xp</span>}
                            <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded flex-shrink-0", sCfg.bg, sCfg.color)}>{sCfg.label}</span>
                            <ChevronRight size={12} className="text-muted-foreground/50 flex-shrink-0" />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="space-y-2.5">
                  {isPaused && (
                    <div>
                      <motion.button whileTap={{ scale: 0.97 }} onClick={handleResume} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all">
                        <RotateCcw size={15} />Retomar objetivo
                      </motion.button>
                      {studiesWillRestore > 0 && <p className="text-[10px] text-muted-foreground text-center mt-1.5">Retoma também {studiesWillRestore} estudo{studiesWillRestore !== 1 ? "s" : ""} pausado{studiesWillRestore !== 1 ? "s" : ""} junto com o objetivo</p>}
                    </div>
                  )}
                  <div className="flex gap-2">
                    {canEdit && (
                      <motion.button whileTap={{ scale: 0.96 }} onClick={() => setStep("edit")} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-medium hover:bg-secondary transition-colors">
                        <Edit3 size={14} />Editar
                      </motion.button>
                    )}
                    {!isPaused && !isCompleted && (
                      <motion.button whileTap={{ scale: 0.96 }} onClick={() => setStep("confirm-pause")} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                        <PauseCircle size={14} />Pausar
                      </motion.button>
                    )}
                    <motion.button whileTap={{ scale: 0.96 }} onClick={() => setStep("confirm-delete")} className="w-11 flex items-center justify-center py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors" aria-label="Excluir objetivo">
                      <Trash2 size={15} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "edit" && (
              <motion.div key="edit" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }} className="p-6">
                <button onClick={() => setStep("detail")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5">
                  <ArrowLeft size={15} />Voltar
                </button>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-muted mb-4"><Edit3 size={20} className="text-muted-foreground" /></div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-1">Editar objetivo</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-5">Atualize as informações deste objetivo</Dialog.Description>
                <div className="space-y-4">
                  <div>
                    <label className={LABEL_CLS}>Título *</label>
                    <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} className={INPUT_CLS} autoFocus />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Categoria</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(Object.entries(CATEGORY_CONFIG) as [GoalCategory, typeof CATEGORY_CONFIG[GoalCategory]][]).map(([key, cfg]) => {
                        const Icon = cfg.icon; const sel = editCategory === key;
                        return (
                          <motion.button key={key} whileTap={{ scale: 0.94 }} onClick={() => setEditCategory(key)} className={cn("flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all", sel ? cn(cfg.bg, cfg.color, "border-transparent") : "border-border bg-muted text-muted-foreground hover:border-primary/30")}>
                            <Icon size={13} />{cfg.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Data alvo *</label>
                    <input type="date" value={editTargetDate} onChange={e => setEditTargetDate(e.target.value)} className={INPUT_CLS} />
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 mt-5">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleSaveEdit} disabled={editTitle.trim().length < 2} className="w-full py-3 rounded-2xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">Salvar alterações</motion.button>
                  <button onClick={() => setStep("detail")} className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-all">Cancelar</button>
                </div>
              </motion.div>
            )}

            {step === "confirm-pause" && (
              <motion.div key="confirm-pause" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }} className="p-6">
                <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground z-10" aria-label="Fechar"><X size={15} /></Dialog.Close>
                <motion.div initial={{ scale: 0.7, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.05, type: "spring", stiffness: 400, damping: 22 }} className="w-11 h-11 rounded-2xl flex items-center justify-center bg-amber-100 dark:bg-amber-900/40 mb-4">
                  <PauseCircle size={20} className="text-amber-600 dark:text-amber-400" />
                </motion.div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-2 pr-8">Pausar este objetivo?</Dialog.Title>
                <Dialog.Description asChild>
                  <div className="text-sm text-muted-foreground leading-relaxed mb-1.5">Pausar arquiva o objetivo sem excluí-lo. Use quando precisar <strong className="text-foreground">reorganizar suas prioridades</strong>.</div>
                </Dialog.Description>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">O progresso de <strong className="text-foreground">{stats.progress}%</strong> será preservado.</p>
                {studiesWillPause > 0 && (
                  <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl px-3.5 py-3 mb-5">
                    <PauseCircle size={14} className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed"><strong>{studiesWillPause} estudo{studiesWillPause !== 1 ? "s" : ""} em andamento</strong> será{studiesWillPause !== 1 ? "ão" : ""} pausado{studiesWillPause !== 1 ? "s" : ""} automaticamente e retornam ao andamento ao retomar o objetivo.</p>
                  </div>
                )}
                {studiesWillPause === 0 && <div className="mb-5" />}
                <div className="flex flex-col gap-2.5">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handlePause} className="w-full py-3 rounded-2xl text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-all">Pausar objetivo</motion.button>
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
                <Dialog.Title className="text-base font-semibold text-foreground mb-2 pr-8">Excluir este objetivo?</Dialog.Title>
                <Dialog.Description asChild>
                  <div className="text-sm text-muted-foreground leading-relaxed mb-5">Esta ação <strong className="text-foreground">não pode ser desfeita.</strong> O objetivo e todo o progresso de <strong className="text-foreground">{stats.progress}%</strong> serão removidos permanentemente.</div>
                </Dialog.Description>
                <div className="flex flex-col gap-2.5">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handleDelete} className="w-full py-3 rounded-2xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-all">Excluir definitivamente</motion.button>
                  <button onClick={() => setStep("detail")} className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-all">Cancelar</button>
                  {!isPaused && !isCompleted && (
                    <button onClick={() => setStep("confirm-pause")} className="w-full py-2 text-xs text-amber-600 dark:text-amber-400 font-medium hover:underline transition-all">Prefiro só pausar (mantém histórico)</button>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
      <StudyDetailModalInline
        open={!!linkedStudyToView}
        onClose={() => setLinkedStudyToView(null)}
        studyId={linkedStudyToView}
        initialStep="detail"
      />
    </Dialog.Root>
  );
}
