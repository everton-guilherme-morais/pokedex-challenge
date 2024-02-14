import React from 'react';
import styles from './styles.module.css';
import Link from 'next/link';

const Error = () => {
  return (
    <div className={styles.container}>
      <h1>Rota não encontrada</h1>
      <Link href={'/'}>
        <button className={styles.errorButton}>Voltar</button>
      </Link>
    </div>  
  );
};

export default Error;
