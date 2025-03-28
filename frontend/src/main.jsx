import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.jsx';

const socket = io('/socket.io', {
  path: '/socket.io',
  transports: ['websocket'],
});

const RootComponent = () => {
  const [app, setApp] = useState(null);

  init(socket).then(setApp).catch((err) => {
    console.error('Ошибка при инициализации:', err);
  });

  return app || <div>Loading...</div>;
};

const root = createRoot(document.getElementById('root'));
root.render(<RootComponent />);
