import { IsOptional, IsString } from 'class-validator';

export class UpdateProjectRateDTO {
  @IsOptional()
  @IsString()
  projectId: string;

  @IsOptional()
  scores: CriteriaScore[];

  @IsOptional()
  @IsString()
  comment: string;
}

class CriteriaScore {
  @IsOptional()
  criteriaId: string;

  @IsOptional()
  score: number;
}
