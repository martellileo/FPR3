import { IsBoolean, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export const PRIORITIES = ['baixa', 'media', 'alta'] as const;
export type Priority = (typeof PRIORITIES)[number];

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsIn(PRIORITIES)
  priority: Priority;
}

export class UpdateTaskDto extends CreateTaskDto {
  @IsBoolean()
  done: boolean;
}
