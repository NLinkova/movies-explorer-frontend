import React, { memo } from 'react';
import './Register.css';
import Form from '../Form/Form';
import Preloader from '../Preloader/Preloader';

const Register = memo(({ authRegister, setRegisteredError, registeredError, isLoading }) => {
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
        registeredError={registeredError}
        setRegisteredError={setRegisteredError}
      />
    </section>
  );
});

export default Register;
