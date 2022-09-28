import {IsIn, IsString, Matches} from "class-validator";

import {regex} from "@lib/regex";
import {UserType} from "@modules/user";

export class LoginDto {
  @IsString({
    message: "Email must be a type of string",
  })
  @Matches(regex.email, {
    message: "Email must be valid",
  })
  email: string;

  @IsString({
    message: "Password must be a type of string",
  })
  password: string;

  @IsIn(["organisation", "volunteer"] as UserType[])
  type: UserType;
}
