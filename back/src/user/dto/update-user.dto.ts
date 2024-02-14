import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'E-mail do usuário',
    required: false,
    example: 'novoemail@example.com'
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Nova senha do usuário',
    required: false,
    example: '@NovaSenha123'
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
  })
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Novo nome de usuário',
    required: false,
    example: 'NovoNomeDeUsuario'
  })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty({
    description: 'Novo endereço do usuário',
    required: false,
    example: 'NovaRua, 123'
  })
  @IsString()
  @IsOptional()
  address?: string;
}
