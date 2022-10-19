import {IsString} from "class-validator";

export class AcceptInvitationDto {
  @IsString()
  id: string;
}
