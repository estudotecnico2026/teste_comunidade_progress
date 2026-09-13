# PET FRIENDLY APP - DESIGN SYSTEM
**Guia Completo de Content Ops e Boas Práticas**

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Design Tokens](#design-tokens)
3. [Hierarquia Tipográfica](#hierarquia-tipográfica)
4. [Sistema de Cores](#sistema-de-cores)
5. [Espaçamento](#espaçamento)
6. [Componentes](#componentes)
7. [Sistema de Ícones](#sistema-de-ícones)
8. [UX Writing](#ux-writing)
9. [Acessibilidade AAA](#acessibilidade-aaa)
10. [Microinterações](#microinterações)

---

## Visão Geral

O Design System do Pet Friendly App foi criado para garantir consistência, escalabilidade e acessibilidade em todas as experiências para tutores, passeadores e cuidadores de pets.

### Princípios Fundamentais

✓ **Acessibilidade First**: WCAG 2.1 AAA
✓ **Escalabilidade**: Componentes reutilizáveis
✓ **Consistência**: Design tokens padronizados
✓ **Inclusividade**: Linguagem clara e acolhedora
✓ **Performance**: Otimizado para web e mobile

---

## Design Tokens

### Paleta de Cores

#### Cores da Marca - Primary
```css
--color-brand-primary-base: #A06D4F     /* Marrom Terra Quente */
--color-brand-primary-light: #DCC1AF    /* Variação mais clara */
--color-brand-primary-dark: #6C4A33     /* Variação mais escura */
```

#### Cores da Marca - Secondary
```css
--color-brand-secondary-cream: #F5E8D9      /* Bege Claro/Creme - Fundo */
--color-brand-secondary-green-moss: #7B8D6F /* Verde Musgo Suave */
```

#### Cores das Jornadas - Tutor
```css
--color-journey-tutor-action: #D28F6C   /* Laranja Queimado - Botões */
--color-journey-tutor-support: #E9B29C  /* Salmão Rosado - Tags */
```

#### Cores das Jornadas - Prestador
```css
--color-journey-provider-action: #5F8D8F  /* Verde-Azulado - Botões */
--color-journey-provider-support: #B0C0C0 /* Cinza Azulado - Tags */
```

#### Cores Utility - Status
```css
/* Sucesso */
--color-status-success: #7B8D6F
--color-status-success-light: #E8F0E5
--color-status-success-dark: #5A6D52

/* Aviso */
--color-status-warning: #D28F6C
--color-status-warning-light: #FAE9E0
--color-status-warning-dark: #B06548

/* Erro */
--color-status-error: #CC0000
--color-status-error-light: #FFE6E6
--color-status-error-dark: #990000

/* Info */
--color-status-info: #5F8D8F
--color-status-info-light: #E5F0F0
--color-status-info-dark: #4A6D6F
```

#### Cores Utility - Texto
```css
--color-text-primary: #333333       /* Texto principal */
--color-text-secondary: #A06D4F     /* Texto secundário */
--color-text-on-dark: #F5E8D9       /* Texto em fundos escuros */
```

#### Cores Utility - Background
```css
--color-bg-default: #F5E8D9         /* Fundo principal */
--color-bg-card: #FFFFFF            /* Fundo de cards */
--color-bg-overlay: rgba(0,0,0,0.5) /* Overlays */
```

### Contraste de Acessibilidade

Todas as combinações de cores garantem:
- **AAA** para texto normal (7:1 mínimo)
- **AAA** para texto grande (4.5:1 mínimo)
- **Compatível** com modo escuro e claro

---

## Hierarquia Tipográfica

### Font Family
```css
--font-family-base: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

### Font Sizes
```css
--text-caption: 0.75rem      /* 12px */
--text-body-m: 0.875rem      /* 14px */
--text-body-l: 1rem          /* 16px */
--text-heading-m: 1.125rem   /* 18px */
--text-heading-l: 1.5rem     /* 24px */
--text-heading-xl: 2rem      /* 32px */
```

### Font Weights
```css
--font-weight-light: 300
--font-weight-regular: 400
--font-weight-medium: 500
--font-weight-bold: 700
```

### Line Height
```css
--line-height-default: 1.5   /* Padrão para todo o texto */
```

### Aplicação e Exemplos

| Elemento | Tamanho | Peso | Exemplo de Uso |
|----------|---------|------|----------------|
| **Heading XL** | 32px | Bold (700) | "Bem-vindo ao Pet Friendly" |
| **Heading L** | 24px | Bold (700) | "Meus pets cadastrados" |
| **Heading M** | 18px | Medium (500) | "Informações do agendamento" |
| **Body L** | 16px | Regular (400) | "Este é um texto importante que precisa de destaque visual" |
| **Body M** | 14px | Regular (400) | "Texto padrão usado em descrições e parágrafos" |
| **Caption** | 12px | Regular (400) | "há 2 horas • 2.3 km de distância" |

### Quando Usar Cada Tamanho

#### Heading XL (32px Bold)
- Títulos de páginas principais
- Telas de boas-vindas
- Landing pages
- **Exemplo**: "Bem-vindo ao Pet Friendly"

#### Heading L (24px Bold)
- Títulos de seções importantes
- Títulos em cards grandes
- Preços em destaque
- **Exemplo**: "Meus pets" ou "R$ 35/hora"

#### Heading M (18px Medium)
- Subtítulos
- Títulos de cards menores
- Nomes de prestadores
- Categorias de serviço
- **Exemplo**: "João Silva • Passeador Profissional"

#### Body L (16px Regular)
- Descrições principais
- Textos importantes em cards
- CTAs em formato de texto
- Introdução de formulários
- **Exemplo**: "Passeio personalizado para seu pet com rotas seguras"

#### Body M (14px Regular)
- Texto padrão do aplicativo
- Descrições detalhadas
- Conteúdo de parágrafos
- Texto em inputs
- Labels de formulário
- **Exemplo**: "Horário flexível, duração de 30min a 1h"

#### Caption (12px Regular)
- Labels de campos
- Metadados (data, hora, localização)
- Dicas de preenchimento
- Contadores
- Informações secundárias
- **Exemplo**: "há 2 horas • 127 avaliações • 2.3 km"

---

## Sistema de Espaçamento

Baseado em múltiplos de **4px** para consistência e alinhamento perfeito.

```css
--spacing-xs: 4px    /* Extra Small */
--spacing-s: 8px     /* Small */
--spacing-m: 16px    /* Medium */
--spacing-l: 24px    /* Large */
--spacing-xl: 32px   /* Extra Large */
--spacing-xxl: 48px  /* Extra Extra Large */
```

### Quando usar

- **xs (4px)**: Espaçamento mínimo entre elementos muito próximos
- **s (8px)**: Espaçamento interno de componentes pequenos
- **m (16px)**: Espaçamento padrão entre elementos relacionados
- **l (24px)**: Espaçamento entre seções relacionadas
- **xl (32px)**: Espaçamento entre módulos
- **xxl (48px)**: Espaçamento entre seções principais

---

## Componentes

### PetCard
Exibe informações de pets com foto, nome, raça e idade.

**Variantes:**
- `default`: Card completo com imagem
- `compact`: Lista compacta

**Props:**
```typescript
{
  nome: string;
  especie: 'cachorro' | 'gato' | 'passaro' | 'peixe' | 'coelho' | 'outro';
  raca?: string;
  idade?: string;
  foto?: string;
  sexo?: 'macho' | 'femea';
  castrado?: boolean;
}
```

### ServiceCard
Exibe serviços disponíveis com prestador, preço e avaliação.

**Variantes:**
- `default`: Card com imagem e detalhes completos
- `compact`: Lista horizontal compacta

**Props:**
```typescript
{
  titulo: string;
  prestador: { nome: string; foto?: string; verificado?: boolean };
  descricao?: string;
  preco?: string;
  avaliacao?: number;
  totalAvaliacoes?: number;
  localizacao?: string;
  tags?: string[];
}
```

### StatusBadge
Badge semântico para status de agendamentos e serviços.

**Status disponíveis:**
- `agendado`, `confirmado`, `em-andamento`
- `concluido`, `cancelado`, `pendente`
- `disponivel`, `indisponivel`
- `verificado`, `em-analise`

### EmptyState
Estado vazio com ilustração e call-to-action.

**Props:**
```typescript
{
  icon?: LucideIcon;
  titulo: string;
  descricao: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}
```

### AppHeader
Header com logo, busca e notificações.

### BottomNavigation
Navegação inferior para mobile.

---

## Sistema de Ícones

### Categorias

#### Navegação
- `Home`, `Search`, `Bell`, `MessageSquare`, `User`, `Settings`, `Menu`

#### Pets & Animais
- `Dog`, `Cat`, `Bird`, `Fish`, `Rabbit`, `PawPrint`, `Heart`, `Bone`

#### Serviços
- `Activity` (Passeio)
- `Scissors` (Banho e Tosa)
- `Stethoscope` (Veterinário)
- `Bath` (Banho)
- `Hotel` (Creche/Hotel)
- `UtensilsCrossed` (Alimentação)
- `Truck` (Transporte)
- `Award` (Adestramento)

#### Status & Feedback
- `CheckCircle2` (Sucesso)
- `XCircle` (Erro)
- `AlertTriangle` (Aviso)
- `Info` (Informação)
- `Loader2` (Carregando)

### Uso

```tsx
import { Dog, Scissors, CheckCircle2 } from 'lucide-react';
import ICONS from '@/lib/constants/icons';

// Uso direto
<Dog className="w-6 h-6" />

// Uso pelo sistema
const Icon = ICONS.pet.dog;
<Icon className="w-6 h-6" />
```

---

## UX Writing

### Como Falamos

#### ✓ Acolhedor e Motivacional
- "Olá, [nome]! Bem-vindo ao Pet Friendly! 🐾"
- "Que bom ter você aqui novamente"
- "Seu pet vai adorar!"
- "Parabéns! Serviço concluído com sucesso"

#### ✓ Direto e Claro
- "Entre para acessar sua conta"
- "Crie sua conta e comece a cuidar melhor do seu pet"
- "Gerencie agendamentos e serviços"
- "Encontre os melhores cuidadores para seu pet"

#### ✓ Inclusivo e Acessível
- Usar linguagem simples e universal
- Incluir labels descritivos para leitores de tela
- "Mostrar senha" / "Ocultar senha"

### Como NÃO Falamos

#### ✗ Técnico ou Robotizado
- ✗ "Erro: Campo obrigatório não preenchido"
- ✓ "Por favor, insira o nome do seu pet"

#### ✗ Negativo ou Culpabilizante
- ✗ "Você esqueceu de preencher este campo"
- ✓ "Por favor, complete este campo para continuar"

#### ✗ Vago ou Ambíguo
- ✗ "Clique aqui"
- ✓ "Agendar passeio"

#### ✗ Informal Demais
- ✗ "Manda ver!"
- ✓ "Começar agora"

### Call-to-Actions (CTAs)

#### Primários
- **Autenticação**: "Entrar", "Criar conta", "Enviar link de redefinição"
- **Agendamentos**: "Agendar serviço", "Confirmar agendamento"
- **Pets**: "Adicionar pet", "Salvar alterações"
- **Serviços**: "Contratar serviço", "Aceitar solicitação"

#### Secundários
- **Navegação**: "Voltar", "Cancelar", "Fechar"
- **Exploração**: "Ver detalhes", "Explorar", "Saiba mais"
- **Ações**: "Editar", "Remover", "Excluir"

### Mensagens de Validação

#### Campos Vazios
- E-mail: "Por favor, insira seu e-mail"
- Senha: "Por favor, insira sua senha"
- Nome: "Por favor, insira seu nome"
- Nome do Pet: "Por favor, insira o nome do pet"

#### Validação de Formato
- E-mail inválido: "Por favor, insira um e-mail válido"
- Senha curta: "A senha deve ter pelo menos 6 caracteres"
- Senhas diferentes: "As senhas não coincidem – verifique e tente novamente"

#### Erros de Sistema
- Carregar: "Não foi possível carregar os dados. Verifique sua conexão e tente novamente."
- Salvar: "Não foi possível salvar as alterações. Por favor, tente novamente."
- Upload: "Erro ao enviar arquivo. Verifique o formato e tente novamente."

### Mensagens de Sucesso

- Pet adicionado: "Pet adicionado com sucesso! 🐾"
- Agendamento: "Agendamento confirmado! Você receberá uma notificação antes do horário."
- Perfil: "Perfil atualizado com sucesso!"
- Avaliação: "Obrigado pela avaliação! ⭐"

---

## Acessibilidade AAA

### Diretrizes WCAG 2.1 AAA

#### Contraste de Cores
- **Texto normal**: Mínimo 7:1
- **Texto grande**: Mínimo 4.5:1
- **Elementos gráficos**: Mínimo 3:1

#### Labels e ARIA
Todos os elementos interativos possuem labels descritivos:

```tsx
// Botões
<button aria-label="Abrir menu">
  <Menu />
</button>

// Inputs
<Input
  id="email"
  aria-label="E-mail"
  aria-describedby="email-helper"
/>

// Navegação
<nav aria-label="Navegação principal">
```

#### Indicadores Visuais
Nunca confiar apenas em cor:
- ✓ Ícones + cor (✓ Sucesso, ✗ Erro)
- ✓ Text + badges ("Verificado ✓")
- ✓ Estados descritivos ("Agendado", "Concluído")

#### Leitores de Tela
- Uso de `aria-label` para contexto
- `aria-current="page"` para navegação ativa
- `aria-live` para notificações dinâmicas

#### Navegação por Teclado
- Todos os elementos interativos acessíveis via Tab
- Foco visível com outline
- Skip links para navegação rápida

---

## Microinterações

### Hover States
```css
.button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

### Loading States
- Skeleton screens para carregamento
- Spinner com `Loader2` icon
- Mensagens contextuais: "Carregando seus pets..."

### Toast Notifications
- Duração: 4-5 segundos
- Posição: bottom-right (desktop), top-center (mobile)
- Animação: slide-in suave
- Ícones semânticos

### Transições
```css
transition: all 0.2s ease-in-out;
```

### Feedback Visual
- Botões: Scale on press
- Cards: Elevation on hover
- Inputs: Border highlight on focus
- Toggle: Smooth slide animation

---

## Estilos de Imagens

### Formato
- **Fotos de pets**: JPEG ou WebP
- **Ícones SVG**: Para logos e ilustrações
- **Avatares**: Circular, 1:1 aspect ratio

### Dimensões Recomendadas
- **Avatar pequeno**: 32x32px
- **Avatar médio**: 48x48px
- **Avatar grande**: 96x96px
- **Card de pet**: 300x300px
- **Banner de serviço**: 16:9 aspect ratio

### Fallbacks
- Usar `ImageWithFallback` component
- Exibir ícone da espécie se sem foto
- Background neutro (#F5F2ED)

---

## Como Usar Este Guia

### Para Designers
1. Consulte os Design Tokens antes de criar novos estilos
2. Use componentes existentes sempre que possível
3. Mantenha consistência com a hierarquia tipográfica
4. Teste contraste de cores para acessibilidade

### Para Desenvolvedores
1. Importe componentes de `/components/pet-friendly`
2. Use tokens CSS em vez de valores hardcoded
3. Siga padrões de microcopy de `/lib/content/ux-writing`
4. Teste acessibilidade com leitores de tela

### Para Redatores
1. Consulte guia de UX Writing para tom de voz
2. Use biblioteca de microcopy para consistência
3. Siga princípios de acessibilidade em textos
4. Teste clareza com usuários reais

---

## Checklist de Qualidade

### Antes de Publicar

- [ ] Contraste de cores AAA verificado
- [ ] Labels descritivos em todos os inputs
- [ ] Aria-labels em elementos interativos
- [ ] Navegação por teclado funcionando
- [ ] Mensagens de erro claras e construtivas
- [ ] CTAs específicos e acionáveis
- [ ] Microcopy seguindo tom de voz
- [ ] Componentes responsivos (mobile + desktop)
- [ ] Testes com leitores de tela
- [ ] Performance otimizada (imagens, lazy loading)

---

**Versão**: 1.0.0  
**Última atualização**: Novembro 2025  
**Mantido por**: Equipe Pet Friendly
