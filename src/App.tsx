import React from 'react';
import { useTranslation } from 'react-i18next';
import HomePage from './pages/HomePage';
import LessonContainer from './components/Lesson/LessonContainer';
import { Lesson, Message } from './types';

const sampleLesson: Lesson = {
  id: 'lesson-1',
  title: 'Introduction to Portuguese',
  language: 'pt-BR',
  content: [
    {
      id: 'msg-1',
      type: 'text',
      content: 'Olá! Vamos aprender algumas palavras básicas em português hoje.',
      sender: 'bot',
      timestamp: new Date(),
    },
    {
      id: 'msg-2',
      type: 'option',
      content: 'Escolha uma palavra para começar:',
      sender: 'bot',
      timestamp: new Date(),
      options: ['Olá', 'Tchau', 'Por favor'],
    },
    {
      id: 'msg-3',
      type: 'quiz',
      content: 'Qual é a tradução de "Hello" para o português?',
      sender: 'bot',
      timestamp: new Date(),
      options: ['Tchau', 'Olá', 'Adeus'],
      correctAnswer: 1,
    },
  ],
};

const App: React.FC = () => {
  const { t } = useTranslation();

  const handleLessonComplete = () => {
    alert('Lição concluída!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
          {t('welcome')}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
          {t('description')}
        </p>
        <HomePage />
        <div className="mt-8 w-full max-w-2xl h-[500px]">
          <LessonContainer lesson={sampleLesson} onComplete={handleLessonComplete} />
        </div>
      </header>
    </div>
  );
};

export default App;