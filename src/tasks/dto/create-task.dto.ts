import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Le contenu ne peut pas être vide' })
  @IsString({ message: 'Le contenu doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Le contenu doit faire au moins 3 caractères' })
  @MaxLength(100, { message: 'Le contenu ne doit pas dépasser 100 caractères' })
  content: string;
}
