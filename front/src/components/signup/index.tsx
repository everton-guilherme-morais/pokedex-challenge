import React, { useCallback } from 'react';
import styles from './cadastro.module.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { api } from '@/app/lib/axios';

const Signup = ({ onSuccess }: { onSuccess: () => void }) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  

  const handleSignupSubmit = useCallback(async (data: any) => {
    
    try {
      await api.post(`/user/signup`, data);
      router.push('/login');
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <form autoComplete="off" className={styles.form} onSubmit={handleSubmit(handleSignupSubmit)}>
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
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          required
          autoComplete="off"
          {...register('username')}
        />
        <button className={styles.submit} type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Signup;
