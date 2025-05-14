import React from 'react';
import { Message } from '../../types';

interface ChatBubbleProps {
  message: Message;
  onOptionSelect?: (option: string) => void;
  onQuizAnswer?: (questionId: string, answerIndex: number) => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onOptionSelect, onQuizAnswer }) => {
  return (
    <div
      className={`p-3 rounded-lg mb-2 max-w-xs ${
        message.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start'
      }`}
    >
      {message.type === 'text' && <p>{message.content}</p>}
      {message.type === 'option' && message.options && onOptionSelect && (
        <div className="flex flex-col gap-2">
          {message.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onOptionSelect(option)}
              className="p-2 bg-blue-100 rounded hover:bg-blue-200"
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {message.type === 'quiz' && message.options && onQuizAnswer && (
        <div className="flex flex-col gap-2">
          {message.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onQuizAnswer(message.id, index)}
              className="p-2 bg-green-100 rounded hover:bg-green-200"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;