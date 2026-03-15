import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

export const CAPA_TRANSITIONS = [
  'start_containment',
  'complete_root_cause',
  'approve_plan',
  'start_implementation',
  'request_effectiveness_review',
  'verify_effectiveness',
  'close',
] as const;
export type CapaTransitionAction = (typeof CAPA_TRANSITIONS)[number];

export class CorrectiveActionTransitionDto {
  @IsString()
  @IsIn(CAPA_TRANSITIONS)
  action!: CapaTransitionAction;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsBoolean()
  effectivenessVerified?: boolean;
}
