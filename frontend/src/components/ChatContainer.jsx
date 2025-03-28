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
  
  const filteredMessages = messages.filter(
    (message) => message.channelId === currentChannelId
  );

  if (isLoading) {
    return (
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100 justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChatHeader filteredMessages={filteredMessages} />
        <Messages messages={filteredMessages} />
        <MessageForm />
      </div>
    </div>
  );
};

export default ChatContainer;
