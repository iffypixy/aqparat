import {IsString} from "class-validator";

export class AddVolunteerToEventDto {
  @IsString({
    message: "Volunteer id must be type of string",
  })
  volunteerId: string;
}
