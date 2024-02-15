import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './src/app/page';
import '@testing-library/jest-dom';

test('renderiza o formulário de login por padrão', () => {
  const { getByText, queryByText, getByPlaceholderText } = render(<Login />);
  expect(queryByText('Sign In')).toBeInTheDocument();
//   expect(getByPlaceholderText('Email')).toBeInTheDocument();
//   expect(getByPlaceholderText('Password')).toBeInTheDocument();
});

test('alterna entre formulário de login e cadastro', () => {
  const { getByText } = render(<Login />);
  fireEvent.click(getByText('Sign Up'));
  expect(getByText('Sign Up')).toBeInTheDocument();
});

test('faz login com credenciais válidas', async () => {
  const { getByPlaceholderText, getByText } = render(<Login />);
  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(getByText('Sign In'));

  await waitFor(() => {
    expect(localStorage.getItem('access_token')).toBeTruthy();
  });
});