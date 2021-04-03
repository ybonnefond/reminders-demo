import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateReminderCommandDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsDateString()
  @IsNotEmpty()
  public time: Date;

  constructor(name: string, datetime: Date) {
    this.name = name;
    this.time = datetime;
  }
}
