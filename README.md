🚀 Dashboard Inteligente 

![Descrição da Imagem](frontend/src/assets/dashboard.png)


Status: Em Desenvolvimento Ativo ⚠️
Um dashboard analítico com IA para gestão de vendas e insights inteligentes.

📋 Sobre o Projeto

Dashboard moderno desenvolvido com React + Node.js + Firebase que utiliza IA generativa para analisar dados de vendas e fornecer insights estratégicos em tempo real.

🛠️ Stack Tecnológica
Frontend: React, Vite, Chart.js, Axios

Backend: Node.js, Express, Firebase Firestore

IA: Groq API + Llama 3 (OpenAI compatible)

Deploy: Em desenvolvimento

✅ Funcionalidades Implementadas

CRUD completo de vendas

Gráficos interativos com Chart.js

Integração em tempo real com Firebase Firestore

Geração de insights com IA (Groq/Llama 3)

API RESTful com Express.js

Interface responsiva

🚧 Funcionalidades em Desenvolvimento

Sistema de autenticação de usuários

Dashboard responsivo para mobile

Exportação de relatórios em PDF

Filtros avançados por período

Integração com n8n para automações

Testes unitários e e2e

🎯 Pré-requisitos

Node.js 18+

npm ou yarn

Conta no Firebase

Chave de API Groq ou OpenAI

⚡ Como Executar

1. Clone o repositório
bash
git clone https://github.com/paulojrtoledo/dashboard-inteligente.git
cd dashboard-inteligente
2. Configure o Backend
bash
cd backend
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas chaves API
3. Configure o Frontend
bash
cd ../frontend
npm install
4. Execute a Aplicação
bash
# Terminal 1 - Backend (http://localhost:5000)
cd backend && npm run dev

# Terminal 2 - Frontend (http://localhost:5173)  
cd frontend && npm run dev
🔧 Configuração de Ambiente
Crie um arquivo .env na pasta backend/:

env
PORT=5000
GROQ_API_KEY=sua_chave_groq_aqui
# ou
OPENAI_API_KEY=sua_chave_openai_aqui

# Firebase
FIREBASE_PROJECT_ID=seu-project-id
📦 Estrutura do Projeto

text
dashboard-inteligente/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── features/
    │   │   └── dashboard/
    │   ├── components/
    │   └── App.jsx
    └── package.json
🤝 Como Contribuir

Este é um projeto em desenvolvimento ativo! Contribuições são bem-vindas:

Fork o projeto

Crie uma branch: git checkout -b feature/nova-funcionalidade

Commit suas mudanças: git commit -m 'feat: adiciona nova funcionalidade'

Push para a branch: git push origin feature/nova-funcionalidade

Abra um Pull Request

📝 Próximos Passos do Desenvolvimento
Implementar sistema de autenticação

Adicionar testes unitários

Criar pipeline de CI/CD

Otimizar performance do dashboard

Adicionar dark mode

⚠️ Limitações Atuais

Interface ainda não otimizada para mobile

Ausência de sistema de cache

Limitações na gestão de erro

Documentação em progresso

📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

👨‍💻 Desenvolvedor

Seu Nome - GitHub | LinkedIn

Nota: Este é um projeto em desenvolvimento ativo. Novas funcionalidades são adicionadas regularmente. ⚡
