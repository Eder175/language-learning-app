// Tipagem para mensagens no chat
export type Sender = 'user' | 'bot';

export type MessageType = 'text' | 'option' | 'quiz' | 'audio';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  sender: Sender;
  timestamp: Date;
  options?: string[]; // Para mensagens com opções
  correctAnswer?: number; // Para quizzes
}

// Tipagem para uma lição
export interface Lesson {
  id: string;
  title: string;
  content: Message[];
  language: string;
}
