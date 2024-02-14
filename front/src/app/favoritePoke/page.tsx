'use client'

import React, { useEffect, useState } from 'react';
import styles from './info.module.css';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import { BiPencil } from "react-icons/bi";
import Link from 'next/link';

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
  color: string;
  captureDate: string; // Adiciona a propriedade captureDate ao tipo Pokemon
}


const UserDetails: React.FC = () => {
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
      const response = await axios.get(`http://localhost:3001/pokemon/${userId}/favorites`);
      setFavoritePokemons(response.data);
    } catch (error) {
      console.error('Erro ao obter os pokémons favoritos:', error);
    }
  };

  const handleEditPokemonName = async (pokemonId: number) => {
    const newName = prompt('Digite o novo nome do Pokémon:');
    if (newName) {
      try {
        const userId = localStorage.getItem('idUser');
        if (!userId) {
          console.error('idUser não encontrado no localStorage');
          return;
        }
        await axios.patch(`http://localhost:3001/pokemon/${pokemonId}/${userId}/edit`, { newName });
        const updatedPokemons = favoritePokemons.map(pokemon =>
          pokemon.id === pokemonId ? { ...pokemon, name: newName } : pokemon
        );
        setFavoritePokemons(updatedPokemons);
      } catch (error) {
        console.error('Erro ao editar o nome do Pokémon:', error);
      }
    }
  };

  const sortPokemonsByType = async () => {
    try {
      const userId = localStorage.getItem('idUser');
      if (!userId) {
        console.error('idUser não encontrado no localStorage');
        return;
      }
      const response = await axios.get(`http://localhost:3001/pokemon/${userId}/favorites/capture`);
      setFavoritePokemons(response.data);
    } catch (error) {
      console.error('Erro ao ordenar os pokémons por tipo:', error);
    }
  };

  const sortPokemonsByName = async () => {
    try {
      const userId = localStorage.getItem('idUser');
      if (!userId) {
        console.error('idUser não encontrado no localStorage');
        return;
      }
      const response = await axios.get(`http://localhost:3001/pokemon/${userId}/favorites/alphabetical`);
      setFavoritePokemons(response.data);
    } catch (error) {
      console.error('Erro ao ordenar os pokémons por nome:', error);
    }
  };

  const sortPokemonsByAlphabeticalAndCaptureDate = () => {
    const sortedPokemons = [...favoritePokemons];
    sortedPokemons.sort((a, b) => {
      // Ordenar por ordem alfabética
      const nameComparison = a.name.localeCompare(b.name);
      if (nameComparison !== 0) {
        return nameComparison;
      }
      return new Date(a.captureDate).getTime() - new Date(b.captureDate).getTime();
    });
    setFavoritePokemons(sortedPokemons);
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
          <button className={styles.button} onClick={sortPokemonsByType}>Ordenar por order alfabética</button>
          <button className={styles.button} onClick={sortPokemonsByName}>Ordenar por data de captura</button>
          <button className={styles.button} onClick={sortPokemonsByAlphabeticalAndCaptureDate}>Ordenar por data de captura e por ordem alfabética</button>
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

export default UserDetails;
