import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Главная страница</h1>
        <p className="lead">Добро пожаловать на главную страницу!</p>
        <hr className="my-4" />
        <p>Используйте кнопку ниже, чтобы выйти из системы.</p>
        <button onClick={handleLogout} className="btn btn-danger">
          Выйти
        </button>
      </div>
    </div>
  );
};

export default HomePage;
