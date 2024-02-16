import { Controller, Post, Body, Get, Put, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiBody, ApiProperty, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @ApiOperation({ summary: 'Criar usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Buscar usuário por e-mail' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'teste@gmail.com',
        },
      },
    },
  })
  @Post('find')
  async findByEmail(@Body() { email }: { email: string }) {
    try {
      const user = await this.userService.findByEmail(email);
      return user;
    } catch (error) {
      console.error(error);
      return { statusCode: 500, message: 'Internal server error' };
    }
  }

  @ApiOperation({ summary: 'Atualizar usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ 
    name: 'id', 
    description: 'ID do usuário', 
    type: 'number',
    example: 1
  })
  @Put('/update/:id')
  async update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }
  
}
