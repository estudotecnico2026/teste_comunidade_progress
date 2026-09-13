# Redlines — Progress
Especificação de campo, validação e estado para as 4 telas do fluxo de ativação (onboarding → primeiro objetivo → primeiro estudo → dashboard).

---

## 1. Onboarding (3 telas + formulário)

**Telas 1–3 (explicativas)**
| Elemento | Especificação |
|---|---|
| Botão "Pular" | Sempre visível, canto superior direito. Ação: pula direto para a tela 4 (formulário), não para o dashboard vazio. |
| Indicador de progresso | 3 pontos, ponto ativo preenchido com `--text-primary`, inativos com `--border-strong`. |
| Botão "Próximo" (telas 1–2) | Estilo secundário. Avança sem validação — não há input nessas telas. |
| Botão final (tela 3) | Estilo primário (accent), texto "Criar meu primeiro objetivo". Leva direto ao formulário, não a uma tela de resumo. |

**Tela 4 (formulário)**
| Campo | Obrigatório | Validação | Erro |
|---|---|---|---|
| O que você quer alcançar? | Sim | Mínimo 3 caracteres | "Descreva seu objetivo em pelo menos 3 caracteres." |
| Em que área? | Sim | Selecionar 1 opção da lista | "Selecione uma área." |
| Até quando? | Não | Se preenchido, não pode ser data passada | "Escolha uma data futura." |

**Botão "Criar objetivo"**
- Estado padrão: habilitado assim que "O que você quer alcançar?" tem conteúdo válido — não espera todos os campos.
- Estado de carregamento: spinner inline, texto muda para "Criando...".
- Sucesso: toast "Objetivo criado" (sem "com sucesso" — ver seção de microcopy) + redirecionamento automático para o Dashboard.
- Métrica disparada no submit: `goal_created` (evento que fecha o funil de ativação).

---

## 2. Cadastro de objetivo

| Campo | Obrigatório | Validação | Erro |
|---|---|---|---|
| Título | Sim | Máx. 200 caracteres | "O título não pode passar de 200 caracteres." |
| Área | Sim | Seleção obrigatória | "Selecione uma área." |
| Nível desejado | Sim | Seleção obrigatória | "Selecione o nível desejado." |
| Prazo | Não | Data futura, se preenchida | "Escolha uma data futura." |
| Prioridade | Não | Padrão pré-selecionado: "Média" | — |
| Descrição (campo colapsado) | Não | Máx. 1000 caracteres | "A descrição não pode passar de 1000 caracteres." |

**Comportamento do seletor de prioridade**
- Três botões (Alta / Média / Baixa), seleção única, estilo pill.
- Estado selecionado: fundo `--fill-accent`, texto `--on-accent`.
- Estado não selecionado: fundo transparente, borda `--border`.

**Botão "Criar objetivo"**
- Desabilitado apenas se Título, Área ou Nível estiverem vazios — não exige os campos opcionais.
- Ao salvar: toast "Objetivo criado" + fecha modal/retorna à lista de objetivos, com o novo item no topo.

---

## 3. Cadastro de estudo (com vínculo a objetivo)

| Campo | Obrigatório | Validação | Erro |
|---|---|---|---|
| Tipo | Sim | Seleção única entre ícones (Curso, Artigo, Vídeo, Projeto, +4 no menu "mais") | "Selecione o tipo de estudo." |
| Título | Sim | Máx. 200 caracteres | "Informe um título." |
| Área | Sim | Seleção obrigatória | "Selecione uma área." |
| Status | Sim | Padrão pré-selecionado: "Não iniciado" | — |
| Vincular a objetivo | Não, mas em destaque visual | Seleção múltipla permitida | Nenhum erro — campo puramente opcional |
| URL / Plataforma / Notas (colapsados) | Não | URL deve ser link válido, se preenchida | "Isso não parece um link válido." |

**Tratamento visual do campo "Vincular a objetivo"**
- Fundo `--bg-accent-muted`, borda 1px `--border-accent`, canto arredondado 10px.
- Microcopy fixa abaixo do campo: "É esse vínculo que conecta o estudo ao seu progresso." — não removível, aparece mesmo com o campo vazio.
- Não é obrigatório para salvar, mas o botão "Salvar estudo" mostra um toast de reforço se o usuário salvar sem vínculo: "Estudo salvo sem objetivo vinculado. Você pode adicionar depois." (toast informativo, não bloqueia o fluxo).

**Botão "Salvar estudo"**
- Habilitado com Tipo + Título + Área + Status preenchidos.
- Ao salvar: dispara evento `study_created`. Se vinculado a objetivo, dispara também recálculo de progresso do objetivo (RF-008).

---

## 4. Dashboard básico

| Elemento | Comportamento |
|---|---|
| Saudação | Nome do usuário vindo do perfil. Se usuário não tiver nome, usa "Olá!" sem nome. |
| Badge de streak | Só aparece se streak ≥ 1 dia. Ícone de chama em `--text-warning` sobre `--bg-warning`. |
| Lista "Estudos em andamento" | Máx. 5 itens, ordenados por atualização mais recente. Barra de progresso usa `--fill-accent`. |
| Estado vazio (sem estudos) | Substitui a lista por: "Nenhum estudo em andamento." + botão "Cadastrar estudo" (mesmo botão do rodapé, duplicado no meio da tela). |
| Lista "Objetivos ativos" | Máx. 3 itens. Percentual calculado pela média de progresso dos estudos vinculados. |
| Estado vazio (sem objetivos) | Não deveria ocorrer pós-onboarding — se ocorrer (objetivo excluído), mostra: "Crie um objetivo para direcionar seus estudos." + CTA. |
| Botão "+ Cadastrar estudo" | Fixo na base da tela (sticky), sempre visível mesmo com scroll. |

---

## Convenções de microcopy usadas (aplicar em todas as telas)
- Sem "com sucesso" em toasts — a própria confirmação já comunica sucesso ("Objetivo criado", não "Objetivo criado com sucesso!").
- Sem "por favor" em validação — direto ao ponto ("Selecione uma área.", não "Por favor, selecione uma área.").
- Botões em sentence case, verbo primeiro: "Criar objetivo", "Salvar estudo" — nunca "Criar Objetivo" ou "OK".
- Erros dizem o que fazer, não citam a exceção técnica.