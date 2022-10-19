import {IsDate, IsString} from "class-validator";

export class CreateEventDto {
  @IsString({
    message: "Name must be type of string",
  })
  name: string;

  @IsString({
    message: "Place must be type of string",
    each: true,
  })
  places: string[];

  @IsDate({
    message: "Start date must be type of date",
  })
  startDate: Date;

  @IsDate({
    message: "Ending date must be type of date",
  })
  endingDate: Date;

  @IsString()
  description: string;
}
