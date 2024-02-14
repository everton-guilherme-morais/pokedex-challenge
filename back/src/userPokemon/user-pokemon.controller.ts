import { Body, Controller, Get, Param, Post, Delete, Patch } from '@nestjs/common';
import { UserPokemonService } from './user-pokemon.service';
import { Pokemon } from './entities/pokemon.entity';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Pokemons')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly userPokemonService: UserPokemonService) {}

  
  @IsPublic()
  @ApiOperation({ summary: 'Obter "todos" os Pokemons' })
  @ApiResponse({ status: 200, description: 'Lista de Pokemons obtida com sucesso', type: Pokemon, isArray: true })
  @Get()
  async getAllPokemons(): Promise<Pokemon[]> {
    return this.userPokemonService.getAllPokemons();
  }

  @IsPublic()
  @ApiOperation({ summary: 'Favoritar Pokemon por ID de usuário e ID de Pokemon' })
  @ApiParam({ name: 'userId', description: 'ID do usuário', example: 1 })
  @ApiParam({ name: 'pokemonId', description: 'ID do Pokemon', example: 1 })
  @ApiBody({
    description: 'Dados do Pokemon',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Ivysaur' },
        types: { type: 'string', example: 'grass' },
        imageUrl: { type: 'string', example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' }
      },
      required: ['name', 'types', 'imageUrl']
    },
  })
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
  @ApiOperation({ summary: 'Obter Pokemons favoritos por ID do usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário', example: 1 })
  @ApiResponse({ status: 200, description: 'Lista de Pokemons favoritos obtida com sucesso', type: Pokemon, isArray: true })
  @Get(':userId/favorites')
  async getFavoritePokemonsByUserId(@Param('userId') userId: number): Promise<Pokemon[]> {
    return this.userPokemonService.getFavoritePokemonsByUserId(userId);
  }

  @ApiOperation({ summary: 'Remover Pokemons favoritos do usuário. Obs: Rota sem uso até o momento' })
  @IsPublic()
  @Delete(':pokemonId/unfavorite')
  async unfavoritePokemon(@Param('pokemonId') pokemonId: number): Promise<void> {
    await this.userPokemonService.unfavoritePokemon(pokemonId);
  }
  
  @IsPublic()
  @ApiOperation({ summary: 'Editar nome do Pokemon favorito por ID de usuário e ID de Pokemon' })
  @ApiParam({ name: 'pokemonId', description: 'ID do Pokemon', example: 1 })
  @ApiParam({ name: 'userId', description: 'ID do usuário', example: 1 })
  @ApiBody({ description: 'Novo nome do Pokemon', schema: { type: 'object', properties: { newName: { type: 'string' } }, required: ['newName'] } })
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
  @ApiOperation({ summary: 'Obter um Pokemon aleatório' })
  @ApiResponse({ status: 200, description: 'Pokemon aleatório obtido com sucesso' })
  @Get('random')
  async getRandomPokemon(): Promise<any> {
    return this.userPokemonService.getRandomPokemon();
  }

  @IsPublic()
  @ApiOperation({ summary: 'Obter Pokemons favoritos por ID do usuário em ordem alfabética' })
  @ApiParam({ name: 'userId', description: 'ID do usuário', example: 1 })
  @ApiResponse({ status: 200, description: 'Lista de Pokemons favoritos obtida com sucesso', type: Pokemon, isArray: true })
  @Get(':userId/favorites/alphabetical')
  async getFavoritePokemonsByUserIdAlphabeticalOrder(@Param('userId') userId: number): Promise<Pokemon[]> {
    return this.userPokemonService.getFavoritePokemonsByUserIdAlphabeticalOrder(userId);
  }

  @IsPublic()
  @ApiOperation({ summary: 'Obter Pokemons favoritos por ID do usuário em ordem de captura' })
  @ApiParam({ name: 'userId', description: 'ID do usuário', example: 1 })
  @ApiResponse({ status: 200, description: 'Lista de Pokemons favoritos obtida com sucesso', type: Pokemon, isArray: true })
  @Get(':userId/favorites/capture')
  async getFavoritePokemonsByUserIdCaptureOrder(@Param('userId') userId: number): Promise<Pokemon[]> {
    return this.userPokemonService.getFavoritePokemonsByUserIdCaptureOrder(userId);
  }
}
