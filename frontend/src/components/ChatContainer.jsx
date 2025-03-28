import React from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../api/messagesApi';
import { selectCurrentChannelId } from '../store/slice/appSlice';
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';

const ChatContainer = () => {
  const { data: messages = [], isLoading } = useGetMessagesQuery();
  const currentChannelId = useSelector(selectCurrentChannelId);
  
  // Фильтрация сообщений (только для загруженных данных)
  const filteredMessages = isLoading ? [] : messages.filter(
    (message) => message.channelId === currentChannelId
  );

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        {/* ChatHeader получает все сообщения (если нужно для статистики) */}
        <ChatHeader filteredMessages={filteredMessages} />
        
        {/* Messages рендерится всегда, но получает пустой массив при загрузке */}
        <Messages
          filteredMessages={filteredMessages}
          isLoading={isLoading}
        />
        
        {/* Форма отправки видна всегда */}
        <MessageForm />
      </div>
    </div>
  );
};

export default ChatContainer;
