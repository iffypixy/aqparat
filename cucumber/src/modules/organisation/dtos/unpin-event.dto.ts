import {IsString} from "class-validator";

export class UnpinEventDto {
  @IsString({
    message: "Event id must be type of string",
  })
  eventId: string;
}
