import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar.jsx';
import Login from './page/Login.jsx';
import ChatPage from './page/ChatPage.jsx';
import Signup from './page/Signup.jsx';
import NotFoundPage from './page/NotFoundPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { getPageRoute } from './utils/routes.js';
import ErrorNotification from './components/ErrorNotification.jsx';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <BrowserRouter>
    {' '}
    {/* Добавлен BrowserRouter */}
    <div className="d-flex flex-column h-100">
      <Navbar />
      <ErrorNotification />
      <Routes>
        <Route path={getPageRoute('PAGE_CHAT')} element={<PrivateRoute element={ChatPage} />} />
        <Route path={getPageRoute('PAGE_LOGIN')} element={<Login />} />
        <Route path={getPageRoute('PAGE_SIGNUP')} element={<Signup />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </div>
  </BrowserRouter>
);

export default App;
