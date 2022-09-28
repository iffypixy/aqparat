import {Injectable, CanActivate, ExecutionContext} from "@nestjs/common";
import {Request} from "express";

@Injectable()
export class IsOrganisation implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();

    return req.session.type === "organisation";
  }
}
