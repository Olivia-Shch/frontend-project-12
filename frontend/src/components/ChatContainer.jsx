const ChatContainer = () => {
  const { data: messages = [], isLoading } = useGetMessagesQuery();
  const currentChannelId = useSelector(selectCurrentChannelId);

  if (isLoading) {
    return <div className="d-flex justify-content-center align-items-center h-100">Загрузка...</div>;
  }

  const filtredMessages = messages.filter((message) => message.channelId === currentChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ChatHeader filtredMessages={filtredMessages} />
        <Messages filtredMessages={filtredMessages} />
        <MessageForm />
      </div>
    </div>
  );
};
