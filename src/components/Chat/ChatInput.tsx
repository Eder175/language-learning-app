import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onStartRecording: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onStartRecording }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 bg-white border-t">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Enviar
        </button>
        <button
          type="button"
          onClick={onStartRecording}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          🎤
        </button>
      </form>
    </div>
  );
};

export default ChatInput;