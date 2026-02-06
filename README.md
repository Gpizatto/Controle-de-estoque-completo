Sistema de Controle de Bobinas – We Papel

Sistema full-stack para controle, rastreabilidade e gestão de bobinas de papel.
Permite cadastrar bobinas, registrar saídas e retornos, acompanhar histórico de movimentações e gerar códigos/QR Code, com interface web responsiva integrada a uma API REST.

Funcionalidades
Frontend

Cadastro e edição de bobinas

Visualização de estoque em tempo real

Registro de saída e retorno de material

Histórico completo de movimentações

Importação de dados via Excel

Geração de código único e QR Code

Impressão de etiquetas

Interface responsiva e intuitiva

Backend

API REST para gerenciamento de bobinas, folhas e movimentações

Persistência de dados em banco de dados

Controle de histórico e rastreabilidade

Endpoints organizados por recurso

🛠️ Tecnologias Utilizadas
Frontend

HTML5

CSS3

JavaScript (Vanilla JS)

QRCode.js

JsBarcode

XLSX.js

Backend

Node.js

Express

MongoDB

Mongoose

API hospedada na Render

🌐 Integração Frontend ↔ Backend

O frontend consome a API REST através de chamadas fetch, centralizadas na variável:

const API_BASE_URL = "https://bobinas.onrender.com";

📂 Estrutura do Projeto
/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── server.js
│   └── package.json
│
└── README.md

▶️ Como Executar o Projeto
Backend
cd backend
npm install
npm start


O backend será iniciado, por padrão, na porta configurada no projeto ou nas variáveis de ambiente.

Frontend

Abra o arquivo:

frontend/index.html


diretamente no navegador ou sirva com um servidor local simples.

📌 Observações

Projeto preparado para deploy em produção

Arquitetura simples e escalável

Fácil adaptação para outros tipos de controle de estoque
