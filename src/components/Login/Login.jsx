import React, { memo } from 'react';
import './Login.css';
import Form from '../Form/Form';
import Preloader from '../Preloader/Preloader';

const Login = memo(({ authLogin, loginError, isLoading }) => {
  function handleSubmit(e, { email, password }) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    authLogin(email, password);
  }
  return (
    <section className="login__page">
      <Form
        name="sign-in"
        title="Рады видеть!"
        btnName="Войти"
        onSubmit={handleSubmit}
        loginError={loginError}
      />
    </section>
  );
});

export default Login;
