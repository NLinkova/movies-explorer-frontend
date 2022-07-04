import React, { memo } from 'react';
import './Login.css';
import Form from '../Form/Form';

const Login = memo(({ textError, clearTextError }) => {
  function handleSubmit(e, { email, password }) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
  }
  return (
    <section className="login__page">
      <Form
        name="sign-in"
        title="Рады видеть!"
        btnName="Войти"
        onSubmit={handleSubmit}
        textError={textError}
        clearTextError={clearTextError}
      />
    </section>
  );
});

export default Login;
