import { Controller, Post, Body, Get, Put, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('singup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

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

  @Put('/update/:id')
  async update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }
  
}
