import { Module } from '@nestjs/common';
import { UserPokemonService } from './user-pokemon.service';
import { PokemonController } from './user-pokemon.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PokemonController],
  providers: [UserPokemonService],
  exports: [UserPokemonService],
})
export class UserPokemonModule {}