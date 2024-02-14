'use client'

import React, { useCallback, useState } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { useForm, }  from 'react-hook-form'
import { useRouter } from 'next/navigation';

export default function Login() {

  const [activeForm, setActiveForm] = useState('signin');
  const [ user, setUser ] = useState('')

  const { register, handleSubmit} = useForm();
  const router = useRouter();

  const creatUser = useCallback(async (data: any) => {
    setUser(JSON.stringify(data, null, 2))

    try {
      await axios.post('http://localhost:3001/user/singup', data);
      handleFormChange('signin');
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  }, [])

  const handleSigninSubmit = useCallback(async (data: any) => {
    setUser(JSON.stringify(data, null, 2))
    try {
      const response = await axios.post('http://localhost:3001/login', data);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('idUser', response.data.id);
    } catch (error) {
      console.error('Erro no login:', error);
    }

    if (typeof window !== 'undefined') {
      router.push('/pokeHome');
    }
  }, []);

  const handleFormChange = (formId: string) => {
    setActiveForm(formId);
  };


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
      <div className={styles.buttonsForm}>
        <button className={styles.button} onClick={() => handleFormChange('signin')} id="btnSignin">
          Sign In
        </button>
        <button className={styles.button} onClick={() => handleFormChange('signup')} id="btnSignup">
          Sign Up
        </button>
      </div>
      <div>
      {activeForm === 'signin' && (
        <form autoComplete="off" className={styles.form} id="signin" onSubmit={handleSubmit(handleSigninSubmit)}>
          <input 
            className={styles.input}
            type="text"
            placeholder="Email"
            required
            autoComplete="off"
            {...register('email')}
          />
          <i className="fas fa-envelope iEmail" id='root'></i>
          <input 
            className={styles.input}
            type="password"
            placeholder="Password"
            required
            autoComplete="off"
            {...register('password')}
          />
          <i className="fas fa-lock iPassword" id='root'></i>
          <button className={styles.submit} type="submit">
            Sign In 
          </button>
        </form>
      )}

      {activeForm === 'signup' && (
        <form autoComplete="off" className={styles.form} id="signup" onSubmit={handleSubmit(creatUser)}>
          <input 
            className={styles.input} 
            type="text" 
            placeholder="Email" 
            required
            {...register('email')}
            autoComplete="off"
          />
          <i className="fas fa-envelope iEmail" id='root'></i>
          <input 
            className={styles.input} 
            type="password" 
            placeholder="Password" 
            required
            {...register('password')}
            autoComplete="off"
          />
          <i className="fas fa-lock iPassword" id='root'></i>
          <input 
            className={styles.input} 
            type="userName" 
            placeholder="Name" 
            required 
            {...register('userName')}
            autoComplete="off"
          />
          <input 
            className={styles.input} 
            type="text" 
            placeholder="Address" 
            required 
            {...register('address')}
            autoComplete="off"
          />
          <i className="fas fa-lock iPassword2" id='root'></i>
          <button className={styles.submit} type="submit">
            Sign Up
          </button>
        </form>
      )}
      </div>
      </div>
    </div>
  );
};