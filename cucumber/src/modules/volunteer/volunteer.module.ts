import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {VolunteerController} from "./volunteer.controller";
import {Volunteer} from "./entities";

@Module({
  imports: [TypeOrmModule.forFeature([Volunteer])],
  controllers: [VolunteerController],
})
export class VolunteerModule {}
