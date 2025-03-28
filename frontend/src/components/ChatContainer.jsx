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
  const filteredMessages = messages.filter((message) => message.channelId === currentChannelId);

  const messagesToRender = isLoading ? [] : filteredMessages;

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChatHeader filteredMessages={filteredMessages} />
        <Messages
          filteredMessages={messagesToRender}
          isLoading={isLoading}
        />
        <MessageForm />
      </div>
    </div>
  );
};

export default ChatContainer;
