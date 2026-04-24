const TelegramBot = require("node-telegram-bot-api");

// === CONFIGURAÇÕES (Preencha aqui) ===
const TELEGRAM_TOKEN = "8637646594:AAHeS2vX1zp8CwxfBT7yEGzz4h5xoberMV8";
const OPENCLAW_URL = "http://192.168.2.200:8080/v1/chat/completions";
const MODEL_NAME = "mistral"; // Nome do modelo configurado no seu OpenClaw
const WEBHOOK_URL = "http://localhost:3000/api/webhook"; // Sua API local
const OPENCLAW_API_KEY = "a234983acc535122c1d4a9885361d715b5dd5bcb0aa5818c";
// =====================================

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// O Prompt estrito para garantir que a IA retorne apenas JSON
const SYSTEM_PROMPT = `
Você é um extrator de dados agrícolas.
Extraia da mensagem: produto, quantidade (apenas o número), unidade_medida, lavoura e atividade.
Retorne APENAS um objeto JSON válido e absolutamente NADA mais. Sem crases (\`), sem formatação markdown.
Exemplo: {"atividade": "Aplicação", "produto": "Ureia", "quantidade": 120, "unidade_medida": "kg", "lavoura": "Milho"}
`;

console.log("🤖 Bot do Telegram iniciado. Aguardando mensagens...");

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const textoUsuario = msg.text;

  if (!textoUsuario) return;

  // Feedback visual rápido no Telegram
  bot.sendMessage(chatId, "⏳ Processando dados no servidor...");

  try {
    console.log(`Mensagem recebida: "${textoUsuario}"`);

    // 1. Enviar para o OpenClaw (Linux)
    // 1. Enviar para o OpenClaw (Linux)
    const openclawResponse = await fetch(OPENCLAW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer a234983acc535122c1d4a9885361d715b5dd5bcb0aa5818c`,
      },
      body: JSON.stringify({
        // AJUSTE: Usando o alias exato que vimos no seu openclaw.json
        model: "openclaw",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: textoUsuario },
        ],
        temperature: 0.1,
      }),
    });

    const openclawData = await openclawResponse.json();

    // LOG DE DEBUG: Isso vai mostrar no seu terminal o que a IA respondeu de verdade
    console.log(
      "Resposta bruta do OpenClaw:",
      JSON.stringify(openclawData, null, 2),
    );

    if (!openclawData.choices || openclawData.choices.length === 0) {
      throw new Error(
        "A IA não retornou uma resposta válida. Verifique o log acima.",
      );
    }

    let respostaIA = openclawData.choices[0].message.content.trim();

    // Limpeza de segurança (Remove crases de markdown caso a IA tente formatar o JSON)
    respostaIA = respostaIA
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("JSON extraído pela IA:", respostaIA);

    // Transforma a string de texto em um objeto JavaScript
    const dadosEstruturados = JSON.parse(respostaIA);

    // 2. Enviar o JSON para a sua API local (server.js)
    const apiResponse = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosEstruturados),
    });

    if (apiResponse.ok) {
      // Sucesso!
      bot.sendMessage(chatId, "✅ Dados registrados com sucesso no painel!");
      console.log("Dados enviados para o painel!");
    } else {
      bot.sendMessage(chatId, "❌ Erro ao salvar no painel interno.");
    }
  } catch (error) {
    console.error("Erro no fluxo:", error);
    bot.sendMessage(
      chatId,
      "⚠️ Ocorreu um erro ao processar sua mensagem. Verifique os logs.",
    );
  }
});
