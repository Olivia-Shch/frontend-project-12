import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Страница входа</h1>
          <p className="card-text">Пожалуйста, войдите в систему.</p>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Имя пользователя
              </label>
              <input type="text" className="form-control" id="username" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Пароль
              </label>
              <input type="password" className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">
              Войти
            </button>
          </form>
          <Link to="/" className="btn btn-link mt-3">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;