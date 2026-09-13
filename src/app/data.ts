import type { ComponentType } from "react";
import {
  Briefcase, Award, Zap, FolderOpen,
  GraduationCap, BookMarked, FileText, Video, Headphones, Code,
  Circle, PauseCircle, CheckCircle2, Archive,
  HelpCircle, Trophy, MapPin,
  Target, BookOpen, TrendingUp,
  MessageCircle, ThumbsUp, Star, Eye, Sparkles,
} from "lucide-react";
import type {
  GoalCategory, GoalStatus, StudyType, StudyStatus, PostType, BadgeId,
  UserProfile, Goal, Study, CommunityPost, PostComment, CommunityMember,
} from "./types";

// ─── Initial Data ─────────────────────────────────────────────────────────────
export const INIT_USER: UserProfile = {
  uid: "uid_mariana_costa_2024",
  name: "Mariana Costa",
  email: "mariana.ux2dev@gmail.com",
  avatarInitials: "MC",
  streak: 23,
  totalHoursStudied: 312,
  joinedAt: "2024-08-15",
  authProvider: "password",
  notificationsEnabled: true,
  totalXP: 840,
};

export const INIT_GOALS: Goal[] = [
  {
    id: "g1", userId: INIT_USER.uid,
    title: "Transição UX → Engenharia de Software",
    category: "carreira", targetDate: "2026-12-31", progress: 38, status: "ativo",
    studiesLinked: 4, createdAt: "2024-08-15", updatedAt: "2026-09-01",
    tasks: [
      { id: "t1a", title: "Atualizar LinkedIn com foco em Engenharia", completed: true },
      { id: "t1b", title: "Definir trilha técnica (CS + Web)", completed: true },
      { id: "t1c", title: "Networking em comunidades de devs", completed: false },
      { id: "t1d", title: "Candidatar a vagas júnior de Dev", completed: false },
      { id: "t1e", title: "Conquistar 1ª oportunidade como dev", completed: false },
    ],
  },
  {
    id: "g2", userId: INIT_USER.uid,
    title: "AWS Certified Cloud Practitioner",
    category: "certificacao", targetDate: "2026-11-30", progress: 61, status: "ativo",
    studiesLinked: 2, createdAt: "2025-01-10", updatedAt: "2026-08-28",
    tasks: [
      { id: "t2a", title: "Fazer simulados de prova (70%+ de acerto)", completed: false },
      { id: "t2b", title: "Revisar guia oficial do exame AWS", completed: true },
      { id: "t2c", title: "Agendar a prova na Pearson VUE", completed: false },
      { id: "t2d", title: "Praticar laboratórios hands-on no AWS Free Tier", completed: true },
    ],
  },
  {
    id: "g3", userId: INIT_USER.uid,
    title: "Dominar React + TypeScript",
    category: "habilidade", targetDate: "2026-10-31", progress: 74, status: "ativo",
    studiesLinked: 2, createdAt: "2024-10-01", updatedAt: "2026-09-05",
    tasks: [
      { id: "t3a", title: "Criar projeto prático com React + TS", completed: true },
      { id: "t3b", title: "Entender hooks avançados e context", completed: true },
      { id: "t3c", title: "Implementar testes com Vitest", completed: false },
      { id: "t3d", title: "Documentar aprendizados no portfólio", completed: false },
    ],
  },
  {
    id: "g4", userId: INIT_USER.uid,
    title: "Portfólio com 4 projetos Web",
    category: "projeto", targetDate: "2026-12-15", progress: 25, status: "ativo",
    studiesLinked: 2, createdAt: "2025-03-01", updatedAt: "2026-09-01",
    tasks: [
      { id: "t4a", title: "Definir escopo e requisitos de cada projeto", completed: true },
      { id: "t4b", title: "Criar repositório e estrutura inicial", completed: true },
      { id: "t4c", title: "Estabelecer MVP e roadmap por projeto", completed: false },
      { id: "t4d", title: "Publicar 4 projetos com README detalhado", completed: false },
      { id: "t4e", title: "Coletar feedback de devs sêniors", completed: false },
    ],
  },
  {
    id: "g5", userId: INIT_USER.uid,
    title: "Fundamentos de UX Research",
    category: "habilidade", targetDate: "2025-06-30", progress: 100, status: "concluido",
    studiesLinked: 3, createdAt: "2024-08-15", updatedAt: "2025-06-28",
    tasks: [
      { id: "t5a", title: "Concluir Double Diamond — Design Thinking", completed: true },
      { id: "t5b", title: "Conduzir 5 entrevistas de usuário reais", completed: true },
      { id: "t5c", title: "Criar case study completo no portfólio", completed: true },
    ],
  },
];

export const INIT_STUDIES: Study[] = [
  {
    id: "s1", userId: INIT_USER.uid, goalId: "g3", type: "curso",
    title: "React + TypeScript do Zero ao Avançado",
    area: "Desenvolvimento Web", status: "em-andamento",
    progressPercent: 74, hoursCompleted: 37, totalHours: 50,
    deadline: "2026-10-31", lastSessionAt: "2026-09-06", createdAt: "2024-10-01",
    sessions: [
      { id: "ss1", date: "2026-09-06", hours: 2, notes: "Hooks avançados: useReducer e useCallback.", xpEarned: 40 },
      { id: "ss2", date: "2026-09-04", hours: 1.5, notes: "Context API e performance com memo.", xpEarned: 30 },
      { id: "ss3", date: "2026-09-02", hours: 2.5, notes: "TypeScript generics em componentes React.", xpEarned: 45 },
    ],
  },
  {
    id: "s2", userId: INIT_USER.uid, goalId: "g1", type: "curso",
    title: "CS50: Ciência da Computação — Harvard",
    area: "Fundamentos de Computação", status: "em-andamento",
    progressPercent: 55, hoursCompleted: 22, totalHours: 40,
    deadline: "2026-11-30", lastSessionAt: "2026-09-03", createdAt: "2024-09-01",
    sessions: [
      { id: "ss4", date: "2026-09-03", hours: 2, notes: "Semana 5: Estruturas de dados em C.", xpEarned: 35 },
      { id: "ss5", date: "2026-08-30", hours: 3, notes: "Algoritmos de ordenação e complexidade O(n).", xpEarned: 50 },
    ],
  },
  {
    id: "s3", userId: INIT_USER.uid, goalId: "g1", type: "livro",
    title: "Clean Code — Robert C. Martin",
    area: "Engenharia de Software", status: "em-andamento",
    progressPercent: 42, hoursCompleted: 10, totalHours: 24,
    lastSessionAt: "2026-08-28", createdAt: "2025-02-01",
    sessions: [
      { id: "ss6", date: "2026-08-28", hours: 2, notes: "Cap. 4: Comentários, quando e como usar.", xpEarned: 35 },
    ],
  },
  {
    id: "s4", userId: INIT_USER.uid, goalId: "g2", type: "curso",
    title: "AWS Cloud Practitioner Essentials",
    area: "Cloud Computing", status: "em-andamento",
    progressPercent: 61, hoursCompleted: 18, totalHours: 30,
    deadline: "2026-10-15", lastSessionAt: "2026-09-05", createdAt: "2025-01-15",
    sessions: [
      { id: "ss7", date: "2026-09-05", hours: 2.5, notes: "Módulo 6: Segurança na AWS — IAM e Policies.", xpEarned: 45 },
      { id: "ss8", date: "2026-09-01", hours: 2, notes: "Infraestrutura global: regiões e AZs.", xpEarned: 35 },
    ],
  },
  {
    id: "s5", userId: INIT_USER.uid, goalId: "g2", type: "artigo",
    title: "Simulados AWS CCP — Exam Readiness",
    area: "Cloud Computing", status: "em-andamento",
    progressPercent: 60, hoursCompleted: 6, totalHours: 10,
    lastSessionAt: "2026-09-04", createdAt: "2026-05-01",
  },
  {
    id: "s6", userId: INIT_USER.uid, goalId: "g4", type: "projeto",
    title: "App de Hábitos — React + Node.js",
    area: "Desenvolvimento Full Stack", status: "em-andamento",
    progressPercent: 30, hoursCompleted: 9, totalHours: 30,
    lastSessionAt: "2026-09-02", createdAt: "2026-06-01",
    sessions: [
      { id: "ss9", date: "2026-09-02", hours: 3, notes: "API REST: endpoints de criação de hábitos.", xpEarned: 55 },
    ],
  },
  {
    id: "s7", userId: INIT_USER.uid, goalId: "g3", type: "artigo",
    title: "Design Patterns em TypeScript",
    area: "Engenharia de Software", status: "em-andamento",
    progressPercent: 35, hoursCompleted: 3, totalHours: 8,
    lastSessionAt: "2026-08-25", createdAt: "2026-04-01",
  },
  {
    id: "s8", userId: INIT_USER.uid, goalId: "g4", type: "projeto",
    title: "Landing Page — Portfólio Pessoal",
    area: "Desenvolvimento Web", status: "concluido",
    progressPercent: 100, hoursCompleted: 16, totalHours: 16,
    lastSessionAt: "2026-07-20", createdAt: "2026-04-15",
    sessions: [
      { id: "ss10", date: "2026-07-20", hours: 4, notes: "Deploy na Vercel e ajustes de responsividade.", xpEarned: 80 },
    ],
  },
  {
    id: "s9", userId: INIT_USER.uid, goalId: "g1", type: "video",
    title: "Estruturas de Dados e Algoritmos — Visualizados",
    area: "Fundamentos de Computação", status: "nao-iniciado",
    progressPercent: 0, hoursCompleted: 0, totalHours: 20,
    createdAt: "2026-08-01",
  },
  {
    id: "s10", userId: INIT_USER.uid, goalId: "g5", type: "livro",
    title: "Double Diamond — Design Thinking na Prática",
    area: "UX Research", status: "concluido",
    progressPercent: 100, hoursCompleted: 14, totalHours: 14,
    lastSessionAt: "2025-06-20", createdAt: "2024-08-15",
  },
  {
    id: "s11", userId: INIT_USER.uid, type: "podcast",
    title: "Hipsters.tech — Carreira em Tech",
    area: "Carreira em Tech", status: "descontinuado",
    progressPercent: 45, hoursCompleted: 9, totalHours: 20,
    lastSessionAt: "2025-03-10", createdAt: "2024-09-01",
  },
];

export const CATEGORY_TASK_TEMPLATES: Record<GoalCategory, string[]> = {
  carreira:     ["Atualizar LinkedIn e portfólio", "Definir trilha de aprendizado", "Networking em eventos da área", "Buscar mentoria ou comunidade", "Candidatar a vagas/oportunidades"],
  certificacao: ["Fazer simulados de prova", "Revisar guia oficial do exame", "Agendar a prova", "Praticar laboratórios hands-on", "Revisar anotações dos módulos"],
  habilidade:   ["Criar projeto prático para aplicar", "Fazer exercícios diários", "Buscar feedback de especialistas", "Participar de comunidades da área", "Documentar aprendizados no portfólio"],
  projeto:      ["Definir escopo e requisitos", "Criar repositório e estrutura inicial", "Estabelecer MVP e roadmap", "Publicar primeira versão", "Coletar feedback de usuários"],
};

export const WEEKLY_HOURS = [
  { day: "Seg", h: 1.5 }, { day: "Ter", h: 2.5 }, { day: "Qua", h: 3.0 },
  { day: "Qui", h: 0.5 }, { day: "Sex", h: 2.0 }, { day: "Sáb", h: 4.5 }, { day: "Dom", h: 2.5 },
];

export const ANNUAL_HOURS = [
  { m: "Out", h: 14 }, { m: "Nov", h: 16 }, { m: "Dez", h: 12 },
  { m: "Jan", h: 18 }, { m: "Fev", h: 22 }, { m: "Mar", h: 24 },
  { m: "Abr", h: 20 }, { m: "Mai", h: 26 }, { m: "Jun", h: 18 },
  { m: "Jul", h: 20 }, { m: "Ago", h: 22 }, { m: "Set", h: 8 },
];

// ─── Community Data ────────────────────────────────────────────────────────────
export const COMMUNITY_POSTS: CommunityPost[] = [
  { id: "cp1", authorName: "Lucas M.", authorInitials: "LM", authorTransition: "Design → Produto Digital", authorXP: 162, type: "questao", title: "Como equilibrar estudo e trabalho full-time na transição?", body: "Trabalho 8h/dia e consigo no máximo 1h de estudo. Alguma estratégia que realmente funcionou para manter consistência sem se esgotar?", tags: ["rotina", "gestão-de-tempo", "transição"], likes: 24, answers: 8, createdAt: "2026-09-05", isAnswered: true },
  { id: "cp2", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", authorXP: 520, type: "recurso", resourceType: "livro", title: "'Inspired' de Marty Cagan — essencial para quem vai para Produto", body: "Li durante minha transição e esclareceu o que um PM faz de verdade. Desmistifica muito o papel e mostra o caminho prático para entrar na área.", tags: ["gestão-de-produto", "livro", "recomendação"], likes: 31, answers: 5, createdAt: "2026-09-03" },
  { id: "cp3", authorName: "Carla S.", authorInitials: "CS", authorTransition: "Marketing → Análise de Dados", authorXP: 98, type: "trilha", title: "Minha trilha: Marketing → Análise de Dados — 8 meses de jornada", body: "Comecei sem saber nada de SQL. Hoje trabalho com BI numa fintech. Compartilhei todos os recursos, a ordem e o tempo estimado para cada etapa.", tags: ["dados", "trilha-de-estudo", "sql", "bi"], likes: 47, answers: 12, createdAt: "2026-09-02" },
  { id: "cp4", authorName: "João P.", authorInitials: "JP", authorTransition: "Contabilidade → UX Research", authorXP: 75, type: "questao", title: "Como lidar com a síndrome do impostor na transição de carreira?", body: "Sinto que ninguém vai me contratar porque não tenho formação 'oficial' na área. Alguém passou por isso e tem conselhos práticos?", tags: ["saúde-mental", "impostor", "carreira"], likes: 38, answers: 15, createdAt: "2026-09-01", isAnswered: true },
  { id: "cp5", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", authorXP: 520, type: "conquista", title: "Consegui minha primeira oportunidade em Produto! 🎉", body: "Depois de 14 meses de estudo e 3 tentativas frustradas, finalmente recebi uma oferta como PM Júnior numa startup de EdTech. A jornada valeu cada hora investida.", tags: ["conquista", "produto", "vaga", "inspiração"], likes: 89, answers: 23, createdAt: "2026-08-28" },
  { id: "cp6", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", authorXP: 445, type: "recurso", resourceType: "curso", title: "Google Data Analytics Certificate — gratuito e reconhecido para começar em dados", body: "Fiz em 4 meses estudando 1h por dia. O certificado tem peso real no mercado e cobre desde planilhas até R e Python básico. Totalmente gratuito no Coursera com auxílio. https://www.coursera.org/professional-certificates/google-data-analytics", tags: ["dados", "google", "certificação", "gratuito"], likes: 55, answers: 9, createdAt: "2026-08-25" },
  { id: "cp7", authorName: "Mariana C.", authorInitials: "MC", authorTransition: "UX → Engenharia de Software", authorXP: 185, type: "trilha", title: "Atualização da minha trilha UX → Engenharia — mês 13 de 24", body: "Progresso: CS50 concluído ✓, React + TypeScript em 74%, AWS iniciado. Total geral: 38% da trilha. Demorou mas cada etapa faz sentido. Alguém mais está nessa jornada?", tags: ["engenharia", "ux", "trilha-pessoal", "react", "aws"], likes: 29, answers: 7, createdAt: "2026-08-20", isFromUser: true },
  { id: "cp8", authorName: "Pedro L.", authorInitials: "PL", authorTransition: "Direito → Cloud Computing", authorXP: 52, type: "questao", title: "Vale a pena buscar mentoria paga durante a transição?", body: "Vi plataformas com mentoria por R$200–400/mês. Para quem está começando do zero em Cloud, vale o investimento ou o custo-benefício não compensa?", tags: ["mentoria", "investimento", "cloud"], likes: 19, answers: 11, createdAt: "2026-08-18", isAnswered: true },
  { id: "cp9", authorName: "Sofia M.", authorInitials: "SM", authorTransition: "Administração → Ciência de Dados", authorXP: 128, type: "recurso", resourceType: "livro", title: "'Storytelling com Dados' — essencial para quem apresenta análises", body: "Não adianta saber fazer a análise se não sabe comunicar. Este livro mudou completamente como apresento insights para stakeholders não-técnicos.", tags: ["dados", "comunicação", "livro", "storytelling"], likes: 42, answers: 6, createdAt: "2026-08-15" },

  // ── Agosto 2026 ──────────────────────────────────────────────────────────────
  { id: "cp10", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", authorXP: 520, type: "trilha", title: "Minha trilha completa: Jornalismo → PM em 14 meses — recursos, erros e o que faria diferente", body: "Depois de conseguir minha vaga, documentei tudo: cursos que valeram, os que evitaria, como montei portfólio sem experiência prévia, como me preparei para entrevistas com case study. Está tudo aqui, na ordem que fiz.", tags: ["trilha-de-estudo", "produto", "portfólio", "carreira"], likes: 74, answers: 18, createdAt: "2026-08-12" },
  { id: "cp11", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", authorXP: 445, type: "recurso", resourceType: "curso", title: "Power BI do zero ao dashboard profissional — curso gratuito que uso com clientes", body: "Este curso da Microsoft Learn me deu base para criar relatórios que hoje apresento para diretores. Totalmente gratuito, com certificado e laboratórios práticos. Fundamental antes de qualquer certificação de dados.", tags: ["power-bi", "dados", "gratuito", "microsoft"], likes: 38, answers: 7, createdAt: "2026-08-10" },
  { id: "cp12", authorName: "Lucas M.", authorInitials: "LM", authorTransition: "Design → Produto Digital", authorXP: 162, type: "questao", title: "Designer virando PM: preciso apagar tudo que aprendi de UX ou é complementar?", body: "Venho de 5 anos em design. Quando falo com PMs, sinto que meu olhar de usuário é valorizado, mas fico confuso sobre quando devo 'colocar o chapéu de negócio' e quando uso a visão de design. Alguém fez essa transição?", tags: ["design", "produto", "transição", "ux"], likes: 33, answers: 11, createdAt: "2026-08-08", isAnswered: true },
  { id: "cp13", authorName: "Sofia M.", authorInitials: "SM", authorTransition: "Administração → Ciência de Dados", authorXP: 128, type: "questao", title: "Python ou R para quem vem de Excel e quer trabalhar com dados?", body: "Tenho base sólida em Excel e VBA. Quero aprender programação para Ciência de Dados mas não sei por onde começar. Vejo muita discussão sobre Python vs R e ainda não entendi qual faz mais sentido para o meu perfil.", tags: ["python", "r", "dados", "iniciante"], likes: 27, answers: 14, createdAt: "2026-08-05", isAnswered: true },
  { id: "cp14", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", authorXP: 445, type: "conquista", title: "Primeiro projeto de dados para cliente real — sem experiência formal prévia 🎯", body: "Fui contratado como freelancer para construir um dashboard de vendas para uma PME. Usando Power BI + SQL + dados reais. Não seria possível sem a comunidade e os recursos que compartilharam aqui. Obrigado a todos.", tags: ["conquista", "freelance", "dados", "portfólio"], likes: 61, answers: 14, createdAt: "2026-08-02" },
  { id: "cp15", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", authorXP: 520, type: "recurso", resourceType: "artigo", title: "Como montar um product roadmap sem ter um time ainda — guia para aspirantes a PM", body: "Criei roadmaps fictícios para apps reais como exercício de portfólio. Isso me diferenciou nos processos seletivos. Aqui está o framework que usei, com exemplos e o template que funcionou para mim.", tags: ["produto", "roadmap", "portfólio", "entrevista"], likes: 48, answers: 9, createdAt: "2026-07-29" },

  // ── Julho 2026 ────────────────────────────────────────────────────────────────
  { id: "cp16", authorName: "Mariana C.", authorInitials: "MC", authorTransition: "UX → Engenharia de Software", authorXP: 185, type: "questao", title: "Bootcamp de programação intensivo vale para quem já tem base de UX?", body: "Estou no CS50 há 6 meses no meu ritmo. Recebi oferta de bolsa para um bootcamp de 4 meses integral. Vale pausar minha trilha atual para fazer o bootcamp? Tenho medo de perder o ritmo que construí.", tags: ["bootcamp", "engenharia", "ux", "decisão"], likes: 22, answers: 9, createdAt: "2026-07-25", isAnswered: true, isFromUser: true },
  { id: "cp17", authorName: "Lucas M.", authorInitials: "LM", authorTransition: "Design → Produto Digital", authorXP: 162, type: "recurso", resourceType: "curso", title: "Product Management Foundation — Reforge, o melhor curso que fiz para pensar como PM", body: "Caro mas transformador. Mudou como penso sobre métricas, priorização e stakeholders. Se puder investir em um curso pago, este é o que mais recomendo para designers em transição para produto.", tags: ["produto", "reforge", "curso", "premium"], likes: 29, answers: 6, createdAt: "2026-07-20" },
  { id: "cp18", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", authorXP: 445, type: "questao", title: "Quando faz sentido aprender SQL vs Python primeiro para dados?", body: "Vejo debates sem fim sobre isso. Na prática, para quem quer emprego como analista de dados nos próximos 6 meses, qual deve ser a primeira prioridade?", tags: ["sql", "python", "dados", "prioridade"], likes: 44, answers: 17, createdAt: "2026-07-15", isAnswered: true },
  { id: "cp19", authorName: "Sofia M.", authorInitials: "SM", authorTransition: "Administração → Ciência de Dados", authorXP: 128, type: "conquista", title: "Primeiro projeto de análise publicado no GitHub — 3 meses depois de começar do zero", body: "Analisei dados públicos de vendas do e-commerce brasileiro e publiquei no GitHub com README detalhado. Parece pouco mas é o projeto que mais me orgulho. Quem está começando: publique mesmo que pareça simples.", tags: ["conquista", "github", "portfólio", "iniciante"], likes: 35, answers: 8, createdAt: "2026-07-10" },
  { id: "cp20", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", authorXP: 520, type: "recurso", resourceType: "podcast", title: "Podcast 'Lenny's Podcast' — o melhor conteúdo semanal para quem quer entender Produto", body: "Cada episódio é uma masterclass com PMs de Airbnb, Slack, Notion e outras. Ouço no trajeto e já implementei várias ideias no meu trabalho atual. Completamente gratuito e em inglês acessível.", tags: ["produto", "podcast", "inglês", "gratuito"], likes: 36, answers: 5, createdAt: "2026-07-05" },
  { id: "cp21", authorName: "Mariana C.", authorInitials: "MC", authorTransition: "UX → Engenharia de Software", authorXP: 185, type: "recurso", resourceType: "curso", title: "The Odin Project — gratuito, open source e melhor do que muitos bootcamps pagos", body: "Depois de experimentar vários recursos, esse é o que mais recomendo para quem quer aprender desenvolvimento web com profundidade. Cobre HTML, CSS, JavaScript e Ruby on Rails do zero. A comunidade no Discord é muito ativa.", tags: ["programação", "web", "gratuito", "odin-project"], likes: 41, answers: 10, createdAt: "2026-06-28", isFromUser: true },

  // ── Junho 2026 ────────────────────────────────────────────────────────────────
  { id: "cp22", authorName: "Lucas M.", authorInitials: "LM", authorTransition: "Design → Produto Digital", authorXP: 162, type: "conquista", title: "Portfólio de produto pronto — 3 estudos de caso com métricas reais 🚀", body: "Levei 4 meses para montar. Escolhi 3 produtos reais, propus melhorias baseadas em dados públicos e documentei como um PM documentaria. Recebi meu primeiro convite para entrevista logo após publicar.", tags: ["conquista", "portfólio", "produto", "entrevista"], likes: 52, answers: 11, createdAt: "2026-06-20" },
  { id: "cp23", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", authorXP: 445, type: "trilha", title: "Trilha completa: Contabilidade → Analista de Dados em 18 meses — o mapa que eu queria ter encontrado", body: "Documentei cada etapa: por que comecei pelo Excel avançado, como passei para SQL, quando entrei em Python, como construí portfólio e como consegui minha primeira vaga. Inclui tempo estimado e custo de cada recurso.", tags: ["trilha-de-estudo", "dados", "sql", "python", "portfólio"], likes: 88, answers: 22, createdAt: "2026-06-15" },
  { id: "cp24", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", authorXP: 520, type: "questao", title: "Como preparar o perfil do LinkedIn para transição de carreira sem parecer desesperado?", body: "Atualizo meu LinkedIn mas me preocupo com como parece para recrutadores: estou 'ativo para oportunidades' mas ainda empregado. Como equilibrar a narrativa de transição com profissionalismo?", tags: ["linkedin", "carreira", "networking", "transição"], likes: 56, answers: 19, createdAt: "2026-06-08", isAnswered: true },
];

export const SEED_COMMENTS: Record<string, PostComment[]> = {
  cp1: [
    { id: "c1a", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", body: "Foco nos 20 minutos antes de dormir. Pomodoro curto, sem culpa se errar um dia. Consistência > intensidade.", createdAt: "2026-09-05" },
    { id: "c1b", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", body: "Acordei 45 min mais cedo e usei esse tempo só pra estudar. Sem abrir redes sociais antes. Funcionou por 8 meses.", createdAt: "2026-09-06" },
    { id: "c1c", authorName: "Sofia M.", authorInitials: "SM", authorTransition: "Administração → Ciência de Dados", body: "Audiobooks e podcasts técnicos no trajeto. Conta muito mais do que parece no fim do mês.", createdAt: "2026-09-06" },
  ],
  cp2: [
    { id: "c2a", authorName: "Lucas M.", authorInitials: "LM", authorTransition: "Design → Produto Digital", body: "Li também e concordo. O capítulo sobre discovery mudou minha visão completamente. Recomendo em conjunto com 'Continuous Discovery Habits': https://www.goodreads.com/book/show/58046715-continuous-discovery-habits", createdAt: "2026-09-04" },
    { id: "c2b", authorName: "Pedro L.", authorInitials: "PL", authorTransition: "Direito → Cloud Computing", body: "Tem versão em português? Pergunto porque meu inglês técnico ainda é limitado.", createdAt: "2026-09-04" },
  ],
  cp3: [
    { id: "c3a", authorName: "João P.", authorInitials: "JP", authorTransition: "Contabilidade → UX Research", body: "Impressionante! Você usou alguma plataforma específica pra SQL ou foi tudo no próprio trabalho?", createdAt: "2026-09-03" },
    { id: "c3b", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", body: "Que trilha incrível Carla! Vou salvar isso. Você chegou a fazer algum projeto pessoal no portfólio?", createdAt: "2026-09-03" },
    { id: "c3c", authorName: "Sofia M.", authorInitials: "SM", authorTransition: "Administração → Ciência de Dados", body: "Eu estou no mesmo caminho! Já no SQL faz 2 meses. Qual dataset você usou para praticar no início?", createdAt: "2026-09-02" },
  ],
  cp4: [
    { id: "c4a", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", body: "Passei por isso. O que ajudou foi focar no que eu entregava, não no que eu ainda não sabia. Montei um portfólio de projetos pessoais e isso virou prova concreta.", createdAt: "2026-09-01" },
    { id: "c4b", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", body: "Síndrome do impostor é quase universal em transição. A diferença é que quem veio de outra área traz uma perspectiva que natos da área não têm.", createdAt: "2026-09-01" },
    { id: "c4c", authorName: "Mariana C.", authorInitials: "MC", authorTransition: "UX → Engenharia de Software", body: "João, meu background em UX virou diferencial na eng. de software — não um defeito. Você provavelmente tem isso também.", createdAt: "2026-09-02", isFromUser: true },
  ],
  cp5: [
    { id: "c5a", authorName: "Lucas M.", authorInitials: "LM", authorTransition: "Design → Produto Digital", body: "Parabéns Ana! Você merece demais. Como foi o processo seletivo? Tiveram casos práticos?", createdAt: "2026-08-28" },
    { id: "c5b", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", body: "Que notícia incrível! Você nos inspira. Qual foi a virada de chave que te diferenciou nas entrevistas?", createdAt: "2026-08-29" },
    { id: "c5c", authorName: "Mariana C.", authorInitials: "MC", authorTransition: "UX → Engenharia de Software", body: "🎉 Eu sabia que ia conseguir! Vai arrasar na EdTech!", createdAt: "2026-08-29", isFromUser: true },
  ],
  cp6: [
    { id: "c6a", authorName: "João P.", authorInitials: "JP", authorTransition: "Contabilidade → UX Research", body: "Fiz também e confirmo. O módulo de Ask é o melhor ponto de entrada. Dá pra fazer no ritmo que der.", createdAt: "2026-08-26" },
    { id: "c6b", authorName: "Sofia M.", authorInitials: "SM", authorTransition: "Administração → Ciência de Dados", body: "Consegui bolsa pelo Coursera Financial Aid. Vale muito tentar antes de pagar: https://www.coursera.org/learn/ask-questions-make-decisions", createdAt: "2026-08-26" },
  ],
  cp7: [
    { id: "c7a", authorName: "Lucas M.", authorInitials: "LM", authorTransition: "Design → Produto Digital", body: "Eu também tenho background em design e tô considerando engenharia. O CS50 realmente é o melhor ponto de partida?", createdAt: "2026-08-21" },
    { id: "c7b", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", body: "38% em 13 meses com trabalho full time é muito bom! Não se compare com quem pode estudar integral.", createdAt: "2026-08-21" },
  ],
  cp8: [
    { id: "c8a", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", body: "Para Cloud, especificamente, vale mais investir nas certificações oficiais da AWS/Azure do que em mentoria genérica. O custo é menor e o retorno é mais claro.", createdAt: "2026-08-19" },
    { id: "c8b", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", body: "Tive 3 meses de mentoria gratuita via ADPList. Vale muito tentar por lá antes de pagar: https://adplist.org", createdAt: "2026-08-19" },
    { id: "c8c", authorName: "Mariana C.", authorInitials: "MC", authorTransition: "UX → Engenharia de Software", body: "Eu preferi investir em cursos e comunidades. A mentoria gratuita no ADPList me surpreendeu bastante.", createdAt: "2026-08-20", isFromUser: true },
  ],
  cp9: [
    { id: "c9a", authorName: "João P.", authorInitials: "JP", authorTransition: "Contabilidade → UX Research", body: "Acabei de comprar. A parte sobre gráficos de linha vs. barras já valeu o livro inteiro.", createdAt: "2026-08-16" },
    { id: "c9b", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", body: "Concordo 100%. Uso até hoje para revisar antes de apresentações importantes.", createdAt: "2026-08-16" },
  ],
  cp10: [
    { id: "c10a", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", body: "Salvei e já compartilhei com 3 pessoas que me pediram indicação de trilha esta semana. Obrigado pela documentação detalhada.", createdAt: "2026-08-12" },
    { id: "c10b", authorName: "Lucas M.", authorInitials: "LM", authorTransition: "Design → Produto Digital", body: "A parte sobre portfólio sem experiência foi o que mais precisava. Que recursos você usou para montar os case studies?", createdAt: "2026-08-13" },
    { id: "c10c", authorName: "João P.", authorInitials: "JP", authorTransition: "Contabilidade → UX Research", body: "Você mencionou 3 tentativas frustradas antes. O que mudou na 4ª candidatura?", createdAt: "2026-08-13" },
    { id: "c10d", authorName: "Mariana C.", authorInitials: "MC", authorTransition: "UX → Engenharia de Software", body: "Isso é ouro puro. Obrigada por documentar tudo em vez de guardar só pra você.", createdAt: "2026-08-14", isFromUser: true },
  ],
  cp11: [
    { id: "c11a", authorName: "Mariana C.", authorInitials: "MC", authorTransition: "UX → Engenharia de Software", body: "Uso Power BI no trabalho atual e confirmo: a Microsoft Learn é subestimada. A trilha deles é melhor do que cursos pagos que fiz.", createdAt: "2026-08-10", isFromUser: true },
    { id: "c11b", authorName: "Sofia M.", authorInitials: "SM", authorTransition: "Administração → Ciência de Dados", body: "Consegui meu primeiro cliente freelancer mostrando um dashboard feito com o que aprendi nessa trilha. Vale muito.", createdAt: "2026-08-11" },
  ],
  cp12: [
    { id: "c12a", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", body: "Designers são os melhores PMs que conheço. Vocês já entendem o usuário — o que falta é aprender a falar a língua do negócio. São habilidades complementares, não concorrentes.", createdAt: "2026-08-09" },
    { id: "c12b", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", body: "O chapéu de negócio é sobre métricas e priorização por impacto. Você aprende isso com o tempo. O olhar de usuário é muito mais raro e difícil de ensinar.", createdAt: "2026-08-09" },
    { id: "c12c", authorName: "Mariana C.", authorInitials: "MC", authorTransition: "UX → Engenharia de Software", body: "Na engenharia acontece algo parecido. Meu background em UX é um diferencial enorme — consigo comunicar com designers de um jeito que engenheiros puros não conseguem.", createdAt: "2026-08-10", isFromUser: true },
  ],
  cp13: [
    { id: "c13a", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", body: "Para Python: mais vagas, mais comunidade, mais versatilidade. Para R: análise estatística avançada, academia. Para maioria das transições, comece com Python.", createdAt: "2026-08-05" },
    { id: "c13b", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", body: "Python. Sem dúvida. Você vai usar para ETL, análise, machine learning e automação. R fica mais restrito a análise e academia.", createdAt: "2026-08-06" },
    { id: "c13c", authorName: "Mariana C.", authorInitials: "MC", authorTransition: "UX → Engenharia de Software", body: "Python também foi minha escolha e não me arrependo. O ecossistema de bibliotecas é imbatível.", createdAt: "2026-08-06", isFromUser: true },
  ],
  cp14: [
    { id: "c14a", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", body: "Parabéns Carlos! Prova que o portfólio é mais importante que o diploma. Como você encontrou este primeiro cliente?", createdAt: "2026-08-02" },
    { id: "c14b", authorName: "Lucas M.", authorInitials: "LM", authorTransition: "Design → Produto Digital", body: "Isso mostra que você pode monetizar o aprendizado enquanto ainda está estudando. Que ferramentas usou no projeto?", createdAt: "2026-08-03" },
    { id: "c14c", authorName: "Mariana C.", authorInitials: "MC", authorTransition: "UX → Engenharia de Software", body: "Que inspiração! Quero fazer algo parecido para construir portfólio. Conseguiu o cliente via indicação ou plataforma?", createdAt: "2026-08-03", isFromUser: true },
  ],
  cp15: [
    { id: "c15a", authorName: "Lucas M.", authorInitials: "LM", authorTransition: "Design → Produto Digital", body: "Este framework de roadmap foi exatamente o que precisava. Já comecei a aplicar para o portfólio que estou montando.", createdAt: "2026-07-30" },
    { id: "c15b", authorName: "Pedro L.", authorInitials: "PL", authorTransition: "Direito → Cloud Computing", body: "Salvei! Vou adaptar para montar um roadmap de infraestrutura cloud para meu portfólio.", createdAt: "2026-07-30" },
  ],
  cp16: [
    { id: "c16a", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", body: "Fiz um bootcamp e não recomendo para quem já tem ritmo próprio. O meu ritmo consistente valeu mais do que 4 meses intensivos sem solidificar base.", createdAt: "2026-07-26" },
    { id: "c16b", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", body: "Depende muito do bootcamp. Mas um hábito de estudo já construído é um ativo valioso — pense bem antes de trocar por intensidade de curto prazo.", createdAt: "2026-07-26" },
  ],
  cp17: [
    { id: "c17a", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", body: "Reforge mudou meu jeito de pensar sobre retenção. O framework de North Star Metric que aprendi lá uso até hoje nas dailies.", createdAt: "2026-07-21" },
    { id: "c17b", authorName: "Sofia M.", authorInitials: "SM", authorTransition: "Administração → Ciência de Dados", body: "Existe versão mais acessível ou desconto para quem está em transição? O preço assusta um pouco.", createdAt: "2026-07-21" },
  ],
  cp18: [
    { id: "c18a", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", body: "SQL primeiro, sempre. É a habilidade que vai te contratar. Python você aprende depois quando precisar de automação e ML.", createdAt: "2026-07-16" },
    { id: "c18b", authorName: "Sofia M.", authorInitials: "SM", authorTransition: "Administração → Ciência de Dados", body: "SQL em 2 meses de prática diária te dá base suficiente para a maioria das vagas de analista. Depois Python.", createdAt: "2026-07-16" },
    { id: "c18c", authorName: "Mariana C.", authorInitials: "MC", authorTransition: "UX → Engenharia de Software", body: "Na engenharia de software a ordem é diferente, mas para dados confirmo: SQL é o que os recrutadores perguntam primeiro.", createdAt: "2026-07-17", isFromUser: true },
  ],
  cp19: [
    { id: "c19a", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", body: "Parabéns Sofia! Um README bem escrito vale mais do que o código em si na maioria das vezes. É o que mostra que você sabe comunicar.", createdAt: "2026-07-11" },
    { id: "c19b", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", body: "Publique mesmo que pareça simples — foi exatamente o conselho que me ajudou quando comecei. Ótimo projeto!", createdAt: "2026-07-11" },
  ],
  cp20: [
    { id: "c20a", authorName: "Lucas M.", authorInitials: "LM", authorTransition: "Design → Produto Digital", body: "Lenny Rachitsky é incrível. O episódio com a PM do Figma sobre como priorizar features mudou minha visão completamente.", createdAt: "2026-07-06" },
    { id: "c20b", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", body: "Tem algum episódio específico para recomendar para quem está começando a entender o papel de PM?", createdAt: "2026-07-06" },
  ],
  cp21: [
    { id: "c21a", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", body: "The Odin Project foi o que me ensinou lógica de programação antes de entrar em Python. Concordo 100% com a recomendação.", createdAt: "2026-06-29" },
    { id: "c21b", authorName: "Lucas M.", authorInitials: "LM", authorTransition: "Design → Produto Digital", body: "O projeto final do Odin é impressionante para portfólio. Alguém conseguiu emprego mostrando projetos do Odin?", createdAt: "2026-06-29" },
  ],
  cp22: [
    { id: "c22a", authorName: "Ana R.", authorInitials: "AR", authorTransition: "Jornalismo → Gestão de Produto", body: "É exatamente isso que diferencia! Portfólio com métricas reais vs. portfólio só visual. Pode compartilhar o link?", createdAt: "2026-06-21" },
    { id: "c22b", authorName: "Sofia M.", authorInitials: "SM", authorTransition: "Administração → Ciência de Dados", body: "Que conquista Lucas! Quando você for para a entrevista, como pretende apresentar os case studies?", createdAt: "2026-06-21" },
  ],
  cp23: [
    { id: "c23a", authorName: "Lucas M.", authorInitials: "LM", authorTransition: "Design → Produto Digital", body: "Este guia do Carlos foi o que mais me ajudou a entender a sequência. Muito bem estruturado.", createdAt: "2026-06-16" },
    { id: "c23b", authorName: "João P.", authorInitials: "JP", authorTransition: "Contabilidade → UX Research", body: "A parte sobre custo de cada recurso é o que mais falta em outros guias. Obrigado por incluir!", createdAt: "2026-06-16" },
    { id: "c23c", authorName: "Mariana C.", authorInitials: "MC", authorTransition: "UX → Engenharia de Software", body: "Vou adaptar essa estrutura para minha trilha de engenharia. Muito obrigada Carlos!", createdAt: "2026-06-17", isFromUser: true },
  ],
  cp24: [
    { id: "c24a", authorName: "Carlos E.", authorInitials: "CE", authorTransition: "Contabilidade → Análise de Dados", body: "Headline no LinkedIn: 'Profissional em transição para [área] | [habilidade] | [habilidade]'. Sem 'buscando oportunidades'. Mostre o que você sabe, não o que quer.", createdAt: "2026-06-09" },
    { id: "c24b", authorName: "Lucas M.", authorInitials: "LM", authorTransition: "Design → Produto Digital", body: "Ativar o modo 'Open to Work' só visível para recrutadores (não para todos) é uma opção que poucas pessoas sabem que existe.", createdAt: "2026-06-09" },
    { id: "c24c", authorName: "Mariana C.", authorInitials: "MC", authorTransition: "UX → Engenharia de Software", body: "Meu aprendizado: escreva a headline como se já fosse o profissional que quer ser, não como o que está deixando de ser.", createdAt: "2026-06-10", isFromUser: true },
  ],
};

export const COMMUNITY_LEADERBOARD: CommunityMember[] = [
  { name: "Ana R.",     initials: "AR", transition: "Jornalismo → Gestão de Produto",   xp: 520, posts: 18, answers: 47, badge: "farol" },
  { name: "Carlos E.",  initials: "CE", transition: "Contabilidade → Análise de Dados", xp: 445, posts: 12, answers: 38, badge: "guia-de-trilha" },
  { name: "Mariana C.", initials: "MC", transition: "UX → Engenharia de Software",      xp: 185, posts: 3,  answers: 12, badge: "mao-amiga", isUser: true },
  { name: "Lucas M.",   initials: "LM", transition: "Design → Produto Digital",          xp: 162, posts: 8,  answers: 15, badge: "primeira-trilha" },
  { name: "Sofia M.",   initials: "SM", transition: "Administração → Ciência de Dados",  xp: 128, posts: 6,  answers: 9,  badge: "caminho-aberto" },
];

type BadgeConfig = {
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  color: string;
  bg: string;
  category: "ajuda" | "compartilhamento" | "trajetoria";
  categoryLabel: string;
  description: string;
};

export const BADGE_CONFIG: Record<BadgeId, BadgeConfig> = {
  // ── Ajuda ──────────────────────────────────────────────────────────────────
  "primeira-resposta": {
    label: "Primeira Resposta",
    icon: MessageCircle,
    color: "text-blue-700 dark:text-blue-300",
    bg: "bg-blue-100 dark:bg-blue-900/40",
    category: "ajuda",
    categoryLabel: "Ajuda",
    description: "Respondeu a primeira dúvida de alguém",
  },
  "mao-amiga": {
    label: "Mão Amiga",
    icon: ThumbsUp,
    color: "text-cyan-700 dark:text-cyan-300",
    bg: "bg-cyan-100 dark:bg-cyan-900/40",
    category: "ajuda",
    categoryLabel: "Ajuda",
    description: "10 respostas marcadas como úteis por quem perguntou",
  },
  "guia-de-trilha": {
    label: "Guia de Trilha",
    icon: BookOpen,
    color: "text-indigo-700 dark:text-indigo-300",
    bg: "bg-indigo-100 dark:bg-indigo-900/40",
    category: "ajuda",
    categoryLabel: "Ajuda",
    description: "50 respostas úteis distribuídas entre 5+ pessoas",
  },
  // ── Compartilhamento ───────────────────────────────────────────────────────
  "primeira-trilha": {
    label: "Primeira Trilha",
    icon: MapPin,
    color: "text-violet-700 dark:text-violet-300",
    bg: "bg-violet-100 dark:bg-violet-900/40",
    category: "compartilhamento",
    categoryLabel: "Compartilhamento",
    description: "Publicou a primeira trilha ou dica na comunidade",
  },
  "curador": {
    label: "Curador",
    icon: BookMarked,
    color: "text-amber-700 dark:text-amber-300",
    bg: "bg-amber-100 dark:bg-amber-900/40",
    category: "compartilhamento",
    categoryLabel: "Compartilhamento",
    description: "10 conteúdos compartilhados, cada um salvo por alguém",
  },
  "referencia-da-area": {
    label: "Referência da Área",
    icon: Star,
    color: "text-orange-700 dark:text-orange-300",
    bg: "bg-orange-100 dark:bg-orange-900/40",
    category: "compartilhamento",
    categoryLabel: "Compartilhamento",
    description: "Uma trilha sua foi seguida por 50+ pessoas",
  },
  // ── Trajetória ─────────────────────────────────────────────────────────────
  "caminho-aberto": {
    label: "Caminho Aberto",
    icon: GraduationCap,
    color: "text-teal-700 dark:text-teal-300",
    bg: "bg-teal-100 dark:bg-teal-900/40",
    category: "trajetoria",
    categoryLabel: "Trajetória",
    description: "Completou o perfil de trajetória (cargos, competências, estudos)",
  },
  "rota-consultada": {
    label: "Rota Consultada",
    icon: Eye,
    color: "text-green-700 dark:text-green-300",
    bg: "bg-green-100 dark:bg-green-900/40",
    category: "trajetoria",
    categoryLabel: "Trajetória",
    description: "Trajetória consultada por 20 pessoas com objetivo parecido",
  },
  "farol": {
    label: "Farol",
    icon: Sparkles,
    color: "text-rose-700 dark:text-rose-300",
    bg: "bg-rose-100 dark:bg-rose-900/40",
    category: "trajetoria",
    categoryLabel: "Trajetória",
    description: "3 pessoas usaram sua trajetória pra decidir o próximo passo",
  },
};

// ─── Config Maps ──────────────────────────────────────────────────────────────
export const POST_TYPE_CONFIG: Record<PostType, { label: string; color: string; bg: string; icon: ComponentType<{ size?: number; className?: string }> }> = {
  questao:   { label: "Dúvida",    color: "text-blue-700 dark:text-blue-300",    bg: "bg-blue-100 dark:bg-blue-900/40",    icon: HelpCircle },
  recurso:   { label: "Recurso",   color: "text-amber-700 dark:text-amber-300",  bg: "bg-amber-100 dark:bg-amber-900/40",  icon: BookMarked },
  trilha:    { label: "Trilha",    color: "text-violet-700 dark:text-violet-300", bg: "bg-violet-100 dark:bg-violet-900/40", icon: MapPin },
  conquista: { label: "Conquista", color: "text-green-700 dark:text-green-300",  bg: "bg-green-100 dark:bg-green-900/40",  icon: Trophy },
};

export const CATEGORY_CONFIG: Record<GoalCategory, { label: string; color: string; bg: string; icon: ComponentType<{ size?: number; className?: string }> }> = {
  carreira:     { label: "Carreira",     color: "text-violet-700 dark:text-violet-300", bg: "bg-violet-100 dark:bg-violet-900/40", icon: Briefcase },
  certificacao: { label: "Certificação", color: "text-blue-700 dark:text-blue-300",    bg: "bg-blue-100 dark:bg-blue-900/40",    icon: Award },
  habilidade:   { label: "Habilidade",   color: "text-teal-700 dark:text-teal-300",    bg: "bg-teal-100 dark:bg-teal-900/40",    icon: Zap },
  projeto:      { label: "Projeto",      color: "text-orange-700 dark:text-orange-300", bg: "bg-orange-100 dark:bg-orange-900/40", icon: FolderOpen },
};

export const STUDY_TYPE_CONFIG: Record<StudyType, { label: string; color: string; icon: ComponentType<{ size?: number; className?: string }> }> = {
  curso:   { label: "Curso",   color: "text-blue-600 dark:text-blue-400",     icon: GraduationCap },
  livro:   { label: "Livro",   color: "text-amber-600 dark:text-amber-400",   icon: BookMarked },
  artigo:  { label: "Artigo",  color: "text-slate-600 dark:text-slate-400",   icon: FileText },
  video:   { label: "Vídeo",   color: "text-red-600 dark:text-red-400",       icon: Video },
  podcast: { label: "Podcast", color: "text-purple-600 dark:text-purple-400", icon: Headphones },
  projeto: { label: "Projeto", color: "text-green-600 dark:text-green-400",   icon: Code },
};

export const STUDY_STATUS_CONFIG: Record<StudyStatus, { label: string; color: string; bg: string; icon: ComponentType<{ size?: number; className?: string }> }> = {
  "nao-iniciado":  { label: "Não iniciado",  color: "text-slate-600 dark:text-slate-400",   bg: "bg-slate-100 dark:bg-slate-800",      icon: Circle },
  "em-andamento":  { label: "Em andamento",  color: "text-blue-700 dark:text-blue-300",     bg: "bg-blue-100 dark:bg-blue-900/40",     icon: Zap },
  "pausado":       { label: "Em pausa",      color: "text-amber-700 dark:text-amber-300",   bg: "bg-amber-100 dark:bg-amber-900/40",   icon: PauseCircle },
  "concluido":     { label: "Concluído",     color: "text-green-700 dark:text-green-300",   bg: "bg-green-100 dark:bg-green-900/40",   icon: CheckCircle2 },
  "descontinuado": { label: "Pausado",       color: "text-slate-500 dark:text-slate-400",   bg: "bg-slate-100 dark:bg-slate-800/80",   icon: Archive },
};

export const LEVELS = [
  { minXP: 0,    level: 1, title: "Iniciante",  color: "text-slate-500",  bg: "bg-slate-100 dark:bg-slate-800" },
  { minXP: 100,  level: 2, title: "Aprendiz",   color: "text-blue-600 dark:text-blue-400",   bg: "bg-blue-100 dark:bg-blue-900/40" },
  { minXP: 300,  level: 3, title: "Estudante",  color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-100 dark:bg-violet-900/40" },
  { minXP: 600,  level: 4, title: "Dedicado",   color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/40" },
  { minXP: 1000, level: 5, title: "Expert",     color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/40" },
  { minXP: 1500, level: 6, title: "Mestre",     color: "text-red-600 dark:text-red-400",    bg: "bg-red-100 dark:bg-red-900/40" },
];

export const ONBOARDING_SLIDES = [
  { Icon: Target,     iconBg: "bg-violet-100 dark:bg-violet-900/40", iconColor: "text-violet-600 dark:text-violet-400", title: "Defina seus objetivos",      body: "Transforme metas de carreira e estudo em objetivos claros e mensuráveis. Cada conquista começa com uma direção definida." },
  { Icon: BookOpen,   iconBg: "bg-blue-100 dark:bg-blue-900/40",   iconColor: "text-blue-600 dark:text-blue-400",   title: "Organize seus estudos",      body: "Vincule cursos, livros, vídeos e projetos aos seus objetivos. Veja como cada material contribui para seu avanço." },
  { Icon: TrendingUp, iconBg: "bg-green-100 dark:bg-green-900/40",  iconColor: "text-green-600 dark:text-green-400",  title: "Acompanhe seu progresso",    body: "Gráficos, sequências de estudo e XP acumulado mostram sua evolução. Cada milestone é uma vitória que merece ser celebrada." },
];

// ─── Privacy & Terms ──────────────────────────────────────────────────────────
export const PRIVACY_SECTIONS = {
  termos: [
    { title: "1. Aceitação dos Termos", body: "Ao criar uma conta ou utilizar o Progress, você concorda com estes Termos de Uso. Caso não concorde, não utilize o aplicativo. Reservamo-nos o direito de atualizar estes termos a qualquer momento, com aviso prévio dentro do app." },
    { title: "2. Uso do Aplicativo", body: "O Progress é um aplicativo de gestão de estudos e objetivos de carreira para uso pessoal. É proibido utilizar o app para fins ilegais, compartilhar conteúdo ofensivo na comunidade, ou tentar acessar dados de outros usuários. Violações podem resultar no encerramento da conta." },
    { title: "3. Conta e Responsabilidade", body: "Você é responsável por manter a segurança das suas credenciais de acesso. Em caso de uso não autorizado, notifique-nos imediatamente. Não nos responsabilizamos por perdas decorrentes do uso indevido da sua conta por terceiros." },
    { title: "4. Conteúdo da Comunidade", body: "Publicações no fórum da comunidade devem respeitar outros usuários e não conter spam, desinformação ou conteúdo discriminatório. Moderamos o conteúdo e podemos remover publicações que violem estas diretrizes sem aviso prévio." },
    { title: "5. Propriedade Intelectual", body: "Todo o conteúdo, design e funcionalidades do Progress são de nossa propriedade intelectual. Você retém os direitos sobre o conteúdo que publicar na comunidade, mas nos concede licença para exibi-lo dentro da plataforma." },
    { title: "6. Limitação de Responsabilidade", body: "O Progress é fornecido 'como está'. Não garantimos disponibilidade ininterrupta e não nos responsabilizamos por danos indiretos decorrentes do uso do aplicativo. Nossa responsabilidade total é limitada ao valor pago pelo serviço nos últimos 12 meses." },
    { title: "7. Rescisão", body: "Você pode encerrar sua conta a qualquer momento nas configurações do perfil. Podemos suspender contas que violem estes termos. Após encerramento, seus dados pessoais serão excluídos em até 30 dias, exceto quando houver obrigação legal de retenção." },
    { title: "8. Contato", body: "Dúvidas sobre estes termos? Entre em contato: comunidade.progress@gmail.com. Última atualização: setembro de 2026." },
  ],
  privacidade: [
    { title: "1. Dados que Coletamos", body: "Coletamos apenas o necessário para o funcionamento do app: nome, e-mail, objetivos e registros de estudo que você cria. Não coletamos dados de localização, contatos ou qualquer informação do dispositivo além do necessário para autenticação." },
    { title: "2. Como Usamos seus Dados", body: "Seus dados são usados exclusivamente para: exibir seu progresso, calcular estatísticas da sua jornada, personalizar sua experiência e, se você optar por participar, exibir seu perfil de forma anônima no ranking da comunidade." },
    { title: "3. Armazenamento e Segurança", body: "Seus dados são armazenados com criptografia em servidores seguros. Utilizamos autenticação de dois fatores opcional e sessions com expiração automática. Nunca armazenamos sua senha em texto puro — utilizamos hashing com bcrypt." },
    { title: "4. Compartilhamento de Dados", body: "Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais. Compartilhamos dados somente quando exigido por lei ou quando necessário para operação do serviço (ex.: provedor de hospedagem), sempre com acordos de confidencialidade." },
    { title: "5. Cookies e Rastreamento", body: "Utilizamos cookies essenciais para manter sua sessão ativa. Não utilizamos cookies de rastreamento de terceiros nem ferramentas de análise comportamental invasivas. Você pode limpar os cookies a qualquer momento nas configurações do seu navegador." },
    { title: "6. Seus Direitos (LGPD)", body: "Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem direito a: acessar seus dados, corrigir informações incorretas, solicitar exclusão da conta e dos dados, portabilidade dos dados em formato aberto, e revogar consentimentos a qualquer momento." },
    { title: "7. Retenção de Dados", body: "Mantemos seus dados enquanto sua conta estiver ativa. Após exclusão, removemos seus dados em até 30 dias dos servidores de produção e em até 90 dias dos backups. Dados anonimizados de uso agregado podem ser mantidos para fins estatísticos." },
    { title: "8. Contato e DPO", body: "Para exercer seus direitos ou tirar dúvidas sobre privacidade, entre em contato: comunidade.progress@gmail.com. Respondemos em até 15 dias úteis. Última atualização: setembro de 2026." },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function daysLeft(dateStr: string): number {
  const target = new Date(dateStr);
  const today  = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / 86_400_000);
}

export function weeklyTotal(): number {
  return WEEKLY_HOURS.reduce((sum, d) => sum + d.h, 0);
}

export function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export function sevenDaysAgoISO(): string {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString().split("T")[0];
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function calcXP(hours: number, oldPct: number, newPct: number): number {
  let xp = Math.round(15 + hours * 10);
  for (const m of [25, 50, 75, 100]) {
    if (oldPct < m && newPct >= m) {
      xp += m === 100 ? 150 : m === 75 ? 100 : m === 50 ? 50 : 25;
    }
  }
  return xp;
}

export function getMilestones(oldPct: number, newPct: number): number[] {
  return [25, 50, 75, 100].filter(m => oldPct < m && newPct >= m);
}

export function computeLevel(xp: number) {
  let current = LEVELS[0];
  for (const l of LEVELS) { if (xp >= l.minXP) current = l; }
  const idx    = LEVELS.indexOf(current);
  const next   = LEVELS[idx + 1];
  const prevXP = current.minXP;
  const nextXP = next?.minXP ?? current.minXP + 500;
  const progress = nextXP === prevXP ? 100 : Math.round(((xp - prevXP) / (nextXP - prevXP)) * 100);
  return { ...current, next, progress, nextXP, prevXP };
}

export function getGoalStats(goal: Goal, studies: Study[]) {
  const linked = studies.filter(s => s.goalId === goal.id);
  const progress = linked.length > 0
    ? Math.round(linked.reduce((sum, s) => sum + s.progressPercent, 0) / linked.length)
    : goal.progress;
  const totalXP    = linked.reduce((sum, s) => sum + (s.sessions ?? []).reduce((ss, se) => ss + se.xpEarned, 0), 0);
  const totalHours = linked.reduce((sum, s) => sum + s.hoursCompleted, 0);
  return { progress, totalXP, totalHours, linked, linkedCount: linked.length };
}
