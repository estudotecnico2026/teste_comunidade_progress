# Product Requirements Document (PRD)
# Progress - Sistema de Gestão de Jornada de Estudos e Objetivos de Carreira

**Versão**: 1.0.0  
**Data**: Dezembro 2024  
**Status**: MVP em Desenvolvimento  
**Owner**: Product Team

---

## 📋 Sumário Executivo

Progress é um sistema web SaaS para gestão de estudos e evolução profissional, voltado para estudantes e profissionais em transição de carreira. O produto combina organização de estudos, definição de objetivos e acompanhamento de progresso com feedback inteligente e visualizações motivacionais.

**Stack**: Lovable (React/TypeScript) + Supabase (Auth/Database)  
**Modelo**: Freemium com planos pagos futuros  
**Mercado-Alvo**: Brasil e América Latina (inicial)

---

## 1. 🎯 Declaração do Problema

### Problema Central

**Profissionais em transição de carreira e autodidatas enfrentam dificuldade em manter organização, foco e motivação em suas jornadas de aprendizado.**

### Contexto Detalhado

#### Para Estudantes e Profissionais em Requalificação:

**Desorganização**
- Cursos começados e abandonados sem registro
- Materiais espalhados em múltiplas plataformas (Udemy, YouTube, Medium, etc.)
- Perda de progresso e dificuldade em retomar estudos

**Falta de Direcionamento**
- Objetivos de carreira vagos ou não documentados
- Dificuldade em conectar estudos com metas profissionais
- Não saber qual próximo passo tomar

**Baixa Motivação**
- Falta de visibilidade do progresso alcançado
- Ausência de celebração de conquistas
- Dificuldade em manter consistência (streaks)

**Dispersão de Informação**
- Cada plataforma tem seu próprio tracking
- Não há visão consolidada de toda a jornada
- Impossível mensurar ROI de tempo investido

### Oportunidade de Mercado

- **500M+** profissionais no mundo em upskilling/reskilling
- **$350B** mercado global de educação online (2025)
- **72%** dos profissionais brasileiros planejam mudar de carreira nos próximos 2 anos
- **Crescimento 21% a.a.** em cursos online (Brasil)

### Solução Proposta

Uma plataforma centralizada que:
1. **Organiza** todos os estudos em um único lugar
2. **Conecta** estudos a objetivos de carreira
3. **Visualiza** progresso de forma motivacional
4. **Recomenda** próximos passos baseado em dados
5. **Celebra** conquistas e mantém engajamento

---

## 2. 👥 Personas de Usuário

### Persona 1: Ana - A Profissional em Transição

**Demográfico**
- **Idade**: 28 anos
- **Profissão**: Analista de Marketing
- **Formação**: Graduação em Comunicação
- **Localização**: São Paulo, SP
- **Renda**: R$ 5.000/mês

**Objetivos**
- Migrar para área de Product Management em 18 meses
- Aprender sobre dados, UX e metodologias ágeis
- Conseguir primeiro emprego como APM (Associate Product Manager)
- Construir portfólio de projetos práticos

**Dores**
- Está fazendo 3 cursos simultaneamente e se sente perdida
- Não sabe se está estudando as coisas certas para a transição
- Sente que não progride, apesar de estudar 10h/semana
- Já abandonou 5 cursos nos últimos 6 meses
- Não tem visibilidade do quanto evoluiu

**Comportamentos**
- Estuda principalmente à noite e fins de semana
- Usa Notion para anotações (desorganizadas)
- Consome conteúdo em Udemy, YouTube, Medium, podcasts
- Participa de comunidades no LinkedIn e Discord
- Adora listas, planejamento e organização visual

**Citação**
> "Eu estudo muito, mas sinto que não saio do lugar. Gostaria de ver minha evolução de forma clara e saber se estou no caminho certo."

**Jobs-to-be-Done**
- Quando inicio uma transição de carreira, preciso organizar meus estudos e ver progresso claro, para manter motivação e direcionamento.

---

### Persona 2: Carlos - O Autodidata Consistente

**Demográfico**
- **Idade**: 35 anos
- **Profissão**: Desenvolvedor Júnior (autodidata)
- **Formação**: Técnico em Informática
- **Localização**: Belo Horizonte, MG
- **Renda**: R$ 3.500/mês

**Objetivos**
- Tornar-se desenvolvedor pleno em 2 anos
- Dominar React, TypeScript e Node.js
- Contribuir com projetos open-source
- Aumentar salário para R$ 8.000/mês

**Dores**
- Aprende sozinho há 3 anos mas não tem diploma
- Precisa comprovar conhecimento de forma objetiva
- Dificuldade em medir se está "pronto" para pleno
- Estuda de forma dispersa, sem estratégia clara
- Insegurança sobre progressão de carreira

**Comportamentos**
- Estuda 2h por dia de forma disciplinada (streak de 180 dias)
- Prefere conteúdo gratuito (YouTube, docs, artigos)
- Faz projetos práticos para fixar aprendizado
- Mantém GitHub ativo
- Usa planilhas Excel para tracking (manual e chato)

**Citação**
> "Sou disciplinado, mas preciso de um sistema que me mostre onde estou e o que falta para chegar onde quero."

**Jobs-to-be-Done**
- Quando estudo de forma autodidata, preciso comprovar minha evolução e ter clareza de gaps, para ter confiança em buscar posições mais seniores.

---

### Persona 3: Júlia - A Estudante Ansiosa

**Demográfico**
- **Idade**: 22 anos
- **Profissão**: Estudante de Design (formanda)
- **Formação**: Cursando Design Gráfico
- **Localização**: Florianópolis, SC
- **Renda**: R$ 1.200/mês (estágio)

**Objetivos**
- Conseguir primeiro emprego como UX Designer
- Aprender Figma, pesquisa de usuário, prototipação
- Construir portfólio forte até a formatura (6 meses)
- Destacar-se em processos seletivos

**Dores**
- Ansiedade sobre estar "preparada o suficiente"
- Comparação constante com outros designers (imposter syndrome)
- Dificuldade em priorizar o que estudar
- Medo de escolher cursos errados e perder tempo
- Falta de validação externa do progresso

**Comportamentos**
- Estuda de forma compulsiva e irregular (burnout)
- Busca validação em comunidades de design
- Consome muito conteúdo mas não aplica
- Anota tudo mas não revisa
- Troca de foco constantemente (FOMO)

**Citação**
> "Tenho medo de não estar estudando o que o mercado pede. Preciso de direcionamento e saber que estou evoluindo."

**Jobs-to-be-Done**
- Quando me preparo para o mercado de trabalho, preciso de validação de progresso e direcionamento claro, para reduzir ansiedade e ter confiança.

---

## 3. ✅ Objetivos e Não-Objetivos

### Objetivos (O que DEVE fazer)

#### MVP (Q1 2025)
- ✅ Permitir cadastro e autenticação de usuários
- ✅ Cadastrar objetivos de carreira com prazo e nível desejado
- ✅ Registrar estudos (curso, artigo, vídeo, projeto) com progresso
- ✅ Vincular estudos a objetivos
- ✅ Visualizar progresso individual de estudos
- ✅ Dashboard básico com visão geral

#### V1.0 (Q2 2025)
- 📊 Dashboard avançado com KPIs visuais
  - Horas estudadas (semanal, mensal, total)
  - Taxa de conclusão
  - Distribuição por área de conhecimento
  - Streak (dias consecutivos)
  
- 🎯 Sistema de feedback inteligente
  - Alertas de prazos próximos
  - Sugestões baseadas em objetivos
  - Identificação de gaps de conhecimento
  
- 📅 Recap mensal e anual
  - Storytelling visual da jornada
  - Conquistas desbloqueadas
  - Estatísticas motivacionais
  
- 🏆 Sistema de conquistas
  - Badges por milestones (10 cursos, 100h estudadas, etc.)
  - Níveis de progresso
  - Celebrações visuais

#### V2.0 (Q3-Q4 2025)
- 🤖 Recomendações personalizadas
  - IA sugere próximos estudos baseado em objetivo
  - Curadoria de conteúdo relevante
  
- 📈 Analytics avançado
  - Comparação com períodos anteriores
  - Predição de alcance de objetivos
  - ROI de tempo investido
  
- 🔗 Integrações
  - Udemy, Coursera (import automático)
  - Google Calendar (sync de prazos)
  - Notion (export de anotações)

### Não-Objetivos (O que NÃO deve fazer nesta fase)

#### Explicitamente FORA do escopo

❌ **Plataforma de conteúdo própria**
- Não vamos criar ou hospedar cursos
- Foco é agregação e organização

❌ **Rede social / Comunidade**
- Sem feed social, comentários, mensagens
- Produto é individual, não colaborativo

❌ **Mentoria ou matchmaking**
- Não conectar usuários com mentores
- Não facilitar networking

❌ **Sistema de pagamento a creators**
- Não monetizar criadores de conteúdo
- Não marketplace de cursos

❌ **Features enterprise B2B**
- Sem gestão de equipes
- Sem admin de múltiplos usuários
- Foco é B2C individual

❌ **Certificação ou validação oficial**
- Não emitir certificados reconhecidos
- Não validar competências formalmente

❌ **Mobile app nativo**
- Apenas web responsivo (PWA futuramente)

---

## 4. 📊 Métricas de Sucesso

### North Star Metric

**Horas de estudo registradas por usuário ativo mensalmente (MAU)**

Justificativa: Indica engajamento real e valor entregue.

### Métricas Primárias (P0)

| Métrica | Definição | Meta MVP | Meta V1.0 | Meta V2.0 |
|---------|-----------|----------|-----------|-----------|
| **WAU** (Weekly Active Users) | Usuários que logam 1+ vez/semana | 100 | 1.000 | 5.000 |
| **Retention D7** | % usuários que retornam em 7 dias | 40% | 50% | 60% |
| **Retention D30** | % usuários que retornam em 30 dias | 20% | 30% | 45% |
| **Avg. Study Hours/User/Week** | Média de horas estudadas/semana | 3h | 5h | 7h |
| **Goal Completion Rate** | % objetivos alcançados no prazo | 15% | 25% | 35% |
| **Study Completion Rate** | % estudos concluídos vs iniciados | 30% | 45% | 60% |

### Métricas Secundárias (P1)

| Métrica | Definição | Meta V1.0 |
|---------|-----------|-----------|
| **Time to First Goal** | Tempo médio até criar 1º objetivo | < 5 min |
| **Time to First Study** | Tempo médio até cadastrar 1º estudo | < 10 min |
| **Onboarding Completion** | % que completa onboarding | > 70% |
| **Weekly Streak Avg** | Média de dias consecutivos | 4 dias |
| **Features Adoption** | % usuários que usam Dashboard avançado | > 60% |
| **NPS (Net Promoter Score)** | Satisfação e recomendação | > 40 |

### Métricas de Negócio (Futuro)

| Métrica | Definição | Meta (2026) |
|---------|-----------|-------------|
| **MRR** (Monthly Recurring Revenue) | Receita recorrente mensal | $10k |
| **CAC** (Customer Acquisition Cost) | Custo por usuário adquirido | < $5 |
| **LTV** (Lifetime Value) | Valor vitalício do usuário | > $50 |
| **Conversion Free→Paid** | Taxa de conversão freemium | 5% |
| **Churn Rate** | Taxa de cancelamento mensal | < 5% |

### Métricas de Qualidade

| Métrica | Definição | Meta |
|---------|-----------|------|
| **Page Load Time** | Tempo de carregamento médio | < 2s |
| **Error Rate** | Taxa de erros frontend | < 1% |
| **Uptime** | Disponibilidade do sistema | > 99.5% |
| **Acessibilidade Score** | Lighthouse Accessibility | > 95 |
| **Mobile Usability** | Google Mobile-Friendly | 100% |

### Dashboard de Métricas (Instrumentação)

```typescript
// Eventos trackeados (Analytics)
- user_signup
- goal_created
- study_created
- study_completed
- study_progress_updated
- dashboard_viewed
- achievement_unlocked
- recap_generated
- session_duration
- feature_used (qual feature)
```

---

## 5. ⚙️ Requisitos Funcionais

### 5.1 Autenticação e Onboarding

#### RF-001: Autenticação de Usuários
**Prioridade**: P0 (Crítico)

**Descrição**:
Sistema deve permitir cadastro e login via e-mail/senha ou OAuth (Google).

**Critérios de Aceite**:
- [ ] Usuário pode criar conta com e-mail + senha (min 8 caracteres)
- [ ] Validação de e-mail obrigatória
- [ ] Login via Google OAuth funcional
- [ ] Recuperação de senha via e-mail
- [ ] Sessão persiste por 30 dias (remember me)
- [ ] Logout limpa sessão completamente

**Regras de Negócio**:
- E-mail único por conta
- Senha deve ter min 8 caracteres, 1 letra, 1 número
- Token de reset válido por 1 hora

---

#### RF-002: Onboarding Guiado
**Prioridade**: P0 (Crítico)

**Descrição**:
Fluxo inicial para novos usuários entenderem o produto e criarem primeiro objetivo.

**Critérios de Aceite**:
- [ ] 3 telas explicativas (welcome, features, benefits)
- [ ] Pode pular onboarding (não obrigatório)
- [ ] Ao final, sugere criar primeiro objetivo
- [ ] Se criar objetivo, onboarding marca como completo
- [ ] Onboarding não aparece novamente após conclusão

**Fluxo**:
1. Tela 1: "Bem-vindo ao Progress! 🚀" + Explicação
2. Tela 2: "Organize seus estudos" + Screenshot
3. Tela 3: "Acompanhe sua evolução" + Screenshot
4. CTA: "Criar meu primeiro objetivo"

---

### 5.2 Gestão de Objetivos

#### RF-003: Cadastro de Objetivos
**Prioridade**: P0 (Crítico)

**Descrição**:
Usuário pode criar objetivos de carreira com informações estruturadas.

**Critérios de Aceite**:
- [ ] Formulário com campos: título, área, nível desejado, prazo, descrição
- [ ] Campo título obrigatório (max 200 chars)
- [ ] Área selecionável de lista predefinida
- [ ] Nível: Estagiário, Júnior, Pleno, Sênior, Especialista
- [ ] Prazo: date picker com validação (não pode ser passado)
- [ ] Descrição opcional (max 1000 chars)
- [ ] Prioridade: Alta, Média, Baixa
- [ ] Validação de campos obrigatórios
- [ ] Mensagem de sucesso ao criar

**Campos**:
```typescript
interface Goal {
  id: string;
  user_id: string;
  title: string;                    // obrigatório
  area: KnowledgeArea;              // obrigatório
  current_level?: CareerLevel;      // opcional
  desired_level: CareerLevel;       // obrigatório
  deadline?: Date;                  // opcional
  description?: string;             // opcional
  priority: Priority;               // padrão: média
  status: 'ativo' | 'alcancado' | 'abandonado';
  created_at: Date;
  updated_at: Date;
}
```

---

#### RF-004: Edição e Exclusão de Objetivos
**Prioridade**: P0 (Crítico)

**Critérios de Aceite**:
- [ ] Usuário pode editar qualquer campo do objetivo
- [ ] Exclusão pede confirmação
- [ ] Ao excluir objetivo, estudos vinculados mantêm-se (apenas desvincular)
- [ ] Histórico de edições mantido (audit log)

---

#### RF-005: Marcação de Objetivo como Alcançado
**Prioridade**: P1 (Alta)

**Critérios de Aceite**:
- [ ] Botão "Marcar como alcançado" em objetivos ativos
- [ ] Pede confirmação antes de marcar
- [ ] Ao marcar, status muda para 'alcancado'
- [ ] Celebração visual (confetti, modal)
- [ ] Objetivo alcançado some da lista de ativos
- [ ] Aparece em "Conquistas" no Dashboard

---

### 5.3 Gestão de Estudos

#### RF-006: Cadastro de Estudos
**Prioridade**: P0 (Crítico)

**Descrição**:
Usuário pode registrar materiais de estudo de diversos tipos.

**Critérios de Aceite**:
- [ ] Formulário com: tipo, título, área, status, datas, carga horária
- [ ] Tipo: Curso, Artigo, Vídeo, Livro, Podcast, Projeto, Workshop, Mentoria
- [ ] Status: Não iniciado, Em andamento, Pausado, Concluído
- [ ] Data início/fim opcionais
- [ ] Carga horária total (horas)
- [ ] Progresso em % ou horas concluídas
- [ ] Vincular a objetivo (opcional, seleção múltipla)
- [ ] URL do recurso (opcional)
- [ ] Plataforma (opcional): Udemy, Coursera, YouTube, etc.
- [ ] Instrutor/Autor (opcional)
- [ ] Anotações (textarea)
- [ ] Tags (opcional)

**Campos**:
```typescript
interface Study {
  id: string;
  user_id: string;
  type: StudyType;                  // obrigatório
  title: string;                    // obrigatório
  area: KnowledgeArea;              // obrigatório
  status: StudyStatus;              // padrão: não iniciado
  start_date?: Date;
  end_date?: Date;
  deadline?: Date;
  total_hours?: number;
  completed_hours?: number;
  progress_percentage?: number;     // 0-100
  goal_ids?: string[];              // vincular múltiplos objetivos
  url?: string;
  platform?: string;
  instructor?: string;
  notes?: string;
  tags?: string[];
  created_at: Date;
  updated_at: Date;
}
```

---

#### RF-007: Atualização de Progresso
**Prioridade**: P0 (Crítico)

**Critérios de Aceite**:
- [ ] Usuário pode atualizar % de progresso
- [ ] Ou atualizar horas concluídas (auto-calcula %)
- [ ] Slider visual para % (0-100)
- [ ] Input numérico para horas
- [ ] Ao atingir 100%, sugere marcar como concluído
- [ ] Histórico de atualizações de progresso

---

#### RF-008: Marcação de Estudo como Concluído
**Prioridade**: P0 (Crítico)

**Critérios de Aceite**:
- [ ] Botão "Marcar como concluído"
- [ ] Auto-seta data de conclusão (hoje)
- [ ] Progresso vai para 100%
- [ ] Status muda para 'concluído'
- [ ] Mensagem de celebração
- [ ] Se vinculado a objetivo, atualiza progresso do objetivo

---

### 5.4 Dashboard

#### RF-009: Dashboard Básico (MVP)
**Prioridade**: P0 (Crítico)

**Componentes**:
- [ ] Saudação personalizada com nome do usuário
- [ ] Lista de estudos em andamento (até 5)
- [ ] Lista de objetivos ativos (até 3)
- [ ] Próximos prazos (estudos/objetivos com deadline próximo)
- [ ] Estatísticas básicas:
  - Total de estudos cadastrados
  - Total de estudos concluídos
  - Total de horas estudadas
  - Dias consecutivos (streak)

---

#### RF-010: Dashboard Avançado (V1.0)
**Prioridade**: P1 (Alta)

**Componentes**:
- [ ] Gráfico de horas estudadas (últimos 30 dias - line chart)
- [ ] Gráfico de distribuição por área (pie chart)
- [ ] Gráfico de tipos de estudo (bar chart)
- [ ] Cards de KPIs:
  - Cursos concluídos (com tendência)
  - Horas estudadas esta semana
  - Taxa de conclusão
  - Streak atual
- [ ] Atividade recente (timeline)
- [ ] Recomendações de próximos estudos

**Visualizações**:
- Usar Recharts para gráficos
- Responsivo (mobile-first)
- Tooltips informativos
- Cores baseadas no Design System

---

### 5.5 Feedback e Notificações

#### RF-011: Sistema de Alertas
**Prioridade**: P1 (Alta)

**Critérios de Aceite**:
- [ ] Alerta de prazo próximo (7 dias antes)
- [ ] Alerta de prazo vencido
- [ ] Sugestão quando não estuda há 7 dias
- [ ] Celebração ao concluir estudo/objetivo
- [ ] Toast notifications para ações (criar, editar, excluir)

**Tipos de Notificação**:
```typescript
type NotificationType = 
  | 'deadline_near'      // 7 dias antes
  | 'deadline_passed'    // prazo vencido
  | 'no_activity'        // 7 dias sem atividade
  | 'achievement'        // conquista desbloqueada
  | 'milestone'          // milestone alcançado (10 cursos, 100h)
  | 'suggestion';        // sugestão de estudo
```

---

#### RF-012: Sistema de Conquistas (V1.0)
**Prioridade**: P2 (Média)

**Conquistas Predefinidas**:
- 🎯 Primeiro Objetivo (criar 1º objetivo)
- 📚 Primeiro Estudo (cadastrar 1º estudo)
- ✅ Primeira Conclusão (concluir 1º estudo)
- 🔥 Streak de 7 dias
- 🔥 Streak de 30 dias
- 📖 10 Cursos Concluídos
- ⏱️ 50 Horas Estudadas
- ⏱️ 100 Horas Estudadas
- 🎓 Objetivo Alcançado (1º objetivo)
- 🏆 3 Objetivos Alcançados

**Critérios de Aceite**:
- [ ] Sistema detecta automaticamente quando conquista é alcançada
- [ ] Modal de celebração ao desbloquear
- [ ] Página "Minhas Conquistas" lista todas
- [ ] Badge visual para cada conquista
- [ ] Conquistas bloqueadas aparecem "locked"

---

### 5.6 Recap e Relatórios

#### RF-013: Recap Mensal (V1.0)
**Prioridade**: P1 (Alta)

**Descrição**:
No início de cada mês, gerar recap visual do mês anterior.

**Conteúdo**:
- Total de horas estudadas
- Estudos concluídos
- Área de conhecimento mais estudada
- Conquistas desbloqueadas
- Streak máximo
- Frase motivacional personalizada

**Formato**:
- Storytelling visual (estilo Spotify Wrapped)
- Compartilhável (screenshot ou link)
- Salvo no histórico

---

#### RF-014: Recap Anual (V1.0)
**Prioridade**: P2 (Média)

**Conteúdo**:
- Total de horas estudadas no ano
- Total de estudos concluídos
- Objetivos alcançados
- Evolução mês a mês (gráfico)
- Top 3 áreas de conhecimento
- Todas as conquistas do ano
- "Sua palavra do ano" (área mais estudada)
- Estatísticas comparativas

---

### 5.7 Perfil e Configurações

#### RF-015: Perfil do Usuário
**Prioridade**: P1 (Alta)

**Critérios de Aceite**:
- [ ] Nome completo (editável)
- [ ] E-mail (não editável, exibe apenas)
- [ ] Foto de perfil (upload opcional)
- [ ] Bio/Sobre mim (opcional, max 500 chars)
- [ ] Link LinkedIn/GitHub/Portfolio (opcional)
- [ ] Área de interesse principal
- [ ] Objetivo de carreira atual (seleção)

---

#### RF-016: Configurações
**Prioridade**: P2 (Média)

**Opções**:
- [ ] Tema: Light / Dark / Auto (sistema)
- [ ] Notificações: Ativar/Desativar
- [ ] Frequência de e-mails: Diária, Semanal, Nunca
- [ ] Idioma (futuro): PT-BR, EN
- [ ] Timezone
- [ ] Exportar dados (JSON)
- [ ] Excluir conta (confirmação dupla)

---

## 6. 🔒 Requisitos Não-Funcionais

### 6.1 Performance

**RNF-001: Tempo de Carregamento**
- Prioridade: P0 (Crítico)
- First Contentful Paint (FCP) < 1.5s
- Time to Interactive (TTI) < 3s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1

**RNF-002: Otimização de Assets**
- Lazy loading de imagens
- Code splitting por rota
- Compressão de imagens (WebP)
- Minificação de JS/CSS
- CDN para assets estáticos

**RNF-003: Cache**
- Cache de queries do Supabase (5 minutos)
- Service Worker para PWA (futuro)
- LocalStorage para preferências

---

### 6.2 Segurança

**RNF-004: Autenticação e Autorização**
- JWT tokens com expiração de 1 hora
- Refresh tokens válidos por 30 dias
- Row Level Security (RLS) no Supabase
- Nenhum usuário acessa dados de outro

**RNF-005: Proteção de Dados**
- HTTPS obrigatório (SSL/TLS)
- Senhas hasheadas (bcrypt)
- Validação de inputs no frontend e backend
- Sanitização contra XSS
- CSRF tokens em formulários

**RNF-006: Compliance**
- LGPD compliant (Brasil)
- GDPR ready (futuro Europa)
- Termos de uso e política de privacidade
- Consentimento explícito para cookies

---

### 6.3 Escalabilidade

**RNF-007: Database**
- Supabase Postgres otimizado
- Índices em campos frequently queried
- Particionamento por user_id
- Preparado para 100k usuários

**RNF-008: Frontend**
- React.memo para evitar re-renders
- Virtualized lists para grandes datasets
- Debounce em inputs de busca
- Paginação em listas (20 itens/página)

**RNF-009: Infrastructure**
- Vercel/Netlify com auto-scaling
- Supabase em região SA-EAST-1 (São Paulo)
- CDN global (Cloudflare)
- Monitoramento (Sentry, LogRocket)

---

### 6.4 Acessibilidade

**RNF-010: WCAG 2.1 Nível AAA**
- Prioridade: P0 (Crítico)
- Contraste mínimo 7:1 em todos os textos
- Contraste mínimo 3:1 em elementos gráficos
- Navegação completa por teclado
- Tab order lógico
- Focus indicators visíveis (outline 2px)

**RNF-011: Screen Readers**
- ARIA labels em todos os elementos interativos
- ARIA live regions para conteúdo dinâmico
- ARIA roles apropriados
- Alt text descritivo em imagens
- Heading hierarchy (h1 → h2 → h3)

**RNF-012: Outras Considerações**
- Suporte a zoom até 200%
- Textos redimensionáveis
- Suporte a `prefers-reduced-motion`
- Skip links ("Pular para conteúdo")
- Formulários acessíveis (labels visíveis)

---

### 6.5 Responsividade

**RNF-013: Breakpoints**
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Wide: 1440px+

**RNF-014: Touch-Friendly**
- Botões min 44x44px (iOS guidelines)
- Espaçamento adequado entre elementos
- Swipe gestures (futuro)

---

### 6.6 Compatibilidade

**RNF-015: Browsers**
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Sem suporte a IE11

**RNF-016: Devices**
- iOS 14+ ✅
- Android 10+ ✅
- Windows 10+ ✅
- macOS 11+ ✅

---

### 6.7 Monitoramento e Observability

**RNF-017: Analytics**
- Google Analytics 4
- Mixpanel para product analytics
- Hotjar para heatmaps (opcional)

**RNF-018: Error Tracking**
- Sentry para frontend errors
- Supabase logs para backend
- Alertas para erros críticos

**RNF-019: Uptime Monitoring**
- Uptime Robot (ping a cada 5 min)
- Status page público
- Alertas SMS para downtime

---

## 7. 🎨 Especificações de Design

### 7.1 Paleta de Cores

**Escolha Final**: **Opção 3 - Confiável e Limpo** (com ajustes AAA)

#### Cores Primárias

| Cor | Hex | RGB | Uso | Contraste AAA |
|-----|-----|-----|-----|---------------|
| **Azul Primário** | `#2563EB` | 37, 99, 235 | Botões principais, links, CTAs | 7.2:1 ✅ |
| **Azul Escuro** | `#1E40AF` | 30, 64, 175 | Texto sobre fundos claros | 8.9:1 ✅ |
| **Azul Claro** | `#60A5FA` | 96, 165, 250 | Destaques, hover (dark mode) | 4.8:1 (uso com #111827) |
| **Azul Surface** | `#EFF6FF` | 239, 246, 255 | Fundos secundários | N/A |

#### Cores Secundárias

| Cor | Hex | RGB | Uso |
|-----|-----|-----|-----|
| **Violeta Base** | `#7C3AED` | 124, 58, 237 | Objetivos, criatividade |
| **Violeta Escuro** | `#5B21B6` | 91, 33, 182 | AAA sobre branco (7.1:1) |
| **Violeta Claro** | `#A78BFA` | 167, 139, 250 | Destaques, badges |
| **Violeta Surface** | `#F5F3FF` | 245, 243, 255 | Fundos de objetivos |

#### Cores Semânticas

**Sucesso (Verde Crescimento)**
- Base: `#16A34A` (contraste 4.8:1)
- AAA: `#15803D` (contraste 7.1:1) ← Usar para textos
- Claro: `#4ADE80`
- Surface: `#F0FDF4`

**Aviso (Âmbar Atenção)**
- Base: `#D97706` (contraste 7.5:1 ✅)
- Escuro: `#B45309`
- Claro: `#FBBF24`
- Surface: `#FFFBEB`

**Erro (Vermelho Alerta)**
- Base: `#DC2626` (contraste 5.9:1)
- AAA: `#991B1B` (contraste 9.1:1) ← Usar para textos
- Claro: `#F87171`
- Surface: `#FEF2F2`

**Info (Ciano Informação)**
- Base: `#0891B2` (contraste 4.9:1)
- AAA: `#155E75` (contraste 8.8:1) ← Usar para textos
- Claro: `#22D3EE`
- Surface: `#ECFEFF`

#### Neutros (Light Mode)

| Uso | Hex | Contraste |
|-----|-----|-----------|
| Texto Primário | `#111827` | 16.9:1 ✅ |
| Texto Secundário | `#4B5563` | 7.5:1 ✅ |
| Texto Terciário | `#6B7280` | 5.4:1 ⚠️ |
| Texto Desabilitado | `#9CA3AF` | 3.2:1 |
| BG Primário | `#FFFFFF` | N/A |
| BG Secundário | `#F9FAFB` | N/A |
| BG Terciário | `#F3F4F6` | N/A |
| Border | `#E5E7EB` | N/A |

#### Dark Mode

| Uso | Hex | Contraste |
|-----|-----|-----------|
| Texto Primário | `#F9FAFB` | 16.1:1 ✅ |
| Texto Secundário | `#E5E7EB` | 13.5:1 ✅ |
| BG Primário | `#111827` | N/A |
| BG Secundário | `#1F2937` | N/A |
| BG Terciário | `#374151` | N/A |
| Border | `#374151` | N/A |

---

### 7.2 Componentes-Chave

#### Card de Objetivo (GoalCard)

**Especificações**:
- Dimensões: Width 100%, Height auto
- Padding: 24px
- Border-radius: 12px
- Border-left: 4px solid (cor da prioridade)
- Background: Gradiente sutil conforme prioridade
- Shadow: hover → `0 4px 12px rgba(0,0,0,0.1)`

**Elementos**:
1. Header
   - Badge de área (pequeno, superior esquerdo)
   - Ícone de nível (se houver)
   - Menu de ações (superior direito, visible on hover)

2. Body
   - Título (h3, 20px, bold)
   - Descrição (truncada, 2 linhas máx)
   - Progress bar (gradiente violeta)
   - Porcentagem (bold, lado direito)

3. Footer
   - Badge de prioridade (ícone + texto)
   - Estudos vinculados (ícone link + número)
   - Prazo (ícone calendário + data ou "X dias")
   - Cores condicionais (vermelho se vencido, âmbar se < 7 dias)

**Estados**:
- Default: Border-left azul (média)
- Alta prioridade: Border-left violeta
- Baixa prioridade: Border-left cinza
- Hover: Shadow elevado, border mais vibrante
- Alcançado: Badge verde no canto, opacidade 70%

---

#### Card de Estudo (StudyCard)

**Especificações**:
- Dimensões: Width 100%, Height auto
- Padding: 20px
- Border-radius: 8px
- Border: 1px solid `#E5E7EB`
- Background: `#FFFFFF`
- Shadow: `0 1px 3px rgba(0,0,0,0.1)`

**Elementos**:
1. Header
   - Ícone de tipo (curso/artigo/vídeo) + Badge
   - Área de conhecimento (caption, cinza)
   - Menu ações (editar, excluir)

2. Body
   - Título (h4, 18px, semibold)
   - Plataforma/Instrutor (caption, opcional)
   - Progress bar horizontal
   - Horas concluídas / Total

3. Footer
   - Status badge (ícone + texto colorido)
   - Prazo (se houver, com alert visual)
   - Objetivo vinculado (ícone target pequeno)

**Estados**:
- Não iniciado: Cinza
- Em andamento: Azul
- Pausado: Âmbar
- Concluído: Verde com ✓

---

#### Gráfico de Progresso (Line Chart)

**Especificações**:
- Biblioteca: Recharts
- Tipo: Line Chart (área preenchida)
- Dimensões: Responsivo (min-height 300px)
- Eixo X: Últimos 30 dias (formatado "DD/MM")
- Eixo Y: Horas estudadas (0-10)
- Linha: Gradiente azul→violeta
- Área: Gradiente com opacidade 20%
- Tooltip: Custom com fundo branco, shadow
- Grid: Linhas horizontais sutis (#F3F4F6)

**Interações**:
- Hover: Destaque ponto + tooltip
- Click ponto: Mostra modal com detalhes do dia
- Responsivo: Mobile mostra últimos 7 dias

---

#### Sistema de Feedback (Toast Notifications)

**Especificações**:
- Biblioteca: Sonner
- Posição: Top-right (desktop), Top-center (mobile)
- Duração: 5s (sucesso/info), 10s (erro/aviso)
- Animação: Slide-in from right
- Max visíveis: 3 simultâneos

**Variantes**:
1. **Sucesso** (Verde)
   - Background: `#F0FDF4`
   - Border: `#16A34A`
   - Text: `#15803D` (AAA 7.1:1)
   - Icon: CheckCircle

2. **Erro** (Vermelho)
   - Background: `#FEF2F2`
   - Border: `#DC2626`
   - Text: `#991B1B` (AAA 9.1:1)
   - Icon: XCircle

3. **Aviso** (Âmbar)
   - Background: `#FFFBEB`
   - Border: `#D97706`
   - Text: `#B45309` (AAA 7.5:1)
   - Icon: AlertTriangle

4. **Info** (Azul)
   - Background: `#EFF6FF`
   - Border: `#2563EB`
   - Text: `#1E40AF` (AAA 8.9:1)
   - Icon: Info

---

#### Formulários

**Input Field**:
- Height: 44px (touch-friendly)
- Padding: 12px 16px
- Border: 1px solid `#E5E7EB`
- Border-radius: 8px
- Font: 14px, regular
- Focus: Border azul 2px, shadow azul transparente

**Label**:
- Font: 14px, medium
- Color: `#4B5563`
- Margin-bottom: 8px
- Sempre visível (não usar só placeholder)

**Error State**:
- Border: Vermelho `#DC2626`
- Mensagem abaixo (12px, `#991B1B`)
- Ícone de alerta ao lado do label

**Helper Text**:
- Font: 12px, regular
- Color: `#6B7280`
- Abaixo do input

---

#### Dashboard de Métricas

**Stats Cards**:
- Grid: 4 colunas (desktop), 2 (tablet), 1 (mobile)
- Padding: 24px
- Border-radius: 12px
- Background: Gradiente sutil
- Shadow: Leve

**Conteúdo**:
- Ícone (32px, colorido)
- Label (12px, uppercase, tracking-wide, cinza)
- Valor (36px, bold, preto)
- Tendência (ícone seta + % change, verde/vermelho)

**Exemplo**:
```
┌─────────────────────┐
│  📚                 │
│  CURSOS CONCLUÍDOS  │
│  24                 │
│  ↑ +3 este mês      │
└─────────────────────┘
```

---

#### Recap Anual (Storytelling)

**Layout**:
- Fullscreen modal
- Slides verticais (scroll)
- Animações suaves (fade, slide)
- Background gradiente animado

**Slides**:
1. **Intro**: "Seu ano em aprendizado 🎉"
2. **Horas**: "Você estudou X horas em 2024"
3. **Cursos**: "X cursos concluídos" (grid de capas)
4. **Top Área**: "Você se dedicou mais a [área]"
5. **Streak**: "Seu maior streak: X dias 🔥"
6. **Conquistas**: Grid de badges desbloqueados
7. **Evolução**: Gráfico mês a mês
8. **Objetivos**: "X objetivos alcançados 🎯"
9. **Palavra do Ano**: "[Área] foi sua palavra de 2024"
10. **Encerramento**: "2025 será ainda melhor! 🚀"

**Compartilhamento**:
- Botão "Compartilhar" (screenshot ou link público)
- Download como imagem

---

### 7.3 Sistema de Design

#### Tipografia

**Font Family**: Inter (Google Fonts)

```css
--font-family-base: 'Inter', -apple-system, sans-serif;
```

**Escala**:
- Display XL: 48px / 700 (Hero sections)
- Display L: 36px / 700
- H1: 30px / 700
- H2: 24px / 600
- H3: 20px / 600
- H4: 18px / 500
- Body L: 18px / 400
- Body: 16px / 400
- Body S: 14px / 400
- Caption: 12px / 400

**Line Height**:
- Tight: 1.25 (headlines)
- Normal: 1.5 (body)
- Relaxed: 1.625 (long-form)

**Letter Spacing**:
- Tight: -0.025em (display)
- Normal: 0 (body)
- Wide: 0.025em (buttons, labels)

---

#### Espaçamento e Grid

**Base**: 4px

```
4px   → spacing-1
8px   → spacing-2
12px  → spacing-3
16px  → spacing-4  (base)
20px  → spacing-5
24px  → spacing-6
32px  → spacing-8
40px  → spacing-10
48px  → spacing-12
64px  → spacing-16
```

**Grid**:
- Container max-width: 1440px
- Gutter: 24px (desktop), 16px (mobile)
- Columns: 12 (desktop), 4 (mobile)

---

#### Iconografia

**Biblioteca**: Lucide React

**Tamanhos**:
- xs: 16px (inline, badges)
- sm: 20px (botões pequenos)
- md: 24px (padrão, navegação)
- lg: 32px (destaques, cards)
- xl: 48px (empty states)
- 2xl: 64px (hero, onboarding)

**Categorias Principais**:
- **Navegação**: Home, Dashboard, Target, BookOpen, TrendingUp, Trophy
- **Tipos de Estudo**: GraduationCap, FileText, Video, Book, Headphones, Code
- **Áreas**: Code2, Palette, Megaphone, Database, Briefcase
- **Status**: Circle, Clock, Pause, CheckCircle2
- **Ações**: Plus, Edit, Trash2, Save, Share2

**Stroke Width**: 2px (padrão Lucide)

---

#### Estados Interativos

**Hover**:
- Botões: Background 10% mais escuro
- Cards: Shadow elevado (4px → 12px)
- Links: Underline

**Active/Pressed**:
- Botões: Background 15% mais escuro, scale 0.98
- Cards: Scale 0.99

**Focus**:
- Outline: 2px solid azul `#2563EB`
- Offset: 2px
- Sempre visível (não remover outline)

**Disabled**:
- Opacidade: 50%
- Cursor: not-allowed
- Sem hover/active

---

#### Microinterações

**Animações**:
- Duração padrão: 200ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Respeitar `prefers-reduced-motion`

**Exemplos**:
1. **Progress bar update**: 
   - Transição smooth de width
   - Duração proporcional à mudança

2. **Conquista desbloqueada**:
   - Modal fade-in + scale (0.9 → 1)
   - Confetti particles
   - Badge "pop" (scale 1.2 → 1)

3. **Card hover**:
   - Shadow transition 300ms
   - Slight lift (translateY -2px)

4. **Toast notification**:
   - Slide-in from right
   - Auto-dismiss fade-out

---

## 8. 🔄 Fluxos de Usuário Prioritários

### Fluxo 1: Onboarding e Primeiro Objetivo

**Objetivo**: Novos usuários criam primeiro objetivo em < 5 minutos

**Steps**:

1. **Landing Page**
   - Usuário vê proposta de valor
   - CTA: "Começar gratuitamente"

2. **Cadastro**
   - Opções: E-mail/senha ou Google OAuth
   - Validação de e-mail
   - Confirmação

3. **Welcome Screen** (Onboarding 1/3)
   - "Bem-vindo ao Progress! 🚀"
   - Explicação: "Organize estudos e alcance objetivos"
   - CTA: "Próximo" ou "Pular"

4. **Features** (Onboarding 2/3)
   - "Acompanhe seu progresso"
   - Screenshot do dashboard
   - CTA: "Próximo" ou "Pular"

5. **Benefits** (Onboarding 3/3)
   - "Alcance seus objetivos de carreira"
   - Visual motivacional
   - CTA: "Criar meu primeiro objetivo"

6. **Modal: Criar Objetivo**
   - Formulário simplificado:
     - "O que você quer alcançar?" (input)
     - "Em que área?" (select)
     - "Até quando?" (date picker opcional)
   - CTA: "Criar objetivo"

7. **Celebração**
   - Toast: "Objetivo criado com sucesso! 🎯"
   - Redirecionamento para Dashboard

8. **Dashboard (primeira vez)**
   - Objetivo criado aparece
   - Empty state de estudos
   - CTA: "Cadastrar primeiro estudo"

**Métricas**:
- Tempo médio: < 5 minutos
- Taxa de conclusão: > 70%
- Drop-off por step

---

### Fluxo 2: Cadastrar Novo Estudo

**Objetivo**: Usuário registra curso/artigo/projeto rapidamente

**Steps**:

1. **Dashboard**
   - CTA visível: "+ Cadastrar estudo"
   - Ou lista de estudos vazia com CTA

2. **Modal/Page: Novo Estudo**
   - Título: "Cadastrar Estudo"
   - Formulário:
     - Tipo* (ícones clicáveis)
     - Título* (input)
     - Área* (select com busca)
     - Status (select, padrão "Não iniciado")
     - Carga horária (input numérico, opcional)
     - Prazo (date picker, opcional)
     - Vincular a objetivo (select múltiplo, opcional)
     - URL (input, opcional)
     - Anotações (textarea, opcional)
   - CTAs: "Salvar" (primário), "Cancelar" (secundário)

3. **Validação**
   - Campos obrigatórios destacados
   - Mensagens de erro claras

4. **Confirmação**
   - Toast: "Estudo cadastrado com sucesso!"
   - Redirecionamento para página do estudo
   - Ou volta para lista de estudos

**Variação**: Quick Add
- Botão flutuante (FAB) no mobile
- Modal compacto: apenas Tipo, Título, Área
- "Adicionar detalhes depois" (link)

**Métricas**:
- Tempo médio de cadastro: < 2 minutos
- Taxa de abandono do formulário: < 20%
- % que preenche campos opcionais

---

### Fluxo 3: Atualizar Progresso

**Objetivo**: Usuário atualiza % de conclusão de um estudo

**Steps**:

1. **Dashboard ou Lista de Estudos**
   - Card do estudo exibe progresso atual
   - Hover: Botão "Atualizar progresso"

2. **Modal: Atualizar Progresso**
   - Título do estudo (readonly)
   - Progresso atual (exibição)
   - Novo progresso:
     - Slider visual (0-100%)
     - Ou input de horas concluídas
     - Preview do cálculo
   - CTA: "Salvar progresso"

3. **Detecção de Conclusão**
   - Se progresso = 100%:
     - Popup: "Parabéns! Marcar como concluído?"
     - CTAs: "Sim, concluir" / "Ainda não"

4. **Celebração (se concluído)**
   - Confetti animation
   - Modal: "Parabéns! Estudo concluído! ✅"
   - Se vinculado a objetivo: "Você está X% mais perto do seu objetivo!"
   - CTA: "Ver progresso geral"

5. **Update em Tempo Real**
   - Card do estudo atualiza imediatamente
   - Dashboard stats refresh
   - Se desbloqueou conquista: Notificação adicional

**Variação**: Quick Update
- Slider inline no card (hover)
- Salva automaticamente ao arrastar

**Métricas**:
- Frequência de updates/usuário/semana
- Tempo médio do fluxo: < 30s
- % que marca como concluído ao atingir 100%

---

### Fluxo 4: Visualizar Progresso Geral

**Objetivo**: Usuário entende sua evolução de forma visual

**Steps**:

1. **Entrada**
   - Dashboard → Seção "Visão Geral"
   - Ou navegação → "Progresso"

2. **Página de Progresso**
   - **Header**:
     - Filtros: Período (7d, 30d, 90d, 1 ano, tudo)
     - Filtro por área
     - Filtro por objetivo
   
   - **KPIs Cards** (Grid 2x2 ou 1x4):
     - Horas estudadas (período selecionado)
     - Cursos concluídos
     - Taxa de conclusão (%)
     - Streak atual (dias)
   
   - **Gráficos**:
     - Line chart: Horas ao longo do tempo
     - Pie chart: Distribuição por área
     - Bar chart: Tipos de estudo
   
   - **Timeline**:
     - Atividade recente (cronológica)
     - Conquistas desbloqueadas
     - Objetivos alcançados
   
   - **Insights** (automáticos):
     - "Você estudou 20% mais este mês!"
     - "Seu foco principal: Desenvolvimento"
     - "Faltam X horas para seu próximo milestone"

3. **Interações**:
   - Hover em gráfico: Tooltip com detalhes
   - Click em barra/fatia: Filtro drilldown
   - Click em atividade: Modal com detalhes

4. **Compartilhamento** (futuro):
   - Botão "Compartilhar progresso"
   - Screenshot ou link público

**Métricas**:
- % usuários que visitam página de progresso/semana
- Tempo médio na página
- Interações com gráficos

---

### Fluxo 5: Receber Feedback Inteligente

**Objetivo**: Sistema sugere ações baseado em comportamento

**Triggers e Ações**:

1. **Prazo Próximo (7 dias antes)**
   - **Trigger**: Estudo/objetivo com deadline em 7 dias
   - **Ação**: 
     - Toast: "⏰ Prazo se aproximando: [título] em 7 dias"
     - Badge no card do estudo
     - Notificação (se ativada)
   - **CTA**: "Ver detalhes" ou "Adiar prazo"

2. **Prazo Vencido**
   - **Trigger**: Deadline passou
   - **Ação**:
     - Card em vermelho
     - Toast: "Prazo vencido: [título] há X dias"
   - **CTA**: "Marcar como concluído" ou "Redefinir prazo"

3. **Sem Atividade (7 dias)**
   - **Trigger**: Usuário não atualiza nada há 7 dias
   - **Ação**:
     - E-mail: "Sentimos sua falta!"
     - Sugestão de retomar estudo pausado
   - **CTA**: "Voltar aos estudos"

4. **Milestone Alcançado**
   - **Trigger**: 10 cursos, 50h, 100h estudadas
   - **Ação**:
     - Modal celebração com confetti
     - Conquista desbloqueada
     - "Parabéns! 🏆 Você completou [milestone]!"
   - **CTA**: "Ver minhas conquistas"

5. **Objetivo Próximo de Alcançar (80%)**
   - **Trigger**: Progresso do objetivo > 80%
   - **Ação**:
     - Toast: "Você está quase lá! 🎯 80% concluído"
     - Sugestão de últimos estudos necessários
   - **CTA**: "Ver objetivo"

6. **Sugestão Baseada em Objetivo**
   - **Trigger**: Objetivo ativo sem estudos há 14 dias
   - **Ação**:
     - Card no dashboard: "Sugestões para você"
     - Lista de 3-5 estudos recomendados (curados)
   - **CTA**: "Adicionar à minha lista"

**Métricas**:
- Taxa de interação com feedback: > 40%
- Taxa de conversão de sugestão→ação: > 20%
- NPS de utilidade do feedback

---

## 9. ⚠️ Dependências e Riscos

### Dependências Técnicas

#### Internas

1. **Supabase**
   - Auth (OAuth Google)
   - Database (Postgres)
   - RLS (Row Level Security)
   - Realtime subscriptions (futuro)
   - **Risco**: Downtime da plataforma
   - **Mitigação**: Monitoramento, fallbacks

2. **Lovable (Frontend)**
   - React + TypeScript
   - Tailwind CSS
   - Build system
   - **Risco**: Limitações da plataforma no-code
   - **Mitigação**: Código custom quando necessário

3. **Vercel/Netlify (Hosting)**
   - Deploy automático
   - CDN global
   - **Risco**: Custos com escala
   - **Mitigação**: Otimização de assets, cache

#### Externas

4. **Google OAuth**
   - **Dependência**: API de autenticação
   - **Risco**: Mudanças na API, downtime
   - **Mitigação**: Ter login por e-mail como alternativa

5. **Google Analytics / Mixpanel**
   - **Dependência**: Tracking de eventos
   - **Risco**: Bloqueadores de ads, LGPD
   - **Mitigação**: Analytics server-side (Supabase)

6. **Recharts (Gráficos)**
   - **Dependência**: Biblioteca de charts
   - **Risco**: Bugs, performance em datasets grandes
   - **Mitigação**: Alternativa: Chart.js, D3.js

---

### Riscos de Produto

#### Alto Impacto

**R-001: Baixo Engajamento Inicial**
- **Descrição**: Usuários cadastram 1-2 estudos e abandonam
- **Probabilidade**: Alta (60%)
- **Impacto**: Alto (produto não gera valor)
- **Mitigação**:
  - Onboarding focado em quick wins
  - Gamificação desde o início (primeiro badge fácil)
  - E-mails de reengajamento
  - Notificações de progresso semanal

**R-002: Complexidade de Cadastro**
- **Descrição**: Formulários longos desmotivam usuários
- **Probabilidade**: Média (40%)
- **Impacto**: Alto (abandono no cadastro)
- **Mitigação**:
  - Formulários progressivos (começar simples)
  - "Adicionar detalhes depois"
  - Importação automática (futuro)

**R-003: Falta de Diferenciação**
- **Descrição**: Produto visto como "mais uma planilha"
- **Probabilidade**: Média (50%)
- **Impacto**: Alto (não adoção)
- **Mitigação**:
  - Foco em visualizações bonitas (Recap anual)
  - Feedback inteligente que planilha não tem
  - Comunidade e social proof

#### Médio Impacto

**R-004: Curva de Aprendizado**
- **Descrição**: Usuários não entendem como usar
- **Probabilidade**: Média (30%)
- **Impacto**: Médio (suporte alto, churn)
- **Mitigação**:
  - Onboarding interativo (tours)
  - Tooltips contextuais
  - Help center / FAQ
  - Vídeos explicativos

**R-005: Performance com Muitos Dados**
- **Descrição**: Dashboard lento com 100+ estudos
- **Probabilidade**: Baixa (20%)
- **Impacto**: Médio (frustração)
- **Mitigação**:
  - Paginação
  - Virtualized lists
  - Lazy loading de gráficos
  - Cache agressivo

---

### Riscos de UX

**R-006: Overload de Informação**
- **Descrição**: Dashboard muito carregado assusta
- **Mitigação**:
  - Progressive disclosure
  - Customização de widgets
  - Versão simplificada vs avançada

**R-007: Desmotivação por Falta de Progresso**
- **Descrição**: Usuário não vê evolução, desiste
- **Mitigação**:
  - Celebrar micro-conquistas
  - Comparar com mês anterior (não com outros)
  - Mensagens motivacionais personalizadas

---

### Riscos de Negócio

**R-008: Monetização Prematura**
- **Descrição**: Paywall assusta usuários antes de ver valor
- **Mitigação**:
  - MVP 100% gratuito
  - V1.0: Freemium generoso (limites altos)
  - Monetizar features premium (integrações, analytics avançado)

**R-009: Concorrência**
- **Descrição**: Notion, Trello podem adicionar features similares
- **Mitigação**:
  - Foco em nicho (aprendizado de carreira)
  - UX especializada (não genérica)
  - Feedback inteligente (IA)

---

## 10. ❓ Questões em Aberto

### Produto

**Q-001: Gamificação - Qual Nível?**
- **Questão**: Até que ponto gamificar sem parecer infantil?
- **Opções**:
  - A) Minimal (apenas conquistas discretas)
  - B) Moderado (badges + níveis)
  - C) Intenso (pontos, leaderboards, avatares)
- **Decisão necessária**: Após testes com usuários
- **Impacto**: Tom de voz, retenção

**Q-002: Social Features?**
- **Questão**: Permitir compartilhamento público de progresso?
- **Opções**:
  - A) Não (100% privado)
  - B) Opt-in (compartilhar Recap apenas)
  - C) Comunidade integrada (feed de conquistas)
- **Decisão necessária**: V1.0
- **Impacto**: Viralização vs privacidade

**Q-003: Integrações Prioritárias**
- **Questão**: Quais integrar primeiro?
- **Candidatos**:
  - Udemy (import automático de cursos)
  - Coursera
  - Google Calendar (sync de prazos)
  - Notion (export de notas)
  - Trello/Asana
- **Decisão necessária**: Após análise de API's
- **Impacto**: Roadmap V2.0

---

### UX/Design

**Q-004: Dashboard Customizável?**
- **Questão**: Permitir usuário reorganizar widgets?
- **Opções**:
  - A) Layout fixo (mais simples)
  - B) Customização básica (mostrar/ocultar)
  - C) Drag-and-drop completo
- **Decisão necessária**: V1.0
- **Impacto**: Complexidade vs personalização

**Q-005: Mobile App Nativo?**
- **Questão**: Quando investir em app nativo?
- **Opções**:
  - A) Nunca (apenas PWA)
  - B) Após 10k usuários ativos
  - C) Simultaneamente com web
- **Decisão necessária**: 2026
- **Impacto**: Recursos, equipe

**Q-006: Modo Offline?**
- **Questão**: Suportar uso offline (PWA)?
- **Benefício**: Usar sem internet
- **Custo**: Complexidade de sync
- **Decisão necessária**: V2.0
- **Impacto**: Arquitetura

---

### Negócio

**Q-007: Modelo de Monetização**
- **Questão**: Como cobrar sem afastar usuários?
- **Opções**:
  - A) Freemium (limites de estudos/objetivos)
  - B) Features premium (analytics avançado, IA)
  - C) Período trial (30 dias grátis)
- **Decisão necessária**: Antes do lançamento V1.0
- **Impacto**: Revenue, adoção

**Q-008: Preço**
- **Questão**: Quanto cobrar no plano pago?
- **Benchmark**:
  - Notion: $10/mês
  - Todoist Premium: $4/mês
  - Duolingo Plus: $7/mês
- **Hipótese**: $5-7/mês (Brasil)
- **Decisão necessária**: Testes de pricing
- **Impacto**: MRR, percepção de valor

**Q-009: Mercado Internacional?**
- **Questão**: Quando expandir para EN/ES?
- **Prioridade Atual**: PT-BR (Brasil)
- **Futuro**: América Latina (ES), EUA (EN)
- **Decisão necessária**: Após Product-Market Fit
- **Impacto**: Roadmap, tradução, suporte

---

### Técnico

**Q-010: IA/ML para Recomendações**
- **Questão**: Usar modelo de ML ou regras fixas?
- **Opções**:
  - A) Regras simples (if/else baseado em objetivo)
  - B) ML simples (collaborative filtering)
  - C) LLM (GPT-4 para sugestões personalizadas)
- **Decisão necessária**: V2.0
- **Impacto**: Custo, qualidade das sugestões

**Q-011: Backup e Export de Dados**
- **Questão**: Como usuário exporta seus dados?
- **Opções**:
  - A) JSON download
  - B) PDF report
  - C) Integração com Notion/Drive
- **Decisão necessária**: V1.0 (compliance LGPD)
- **Impacto**: Segurança, confiança

---

## 📋 Próximos Passos (Action Items)

### Imediato (Esta Sprint)

- [ ] Validar paleta de cores com testes de contraste AAA
- [ ] Criar protótipo navegável no Figma (flows 1-3)
- [ ] Definir priorização de features V1.0 (backlog grooming)
- [ ] Configurar analytics (GA4 + Mixpanel events)
- [ ] Escrever documentação de API (Supabase schema)

### Próximas 2 Semanas

- [ ] Desenvolver componentes base (StudyCard, GoalCard)
- [ ] Implementar Dashboard avançado (RF-010)
- [ ] Criar sistema de feedback (RF-011)
- [ ] Testes de usabilidade com 5 usuários (flows 1-2)
- [ ] Decisão: Gamificação (Q-001)

### Próximo Mês

- [ ] Desenvolver Recap mensal (RF-013)
- [ ] Sistema de conquistas (RF-012)
- [ ] Landing page + marketing inicial
- [ ] Beta privado (50 usuários)
- [ ] Decisão: Monetização (Q-007, Q-008)

### Longo Prazo (Q2 2025)

- [ ] Recomendações com IA (Q-010)
- [ ] Integrações (Udemy, Google Calendar)
- [ ] Dashboard customizável (Q-004)
- [ ] Recap anual (RF-014)
- [ ] Lançamento público V1.0

---

## 📚 Apêndices

### Apêndice A: Benchmarks de Concorrentes

| Produto | Foco | Diferencial | Preço | Aprendizado |
|---------|------|-------------|-------|-------------|
| **Notion** | Produtividade geral | Flexibilidade total | $10/mês | Muito genérico para estudos |
| **Todoist** | Tarefas | Simplicidade | $4/mês | Não é focado em aprendizado |
| **Trello** | Kanban boards | Visual | Grátis | Não tem analytics de progresso |
| **Duolingo** | Idiomas | Gamificação | $7/mês | Específico de idiomas |
| **Coursera** | Cursos online | Conteúdo próprio | $49/mês | Não agrega outras fontes |

**Nossa Proposta Única**:
- Foco específico em jornada de carreira
- Agregação de múltiplas fontes
- Analytics e visualizações motivacionais
- Feedback inteligente
- Mais acessível ($5-7/mês)

---

### Apêndice B: Tecnologias Utilizadas

**Frontend**:
- React 18
- TypeScript
- Tailwind CSS v4
- Recharts (gráficos)
- Lucide React (ícones)
- Sonner (toasts)
- React Hook Form (formulários)
- Zod (validação)

**Backend**:
- Supabase (BaaS)
- PostgreSQL
- Row Level Security
- Supabase Auth

**Infra**:
- Vercel (hosting)
- Cloudflare CDN
- Google Analytics 4
- Mixpanel
- Sentry (error tracking)

---

### Apêndice C: Glossário

- **AAA**: Nível máximo de acessibilidade (WCAG 2.1)
- **CAC**: Customer Acquisition Cost (custo por cliente)
- **CTA**: Call-to-Action (botão de ação)
- **KPI**: Key Performance Indicator (indicador-chave)
- **LTV**: Lifetime Value (valor vitalício do cliente)
- **MAU**: Monthly Active Users (usuários ativos mensais)
- **MRR**: Monthly Recurring Revenue (receita recorrente)
- **MVP**: Minimum Viable Product (produto mínimo viável)
- **NPS**: Net Promoter Score (índice de satisfação)
- **RLS**: Row Level Security (segurança por linha)
- **WAU**: Weekly Active Users (usuários ativos semanais)

---

**Versão**: 1.0.0  
**Última Atualização**: 31/12/2024  
**Aprovadores**: Product Team, Design Team, Engineering Team  
**Status**: ✅ Aprovado para Desenvolvimento
