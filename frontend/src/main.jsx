import React, { useState } from 'react';
import { io } from 'socket.io-client';
import init from './init.jsx';

const socket = io('/socket.io', {
  path: '/socket.io',
  transports: ['websocket'],
});

const App = () => {
  const [app, setApp] = useState(null);

  init(socket)
    .then(setApp)
    .catch((err) => {
      console.error('Ошибка при инициализации:', err);
    });

  return app || <div>Loading...</div>;
};

export default App;
