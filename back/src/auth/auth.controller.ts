import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiBody } from '@nestjs/swagger';


@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiTags('Login')
    @IsPublic()
    @ApiOperation({ summary: 'Login de usuário' })
    @ApiResponse({ status: 200, description: 'Usuário autenticado com sucesso' })
    @ApiBadRequestResponse({ description: 'Credenciais inválidas' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    example: 'user@example.com'
                },
                password: {
                    type: 'string',
                    example: 'senha123'
                }
            },
            required: ['username', 'password']
        }
    })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    login(@Request() req: AuthRequest) {
        return this.authService.login(req.user)
    }
}
