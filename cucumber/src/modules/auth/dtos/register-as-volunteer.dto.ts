import {IsString, Matches, MaxLength, MinLength} from "class-validator";

import {regex} from "@lib/regex";

export class RegisterAsVolunteerDto {
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
    message: "First name be a type of string",
  })
  @MinLength(4, {
    message: "First name contain at least 4 characters",
  })
  @MaxLength(48, {
    message: "First name must contain at most 16 characters",
  })
  firstName: string;

  @IsString({
    message: "Last name must be a type of string",
  })
  @MinLength(4, {
    message: "Last name must contain at least 4 characters",
  })
  @MaxLength(48, {
    message: "Last name must contain at most 16 characters",
  })
  lastName: string;

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
