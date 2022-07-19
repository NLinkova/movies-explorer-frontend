import React, { memo } from 'react';
import './Register.css';
import Form from '../Form/Form';
import Preloader from '../Preloader/Preloader';

const Register = memo(({ authRegister, textError, setTextError }) => {
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
        setTextError={setTextError}
      />
    </section>
  );
});

export default Register;
