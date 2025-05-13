import React, { useState, useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { Lesson, Message, Sender } from '../../types';
import ChatBubble from '../Chat/ChatBubble';
import ChatInput from '../Chat/ChatInput';

interface LessonContainerProps {
  lesson: Lesson;
  onComplete: () => void;
}

interface ChatState {
  messages: Message[];
  currentMessageIndex: number;
  isComplete: boolean;
}

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'ADD_MESSAGES'; payload: Message[] }
  | { type: 'INCREMENT_INDEX' }
  | { type: 'SET_COMPLETE' };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'ADD_MESSAGES':
      return { ...state, messages: [...state.messages, ...action.payload] };
    case 'INCREMENT_INDEX':
      return { ...state, currentMessageIndex: state.currentMessageIndex + 1 };
    case 'SET_COMPLETE':
      return { ...state, isComplete: true };
    default:
      return state;
  }
};

const LessonContainer: React.FC<LessonContainerProps> = ({ lesson, onComplete }) => {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(chatReducer, {
    messages: lesson.content.slice(0, 1),
    currentMessageIndex: 0,
    isComplete: false,
  });

  const { messages, currentMessageIndex, isComplete } = state;

  useEffect(() => {
      const timer = setTimeout(() => {
        dispatch({ type: 'INCREMENT_INDEX' });
        dispatch({
          type: 'ADD_MESSAGE',
          payload: lesson.content[currentMessageIndex + 1],
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, lesson.content, isComplete]);

  const addBotMessage = (content: string, delay: number = 1000) => {
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'text',
        content,
        sender: 'bot',
        timestamp: new Date(),
      };
      dispatch({ type: 'ADD_MESSAGE', payload: botMessage });
    }, delay);
  };

  const handleSendMessage = (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

    // Simular resposta do bot com base na mensagem do usuÃ¡rio
    const isCorrect = message.toLowerCase().includes('correct') || Math.random() > 0.3; // SimulaÃ§Ã£o simples
    const botResponse = isCorrect
      ? t('lesson.correctResponse')
      : t('lesson.incorrectResponse');
    addBotMessage(botResponse);

      addBotMessage(t('lesson.completionMessage'), 1500);
      setTimeout(() => {
        dispatch({ type: 'SET_COMPLETE' });
        onComplete();
      }, 3500);
    }
  };

  const handleOptionSelect = (option: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: option,
      sender: 'user',
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });

    addBotMessage(t('lesson.optionFeedback'));

      setTimeout(() => {
        dispatch({ type: 'INCREMENT_INDEX' });
        dispatch({
          type: 'ADD_MESSAGE',
          payload: lesson.content[currentMessageIndex + 1],
        });
      }, 1000);
    }
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    const currentMessage = lesson.content.find((msg) => msg.id === questionId);
    const isCorrect = currentMessage?.correctAnswer === answerIndex;

    const userAnswer: Message = {
      id: Date.now().toString(),
      type: 'text',
      content: `${t('lesson.selectedOption')} ${answerIndex + 1}`,
      sender: 'user',
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userAnswer });

    const feedback = isCorrect
      ? t('lesson.correctQuizResponse')
      : t('lesson.incorrectQuizResponse');
    addBotMessage(feedback);

      setTimeout(() => {
        dispatch({ type: 'INCREMENT_INDEX' });
        dispatch({
          type: 'ADD_MESSAGE',
          payload: lesson.content[currentMessageIndex + 1],
        });
      }, 1000);
    }
  };

  const handleStartRecording = () => {
    const userAudio: Message = {
      id: Date.now().toString(),
      type: 'audio',
      content: 'í¾¤ [Mensagem de Ã¡udio]',
      sender: 'user',
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: userAudio });

    addBotMessage(t('lesson.pronunciationFeedback'), 1500);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-gray-100">
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4"
        role="log"
        aria-live="polite"
      >
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`animate-slide-up flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <ChatBubble
              message={message}
              onOptionSelect={handleOptionSelect}
              onQuizAnswer={handleQuizAnswer}
            />
          </div>
        ))}
      </div>
      <ChatInput
        onSendMessage={handleSendMessage}
        onStartRecording={handleStartRecording}
      />
    </div>
  );
};

export default LessonContainer;
