// src/core/whatsapp-integration/whatsappClient.ts
import { Client, LocalAuth, Message } from 'whatsapp-web.js';

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "linguaverse" }),
  puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

// Log QR code para autenticação
client.on('qr', (qr) => {
  console.log('\n====================');
  console.log('🔗 Escaneie este QR Code no WhatsApp para conectar:');
  console.log(qr);
  console.log('====================\n');
});

// Log de pronto
client.on('ready', () => {
  console.log('✅ WhatsApp Client conectado e pronto para uso!');
});

// Log de desconexão
client.on('disconnected', (reason) => {
  console.error('❌ WhatsApp Client desconectado:', reason);
});

// Log de mensagens recebidas
client.on('message', async (message: Message) => {
  console.log(`📩 Mensagem recebida de ${message.from}: ${message.body}`);

  // Exemplo de resposta automática (pode evoluir para IA)
  if (message.body.toLowerCase() === 'oi' || message.body.toLowerCase() === 'olá') {
    await message.reply('Olá! 👋 Eu sou o LinguaVerse, seu assistente de idiomas. Como posso ajudar você hoje?');
  }
});

client.initialize();

export default client;