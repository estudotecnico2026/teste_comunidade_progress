import React, { useState } from "react";
import {
  User, Mail, Lock, Eye, EyeOff, CheckCircle2, Circle, TrendingUp,
  ArrowLeft, Sparkles, AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  getAdditionalUserInfo,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth, googleProvider } from "./lib/firebase";
import { cn } from "./components/ui/utils";
import type { GoalCategory } from "./types";
import { ONBOARDING_SLIDES, CATEGORY_CONFIG } from "./data";

// Traduz os códigos de erro do Firebase Auth para mensagens em português,
// já que o Firebase retorna mensagens técnicas em inglês por padrão.
function translateAuthError(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "Este e-mail já está cadastrado. Tente entrar em vez de criar conta.";
    case "auth/invalid-email":
      return "E-mail inválido.";
    case "auth/weak-password":
      return "Senha muito fraca. Use pelo menos 8 caracteres, com letra maiúscula e número.";
    case "auth/user-not-found":
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "E-mail ou senha incorretos.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Aguarde alguns minutos e tente novamente.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return ""; // usuário cancelou de propósito — não é um erro a mostrar
    case "auth/popup-blocked":
      return "O navegador bloqueou a janela do Google. Permita pop-ups para este site e tente de novo.";
    case "auth/account-exists-with-different-credential":
      return "Já existe uma conta com este e-mail usando outro método de login.";
    case "auth/network-request-failed":
      return "Falha de conexão. Verifique sua internet e tente novamente.";
    case "auth/unauthorized-domain":
      return "Este domínio não está autorizado no Firebase para login com Google.";
    default:
      return "Não foi possível concluir. Tente novamente em instantes.";
  }
}

const INPUT_CLS = "w-full px-3.5 py-2.5 rounded-xl bg-input-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all";
const LABEL_CLS = "text-xs font-medium text-muted-foreground mb-1.5 block";

// ─── AuthIllustration ─────────────────────────────────────────────────────────
export function AuthIllustration() {
  return (
    <svg width="200" height="110" viewBox="0 0 200 110" fill="none" aria-hidden="true">
      <circle cx="100" cy="55" r="48" fill="white" fillOpacity="0.07" />
      <circle cx="100" cy="55" r="34" fill="white" fillOpacity="0.09" />
      <path d="M18 94 Q42 78 68 62 Q94 46 120 34 Q148 22 178 14"
            stroke="white" strokeWidth="2.2" strokeDasharray="5 4"
            strokeOpacity="0.45" strokeLinecap="round" />
      <circle cx="42" cy="80" r="5.5" fill="white" fillOpacity="0.2" />
      <circle cx="42" cy="80" r="3" fill="white" fillOpacity="0.7" />
      <circle cx="94" cy="48" r="5.5" fill="white" fillOpacity="0.2" />
      <circle cx="94" cy="48" r="3" fill="white" fillOpacity="0.7" />
      <circle cx="148" cy="24" r="5.5" fill="white" fillOpacity="0.2" />
      <circle cx="148" cy="24" r="3" fill="white" fillOpacity="0.7" />
      <rect x="74" y="44" width="19" height="22" rx="2" fill="white" fillOpacity="0.88" />
      <rect x="74" y="44" width="2" height="22" fill="white" fillOpacity="0.35" />
      <line x1="78" y1="50" x2="90" y2="50" stroke="#7C3AED" strokeWidth="1.5" />
      <line x1="78" y1="54.5" x2="90" y2="54.5" stroke="#7C3AED" strokeWidth="1.5" />
      <line x1="78" y1="59" x2="87" y2="59" stroke="#7C3AED" strokeWidth="1.5" />
      <path d="M137 16 L138.8 21.2 L144.2 21.2 L140 24.4 L141.5 29.6 L137 26.6 L132.5 29.6 L134 24.4 L129.8 21.2 L135.2 21.2 Z"
            fill="white" fillOpacity="0.88" />
      <rect x="150" y="58" width="32" height="17" rx="8.5" fill="white" fillOpacity="0.15" />
      <text x="166" y="70" textAnchor="middle" fontSize="8.5" fill="white" fillOpacity="0.95"
            fontFamily="Inter, sans-serif" fontWeight="700">+XP</text>
      <circle cx="28" cy="36" r="3" fill="white" fillOpacity="0.2" />
      <circle cx="168" cy="82" r="3.5" fill="white" fillOpacity="0.18" />
      <circle cx="58" cy="18" r="2.5" fill="white" fillOpacity="0.25" />
      <circle cx="182" cy="48" r="2" fill="white" fillOpacity="0.22" />
    </svg>
  );
}

// ─── ValidationRules ──────────────────────────────────────────────────────────
export function ValidationRules({
  rules,
  wrap = false,
}: {
  rules: { label: string; ok: boolean }[];
  wrap?: boolean;
}) {
  return (
    <div className={cn("flex mt-1.5 pl-0.5 gap-x-3 gap-y-1", wrap ? "flex-wrap" : "flex-col")}>
      {rules.map(r => (
        <motion.span
          key={r.label}
          animate={{ color: r.ok ? "#16a34a" : undefined }}
          className={cn(
            "flex items-center gap-1 text-[11px] font-medium transition-colors",
            r.ok ? "text-green-600 dark:text-green-400" : "text-muted-foreground",
          )}
        >
          {r.ok
            ? <CheckCircle2 size={11} className="flex-shrink-0" />
            : <Circle      size={11} className="flex-shrink-0" />
          }
          {r.label}
        </motion.span>
      ))}
    </div>
  );
}

// ─── AuthScreen ───────────────────────────────────────────────────────────────
export function AuthScreen({
  onAuthSuccess,
}: {
  onAuthSuccess: (user: FirebaseUser, isNewUser: boolean) => void;
}) {
  const [mode, setMode]         = useState<"signup" | "login">("signup");
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [loading, setLoading]   = useState(false);
  const [authError, setAuthError] = useState("");

  const clearErr = (field: string) => setErrors(p => ({ ...p, [field]: "" }));

  const PW_REGEX    = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const nameValid  = name.trim().length >= 2;
  const emailValid = EMAIL_REGEX.test(email.trim());
  const pwValid    = PW_REGEX.test(password);

  const NAME_RULES  = [{ label: "Mínimo 2 caracteres", ok: nameValid }];
  const EMAIL_RULES = [{ label: "Formato de e-mail válido", ok: emailValid }];
  const PW_RULES    = [
    { label: "8 caracteres mínimo", ok: password.length >= 8 },
    { label: "1 letra maiúscula",   ok: /[A-Z]/.test(password) },
    { label: "1 número",            ok: /[0-9]/.test(password) },
  ];

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === "signup" && !nameValid)  e.name     = "Informe seu nome.";
    if (!emailValid)                       e.email    = "Informe um e-mail válido.";
    if (mode === "signup" && !pwValid)     e.password = "Verifique os requisitos da senha.";
    else if (mode === "login" && password.length < 1) e.password = "Informe a senha.";
    return e;
  };

  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setAuthError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(credential.user, { displayName: name.trim() });
        onAuthSuccess(credential.user, true);
      } else {
        const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
        onAuthSuccess(credential.user, false);
      }
    } catch (err: any) {
      setAuthError(translateAuthError(err?.code ?? ""));
    } finally {
      setLoading(false);
    }
  };

  const googleAuth = async () => {
    setAuthError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const isNewUser = getAdditionalUserInfo(result)?.isNewUser ?? false;
      onAuthSuccess(result.user, isNewUser);
    } catch (err: any) {
      const message = translateAuthError(err?.code ?? "");
      if (message) setAuthError(message);
    } finally {
      setLoading(false);
    }
  };

  const fieldCls = (f: string) => {
    const hasVal = f === "name" ? name.length > 0 : f === "email" ? email.length > 0 : password.length > 0;
    const isOk   = f === "name" ? nameValid : f === "email" ? emailValid : pwValid;
    return cn(
      "w-full h-11 rounded-lg border bg-input-background text-sm text-foreground placeholder:text-muted-foreground",
      "focus:outline-none focus:ring-2 transition-all",
      errors[f]             ? "border-red-400 focus:ring-red-400/20"
      : hasVal && isOk      ? "border-green-400 focus:ring-green-400/20"
      :                       "border-border focus:border-primary/40 focus:ring-primary/30",
    );
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden" style={{ background: "#7C3AED" }}>
      <div className="relative flex flex-col items-center justify-end px-6 pb-10 flex-none" style={{ minHeight: "45vh" }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-white/5 -translate-y-20 translate-x-20 pointer-events-none" />
        <div className="absolute bottom-12 left-0 w-32 h-32 rounded-full bg-white/5 -translate-x-14 pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <AuthIllustration />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.12 }} className="text-center mt-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
              <TrendingUp size={14} className="text-white" />
            </div>
            <span className="text-[26px] font-bold text-white tracking-tight">Progress</span>
          </div>
          <p className="text-white/80 text-[13px] leading-snug max-w-[240px]">
            Bem-vindo ao <strong className="text-white font-semibold">Progress</strong>, seu parceiro de estudos e carreira
          </p>
        </motion.div>
      </div>

      <motion.div initial={{ y: 48, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.38, delay: 0.18, ease: [0.25, 0.1, 0.25, 1] }} className="flex-1 bg-card rounded-t-[24px] -mt-6 overflow-y-auto" style={{ minHeight: "60vh" }}>
        <div className="px-6 pt-6 pb-12 flex flex-col">
          <p className="text-center text-sm text-muted-foreground mb-5">
            {mode === "signup" ? (
              <>Já tem uma conta?{" "}
                <button onClick={() => { setMode("login"); setErrors({}); setAuthError(""); }} className="underline font-medium text-foreground hover:text-primary transition-colors">Entrar</button>
              </>
            ) : (
              <>Não tem conta?{" "}
                <button onClick={() => { setMode("signup"); setErrors({}); setAuthError(""); }} className="underline font-medium text-foreground hover:text-primary transition-colors">Cadastrar</button>
              </>
            )}
          </p>

          <AnimatePresence mode="wait">
            <motion.div key={mode} initial={{ opacity: 0, x: mode === "login" ? -14 : 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: mode === "login" ? 14 : -14 }} transition={{ duration: 0.18 }}>
              <h2 className="text-xl font-bold text-foreground text-center mb-6">
                {mode === "signup" ? "Cadastre-se" : "Entrar na conta"}
              </h2>

              <div className="space-y-3">
                {mode === "signup" && (
                  <div>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      <input aria-label="Seu nome ou apelido" placeholder="Seu nome ou apelido" value={name} autoComplete="name" onChange={e => { setName(e.target.value); clearErr("name"); }} className={cn(fieldCls("name"), "pl-10 pr-4")} />
                    </div>
                    {name.length > 0 ? (
                      <ValidationRules rules={NAME_RULES} />
                    ) : errors.name ? (
                      <p className="text-xs text-red-500 mt-1 pl-1">{errors.name}</p>
                    ) : null}
                  </div>
                )}

                <div>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input aria-label="Seu e-mail" placeholder="seu@email.com" type="email" value={email} autoComplete="email" onChange={e => { setEmail(e.target.value); clearErr("email"); }} className={cn(fieldCls("email"), "pl-10 pr-4")} />
                  </div>
                  {email.length > 0 ? (
                    <ValidationRules rules={EMAIL_RULES} />
                  ) : errors.email ? (
                    <p className="text-xs text-red-500 mt-1 pl-1">{errors.email}</p>
                  ) : null}
                </div>

                <div>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input aria-label="Senha" placeholder={mode === "signup" ? "Crie uma senha segura" : "Senha"} type={showPw ? "text" : "password"} value={password} autoComplete={mode === "signup" ? "new-password" : "current-password"} onChange={e => { setPassword(e.target.value); clearErr("password"); }} className={cn(fieldCls("password"), "pl-10 pr-10")} />
                    <button type="button" onClick={() => setShowPw(p => !p)} aria-label={showPw ? "Ocultar senha" : "Mostrar senha"} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {mode === "signup" && <ValidationRules rules={PW_RULES} wrap />}
                  {mode === "login" && errors.password && <p className="text-xs text-red-500 mt-1 pl-1">{errors.password}</p>}
                </div>

                {authError && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
                    <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-600 dark:text-red-400 leading-snug">{authError}</p>
                  </div>
                )}

                <div className="flex items-center gap-3 py-0.5">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">ou</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <motion.button whileTap={{ scale: 0.97 }} onClick={googleAuth} disabled={loading} className="w-full h-11 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:bg-muted transition-all flex items-center justify-center gap-2.5 disabled:opacity-50">
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  {mode === "signup" ? "Cadastrar com Google" : "Entrar com Google"}
                </motion.button>

                <motion.button whileTap={{ scale: 0.97 }} onClick={submit} disabled={loading} className="w-full h-11 rounded-full bg-[#7C3AED] text-white text-sm font-semibold hover:bg-[#6d28d9] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                      {mode === "signup" ? "Cadastrando..." : "Entrando..."}
                    </>
                  ) : (
                    mode === "signup" ? "Cadastrar" : "Entrar"
                  )}
                </motion.button>

                <p className="text-center">
                  <button type="button" className="text-xs text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-2">Esqueceu sua senha?</button>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

// ─── OnboardingScreen ─────────────────────────────────────────────────────────
export function OnboardingScreen({
  userName,
  onComplete,
  onBack,
}: {
  userName: string;
  onComplete: (goal: { title: string; category: GoalCategory; targetDate: string } | null) => void;
  onBack?: () => void;
}) {
  const [slide, setSlide]               = useState(0);
  const [goalTitle, setGoalTitle]       = useState("");
  const [goalCategory, setGoalCategory] = useState<GoalCategory>("carreira");
  const [goalDate, setGoalDate]         = useState("");
  const [goalErrors, setGoalErrors]     = useState<Record<string, string>>({});
  const [creating, setCreating]         = useState(false);

  const isForm     = slide === 3;
  const slide_data = ONBOARDING_SLIDES[slide] ?? ONBOARDING_SLIDES[0];

  const handleCreateGoal = () => {
    const e: Record<string, string> = {};
    if (goalTitle.trim().length < 3) e.title = "Descreva seu objetivo em pelo menos 3 caracteres.";
    if (goalDate && new Date(goalDate + "T00:00:00") < new Date()) e.date = "Escolha uma data futura.";
    if (Object.keys(e).length > 0) { setGoalErrors(e); return; }
    setCreating(true);
    setTimeout(() => {
      setCreating(false);
      onComplete({ title: goalTitle.trim(), category: goalCategory, targetDate: goalDate });
    }, 850);
  };

  const firstName = userName.split(" ")[0] || "você";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between px-5 pt-12 pb-4">
        {isForm ? (
          <button onClick={() => setSlide(2)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />Voltar
          </button>
        ) : onBack ? (
          <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />Início
          </button>
        ) : (
          <div className="w-14" />
        )}

        {!isForm && (
          <div className="flex gap-1.5">
            {ONBOARDING_SLIDES.map((_, i) => (
              <motion.div key={i} animate={{ width: i === slide ? 20 : 6 }} transition={{ duration: 0.25 }} className={cn("h-1.5 rounded-full", i === slide ? "bg-primary" : "bg-border")} />
            ))}
          </div>
        )}

        {!isForm ? (
          <button onClick={() => setSlide(3)} className="text-sm text-muted-foreground hover:text-foreground transition-colors w-14 text-right">Pular</button>
        ) : (
          <div className="w-14" />
        )}
      </div>

      <div className="flex-1 flex flex-col px-6">
        <AnimatePresence mode="wait">
          {!isForm ? (
            <motion.div key={slide} initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -22 }} transition={{ duration: 0.2 }} className="flex-1 flex flex-col items-center justify-center text-center pb-6">
              <motion.div initial={{ scale: 0.68, rotate: -8 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.04 }} className={cn("w-24 h-24 rounded-3xl flex items-center justify-center mb-8", slide_data.iconBg)}>
                <slide_data.Icon size={40} className={slide_data.iconColor} />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground mb-4 leading-tight">{slide_data.title}</h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-[280px]">{slide_data.body}</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24 }} className="flex-1 flex flex-col pt-2">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={14} className="text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Primeiro objetivo</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground leading-tight">O que você quer<br />alcançar, {firstName}?</h2>
                <p className="text-sm text-muted-foreground mt-1.5">Comece com um objetivo concreto. Você ajusta depois.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={LABEL_CLS} htmlFor="onb-goal-title">Descreva seu objetivo *</label>
                  <input id="onb-goal-title" placeholder="Ex: Tornar-me desenvolvedor Full Stack" value={goalTitle} onChange={e => { setGoalTitle(e.target.value); setGoalErrors(p => ({ ...p, title: "" })); }} className={cn(INPUT_CLS, goalErrors.title && "border-red-400")} />
                  {goalErrors.title && <p className="text-xs text-red-500 mt-1">{goalErrors.title}</p>}
                </div>

                <div>
                  <label className={LABEL_CLS}>Em que área?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["carreira", "certificacao", "habilidade", "projeto"] as const).map(cat => {
                      const cfg = CATEGORY_CONFIG[cat];
                      const CatIcon = cfg.icon;
                      const active = goalCategory === cat;
                      return (
                        <motion.button key={cat} whileTap={{ scale: 0.95 }} onClick={() => setGoalCategory(cat)} className={cn("flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all text-left", active ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground")}>
                          <CatIcon size={14} className={active ? "text-primary" : cfg.color} />
                          {cfg.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className={LABEL_CLS} htmlFor="onb-goal-date">Até quando? <span className="text-muted-foreground/55 font-normal">(opcional)</span></label>
                  <input id="onb-goal-date" type="date" value={goalDate} onChange={e => { setGoalDate(e.target.value); setGoalErrors(p => ({ ...p, date: "" })); }} className={cn(INPUT_CLS, goalErrors.date && "border-red-400")} />
                  {goalErrors.date && <p className="text-xs text-red-500 mt-1">{goalErrors.date}</p>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-6 pb-10 pt-5 space-y-3">
        {!isForm ? (
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setSlide(s => s === 2 ? 3 : s + 1)} className={cn("w-full py-3.5 rounded-full text-sm font-semibold transition-all", slide === 2 ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-foreground hover:bg-secondary")}>
            {slide === 2 ? "Criar meu primeiro objetivo" : "Próximo"}
          </motion.button>
        ) : (
          <>
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleCreateGoal} disabled={goalTitle.trim().length < 3 || creating} className="w-full py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {creating ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  Criando...
                </>
              ) : "Criar objetivo"}
            </motion.button>
            <button onClick={() => onComplete(null)} className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-center">
              Pular por agora
            </button>
          </>
        )}
      </div>
    </div>
  );
}
