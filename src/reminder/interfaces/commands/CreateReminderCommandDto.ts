import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { AbstractCommandDto } from '../../../commands';

export class CreateReminderCommandDto implements AbstractCommandDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  public time: Date;

  constructor(name: string, datetime: Date) {
    this.name = name;
    this.time = datetime;
  }
}
