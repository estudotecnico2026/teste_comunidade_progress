/**
 * PROGRESS APP - SISTEMA DE UX WRITING
 * Gestão de Jornada de Estudos e Objetivos de Carreira
 * Tom de voz: Motivacional, Direto, Focado em Crescimento
 */

/* ============================================
   PRINCÍPIOS DE TOM DE VOZ
   ============================================ */

export const VOICE_PRINCIPLES = {
  comoFalamos: {
    motivacionalEncorajador: [
      "Parabéns! Você concluiu mais um curso! 🎉",
      "Continue assim! Você está 65% mais próximo do seu objetivo",
      "Excelente progresso esta semana!",
      "Sua dedicação está fazendo diferença"
    ],
    diretoCl aro: [
      "Criar Novo Objetivo",
      "Cadastrar Estudo",
      "Ver Meu Progresso",
      "Salvar Alterações"
    ],
    focadoCrescimento: [
      "Jornada de Aprendizado",
      "Evolução de Carreira",
      "Próximos Passos",
      "Metas Alcançadas"
    ],
    educativoOrientador: [
      "Dica: Divida objetivos grandes em metas menores",
      "Recomendado: Dedique ao menos 30min diários",
      "Progresso consistente é melhor que pressa",
      "Revise seus objetivos semanalmente"
    ]
  },
  
  comoNaoFalamos: {
    tecnicoRobotizado: {
      errado: "Processo de persistência de dados falhou",
      correto: "Não foi possível salvar. Tente novamente."
    },
    negativoCulpabilizante: {
      errado: "Você não estudou hoje. Que vergonha!",
      correto: "Sem estudos registrados hoje. Pronto para começar?"
    },
    vagoAmbiguo: {
      errado: "Clique aqui",
      correto: "Ver detalhes do curso"
    },
    infantilCondescendente: {
      errado: "Uhuu! Mandou bem demais!",
      correto: "Ótimo trabalho!"
    }
  }
};

/* ============================================
   AUTENTICAÇÃO
   ============================================ */

export const AUTH_COPY = {
  login: {
    titulo: "Entrar",
    subtitulo: "Continue sua jornada de aprendizado",
    emailLabel: "E-mail",
    emailPlaceholder: "seu@email.com",
    senhaLabel: "Senha",
    senhaPlaceholder: "Digite sua senha",
    esqueciSenha: "Esqueci minha senha",
    ctaPrimario: "Entrar",
    ctaSecundario: "Criar conta",
    novoUsuario: "Novo por aqui? Criar conta",
    jaTemConta: "Já tem conta? Entrar",
    separadorSocial: "ou continue com"
  },
  
  registro: {
    titulo: "Criar Conta",
    subtitulo: "Comece a organizar seus estudos e objetivos",
    nomeLabel: "Nome completo",
    nomePlaceholder: "Seu nome",
    emailLabel: "E-mail",
    emailPlaceholder: "seu@email.com",
    senhaLabel: "Senha",
    senhaPlaceholder: "Mínimo 8 caracteres",
    confirmarSenhaLabel: "Confirmar senha",
    confirmarSenhaPlaceholder: "Digite a senha novamente",
    ctaPrimario: "Criar conta",
    ctaSecundario: "Voltar para login",
    jaTemConta: "Já tem conta? Entrar"
  },
  
  recuperarSenha: {
    titulo: "Recuperar Senha",
    subtitulo: "Enviaremos um link para redefinir sua senha",
    emailLabel: "E-mail",
    emailPlaceholder: "seu@email.com",
    helperText: "Você receberá um e-mail com instruções",
    ctaPrimario: "Enviar link",
    ctaSecundario: "Voltar para login"
  }
};

/* ============================================
   DASHBOARD
   ============================================ */

export const DASHBOARD_COPY = {
  saudacao: "Olá, [nome]! 👋",
  subtitulos: [
    "Pronto para aprender algo novo hoje?",
    "Continue de onde parou",
    "Seu progresso está incrível!",
    "Mantenha a consistência",
    "Mais um dia, mais aprendizado"
  ],
  
  secoes: {
    emAndamento: "Estudos em Andamento",
    proximosPrazos: "Prazos Próximos",
    objetivos: "Meus Objetivos",
    objetivosAtivos: "Objetivos Ativos",
    estatisticas: "Visão Geral",
    atividadeRecente: "Atividade Recente",
    recomendacoes: "Recomendações para Você",
    conquistasRecentes: "Conquistas Recentes",
    tempoEstudo: "Tempo de Estudo",
    areasConhecimento: "Áreas de Conhecimento"
  },
  
  emptyStates: {
    semEstudos: {
      titulo: "Nenhum estudo cadastrado",
      descricao: "Cadastre seu primeiro curso, artigo ou projeto",
      cta: "Cadastrar estudo"
    },
    semObjetivos: {
      titulo: "Defina seu primeiro objetivo",
      descricao: "Estabeleça metas claras para guiar seus estudos",
      cta: "Criar objetivo"
    },
    semProgresso: {
      titulo: "Nenhum progresso registrado",
      descricao: "Complete estudos e atualize seu progresso para ver estatísticas",
      cta: null
    },
    semConquistas: {
      titulo: "Nenhuma conquista ainda",
      descricao: "Complete estudos e alcance objetivos para desbloquear conquistas",
      cta: null
    }
  },
  
  stats: {
    cursosAconcluidos: "Cursos Concluídos",
    horasEstudadas: "Horas Estudadas",
    objetivosAlcancados: "Objetivos Alcançados",
    sequenciaAtual: "Dias Consecutivos",
    progressoSemanal: "Progresso Semanal",
    mediaDiaria: "Média Diária"
  }
};

/* ============================================
   FORMULÁRIOS - OBJETIVOS
   ============================================ */

export const GOAL_FORM_COPY = {
  criar: {
    titulo: "Criar Novo Objetivo",
    subtitulo: "Defina onde você quer chegar"
  },
  
  editar: {
    titulo: "Editar Objetivo",
    subtitulo: "Atualize as informações do seu objetivo"
  },
  
  campos: {
    titulo: {
      label: "O que você quer alcançar?",
      placeholder: "Ex: Tornar-me Desenvolvedor Full Stack",
      helper: "Seja específico sobre o objetivo profissional"
    },
    area: {
      label: "Área de foco",
      placeholder: "Selecione uma área",
      opcoes: [
        { value: "desenvolvimento", label: "Desenvolvimento" },
        { value: "design", label: "Design" },
        { value: "marketing", label: "Marketing" },
        { value: "dados", label: "Dados e IA" },
        { value: "negocios", label: "Negócios" },
        { value: "gestao", label: "Gestão" },
        { value: "comunicacao", label: "Comunicação" },
        { value: "idiomas", label: "Idiomas" },
        { value: "saude", label: "Saúde" },
        { value: "financas", label: "Finanças" },
        { value: "outro", label: "Outro" }
      ]
    },
    nivel: {
      label: "Nível desejado",
      placeholder: "Selecione o nível",
      opcoes: [
        { value: "estagiario", label: "Estagiário", description: "Primeiro contato com a área" },
        { value: "junior", label: "Júnior", description: "Conhecimento básico" },
        { value: "pleno", label: "Pleno", description: "Experiência consolidada" },
        { value: "senior", label: "Sênior", description: "Expertise avançada" },
        { value: "especialista", label: "Especialista", description: "Referência na área" }
      ]
    },
    prazo: {
      label: "Prazo estimado",
      placeholder: "Selecione uma data",
      helper: "Quando você pretende alcançar este objetivo?"
    },
    descricao: {
      label: "Descrição (opcional)",
      placeholder: "Detalhe o que este objetivo significa para você...",
      helper: "Por que este objetivo é importante?"
    },
    prioridade: {
      label: "Prioridade",
      opcoes: [
        { value: "alta", label: "Alta", description: "Foco principal" },
        { value: "media", label: "Média", description: "Importante" },
        { value: "baixa", label: "Baixa", description: "Secundário" }
      ]
    }
  },
  
  acoes: {
    salvar: "Salvar objetivo",
    criar: "Criar objetivo",
    atualizar: "Atualizar objetivo",
    cancelar: "Cancelar",
    excluir: "Excluir objetivo",
    editar: "Editar",
    verDetalhes: "Ver detalhes",
    marcarConcluido: "Marcar como alcançado"
  },
  
  confirmacoes: {
    excluir: {
      titulo: "Excluir Objetivo?",
      descricao: "Esta ação não pode ser desfeita. O objetivo será removido permanentemente.",
      confirmar: "Excluir",
      cancelar: "Cancelar"
    },
    abandonar: {
      titulo: "Abandonar Objetivo?",
      descricao: "Você pode reativar este objetivo posteriormente.",
      confirmar: "Abandonar",
      cancelar: "Manter ativo"
    }
  }
};

/* ============================================
   FORMULÁRIOS - ESTUDOS
   ============================================ */

export const STUDY_FORM_COPY = {
  criar: {
    titulo: "Cadastrar Estudo",
    subtitulo: "Registre cursos, artigos, projetos e mais"
  },
  
  editar: {
    titulo: "Editar Estudo",
    subtitulo: "Atualize as informações do estudo"
  },
  
  campos: {
    tipo: {
      label: "Tipo de estudo",
      opcoes: [
        { value: "curso", label: "Curso", description: "Cursos online ou presenciais", icon: "GraduationCap" },
        { value: "artigo", label: "Artigo/Documentação", description: "Artigos, blogs, docs técnicas", icon: "FileText" },
        { value: "video", label: "Vídeo/Tutorial", description: "YouTube, Udemy, etc", icon: "Video" },
        { value: "livro", label: "Livro", description: "Livros físicos ou e-books", icon: "Book" },
        { value: "podcast", label: "Podcast", description: "Podcasts, audiobooks", icon: "Podcast" },
        { value: "projeto", label: "Projeto Prático", description: "Projetos hands-on", icon: "Code" },
        { value: "workshop", label: "Workshop/Evento", description: "Workshops, meetups", icon: "Users" },
        { value: "mentoria", label: "Mentoria", description: "Sessões de mentoria", icon: "MessageSquare" }
      ]
    },
    titulo: {
      label: "Nome do estudo",
      placeholder: "Ex: Curso Completo de React",
      helper: "Título do curso, artigo ou projeto"
    },
    area: {
      label: "Área de conhecimento",
      placeholder: "Selecione a área"
    },
    status: {
      label: "Status atual",
      opcoes: [
        { value: "nao-iniciado", label: "Não iniciado", icon: "Circle" },
        { value: "em-andamento", label: "Em andamento", icon: "Clock" },
        { value: "pausado", label: "Pausado", icon: "Pause" },
        { value: "concluido", label: "Concluído", icon: "CheckCircle" }
      ]
    },
    dataInicio: {
      label: "Data de início",
      placeholder: "Selecione a data"
    },
    dataFim: {
      label: "Data de conclusão (opcional)",
      placeholder: "Selecione a data",
      helper: "Deixe em branco se ainda não concluiu"
    },
    prazo: {
      label: "Prazo estimado (opcional)",
      placeholder: "Selecione uma data",
      helper: "Quando pretende concluir?"
    },
    cargaHoraria: {
      label: "Carga horária total (horas)",
      placeholder: "Ex: 20",
      helper: "Estimativa de horas necessárias"
    },
    horasConcluidas: {
      label: "Horas concluídas",
      placeholder: "0",
      helper: "Quantas horas você já dedicou?"
    },
    porcentagem: {
      label: "Progresso (%)",
      placeholder: "0",
      helper: "Quanto % você já completou?"
    },
    objetivo: {
      label: "Vincular a um objetivo (opcional)",
      placeholder: "Selecione um objetivo",
      helper: "Conecte este estudo a um objetivo de carreira"
    },
    url: {
      label: "Link (opcional)",
      placeholder: "https://...",
      helper: "URL do curso, artigo ou recurso"
    },
    instrutor: {
      label: "Instrutor/Autor (opcional)",
      placeholder: "Nome do instrutor ou autor"
    },
    plataforma: {
      label: "Plataforma (opcional)",
      placeholder: "Ex: Udemy, Coursera, Medium...",
      helper: "Onde você está estudando?"
    },
    anotacoes: {
      label: "Anotações",
      placeholder: "Principais aprendizados, recursos úteis...",
      helper: "Use este espaço para guardar insights importantes"
    },
    tags: {
      label: "Tags (opcional)",
      placeholder: "Separe por vírgulas: react, javascript, frontend",
      helper: "Facilite a busca e organização"
    }
  },
  
  acoes: {
    salvar: "Salvar estudo",
    criar: "Cadastrar estudo",
    atualizar: "Atualizar estudo",
    cancelar: "Cancelar",
    excluir: "Excluir estudo",
    editar: "Editar",
    verDetalhes: "Ver detalhes",
    marcarConcluido: "Marcar como concluído",
    continuarEstudando: "Continuar estudando",
    pausar: "Pausar",
    reativar: "Reativar"
  }
};

/* ============================================
   CALL-TO-ACTIONS (CTAs)
   ============================================ */

export const CTAS = {
  primarios: {
    // Gerais
    salvar: "Salvar",
    criar: "Criar",
    confirmar: "Confirmar",
    continuar: "Continuar",
    iniciar: "Iniciar",
    concluir: "Concluir",
    enviar: "Enviar",
    
    // Objetivos
    criarObjetivo: "Criar novo objetivo",
    salvarObjetivo: "Salvar objetivo",
    marcarAlcancado: "Marcar como alcançado",
    
    // Estudos
    cadastrarEstudo: "Cadastrar estudo",
    salvarEstudo: "Salvar estudo",
    marcarConcluido: "Marcar como concluído",
    continuarEstudando: "Continuar estudando",
    
    // Perfil
    editarPerfil: "Editar perfil",
    salvarAlteracoes: "Salvar alterações",
    
    // Outros
    verProgresso: "Ver meu progresso",
    verEstatisticas: "Ver estatísticas",
    exportarDados: "Exportar dados"
  },
  
  secundarios: {
    // Navegação
    cancelar: "Cancelar",
    voltar: "Voltar",
    fechar: "Fechar",
    pular: "Pular",
    depois: "Fazer depois",
    
    // Exploração
    verMais: "Ver mais",
    verDetalhes: "Ver detalhes",
    verTodos: "Ver todos",
    expandir: "Expandir",
    recolher: "Recolher",
    
    // Ações alternativas
    editar: "Editar",
    remover: "Remover",
    pausar: "Pausar",
    reativar: "Reativar",
    
    // Social
    compartilhar: "Compartilhar",
    copiarLink: "Copiar link"
  },
  
  destrutivos: {
    excluir: "Excluir",
    excluirPermanentemente: "Excluir permanentemente",
    remover: "Remover",
    abandonar: "Abandonar objetivo",
    limpar: "Limpar tudo",
    resetar: "Resetar progresso"
  }
};

/* ============================================
   VALIDAÇÃO DE FORMULÁRIOS
   ============================================ */

export const VALIDATION_MESSAGES = {
  required: "Este campo é obrigatório",
  
  email: {
    required: "Por favor, insira seu e-mail",
    invalid: "Por favor, insira um e-mail válido",
    inUse: "Este e-mail já está cadastrado"
  },
  
  senha: {
    required: "Por favor, insira sua senha",
    minLength: "A senha deve ter no mínimo 8 caracteres",
    maxLength: "A senha deve ter no máximo 128 caracteres",
    weak: "Senha muito fraca. Use letras, números e símbolos",
    match: "As senhas não coincidem",
    incorrect: "Senha incorreta"
  },
  
  nome: {
    required: "Por favor, insira seu nome",
    minLength: "O nome deve ter no mínimo 2 caracteres",
    maxLength: "O nome deve ter no máximo 100 caracteres"
  },
  
  titulo: {
    required: "Por favor, insira um título",
    minLength: "O título deve ter no mínimo 3 caracteres",
    maxLength: "O título deve ter no máximo 200 caracteres"
  },
  
  data: {
    required: "Por favor, selecione uma data",
    invalid: "Data inválida",
    passado: "A data não pode ser no passado",
    futuro: "A data não pode ser no futuro",
    range: "A data de fim deve ser posterior à data de início"
  },
  
  numero: {
    required: "Por favor, insira um número",
    invalid: "Insira um número válido",
    min: "O valor mínimo é [min]",
    max: "O valor máximo é [max]",
    positive: "O valor deve ser positivo"
  },
  
  texto: {
    minLength: "Mínimo de [min] caracteres",
    maxLength: "Máximo de [max] caracteres",
    pattern: "Formato inválido"
  },
  
  url: {
    invalid: "Por favor, insira uma URL válida",
    required: "Por favor, insira uma URL"
  },
  
  select: {
    required: "Por favor, selecione uma opção"
  }
};

/* ============================================
   MENSAGENS DE SUCESSO
   ============================================ */

export const SUCCESS_MESSAGES = {
  objetivo: {
    criado: "Objetivo criado com sucesso! 🎯",
    atualizado: "Objetivo atualizado!",
    excluido: "Objetivo removido",
    alcancado: "Parabéns! Objetivo alcançado! 🎉",
    reativado: "Objetivo reativado!",
    abandonado: "Objetivo marcado como abandonado"
  },
  
  estudo: {
    criado: "Estudo cadastrado com sucesso!",
    atualizado: "Estudo atualizado!",
    excluido: "Estudo removido",
    concluido: "Parabéns! Estudo concluído! ✅",
    pausado: "Estudo pausado",
    retomado: "Estudo retomado!",
    progressoAtualizado: "Progresso atualizado!"
  },
  
  perfil: {
    atualizado: "Perfil atualizado com sucesso!",
    fotoAlterada: "Foto de perfil atualizada!",
    preferenciasAtualizadas: "Preferências salvas!"
  },
  
  conta: {
    criada: "Conta criada! Bem-vindo ao Progress! 🚀",
    emailEnviado: "E-mail enviado! Verifique sua caixa de entrada.",
    emailVerificado: "E-mail verificado com sucesso!",
    senhaAlterada: "Senha alterada com sucesso!",
    perfilCompleto: "Perfil completo!"
  },
  
  export: {
    sucesso: "Dados exportados com sucesso!",
    download: "Download iniciado!"
  },
  
  generic: "Operação realizada com sucesso!"
};

/* ============================================
   MENSAGENS DE ERRO
   ============================================ */

export const ERROR_MESSAGES = {
  generic: "Algo deu errado. Por favor, tente novamente.",
  network: "Sem conexão. Verifique sua internet e tente novamente.",
  timeout: "A requisição demorou muito. Tente novamente.",
  
  auth: {
    invalidCredentials: "E-mail ou senha incorretos",
    emailInUse: "Este e-mail já está cadastrado",
    weakPassword: "Senha muito fraca. Use ao menos 8 caracteres",
    userNotFound: "Usuário não encontrado",
    emailNotVerified: "Por favor, verifique seu e-mail primeiro",
    sessionExpired: "Sua sessão expirou. Faça login novamente."
  },
  
  save: "Não foi possível salvar. Tente novamente.",
  load: "Não foi possível carregar os dados. Tente novamente.",
  delete: "Não foi possível excluir. Tente novamente.",
  update: "Não foi possível atualizar. Tente novamente.",
  
  upload: {
    failed: "Erro ao enviar arquivo. Tente novamente.",
    sizeTooLarge: "Arquivo muito grande. Máximo: [maxSize]MB",
    invalidType: "Tipo de arquivo não permitido",
    generic: "Erro no upload. Tente novamente."
  },
  
  notFound: {
    objetivo: "Objetivo não encontrado",
    estudo: "Estudo não encontrado",
    usuario: "Usuário não encontrado",
    pagina: "Página não encontrada"
  }
};

/* ============================================
   MENSAGENS DE AVISO
   ============================================ */

export const WARNING_MESSAGES = {
  prazoProximo: "Prazo se aproximando: [dias] dias restantes ⏰",
  prazoVencido: "Prazo vencido há [dias] dias",
  semProgresso: "Sem progresso registrado nos últimos 7 dias",
  metaNaoVinculada: "Este estudo não está vinculado a nenhum objetivo",
  objetivoSemEstudos: "Este objetivo não possui estudos vinculados",
  
  exclusao: {
    objetivo: "Tem certeza? Esta ação não pode ser desfeita.",
    estudo: "Ao excluir, você perderá todo o histórico de progresso.",
    conta: "ATENÇÃO: Todos os seus dados serão removidos permanentemente."
  },
  
  dados: {
    naoSalvo: "Você tem alterações não salvas. Deseja sair mesmo assim?",
    sobrescrever: "Isso irá sobrescrever seus dados atuais. Continuar?"
  },
  
  limite: {
    objetivos: "Você atingiu o limite de [max] objetivos ativos",
    estudos: "Você atingiu o limite de [max] estudos simultâneos"
  }
};

/* ============================================
   EMPTY STATES (ESTADOS VAZIOS)
   ============================================ */

export const EMPTY_STATES = {
  estudos: {
    titulo: "Nenhum estudo cadastrado",
    descricao: "Comece registrando cursos, artigos ou projetos que você está estudando",
    cta: "Cadastrar primeiro estudo",
    icon: "BookOpen"
  },
  
  objetivos: {
    titulo: "Defina seu primeiro objetivo",
    descricao: "Objetivos claros ajudam a manter o foco e a motivação",
    cta: "Criar primeiro objetivo",
    icon: "Target"
  },
  
  progresso: {
    titulo: "Nenhum progresso registrado",
    descricao: "Complete estudos e atualize seu progresso para ver estatísticas aqui",
    cta: null,
    icon: "TrendingUp"
  },
  
  busca: {
    titulo: "Nenhum resultado encontrado",
    descricao: "Tente usar termos diferentes ou ajustar os filtros",
    cta: "Limpar filtros",
    icon: "Search"
  },
  
  conquistas: {
    titulo: "Nenhuma conquista ainda",
    descricao: "Complete estudos e alcance objetivos para desbloquear conquistas",
    cta: null,
    icon: "Trophy"
  },
  
  calendario: {
    titulo: "Nenhum evento agendado",
    descricao: "Adicione prazos e marcos importantes ao seu calendário",
    cta: "Adicionar evento",
    icon: "Calendar"
  },
  
  atividades: {
    titulo: "Nenhuma atividade recente",
    descricao: "Suas ações aparecerão aqui conforme você usa o app",
    cta: null,
    icon: "Activity"
  },
  
  favoritos: {
    titulo: "Nenhum favorito",
    descricao: "Marque estudos e objetivos importantes como favoritos",
    cta: null,
    icon: "Heart"
  }
};

/* ============================================
   ARIA LABELS (ACESSIBILIDADE)
   ============================================ */

export const ARIA_LABELS = {
  navegacao: {
    menuPrincipal: "Menu principal",
    abrirMenu: "Abrir menu",
    fecharMenu: "Fechar menu",
    voltarPagina: "Voltar para página anterior",
    irParaInicio: "Ir para início",
    pularConteudo: "Pular para conteúdo principal"
  },
  
  formularios: {
    mostrarSenha: "Mostrar senha",
    ocultarSenha: "Ocultar senha",
    selecionarData: "Selecionar data",
    abrirCalendario: "Abrir calendário",
    fecharCalendario: "Fechar calendário",
    removerItem: "Remover item",
    uploadFoto: "Enviar foto",
    removerFoto: "Remover foto",
    selecionarArquivo: "Selecionar arquivo"
  },
  
  acoes: {
    editar: "Editar [item]",
    excluir: "Excluir [item]",
    visualizar: "Visualizar detalhes de [item]",
    expandir: "Expandir seção",
    recolher: "Recolher seção",
    favoritar: "Adicionar aos favoritos",
    desfavoritar: "Remover dos favoritos",
    compartilhar: "Compartilhar",
    copiar: "Copiar para área de transferência",
    download: "Baixar"
  },
  
  progresso: {
    barraProgresso: "Progresso: [valor]% concluído",
    status: "Status: [status]",
    horasEstudadas: "[horas] horas estudadas de [total] total",
    diasConsecutivos: "[dias] dias consecutivos"
  },
  
  filtros: {
    abrirFiltros: "Abrir filtros",
    fecharFiltros: "Fechar filtros",
    limparFiltros: "Limpar todos os filtros",
    aplicarFiltros: "Aplicar filtros"
  },
  
  modal: {
    fechar: "Fechar modal",
    confirmar: "Confirmar ação",
    cancelar: "Cancelar ação"
  },
  
  notificacoes: {
    novaNotificacao: "Você tem [count] novas notificações",
    marcarLida: "Marcar como lida",
    marcarTodasLidas: "Marcar todas como lidas",
    limparNotificacoes: "Limpar notificações"
  }
};

/* ============================================
   AJUDA E TOOLTIPS
   ============================================ */

export const TOOLTIPS = {
  objetivo: {
    prioridade: "Defina o nível de importância deste objetivo em sua jornada",
    prazo: "Estabeleça um prazo realista para manter o foco",
    nivel: "Escolha o nível profissional que deseja alcançar"
  },
  
  estudo: {
    cargaHoraria: "Estimativa de quanto tempo você precisará dedicar",
    vinculo: "Conecte este estudo a um objetivo para acompanhar melhor seu progresso",
    tags: "Use tags para organizar e encontrar seus estudos facilmente"
  },
  
  dashboard: {
    streak: "Dias consecutivos com atividade de estudo",
    progressoSemanal: "Seu progresso nos últimos 7 dias",
    proximoPrazo: "Próximo prazo a vencer"
  },
  
  perfil: {
    foto: "Clique para alterar sua foto de perfil",
    privacidade: "Controle quem pode ver seu perfil e progresso"
  }
};

/* ============================================
   ONBOARDING
   ============================================ */

export const ONBOARDING_COPY = {
  bemVindo: {
    titulo: "Bem-vindo ao Progress! 🚀",
    descricao: "Organize seus estudos, defina objetivos e acompanhe sua evolução profissional",
    cta: "Começar"
  },
  
  steps: [
    {
      titulo: "Defina seus objetivos",
      descricao: "Estabeleça onde você quer chegar em sua carreira",
      icon: "Target"
    },
    {
      titulo: "Cadastre seus estudos",
      descricao: "Registre cursos, artigos, projetos e acompanhe seu progresso",
      icon: "BookOpen"
    },
    {
      titulo: "Visualize sua evolução",
      descricao: "Veja estatísticas, conquistas e mantenha-se motivado",
      icon: "TrendingUp"
    }
  ],
  
  finalizar: {
    titulo: "Tudo pronto!",
    descricao: "Agora é hora de começar sua jornada de aprendizado",
    cta: "Ir para Dashboard"
  }
};

/* ============================================
   FEEDBACK MOTIVACIONAL
   ============================================ */

export const MOTIVATIONAL_FEEDBACK = {
  conquistaDesbloqueada: "🏆 Conquista desbloqueada: [nome]!",
  metaAlcancada: "🎯 Meta alcançada! [nome]",
  sequenciaMantica: "🔥 [dias] dias consecutivos! Você está no ritmo!",
  horasMilestone: "⏱️ [horas] horas de estudo! Excelente dedicação!",
  progressoSemanal: "📈 +[porcentagem]% esta semana. Continue assim!",
  cursoCompleto: "✅ Mais um curso concluído! Parabéns!",
  primeiroObjetivo: "🎉 Primeiro objetivo criado! Sua jornada começou!",
  
  encorajamento: [
    "Cada passo conta!",
    "Você está progredindo!",
    "Continue assim!",
    "Excelente trabalho!",
    "Mantenha o foco!",
    "Sua dedicação faz diferença!",
    "Progresso consistente é o segredo!"
  ]
};
