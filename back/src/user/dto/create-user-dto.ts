import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends User {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'teste@gmail.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '@Teste21'
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    description: 'Nome de usuário',
    example: '@Teste21'
  })
  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'Endereço do usuário',
    example: '123 Rua Principal'
  })
  @ApiProperty()
  @IsString()
  address: string;
}