import React, { useEffect, useState } from 'react';
import { fetchChannels } from './api';

const ChatPage = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const getChannels = async () => {
      const data = await fetchChannels();
      setChannels(data);
    };
    getChannels();
  }, []);

  return (
    <div>
      <h1>Каналы</h1>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatPage;
