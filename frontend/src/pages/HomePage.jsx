import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Главная страница</h1>
        <p className="lead">Добро пожаловать на главную страницу!</p>
        <hr className="my-4" />
        <p>Используйте кнопку ниже, чтобы перейти на страницу входа.</p>
        <Link to="/login" className="btn btn-primary btn-lg">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
