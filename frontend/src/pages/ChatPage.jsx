import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels } from '../slices/channelsSlice';
import { fetchMessages } from '../slices/messagesSlice';

const ChatPage = () => {
  const dispatch = useDispatch();

  // Получаем данные из хранилища
  const { items: channels, status: channelsStatus } = useSelector((state) => state.channels);
  const { items: messages, status: messagesStatus } = useSelector((state) => state.messages);

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  if (channelsStatus === 'loading' || messagesStatus === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (channelsStatus === 'failed' || messagesStatus === 'failed') {
    return <div>Ошибка при загрузке данных</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Список каналов */}
        <div className="col-3">
          <h2>Каналы</h2>
          <ul>
            {channels.map((channel) => (
              <li key={channel.id}>{channel.name}</li>
            ))}
          </ul>
        </div>

        {/* Чат и форма для ввода сообщения */}
        <div className="col-9">
          <h2>Чат</h2>
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                <strong>{message.username}:</strong> {message.body}
              </li>
            ))}
          </ul>
          <form>
            <input type="text" placeholder="Введите сообщение" />
            <button type="submit">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
