'use client'

import React, { useEffect, useState } from 'react';
import styles from './search.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
  color: string;
}

export default function Login() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [randomPokemon, setRandomPokemon] = useState<Pokemon | null>(null);

  const handleSearchPokemon = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:3001/pokemon/random');
      console.log(response, 'response')
      console.log('URL da imagem:', response.data.image);
      setRandomPokemon(response.data);
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePokemon = async (pokemon: Pokemon) => {
    try {
      const userIdString = localStorage.getItem('idUser');
      if (!userIdString) {
        console.error('idUser não encontrado no localStorage');
        return;
      }
      const userId = parseInt(userIdString, 10);

      const body = {
        name: pokemon.name,
        types: pokemon.types[0],
        imageUrl: pokemon.image,
      };

      await axios.post(`http://localhost:3001/pokemon/${userId}/${pokemon.id}/favorite`, body);

      showNotification();
      console.log('Pokemon favoritado com sucesso!');
    } catch (error) {
      console.error('Erro ao favoritar Pokémon:', error);
    }
  };

  const showNotification = () => {
    console.log('teste')
    toast.success('POKEMON SALVO COM SUCESSO', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.myFavorites} href={'/favoritePoke'}>
          Ver meus favoritos
        </Link>
        <h1 className={styles.title}>Pokedex</h1>
        <h4>Encontre seu pokemon e derrote o Gary</h4>
        <button onClick={handleSearchPokemon}>
          Buscar pokemon
        </button>
        <div className={styles.containerPokedex}>
          {loading ? (
            <button className={`${styles.loadingButton} ${styles.pulse}`} disabled>Loading...</button>
          ) : (
            randomPokemon ? (
              <div key={randomPokemon.id} className={styles.cardPoke} style={{ backgroundColor: randomPokemon.color }}>
                <div className={styles.imgContainer}>
                  <img className={styles.imgPoke} src={randomPokemon.image} alt='pokemon' />
                </div> 
                <div className={styles.infoPoke}>
                  <span className={styles.number}>#{randomPokemon.id}</span>
                  <h3 className={styles.name}>{randomPokemon.name}</h3>
                  <small className={styles.type}>Type: <span>{randomPokemon.types}</span></small>
                  <button className={styles.savePoke} onClick={() => handleSavePokemon(randomPokemon)}>
                    save
                  </button>
                </div>      
              </div>
            ) : (
              <p>Nenhum Pokémon encontrado</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};