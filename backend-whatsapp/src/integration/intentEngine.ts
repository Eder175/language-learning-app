export function detectIntent(text: string): string {
  const t = text.trim().toLowerCase();
  if (['oi', 'olá', 'hello', 'hi'].includes(t)) return 'saudacao';
  if (t.startsWith('traduzir ')) return 'traducao';
  if (t.includes('desafio')) return 'desafio';
  if (t.includes('motiva')) return 'motivacao';
  if (t.includes('ajuda')) return 'ajuda';
  // ...adicione mais intents
  return 'desconhecido';
}

export async function processIntent(intent: string, text: string, user: any): Promise<string | null> {
  switch (intent) {
    case 'saudacao':
      return `Olá, ${user.name || 'amigo'}! 👋 Pronto para mais um desafio de idiomas?`;
    case 'traducao':
      const palavra = text.replace('traduzir ', '');
      // Chame sua API de tradução aqui
      return `Tradução de "${palavra}": (tradução aqui)`;
    case 'desafio':
      // Gere um desafio personalizado
      return `Desafio do dia: Traduza para inglês — "Eu acredito no impossível!"`;
    case 'motivacao':
      return `Você é incrível, ${user.name || 'amigo'}! Continue avançando, seu futuro bilíngue agradece! 🚀`;
    case 'ajuda':
      return `Comandos: "traduzir [palavra]", "desafio", "motiva", "ajuda". E pode conversar comigo sobre qualquer coisa!`;
    default:
      return null; // Deixa para a IA responder
  }
}