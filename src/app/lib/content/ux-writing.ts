/**
 * PET FRIENDLY APP - GUIA DE UX WRITING
 * Sistema de conteúdo escalável para tutores, passeadores e cuidadores de pets
 */

/* ============================================
   TOM DE VOZ & PRINCÍPIOS
   ============================================ */

export const VOICE_PRINCIPLES = {
  comoFalamos: {
    acolhedorMotivacional: [
      "Olá, [nome]! Bem-vindo ao Pet Friendly! 🐾",
      "Que bom ter você aqui novamente",
      "Seu pet vai adorar!",
      "Parabéns! Serviço concluído com sucesso"
    ],
    diretoCl aro: [
      "Entre para acessar sua conta",
      "Crie sua conta e comece a cuidar melhor do seu pet",
      "Gerencie agendamentos e serviços",
      "Encontre os melhores cuidadores para seu pet"
    ],
    inclusivoAcessivel: [
      "Evitar jargões técnicos desnecessários",
      "Usar linguagem simples e universal",
      "Incluir labels descritivos para leitores de tela",
      "Mostrar senha / Ocultar senha"
    ],
    respeitosoEducativo: [
      "Encontre cuidadores qualificados e verificados",
      "Conecte-se com outros tutores da comunidade",
      "Compartilhe experiências e dicas de cuidado",
      "Sempre contextualizar serviços oferecidos"
    ]
  },
  
  comoNaoFalamos: {
    tecnicoRobotizado: {
      errado: "Erro: Campo obrigatório não preenchido",
      correto: "Por favor, insira o nome do seu pet"
    },
    negativoCulpabilizante: {
      errado: "Você esqueceu de preencher este campo",
      correto: "Por favor, complete este campo para continuar"
    },
    vagoAmbiguo: {
      errado: "Clique aqui",
      correto: "Agendar passeio"
    },
    informalDemais: {
      errado: "Manda ver!",
      correto: "Começar agora"
    }
  }
};

/* ============================================
   BIBLIOTECA DE MICROCOPY POR CONTEXTO
   ============================================ */

export const MICROCOPY = {
  // AUTENTICAÇÃO
  autenticacao: {
    login: {
      titulo: "Entrar",
      subtitulo: "Entre para acessar sua conta",
      emailLabel: "E-mail",
      emailPlaceholder: "seu@email.com",
      senhaLabel: "Senha",
      senhaPlaceholder: "Digite sua senha",
      esqueciSenha: "Esqueci minha senha",
      separadorSocial: "ou continue com",
      novoUsuario: "Não tem uma conta? Criar conta",
      ctaPrimario: "Entrar",
      ctaSecundario: "Criar conta"
    },
    
    registro: {
      titulo: "Criar conta",
      subtitulo: "Crie sua conta e comece a cuidar melhor do seu pet",
      nomeLabel: "Nome completo",
      nomePlaceholder: "Seu nome completo",
      emailLabel: "E-mail",
      emailPlaceholder: "seu@email.com",
      senhaLabel: "Senha",
      senhaPlaceholder: "Mínimo 6 caracteres",
      confirmarSenhaLabel: "Confirmar senha",
      confirmarSenhaPlaceholder: "Digite a senha novamente",
      tipoUsuarioLabel: "Você é:",
      tipoUsuarioOpcoes: {
        tutor: "Tutor de pet",
        passeador: "Passeador",
        cuidador: "Cuidador/Prestador de serviço"
      },
      jaTemConta: "Já tem uma conta? Entrar",
      ctaPrimario: "Criar conta",
      ctaSecundario: "Voltar para login"
    },
    
    recuperarSenha: {
      titulo: "Recuperar senha",
      subtitulo: "Enviaremos um link para redefinir sua senha",
      emailLabel: "E-mail",
      emailPlaceholder: "seu@email.com",
      helperText: "Você receberá um e-mail com instruções",
      ctaPrimario: "Enviar link de redefinição",
      ctaSecundario: "Voltar para login"
    }
  },
  
  // NAVEGAÇÃO
  navegacao: {
    tutor: {
      home: "Início",
      pets: "Meus Pets",
      agendamentos: "Agendamentos",
      servicos: "Explorar Serviços",
      favoritos: "Favoritos",
      mensagens: "Mensagens",
      perfil: "Meu Perfil",
      sair: "Sair"
    },
    passeador: {
      home: "Início",
      agenda: "Minha Agenda",
      solicitacoes: "Solicitações",
      historico: "Histórico",
      mensagens: "Mensagens",
      perfil: "Meu Perfil",
      sair: "Sair"
    },
    cuidador: {
      home: "Início",
      servicos: "Meus Serviços",
      agenda: "Agenda",
      clientes: "Clientes",
      mensagens: "Mensagens",
      perfil: "Meu Perfil",
      sair: "Sair"
    }
  },
  
  // DASHBOARD
  dashboard: {
    tutor: {
      saudacao: "Olá, [nome]! 🐾",
      subtitulo: "Como está seu pet hoje?",
      proximosAgendamentos: "Próximos Agendamentos",
      meusPets: "Meus Pets",
      servicosRecomendados: "Serviços Recomendados",
      atividadeRecente: "Atividade Recente",
      vazio: "Você ainda não tem agendamentos"
    },
    passeador: {
      saudacao: "Olá, [nome]! Pronto para passear? 🐕",
      subtitulo: "Você tem [X] passeios hoje",
      proximosPasseios: "Próximos Passeios",
      solicitacoesPendentes: "Solicitações Pendentes",
      estatisticas: "Suas Estatísticas",
      vazio: "Nenhum passeio agendado para hoje"
    },
    cuidador: {
      saudacao: "Olá, [nome]! Bem-vindo de volta 🏥",
      subtitulo: "Você tem [X] serviços hoje",
      proximosServicos: "Próximos Serviços",
      novasSolicitacoes: "Novas Solicitações",
      avaliacoes: "Avaliações Recentes",
      vazio: "Nenhum serviço agendado para hoje"
    }
  },
  
  // FORMULÁRIOS - PETS
  formularios: {
    adicionarPet: {
      titulo: "Adicionar Pet",
      subtitulo: "Conte-nos sobre seu amigo",
      nomePetLabel: "Nome do pet",
      nomePetPlaceholder: "Ex: Rex, Mia, Bob...",
      especieLabel: "Espécie",
      especiePlaceholder: "Selecione a espécie",
      racaLabel: "Raça",
      racaPlaceholder: "Ex: Golden Retriever, SRD...",
      idadeLabel: "Idade",
      idadePlaceholder: "Ex: 2 anos, 6 meses...",
      pesoLabel: "Peso (kg)",
      pesoPlaceholder: "Ex: 15",
      sexoLabel: "Sexo",
      castradoLabel: "Castrado",
      observacoesLabel: "Observações importantes",
      observacoesPlaceholder: "Alergias, medicamentos, comportamentos especiais...",
      ctaPrimario: "Adicionar pet",
      ctaSecundario: "Cancelar"
    },
    
    agendarServico: {
      titulo: "Agendar Serviço",
      subtitulo: "Escolha data, horário e pet",
      petLabel: "Selecione o pet",
      petPlaceholder: "Escolha um pet",
      servicoLabel: "Tipo de serviço",
      dataLabel: "Data",
      horarioLabel: "Horário",
      duracaoLabel: "Duração",
      observacoesLabel: "Observações",
      observacoesPlaceholder: "Instruções especiais para o prestador...",
      ctaPrimario: "Confirmar agendamento",
      ctaSecundario: "Cancelar"
    }
  }
};

/* ============================================
   CALL-TO-ACTIONS (CTAs) PADRONIZADOS
   ============================================ */

export const CTAS = {
  primarios: {
    // Autenticação
    entrar: "Entrar",
    registrar: "Criar conta",
    enviarLink: "Enviar link de redefinição",
    
    // Agendamentos
    agendar: "Agendar serviço",
    confirmarAgendamento: "Confirmar agendamento",
    reagendar: "Reagendar",
    
    // Pets
    adicionarPet: "Adicionar pet",
    salvarPet: "Salvar alterações",
    
    // Serviços
    contratarServico: "Contratar serviço",
    aceitarSolicitacao: "Aceitar solicitação",
    iniciarServico: "Iniciar serviço",
    finalizarServico: "Finalizar serviço",
    
    // Perfil
    salvarAlteracoes: "Salvar alterações",
    editarPerfil: "Editar perfil",
    
    // Mensagens
    enviarMensagem: "Enviar mensagem",
    
    // Avaliações
    avaliar: "Avaliar serviço"
  },
  
  secundarios: {
    // Navegação
    voltar: "Voltar",
    voltarParaLogin: "Voltar para login",
    cancelar: "Cancelar",
    fechar: "Fechar",
    
    // Exploração
    verDetalhes: "Ver detalhes",
    verMais: "Ver mais",
    explorar: "Explorar",
    saibaMais: "Saiba mais",
    
    // Ações alternativas
    recusar: "Recusar",
    remover: "Remover",
    editar: "Editar",
    excluir: "Excluir",
    
    // Compartilhamento
    compartilhar: "Compartilhar perfil",
    copiarLink: "Copiar link"
  },
  
  estados: {
    // Agendamentos
    agendado: "Agendado ✓",
    emAndamento: "Em andamento",
    concluido: "Concluído",
    cancelado: "Cancelado",
    
    // Solicitações
    pendente: "Pendente",
    aceito: "Aceito ✓",
    recusado: "Recusado",
    
    // Disponibilidade
    disponivel: "Disponível",
    indisponivel: "Indisponível",
    
    // Verificação
    verificado: "Verificado ✓",
    emAnalise: "Em análise"
  }
};

/* ============================================
   MENSAGENS DE VALIDAÇÃO E ERRO
   ============================================ */

export const VALIDATION_MESSAGES = {
  camposVazios: {
    email: "Por favor, insira seu e-mail",
    senha: "Por favor, insira sua senha",
    nome: "Por favor, insira seu nome",
    nomePet: "Por favor, insira o nome do pet",
    telefone: "Por favor, insira seu telefone",
    data: "Por favor, selecione uma data",
    horario: "Por favor, selecione um horário"
  },
  
  validacao: {
    emailInvalido: "Por favor, insira um e-mail válido",
    senhaMinima: "A senha deve ter pelo menos 6 caracteres",
    senhasDiferentes: "As senhas não coincidem – verifique e tente novamente",
    senhaIncorreta: "Senha incorreta – verifique se você digitou corretamente",
    telefoneInvalido: "Por favor, insira um telefone válido",
    dataPassada: "Por favor, selecione uma data futura",
    pesoInvalido: "Por favor, insira um peso válido"
  },
  
  errosSistema: {
    carregarDados: "Não foi possível carregar os dados. Verifique sua conexão e tente novamente.",
    salvar: "Não foi possível salvar as alterações. Por favor, tente novamente.",
    upload: "Erro ao enviar arquivo. Verifique o formato e tente novamente.",
    conexao: "Sem conexão com a internet. Verifique sua rede.",
    generico: "Algo deu errado. Por favor, tente novamente."
  },
  
  agendamentos: {
    horarioIndisponivel: "Este horário não está mais disponível. Por favor, escolha outro.",
    conflito: "Você já tem um agendamento neste horário",
    prazoMinimo: "Agendamentos devem ser feitos com pelo menos 2 horas de antecedência",
    cancelamentoPrazo: "Cancelamentos devem ser feitos com pelo menos 4 horas de antecedência"
  }
};

/* ============================================
   MENSAGENS DE SUCESSO E FEEDBACK POSITIVO
   ============================================ */

export const SUCCESS_MESSAGES = {
  confirmacoes: {
    petAdicionado: "Pet adicionado com sucesso! 🐾",
    petEditado: "Informações do pet atualizadas com sucesso!",
    petRemovido: "Pet removido com sucesso",
    
    agendamentoCriado: "Agendamento confirmado! Você receberá uma notificação antes do horário.",
    agendamentoCancelado: "Agendamento cancelado com sucesso",
    
    perfilAtualizado: "Perfil atualizado com sucesso!",
    senhaAlterada: "Senha alterada com sucesso!",
    
    mensagemEnviada: "Mensagem enviada!",
    avaliacaoEnviada: "Obrigado pela avaliação! ⭐"
  },
  
  autenticacao: {
    contaCriada: "Conta criada com sucesso! Bem-vindo ao Pet Friendly 🐾",
    emailEnviado: "E-mail enviado! Verifique sua caixa de entrada e siga as instruções.",
    loginSucesso: "Bem-vindo de volta!"
  },
  
  servicos: {
    solicitacaoEnviada: "Solicitação enviada! Aguarde a confirmação do prestador.",
    solicitacaoAceita: "Solicitação aceita com sucesso!",
    servicoIniciado: "Serviço iniciado. Boa sorte! 🐕",
    servicoConcluido: "Serviço concluído com sucesso! 🎉"
  }
};

/* ============================================
   MENSAGENS VAZIAS (EMPTY STATES)
   ============================================ */

export const EMPTY_STATES = {
  pets: {
    titulo: "Nenhum pet cadastrado ainda",
    descricao: "Adicione seu primeiro pet para começar a usar o app",
    cta: "Adicionar meu primeiro pet"
  },
  
  agendamentos: {
    titulo: "Nenhum agendamento",
    descricao: "Você ainda não tem agendamentos. Explore os serviços disponíveis!",
    cta: "Explorar serviços"
  },
  
  mensagens: {
    titulo: "Nenhuma mensagem ainda",
    descricao: "Suas conversas aparecerão aqui",
    cta: null
  },
  
  favoritos: {
    titulo: "Nenhum favorito ainda",
    descricao: "Salve seus cuidadores e serviços favoritos para acesso rápido",
    cta: "Explorar serviços"
  },
  
  historico: {
    titulo: "Nenhum histórico",
    descricao: "Seus serviços concluídos aparecerão aqui",
    cta: null
  }
};

/* ============================================
   ACESSIBILIDADE - ARIA LABELS
   ============================================ */

export const ARIA_LABELS = {
  navegacao: {
    menuPrincipal: "Menu principal",
    abrirMenu: "Abrir menu",
    fecharMenu: "Fechar menu",
    voltarPagina: "Voltar para página anterior"
  },
  
  formularios: {
    mostrarSenha: "Mostrar senha",
    ocultarSenha: "Ocultar senha",
    selecionarData: "Selecionar data",
    selecionarHorario: "Selecionar horário",
    uploadFoto: "Enviar foto",
    removerFoto: "Remover foto"
  },
  
  acoes: {
    favoritar: "Adicionar aos favoritos",
    desfavoritar: "Remover dos favoritos",
    compartilhar: "Compartilhar",
    editar: "Editar",
    excluir: "Excluir",
    filtrar: "Filtrar resultados",
    ordenar: "Ordenar resultados"
  },
  
  notificacoes: {
    novaNotificacao: "Você tem [X] novas notificações",
    novaMensagem: "Nova mensagem de [nome]",
    sucesso: "Ação concluída com sucesso",
    erro: "Ocorreu um erro",
    aviso: "Atenção"
  }
};
