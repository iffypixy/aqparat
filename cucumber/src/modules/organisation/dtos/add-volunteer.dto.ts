import {IsString} from "class-validator";

export class AddVolunteerDto {
  @IsString({
    message: "Volunteer id must be type of string",
  })
  volunteerId: string;
}
