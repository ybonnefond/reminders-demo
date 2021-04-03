import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { AbstractCommandDto } from "../../../commands";

export class CreateReminderCommandDto implements AbstractCommandDto {
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
