'use client'

import React, { useEffect, useState } from 'react';
import styles from './info.module.css';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { BiPencil } from "react-icons/bi";
import Link from 'next/link';
import { api } from '../lib/axios';

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
  color: string;
  captureDate: string;
}


const FavoritePoke: React.FC = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);
  const [sortedPokemons, setSortedPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchFavoritePokemons();
  }, []);

  useEffect(() => {
    setSortedPokemons([...favoritePokemons]);
  }, [favoritePokemons]);

  const fetchFavoritePokemons = async () => {
    try {
      const userId = localStorage.getItem('idUser');
      if (!userId) {
        console.error('idUser não encontrado no localStorage');
        return;
      }
      const response = await api.get(`/pokemon/${userId}/favorites`);
      setFavoritePokemons(response.data);
    } catch (error) {
      console.error('Erro ao obter os pokémons favoritos:', error);
    }
  };

  const handleEditPokemonName = async (pokemonId: number) => {
    const newName = prompt('Digite o novo nome do Pokémon:');
  if (newName) {
    try {
      const accessToken = localStorage.getItem('access_token');
      const userId = localStorage.getItem('idUser');
      if (!accessToken) {
        console.error('Token JWT não encontrado no localStorage. Faça login primeiro.');
        return;
      }
      await api.patch(`/pokemon/${pokemonId}/${userId}/edit`, { newName }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const updatedPokemons = favoritePokemons.map(pokemon =>
        pokemon.id === pokemonId ? { ...pokemon, name: newName } : pokemon
      );
      setFavoritePokemons(updatedPokemons);
    } catch (error) {
      console.error('Erro ao editar o nome do Pokémon:', error);
    }
  }
  };

  const sortPokemonsByAlphabetical = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const userId = localStorage.getItem('idUser');
      if (!accessToken) {
        console.error('Token JWT não encontrado no localStorage. Faça login primeiro.');
        return;
      }
      const response = await api.get(`/pokemon/${userId}/favorites/alphabetical`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setFavoritePokemons(response.data);
    } catch (error) {
      console.error('Erro ao ordenar os pokémons por ordem alfabética:', error);
    }
  };

  const sortPokemonsByCapture = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const userId = localStorage.getItem('idUser');
      if (!accessToken) {
        console.error('Token JWT não encontrado no localStorage. Faça login primeiro.');
        return;
      }
      const response = await api.get(`/pokemon/${userId}/favorites/capture`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setFavoritePokemons(response.data);
    } catch (error) {
      console.error('Erro ao ordenar os pokémons por data de captura:', error);
    }
  };

  const sortPokemonsByAlphabeticalAndCaptureDate = () => {
    const sortedPokemons = [...favoritePokemons];
    sortedPokemons.sort((a, b) => {
      const nameComparison = a.name.localeCompare(b.name);
      if (nameComparison !== 0) {
        return nameComparison;
      }
      return new Date(a.captureDate).getTime() - new Date(b.captureDate).getTime();
    });
    setFavoritePokemons(sortedPokemons);
  };

  const sortPokemonsByType = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const userId = localStorage.getItem('idUser');
      if (!accessToken) {
        console.error('Token JWT não encontrado no localStorage. Faça login primeiro.');
        return;
      }
      const response = await api.get(`/pokemon/${userId}/favorites/byTypeAlphabetical`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setFavoritePokemons(response.data);
    } catch (error) {
      console.error('Erro ao ordenar os pokémons por tipo:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/pokeHome" className={styles.backButton}>
          <FaArrowLeft />
          <p>Voltar</p>
        </Link>
        <h1>Meus pokemons favoritos</h1>
        <div className={styles.buttonsFilter}>
          <button className={styles.button} onClick={sortPokemonsByAlphabetical}>Ordenar por order alfabética</button>
          <button className={styles.button} onClick={sortPokemonsByCapture}>Ordenar por data de captura</button>
          <button className={styles.button} onClick={sortPokemonsByAlphabeticalAndCaptureDate}>Ordenar por data de captura e por ordem alfabética</button>
          <button className={styles.button} onClick={sortPokemonsByType}>Ordenar por tipo</button>
        </div>
        <div className={styles.containerPokedex}>
          {favoritePokemons.length === 0 ? (
            <p className={styles.nonePoke}>Você ainda não capturou nenhum pokemon.</p>
          ) : (
            favoritePokemons.map((pokemon) => (
              <div key={pokemon.id} className={styles.cardPoke} style={{ backgroundColor: pokemon.color }}>
              <div className={styles.imgContainer}>
                <img className={styles.imgPoke} src={pokemon.imageUrl} alt='pokemon' />
              </div> 
              <div className={styles.infoPoke}>
                <span className={styles.number}>#{pokemon.id}</span>
                <h3 className={styles.name}>
                  <p>{pokemon.name}</p>
                  <BiPencil className={styles.editIcon} onClick={() => handleEditPokemonName(pokemon.id)} />
                </h3>
                <small className={styles.type}>Type: <span>{pokemon.types}</span></small>
              </div>      
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritePoke;
