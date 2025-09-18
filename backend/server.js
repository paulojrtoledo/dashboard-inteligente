// 1️⃣ Importações
import express from "express";
import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from "fs";
import Groq from "groq-sdk";
import cors from 'cors';

// 2️⃣ Configurar variáveis de ambiente
dotenv.config();

// 3️⃣ Inicializar o Express
const app = express();
const PORT = process.env.PORT || 5000;

// 4️⃣ Middleware para JSON
app.use(express.json());

// backend/server.js

// Configuração do CORS - DEVE VIR ANTES DAS ROTAS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'] // ✅ ADICIONE DELETE E OPTIONS
}));

// Headers personalizados - TAMBÉM DEVE VIR ANTES DAS ROTAS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS'); // ✅ ADICIONE DELETE
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// 5️⃣ Inicializar Firebase / Firestore
const serviceAccount = JSON.parse(
  fs.readFileSync("./config/firebaseKey.json", "utf8")
);

// Configurar GroqAI/Llama 3
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // coloque sua chave no .env
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 6️⃣ Rotas

// Rota teste
app.get("/", (req, res) => {
  res.send("Backend com Firestore funcionando!");
});

// Rota para buscar todas as vendas
app.get("/vendas", async (req, res) => {
  try {
    const snapshot = await db.collection("vendas").get();
    const vendas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(vendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para adicionar uma nova venda (simulando um ERP)
app.post("/vendas", async (req, res) => {
  // Os dados que esperamos receber do frontend
  const { produto, valor, quantidade, cliente, regiao, vendedor } = req.body;

  // Validação básica
  if (!produto || !valor || !cliente) {
    return res.status(400).json({ error: "Campos 'produto', 'valor' e 'cliente' são obrigatórios." });
  }

  try {
    const docRef = await db.collection("vendas").add({
      produto,
      valor: Number(valor), // Garante que é um número
      quantidade: Number(quantidade) || 1,
      cliente,
      regiao: regiao || "N/A",
      vendedor: vendedor || "N/A",
      data: new Date().toISOString() // Adiciona a data/hora automaticamente
    });

    res.status(201).json({
      message: "Venda registrada com sucesso!",
      id: docRef.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Rota para gerar insights com IA
app.get("/insights", async (req, res) => {
  try {
    const vendasSnapshot = await db.collection("vendas").get();
    const vendas = vendasSnapshot.docs.map(doc => doc.data());

    if (vendas.length === 0) {
      return res.json({ insights: "Não há dados de vendas para analisar." });
    }

    const totalVendas = vendas.reduce((sum, venda) => sum + (venda.valor * (venda.quantidade || 1)), 0);
    const resumoVendas = `Dados de Vendas para Análise (${vendas.length} transações): Valor Total: R$ ${totalVendas} | Produtos: ${vendas.map(v => v.produto).join(', ')} | Clientes: ${[...new Set(vendas.map(v => v.cliente))].join(', ')} | Regiões: ${[...new Set(vendas.map(v => v.regiao))].join(', ')} | Vendedores: ${[...new Set(vendas.map(v => v.vendedor))].join(', ')}`;

    const prompt = `Você é um analista de negócios especialista em ERP. Analise os dados de vendas e gere 3 insights estratégicos curtos e uma recomendação principal. Responda em português claro e direto. Dados: ${resumoVendas}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const insightGerado = completion.choices[0].message.content;

    // ✅ SALVANDO NO FIRESTORE
    const insightRef = await db.collection("insights").add({
      conteudo: insightGerado,
      modelo: "Llama 3.3 70B (Groq)",
      data: new Date().toISOString(),
      totalVendas: totalVendas,
      quantidadeTransacoes: vendas.length
    });

    console.log("📝 Insight salvo no Firestore com ID:", insightRef.id);

    res.json({ 
      insights: insightGerado,
      modelo: "Llama 3.3 70B (Groq)",
      idInsight: insightRef.id
    });

  } catch (error) {
    console.error("Erro ao gerar insight:", error);
    res.status(500).json({ error: "Falha ao gerar insights com IA." });
  }
});

// Para deletar vendas
app.delete("/vendas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("vendas").doc(id).delete();
    res.json({ message: "Venda deletada com sucesso", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7️⃣ Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
