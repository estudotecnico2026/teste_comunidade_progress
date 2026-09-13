import React, { useState, useEffect } from "react";
import {
  X, Edit3, CheckCircle2, Settings, Bell, Shield, Users, Globe,
  Wifi, Sun, Moon, LogOut, Trash2, ChevronRight, Target, BookOpen,
  Zap, AlertTriangle, ArrowLeft, PauseCircle, Archive,
  Plus, ThumbsUp, MessageCircle, ChevronDown, Clock,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./components/ui/utils";
import { Switch } from "./components/ui/switch";
import { useData, useModal } from "./contexts";
import type { UserProfile, AppSettings } from "./types";
import { PRIVACY_SECTIONS, POST_TYPE_CONFIG, BADGE_CONFIG, COMMUNITY_LEADERBOARD, computeLevel, formatDate } from "./data";
import type { BadgeId } from "./types";

const INPUT_CLS = "w-full px-3.5 py-2.5 rounded-xl bg-input-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all";
const LABEL_CLS = "text-xs font-medium text-muted-foreground mb-1.5 block";

const listContainer = { animate: { transition: { staggerChildren: 0.055 } } };
const listItem      = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" as const } } };
const statsContainer = { animate: { transition: { staggerChildren: 0.08 } } };
const statCard       = { initial: { opacity: 0, scale: 0.88 }, animate: { opacity: 1, scale: 1, transition: { duration: 0.22, ease: "easeOut" as const } } };

// ─── Constants ────────────────────────────────────────────────────────────────
const REMINDER_TIMES = ["06:00", "08:00", "12:00", "18:00", "20:00", "22:00"];
const DAILY_GOALS = [
  { value: 0.5, label: "30 min" },
  { value: 1,   label: "1 hora" },
  { value: 2,   label: "2 horas" },
  { value: 3,   label: "3h+" },
];

// ─── ProfileEditModal ─────────────────────────────────────────────────────────
export function ProfileEditModal({ open, onClose, user, onSave }: {
  open: boolean;
  onClose: () => void;
  user: UserProfile;
  onSave: (name: string, avatarUrl: string | undefined) => void;
}) {
  const [name, setName]           = useState(user.name);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(user.avatarUrl);
  const [step, setStep]           = useState<"form" | "success">("form");
  const fileInputRef              = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) { setName(user.name); setAvatarUrl(user.avatarUrl); setStep("form"); }
  }, [open, user.name, user.avatarUrl]);

  const initials = name.trim().split(" ").filter(Boolean).map(w => w[0].toUpperCase()).slice(0, 2).join("") || "??";
  const canSave  = name.trim().length > 0 && (name.trim() !== user.name || avatarUrl !== user.avatarUrl);
  const handleClose = () => { setStep("form"); onClose(); };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setAvatarUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-32px)] max-w-[360px] -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-3xl shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200 overflow-hidden">
          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.div key="form" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }} className="p-6">
                <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground z-10" aria-label="Fechar">
                  <X size={15} />
                </Dialog.Close>

                <div className="flex flex-col items-center mb-5">
                  <div className="relative mb-3">
                    <motion.div
                      key={initials}
                      initial={{ scale: 0.85, opacity: 0.7 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.15 }}
                      className="w-20 h-20 rounded-3xl overflow-hidden"
                    >
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-2xl font-bold select-none">
                          {initials}
                        </div>
                      )}
                    </motion.div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:opacity-90 transition-opacity"
                      aria-label="Alterar foto"
                    >
                      <Edit3 size={12} />
                    </button>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => fileInputRef.current?.click()} className="text-xs text-primary font-medium hover:underline underline-offset-2 transition-colors">
                      {avatarUrl ? "Trocar foto" : "Adicionar foto"}
                    </button>
                    {avatarUrl && (
                      <>
                        <span className="text-muted-foreground/40 text-xs">·</span>
                        <button onClick={() => setAvatarUrl(undefined)} className="text-xs text-muted-foreground hover:text-red-500 transition-colors">Remover</button>
                      </>
                    )}
                  </div>
                  {!avatarUrl && <p className="text-[11px] text-muted-foreground/60 mt-1">Opcional — as iniciais são usadas por padrão</p>}
                </div>

                <Dialog.Title className="text-base font-semibold text-foreground text-center mb-1">Editar perfil</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground text-center mb-5">Seu nome aparece em toda a sua jornada</Dialog.Description>

                <div>
                  <label className={LABEL_CLS}>Nome completo</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" className={INPUT_CLS} autoFocus />
                </div>

                <div className="flex flex-col gap-2.5 mt-5">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={() => { onSave(name.trim(), avatarUrl); setStep("success"); }} disabled={!canSave} className={cn("w-full py-3 rounded-2xl text-sm font-semibold transition-all", canSave ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed")}>
                    Salvar alterações
                  </motion.button>
                  <button onClick={handleClose} className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-all">Cancelar</button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="p-6 text-center">
                <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.08, type: "spring", stiffness: 420, damping: 22 }} className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={28} className="text-green-600 dark:text-green-400" />
                </motion.div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-2">Perfil atualizado!</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-5">
                  Olá, <strong className="text-foreground">{name.trim()}</strong>! Suas informações estão salvas.
                </Dialog.Description>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleClose} className="w-full py-3 rounded-2xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all">Ótimo!</motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── SettingsModal ────────────────────────────────────────────────────────────
export function SettingsModal({ open, onClose, settings, onSave }: {
  open: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSave: (s: AppSettings) => void;
}) {
  const [local, setLocal] = useState({ ...settings });

  useEffect(() => {
    if (open) setLocal({ ...settings });
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-32px)] max-w-[380px] -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-3xl shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200 overflow-hidden">
          <div className="p-6">
            <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground z-10" aria-label="Fechar">
              <X size={15} />
            </Dialog.Close>
            <div className="w-11 h-11 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Settings size={20} className="text-muted-foreground" />
            </div>
            <Dialog.Title className="text-base font-semibold text-foreground mb-1">Preferências</Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground mb-5">Configure o app para funcionar do seu jeito</Dialog.Description>

            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">Lembretes de estudo</p>
                    <p className="text-xs text-muted-foreground">Notificação diária para manter o streak</p>
                  </div>
                  <Switch checked={local.reminderEnabled} onCheckedChange={v => setLocal(s => ({ ...s, reminderEnabled: v }))} />
                </div>
                <AnimatePresence>
                  {local.reminderEnabled && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22, ease: "easeOut" }} className="overflow-hidden">
                      <label className="text-xs text-muted-foreground mb-2 block mt-1">Horário preferido</label>
                      <div className="flex gap-2 flex-wrap">
                        {REMINDER_TIMES.map(time => (
                          <motion.button key={time} whileTap={{ scale: 0.93 }} onClick={() => setLocal(s => ({ ...s, reminderTime: time }))} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all", local.reminderTime === time ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary")}>
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-0.5">Meta diária</p>
                <p className="text-xs text-muted-foreground mb-3">Quanto você quer estudar por dia</p>
                <div className="grid grid-cols-4 gap-2">
                  {DAILY_GOALS.map(g => (
                    <motion.button key={g.value} whileTap={{ scale: 0.93 }} onClick={() => setLocal(s => ({ ...s, dailyGoalHours: g.value }))} className={cn("py-2 rounded-xl text-xs font-medium transition-all", local.dailyGoalHours === g.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary")}>
                      {g.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mt-5">
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => { onSave(local); onClose(); }} className="w-full py-3 rounded-2xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all">
                Salvar preferências
              </motion.button>
              <button onClick={onClose} className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-all">Cancelar</button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── PrivacyModal ─────────────────────────────────────────────────────────────
export function PrivacyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab]   = useState<"termos" | "privacidade">("termos");
  const scrollRef       = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) { setTab("termos"); scrollRef.current?.scrollTo({ top: 0 }); }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  const sections = PRIVACY_SECTIONS[tab];

  return (
    <Dialog.Root open={open} onOpenChange={o => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto bg-background rounded-t-3xl flex flex-col outline-none" style={{ maxHeight: "92dvh" }} aria-label="Termos e Privacidade" aria-describedby={undefined}>
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0"><div className="w-10 h-1 rounded-full bg-border" /></div>

          <div className="px-5 pt-2 pb-3 flex items-center justify-between flex-shrink-0 border-b border-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield size={15} className="text-primary" />
              </div>
              <div>
                <Dialog.Title className="text-sm font-semibold text-foreground leading-tight">
                  {tab === "termos" ? "Termos de Uso" : "Política de Privacidade"}
                </Dialog.Title>
                <p className="text-[10px] text-muted-foreground">Progress · Atualizado em set. 2026</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Fechar">
              <X size={14} />
            </button>
          </div>

          <div className="flex gap-1 px-5 pt-3 pb-2 flex-shrink-0">
            {(["termos", "privacidade"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={cn("flex-1 py-2 rounded-xl text-xs font-semibold transition-all", tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary")}>
                {t === "termos" ? "Termos de Uso" : "Política de Privacidade"}
              </button>
            ))}
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 pb-10 min-h-0">
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, x: tab === "termos" ? -10 : 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="space-y-5 pt-2">
                {sections.map((s: { title: string; body: string }) => (
                  <div key={s.title}>
                    <h3 className="text-xs font-semibold text-foreground mb-1.5">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── DeleteAccountModal ───────────────────────────────────────────────────────
type DeleteStep = "warn" | "alternatives" | "confirm" | "done";

export function DeleteAccountModal({
  open, onClose, user, onLogout, onDelete,
}: {
  open: boolean;
  onClose: () => void;
  user: { name: string; email: string; totalXP: number };
  onLogout: () => void;
  onDelete: () => void;
}) {
  const [step, setStep]       = useState<DeleteStep>("warn");
  const [typed, setTyped]     = useState("");
  const [agreed, setAgreed]   = useState(false);
  const [deleting, setDeleting] = useState(false);
  const firstName = user.name.split(" ")[0] || "você";

  useEffect(() => {
    if (open) { setStep("warn"); setTyped(""); setAgreed(false); setDeleting(false); }
  }, [open]);

  const canConfirm = typed === "EXCLUIR" && agreed;

  const handleDelete = () => {
    if (!canConfirm) return;
    setDeleting(true);
    setTimeout(() => { setStep("done"); setDeleting(false); }, 1200);
  };

  const LOSSES = [
    { Icon: BookOpen,  label: "Histórico de estudos",       detail: "Todas as horas registradas e progresso" },
    { Icon: Target,    label: "Objetivos e metas",          detail: "Objetivos criados e estudos vinculados" },
    { Icon: Zap,       label: `${user.totalXP} XP acumulados`, detail: "Conquistas, nível e badges ganhos" },
    { Icon: Users,     label: "Contribuições na comunidade", detail: "Publicações, respostas e ranking" },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={o => { if (!o && step !== "done") onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-32px)] max-w-[380px] -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-3xl shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200 overflow-hidden">
          <AnimatePresence mode="wait">

            {step === "warn" && (
              <motion.div key="warn" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="p-6">
                <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground z-10" aria-label="Fechar"><X size={15} /></Dialog.Close>
                <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center mb-4">
                  <AlertTriangle size={22} className="text-red-600 dark:text-red-400" />
                </div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-1">Excluir conta permanentemente?</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-4">
                  Você poderá criar uma nova conta quando quiser, mas <strong className="text-foreground">os dados abaixo serão excluídos e não poderão ser recuperados:</strong>
                </Dialog.Description>
                <div className="space-y-2.5 mb-5">
                  {LOSSES.map(({ Icon, label, detail }) => (
                    <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200/60 dark:border-red-800/30">
                      <div className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0 mt-0.5"><Icon size={13} className="text-red-600 dark:text-red-400" /></div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{label}</p>
                        <p className="text-[11px] text-muted-foreground">{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={() => setStep("alternatives")} className="w-full py-3 rounded-2xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors">Entendi, quero continuar</motion.button>
                  <button onClick={onClose} className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-colors">Cancelar</button>
                </div>
              </motion.div>
            )}

            {step === "alternatives" && (
              <motion.div key="alt" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="p-6">
                <button onClick={() => setStep("warn")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"><ArrowLeft size={14} /> Voltar</button>
                <Dialog.Title className="text-base font-semibold text-foreground mb-1">Antes de excluir…</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-4">Há alternativas que preservam o seu histórico:</Dialog.Description>
                <div className="space-y-2.5 mb-5">
                  <motion.button whileTap={{ scale: 0.98 }} onClick={() => { onLogout(); onClose(); }} className="w-full flex items-start gap-3 p-3.5 rounded-2xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors text-left">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"><LogOut size={14} className="text-primary" /></div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Só quero sair por agora</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Encerra a sessão. Todo o histórico fica salvo e você pode voltar quando quiser.</p>
                    </div>
                  </motion.button>
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-border bg-muted/40 text-left">
                    <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0"><PauseCircle size={14} className="text-muted-foreground" /></div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Pausar minha jornada</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Desative lembretes e notificações em Configurações. Sua conta e dados ficam intactos.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-border bg-muted/40 text-left">
                    <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0"><Archive size={14} className="text-muted-foreground" /></div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Exportar meus dados antes</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Solicite um arquivo com todo seu histórico em Configurações → Dados salvos.</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setStep("confirm")} className="w-full py-2.5 text-sm text-red-600 dark:text-red-400 font-medium hover:underline underline-offset-2 transition-colors text-center">Ainda quero excluir minha conta</button>
              </motion.div>
            )}

            {step === "confirm" && (
              <motion.div key="confirm" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="p-6">
                <button onClick={() => setStep("alternatives")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"><ArrowLeft size={14} /> Voltar</button>
                <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center mb-4"><Trash2 size={20} className="text-red-600 dark:text-red-400" /></div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-1">Confirmação final</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-4">
                  Esta é a última etapa. A exclusão da conta <strong className="text-foreground">{user.email}</strong> é permanente e não pode ser desfeita.
                </Dialog.Description>
                <div className="space-y-4 mb-5">
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1.5 block">
                      Digite <span className="font-bold text-red-600 dark:text-red-400">EXCLUIR</span> para confirmar
                    </label>
                    <input type="text" value={typed} onChange={e => setTyped(e.target.value)} placeholder="EXCLUIR" autoComplete="off" className={cn("w-full h-11 rounded-xl border px-3.5 text-sm font-mono tracking-widest bg-background text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 transition-all", typed === "EXCLUIR" ? "border-red-400 focus:ring-red-400/20" : "border-border focus:ring-primary/20 focus:border-primary/40")} />
                    {typed.length > 0 && typed !== "EXCLUIR" && <p className="text-[11px] text-red-500 mt-1">Digite exatamente: EXCLUIR</p>}
                  </div>
                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <div className="relative mt-0.5 flex-shrink-0">
                      <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="sr-only" />
                      <div className={cn("w-[18px] h-[18px] rounded-md border-2 flex items-center justify-center transition-all", agreed ? "bg-red-600 border-red-600" : "border-border group-hover:border-red-400")}>
                        {agreed && <CheckCircle2 size={11} className="text-white" />}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      Confirmo que entendo que esta ação é <strong className="text-foreground">permanente e irreversível</strong> e que todos os meus dados serão excluídos definitivamente.
                    </span>
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <motion.button whileTap={{ scale: canConfirm ? 0.97 : 1 }} onClick={handleDelete} disabled={!canConfirm || deleting} className={cn("w-full py-3 rounded-2xl text-sm font-semibold transition-all flex items-center justify-center gap-2", canConfirm ? "bg-red-600 text-white hover:bg-red-700" : "bg-muted text-muted-foreground cursor-not-allowed")}>
                    {deleting ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                        Excluindo…
                      </>
                    ) : "Excluir minha conta definitivamente"}
                  </motion.button>
                  <button onClick={onClose} className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-colors">Cancelar e manter conta</button>
                </div>
              </motion.div>
            )}

            {step === "done" && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.22 }} className="p-6 text-center">
                <motion.div initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.1, type: "spring", stiffness: 380, damping: 22 }} className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={26} className="text-muted-foreground" />
                </motion.div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-2">Conta excluída, {firstName}.</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  Seus dados foram removidos. Se um dia quiser recomeçar sua jornada, as portas do Progress estarão abertas.
                </Dialog.Description>
                <motion.button whileTap={{ scale: 0.97 }} onClick={() => { onDelete(); onClose(); }} className="w-full py-3 rounded-2xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all">Fechar</motion.button>
              </motion.div>
            )}

          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── ProfileScreen ────────────────────────────────────────────────────────────
export function ProfileScreen({
  darkMode, onToggleDark, settings, onSaveSettings, onCommunityNav, onLogout,
}: {
  darkMode: boolean;
  onToggleDark: () => void;
  settings: AppSettings;
  onSaveSettings: (s: AppSettings) => void;
  onCommunityNav: () => void;
  onLogout: () => void;
}) {
  const { openModal }   = useModal();
  const { goals, studies, posts, user, updateUser, updatePost, deletePost } = useData();
  const userPosts = posts.filter(p => p.isFromUser);
  const [showEditProfile, setShowEditProfile]     = useState(false);
  const [showSettings, setShowSettings]           = useState(false);
  const [showPrivacy, setShowPrivacy]             = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [expandedPostId, setExpandedPostId]       = useState<string | null>(null);
  const [editingPost, setEditingPost]             = useState<{ id: string; type: string; title: string; body: string; tags: string; isAnswered: boolean } | null>(null);

  const completedGoals   = goals.filter(g => g.status === "concluido").length;
  const completedStudies = studies.filter(s => s.status === "concluido").length;
  const levelInfo        = computeLevel(user.totalXP);
  const joinedLabel = (() => {
    const d = new Date(user.joinedAt + "T00:00:00");
    const m = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"][d.getMonth()];
    return `${m}/${String(d.getFullYear()).slice(2)}`;
  })();

  const settingsItems = [
    { Icon: Bell,     label: "Notificações",       sub: "Lembretes de estudo diários",              action: () => openModal({ variant: "info", title: "Lembretes de estudo", body: "Você recebe lembretes diários para manter seu streak ativo. Configure o horário preferido nas preferências do app.", primaryLabel: "Entendido" }) },
    { Icon: Shield,   label: "Privacidade e dados", sub: "Termos de uso e política de privacidade", action: () => setShowPrivacy(true) },
    { Icon: Users,    label: "Comunidade",          sub: "Fórum e trilhas da comunidade",           action: () => onCommunityNav() },
    { Icon: Settings, label: "Configurações",       sub: "Lembretes, metas diárias e mais",         action: () => setShowSettings(true) },
  ];

  return (
    <div className="px-4 pt-12 pb-24 max-w-lg mx-auto md:max-w-2xl md:px-8 md:pt-8 md:pb-10">
      <motion.div variants={listItem} initial="initial" animate="animate" className="bg-card border border-border rounded-2xl p-5 mb-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-xl font-bold select-none">{user.avatarInitials}</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-foreground">{user.name}</h1>
            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Wifi size={11} className="text-green-500" />
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">Conectado</span>
              </div>
              <span className="text-xs text-muted-foreground">UX → Engenharia de Software</span>
            </div>
          </div>
          <motion.button whileTap={{ scale: 0.93 }} onClick={() => setShowEditProfile(true)} className="p-2 rounded-xl bg-muted hover:bg-secondary transition-colors flex-shrink-0" aria-label="Editar perfil">
            <Edit3 size={15} className="text-muted-foreground" />
          </motion.button>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="px-2.5 py-1 bg-muted rounded-lg">Membro desde {joinedLabel}</span>
          <span className="px-2.5 py-1 bg-muted rounded-lg">{user.totalHoursStudied}h estudadas</span>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-3 gap-3 mb-5" variants={statsContainer} initial="initial" animate="animate">
        {[
          { label: "Objetivos\nconcluídos", value: completedGoals },
          { label: "Estudos\nconcluídos",   value: completedStudies },
          { label: "Dias de\nstreak",        value: user.streak },
        ].map(s => (
          <motion.div key={s.label} variants={statCard} className="bg-card border border-border rounded-2xl p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-[11px] text-muted-foreground leading-tight mt-1 whitespace-pre-line">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Minhas publicações ─────────────────────────────────────────────── */}
      <motion.div className="bg-card border border-border rounded-2xl overflow-hidden mb-5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, delay: 0.1 }}>
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center"><Globe size={13} className="text-violet-600 dark:text-violet-400" /></div>
            <span className="text-sm font-semibold text-foreground">Minhas publicações</span>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{userPosts.length}</span>
          </div>
          <motion.button whileTap={{ scale: 0.93 }} onClick={onCommunityNav} title="Nova publicação" className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors bg-primary/8 hover:bg-primary/15 px-2.5 py-1.5 rounded-lg">
            <Plus size={12} />Nova
          </motion.button>
        </div>

        {userPosts.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <Globe size={28} className="mx-auto text-muted-foreground mb-3 opacity-30" />
            <p className="text-sm font-medium text-foreground mb-1">Nenhuma publicação ainda</p>
            <p className="text-xs text-muted-foreground mb-3 max-w-[220px] mx-auto">Compartilhe dúvidas, recursos ou trilhas na comunidade e ganhe XP</p>
            <motion.button whileTap={{ scale: 0.96 }} onClick={onCommunityNav} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/15 px-3 py-2 rounded-lg transition-colors">
              <Plus size={12} />Fazer primeira publicação
            </motion.button>
          </div>
        ) : (
          <>
            {/* summary bar */}
            <div className="flex items-center gap-4 px-4 py-2.5 bg-muted/40 border-b border-border/60">
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <ThumbsUp size={10} />{userPosts.reduce((s, p) => s + p.likes, 0)} curtidas recebidas
              </span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <MessageCircle size={10} />{userPosts.reduce((s, p) => s + p.answers, 0)} respostas recebidas
              </span>
            </div>

            <div className="divide-y divide-border">
              {userPosts.map(p => {
                const cfg    = POST_TYPE_CONFIG[p.type];
                const PIcon  = cfg.icon;
                const isOpen = expandedPostId === p.id;

                // badge hint: trilha/recurso → curador/referencia-da-area, conquista → farol
                const badgeHint: BadgeId | null =
                  p.type === "trilha"    ? "primeira-trilha" :
                  p.type === "recurso"   ? "curador" :
                  p.type === "conquista" ? "farol" : null;
                const bc = badgeHint ? BADGE_CONFIG[badgeHint] : null;
                const BIcon = bc?.icon;

                return (
                  <div key={p.id} className="transition-colors">
                    {/* row header — tap to expand */}
                    <button
                      onClick={() => setExpandedPostId(isOpen ? null : p.id)}
                      className="w-full flex items-start gap-3 px-4 py-3 hover:bg-muted/40 transition-colors text-left"
                    >
                      <span className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold flex-shrink-0 mt-0.5", cfg.bg, cfg.color)}>
                        <PIcon size={9} />{cfg.label}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground leading-snug line-clamp-2">{p.title}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {p.type === "questao" && (
                            <span className={cn("flex items-center gap-0.5 text-[10px] font-medium", p.isAnswered ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400")}>
                              <CheckCircle2 size={9} />{p.isAnswered ? "Respondida" : "Aguardando resposta"}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <ThumbsUp size={9} />{p.likes}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <MessageCircle size={9} />{p.answers}
                          </span>
                          <span className="text-[10px] text-muted-foreground ml-auto">{formatDate(p.createdAt)}</span>
                        </div>
                      </div>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.18 }}>
                        <ChevronDown size={13} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                      </motion.div>
                    </button>

                    {/* expanded panel */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-3 pt-1 bg-muted/20 border-t border-border/50">
                            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{p.body}</p>

                            {p.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {p.tags.map(t => (
                                  <span key={t} className="px-1.5 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground">#{t}</span>
                                ))}
                              </div>
                            )}

                            {bc && BIcon && (
                              <div className={cn("flex items-center gap-1.5 text-[10px] font-medium px-2 py-1.5 rounded-lg mb-3", bc.bg, bc.color)}>
                                <BIcon size={10} />
                                <span>Publicações deste tipo contribuem para o badge <strong>{bc.label}</strong></span>
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setEditingPost({ id: p.id, type: p.type, title: p.title, body: p.body, tags: p.tags.join(", "), isAnswered: !!p.isAnswered })}
                                className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-secondary px-2.5 py-1.5 rounded-lg transition-colors"
                              >
                                <Edit3 size={11} />Editar
                              </motion.button>
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openModal({
                                  variant: "confirm",
                                  title: "Excluir publicação?",
                                  body: "Esta ação não pode ser desfeita. A publicação será removida da comunidade.",
                                  primaryLabel: "Excluir",
                                  destructive: true,
                                  primaryAction: () => { deletePost(p.id); setExpandedPostId(null); },
                                  secondaryLabel: "Cancelar",
                                })}
                                className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 px-2.5 py-1.5 rounded-lg transition-colors"
                              >
                                <Trash2 size={11} />Excluir
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </motion.div>

      {/* ── Edit post modal ─────────────────────────────────────────────────── */}
      <Dialog.Root open={!!editingPost} onOpenChange={o => !o && setEditingPost(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-32px)] max-w-[400px] -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-3xl p-6 shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200">
            <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground"><X size={15} /></Dialog.Close>
            <div className="w-10 h-10 rounded-2xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center mb-4">
              <Edit3 size={18} className="text-violet-600 dark:text-violet-400" />
            </div>
            <Dialog.Title className="text-base font-semibold text-foreground mb-1">Editar publicação</Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground mb-4">
              {editingPost?.type === "questao" ? "Edite sua dúvida e atualize o status da resposta." : "Ajuste o conteúdo da sua publicação."}
            </Dialog.Description>
            {editingPost && (
              <div className="space-y-3">
                <div>
                  <label className={LABEL_CLS}>Título</label>
                  <input
                    value={editingPost.title}
                    onChange={e => setEditingPost(p => p ? { ...p, title: e.target.value } : p)}
                    className={INPUT_CLS}
                    maxLength={120}
                  />
                </div>
                <div>
                  <label className={LABEL_CLS}>Conteúdo</label>
                  <textarea
                    value={editingPost.body}
                    onChange={e => setEditingPost(p => p ? { ...p, body: e.target.value } : p)}
                    rows={4}
                    className={cn(INPUT_CLS, "resize-none")}
                  />
                </div>
                <div>
                  <label className={LABEL_CLS}>Tags <span className="font-normal text-muted-foreground/60">(separadas por vírgula)</span></label>
                  <input
                    value={editingPost.tags}
                    onChange={e => setEditingPost(p => p ? { ...p, tags: e.target.value } : p)}
                    placeholder="carreira, dados, produto"
                    className={INPUT_CLS}
                  />
                </div>

                {editingPost.type === "questao" && (
                  <div>
                    <label className={LABEL_CLS}>Status da dúvida</label>
                    <div className="grid grid-cols-2 gap-2">
                      {([
                        { value: false, label: "Aguardando resposta", Icon: Clock,         active: "border-amber-400 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300", idle: "border-border text-muted-foreground" },
                        { value: true,  label: "Respondida",          Icon: CheckCircle2, active: "border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400",   idle: "border-border text-muted-foreground" },
                      ] as const).map(opt => (
                        <motion.button
                          key={String(opt.value)}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setEditingPost(p => p ? { ...p, isAnswered: opt.value } : p)}
                          className={cn(
                            "flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all",
                            editingPost.isAnswered === opt.value ? opt.active : opt.idle
                          )}
                        >
                          <opt.Icon size={16} />
                          {opt.label}
                        </motion.button>
                      ))}
                    </div>
                    {editingPost.isAnswered && (
                      <p className="text-[11px] text-green-600 dark:text-green-400 mt-1.5 flex items-center gap-1">
                        <CheckCircle2 size={10} />Sua dúvida ficará marcada como respondida na comunidade.
                      </p>
                    )}
                  </div>
                )}

                <div className="flex gap-2 pt-1">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      if (!editingPost) return;
                      updatePost(editingPost.id, {
                        title:      editingPost.title.trim(),
                        body:       editingPost.body.trim(),
                        tags:       editingPost.tags.split(",").map(t => t.trim()).filter(Boolean),
                        ...(editingPost.type === "questao" && { isAnswered: editingPost.isAnswered }),
                      });
                      setEditingPost(null);
                    }}
                    disabled={!editingPost.title.trim() || !editingPost.body.trim()}
                    className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-40"
                  >
                    Salvar alterações
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.97 }} onClick={() => setEditingPost(null)} className="px-4 py-2.5 rounded-xl bg-muted text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                    Cancelar
                  </motion.button>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="bg-card border border-border rounded-2xl p-4 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {darkMode ? <Moon size={18} className="text-muted-foreground" /> : <Sun size={18} className="text-muted-foreground" />}
          <div>
            <p className="text-sm font-medium text-foreground">Modo escuro</p>
            <p className="text-xs text-muted-foreground">{darkMode ? "Ativado" : "Desativado"}</p>
          </div>
        </div>
        <Switch checked={darkMode} onCheckedChange={onToggleDark} aria-label="Alternar modo escuro" />
      </div>

      <motion.div className="bg-card border border-border rounded-2xl overflow-hidden mb-5" variants={listContainer} initial="initial" animate="animate">
        {settingsItems.map(({ Icon, label, sub, action }, idx) => (
          <motion.button key={label} variants={listItem} whileTap={{ scale: 0.99 }} onClick={action} className={cn("w-full flex items-center gap-3 p-4 hover:bg-muted transition-colors text-left", idx < settingsItems.length - 1 ? "border-b border-border" : "")}>
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0"><Icon size={15} className="text-muted-foreground" /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground truncate">{sub}</p>
            </div>
            <ChevronRight size={15} className="text-muted-foreground flex-shrink-0" />
          </motion.button>
        ))}
      </motion.div>

      <div className="flex flex-col gap-2">
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => openModal({ variant: "confirm", title: "Encerrar sessão?", body: `Você sairá da conta ${user.email}. Seu progresso está salvo e não será perdido.`, primaryLabel: "Sair", primaryAction: () => onLogout(), secondaryLabel: "Cancelar" })} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted transition-colors">
          <LogOut size={15} />Sair da conta
        </motion.button>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowDeleteAccount(true)} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          <Trash2 size={15} />Excluir minha conta
        </motion.button>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-5">Progress v2.0.0</p>

      <ProfileEditModal open={showEditProfile} onClose={() => setShowEditProfile(false)} user={user} onSave={(name, avatarUrl) => updateUser({ name, avatarUrl, avatarInitials: name.trim().split(" ").filter(Boolean).map((w: string) => w[0].toUpperCase()).slice(0, 2).join("") })} />
      <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} settings={settings} onSave={onSaveSettings} />
      <PrivacyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <DeleteAccountModal open={showDeleteAccount} onClose={() => setShowDeleteAccount(false)} user={user} onLogout={() => openModal({ variant: "success", title: `Até logo, ${user.name.split(" ")[0]}!`, body: "Sessão encerrada. Seu histórico continua salvo.", primaryLabel: "Fechar" })} onDelete={() => openModal({ variant: "info", title: "Conta excluída", body: "Todos os seus dados foram removidos com segurança.", primaryLabel: "Fechar" })} />
    </div>
  );
}
