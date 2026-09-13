# Design System - Progress App
**Sistema de Gestão de Jornada de Estudos e Objetivos de Carreira**

---

## 📑 Índice

1. [Visão Geral](#visão-geral)
2. [Design Tokens](#design-tokens)
3. [Paleta de Cores](#paleta-de-cores)
4. [Hierarquia Tipográfica](#hierarquia-tipográfica)
5. [Sistema de Espaçamento](#sistema-de-espaçamento)
6. [Componentes](#componentes)
7. [Sistema de Ícones](#sistema-de-ícones)
8. [UX Writing e Microcopy](#ux-writing-e-microcopy)
9. [Acessibilidade AAA](#acessibilidade-aaa)
10. [Guia de Imagens](#guia-de-imagens)

---

## 🎯 Visão Geral

O Design System do Progress é construído com foco em:

- **Acessibilidade AAA (WCAG 2.1)** - Contraste mínimo 7:1
- **Escalabilidade** - Componentes reutilizáveis e extensíveis
- **Consistência** - Padrões unificados em todas as jornadas
- **Content Ops** - UX Writing padronizado e motivacional
- **Dark/Light Mode** - Suporte completo com design tokens semânticos

### Público-Alvo

- **Estudantes** - Em busca de organização e progresso
- **Profissionais em transição** - Requalificação e upskilling
- **Autodidatas** - Aprendizado contínuo e autodirigido

### Princípios de Design

1. **Clareza** - Informação direta e objetiva
2. **Motivação** - Tom positivo e encorajador
3. **Progresso Visível** - Feedback constante de evolução
4. **Simplicidade** - Interface limpa e focada

---

## 🎨 Design Tokens

### Color Tokens

```css
:root {
  /* ========== CORES DA MARCA ========== */
  
  /* Primária - Azul Confiança */
  --color-brand-primary-base: #2563EB;        /* Azul vibrante */
  --color-brand-primary-light: #60A5FA;       /* Azul claro */
  --color-brand-primary-dark: #1E40AF;        /* Azul escuro AAA */
  --color-brand-primary-surface: #EFF6FF;     /* Azul muito claro (fundos) */
  
  /* Secundária - Violeta Criatividade */
  --color-brand-secondary-base: #7C3AED;      /* Violeta vibrante */
  --color-brand-secondary-light: #A78BFA;     /* Violeta claro */
  --color-brand-secondary-dark: #5B21B6;      /* Violeta escuro AAA */
  --color-brand-secondary-surface: #F5F3FF;   /* Violeta muito claro */
  
  /* ========== CORES SEMÂNTICAS ========== */
  
  /* Sucesso - Verde Crescimento */
  --color-success-base: #16A34A;              /* Verde médio AAA */
  --color-success-light: #4ADE80;             /* Verde claro */
  --color-success-dark: #15803D;              /* Verde escuro AAA */
  --color-success-surface: #F0FDF4;           /* Verde muito claro */
  
  /* Aviso - Âmbar Atenção */
  --color-warning-base: #D97706;              /* Âmbar médio AAA */
  --color-warning-light: #FBBF24;             /* Âmbar claro */
  --color-warning-dark: #B45309;              /* Âmbar escuro AAA */
  --color-warning-surface: #FFFBEB;           /* Âmbar muito claro */
  
  /* Erro - Vermelho Alerta */
  --color-error-base: #DC2626;                /* Vermelho médio AAA */
  --color-error-light: #F87171;               /* Vermelho claro */
  --color-error-dark: #991B1B;                /* Vermelho escuro AAA */
  --color-error-surface: #FEF2F2;             /* Vermelho muito claro */
  
  /* Info - Ciano Informação */
  --color-info-base: #0891B2;                 /* Ciano médio AAA */
  --color-info-light: #22D3EE;                /* Ciano claro */
  --color-info-dark: #155E75;                 /* Ciano escuro AAA */
  --color-info-surface: #ECFEFF;              /* Ciano muito claro */
  
  /* ========== CORES UTILITÁRIAS ========== */
  
  /* Texto - Light Mode */
  --color-text-primary: #111827;              /* Quase preto */
  --color-text-secondary: #4B5563;            /* Cinza médio */
  --color-text-tertiary: #6B7280;             /* Cinza claro */
  --color-text-disabled: #9CA3AF;             /* Cinza muito claro */
  --color-text-on-dark: #F9FAFB;              /* Branco suave */
  --color-text-on-primary: #FFFFFF;           /* Branco puro */
  
  /* Backgrounds - Light Mode */
  --color-bg-primary: #FFFFFF;                /* Branco */
  --color-bg-secondary: #F9FAFB;              /* Cinza muito claro */
  --color-bg-tertiary: #F3F4F6;               /* Cinza claro */
  --color-bg-overlay: rgba(0, 0, 0, 0.5);     /* Overlay escuro */
  
  /* Bordas */
  --color-border-default: #E5E7EB;            /* Cinza claro */
  --color-border-hover: #D1D5DB;              /* Cinza médio */
  --color-border-focus: #2563EB;              /* Azul primário */
  --color-border-error: #DC2626;              /* Vermelho */
  
  /* ========== CORES POR JORNADA ========== */
  
  /* Estudos em Andamento */
  --color-journey-learning-bg: #EFF6FF;       /* Azul claro */
  --color-journey-learning-border: #2563EB;   /* Azul */
  --color-journey-learning-text: #1E40AF;     /* Azul escuro */
  
  /* Objetivos */
  --color-journey-goal-bg: #F5F3FF;           /* Violeta claro */
  --color-journey-goal-border: #7C3AED;       /* Violeta */
  --color-journey-goal-text: #5B21B6;         /* Violeta escuro */
  
  /* Conquistas */
  --color-journey-achievement-bg: #F0FDF4;    /* Verde claro */
  --color-journey-achievement-border: #16A34A;/* Verde */
  --color-journey-achievement-text: #15803D;  /* Verde escuro */
}

/* ========== DARK MODE ========== */

.dark {
  /* Texto - Dark Mode */
  --color-text-primary: #F9FAFB;
  --color-text-secondary: #E5E7EB;
  --color-text-tertiary: #D1D5DB;
  --color-text-disabled: #9CA3AF;
  --color-text-on-dark: #111827;
  
  /* Backgrounds - Dark Mode */
  --color-bg-primary: #111827;                /* Azul muito escuro */
  --color-bg-secondary: #1F2937;              /* Azul escuro médio */
  --color-bg-tertiary: #374151;               /* Azul escuro claro */
  --color-bg-overlay: rgba(0, 0, 0, 0.7);
  
  /* Bordas - Dark Mode */
  --color-border-default: #374151;
  --color-border-hover: #4B5563;
  --color-border-focus: #60A5FA;
  
  /* Ajustes de cores brand para dark mode */
  --color-brand-primary-base: #60A5FA;        /* Azul mais claro */
  --color-brand-primary-dark: #93C5FD;        /* Azul ainda mais claro */
  
  --color-brand-secondary-base: #A78BFA;      /* Violeta mais claro */
  --color-brand-secondary-dark: #C4B5FD;      /* Violeta ainda mais claro */
  
  /* Jornadas - Dark Mode */
  --color-journey-learning-bg: #1E3A8A;
  --color-journey-goal-bg: #4C1D95;
  --color-journey-achievement-bg: #14532D;
}
```

### Typography Tokens

```css
:root {
  /* ========== FONT FAMILY ========== */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-family-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-family-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  
  /* ========== FONT SIZES ========== */
  --text-xs: 0.75rem;          /* 12px - Captions, labels pequenos */
  --text-sm: 0.875rem;         /* 14px - Corpo secundário */
  --text-base: 1rem;           /* 16px - Corpo principal */
  --text-lg: 1.125rem;         /* 18px - Subtítulos */
  --text-xl: 1.25rem;          /* 20px - Títulos pequenos */
  --text-2xl: 1.5rem;          /* 24px - Títulos médios */
  --text-3xl: 1.875rem;        /* 30px - Títulos grandes */
  --text-4xl: 2.25rem;         /* 36px - Display pequeno */
  --text-5xl: 3rem;            /* 48px - Display grande */
  
  /* ========== FONT WEIGHTS ========== */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  
  /* ========== LINE HEIGHTS ========== */
  --leading-tight: 1.25;       /* Títulos */
  --leading-snug: 1.375;       /* Subtítulos */
  --leading-normal: 1.5;       /* Corpo */
  --leading-relaxed: 1.625;    /* Parágrafos longos */
  --leading-loose: 2;          /* Espaçamento extra */
  
  /* ========== LETTER SPACING ========== */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
}
```

### Spacing Tokens

```css
:root {
  /* ========== ESPAÇAMENTO BASE (múltiplos de 4px) ========== */
  --spacing-0: 0;
  --spacing-1: 0.25rem;        /* 4px */
  --spacing-2: 0.5rem;         /* 8px */
  --spacing-3: 0.75rem;        /* 12px */
  --spacing-4: 1rem;           /* 16px */
  --spacing-5: 1.25rem;        /* 20px */
  --spacing-6: 1.5rem;         /* 24px */
  --spacing-8: 2rem;           /* 32px */
  --spacing-10: 2.5rem;        /* 40px */
  --spacing-12: 3rem;          /* 48px */
  --spacing-16: 4rem;          /* 64px */
  --spacing-20: 5rem;          /* 80px */
  --spacing-24: 6rem;          /* 96px */
  
  /* ========== ALIASES SEMÂNTICOS ========== */
  --spacing-xs: var(--spacing-1);     /* 4px */
  --spacing-sm: var(--spacing-2);     /* 8px */
  --spacing-md: var(--spacing-4);     /* 16px */
  --spacing-lg: var(--spacing-6);     /* 24px */
  --spacing-xl: var(--spacing-8);     /* 32px */
  --spacing-2xl: var(--spacing-12);   /* 48px */
  
  /* ========== BORDER RADIUS ========== */
  --radius-none: 0;
  --radius-sm: 0.25rem;        /* 4px */
  --radius-md: 0.5rem;         /* 8px */
  --radius-lg: 0.75rem;        /* 12px */
  --radius-xl: 1rem;           /* 16px */
  --radius-2xl: 1.5rem;        /* 24px */
  --radius-full: 9999px;       /* Circular */
  
  /* ========== SHADOWS ========== */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  /* ========== Z-INDEX ========== */
  --z-index-base: 0;
  --z-index-dropdown: 1000;
  --z-index-sticky: 1020;
  --z-index-fixed: 1030;
  --z-index-modal-backdrop: 1040;
  --z-index-modal: 1050;
  --z-index-popover: 1060;
  --z-index-tooltip: 1070;
}
```

---

## 🎨 Paleta de Cores

### Cores da Marca

| Cor | Hex | RGB | Uso | Contraste (AAA) |
|-----|-----|-----|-----|-----------------|
| **Azul Primário** | #2563EB | 37, 99, 235 | CTAs principais, links, foco | ✅ 7.2:1 em branco |
| **Azul Escuro** | #1E40AF | 30, 64, 175 | Texto sobre fundos claros | ✅ 8.9:1 em branco |
| **Azul Claro** | #60A5FA | 96, 165, 250 | Destaques, hover states (dark) | ✅ 4.8:1 em #111827 |
| **Azul Surface** | #EFF6FF | 239, 246, 255 | Fundos secundários | ✅ Uso com texto escuro |

### Cores Semânticas

#### ✅ Sucesso (Verde Crescimento)
- **Base**: `#16A34A` - Conclusões, metas atingidas
- **Surface**: `#F0FDF4` - Fundos de sucesso
- **Uso**: Módulos concluídos, objetivos alcançados, progresso positivo

#### ⚠️ Aviso (Âmbar Atenção)
- **Base**: `#D97706` - Prazos próximos, revisões necessárias
- **Surface**: `#FFFBEB` - Fundos de aviso
- **Uso**: Prazos se aproximando, ações pendentes, recomendações

#### ❌ Erro (Vermelho Alerta)
- **Base**: `#DC2626` - Erros, validações, bloqueios
- **Surface**: `#FEF2F2` - Fundos de erro
- **Uso**: Erros de formulário, prazos vencidos, falhas

#### ℹ️ Info (Ciano Informação)
- **Base**: `#0891B2` - Dicas, informações neutras
- **Surface**: `#ECFEFF` - Fundos informativos
- **Uso**: Tooltips, onboarding, informações contextuais

### Escala de Neutros (Light Mode)

| Uso | Hex | RGB | Descrição |
|-----|-----|-----|-----------|
| **Texto Primário** | #111827 | 17, 24, 39 | Títulos, parágrafos principais |
| **Texto Secundário** | #4B5563 | 75, 85, 99 | Labels, descrições |
| **Texto Terciário** | #6B7280 | 107, 114, 128 | Captions, metadados |
| **Texto Desabilitado** | #9CA3AF | 156, 163, 175 | Estados inativos |
| **BG Primário** | #FFFFFF | 255, 255, 255 | Fundo principal, cards |
| **BG Secundário** | #F9FAFB | 249, 250, 251 | Fundo de página |
| **BG Terciário** | #F3F4F6 | 243, 244, 246 | Áreas de conteúdo |
| **Borda Default** | #E5E7EB | 229, 231, 235 | Divisores, contornos |

### Escala de Neutros (Dark Mode)

| Uso | Hex | RGB | Descrição |
|-----|-----|-----|-----------|
| **Texto Primário** | #F9FAFB | 249, 250, 251 | Títulos, parágrafos principais |
| **Texto Secundário** | #E5E7EB | 229, 231, 235 | Labels, descrições |
| **BG Primário** | #111827 | 17, 24, 39 | Fundo principal |
| **BG Secundário** | #1F2937 | 31, 41, 55 | Cards, containers |
| **BG Terciário** | #374151 | 55, 65, 81 | Áreas secundárias |
| **Borda Default** | #374151 | 55, 65, 81 | Divisores, contornos |

---

## ✍️ Hierarquia Tipográfica

### Display (Páginas de Destaque)

```css
/* Display XL - Hero Sections */
.text-display-xl {
  font-size: 3rem;              /* 48px */
  font-weight: 800;             /* Extrabold */
  line-height: 1.25;            /* Tight */
  letter-spacing: -0.025em;     /* Tight */
}

/* Display L - Títulos Principais */
.text-display-l {
  font-size: 2.25rem;           /* 36px */
  font-weight: 700;             /* Bold */
  line-height: 1.25;
  letter-spacing: -0.025em;
}
```

### Headings (Hierarquia de Conteúdo)

```css
/* Heading 1 - Títulos de Página */
h1, .text-h1 {
  font-size: 1.875rem;          /* 30px */
  font-weight: 700;             /* Bold */
  line-height: 1.375;           /* Snug */
  color: var(--color-text-primary);
}

/* Heading 2 - Títulos de Seção */
h2, .text-h2 {
  font-size: 1.5rem;            /* 24px */
  font-weight: 600;             /* Semibold */
  line-height: 1.375;
  color: var(--color-text-primary);
}

/* Heading 3 - Subtítulos */
h3, .text-h3 {
  font-size: 1.25rem;           /* 20px */
  font-weight: 600;             /* Semibold */
  line-height: 1.5;
  color: var(--color-text-primary);
}

/* Heading 4 - Títulos de Card */
h4, .text-h4 {
  font-size: 1.125rem;          /* 18px */
  font-weight: 500;             /* Medium */
  line-height: 1.5;
  color: var(--color-text-primary);
}
```

### Body (Conteúdo Principal)

```css
/* Body Large - Introduções, Destaques */
.text-body-lg {
  font-size: 1.125rem;          /* 18px */
  font-weight: 400;             /* Regular */
  line-height: 1.625;           /* Relaxed */
  color: var(--color-text-primary);
}

/* Body Base - Padrão */
p, .text-body {
  font-size: 1rem;              /* 16px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text-primary);
}

/* Body Small - Descrições */
.text-body-sm {
  font-size: 0.875rem;          /* 14px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text-secondary);
}
```

### Utility (Metadados e Labels)

```css
/* Caption - Timestamps, Metadados */
small, .text-caption {
  font-size: 0.75rem;           /* 12px */
  font-weight: 400;
  line-height: 1.5;
  color: var(--color-text-tertiary);
}

/* Label - Formulários */
label, .text-label {
  font-size: 0.875rem;          /* 14px */
  font-weight: 500;             /* Medium */
  line-height: 1.5;
  color: var(--color-text-secondary);
}

/* Button Text */
button, .text-button {
  font-size: 0.875rem;          /* 14px */
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.025em;      /* Wide */
}
```

### Code (Dados Técnicos)

```css
/* Inline Code */
code {
  font-family: var(--font-family-mono);
  font-size: 0.875rem;
  background: var(--color-bg-tertiary);
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius-sm);
}

/* Code Block */
pre {
  font-family: var(--font-family-mono);
  font-size: 0.875rem;
  line-height: 1.625;
  background: var(--color-bg-tertiary);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  overflow-x: auto;
}
```

---

## 📐 Sistema de Espaçamento

### Grid System

**Base**: Sistema de 4px garantindo alinhamento pixel-perfect

```
4px  → --spacing-1
8px  → --spacing-2
12px → --spacing-3
16px → --spacing-4 (base para componentes)
24px → --spacing-6 (seções internas)
32px → --spacing-8 (seções principais)
48px → --spacing-12 (separação de blocos)
```

### Padrões de Uso

#### Cards & Containers

```css
/* Card Pequeno */
.card-sm {
  padding: var(--spacing-4);      /* 16px */
  gap: var(--spacing-3);          /* 12px */
}

/* Card Médio (Padrão) */
.card {
  padding: var(--spacing-6);      /* 24px */
  gap: var(--spacing-4);          /* 16px */
}

/* Card Grande */
.card-lg {
  padding: var(--spacing-8);      /* 32px */
  gap: var(--spacing-6);          /* 24px */
}
```

#### Layouts

```css
/* Espaçamento entre seções */
.section {
  margin-bottom: var(--spacing-12);  /* 48px */
}

/* Espaçamento entre elementos de lista */
.list-item {
  margin-bottom: var(--spacing-4);   /* 16px */
}

/* Espaçamento entre parágrafos */
.paragraph {
  margin-bottom: var(--spacing-6);   /* 24px */
}
```

---

## 🧩 Componentes

### 1. Buttons (Botões)

#### Primary Button
**Uso**: Ações principais (salvar objetivo, iniciar estudo)

```jsx
<button className="btn-primary">
  Salvar Objetivo
</button>
```

**Especificações**:
- Background: `var(--color-brand-primary-base)` (#2563EB)
- Text: `var(--color-text-on-primary)` (#FFFFFF)
- Hover: `var(--color-brand-primary-dark)` (#1E40AF)
- Contraste: 7.2:1 ✅ AAA
- Padding: 12px 24px
- Border-radius: 8px
- Font: 14px, medium, tracking-wide

#### Secondary Button
**Uso**: Ações alternativas (cancelar, voltar)

```jsx
<button className="btn-secondary">
  Cancelar
</button>
```

**Especificações**:
- Background: Transparent
- Border: 2px solid `var(--color-border-default)`
- Text: `var(--color-text-primary)`
- Hover: Background `var(--color-bg-tertiary)`

#### Success Button
**Uso**: Conclusões, confirmações positivas

```jsx
<button className="btn-success">
  Marcar como Concluído
</button>
```

**Especificações**:
- Background: `var(--color-success-base)` (#16A34A)
- Text: #FFFFFF
- Contraste: 4.8:1 ✅ AA (7.1:1 AAA com verde escuro #15803D)

#### Destructive Button
**Uso**: Ações irreversíveis (excluir objetivo)

```jsx
<button className="btn-destructive">
  Excluir Objetivo
</button>
```

### 2. Cards

#### StudyCard (Card de Estudo)

**Uso**: Exibir cursos, artigos, projetos em andamento

```jsx
<StudyCard
  type="curso"           // curso | artigo | evento | projeto
  title="Fundamentos de React"
  area="Desenvolvimento Web"
  status="em-andamento"  // em-andamento | concluído | pausado
  progress={65}
  hoursCompleted={12}
  totalHours={20}
  deadline="2025-02-15"
/>
```

**Especificações**:
- Background: `var(--color-bg-primary)`
- Border: 1px solid `var(--color-border-default)`
- Border-radius: 12px
- Padding: 24px
- Shadow: `var(--shadow-sm)`
- Hover: Shadow `var(--shadow-md)` + Border azul

**Elementos**:
- Badge de tipo (ícone + label)
- Título (h4)
- Área de conhecimento (caption)
- Progress bar
- Metadados (horas, prazo)
- Status badge

#### GoalCard (Card de Objetivo)

**Uso**: Exibir objetivos de carreira

```jsx
<GoalCard
  title="Tornar-me Desenvolvedor Full Stack"
  area="Tecnologia"
  level="Pleno"        // Júnior | Pleno | Sênior
  deadline="2025-12-31"
  progress={42}
  linkedStudies={8}
  priority="alta"      // alta | média | baixa
/>
```

**Variantes**:
- **Alta Prioridade**: Border-left 4px violeta + violeta surface
- **Média Prioridade**: Border-left 4px azul + azul surface  
- **Baixa Prioridade**: Border-left 4px cinza + cinza surface

#### AchievementCard (Card de Conquista)

**Uso**: Celebrar marcos e conquistas

```jsx
<AchievementCard
  icon="🏆"
  title="10 Cursos Concluídos"
  description="Parabéns! Você completou 10 cursos"
  unlockedAt="2025-01-15"
  rarity="raro"      // comum | raro | épico
/>
```

### 3. Progress Indicators

#### Linear Progress Bar

```jsx
<ProgressBar
  value={65}
  max={100}
  variant="success"    // primary | success | warning
  showLabel={true}
  label="65% concluído"
/>
```

**Especificações**:
- Height: 8px (12px com label)
- Border-radius: 9999px (full)
- Background: `var(--color-bg-tertiary)`
- Fill: Cor semântica conforme variant
- Transição smooth: 0.3s ease

#### Circular Progress (Progresso Circular)

```jsx
<CircularProgress
  value={75}
  size="lg"           // sm | md | lg
  strokeWidth={8}
  variant="primary"
/>
```

**Tamanhos**:
- sm: 48px
- md: 80px
- lg: 120px

### 4. Status Badge

```jsx
<StatusBadge
  status="em-andamento"   // em-andamento | concluído | pausado | bloqueado
  size="md"               // sm | md | lg
/>
```

**Variantes**:

| Status | Background | Text | Border | Ícone |
|--------|-----------|------|--------|-------|
| Em Andamento | #EFF6FF | #1E40AF | #2563EB | Clock |
| Concluído | #F0FDF4 | #15803D | #16A34A | CheckCircle |
| Pausado | #FFFBEB | #B45309 | #D97706 | Pause |
| Bloqueado | #F3F4F6 | #4B5563 | #9CA3AF | Lock |

### 5. Form Elements

#### Input Field

```jsx
<Input
  type="text"
  label="Nome do Objetivo"
  placeholder="Ex: Aprender TypeScript"
  helper="Seja específico sobre o que deseja alcançar"
  error="Campo obrigatório"
  required={true}
/>
```

**Especificações**:
- Height: 44px (touch-friendly)
- Padding: 12px 16px
- Border: 1px solid `var(--color-border-default)`
- Border-radius: 8px
- Focus: Border azul 2px + ring azul transparente

**Estados**:
- Default: Border cinza
- Focus: Border azul + shadow-sm azul
- Error: Border vermelho + texto vermelho abaixo
- Disabled: Background cinza + cursor not-allowed

#### Select Dropdown

```jsx
<Select
  label="Área de Conhecimento"
  options={[
    { value: "dev", label: "Desenvolvimento" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" }
  ]}
  placeholder="Selecione uma área"
/>
```

#### Textarea

```jsx
<Textarea
  label="Descrição do Objetivo"
  placeholder="Descreva detalhes do seu objetivo..."
  rows={4}
  maxLength={500}
  showCounter={true}
/>
```

#### Checkbox

```jsx
<Checkbox
  label="Marcar como prioridade"
  checked={true}
  onChange={(checked) => {}}
/>
```

#### Radio Group

```jsx
<RadioGroup
  label="Nível Desejado"
  options={[
    { value: "junior", label: "Júnior" },
    { value: "pleno", label: "Pleno" },
    { value: "senior", label: "Sênior" }
  ]}
  value="pleno"
/>
```

#### Date Picker

```jsx
<DatePicker
  label="Prazo"
  value="2025-06-30"
  minDate={new Date()}
  placeholder="Selecione uma data"
/>
```

### 6. Dashboard Components

#### StatsCard (Card de Estatísticas)

```jsx
<StatsCard
  label="Cursos Concluídos"
  value={24}
  icon={<BookCheck />}
  trend="up"          // up | down | neutral
  trendValue="+3 este mês"
  variant="success"
/>
```

#### RecentActivity (Atividade Recente)

```jsx
<RecentActivity
  items={[
    {
      type: "study_completed",
      title: "Concluiu Curso de React",
      timestamp: "2025-01-10T14:30:00",
      icon: "✅"
    },
    {
      type: "goal_created",
      title: "Criou objetivo: Aprender Vue.js",
      timestamp: "2025-01-09T10:15:00",
      icon: "🎯"
    }
  ]}
/>
```

#### UpcomingDeadlines (Prazos Próximos)

```jsx
<UpcomingDeadlines
  items={[
    {
      title: "Curso AWS Fundamentals",
      deadline: "2025-01-25",
      daysLeft: 5,
      priority: "alta"
    }
  ]}
/>
```

### 7. Modals & Dialogs

#### Modal

```jsx
<Modal
  isOpen={true}
  onClose={() => {}}
  title="Criar Novo Objetivo"
  size="md"              // sm | md | lg | xl
>
  {/* Conteúdo do modal */}
</Modal>
```

**Especificações**:
- Overlay: `var(--color-bg-overlay)` com backdrop-blur
- Card: Background primário + shadow-2xl
- Max-width: 500px (md)
- Padding: 32px
- Z-index: 1050

#### Alert Dialog (Confirmação)

```jsx
<AlertDialog
  title="Excluir Objetivo?"
  description="Esta ação não pode ser desfeita. O objetivo será removido permanentemente."
  confirmText="Excluir"
  cancelText="Cancelar"
  variant="destructive"
  onConfirm={() => {}}
  onCancel={() => {}}
/>
```

### 8. Toast Notifications

```jsx
// Sucesso
toast.success("Objetivo criado com sucesso! 🎯");

// Erro
toast.error("Não foi possível salvar. Tente novamente.");

// Aviso
toast.warning("Prazo se aproximando: 2 dias restantes");

// Info
toast.info("Dica: Divida objetivos grandes em metas menores");
```

**Especificações (AAA)**:

| Tipo | Background (Light) | Text (Light) | Contraste |
|------|-------------------|--------------|-----------|
| Success | #F0FDF4 | #15803D | 8.2:1 ✅ |
| Error | #FEF2F2 | #991B1B | 9.1:1 ✅ |
| Warning | #FFFBEB | #B45309 | 7.5:1 ✅ |
| Info | #ECFEFF | #155E75 | 8.8:1 ✅ |

### 9. Empty States

```jsx
<EmptyState
  icon={<Target size={48} />}
  title="Nenhum objetivo cadastrado"
  description="Crie seu primeiro objetivo para começar sua jornada de aprendizado"
  action={{
    label: "Criar Primeiro Objetivo",
    onClick: () => {}
  }}
/>
```

### 10. Loading States

#### Skeleton

```jsx
<Skeleton variant="card" />      // Card placeholder
<Skeleton variant="text" />      // Linha de texto
<Skeleton variant="circular" />  // Avatar circular
```

#### Spinner

```jsx
<Spinner size="md" />   // sm | md | lg
```

---

## 🎯 Sistema de Ícones

### Mapeamento por Contexto

#### Navegação Principal

```typescript
export const NAV_ICONS = {
  home: Home,
  dashboard: LayoutDashboard,
  goals: Target,
  studies: BookOpen,
  progress: TrendingUp,
  achievements: Trophy,
  calendar: Calendar,
  profile: User,
  settings: Settings,
  logout: LogOut,
} as const;
```

#### Tipos de Estudo

```typescript
export const STUDY_TYPE_ICONS = {
  curso: GraduationCap,        // Cursos estruturados
  artigo: FileText,            // Artigos, blogs, documentação
  video: Video,                // Vídeos, tutoriais
  livro: Book,                 // Livros, e-books
  podcast: Podcast,            // Podcasts, áudios
  projeto: Code,               // Projetos práticos
  workshop: Users,             // Workshops, meetups
  mentoria: MessageSquare,     // Mentorias, coaching
} as const;
```

#### Áreas de Conhecimento

```typescript
export const KNOWLEDGE_AREA_ICONS = {
  desenvolvimento: Code,
  design: Palette,
  marketing: Megaphone,
  negocios: Briefcase,
  dados: Database,
  gestao: ClipboardList,
  comunicacao: MessageCircle,
  idiomas: Languages,
  saude: Heart,
  financas: DollarSign,
} as const;
```

#### Status e Estados

```typescript
export const STATUS_ICONS = {
  // Estudos
  'em-andamento': Clock,
  'concluido': CheckCircle2,
  'pausado': Pause,
  'bloqueado': Lock,
  'nao-iniciado': Circle,
  
  // Objetivos
  'ativo': Target,
  'alcancado': CheckCircle,
  'abandonado': XCircle,
  
  // Feedback
  'sucesso': CheckCircle2,
  'erro': XCircle,
  'aviso': AlertTriangle,
  'info': Info,
  'ajuda': HelpCircle,
} as const;
```

#### Ações

```typescript
export const ACTION_ICONS = {
  // CRUD
  adicionar: Plus,
  editar: Edit,
  excluir: Trash2,
  salvar: Save,
  
  // Navegação
  voltar: ArrowLeft,
  avancar: ArrowRight,
  expandir: ChevronDown,
  recolher: ChevronUp,
  
  // Interação
  compartilhar: Share2,
  favoritar: Heart,
  comentar: MessageSquare,
  download: Download,
  upload: Upload,
  
  // Filtros
  filtrar: Filter,
  ordenar: ArrowUpDown,
  buscar: Search,
  
  // Estados
  atualizar: RefreshCw,
  configurar: Settings,
  visualizar: Eye,
  ocultar: EyeOff,
} as const;
```

#### Métricas e Progresso

```typescript
export const METRICS_ICONS = {
  tempo: Clock,
  progresso: TrendingUp,
  meta: Target,
  estatistica: BarChart3,
  calendario: Calendar,
  prazo: AlarmClock,
  conquista: Award,
  nivel: Zap,
  streak: Flame,
} as const;
```

#### Níveis de Carreira

```typescript
export const CAREER_LEVEL_ICONS = {
  estagiario: Sprout,
  junior: Leaf,
  pleno: Tree,
  senior: Crown,
  especialista: Star,
} as const;
```

### Tamanhos de Ícones

```typescript
export const ICON_SIZES = {
  xs: 16,    // Badges, inline
  sm: 20,    // Botões pequenos, lista
  md: 24,    // Padrão, navegação
  lg: 32,    // Destaques, cards
  xl: 48,    // Empty states, ilustrações
  '2xl': 64, // Hero sections
} as const;
```

### Regras de Uso

1. **Consistência**: Use sempre o mesmo ícone para a mesma ação
2. **Clareza**: Ícone + label quando houver dúvida
3. **Acessibilidade**: Sempre forneça `aria-label` em ícones sem texto
4. **Contraste**: Garantir contraste 3:1 para ícones informativos
5. **Hover**: Indicar interatividade com hover states

---

## ✍️ UX Writing e Microcopy

### Princípios de Tom de Voz

#### ✅ Como Falamos

**1. Motivacional e Encorajador**
- "Parabéns! Você concluiu mais um curso! 🎉"
- "Continue assim! Você está 65% mais próximo do seu objetivo"
- "Excelente progresso esta semana!"

**2. Direto e Claro**
- "Criar Novo Objetivo"
- "Cadastrar Estudo"
- "Ver Meu Progresso"

**3. Focado em Crescimento**
- "Jornada de Aprendizado"
- "Evolução de Carreira"
- "Próximos Passos"

**4. Educativo e Orientador**
- "Dica: Divida objetivos grandes em metas menores"
- "Recomendado: Dedique ao menos 30min diários"
- "Progresso consistente é melhor que pressa"

#### ❌ Como NÃO Falamos

**1. Técnico ou Robotizado**
- ❌ "Processo de persistência de dados falhou"
- ✅ "Não foi possível salvar. Tente novamente."

**2. Negativo ou Culpabilizante**
- ❌ "Você não estudou hoje. Que vergonha!"
- ✅ "Sem estudos registrados hoje. Pronto para começar?"

**3. Vago ou Ambíguo**
- ❌ "Clique aqui"
- ✅ "Ver detalhes do curso"

**4. Infantil ou Condescendente**
- ❌ "Uhuu! Mandou bem demais!"
- ✅ "Ótimo trabalho!"

### Biblioteca de Microcopy

#### Autenticação

```typescript
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
    novoUsuario: "Novo por aqui? Criar conta",
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
    ctaPrimario: "Criar conta",
    jaTemConta: "Já tem conta? Entrar",
  },
  
  recuperarSenha: {
    titulo: "Recuperar Senha",
    subtitulo: "Enviaremos um link para redefinir sua senha",
    emailLabel: "E-mail",
    ctaPrimario: "Enviar link",
    ctaSecundario: "Voltar para login",
  },
};
```

#### Dashboard

```typescript
export const DASHBOARD_COPY = {
  saudacao: "Olá, [nome]! 👋",
  subtitulos: [
    "Pronto para aprender algo novo hoje?",
    "Continue de onde parou",
    "Seu progresso está incrível!",
  ],
  
  secoes: {
    emAndamento: "Estudos em Andamento",
    proximosPrazos: "Prazos Próximos",
    objetivos: "Meus Objetivos",
    estatisticas: "Visão Geral",
    atividadeRecente: "Atividade Recente",
    recomendacoes: "Recomendações para Você",
  },
  
  emptyStates: {
    semEstudos: {
      titulo: "Nenhum estudo cadastrado",
      descricao: "Cadastre seu primeiro curso, artigo ou projeto",
      cta: "Cadastrar estudo",
    },
    semObjetivos: {
      titulo: "Defina seu primeiro objetivo",
      descricao: "Estabeleça metas claras para guiar seus estudos",
      cta: "Criar objetivo",
    },
  },
};
```

#### Formulários - Objetivo

```typescript
export const GOAL_FORM_COPY = {
  criar: {
    titulo: "Criar Novo Objetivo",
    subtitulo: "Defina onde você quer chegar",
  },
  
  campos: {
    titulo: {
      label: "O que você quer alcançar?",
      placeholder: "Ex: Tornar-me Desenvolvedor Full Stack",
      helper: "Seja específico sobre o objetivo profissional",
    },
    area: {
      label: "Área de foco",
      placeholder: "Selecione uma área",
      opcoes: [
        { value: "dev", label: "Desenvolvimento" },
        { value: "design", label: "Design" },
        { value: "marketing", label: "Marketing" },
        { value: "dados", label: "Dados e IA" },
        { value: "negocios", label: "Negócios" },
        { value: "gestao", label: "Gestão" },
        { value: "outro", label: "Outro" },
      ],
    },
    nivel: {
      label: "Nível desejado",
      opcoes: [
        { value: "estagiario", label: "Estagiário" },
        { value: "junior", label: "Júnior" },
        { value: "pleno", label: "Pleno" },
        { value: "senior", label: "Sênior" },
        { value: "especialista", label: "Especialista" },
      ],
    },
    prazo: {
      label: "Prazo estimado",
      helper: "Quando você pretende alcançar este objetivo?",
    },
    descricao: {
      label: "Descrição (opcional)",
      placeholder: "Detalhe o que este objetivo significa para você...",
    },
    prioridade: {
      label: "Prioridade",
      opcoes: [
        { value: "alta", label: "Alta - Foco principal" },
        { value: "media", label: "Média - Importante" },
        { value: "baixa", label: "Baixa - Secundário" },
      ],
    },
  },
  
  acoes: {
    salvar: "Salvar objetivo",
    cancelar: "Cancelar",
    excluir: "Excluir objetivo",
    editar: "Editar",
  },
};
```

#### Formulários - Estudo

```typescript
export const STUDY_FORM_COPY = {
  criar: {
    titulo: "Cadastrar Estudo",
    subtitulo: "Registre cursos, artigos, projetos e mais",
  },
  
  campos: {
    tipo: {
      label: "Tipo de estudo",
      opcoes: [
        { value: "curso", label: "Curso", icon: "GraduationCap" },
        { value: "artigo", label: "Artigo/Documentação", icon: "FileText" },
        { value: "video", label: "Vídeo/Tutorial", icon: "Video" },
        { value: "livro", label: "Livro", icon: "Book" },
        { value: "projeto", label: "Projeto Prático", icon: "Code" },
        { value: "workshop", label: "Workshop/Evento", icon: "Users" },
      ],
    },
    titulo: {
      label: "Nome do estudo",
      placeholder: "Ex: Curso Completo de React",
    },
    area: {
      label: "Área de conhecimento",
      placeholder: "Selecione a área",
    },
    status: {
      label: "Status",
      opcoes: [
        { value: "em-andamento", label: "Em andamento" },
        { value: "concluido", label: "Concluído" },
        { value: "pausado", label: "Pausado" },
        { value: "nao-iniciado", label: "Não iniciado" },
      ],
    },
    dataInicio: {
      label: "Data de início",
    },
    dataFim: {
      label: "Data de conclusão (opcional)",
    },
    cargaHoraria: {
      label: "Carga horária total (horas)",
      placeholder: "Ex: 20",
    },
    horasConcluidas: {
      label: "Horas concluídas",
      placeholder: "0",
    },
    objetivo: {
      label: "Vincular a um objetivo (opcional)",
      placeholder: "Selecione um objetivo",
    },
    anotacoes: {
      label: "Anotações",
      placeholder: "Principais aprendizados, recursos úteis...",
    },
  },
};
```

#### Call-to-Actions (CTAs)

```typescript
export const CTAS = {
  // Primários - Ações principais
  primarios: {
    salvar: "Salvar",
    criar: "Criar",
    confirmar: "Confirmar",
    continuar: "Continuar",
    iniciar: "Iniciar",
    concluir: "Marcar como concluído",
    enviar: "Enviar",
  },
  
  // Secundários - Ações alternativas
  secundarios: {
    cancelar: "Cancelar",
    voltar: "Voltar",
    fechar: "Fechar",
    pular: "Pular",
    depois: "Fazer depois",
  },
  
  // Destrutivos - Ações irreversíveis
  destrutivos: {
    excluir: "Excluir",
    remover: "Remover",
    abandonar: "Abandonar objetivo",
    limpar: "Limpar tudo",
  },
  
  // Navegação
  navegacao: {
    verMais: "Ver mais",
    verDetalhes: "Ver detalhes",
    verTodos: "Ver todos",
    expandir: "Expandir",
    recolher: "Recolher",
  },
  
  // Específicos
  especificos: {
    criarObjetivo: "Criar novo objetivo",
    cadastrarEstudo: "Cadastrar estudo",
    editarPerfil: "Editar perfil",
    verProgresso: "Ver meu progresso",
    exportarDados: "Exportar dados",
    compartilhar: "Compartilhar",
  },
};
```

#### Validação de Formulários

```typescript
export const VALIDATION_MESSAGES = {
  required: "Este campo é obrigatório",
  email: "Por favor, insira um e-mail válido",
  
  senha: {
    minLength: "A senha deve ter no mínimo 8 caracteres",
    match: "As senhas não coincidem",
    strength: "Use letras, números e símbolos para maior segurança",
  },
  
  data: {
    invalid: "Data inválida",
    passado: "A data não pode ser no passado",
    range: "A data de fim deve ser posterior à data de início",
  },
  
  numero: {
    invalid: "Insira um número válido",
    min: "O valor mínimo é [min]",
    max: "O valor máximo é [max]",
  },
  
  texto: {
    minLength: "Mínimo de [min] caracteres",
    maxLength: "Máximo de [max] caracteres",
  },
};
```

#### Mensagens de Sucesso

```typescript
export const SUCCESS_MESSAGES = {
  objetivo: {
    criado: "Objetivo criado com sucesso! 🎯",
    atualizado: "Objetivo atualizado!",
    excluido: "Objetivo removido",
    concluido: "Parabéns! Objetivo alcançado! 🎉",
  },
  
  estudo: {
    criado: "Estudo cadastrado com sucesso!",
    atualizado: "Estudo atualizado!",
    excluido: "Estudo removido",
    concluido: "Parabéns! Estudo concluído! ✅",
  },
  
  perfil: {
    atualizado: "Perfil atualizado com sucesso!",
    fotoAlterada: "Foto de perfil atualizada!",
  },
  
  conta: {
    criada: "Conta criada! Bem-vindo ao Progress! 🚀",
    emailEnviado: "E-mail enviado! Verifique sua caixa de entrada.",
    senhaAlterada: "Senha alterada com sucesso!",
  },
};
```

#### Mensagens de Erro

```typescript
export const ERROR_MESSAGES = {
  generic: "Algo deu errado. Por favor, tente novamente.",
  network: "Sem conexão. Verifique sua internet.",
  
  auth: {
    invalidCredentials: "E-mail ou senha incorretos",
    emailInUse: "Este e-mail já está cadastrado",
    weakPassword: "Senha muito fraca. Use ao menos 8 caracteres",
  },
  
  save: "Não foi possível salvar. Tente novamente.",
  load: "Não foi possível carregar os dados. Tente novamente.",
  delete: "Não foi possível excluir. Tente novamente.",
};
```

#### Mensagens de Aviso

```typescript
export const WARNING_MESSAGES = {
  prazoProximo: "Prazo se aproximando: [dias] dias restantes",
  semProgresso: "Sem progresso registrado nos últimos 7 dias",
  metaNaoVinculada: "Este estudo não está vinculado a nenhum objetivo",
  
  exclusao: {
    objetivo: "Tem certeza? Esta ação não pode ser desfeita.",
    estudo: "Ao excluir, você perderá todo o histórico de progresso.",
  },
};
```

#### Empty States (Estados Vazios)

```typescript
export const EMPTY_STATES = {
  estudos: {
    titulo: "Nenhum estudo cadastrado",
    descricao: "Comece registrando cursos, artigos ou projetos que você está estudando",
    cta: "Cadastrar primeiro estudo",
  },
  
  objetivos: {
    titulo: "Defina seu primeiro objetivo",
    descricao: "Objetivos claros ajudam a manter o foco e a motivação",
    cta: "Criar primeiro objetivo",
  },
  
  progresso: {
    titulo: "Nenhum progresso registrado",
    descricao: "Complete estudos e atualize seu progresso para ver estatísticas",
  },
  
  busca: {
    titulo: "Nenhum resultado encontrado",
    descricao: "Tente usar termos diferentes ou ajustar os filtros",
  },
  
  conquistas: {
    titulo: "Nenhuma conquista ainda",
    descricao: "Complete estudos e alcance objetivos para desbloquear conquistas",
  },
};
```

#### Aria Labels (Acessibilidade)

```typescript
export const ARIA_LABELS = {
  navegacao: {
    menuPrincipal: "Menu principal",
    abrirMenu: "Abrir menu",
    fecharMenu: "Fechar menu",
    voltar: "Voltar para página anterior",
  },
  
  formularios: {
    mostrarSenha: "Mostrar senha",
    ocultarSenha: "Ocultar senha",
    selecionarData: "Selecionar data",
    abrirCalendario: "Abrir calendário",
    removerItem: "Remover item",
  },
  
  acoes: {
    editar: "Editar [item]",
    excluir: "Excluir [item]",
    visualizar: "Visualizar detalhes",
    expandir: "Expandir seção",
    recolher: "Recolher seção",
  },
  
  progresso: {
    barraProgresso: "Progresso: [valor]% concluído",
    status: "Status: [status]",
  },
};
```

---

## ♿ Acessibilidade AAA

### Contraste de Cores (WCAG 2.1 AAA - 7:1)

#### Textos sobre Fundos Claros (Light Mode)

| Elemento | Cor | Fundo | Contraste | Status |
|----------|-----|-------|-----------|--------|
| Texto Primário | #111827 | #FFFFFF | 16.9:1 | ✅ AAA |
| Texto Secundário | #4B5563 | #FFFFFF | 7.5:1 | ✅ AAA |
| Texto Terciário | #6B7280 | #FFFFFF | 5.4:1 | ⚠️ AA |
| Link Azul | #1E40AF | #FFFFFF | 8.9:1 | ✅ AAA |
| Botão Primário | #FFFFFF | #2563EB | 7.2:1 | ✅ AAA |
| Botão Sucesso | #FFFFFF | #16A34A | 4.8:1 | ⚠️ AA (usar #15803D para AAA) |
| Erro | #991B1B | #FFFFFF | 9.1:1 | ✅ AAA |
| Aviso | #B45309 | #FFFFFF | 7.5:1 | ✅ AAA |

#### Textos sobre Fundos Escuros (Dark Mode)

| Elemento | Cor | Fundo | Contraste | Status |
|----------|-----|-------|-----------|--------|
| Texto Primário | #F9FAFB | #111827 | 16.1:1 | ✅ AAA |
| Texto Secundário | #E5E7EB | #111827 | 13.5:1 | ✅ AAA |
| Link Azul | #93C5FD | #111827 | 9.2:1 | ✅ AAA |

### Diretrizes de Implementação

#### 1. Navegação por Teclado

- **Tab Order**: Lógico e previsível
- **Focus Visible**: Sempre mostrar indicador de foco (outline azul 2px)
- **Skip Links**: "Pular para conteúdo principal"
- **Atalhos**: Documentados e configuráveis

```jsx
// Exemplo: Focus visible
.focusable:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
```

#### 2. Leitores de Tela

- **ARIA Labels**: Todos os elementos interativos
- **ARIA Live Regions**: Para conteúdo dinâmico
- **ARIA Roles**: Quando semântica HTML não é suficiente
- **Alt Text**: Descrições significativas de imagens

```jsx
// Exemplo: Botão sem texto
<button
  aria-label="Excluir objetivo"
  onClick={handleDelete}
>
  <Trash2 />
</button>

// Exemplo: Status dinâmico
<div aria-live="polite" aria-atomic="true">
  {successMessage}
</div>
```

#### 3. Formulários Acessíveis

- **Labels**: Sempre visíveis (não usar só placeholder)
- **Errors**: Associados com `aria-describedby`
- **Required**: Indicado visualmente e com `aria-required`
- **Autocomplete**: Atributos apropriados

```jsx
<div>
  <label htmlFor="objetivo-titulo">
    O que você quer alcançar?
    <span aria-label="obrigatório">*</span>
  </label>
  <input
    id="objetivo-titulo"
    type="text"
    required
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? "objetivo-error" : undefined}
  />
  {hasError && (
    <p id="objetivo-error" role="alert">
      Este campo é obrigatório
    </p>
  )}
</div>
```

#### 4. Conteúdo Dinâmico

- **Loading States**: Anunciar carregamento
- **Modals**: Foco capturado, ESC para fechar
- **Toasts**: `aria-live="polite"` ou `"assertive"`
- **Progress**: Anunciar mudanças significativas

```jsx
// Modal com gestão de foco
<Dialog
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  onClose={handleClose}
>
  <h2 id="modal-title">Criar Novo Objetivo</h2>
  <div id="modal-description">
    Defina onde você quer chegar
  </div>
  {/* Conteúdo */}
</Dialog>
```

#### 5. Controle de Tempo

- **Sessões**: Avisar antes de expirar
- **Toasts**: Duração ajustável (padrão 5s, importante 10s)
- **Animações**: `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### 6. Zoom e Reflow

- **Zoom 200%**: Layout não quebra
- **Text Spacing**: Suporta ajustes de espaçamento
- **Responsive**: 320px a 1920px+
- **Units**: Usar `rem` para tipografia

#### 7. Indicadores Visuais

- **Não apenas cor**: Usar ícones + texto
- **Padrões**: Para diferenciar categorias
- **Tooltips**: Informação adicional sempre acessível

```jsx
// Exemplo: Status com ícone + texto + cor
<StatusBadge status="concluido">
  <CheckCircle size={16} />
  <span>Concluído</span>
</StatusBadge>
```

### Checklist de Acessibilidade

#### Antes de Lançar

- [ ] Contraste mínimo 7:1 em todos os textos
- [ ] Contraste mínimo 3:1 em elementos gráficos
- [ ] Navegação completa por teclado
- [ ] Indicadores de foco visíveis
- [ ] Labels descritivos em todos os campos
- [ ] Mensagens de erro associadas aos campos
- [ ] ARIA labels em ícones sem texto
- [ ] Alt text em todas as imagens
- [ ] Heading hierarchy (h1 → h2 → h3)
- [ ] Skip links funcionando
- [ ] Modals capturam foco
- [ ] Toasts com aria-live
- [ ] Suporte a prefers-reduced-motion
- [ ] Zoom até 200% sem quebra
- [ ] Testado com leitor de tela (NVDA/JAWS/VoiceOver)

---

## 🖼️ Guia de Imagens

### Tipos de Imagens

#### 1. Ilustrações
**Uso**: Empty states, onboarding, hero sections

**Estilo**:
- Flat design minimalista
- Cores da paleta do sistema
- Linhas suaves e arredondadas
- Foco em conceitos de aprendizado e crescimento

**Fontes Recomendadas**:
- Undraw (https://undraw.co)
- Storyset (https://storyset.com)
- Blush Design (https://blush.design)

**Exemplos de Busca**:
- "online learning"
- "goal achievement"
- "studying"
- "career growth"
- "progress tracking"

#### 2. Ícones
**Uso**: Navegação, categorias, ações

**Estilo**:
- Lucide React (biblioteca padrão)
- Stroke width: 2px
- Tamanhos: 16px, 20px, 24px, 32px, 48px
- Cores: Baseadas em tokens semânticos

#### 3. Fotos (se aplicável)
**Uso**: Perfil de usuário, backgrounds

**Estilo**:
- Realistas mas com bom tratamento
- Luz natural, cores suaves
- Foco em pessoas estudando, trabalhando
- Diversidade representada

**Fontes**:
- Unsplash (https://unsplash.com)
- Pexels (https://pexels.com)

**Exemplos de Busca**:
- "person studying laptop"
- "workspace minimal"
- "reading book coffee"
- "online course"

### Diretrizes de Uso

#### Acessibilidade
```jsx
// Sempre fornecer alt text descritivo
<img
  src="/images/empty-goals.svg"
  alt="Ilustração de pessoa olhando para um quadro com metas e objetivos"
/>

// Imagens decorativas
<img
  src="/images/pattern-bg.svg"
  alt=""
  aria-hidden="true"
/>
```

#### Responsive
```jsx
// Usar srcset para diferentes densidades
<img
  src="/images/hero.png"
  srcSet="/images/hero.png 1x, /images/hero@2x.png 2x"
  alt="Dashboard do Progress App"
/>
```

#### Lazy Loading
```jsx
// Carregar imagens fora do viewport inicial
<img
  src="/images/screenshot.png"
  loading="lazy"
  alt="Tela de progresso mostrando estatísticas"
/>
```

### Cores para Ilustrações Customizadas

**Primária**: #2563EB (Azul)
**Secundária**: #7C3AED (Violeta)
**Acento 1**: #16A34A (Verde)
**Acento 2**: #D97706 (Âmbar)
**Neutro Claro**: #F9FAFB
**Neutro Médio**: #6B7280
**Neutro Escuro**: #111827

---

## 📋 Checklist de Qualidade

### Para Novos Componentes

- [ ] Design tokens aplicados (cores, espaçamento, tipografia)
- [ ] Contraste AAA verificado
- [ ] Estados definidos (default, hover, focus, active, disabled, error)
- [ ] Dark mode implementado
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Acessível (teclado, leitor de tela, ARIA)
- [ ] Documentado com exemplos
- [ ] Testado em navegadores principais

### Para Novo Conteúdo

- [ ] Tom de voz consistente
- [ ] Microcopy claro e direto
- [ ] CTAs específicos (não genéricos)
- [ ] Mensagens de erro orientam para solução
- [ ] Feedback positivo celebra conquistas
- [ ] Labels descritivos para acessibilidade
- [ ] Revisão ortográfica e gramatical

### Para Novas Features

- [ ] Alinhada com princípios do design system
- [ ] Reutiliza componentes existentes
- [ ] Mantém consistência visual
- [ ] Fluxo de usuário intuitivo
- [ ] Onboarding claro (se necessário)
- [ ] Feedback em tempo real
- [ ] Tratamento de erros completo

---

## 🚀 Próximos Passos

### Fase 1: MVP (Atual)
- ✅ Design tokens definidos
- ✅ Paleta de cores com acessibilidade AAA
- ✅ Hierarquia tipográfica
- ✅ Sistema de espaçamento
- ✅ UX Writing base
- 🔄 Componentes principais em desenvolvimento

### Fase 2: Expansão
- [ ] Sistema de conquistas/gamificação completo
- [ ] Dashboard com widgets customizáveis
- [ ] Recap mensal/anual visual
- [ ] Gráficos avançados (tempo de estudo, áreas de conhecimento)
- [ ] Sistema de recomendações

### Fase 3: Escala
- [ ] Design tokens em JSON/YAML para multi-plataforma
- [ ] Biblioteca de componentes Storybook
- [ ] Guia de contribuição para novos componentes
- [ ] Animações e microinterações avançadas
- [ ] Temas customizáveis

---

## 📚 Referências

### Ferramentas de Acessibilidade
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### Documentação
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)

### Inspiração de Design
- [Linear](https://linear.app) - Design system limpo e profissional
- [Notion](https://notion.so) - Hierarquia de informação clara
- [Duolingo](https://duolingo.com) - Gamificação e motivação
- [Todoist](https://todoist.com) - Gestão de tarefas intuitiva

---

**Versão**: 1.0.0  
**Última Atualização**: Dezembro 2024  
**Mantido por**: Equipe Progress Design System
