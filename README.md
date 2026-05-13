# 🦟 Dengue AI Frontend

Front-end do sistema inteligente de identificação de focos de dengue por imagens utilizando Inteligência Artificial.

---

# 📌 Sobre o Projeto

O projeto tem como objetivo auxiliar no combate à dengue através de uma aplicação capaz de:

- Receber imagens enviadas por usuários
- Identificar possíveis focos de risco
- Exibir resultados da análise da IA
- Manter histórico de análises
- Facilitar futuras integrações com órgãos públicos

O sistema está sendo desenvolvido como projeto acadêmico da disciplina:

## Faculdade Senac
Curso: Análise e Desenvolvimento de Sistemas  
Disciplina: Eletiva III — Inteligência Artificial

---

# 👥 Integrantes

- Gabriel Ernandes
- Thayza Vitória
- Raissa Vitória
- Fabricio Estevam
- Pedro Victor

---

# 🚀 Tecnologias Utilizadas

## Front-end

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- Zustand
- React Hook Form
- Zod
- Lucide React
- Sonner

---

# 📁 Estrutura do Projeto

```bash
src/
│
├── app/
├── components/
├── services/
├── hooks/
├── store/
├── utils/
├── types/
├── constants/
├── styles/
├── lib/
└── mocks/
```

---

# 🛠️ Setup do Projeto

## 1. Clonar repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2. Entrar na pasta

```bash
cd dengue-ai-frontend
```

---

## 3. Instalar dependências

```bash
npm install
```

---

## 4. Rodar projeto

```bash
npm run dev
```

---

## 5. Abrir no navegador

```bash
http://localhost:3000
```

---

# ⚙️ Variáveis de Ambiente

Criar arquivo:

```bash
.env.local
```

Exemplo:

```env
NEXT_PUBLIC_API_URL=
```

---

# 📌 Estrutura das Rotas

## Rotas Públicas

| Rota | Descrição |
|---|---|
| / | Landing Page |
| /login | Login |
| /cadastro | Cadastro |

---

## Rotas Privadas

| Rota | Descrição |
|---|---|
| /home | Página inicial |
| /nova-analise | Nova análise |
| /resultado | Resultado da análise |
| /historico | Histórico |
| /analise/[id] | Detalhes da análise |

---

# ⚠️ Integrações e Rotas da API

As rotas oficiais da API e os contratos do Back-end ainda estão em definição.

As informações deste tópico serão atualizadas conforme a integração entre Front-end e Back-end for concluída.

---

# 🧱 Componentização

O projeto segue arquitetura baseada em componentes reutilizáveis.

## Estrutura

```bash
components/
├── ui/
├── forms/
├── layout/
├── cards/
├── feedback/
└── maps/
```

---

# 📱 Responsividade

O sistema está sendo desenvolvido utilizando abordagem:

- Mobile First
- Responsivo para:
  - Smartphones
  - Tablets
  - Desktop

---

# 🔄 Fluxo da Aplicação

```bash
Usuário envia imagem
↓
Front-end envia para API
↓
IA processa imagem
↓
Resultado retorna
↓
Sistema exibe análise
```

---

# 📦 Dependências Principais

```bash
npm install axios zustand zod react-hook-form @hookform/resolvers clsx tailwind-merge lucide-react sonner
```

---

# 🧹 Padronização de Código

## Convenções

### Componentes

```bash
PascalCase
```

Exemplo:

```bash
UploadCard.tsx
```

---

### Hooks

```bash
camelCase iniciado com use
```

Exemplo:

```bash
useUpload.ts
```

---

### Services

```bash
analysis.service.ts
```

---

# 📌 Funcionalidades Planejadas

- Login
- Cadastro
- Upload de imagens
- Resultado da análise
- Histórico
- Geolocalização
- Mapa de focos
- Download de relatório
- Integração com IA

---

# 📈 Próximos Passos

## Front-end

- Finalizar layout
- Criar componentes reutilizáveis
- Desenvolver páginas
- Implementar responsividade
- Preparar integração com API

---

## Back-end

- Disponibilizar endpoints
- Sistema de autenticação
- Upload de imagens
- Integração com IA
- Banco de dados

---

# 🌐 Deploy

## Front-end

Vercel

---

## Back-end

Render

---

# 📄 Licença

Projeto acadêmico desenvolvido para fins educacionais.

---

# ✅ Objetivo Final

Construir uma plataforma inteligente capaz de auxiliar no combate à dengue através da identificação automática de possíveis focos utilizando Inteligência Artificial e visão computacional.