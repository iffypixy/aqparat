import {IsString} from "class-validator";

export class AddImageDto {
  @IsString({
    message: "Image url must be type of string",
  })
  url: string;
}
