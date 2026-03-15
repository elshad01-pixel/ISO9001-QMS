import { IsIn, IsOptional, IsString } from 'class-validator';

export const DOCUMENT_TRANSITIONS = ['submit_review', 'approve', 'release', 'revise', 'archive'] as const;
export type DocumentTransitionAction = (typeof DOCUMENT_TRANSITIONS)[number];

export class DocumentTransitionDto {
  @IsString()
  @IsIn(DOCUMENT_TRANSITIONS)
  action!: DocumentTransitionAction;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  effectiveDate?: string;
}
