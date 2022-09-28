import {IsString, Matches, MaxLength, MinLength} from "class-validator";

import {regex} from "@lib/regex";

export class RegisterAsOrgDto {
  @IsString({
    message: "Email must be a type of string",
  })
  @Matches(regex.email, {
    message: "Email must be valid",
  })
  @MinLength(4, {
    message: "Email must contain at least 4 characters",
  })
  @MaxLength(16, {
    message: "Email must contain at most 16 characters",
  })
  email: string;

  @IsString({
    message: "Name must be a type of string",
  })
  @MinLength(4, {
    message: "Name must contain at least 4 characters",
  })
  @MaxLength(48, {
    message: "Name must contain at most 16 characters",
  })
  name: string;

  @IsString({
    message: "Password must be a type of string",
  })
  @MinLength(8, {
    message: "Password must contain at least 8 characters",
  })
  @MaxLength(50, {
    message: "Password must contain at most 50 characters",
  })
  password: string;
}
