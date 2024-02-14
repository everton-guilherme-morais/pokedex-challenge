import { ApiProperty } from '@nestjs/swagger';

export class Pokemon {
    @ApiProperty({ description: 'ID do Pokemon', example: 1 })
    id: number;

    @ApiProperty({ description: 'Nome do Pokemon', example: 'Pikachu' })
    name: string;

    @ApiProperty({ description: 'Tipos do Pokemon', example: ['Elétrico'] })
    types: string[];

    @ApiProperty({ description: 'URL da imagem do Pokemon', example: 'https://example.com/pikachu.png' })
    imageUrl: string;

    @ApiProperty({ description: 'Cor do Pokemon', example: 'Amarelo' })
    color: string;
}
