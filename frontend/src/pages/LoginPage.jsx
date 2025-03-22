import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Имя пользователя должно содержать минимум 3 символа')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .required('Обязательное поле'),
});

const LoginPage = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (values) => {
    console.log('Отправленные данные:', values);
    // Здесь будет логика отправки данных на сервер
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Страница входа</h1>
          <p className="card-text">Пожалуйста, войдите в систему.</p>

          {/* Форма с использованием Formik */}
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                {/* Поле для имени пользователя */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Имя пользователя
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {/* Поле для пароля */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Пароль
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {/* Кнопка отправки формы */}
                <button type="submit" className="btn btn-primary">
                  Войти
                </button>
              </Form>
            )}
          </Formik>

          {/* Ссылка на главную страницу */}
          <Link to="/" className="btn btn-link mt-3">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
