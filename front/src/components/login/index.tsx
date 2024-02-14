import React, { useCallback } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const handleLoginSubmit = useCallback(async (data: any) => {
    try {
      const response = await axios.post('http://localhost:3001/login', data);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('idUser', response.data.id);
      router.push('/pokeHome');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <form autoComplete="off" className={styles.form} onSubmit={handleSubmit(handleLoginSubmit)}>
        <input
          className={styles.input}
          type="text"
          placeholder="Email"
          required
          autoComplete="off"
          {...register('email')}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          required
          autoComplete="off"
          {...register('password')}
        />
        <button className={styles.submit} type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
