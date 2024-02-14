import { Body, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { UserPokemonService } from './user-pokemon.service';
import { Pokemon } from './entities/pokemon.entity';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly userPokemonService: UserPokemonService) {}

  @IsPublic()
  @Get()
  async getAllPokemons(): Promise<Pokemon[]> {
    return this.userPokemonService.getAllPokemons();
  }

  @IsPublic()
  @Post(':userId/:pokemonId/favorite')
  async favoritePokemon(
    @Param('userId') userId: number,
    @Param('pokemonId') pokemonId: number,
    @Body() body: { name: string; types: string; imageUrl: string }
  ): Promise<void> {
    const { name, types, imageUrl } = body;
    await this.userPokemonService.favoritePokemon(userId, pokemonId, name, types, imageUrl);
  }

  @IsPublic()
  @Get(':userId/favorites')
  async getFavoritePokemonsByUserId(@Param('userId') userId: number): Promise<Pokemon[]> {
    console.log(userId, 'userId')
    return this.userPokemonService.getFavoritePokemonsByUserId(userId);
  }

  @IsPublic()
  @Delete(':pokemonId/unfavorite')
  async unfavoritePokemon(@Param('pokemonId') pokemonId: number): Promise<void> {
    await this.userPokemonService.unfavoritePokemon(pokemonId);
  }
  
  @IsPublic()
  @Patch(':pokemonId/:userId/edit')
  async editFavoritePokemonName(
    @Param('pokemonId') pokemonId: number,
    @Param('userId') userId: number,
    @Body() body: { newName: string }
  ): Promise<void> {
    const { newName } = body;
    await this.userPokemonService.editFavoritePokemonName(userId, pokemonId, newName);
  }


  @IsPublic()
  @Get('random')
  async getRandomPokemon(): Promise<any> {
    return this.userPokemonService.getRandomPokemon();
  }

  @IsPublic()
  @Get(':userId/favorites/alphabetical')
  async getFavoritePokemonsByUserIdAlphabeticalOrder(@Param('userId') userId: number): Promise<Pokemon[]> {
    return this.userPokemonService.getFavoritePokemonsByUserIdAlphabeticalOrder(userId);
  }

  @IsPublic()
  @Get(':userId/favorites/capture')
  async getFavoritePokemonsByUserIdCaptureOrder(@Param('userId') userId: number): Promise<Pokemon[]> {
    return this.userPokemonService.getFavoritePokemonsByUserIdCaptureOrder(userId);
  }
}
