/**
 * PET FRIENDLY APP - SISTEMA DE ÍCONES
 * Mapeamento completo de ícones do Lucide React para todas as jornadas
 * Compatível com Light e Dark Mode
 */

import {
  // Navegação Principal
  Home,
  PawPrint,
  Calendar,
  MessageSquare,
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
  
  // Pets & Animais
  Dog,
  Cat,
  Bird,
  Fish,
  Rabbit,
  Heart,
  HeartCrack,
  Bone,
  
  // Serviços
  Scissors,
  Stethoscope,
  Bath,
  UtensilsCrossed,
  Truck,
  Hotel,
  Camera,
  Video,
  Activity,
  
  // Agendamentos & Tempo
  Clock,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  Timer,
  Hourglass,
  AlarmClock,
  
  // Comunicação
  Mail,
  Send,
  Phone,
  MessageCircle,
  MessagesSquare,
  
  // Usuários & Perfis
  UserCircle,
  UserCheck,
  UserX,
  Users,
  UserPlus,
  UserMinus,
  Shield,
  ShieldCheck,
  BadgeCheck,
  
  // Localização
  MapPin,
  Map,
  Navigation,
  Compass,
  
  // Ações & Estados
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  Check,
  CheckCircle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  
  // Mídia
  Image,
  Upload,
  Download,
  Camera as CameraIcon,
  Video as VideoIcon,
  FileText,
  File,
  Paperclip,
  
  // Interface
  Eye,
  EyeOff,
  Filter,
  SlidersHorizontal,
  Star,
  StarHalf,
  StarOff,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark,
  BookmarkCheck,
  Share2,
  Copy,
  ExternalLink,
  Link,
  
  // Navegação & Controles
  MoreVertical,
  MoreHorizontal,
  Grid,
  List,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  RotateCw,
  
  // Status & Feedback
  Loader2,
  CheckSquare,
  Square,
  Circle,
  CircleDot,
  
  // Dinheiro & Pagamentos
  DollarSign,
  CreditCard,
  Wallet,
  Receipt,
  Tag,
  
  // Configurações & Preferências
  Sliders,
  ToggleLeft,
  ToggleRight,
  Lock,
  Unlock,
  Key,
  
  // Clima & Ambiente
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Wind,
  
  // Social & Comunidade
  Award,
  Trophy,
  Medal,
  Gift,
  PartyPopper,
  
  // Documentos & Arquivos
  Clipboard,
  ClipboardCheck,
  ClipboardList,
  FolderOpen,
  Folder,
  
  // Navegação Específica
  LogOut,
  LogIn,
  
  // Emergência & Saúde
  Siren,
  Cross,
  Pill,
  Thermometer,
  
  // Outros
  Package,
  Box,
  ShoppingBag,
  Wrench,
  Tool
} from 'lucide-react';

/**
 * NAVEGAÇÃO PRINCIPAL
 */
export const NAVIGATION_ICONS = {
  // Comum para todos os perfis
  home: Home,
  search: Search,
  notifications: Bell,
  messages: MessageSquare,
  profile: User,
  settings: Settings,
  menu: Menu,
  close: X,
  
  // Específico por perfil
  tutor: {
    pets: PawPrint,
    appointments: Calendar,
    services: Grid,
    favorites: Heart,
  },
  
  passeador: {
    schedule: Calendar,
    requests: ClipboardList,
    history: Clock,
  },
  
  cuidador: {
    services: Grid,
    schedule: Calendar,
    clients: Users,
  }
} as const;

/**
 * ÍCONES DE PETS & ANIMAIS
 */
export const PET_ICONS = {
  dog: Dog,
  cat: Cat,
  bird: Bird,
  fish: Fish,
  rabbit: Rabbit,
  other: PawPrint,
  
  // Estados & Ações
  favorite: Heart,
  unfavorite: HeartCrack,
  treat: Bone,
  paw: PawPrint,
} as const;

/**
 * ÍCONES DE SERVIÇOS
 */
export const SERVICE_ICONS = {
  // Tipos de Serviço
  walk: Activity,           // Passeio
  grooming: Scissors,       // Banho e Tosa
  veterinary: Stethoscope,  // Veterinário
  bath: Bath,               // Banho
  daycare: Hotel,           // Creche/Hotel
  feeding: UtensilsCrossed, // Alimentação
  transport: Truck,         // Transporte
  training: Award,          // Adestramento
  photography: Camera,      // Fotografia
  sitting: Home,            // Pet Sitting
  
  // Estados do Serviço
  scheduled: CalendarCheck,
  inProgress: Activity,
  completed: CheckCircle,
  cancelled: CalendarX,
} as const;

/**
 * ÍCONES DE AGENDAMENTOS & TEMPO
 */
export const SCHEDULE_ICONS = {
  calendar: Calendar,
  calendarDays: CalendarDays,
  calendarCheck: CalendarCheck,
  calendarCancel: CalendarX,
  clock: Clock,
  timer: Timer,
  alarm: AlarmClock,
  hourglass: Hourglass,
} as const;

/**
 * ÍCONES DE COMUNICAÇÃO
 */
export const COMMUNICATION_ICONS = {
  mail: Mail,
  send: Send,
  phone: Phone,
  message: MessageCircle,
  messages: MessagesSquare,
  messageSquare: MessageSquare,
} as const;

/**
 * ÍCONES DE USUÁRIOS & PERFIS
 */
export const USER_ICONS = {
  user: User,
  userCircle: UserCircle,
  userCheck: UserCheck,
  userX: UserX,
  users: Users,
  userPlus: UserPlus,
  userMinus: UserMinus,
  
  // Verificação & Segurança
  shield: Shield,
  verified: ShieldCheck,
  badge: BadgeCheck,
} as const;

/**
 * ÍCONES DE LOCALIZAÇÃO
 */
export const LOCATION_ICONS = {
  pin: MapPin,
  map: Map,
  navigation: Navigation,
  compass: Compass,
} as const;

/**
 * ÍCONES DE AÇÕES
 */
export const ACTION_ICONS = {
  // CRUD
  add: Plus,
  remove: Minus,
  edit: Edit,
  delete: Trash2,
  save: Save,
  
  // Confirmação & Status
  check: Check,
  checkCircle: CheckCircle,
  checkCircle2: CheckCircle2,
  cancel: XCircle,
  
  // Navegação
  back: ArrowLeft,
  forward: ArrowRight,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  
  // Outros
  refresh: RefreshCw,
  rotate: RotateCw,
  more: MoreVertical,
  moreHorizontal: MoreHorizontal,
} as const;

/**
 * ÍCONES DE STATUS & FEEDBACK
 */
export const STATUS_ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  alert: AlertCircle,
  help: HelpCircle,
  loading: Loader2,
  
  // Checkboxes & Radio
  checkSquare: CheckSquare,
  square: Square,
  circle: Circle,
  circleDot: CircleDot,
} as const;

/**
 * ÍCONES DE MÍDIA
 */
export const MEDIA_ICONS = {
  image: Image,
  camera: CameraIcon,
  video: VideoIcon,
  upload: Upload,
  download: Download,
  file: File,
  fileText: FileText,
  attach: Paperclip,
} as const;

/**
 * ÍCONES DE INTERFACE
 */
export const UI_ICONS = {
  // Visibilidade
  show: Eye,
  hide: EyeOff,
  
  // Filtros & Ordenação
  filter: Filter,
  sliders: SlidersHorizontal,
  
  // Avaliação
  star: Star,
  starHalf: StarHalf,
  starOff: StarOff,
  thumbsUp: ThumbsUp,
  thumbsDown: ThumbsDown,
  
  // Marcadores
  flag: Flag,
  bookmark: Bookmark,
  bookmarkCheck: BookmarkCheck,
  
  // Compartilhamento
  share: Share2,
  copy: Copy,
  externalLink: ExternalLink,
  link: Link,
  
  // Visualização
  grid: Grid,
  list: List,
  maximize: Maximize2,
  minimize: Minimize2,
  zoomIn: ZoomIn,
  zoomOut: ZoomOut,
} as const;

/**
 * ÍCONES DE PAGAMENTO
 */
export const PAYMENT_ICONS = {
  dollar: DollarSign,
  creditCard: CreditCard,
  wallet: Wallet,
  receipt: Receipt,
  tag: Tag,
} as const;

/**
 * ÍCONES DE CONFIGURAÇÕES
 */
export const SETTINGS_ICONS = {
  settings: Settings,
  sliders: Sliders,
  toggleOn: ToggleRight,
  toggleOff: ToggleLeft,
  lock: Lock,
  unlock: Unlock,
  key: Key,
} as const;

/**
 * ÍCONES DE TEMA
 */
export const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  auto: Circle,
} as const;

/**
 * ÍCONES DE CLIMA
 */
export const WEATHER_ICONS = {
  sun: Sun,
  cloud: Cloud,
  rain: CloudRain,
  wind: Wind,
} as const;

/**
 * ÍCONES DE GAMIFICAÇÃO
 */
export const GAMIFICATION_ICONS = {
  award: Award,
  trophy: Trophy,
  medal: Medal,
  gift: Gift,
  party: PartyPopper,
} as const;

/**
 * ÍCONES DE DOCUMENTOS
 */
export const DOCUMENT_ICONS = {
  clipboard: Clipboard,
  clipboardCheck: ClipboardCheck,
  clipboardList: ClipboardList,
  folder: Folder,
  folderOpen: FolderOpen,
} as const;

/**
 * ÍCONES DE AUTENTICAÇÃO
 */
export const AUTH_ICONS = {
  login: LogIn,
  logout: LogOut,
  lock: Lock,
  unlock: Unlock,
  key: Key,
} as const;

/**
 * ÍCONES DE EMERGÊNCIA & SAÚDE
 */
export const HEALTH_ICONS = {
  emergency: Siren,
  firstAid: Cross,
  pill: Pill,
  thermometer: Thermometer,
  stethoscope: Stethoscope,
} as const;

/**
 * ÍCONES DE E-COMMERCE
 */
export const ECOMMERCE_ICONS = {
  package: Package,
  box: Box,
  shoppingBag: ShoppingBag,
  cart: ShoppingBag,
} as const;

/**
 * ÍCONES DE FERRAMENTAS
 */
export const TOOL_ICONS = {
  wrench: Wrench,
  tool: Tool,
  settings: Settings,
} as const;

/**
 * MAPEAMENTO DE ÍCONES POR CONTEXTO
 * Facilita a escolha do ícone certo para cada situação
 */
export const ICON_BY_CONTEXT = {
  // Agendamento - Estados
  'agendamento.pendente': SCHEDULE_ICONS.calendar,
  'agendamento.confirmado': SCHEDULE_ICONS.calendarCheck,
  'agendamento.emAndamento': SERVICE_ICONS.inProgress,
  'agendamento.concluido': SERVICE_ICONS.completed,
  'agendamento.cancelado': SERVICE_ICONS.cancelled,
  
  // Notificações - Tipos
  'notificacao.sucesso': STATUS_ICONS.success,
  'notificacao.erro': STATUS_ICONS.error,
  'notificacao.aviso': STATUS_ICONS.warning,
  'notificacao.info': STATUS_ICONS.info,
  
  // Formulário - Ações
  'form.salvar': ACTION_ICONS.save,
  'form.cancelar': ACTION_ICONS.cancel,
  'form.editar': ACTION_ICONS.edit,
  'form.deletar': ACTION_ICONS.delete,
  'form.adicionar': ACTION_ICONS.add,
  
  // Pet - Espécies
  'pet.cachorro': PET_ICONS.dog,
  'pet.gato': PET_ICONS.cat,
  'pet.passaro': PET_ICONS.bird,
  'pet.peixe': PET_ICONS.fish,
  'pet.coelho': PET_ICONS.rabbit,
  'pet.outro': PET_ICONS.other,
  
  // Serviço - Tipos
  'servico.passeio': SERVICE_ICONS.walk,
  'servico.banhoTosa': SERVICE_ICONS.grooming,
  'servico.veterinario': SERVICE_ICONS.veterinary,
  'servico.creche': SERVICE_ICONS.daycare,
  'servico.transporte': SERVICE_ICONS.transport,
  'servico.adestramento': SERVICE_ICONS.training,
  
  // Usuário - Estados
  'usuario.verificado': USER_ICONS.verified,
  'usuario.naoVerificado': USER_ICONS.shield,
  'usuario.online': STATUS_ICONS.circleDot,
  'usuario.offline': STATUS_ICONS.circle,
} as const;

/**
 * Helper para obter ícone por contexto
 */
export function getIconByContext(context: keyof typeof ICON_BY_CONTEXT) {
  return ICON_BY_CONTEXT[context];
}

/**
 * Exportação consolidada de todos os ícones
 */
export const ICONS = {
  navigation: NAVIGATION_ICONS,
  pet: PET_ICONS,
  service: SERVICE_ICONS,
  schedule: SCHEDULE_ICONS,
  communication: COMMUNICATION_ICONS,
  user: USER_ICONS,
  location: LOCATION_ICONS,
  action: ACTION_ICONS,
  status: STATUS_ICONS,
  media: MEDIA_ICONS,
  ui: UI_ICONS,
  payment: PAYMENT_ICONS,
  settings: SETTINGS_ICONS,
  theme: THEME_ICONS,
  weather: WEATHER_ICONS,
  gamification: GAMIFICATION_ICONS,
  document: DOCUMENT_ICONS,
  auth: AUTH_ICONS,
  health: HEALTH_ICONS,
  ecommerce: ECOMMERCE_ICONS,
  tool: TOOL_ICONS,
} as const;

export default ICONS;
