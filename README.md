# 🦟 BioLens front-end

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
│   ├── analysis/
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── analysis-details/
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── history/
│   │   └── page.tsx
│   │
│   ├── new-analysis/
│   │   └── page.tsx
│   │
│   ├── processing/
│   │   └── page.tsx
│   │
│   ├── profile/
│   │   └── page.tsx
│   │
│   ├── sign-in/
│   │   └── page.tsx
│   │
│   ├── sign-up/
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── forms/
│   ├── layout/
│   ├── cards/
│   ├── loading/
│   └── sidebar/
│
├── services/
├── hooks/
├── store/
├── types/
├── lib/
├── config/
└── middleware.ts
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

# 🌐 Rotas Front-end

## Link com as rotas: 
https://api-classificador-img.onrender.com/apidocs/


---

## Rotas Privadas

| Rota | Descrição |
|---|---|
| `/dashboard` | Página inicial |
| `/new-analysis` | Nova análise |
| `/processing` | Tela de processamento |
| `/history` | Histórico |
| `/profile` | Perfil do usuário |
| `/analysis/[id]` | Resultado da análise |
| `/analysis-details/[id]` | Detalhes completos da análise |

---

# 🔌 Rotas da API

## 🔐 Auth

Rotas responsáveis pela autenticação do usuário.

| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/login` | Realizar login |
| POST | `/auth/register` | Criar conta |
| POST | `/auth/logout` | Logout do usuário |

---

# 👤 User

Rotas relacionadas ao perfil do usuário.

| Método | Rota | Descrição |
|---|---|---|
| GET | `/user/perfil` | Buscar perfil do usuário |
| PUT | `/user/perfil` | Atualizar perfil do usuário |
| DELETE | `/user/perfil` | Excluir conta do usuário |

---

# 🧪 Analysis

Rotas responsáveis pelas análises realizadas pelo sistema.

| Método | Rota | Descrição |
|---|---|---|
| POST | `/analysis` | Criar nova análise |
| GET | `/analysis/history` | Histórico de análises |
| GET | `/analysis/{id}` | Buscar detalhes da análise |
| DELETE | `/analysis/{id}` | Excluir análise |
| GET | `/analysis/download/{id}` | Download do PDF da análise |

---

# 📥 Parameters

## `/analysis/{id}`

### Exemplo

```http
GET /analysis/1
```

### Parameters

| Nome | Tipo | Descrição |
|---|---|---|
| id | number | ID da análise |

---

## `/analysis/download/{id}`

### Exemplo

```http
GET /analysis/download/1
```

### Parameters

| Nome | Tipo | Descrição |
|---|---|---|
| id | number | ID da análise para download |

---

# 🔐 Header de Autenticação

```http
Authorization: Bearer TOKEN_JWT
```

---

# 📦 Exemplo de Request

## Criar análise

```http
POST /analysis
```

### Body

```json
{
  "image": "file.jpg"
}
```

---

# 📤 Exemplo de Response

```json
{
  "id": 1,
  "status": "completed",
  "risk": "high",
  "created_at": "2026-05-22"
}
```

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
├── loading/
└── sidebar/
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
- Download PDF
- Perfil usuário
- Integração com IA
- Dashboard
- Responsividade

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

# 🔒 Autenticação

O sistema utilizará:

- JWT
- Middleware Next.js
- Persistência de token
- Rotas protegidas

---

# 📄 Licença

Projeto acadêmico desenvolvido para fins educacionais.

---

# ✅ Objetivo Final

Construir uma plataforma inteligente capaz de auxiliar no combate à dengue através da identificação automática de possíveis focos utilizando Inteligência Artificial e visão computacional.
