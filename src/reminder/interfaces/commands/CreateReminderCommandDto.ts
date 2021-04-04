import { parseISO } from 'date-fns';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from "class-transformer";

import { AbstractCommandDto } from '../../../gateway';

export class CreateReminderCommandDto implements AbstractCommandDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsDate({  message: 'time must be a valid ISO 8601 date string' })
  @Transform(({ value }) => parseISO(value))
  public time: Date;

  constructor(name: string, datetime: Date) {
    this.name = name;
    this.time = datetime;
  }
}
