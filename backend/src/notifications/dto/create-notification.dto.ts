import { IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  tenantId!: string;

  @IsString()
  userId!: string;

  @IsString()
  eventType!: string;

  @IsString()
  title!: string;

  @IsString()
  message!: string;
}
