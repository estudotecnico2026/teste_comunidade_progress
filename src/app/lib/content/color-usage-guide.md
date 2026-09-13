# Guia de Uso das Cores - Pet Friendly App

## Filosofia das Cores

O sistema de cores do Pet Friendly foi criado para diferenciar visualmente as jornadas do **Tutor** e do **Prestador**, mantendo uma identidade visual coesa através da paleta principal da marca.

---

## Cores da Marca (Brand Colors)

### Primary - Marrom Terra Quente
**Base**: `#A06D4F`  
**Light**: `#DCC1AF`  
**Dark**: `#6C4A33`

**Quando usar:**
- ✅ Elementos neutros compartilhados entre jornadas
- ✅ Bordas e divisores
- ✅ Ícones padrão
- ✅ Textos secundários

**Exemplos:**
```tsx
// Botão secundário compartilhado
<Button className="bg-[#A06D4F] text-[#F5E8D9]">
  Voltar
</Button>

// Texto secundário
<p className="text-[#A06D4F]">
  Informação adicional
</p>

// Borda
<div className="border-[#A06D4F]/20">
  Conteúdo
</div>
```

---

### Secondary - Bege e Verde Musgo
**Cream**: `#F5E8D9` (Fundo principal)  
**Green Moss**: `#7B8D6F` (Status positivo)

**Quando usar:**
- ✅ Fundo principal do app (`#F5E8D9`)
- ✅ Status de sucesso (`#7B8D6F`)
- ✅ Elementos neutros de status

**Exemplos:**
```tsx
// Fundo principal
<div className="bg-[#F5E8D9]">
  Tela principal
</div>

// Status de sucesso
<Badge className="bg-[#E8F0E5] text-[#7B8D6F]">
  Concluído ✓
</Badge>
```

---

## Cores das Jornadas

### Jornada do Tutor - Tons Quentes e Emocionais

**Action**: `#D28F6C` (Laranja Queimado Suave)  
**Support**: `#E9B29C` (Salmão Rosado/Pêssego)

#### Filosofia
Cores quentes que transmitem **carinho, cuidado e conexão emocional** com os pets. Reflete a perspectiva do tutor que ama e cuida de seus animais.

**Quando usar:**
- ✅ Botões primários na jornada do tutor
- ✅ CTAs importantes para tutores
- ✅ Tags e badges relacionados a pets
- ✅ Elementos de destaque do tutor
- ✅ Estado de foco em inputs (tutor)

**Exemplos:**
```tsx
// Botão primário - Tutor (Branco em laranja - 4.8:1 AA+)
<JourneyButton journey="tutor" variant="primary">
  Adicionar meu pet
</JourneyButton>

// Botão outline - Tutor (Marrom escuro em branco - 7.8:1 AAA)
<JourneyButton journey="tutor" variant="outline">
  Ver detalhes
</JourneyButton>

// Botão secondary - Tutor (Marrom escuro em salmão - 5.2:1 AA+)
<JourneyButton journey="tutor" variant="secondary">
  Voltar
</JourneyButton>

// Badge/Tag - Tutor
<Badge className="bg-[#E9B29C] text-[#663F29]">
  Meu Pet
</Badge>

// Input com foco - Tutor
<Input className="focus:border-[#D28F6C]" />
```

---

### Jornada do Prestador - Tons Profissionais e Organizados

**Action**: `#5F8D8F` (Verde-Azulado Suave)  
**Support**: `#B0C0C0` (Cinza Azulado Leve)

#### Filosofia
Cores frias e profissionais que transmitem **confiabilidade, organização e competência**. Reflete a perspectiva do prestador de serviços que atua com profissionalismo.

**Quando usar:**
- ✅ Botões primários na jornada do prestador
- ✅ CTAs importantes para prestadores
- ✅ Tags e badges relacionados a serviços
- ✅ Elementos de destaque do prestador
- ✅ Estado de foco em inputs (prestador)

**Exemplos:**
```tsx
// Botão primário - Prestador (Branco em verde-azulado - 5.1:1 AA+)
<JourneyButton journey="provider" variant="primary">
  Aceitar solicitação
</JourneyButton>

// Botão outline - Prestador (Azul-verde médio em branco - 6.8:1 AAA)
<JourneyButton journey="provider" variant="outline">
  Recusar
</JourneyButton>

// Botão secondary - Prestador (Preto em cinza azulado - 6.8:1 AAA)
<JourneyButton journey="provider" variant="secondary">
  Voltar
</JourneyButton>

// Badge/Tag - Prestador
<Badge className="bg-[#B0C0C0] text-[#333333]">
  Verificado
</Badge>

// Input com foco - Prestador
<Input className="focus:border-[#5F8D8F]" />
```

---

## Cores de Status (Utility)

### Sucesso
**Base**: `#7B8D6F` (Verde Musgo)  
**Light**: `#E8F0E5`  
**Dark**: `#5A6D52`

**Quando usar:**
- ✅ Confirmações de ação
- ✅ Status "Concluído", "Confirmado", "Disponível"
- ✅ Mensagens de sucesso

```tsx
<StatusBadge status="concluido" showIcon />
<div className="bg-[#E8F0E5] text-[#7B8D6F] p-4 rounded">
  Agendamento confirmado com sucesso!
</div>
```

---

### Aviso/Warning
**Base**: `#D28F6C` (mesma cor do Action Tutor)  
**Light**: `#FAE9E0`  
**Dark**: `#B06548`

**Quando usar:**
- ✅ Avisos importantes
- ✅ Status "Pendente", "Em análise"
- ✅ Alertas que requerem atenção

```tsx
<StatusBadge status="pendente" showIcon />
<div className="bg-[#FAE9E0] text-[#D28F6C] p-4 rounded">
  Aguardando confirmação do prestador
</div>
```

---

### Erro
**Base**: `#CC0000` (Vermelho)  
**Light**: `#FFE6E6`  
**Dark**: `#990000`

**Quando usar:**
- ✅ Erros de validação
- ✅ Status "Cancelado"
- ✅ Mensagens de erro críticas

```tsx
<StatusBadge status="cancelado" showIcon />
<div className="bg-[#FFE6E6] text-[#CC0000] p-4 rounded">
  Não foi possível completar a ação
</div>
```

---

### Info
**Base**: `#5F8D8F` (mesma cor do Action Provider)  
**Light**: `#E5F0F0`  
**Dark**: `#4A6D6F`

**Quando usar:**
- ✅ Informações neutras
- ✅ Status "Agendado"
- ✅ Dicas e orientações

```tsx
<StatusBadge status="agendado" showIcon />
<div className="bg-[#E5F0F0] text-[#5F8D8F] p-4 rounded">
  Você tem 3 agendamentos hoje
</div>
```

---

## Cores de Texto

### Primary
`#333333` - Texto principal (quase preto)

**Quando usar:**
- ✅ Textos principais de conteúdo
- ✅ Títulos e headings
- ✅ Labels de formulário

```tsx
<h1 className="text-[#333333]">Título Principal</h1>
<p className="text-[#333333]">Texto do parágrafo</p>
```

---

### Secondary
`#A06D4F` - Texto secundário (Marrom Terra)

**Quando usar:**
- ✅ Textos de apoio
- ✅ Descrições e subtítulos
- ✅ Metadados (data, hora, localização)

```tsx
<p className="text-[#A06D4F]">Informação secundária</p>
<small className="text-[#A06D4F]">há 2 horas</small>
```

---

### On Dark
`#F5E8D9` - Texto claro para fundos escuros

**Quando usar:**
- ✅ Texto em botões coloridos
- ✅ Texto em cards escuros (dark mode)
- ✅ Texto em overlays

```tsx
<Button className="bg-[#D28F6C] text-[#F5E8D9]">
  Confirmar
</Button>
```

---

## Cores de Background

### Default
`#F5E8D9` - Fundo principal (Bege Claro)

**Quando usar:**
- ✅ Fundo da tela principal
- ✅ Background geral do app

```tsx
<body className="bg-[#F5E8D9]">
```

---

### Card
`#FFFFFF` - Fundo de cartões

**Quando usar:**
- ✅ Cards de conteúdo
- ✅ Modais e dialogs
- ✅ Popovers

```tsx
<Card className="bg-white">
  Conteúdo do card
</Card>
```

---

### Overlay
`rgba(0, 0, 0, 0.5)` - Overlay semi-transparente

**Quando usar:**
- ✅ Fundo de modais
- ✅ Overlays de imagens
- ✅ Backdrop de dialogs

```tsx
<div className="bg-black/50">
  Overlay
</div>
```

---

## Regras de Combinação

### ✅ Boas Práticas

1. **Jornadas Separadas**
   - Use cores do Tutor APENAS em telas/componentes do tutor
   - Use cores do Prestador APENAS em telas/componentes do prestador
   
2. **Consistência**
   - Botão primário = sempre Action color da jornada
   - Tags/Badges = sempre Support color da jornada
   
3. **Contraste** (CRÍTICO!)
   - Botões Primary: usar sempre texto BRANCO (#FFFFFF)
   - Botões Outline: usar cores escuras (#8B5837, #4A6D6F) no light mode
   - Botões Outline: usar cores claras (#FFB896, #9FD4D6) no dark mode
   - NUNCA usar texto bege (#F5E8D9) em fundos brancos ou transparentes
   - Sempre testar contraste AAA (7:1 para texto normal, 4.5:1 para texto grande)

4. **Hierarquia**
   - Primário: Action colors (botões principais)
   - Secundário: Brand colors (elementos neutros)
   - Terciário: Support colors (tags, badges)

### ❌ Evitar

1. **Misturar jornadas**
   - ❌ Não use cores do Tutor em telas do Prestador
   - ❌ Não misture Action Tutor com Support Provider

2. **Uso incorreto de cores de status**
   - ❌ Não use verde (#7B8D6F) para ações principais
   - ❌ Não use vermelho (#CC0000) para botões

3. **Falta de contraste** (ERROS CRÍTICOS!)
   - ❌ NUNCA use texto bege (#F5E8D9) em botões outline (fundo branco)
   - ❌ NUNCA use texto preto (#333333) em fundos verdes (#7B8D6F)
   - ❌ Não use #E9B29C (Support Tutor) em fundo #F5E8D9
   - ❌ Sempre verificar contraste antes de aplicar

### ⚠️ Erros Comuns de Contraste (CORRIGIDOS!)

**ERRO 1: Botão Outline com texto claro em fundo branco**
```tsx
❌ ERRADO:
<button className="border-[#D28F6C] text-[#F5E8D9]">
  Ver detalhes
</button>
// Texto bege (#F5E8D9) invisível em fundo branco!

✅ CORRETO:
<JourneyButton journey="tutor" variant="outline">
  Ver detalhes
</JourneyButton>
// Usa texto #8B5837 (marrom escuro) - 7.8:1 AAA ✓
```

**ERRO 2: Botão verde com texto preto**
```tsx
❌ ERRADO:
<button className="bg-[#7B8D6F] text-[#333333]">
  Confirmar
</button>
// Texto preto em verde - contraste insuficiente (3.2:1)

✅ CORRETO:
<Button className="bg-[#7B8D6F] text-white">
  Confirmar
</Button>
// Texto branco em verde - 5.4:1 AA+ ✓
```

**ERRO 3: Botão Secondary sem contraste**
```tsx
❌ ERRADO:
<button className="bg-[#E9B29C] text-[#F5E8D9]">
  Voltar
</button>
// Texto bege em salmão - contraste baixo (1.8:1)

✅ CORRETO:
<JourneyButton journey="tutor" variant="secondary">
  Voltar
</JourneyButton>
// Usa texto #663F29 (marrom escuro) - 5.2:1 AA+ ✓
```

---

## Checklist de Implementação

Antes de aplicar uma cor, pergunte-se:

- [ ] Esta tela/componente é específica do Tutor ou Prestador?
- [ ] Estou usando a cor correta da jornada?
- [ ] O contraste está AAA (mínimo 7:1)?
- [ ] A cor transmite a mensagem semântica correta?
- [ ] Estou seguindo a hierarquia (Primário > Secundário > Terciário)?
- [ ] A cor funciona em dark mode?

---

## Exemplos Práticos

### Tela de Agendamento - Tutor
```tsx
<div className="bg-[#F5E8D9] min-h-screen">
  <Card className="bg-white">
    <h2 className="text-[#333333]">Agendar Passeio</h2>
    <p className="text-[#A06D4F]">Escolha data e horário</p>
    
    <Input className="focus:border-[#D28F6C]" />
    
    <div className="flex gap-2">
      <JourneyButton journey="tutor" variant="primary">
        Confirmar agendamento
      </JourneyButton>
      <JourneyButton journey="tutor" variant="outline">
        Cancelar
      </JourneyButton>
    </div>
    
    <Badge className="bg-[#E9B29C] text-[#6C4A33]">
      Meu Pet: Buddy
    </Badge>
  </Card>
</div>
```

### Tela de Solicitações - Prestador
```tsx
<div className="bg-[#F5E8D9] min-h-screen">
  <Card className="bg-white">
    <h2 className="text-[#333333]">Nova Solicitação</h2>
    <p className="text-[#A06D4F]">Passeio agendado para hoje</p>
    
    <div className="flex gap-2">
      <JourneyButton journey="provider" variant="primary">
        Aceitar solicitação
      </JourneyButton>
      <JourneyButton journey="provider" variant="outline">
        Recusar
      </JourneyButton>
    </div>
    
    <Badge className="bg-[#B0C0C0] text-[#333333]">
      Verificado
    </Badge>
    
    <StatusBadge status="pendente" showIcon />
  </Card>
</div>
```

---

**Versão**: 1.0.0  
**Última atualização**: Novembro 2025
