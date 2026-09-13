import React, { useState, useEffect } from "react";
import {
  Plus, X, Send, MessageCircle, ThumbsUp, Share2, Search, Trophy, Copy,
  CheckCircle2, Zap, Video, BookOpen, FileText, Code, Users, Globe,
  ExternalLink, Filter,
} from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "./components/ui/utils";
import { useData } from "./contexts";
import type { PostType, CommunityPost, PostComment } from "./types";
import {
  COMMUNITY_LEADERBOARD, BADGE_CONFIG, POST_TYPE_CONFIG, SEED_COMMENTS,
  todayISO, formatDate,
} from "./data";

const INPUT_CLS = "w-full px-3.5 py-2.5 rounded-xl bg-input-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all";
const LABEL_CLS = "text-xs font-medium text-muted-foreground mb-1.5 block";

const listContainer = { animate: { transition: { staggerChildren: 0.055 } } };
const listItem = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" as const } } };

// ─── Link utils ───────────────────────────────────────────────────────────────
const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const extractUrls = (txt: string): string[] => txt.match(URL_REGEX) ?? [];

function linkMeta(url: string) {
  const lower = url.toLowerCase();
  if (/youtube\.com|youtu\.be/.test(lower))
    return { Icon: Video,    label: "Vídeo",   bg: "bg-red-50 dark:bg-red-900/20",    border: "border-red-200 dark:border-red-800/40",    iconCls: "text-red-600 dark:text-red-400" };
  if (/coursera|udemy|alura|dio\.me|edx\.org/.test(lower))
    return { Icon: BookOpen, label: "Curso",   bg: "bg-blue-50 dark:bg-blue-900/20",  border: "border-blue-200 dark:border-blue-800/40",   iconCls: "text-blue-600 dark:text-blue-400" };
  if (/medium\.com|substack|dev\.to|hashnode/.test(lower))
    return { Icon: FileText, label: "Artigo",  bg: "bg-green-50 dark:bg-green-900/20",border: "border-green-200 dark:border-green-800/40",  iconCls: "text-green-600 dark:text-green-400" };
  if (/github\.com/.test(lower))
    return { Icon: Code,     label: "GitHub",  bg: "bg-slate-50 dark:bg-slate-800/50",border: "border-slate-200 dark:border-slate-700",      iconCls: "text-slate-700 dark:text-slate-300" };
  if (/goodreads|amazon|estante|livraria/.test(lower))
    return { Icon: BookOpen, label: "Livro",   bg: "bg-amber-50 dark:bg-amber-900/20",border: "border-amber-200 dark:border-amber-800/40",   iconCls: "text-amber-600 dark:text-amber-400" };
  if (/adplist|mentorpass|plato\.io/.test(lower))
    return { Icon: Users,    label: "Mentoria",bg: "bg-violet-50 dark:bg-violet-900/20",border: "border-violet-200 dark:border-violet-800/40",iconCls: "text-violet-600 dark:text-violet-400" };
  return   { Icon: Globe,    label: "Link",    bg: "bg-muted",                         border: "border-border",                               iconCls: "text-muted-foreground" };
}

function LinkPreviewCard({ url }: { url: string }) {
  const { Icon, label, bg, border, iconCls } = linkMeta(url);
  let domain = url;
  try { domain = new URL(url).hostname.replace("www.", ""); } catch {}
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={cn("flex items-center gap-2.5 px-3 py-2.5 rounded-xl border mt-2 hover:opacity-75 active:opacity-60 transition-opacity", bg, border)}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/50 dark:bg-black/20"><Icon size={15} className={iconCls} /></div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground truncate">{domain}</p>
      </div>
      <ExternalLink size={11} className="text-muted-foreground flex-shrink-0" />
    </a>
  );
}

function renderBodyWithLinks(text: string, cls: string) {
  const parts = text.split(URL_REGEX);
  return (
    <span className={cls}>
      {parts.map((p, i) =>
        URL_REGEX.test(p)
          ? <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 break-all hover:opacity-75 transition-opacity">{p}</a>
          : p
      )}
    </span>
  );
}

// ─── CreatePostModal ──────────────────────────────────────────────────────────
export function CreatePostModal({ open, onClose, onPublish }: {
  open: boolean;
  onClose: () => void;
  onPublish: (post: CommunityPost, xpEarned: number) => void;
}) {
  const { user } = useData();

  const [postType, setPostType] = useState<PostType>("questao");
  const [title, setTitle]       = useState("");
  const [body, setBody]         = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags]         = useState<string[]>([]);
  const [step, setStep]         = useState<"form" | "success">("form");
  const [earnedXP, setEarnedXP] = useState(0);

  const XP_MAP: Record<PostType, number> = { questao: 10, recurso: 15, trilha: 30, conquista: 20 };
  const canSubmit = title.trim().length > 5 && body.trim().length > 10;

  const addTag = () => {
    const v = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (v && !tags.includes(v) && tags.length < 5) { setTags(prev => [...prev, v]); setTagInput(""); }
  };

  const handlePublish = () => {
    if (!canSubmit) return;
    const xp = XP_MAP[postType];
    const post: CommunityPost = {
      id: `cp${Date.now()}`,
      authorName: user.name,
      authorInitials: user.avatarInitials,
      authorTransition: "Em transição de carreira",
      authorXP: user.totalXP + xp,
      type: postType,
      title: title.trim(),
      body: body.trim(),
      tags,
      likes: 0,
      answers: 0,
      createdAt: todayISO(),
      isFromUser: true,
    };
    setEarnedXP(xp);
    onPublish(post, xp);
    setStep("success");
  };

  const handleClose = () => {
    setPostType("questao"); setTitle(""); setBody("");
    setTagInput(""); setTags([]); setStep("form"); setEarnedXP(0);
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-32px)] max-w-[400px] -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-3xl shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200 overflow-hidden max-h-[90vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === "form" ? (
              <motion.div key="form" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.18 }} className="p-6">
                <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground z-10" aria-label="Fechar"><X size={15} /></Dialog.Close>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-violet-100 dark:bg-violet-900/40 mb-4"><Share2 size={20} className="text-violet-600 dark:text-violet-400" /></div>
                <Dialog.Title className="text-base font-semibold text-foreground mb-1">Publicar na comunidade</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-5">Compartilhe conhecimento e ganhe XP</Dialog.Description>

                <div className="space-y-4">
                  <div>
                    <label className={LABEL_CLS}>Tipo de publicação</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(Object.entries(POST_TYPE_CONFIG) as [PostType, typeof POST_TYPE_CONFIG[PostType]][]).map(([key, cfg]) => {
                        const Icon = cfg.icon; const sel = postType === key; const xp = XP_MAP[key];
                        return (
                          <motion.button key={key} whileTap={{ scale: 0.94 }} onClick={() => setPostType(key)} className={cn("flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all relative overflow-hidden", sel ? cn(cfg.bg, cfg.color, "border-transparent") : "border-border bg-muted text-muted-foreground hover:border-primary/30")}>
                            <Icon size={13} />{cfg.label}
                            <span className={cn("ml-auto text-[10px] font-bold", sel ? "opacity-80" : "opacity-40")}>+{xp}XP</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Título *</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder={postType === "questao" ? "Qual é a sua dúvida?" : postType === "recurso" ? "Qual recurso você recomenda?" : postType === "trilha" ? "Conte sobre sua trilha..." : "O que você conquistou?"} className={INPUT_CLS} autoFocus />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Texto *</label>
                    <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Compartilhe detalhes, contexto e referências..." rows={4} className={cn(INPUT_CLS, "resize-none")} />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Tags <span className="text-muted-foreground/60">(até 5)</span></label>
                    <div className="flex gap-2 mb-2">
                      <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addTag()} placeholder="carreira, dados, produto..." className={cn(INPUT_CLS, "flex-1 text-xs")} />
                      <motion.button whileTap={{ scale: 0.94 }} onClick={addTag} disabled={!tagInput.trim() || tags.length >= 5} className="px-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-40 flex items-center"><Plus size={15} /></motion.button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map(t => (
                          <span key={t} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-muted text-xs font-medium text-muted-foreground">
                            #{t}
                            <button onClick={() => setTags(prev => prev.filter(x => x !== t))} className="hover:text-red-500 transition-colors"><X size={10} /></button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                    <Zap size={14} className="text-amber-500 flex-shrink-0" />
                    <span className="text-xs text-amber-700 dark:text-amber-400 font-medium">Você vai ganhar +{XP_MAP[postType]} XP ao publicar</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 mt-5">
                  <motion.button whileTap={{ scale: 0.97 }} onClick={handlePublish} disabled={!canSubmit} className={cn("w-full py-3 rounded-2xl text-sm font-semibold transition-all flex items-center justify-center gap-2", canSubmit ? "bg-primary text-primary-foreground hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed")}>
                    <Send size={15} />Publicar na comunidade
                  </motion.button>
                  <button onClick={handleClose} className="w-full py-3 rounded-2xl text-sm font-medium text-muted-foreground bg-muted hover:bg-secondary transition-all">Cancelar</button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="p-6 text-center">
                <div className="relative flex items-center justify-center mb-4">
                  {[...Array(8)].map((_, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0], x: Math.cos(i * 45 * (Math.PI / 180)) * 28, y: Math.sin(i * 45 * (Math.PI / 180)) * 28 }} transition={{ delay: 0.1 + i * 0.04, duration: 0.5 }} className="absolute w-1.5 h-1.5 rounded-full bg-violet-400" />
                  ))}
                  <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.05, type: "spring", stiffness: 420, damping: 22 }} className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
                    <Share2 size={28} className="text-violet-600 dark:text-violet-400" />
                  </motion.div>
                </div>
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl font-black text-foreground mb-1">+{earnedXP} XP</motion.p>
                <Dialog.Title className="text-base font-semibold text-foreground mb-2">Publicado!</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground mb-5">Sua contribuição está na comunidade. Outros profissionais em transição vão se beneficiar do seu conhecimento.</Dialog.Description>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleClose} className="w-full py-3 rounded-2xl text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all">Ver na comunidade</motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── PostChatSheet ────────────────────────────────────────────────────────────
export function PostChatSheet({ post, comments, onClose, onSend }: {
  post: CommunityPost;
  comments: PostComment[];
  onClose: () => void;
  onSend: (body: string) => void;
}) {
  const [text, setText]               = useState("");
  const [bodyExpanded, setBodyExpanded] = useState(false);
  const [sending, setSending]         = useState(false);
  const listRef    = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t = setTimeout(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }); }, 180);
    return () => clearTimeout(t);
  }, []);

  const autoGrow = (el: HTMLTextAreaElement) => { el.style.height = "auto"; el.style.height = Math.min(el.scrollHeight, 120) + "px"; };

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    setTimeout(() => {
      onSend(trimmed);
      setText("");
      setSending(false);
      if (textareaRef.current) { textareaRef.current.style.height = "auto"; }
      setTimeout(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }); }, 80);
    }, 250);
  };

  const typeCfg  = POST_TYPE_CONFIG[post.type];
  const TypeIcon = typeCfg.icon;
  const bodyUrls  = extractUrls(post.body);
  const inputUrls = extractUrls(text);
  const BODY_THRESHOLD = 200;
  const bodyIsTruncatable = post.body.length > BODY_THRESHOLD;

  const relativeTime = (iso: string) => {
    const diffDays = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
    if (diffDays === 0) return "hoje";
    if (diffDays === 1) return "ontem";
    if (diffDays < 7) return `${diffDays}d atrás`;
    return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  };

  return (
    <Dialog.Root open onOpenChange={open => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40 backdrop-blur-[2px]" />
        <Dialog.Content className="fixed bottom-0 left-0 right-0 z-50 max-w-lg mx-auto bg-background rounded-t-3xl flex flex-col outline-none" style={{ maxHeight: "90dvh" }} aria-label="Chat da publicação" aria-describedby={undefined}>
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0"><div className="w-10 h-1 rounded-full bg-border" /></div>

          <div className="px-4 pb-3 border-b border-border flex-shrink-0">
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold", typeCfg.bg, typeCfg.color)}><TypeIcon size={9} />{typeCfg.label}</span>
                <span className="text-[10px] text-muted-foreground">{post.authorName}</span>
                <span className="text-[10px] text-muted-foreground">·</span>
                <span className="text-[10px] text-muted-foreground">{relativeTime(post.createdAt)}</span>
              </div>
              <button onClick={onClose} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors flex-shrink-0" aria-label="Fechar"><X size={14} /></button>
            </div>
            <Dialog.Title className="text-sm font-semibold text-foreground leading-snug mb-1.5">{post.title}</Dialog.Title>
            <div>
              <p className={cn("text-xs text-muted-foreground leading-relaxed", !bodyExpanded && bodyIsTruncatable && "line-clamp-2")}>
                {renderBodyWithLinks(post.body, "text-xs text-muted-foreground leading-relaxed")}
              </p>
              {bodyIsTruncatable && (
                <button onClick={() => setBodyExpanded(p => !p)} className="text-[11px] text-primary font-medium mt-0.5 hover:underline underline-offset-2 transition-colors">
                  {bodyExpanded ? "Ver menos" : "Ver mais"}
                </button>
              )}
              {bodyUrls.map(url => <LinkPreviewCard key={url} url={url} />)}
            </div>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto px-4 pt-3 pb-2 min-h-0">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] text-muted-foreground font-medium whitespace-nowrap">{comments.length === 0 ? "Nenhuma resposta ainda" : `${comments.length} ${comments.length === 1 ? "resposta" : "respostas"}`}</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            {comments.length === 0 && (
              <div className="py-6 text-center">
                <MessageCircle size={22} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground font-medium">Seja o primeiro a responder</p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">Sua experiência pode ajudar quem está na mesma jornada.</p>
              </div>
            )}
            <div className="space-y-4 pb-1">
              {comments.map(c => {
                const commentUrls = extractUrls(c.body);
                return (
                  <motion.div key={c.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2.5">
                    <div className={cn("w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5", c.isFromUser ? "bg-gradient-to-br from-primary to-accent" : "bg-gradient-to-br from-slate-400 to-slate-600")}>{c.authorInitials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-1.5 flex-wrap mb-0.5">
                        <span className="text-[11px] font-semibold text-foreground">{c.authorName}</span>
                        {c.isFromUser && <span className="text-[9px] font-bold bg-primary/10 text-primary px-1 py-0.5 rounded">você</span>}
                        <span className="text-[10px] text-muted-foreground ml-auto">{relativeTime(c.createdAt)}</span>
                      </div>
                      <p className="text-[12px] text-foreground leading-relaxed">{renderBodyWithLinks(c.body, "text-[12px] text-foreground leading-relaxed")}</p>
                      {commentUrls.map(url => <LinkPreviewCard key={url} url={url} />)}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="px-4 pt-2 pb-6 border-t border-border flex-shrink-0">
            <AnimatePresence>
              {inputUrls.length > 0 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-2 overflow-hidden">
                  {inputUrls.map(url => <LinkPreviewCard key={url} url={url} />)}
                </motion.div>
              )}
            </AnimatePresence>
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mb-0.5">MC</div>
              <div className="flex-1">
                <textarea ref={textareaRef} value={text} onChange={e => { setText(e.target.value); autoGrow(e.target); }} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }} placeholder="Escreva uma resposta… (Enter para enviar)" rows={1} className="w-full resize-none rounded-2xl border border-border bg-muted px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all leading-relaxed" style={{ minHeight: 40, maxHeight: 120 }} />
              </div>
              <motion.button whileTap={{ scale: 0.9 }} onClick={handleSend} disabled={!text.trim() || sending} className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all", sending ? "bg-green-500 text-white" : "bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90")} aria-label="Enviar resposta">
                {sending ? <CheckCircle2 size={15} /> : <Send size={15} />}
              </motion.button>
            </div>
            <p className="text-[10px] text-muted-foreground/50 mt-1.5 pl-9">Shift+Enter para nova linha</p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// ─── PostCard ─────────────────────────────────────────────────────────────────
export function PostCard({ post, liked, onLike, onOpenChat, onToggleAnswered }: {
  post: CommunityPost;
  liked: boolean;
  onLike: (id: string) => void;
  onOpenChat: (id: string) => void;
  onToggleAnswered?: (id: string) => void;
}) {
  const typeCfg = POST_TYPE_CONFIG[post.type];
  const TypeIcon = typeCfg.icon;
  const [bodyExpanded, setBodyExpanded] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);
  const [linkedinFeedback, setLinkedinFeedback] = useState(false);
  const CARD_BODY_THRESHOLD = 200;
  const bodyIsTruncatable = post.body.length > CARD_BODY_THRESHOLD;

  const copyLabels: Record<string, string> = {
    recurso: "Recurso copiado!",
    questao: "Dúvida copiada!",
    trilha: "Trilha copiada!",
    conquista: "Conquista copiada!",
  };

  const handleCopy = async () => {
    const urlLine = post.body.match(/https?:\/\/\S+/)?.[0];
    const lines = [
      `📌 ${post.title}`,
      "",
      post.body.replace(/https?:\/\/\S+/g, "").trim(),
      ...(urlLine ? ["", urlLine] : []),
      ...(post.tags.length ? ["", post.tags.map(t => `#${t}`).join(" ")] : []),
    ];
    await navigator.clipboard.writeText(lines.join("\n"));
    setShareFeedback(true);
    setTimeout(() => setShareFeedback(false), 2200);
  };

  const relativeTime = (iso: string) => {
    const diffDays = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
    if (diffDays === 0) return "hoje";
    if (diffDays === 1) return "ontem";
    if (diffDays < 7) return `${diffDays}d`;
    return formatDate(iso);
  };

  return (
    <motion.div variants={listItem} className={cn("bg-card border rounded-2xl p-4 transition-all", post.isFromUser ? "border-primary/30 bg-primary/[0.02]" : "border-border")}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0", post.isFromUser ? "bg-gradient-to-br from-primary to-accent" : "bg-gradient-to-br from-slate-400 to-slate-600")}>{post.authorInitials}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-foreground">{post.authorName}</span>
            {post.isFromUser && <span className="text-[9px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-md">você</span>}
            <span className="text-[10px] text-muted-foreground">·</span>
            <span className="text-[10px] text-muted-foreground truncate">{post.authorTransition}</span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold", typeCfg.bg, typeCfg.color)}><TypeIcon size={9} />{typeCfg.label}</span>
            {post.type === "questao" && post.isFromUser && onToggleAnswered ? (
              <motion.button whileTap={{ scale: 0.92 }} onClick={() => onToggleAnswered(post.id)} title={post.isAnswered ? "Desmarcar como respondida" : "Marcar como respondida"} className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold transition-all", post.isAnswered ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/60" : "bg-muted text-muted-foreground hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-300 border border-dashed border-border")}>
                <CheckCircle2 size={9} />{post.isAnswered ? "Respondida" : "Marcar respondida"}
              </motion.button>
            ) : post.isAnswered ? (
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"><CheckCircle2 size={9} />Respondida</span>
            ) : null}
            <span className="text-[10px] text-muted-foreground ml-auto flex-shrink-0">{relativeTime(post.createdAt)}</span>
          </div>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-foreground mb-1.5 leading-snug">{post.title}</h3>
      <div className="mb-3">
        <p className={cn("text-xs text-muted-foreground leading-relaxed", !bodyExpanded && bodyIsTruncatable && "line-clamp-2")}>{post.body}</p>
        {bodyIsTruncatable && <button onClick={() => setBodyExpanded(p => !p)} className="mt-1 text-[11px] text-primary font-semibold hover:underline underline-offset-2 transition-colors">{bodyExpanded ? "Ver menos" : "Ver mais"}</button>}
      </div>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.slice(0, 4).map(t => <span key={t} className="px-2 py-0.5 rounded-lg bg-muted text-[10px] font-medium text-muted-foreground">#{t}</span>)}
        </div>
      )}

      <div className="flex items-center gap-3 pt-2 border-t border-border/60">
        <motion.button whileTap={{ scale: 0.88 }} onClick={() => onLike(post.id)} className={cn("flex items-center gap-1.5 text-xs font-medium transition-colors", liked ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
          <ThumbsUp size={13} fill={liked ? "currentColor" : "none"} />{post.likes + (liked ? 1 : 0)}
        </motion.button>
        <motion.button whileTap={{ scale: 0.88 }} onClick={() => onOpenChat(post.id)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors">
          <MessageCircle size={13} />{post.answers}
        </motion.button>
        <div className="ml-auto flex items-center gap-2">
          <motion.button whileTap={{ scale: 0.88 }} onClick={handleCopy} title="Copiar conteúdo" className={cn("flex items-center gap-1 text-xs font-medium transition-colors", shareFeedback ? "text-green-600 dark:text-green-400" : "text-muted-foreground hover:text-foreground")}>
            {shareFeedback ? <><CheckCircle2 size={13} />{copyLabels[post.type]}</> : <><Copy size={13} />Copiar</>}
          </motion.button>
          <span className="w-px h-3 bg-border/60" />
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => {
              const summary = `${post.title}\n\n${post.body.slice(0, 200)}${post.body.length > 200 ? "…" : ""}`;
              window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(summary)}`, "_blank", "noopener,noreferrer,width=600,height=600");
              setLinkedinFeedback(true);
              setTimeout(() => setLinkedinFeedback(false), 2200);
            }}
            title="Compartilhar no LinkedIn"
            className={cn("flex items-center gap-1 text-xs font-medium transition-colors", linkedinFeedback ? "text-[#0A66C2]" : "text-muted-foreground hover:text-[#0A66C2]")}
          >
            {linkedinFeedback ? <><CheckCircle2 size={13} />Compartilhado!</> : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="4" />
                  <line x1="7" y1="10" x2="7" y2="17" />
                  <circle cx="7" cy="7" r="1.2" fill="currentColor" stroke="none" />
                  <path d="M11 10v7m0-4c0-2 6-2 6 0v4" />
                </svg>
                LinkedIn
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── CommunityScreen ──────────────────────────────────────────────────────────
export function CommunityScreen() {
  const { user, updateUser, posts, addPost, updatePost } = useData();
  const [likedIds, setLikedIds]   = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"todos" | PostType>("todos");
  const [showCreate, setShowCreate]     = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [chatPostId, setChatPostId]     = useState<string | null>(null);
  const [comments, setComments]         = useState<Record<string, PostComment[]>>(SEED_COMMENTS);
  const [searchQuery, setSearchQuery]   = useState("");

  const userPosts        = posts.filter(p => p.isFromUser);
  const communityPosts   = userPosts.length;
  const communityAnswers = Object.values(comments).flat().filter(c => c.isFromUser).length;
  const POST_XP: Record<PostType, number> = { questao: 10, recurso: 15, trilha: 30, conquista: 20 };
  const communityXP      = userPosts.reduce((sum, p) => sum + POST_XP[p.type], 0) + communityAnswers * 5;
  const userBadgeId      = COMMUNITY_LEADERBOARD.find(m => m.isUser)?.badge;

  const normalizeQuery = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  const filteredPosts = (() => {
    const byTab = activeTab === "todos" ? posts : posts.filter(p => p.type === activeTab);
    const q = normalizeQuery(searchQuery.trim());
    if (!q) return byTab;
    return byTab.filter(p => normalizeQuery(p.title).includes(q) || normalizeQuery(p.body).includes(q) || p.tags.some(t => normalizeQuery(t).includes(q)));
  })();

  const handleLike = (id: string) => {
    setLikedIds(prev => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  const handlePublish = (post: CommunityPost, xpEarned: number) => {
    addPost(post);
    updateUser({ totalXP: user.totalXP + xpEarned });
  };

  const handleToggleAnswered = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (!post || !post.isFromUser || post.type !== "questao") return;
    updatePost(id, { isAnswered: !post.isAnswered });
  };

  const handleSendComment = (postId: string, body: string) => {
    const newComment: PostComment = {
      id: `c${Date.now()}`,
      authorName: user.name,
      authorInitials: user.name.slice(0, 2).toUpperCase(),
      authorTransition: "UX → Engenharia de Software",
      body,
      createdAt: new Date().toISOString().slice(0, 10),
      isFromUser: true,
    };
    setComments(prev => ({ ...prev, [postId]: [...(prev[postId] ?? []), newComment] }));
    updatePost(postId, { answers: (posts.find(p => p.id === postId)?.answers ?? 0) + 1 });
  };

  const tabs: { id: "todos" | PostType; label: string }[] = [
    { id: "todos",    label: "Todos" },
    { id: "questao",  label: "Dúvidas" },
    { id: "recurso",  label: "Recursos" },
    { id: "trilha",   label: "Trilhas" },
    { id: "conquista", label: "Conquistas" },
  ];

  return (
    <div className="px-4 pt-12 pb-28 max-w-lg mx-auto md:max-w-5xl md:px-8 md:pt-8 md:pb-10">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Comunidade</h1>
          <p className="text-sm text-muted-foreground">Aprender juntos, crescer juntos</p>
        </div>
        <motion.button whileTap={{ scale: 0.94 }} onClick={() => setShowLeaderboard(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-800/30 text-amber-700 dark:text-amber-400 text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
          <Trophy size={12} />Ranking
        </motion.button>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="mb-5 bg-gradient-to-r from-violet-600 to-primary rounded-2xl p-4 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-white/5 translate-x-12 -translate-y-8 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-sm font-bold flex-shrink-0">{user.avatarInitials}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-white/70 text-xs truncate">UX → Engenharia de Software</p>
            </div>
            {userBadgeId && (() => {
              const bc = BADGE_CONFIG[userBadgeId]; const BIcon = bc.icon;
              return (
                <div className="ml-auto flex-shrink-0">
                  <span className="flex items-center gap-1 px-2 py-1 rounded-xl bg-white/15 text-xs font-semibold backdrop-blur-sm"><BIcon size={11} />{bc.label}</span>
                </div>
              );
            })()}
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: "XP da comunidade", value: communityXP },
              { label: "Publicações",       value: communityPosts },
              { label: "Respostas úteis",   value: communityAnswers },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-xl p-2 text-center">
                <p className="text-base font-bold">{s.value}</p>
                <p className="text-[10px] text-white/70 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowCreate(true)} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/20 hover:bg-white/25 text-sm font-semibold transition-all">
            <Share2 size={14} />Compartilhar trilha ou conhecimento
          </motion.button>
        </div>
      </motion.div>

      <div className="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200/60 dark:border-amber-800/30">
        <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1.5">Como ganhar XP na comunidade</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {[
            { action: "Publicar dúvida", xp: "+10" },
            { action: "Indicar recurso", xp: "+15" },
            { action: "Compartilhar trilha", xp: "+30" },
            { action: "Responder dúvida", xp: "+20" },
          ].map(x => (
            <div key={x.action} className="flex items-center justify-between">
              <span className="text-[11px] text-amber-700 dark:text-amber-400">{x.action}</span>
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">{x.xp} XP</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mb-3">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Buscar por palavra-chave, tema ou #tag…" className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all" aria-label="Buscar publicações" />
        {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Limpar busca"><X size={14} /></button>}
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
        {tabs.map(t => (
          <motion.button key={t.id} whileTap={{ scale: 0.94 }} onClick={() => { setActiveTab(t.id); setSearchQuery(""); }} className={cn("px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0", activeTab === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary")}>
            {t.label}
            {t.id !== "todos" && <span className={cn("ml-1.5 text-[10px]", activeTab === t.id ? "opacity-70" : "opacity-50")}>{posts.filter(p => p.type === t.id).length}</span>}
          </motion.button>
        ))}
      </div>

      <div className="md:grid md:grid-cols-[1fr_260px] md:gap-6 md:items-start">
        <motion.div className="space-y-3" variants={listContainer} initial="initial" animate="animate" key={activeTab}>
          {filteredPosts.length === 0 ? (
            <div className="py-12 text-center">
              <Search size={28} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground font-medium">{searchQuery.trim() ? `Nenhum resultado para "${searchQuery.trim()}"` : "Nenhuma publicação nesta categoria."}</p>
              {searchQuery.trim() ? (
                <button onClick={() => setSearchQuery("")} className="mt-2 text-xs text-primary font-medium hover:underline">Limpar busca</button>
              ) : (
                <button onClick={() => setShowCreate(true)} className="mt-2 text-xs text-primary font-medium hover:underline">Seja o primeiro a publicar</button>
              )}
            </div>
          ) : (
            filteredPosts.map(post => (
              <PostCard key={post.id} post={post} liked={likedIds.has(post.id)} onLike={handleLike} onOpenChat={setChatPostId} onToggleAnswered={handleToggleAnswered} />
            ))
          )}
        </motion.div>

        <aside className="hidden md:block sticky top-4 space-y-3">
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center"><Trophy size={13} className="text-amber-600 dark:text-amber-400" /></div>
              <h3 className="text-sm font-semibold text-foreground">Ranking da comunidade</h3>
            </div>
            <div className="space-y-2.5">
              {COMMUNITY_LEADERBOARD.map((member, idx) => (
                <div key={member.name} className={cn("flex items-center gap-2.5 p-2 rounded-xl", member.isUser ? "bg-primary/5 border border-primary/20" : "")}>
                  <span className={cn("text-[11px] font-bold w-4 text-center flex-shrink-0", idx === 0 ? "text-amber-500" : idx === 1 ? "text-slate-400" : idx === 2 ? "text-orange-400" : "text-muted-foreground")}>{idx + 1}</span>
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">{member.initials}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-foreground truncate">{member.name}</p>
                    <p className="text-[10px] text-muted-foreground">{member.xp} XP</p>
                  </div>
                  {member.badge && (() => {
                    const bc = BADGE_CONFIG[member.badge]; const BIcon = bc.icon;
                    return <span className={`flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-md flex-shrink-0 ${bc.bg} ${bc.color}`}><BIcon size={9} />{bc.label}</span>;
                  })()}
                </div>
              ))}
            </div>
          </div>
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setShowCreate(true)} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all">
            <Plus size={15} />Publicar na comunidade
          </motion.button>
        </aside>
      </div>

      <motion.button whileTap={{ scale: 0.94 }} onClick={() => setShowCreate(true)} className="md:hidden fixed bottom-24 right-4 z-30 flex items-center gap-2 px-4 py-3 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 font-semibold text-sm hover:opacity-90 transition-all" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 22 }}>
        <Plus size={16} />Publicar
      </motion.button>

      <Dialog.Root open={showLeaderboard} onOpenChange={(o) => !o && setShowLeaderboard(false)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-32px)] max-w-[380px] max-h-[85vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 bg-card border border-border rounded-3xl p-6 shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200">
            <Dialog.Close className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors text-muted-foreground" aria-label="Fechar"><X size={15} /></Dialog.Close>
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-amber-100 dark:bg-amber-900/40 mb-4"><Trophy size={20} className="text-amber-600 dark:text-amber-400" /></div>
            <Dialog.Title className="text-base font-semibold text-foreground mb-1">Ranking da comunidade</Dialog.Title>
            <Dialog.Description className="text-sm text-muted-foreground mb-4">Top contribuidores deste mês</Dialog.Description>
            <div className="space-y-2 mb-5">
              {COMMUNITY_LEADERBOARD.map((member, i) => (
                <motion.div key={member.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className={cn("flex items-center gap-3 p-3 rounded-xl border transition-all", member.isUser ? "border-primary/30 bg-primary/5" : i === 0 ? "border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20" : "border-border bg-muted/40")}>
                  <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0", i === 0 ? "bg-amber-400 text-white" : i === 1 ? "bg-slate-400 text-white" : i === 2 ? "bg-orange-400 text-white" : "bg-muted text-muted-foreground")}>{i + 1}</div>
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">{member.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-semibold text-foreground">{member.name}</span>
                      {member.isUser && <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold">você</span>}
                      {member.badge && (() => {
                        const bc = BADGE_CONFIG[member.badge]; const BIcon = bc.icon;
                        return <span className={`flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${bc.bg} ${bc.color}`}><BIcon size={9} />{bc.label}</span>;
                      })()}
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">{member.transition}</p>
                    <p className="text-[10px] text-muted-foreground">{member.posts} posts · {member.answers} respostas</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={cn("text-xs font-bold", i === 0 ? "text-amber-600 dark:text-amber-400" : "text-foreground")}>{member.xp} XP</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
                <Zap size={12} className="text-primary" />Como ganhar badges
              </p>
              {(["ajuda", "compartilhamento", "trajetoria"] as const).map(cat => {
                const catLabel = cat === "ajuda" ? "Ajuda" : cat === "compartilhamento" ? "Compartilhamento" : "Trajetória";
                const entries = Object.entries(BADGE_CONFIG).filter(([, v]) => v.category === cat);
                return (
                  <div key={cat} className="mb-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{catLabel}</p>
                    <div className="space-y-1.5">
                      {entries.map(([id, bc]) => {
                        const BIcon = bc.icon;
                        return (
                          <div key={id} className="flex items-start gap-2">
                            <span className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-md ${bc.bg}`}>
                              <BIcon size={10} className={bc.color} />
                            </span>
                            <div>
                              <span className={`text-[11px] font-semibold ${bc.color}`}>{bc.label}</span>
                              <p className="text-[10px] text-muted-foreground leading-snug">{bc.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <CreatePostModal open={showCreate} onClose={() => setShowCreate(false)} onPublish={handlePublish} />

      {chatPostId && (() => {
        const chatPost = posts.find(p => p.id === chatPostId);
        if (!chatPost) return null;
        return <PostChatSheet post={chatPost} comments={comments[chatPostId] ?? []} onClose={() => setChatPostId(null)} onSend={body => handleSendComment(chatPostId, body)} />;
      })()}
    </div>
  );
}