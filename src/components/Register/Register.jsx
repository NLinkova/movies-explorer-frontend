import React, { memo } from 'react';
import './Register.css';
import Form from '../Form/Form';

const Register = memo(({ authRegister, textError, clearTextError }) => {
  function handleSubmit(e, { name, email, password }) {
    e.preventDefault();
    authRegister(name, email, password);
  }

  return (
    <section className='register__page'>
      <Form
        name="sign-up"
        title="Добро пожаловать!"
        btnName="Зарегистрироваться"
        onSubmit={handleSubmit}
        textError={textError}
        clearTextError={clearTextError}
      />
    </section>
  );
});

export default Register;
