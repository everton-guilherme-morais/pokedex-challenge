import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Pokemon } from './entities/pokemon.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserPokemonService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPokemons(): Promise<Pokemon[]> {
    const pokeCount = 6;
  const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
  };

  const typesPoke = Object.keys(colors);
  const pokemons: Pokemon[] = [];
  const promises: Promise<void>[] = [];

  for (let i = 1; i <= pokeCount; i++) {
    promises.push(getPokemons(i));
  }

  await Promise.all(promises);

  return pokemons;

  async function getPokemons(id: number): Promise<void> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
      const resp = await axios.get(url);
      const data = resp.data;
      const types = data.types.map((type: any) => type.type.name);
      const pokemonType = types[0];
      const pokemon: Pokemon = {
        id: data.id,
        name: capitalizeFirstLetter(data.name),
        types: pokemonType,
        imageUrl: data.sprites.front_default,
        color: colors[pokemonType] || '#FFFFFF',
      };
      pokemons.push(pokemon);
    } catch (error) {
      console.error(`Erro ao buscar o pokémon com o ID ${id}: ${error.message}`);
      throw error;
    }
  }
}

async favoritePokemon(userId: number, pokemonId: number, pokemonName: string, pokemonType: string, imageUrl: string): Promise<void> {
  try {
    const existingFavorite = await this.prisma.favoritePoke.findFirst({
      where: {
        userId: userId,
        pokemonId: pokemonId,
      },
    });

    if (existingFavorite) {
      throw new Error(`O Pokémon com o ID ${pokemonId} já foi favoritado`);
    }

    await this.prisma.favoritePoke.create({
      data: {
        userId,
        pokemonId,
        namePokemon: pokemonName,
        type: pokemonType,
        imageUrl: imageUrl,
      },
    });
  } catch (error) {
    throw new Error(`Failed to favorite Pokemon: ${error.message}`);
  }
}

  async unfavoritePokemon(pokemonId: number): Promise<void> {
    try {
      await this.prisma.favoritePoke.delete({
        where: {
          id: pokemonId,
        },
      });
    } catch (error) {
      throw new Error(`Failed to unfavorite Pokemon: ${error.message}`);
    }
  }

  async editFavoritePokemonName(userId: number, pokemonId: number, newName: string): Promise<void> {
    const favoritePokemon = await this.prisma.favoritePoke.findFirst({
      where: {
        AND: [
          { pokemonId: pokemonId },
          { userId: userId }
        ]
      },
    });
    
    if (favoritePokemon) {
      await this.prisma.favoritePoke.update({
        where: {
          id: favoritePokemon.id
        },
        data: {
          namePokemon: newName,
        },
      });
    } else {
      console.error('Registro não encontrado com os critérios fornecidos.');
    }
  }

  async getRandomPokemon(): Promise<any> {
    try {
      const randomPokemonId = Math.floor(Math.random() * 898) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`);
      const { id, name, types, sprites  } = response.data;
      const simplifiedPokemon = { id, name, types: types.map((type: any) => type.type.name), image: sprites.front_default  };
      return simplifiedPokemon;
    } catch (error) {
      throw new Error(`Failed to fetch random Pokemon: ${error.message}`);
    } 
  }

  async getFavoritePokemonsByUserId(userId: number): Promise<Pokemon[]> {
    try {
      const favoritePokemons = await this.prisma.favoritePoke.findMany({
        where: {
          userId: userId,
        },
      });

      const colors = {
        fire: '#FDDFDF',
        grass: '#DEFDE0',
        electric: '#FCF7DE',
        water: '#DEF3FD',
        ground: '#f4e7da',
        rock: '#d5d5d4',
        fairy: '#fceaff',
        poison: '#98d7a5',
        bug: '#f8d5a3',
        dragon: '#97b3e6',
        psychic: '#eaeda1',
        flying: '#F5F5F5',
        fighting: '#E6E0D4',
        normal: '#F5F5F5'
      };
      
      const formattedPokemons: Pokemon[] = favoritePokemons.map(pokemon => ({
        id: pokemon.pokemonId,
        name: capitalizeFirstLetter(pokemon.namePokemon),
        types: [capitalizeFirstLetter(pokemon.type)],
        imageUrl: pokemon.imageUrl,
        color: colors[pokemon.type] || '#FFFFFF',
      }));

      return formattedPokemons;
    } catch (error) {
      throw new Error(`Failed to get favorite Pokemons: ${error.message}`);
    }
  }

  async getFavoritePokemonsByUserIdAlphabeticalOrder(userId: number): Promise<Pokemon[]> {
    try {
      const favoritePokemons = await this.prisma.favoritePoke.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          namePokemon: 'asc',
        },
      });

      const colors = {
        fire: '#FDDFDF',
        grass: '#DEFDE0',
        electric: '#FCF7DE',
        water: '#DEF3FD',
        ground: '#f4e7da',
        rock: '#d5d5d4',
        fairy: '#fceaff',
        poison: '#98d7a5',
        bug: '#f8d5a3',
        dragon: '#97b3e6',
        psychic: '#eaeda1',
        flying: '#F5F5F5',
        fighting: '#E6E0D4',
        normal: '#F5F5F5'
      };
  
      const formattedPokemons: Pokemon[] = favoritePokemons.map(pokemon => ({
        id: pokemon.pokemonId,
        name: capitalizeFirstLetter(pokemon.namePokemon),
        types: [capitalizeFirstLetter(pokemon.type)],
        imageUrl: pokemon.imageUrl,
        color: colors[pokemon.type] || '#FFFFFF',
      }));
  
      return formattedPokemons;
    } catch (error) {
      throw new Error(`Failed to get favorite Pokemons in alphabetical order: ${error.message}`);
    }
  }

  async getFavoritePokemonsByUserIdCaptureOrder(userId: number): Promise<Pokemon[]> {
    try {
      const favoritePokemons = await this.prisma.favoritePoke.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      const colors = {
        fire: '#FDDFDF',
        grass: '#DEFDE0',
        electric: '#FCF7DE',
        water: '#DEF3FD',
        ground: '#f4e7da',
        rock: '#d5d5d4',
        fairy: '#fceaff',
        poison: '#98d7a5',
        bug: '#f8d5a3',
        dragon: '#97b3e6',
        psychic: '#eaeda1',
        flying: '#F5F5F5',
        fighting: '#E6E0D4',
        normal: '#F5F5F5'
      };
  
      const formattedPokemons: Pokemon[] = favoritePokemons.map(pokemon => ({
        id: pokemon.pokemonId,
        name: capitalizeFirstLetter(pokemon.namePokemon),
        types: [capitalizeFirstLetter(pokemon.type)],
        imageUrl: pokemon.imageUrl,
        color: colors[pokemon.type] || '#FFFFFF',
      }));
  
      return formattedPokemons;
    } catch (error) {
      throw new Error(`Failed to get favorite Pokemons in capture order: ${error.message}`);
    }
  }
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}