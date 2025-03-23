import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // Если токен есть, показываем защищённый маршрут
  // Если токена нет, перенаправляем на страницу входа
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
