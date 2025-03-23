import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Схема валидации с использованием Yup
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Имя пользователя должно содержать минимум 3 символа')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(5, 'Пароль должен содержать минимум 5 символов')
    .required('Обязательное поле'),
});

const LoginPage = () => {
  const navigate = useNavigate();

  // Начальные значения формы
  const initialValues = {
    username: '',
    password: '',
  };

  // Обработчик отправки формы
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Отправка данных на сервер
      const response = await axios.post('http://localhost:5001/api/v1/login', values);
      console.log('Ответ сервера:', response.data); // Логируем ответ

      // Сохранение токена в localStorage
      localStorage.setItem('token', response.data.token);
      
      // Редирект на главную страницу
      navigate('/');
    } catch (error) {
      // Логируем ошибку
      console.error('Ошибка при авторизации:', error.response?.data || error.message);

      // Обработка ошибки авторизации
      setErrors({ username: 'Неверное имя пользователя или пароль' });
    } finally {
      setSubmitting(false);
    }
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
            {({ isSubmitting }) => (
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
                    className={({ error }) =>
                      error ? 'form-control is-invalid' : 'form-control'
                    }
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
                    className={({ error }) =>
                      error ? 'form-control is-invalid' : 'form-control'
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>

                {/* Кнопка отправки формы */}
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Вход...' : 'Войти'}
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
