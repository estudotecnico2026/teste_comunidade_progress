/**
 * PROGRESS APP - SISTEMA DE ÍCONES
 * Mapeamento completo de ícones do Lucide React para todas as jornadas
 * Compatível com Light e Dark Mode
 * 
 * IMPORTANTE: Sempre verificar a disponibilidade dos ícones em lucide-react antes de usar
 */

import {
  // Navegação Principal
  Home,
  LayoutDashboard,
  Target,
  BookOpen,
  TrendingUp,
  Trophy,
  Calendar,
  User,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  LogOut,
  LogIn,
  
  // Aprendizado & Educação
  GraduationCap,
  Book,
  BookMarked,
  BookCheck,
  FileText,
  Video,
  Headphones,
  Code,
  Users,
  MessageSquare,
  Lightbulb,
  Brain,
  
  // Objetivos & Metas
  Flag,
  CheckCircle,
  CheckCircle2,
  Circle,
  CircleDot,
  Crosshair,
  Milestone,
  Mountain,
  
  // Progresso & Tempo
  Clock,
  Timer,
  AlarmClock,
  Hourglass,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  Flame,
  Zap,
  Activity,
  
  // Status & Feedback
  CheckSquare,
  Square,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  Loader2,
  
  // Ações
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  Upload,
  Download,
  Copy,
  Share2,
  ExternalLink,
  Link,
  RefreshCw,
  RotateCw,
  
  // Interface
  Eye,
  EyeOff,
  Filter,
  SlidersHorizontal,
  Star,
  StarHalf,
  StarOff,
  Heart,
  HeartOff,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  
  // Áreas de Conhecimento
  Code2,
  Palette,
  Megaphone,
  Briefcase,
  Database,
  ClipboardList,
  MessageCircle,
  Languages,
  HeartPulse,
  DollarSign,
  Calculator,
  Wrench,
  
  // Conquistas & Gamificação
  Award,
  Medal,
  Gift,
  PartyPopper,
  Sparkles,
  Crown,
  
  // Documentos & Arquivos
  Clipboard,
  ClipboardCheck,
  Folder,
  FolderOpen,
  File,
  FileCheck,
  
  // Navegação & Controles
  MoreVertical,
  MoreHorizontal,
  Grid,
  List,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  
  // Interface Avançada
  Sun,
  Moon,
  Monitor,
  Lock,
  Unlock,
  Key,
  Shield,
  ShieldCheck,
  Mail,
  Send,
  Phone,
  
  // Status de Estudo
  Play,
  Pause,
  SkipForward,
  SkipBack,
  
  // Níveis
  TrendingDown,
  Minus as MinusIcon,
  Equal,
  
  // Plantas (Níveis de Carreira)
  Sprout,
  Leaf,
  Trees,
  
  // Outros
  BarChart3,
  PieChart,
  LineChart,
  TrendingDown as TrendDown,
  ArrowUpDown,
  Package,
  Tag,
  Image,
  Camera,
  MapPin,
  Navigation,
  Compass,
  Cloud,
  CloudOff,
  Wifi,
  WifiOff
} from 'lucide-react';

/**
 * NAVEGAÇÃO PRINCIPAL
 */
export const NAVIGATION_ICONS = {
  home: Home,
  dashboard: LayoutDashboard,
  goals: Target,
  studies: BookOpen,
  progress: TrendingUp,
  achievements: Trophy,
  calendar: Calendar,
  profile: User,
  settings: Settings,
  search: Search,
  notifications: Bell,
  menu: Menu,
  close: X,
  logout: LogOut,
  login: LogIn,
} as const;

/**
 * TIPOS DE ESTUDO
 */
export const STUDY_TYPE_ICONS = {
  curso: GraduationCap,
  artigo: FileText,
  video: Video,
  livro: Book,
  podcast: Headphones,
  projeto: Code,
  workshop: Users,
  mentoria: MessageSquare,
  documentacao: BookMarked,
  tutorial: Play,
  ebook: BookCheck,
} as const;

/**
 * ÁREAS DE CONHECIMENTO
 */
export const KNOWLEDGE_AREA_ICONS = {
  desenvolvimento: Code2,
  design: Palette,
  marketing: Megaphone,
  negocios: Briefcase,
  dados: Database,
  gestao: ClipboardList,
  comunicacao: MessageCircle,
  idiomas: Languages,
  saude: HeartPulse,
  financas: DollarSign,
  engenharia: Wrench,
  matematica: Calculator,
  outro: BookOpen,
} as const;

/**
 * STATUS DE ESTUDOS
 */
export const STUDY_STATUS_ICONS = {
  'nao-iniciado': Circle,
  'em-andamento': Clock,
  'pausado': Pause,
  'concluido': CheckCircle2,
  'bloqueado': Lock,
} as const;

/**
 * STATUS DE OBJETIVOS
 */
export const GOAL_STATUS_ICONS = {
  ativo: Target,
  alcancado: CheckCircle,
  abandonado: XCircle,
  pausado: Pause,
  'em-andamento': Activity,
} as const;

/**
 * NÍVEIS DE CARREIRA
 */
export const CAREER_LEVEL_ICONS = {
  estagiario: Sprout,
  junior: Leaf,
  pleno: Trees,
  senior: Crown,
  especialista: Star,
  iniciante: Circle,
  intermediario: CircleDot,
  avancado: CheckCircle,
} as const;

/**
 * PRIORIDADES
 */
export const PRIORITY_ICONS = {
  alta: AlertCircle,
  media: MinusIcon,
  baixa: TrendingDown,
  critica: AlertTriangle,
} as const;

/**
 * ÍCONES DE PROGRESSO
 */
export const PROGRESS_ICONS = {
  barraProgresso: Activity,
  tendenciaSubindo: TrendingUp,
  tendenciaDescendo: TrendDown,
  meta: Target,
  milestone: Milestone,
  conquista: Trophy,
  nivel: Zap,
  streak: Flame,
  tempo: Clock,
  calendario: Calendar,
} as const;

/**
 * ÍCONES DE AÇÕES
 */
export const ACTION_ICONS = {
  // CRUD
  adicionar: Plus,
  remover: Minus,
  editar: Edit,
  excluir: Trash2,
  salvar: Save,
  
  // Navegação
  voltar: ArrowLeft,
  avancar: ArrowRight,
  expandir: ChevronDown,
  recolher: ChevronUp,
  esquerda: ChevronLeft,
  direita: ChevronRight,
  
  // Mídia
  upload: Upload,
  download: Download,
  
  // Compartilhamento
  compartilhar: Share2,
  copiar: Copy,
  link: Link,
  linkExterno: ExternalLink,
  
  // Interação
  favoritar: Heart,
  desfavoritar: HeartOff,
  marcar: Bookmark,
  desmarcar: BookmarkCheck,
  like: ThumbsUp,
  dislike: ThumbsDown,
  
  // Atualização
  atualizar: RefreshCw,
  sincronizar: RotateCw,
  
  // Visualização
  visualizar: Eye,
  ocultar: EyeOff,
  
  // Outros
  mais: MoreVertical,
  maisHorizontal: MoreHorizontal,
  buscar: Search,
  filtrar: Filter,
  configurar: SlidersHorizontal,
} as const;

/**
 * ÍCONES DE STATUS & FEEDBACK
 */
export const STATUS_ICONS = {
  sucesso: CheckCircle2,
  erro: XCircle,
  aviso: AlertTriangle,
  info: Info,
  alerta: AlertCircle,
  ajuda: HelpCircle,
  carregando: Loader2,
  
  // Checkboxes & Radio
  checkboxMarcado: CheckSquare,
  checkboxDesmarcado: Square,
  radioSelecionado: CircleDot,
  radioDesmarcado: Circle,
  
  // Confirmação
  confirmado: CheckCircle,
  pendente: Clock,
  cancelado: XCircle,
} as const;

/**
 * ÍCONES DE INTERFACE
 */
export const UI_ICONS = {
  // Filtros & Ordenação
  filtrar: Filter,
  ordenar: ArrowUpDown,
  configuracoes: SlidersHorizontal,
  
  // Visualização
  grade: Grid,
  lista: List,
  maximizar: Maximize2,
  minimizar: Minimize2,
  zoomMais: ZoomIn,
  zoomMenos: ZoomOut,
  
  // Avaliação
  estrela: Star,
  estrelaMeia: StarHalf,
  estrelaVazia: StarOff,
  
  // Estados
  online: Wifi,
  offline: WifiOff,
  nuvem: Cloud,
  nuvemOff: CloudOff,
} as const;

/**
 * ÍCONES DE TEMA
 */
export const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  auto: Monitor,
} as const;

/**
 * ÍCONES DE TEMPO & CALENDÁRIO
 */
export const TIME_ICONS = {
  relogio: Clock,
  timer: Timer,
  alarme: AlarmClock,
  ampulheta: Hourglass,
  calendario: Calendar,
  calendarioDias: CalendarDays,
  calendarioCheck: CalendarCheck,
  calendarioX: CalendarX,
} as const;

/**
 * ÍCONES DE CONQUISTAS & GAMIFICAÇÃO
 */
export const ACHIEVEMENT_ICONS = {
  trofeu: Trophy,
  premio: Award,
  medalha: Medal,
  presente: Gift,
  celebracao: PartyPopper,
  brilho: Sparkles,
  coroa: Crown,
  estrela: Star,
  fogo: Flame,
  raio: Zap,
} as const;

/**
 * ÍCONES DE DOCUMENTOS & ARQUIVOS
 */
export const DOCUMENT_ICONS = {
  area transferencia: Clipboard,
  areaTransferenciaCheck: ClipboardCheck,
  pasta: Folder,
  pastaAberta: FolderOpen,
  arquivo: File,
  arquivoCheck: FileCheck,
  documento: FileText,
} as const;

/**
 * ÍCONES DE GRÁFICOS & ESTATÍSTICAS
 */
export const CHART_ICONS = {
  barras: BarChart3,
  pizza: PieChart,
  linha: LineChart,
  atividade: Activity,
  tendenciaSubindo: TrendingUp,
  tendenciaDescendo: TrendDown,
} as const;

/**
 * ÍCONES DE SEGURANÇA
 */
export const SECURITY_ICONS = {
  cadeado: Lock,
  desbloqueado: Unlock,
  chave: Key,
  escudo: Shield,
  escudoVerificado: ShieldCheck,
} as const;

/**
 * ÍCONES DE COMUNICAÇÃO
 */
export const COMMUNICATION_ICONS = {
  email: Mail,
  enviar: Send,
  telefone: Phone,
  mensagem: MessageCircle,
  mensagens: MessageSquare,
} as const;

/**
 * ÍCONES DE LOCALIZAÇÃO
 */
export const LOCATION_ICONS = {
  pin: MapPin,
  navegacao: Navigation,
  bussola: Compass,
} as const;

/**
 * ÍCONES DE MÍDIA
 */
export const MEDIA_ICONS = {
  imagem: Image,
  camera: Camera,
  video: Video,
  play: Play,
  pause: Pause,
  avancar: SkipForward,
  voltar: SkipBack,
} as const;

/**
 * ÍCONES DE OUTROS
 */
export const MISC_ICONS = {
  pacote: Package,
  tag: Tag,
  lampada: Lightbulb,
  cerebro: Brain,
  bandeira: Flag,
  alvo: Crosshair,
  montanha: Mountain,
} as const;

/**
 * MAPEAMENTO DE ÍCONES POR CONTEXTO
 * Facilita a escolha do ícone certo para cada situação
 */
export const ICON_BY_CONTEXT = {
  // Estudos - Status
  'estudo.nao-iniciado': STUDY_STATUS_ICONS['nao-iniciado'],
  'estudo.em-andamento': STUDY_STATUS_ICONS['em-andamento'],
  'estudo.pausado': STUDY_STATUS_ICONS.pausado,
  'estudo.concluido': STUDY_STATUS_ICONS.concluido,
  
  // Estudos - Tipos
  'estudo.curso': STUDY_TYPE_ICONS.curso,
  'estudo.artigo': STUDY_TYPE_ICONS.artigo,
  'estudo.video': STUDY_TYPE_ICONS.video,
  'estudo.livro': STUDY_TYPE_ICONS.livro,
  'estudo.podcast': STUDY_TYPE_ICONS.podcast,
  'estudo.projeto': STUDY_TYPE_ICONS.projeto,
  'estudo.workshop': STUDY_TYPE_ICONS.workshop,
  'estudo.mentoria': STUDY_TYPE_ICONS.mentoria,
  
  // Objetivos - Status
  'objetivo.ativo': GOAL_STATUS_ICONS.ativo,
  'objetivo.alcancado': GOAL_STATUS_ICONS.alcancado,
  'objetivo.abandonado': GOAL_STATUS_ICONS.abandonado,
  'objetivo.pausado': GOAL_STATUS_ICONS.pausado,
  
  // Áreas - Conhecimento
  'area.desenvolvimento': KNOWLEDGE_AREA_ICONS.desenvolvimento,
  'area.design': KNOWLEDGE_AREA_ICONS.design,
  'area.marketing': KNOWLEDGE_AREA_ICONS.marketing,
  'area.dados': KNOWLEDGE_AREA_ICONS.dados,
  'area.negocios': KNOWLEDGE_AREA_ICONS.negocios,
  
  // Níveis - Carreira
  'nivel.estagiario': CAREER_LEVEL_ICONS.estagiario,
  'nivel.junior': CAREER_LEVEL_ICONS.junior,
  'nivel.pleno': CAREER_LEVEL_ICONS.pleno,
  'nivel.senior': CAREER_LEVEL_ICONS.senior,
  'nivel.especialista': CAREER_LEVEL_ICONS.especialista,
  
  // Prioridades
  'prioridade.alta': PRIORITY_ICONS.alta,
  'prioridade.media': PRIORITY_ICONS.media,
  'prioridade.baixa': PRIORITY_ICONS.baixa,
  
  // Feedback
  'feedback.sucesso': STATUS_ICONS.sucesso,
  'feedback.erro': STATUS_ICONS.erro,
  'feedback.aviso': STATUS_ICONS.aviso,
  'feedback.info': STATUS_ICONS.info,
} as const;

/**
 * TAMANHOS DE ÍCONES PADRONIZADOS
 */
export const ICON_SIZES = {
  xs: 16,    // Badges, inline, captions
  sm: 20,    // Botões pequenos, lista compacta
  md: 24,    // Padrão, navegação, cards
  lg: 32,    // Destaques, títulos, headers
  xl: 48,    // Empty states, onboarding
  '2xl': 64, // Hero sections, ilustrações
} as const;

/**
 * CORES DE ÍCONES POR CONTEXTO (usar com classes Tailwind)
 */
export const ICON_COLORS = {
  // Status
  sucesso: 'text-green-600 dark:text-green-400',
  erro: 'text-red-600 dark:text-red-400',
  aviso: 'text-amber-600 dark:text-amber-400',
  info: 'text-blue-600 dark:text-blue-400',
  
  // Prioridade
  prioridadeAlta: 'text-red-600 dark:text-red-400',
  prioridadeMedia: 'text-amber-600 dark:text-amber-400',
  prioridadeBaixa: 'text-gray-600 dark:text-gray-400',
  
  // Neutros
  primario: 'text-blue-600 dark:text-blue-400',
  secundario: 'text-purple-600 dark:text-purple-400',
  muted: 'text-gray-500 dark:text-gray-400',
  
  // Conquistas
  conquista: 'text-amber-500 dark:text-amber-400',
  streak: 'text-orange-500 dark:text-orange-400',
} as const;

/**
 * Helper para obter ícone por contexto
 */
export function getIconByContext(context: keyof typeof ICON_BY_CONTEXT) {
  return ICON_BY_CONTEXT[context];
}

/**
 * Helper para obter cor de ícone por tipo
 */
export function getIconColor(type: keyof typeof ICON_COLORS): string {
  return ICON_COLORS[type];
}

/**
 * Exportação consolidada de todos os ícones
 */
export const PROGRESS_ICONS = {
  navigation: NAVIGATION_ICONS,
  studyType: STUDY_TYPE_ICONS,
  knowledgeArea: KNOWLEDGE_AREA_ICONS,
  studyStatus: STUDY_STATUS_ICONS,
  goalStatus: GOAL_STATUS_ICONS,
  careerLevel: CAREER_LEVEL_ICONS,
  priority: PRIORITY_ICONS,
  progress: PROGRESS_ICONS,
  action: ACTION_ICONS,
  status: STATUS_ICONS,
  ui: UI_ICONS,
  theme: THEME_ICONS,
  time: TIME_ICONS,
  achievement: ACHIEVEMENT_ICONS,
  document: DOCUMENT_ICONS,
  chart: CHART_ICONS,
  security: SECURITY_ICONS,
  communication: COMMUNICATION_ICONS,
  location: LOCATION_ICONS,
  media: MEDIA_ICONS,
  misc: MISC_ICONS,
} as const;

export default PROGRESS_ICONS;

/**
 * REGRAS DE USO:
 * 
 * 1. Consistência: Use sempre o mesmo ícone para a mesma ação/contexto
 * 2. Clareza: Sempre forneça label ou tooltip quando houver dúvida
 * 3. Acessibilidade: Use aria-label em ícones sem texto
 * 4. Contraste: Garantir contraste 3:1 para ícones informativos
 * 5. Hover: Indicar interatividade com hover states
 * 6. Tamanho: Use os tamanhos padronizados (ICON_SIZES)
 * 7. Cor: Use cores semânticas (ICON_COLORS) quando aplicável
 * 
 * EXEMPLO DE USO:
 * 
 * import { NAVIGATION_ICONS, ICON_SIZES, ICON_COLORS } from '@/lib/constants/progress-icons';
 * 
 * <NAVIGATION_ICONS.dashboard 
 *   size={ICON_SIZES.md} 
 *   className={ICON_COLORS.primario}
 *   aria-label="Ir para Dashboard"
 * />
 */
