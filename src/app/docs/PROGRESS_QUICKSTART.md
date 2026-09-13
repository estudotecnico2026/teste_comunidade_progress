# Progress App - Quick Start Guide

## 🚀 Começando com o Design System

Este guia rápido mostra como utilizar o Design System do Progress App.

---

## 📁 Estrutura de Arquivos

```
/docs/
  design-system-progress.md   # Documentação completa do Design System
  PROGRESS_QUICKSTART.md       # Este arquivo (guia rápido)

/styles/
  progress-design-system.css   # Design tokens CSS (cores, tipografia, espaçamento)

/lib/
  /content/
    progress-ux-writing.ts     # Sistema de UX Writing e microcopies
  /constants/
    progress-icons.ts          # Sistema de ícones mapeados

/components/
  /progress/
    StudyCard.tsx              # Card de estudos
    GoalCard.tsx               # Card de objetivos
    StatusBadge.tsx            # Badge de status
    index.ts                   # Exportações centralizadas
```

---

## 🎨 1. Usando Design Tokens CSS

### Importar o CSS

```tsx
// No seu App.tsx ou main.tsx
import '@/styles/progress-design-system.css';
```

### Usando Tokens

```css
/* Cores */
background: var(--progress-color-primary-base);      /* Azul #2563EB */
color: var(--progress-color-text-primary);           /* Texto principal */

/* Espaçamento */
padding: var(--progress-spacing-md);                 /* 16px */
gap: var(--progress-spacing-sm);                     /* 8px */

/* Tipografia */
font-size: var(--progress-text-lg);                  /* 18px */
font-weight: var(--progress-font-weight-semibold);   /* 600 */

/* Border Radius */
border-radius: var(--progress-radius-md);            /* 8px */

/* Shadows */
box-shadow: var(--progress-shadow-md);
```

### Classes Utilitárias

```tsx
// Jornadas
<div className="journey-learning">   // Fundo azul claro
<div className="journey-goal">       // Fundo violeta claro
<div className="journey-achievement"> // Fundo verde claro

// Cards
<div className="card-sm">   // Padding 16px, gap 12px
<div className="card-md">   // Padding 24px, gap 16px
<div className="card-lg">   // Padding 32px, gap 24px

// Tipografia
<h1 className="text-h1">      // 30px, bold
<h2 className="text-h2">      // 24px, semibold
<p className="text-body">     // 16px, regular
<small className="text-caption"> // 12px
```

---

## 📝 2. Usando UX Writing

```tsx
import { 
  AUTH_COPY, 
  DASHBOARD_COPY, 
  SUCCESS_MESSAGES,
  VALIDATION_MESSAGES 
} from '@/lib/content/progress-ux-writing';

// Autenticação
<h1>{AUTH_COPY.login.titulo}</h1>
<p>{AUTH_COPY.login.subtitulo}</p>
<input placeholder={AUTH_COPY.login.emailPlaceholder} />

// Dashboard
<h2>{DASHBOARD_COPY.saudacao.replace('[nome]', userName)}</h2>
<p>{DASHBOARD_COPY.subtitulos[0]}</p>

// Mensagens de sucesso
toast.success(SUCCESS_MESSAGES.objetivo.criado);

// Validação
{errors.email && <p>{VALIDATION_MESSAGES.email.invalid}</p>}
```

---

## 🎯 3. Usando Ícones

```tsx
import { 
  NAVIGATION_ICONS,
  STUDY_TYPE_ICONS,
  ACTION_ICONS,
  ICON_SIZES 
} from '@/lib/constants/progress-icons';

// Navegação
<NAVIGATION_ICONS.dashboard size={ICON_SIZES.md} />
<NAVIGATION_ICONS.goals size={24} />

// Tipos de estudo
<STUDY_TYPE_ICONS.curso size={20} />
<STUDY_TYPE_ICONS.artigo size={20} />

// Ações
<ACTION_ICONS.editar size={ICON_SIZES.sm} />
<ACTION_ICONS.excluir size={16} />

// Com acessibilidade
<NAVIGATION_ICONS.home 
  size={24} 
  aria-label="Ir para página inicial" 
/>
```

---

## 🧩 4. Usando Componentes

### StudyCard

```tsx
import { StudyCard } from '@/components/progress';

<StudyCard
  type="curso"
  title="Fundamentos de React"
  area="Desenvolvimento Web"
  status="em-andamento"
  progress={65}
  hoursCompleted={12}
  totalHours={20}
  deadline="2025-02-15"
  onClick={() => navigate('/study/123')}
  onEdit={() => openEditModal()}
  onDelete={() => confirmDelete()}
/>
```

### GoalCard

```tsx
import { GoalCard } from '@/components/progress';

<GoalCard
  title="Tornar-me Desenvolvedor Full Stack"
  area="Tecnologia"
  level="pleno"
  deadline="2025-12-31"
  progress={42}
  linkedStudies={8}
  priority="alta"
  onClick={() => navigate('/goal/456')}
  onEdit={() => openEditModal()}
  onDelete={() => confirmDelete()}
/>
```

### StatusBadge

```tsx
import { StatusBadge } from '@/components/progress';

<StatusBadge variant="em-andamento" />
<StatusBadge variant="concluido" size="lg" />
<StatusBadge variant="aviso" label="Prazo próximo" />
```

---

## 🎨 5. Paleta de Cores Rápida

### Cores Principais

| Cor | Valor | Quando usar |
|-----|-------|-------------|
| **Azul Primário** | `#2563EB` | Botões principais, links, CTAs |
| **Violeta Secundário** | `#7C3AED` | Objetivos, destaques secundários |
| **Verde Sucesso** | `#16A34A` | Conclusões, confirmações |
| **Âmbar Aviso** | `#D97706` | Prazos próximos, atenção |
| **Vermelho Erro** | `#DC2626` | Erros, exclusões |

### Usando com Tailwind

```tsx
// Background
<div className="bg-blue-600">            // Primário
<div className="bg-purple-600">          // Secundário
<div className="bg-green-600">           // Sucesso

// Text
<span className="text-blue-700 dark:text-blue-300">
<span className="text-purple-700 dark:text-purple-300">

// Border
<div className="border-blue-600">
<div className="border-l-4 border-l-purple-600">
```

---

## ♿ 6. Checklist de Acessibilidade

### Sempre fazer:

- ✅ Usar contraste mínimo 7:1 (AAA)
- ✅ Fornecer `aria-label` em ícones sem texto
- ✅ Usar `role` apropriado em componentes interativos
- ✅ Garantir navegação por teclado (`tabIndex`, `onKeyDown`)
- ✅ Fornecer texto alternativo em imagens
- ✅ Usar elementos semânticos HTML
- ✅ Testar com leitor de tela

### Exemplo acessível:

```tsx
<button
  onClick={handleDelete}
  className="p-2 hover:bg-red-100 rounded-md"
  aria-label="Excluir objetivo"
  type="button"
>
  <Trash2 size={20} aria-hidden="true" />
</button>

<div
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label={`Progresso: ${progress}% concluído`}
>
  {/* Progress bar visual */}
</div>
```

---

## 📐 7. Sistema de Espaçamento

Use sempre múltiplos de 4px:

```tsx
// Tailwind classes
<div className="p-4">     // 16px
<div className="gap-2">   // 8px
<div className="mb-6">    // 24px
<div className="space-y-4"> // 16px entre itens

// CSS custom properties
style={{ padding: 'var(--progress-spacing-md)' }}  // 16px
style={{ gap: 'var(--progress-spacing-sm)' }}      // 8px
```

**Escala recomendada:**
- `4px` → spacing-1 → Gaps mínimos
- `8px` → spacing-2 → Gaps pequenos
- `12px` → spacing-3 → Gaps entre elementos próximos
- `16px` → spacing-4 → **Base (padrão)**
- `24px` → spacing-6 → Seções internas
- `32px` → spacing-8 → Seções principais
- `48px` → spacing-12 → Separação de blocos

---

## 📱 8. Responsividade

```tsx
// Mobile-first approach
<div className="
  p-4           // Mobile: 16px
  md:p-6        // Tablet: 24px
  lg:p-8        // Desktop: 32px
">

<h1 className="
  text-2xl      // Mobile: 24px
  md:text-3xl   // Tablet: 30px
  lg:text-4xl   // Desktop: 36px
">

// Grid responsivo
<div className="
  grid
  grid-cols-1       // Mobile: 1 coluna
  md:grid-cols-2    // Tablet: 2 colunas
  lg:grid-cols-3    // Desktop: 3 colunas
  gap-4
">
```

---

## 🌓 9. Dark Mode

```tsx
// Cores que mudam com dark mode
<div className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-gray-100
  border-gray-300 dark:border-gray-700
">

// Usar design tokens (recomendado)
<div className="
  bg-card
  text-foreground
  border-border
">
```

---

## 🚀 10. Exemplos Completos

### Dashboard com Cards

```tsx
import { StudyCard, GoalCard, StatusBadge } from '@/components/progress';
import { DASHBOARD_COPY } from '@/lib/content/progress-ux-writing';

function Dashboard() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-h1 mb-2">
          {DASHBOARD_COPY.saudacao.replace('[nome]', user.name)}
        </h1>
        <p className="text-body-sm text-muted-foreground">
          {DASHBOARD_COPY.subtitulos[0]}
        </p>
      </div>
      
      {/* Estudos em Andamento */}
      <section>
        <h2 className="text-h2 mb-4">
          {DASHBOARD_COPY.secoes.emAndamento}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {estudos.map(estudo => (
            <StudyCard key={estudo.id} {...estudo} />
          ))}
        </div>
      </section>
      
      {/* Objetivos */}
      <section>
        <h2 className="text-h2 mb-4">
          {DASHBOARD_COPY.secoes.objetivos}
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {objetivos.map(objetivo => (
            <GoalCard key={objetivo.id} {...objetivo} />
          ))}
        </div>
      </section>
    </div>
  );
}
```

### Formulário com Validação

```tsx
import { useState } from 'react';
import { GOAL_FORM_COPY, VALIDATION_MESSAGES, SUCCESS_MESSAGES } from '@/lib/content/progress-ux-writing';
import { toast } from 'sonner';

function GoalForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    const newErrors: Record<string, string> = {};
    
    if (!titulo) {
      newErrors.titulo = VALIDATION_MESSAGES.titulo.required;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Salvar
    saveGoal(data);
    toast.success(SUCCESS_MESSAGES.objetivo.criado);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="titulo" className="text-label mb-2 block">
          {GOAL_FORM_COPY.campos.titulo.label}
        </label>
        <input
          id="titulo"
          type="text"
          placeholder={GOAL_FORM_COPY.campos.titulo.placeholder}
          className={cn(
            "w-full px-4 py-3 rounded-md border",
            "bg-input-background text-foreground",
            "border-input focus:border-primary",
            "focus:ring-2 focus:ring-primary/20",
            errors.titulo && "border-destructive"
          )}
          aria-invalid={!!errors.titulo}
          aria-describedby={errors.titulo ? "titulo-error" : undefined}
        />
        {errors.titulo && (
          <p id="titulo-error" className="text-sm text-destructive mt-1" role="alert">
            {errors.titulo}
          </p>
        )}
      </div>
      
      <div className="flex gap-3">
        <button
          type="submit"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          {GOAL_FORM_COPY.acoes.criar}
        </button>
        <button
          type="button"
          className="px-6 py-3 border border-border rounded-md font-medium hover:bg-muted transition-colors"
        >
          {GOAL_FORM_COPY.acoes.cancelar}
        </button>
      </div>
    </form>
  );
}
```

---

## 📚 Recursos

- **Documentação Completa**: `/docs/design-system-progress.md`
- **Design Tokens CSS**: `/styles/progress-design-system.css`
- **UX Writing**: `/lib/content/progress-ux-writing.ts`
- **Ícones**: `/lib/constants/progress-icons.ts`
- **Componentes**: `/components/progress/`

---

## 🆘 Dúvidas Comuns

### Como garantir acessibilidade AAA?

1. Use design tokens de cores (já testados)
2. Sempre forneça labels descritivos
3. Teste navegação por teclado
4. Use `aria-label` em ícones sem texto
5. Forneça feedback visual e textual

### Como adicionar um novo componente?

1. Crie em `/components/progress/`
2. Use design tokens CSS
3. Importe UX Writing e ícones apropriados
4. Garanta acessibilidade AAA
5. Exporte em `/components/progress/index.ts`

### Como customizar cores?

Edite as variáveis em `/styles/progress-design-system.css`:

```css
:root {
  --progress-color-primary-base: #SEU_AZUL;
  --progress-color-secondary-base: #SEU_VIOLETA;
  /* ... */
}
```

---

**Versão**: 1.0.0  
**Última Atualização**: Dezembro 2024
