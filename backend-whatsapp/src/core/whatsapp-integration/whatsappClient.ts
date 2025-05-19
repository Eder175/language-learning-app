import { Client, LocalAuth, Message } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { getUser, saveUserProgress, updateUserPoints } from '../services/user.service'; // Implemente esses métodos!
import { detectIntent, processIntent } from './intentEngine'; // Engine de intenção
import { generateAIResponse } from './aiEngine'; // Integração com IA

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "linguaverse" }),
  puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

client.on('qr', (qr) => {
  console.log('\n====================');
  console.log('🔗 Escaneie este QR Code no WhatsApp para conectar:');
  qrcode.generate(qr, { small: true });
  console.log('====================\n');
});

client.on('ready', () => {
  console.log('✅ LinguaVerse conectado e pronto para revolucionar o aprendizado!');
});

client.on('message', async (message: Message) => {
  const userId = message.from;
  const user = await getUser(userId) || { id: userId, name: '', points: 0, level: 1, streak: 0 };

  // Detecta intenção do usuário
  const intent = detectIntent(message.body);

  // Processa intenção (tradução, desafio, motivação, etc)
  const response = await processIntent(intent, message.body, user);

  // Se não for intenção conhecida, chama IA
  let finalResponse = response;
  if (!response) {
    finalResponse = await generateAIResponse(message.body, user);
  }

  // Atualiza pontos, progresso, etc
  await updateUserPoints(userId, intent);

  // Responde ao usuário
  await message.reply(finalResponse);

  // Exemplo: envia áudio motivacional se o usuário acertar um desafio
  if (intent === 'desafio_acertou') {
    // await message.reply('audio.mp3'); // Implemente envio de áudio
  }
});

client.on('disconnected', (reason) => {
  console.error('❌ LinguaVerse desconectado:', reason);
});

client.initialize();

export default client;