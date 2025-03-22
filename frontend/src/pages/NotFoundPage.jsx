import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <h1 className="alert-heading">404 - Страница не найдена</h1>
        <p>Извините, запрашиваемая страница не существует.</p>
        <hr />
        <Link to="/" className="btn btn-primary">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
