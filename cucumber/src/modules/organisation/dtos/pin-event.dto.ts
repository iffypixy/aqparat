import {IsString} from "class-validator";

export class PinEventDto {
  @IsString({
    message: "Event id must be type of string",
  })
  eventId: string;
}
