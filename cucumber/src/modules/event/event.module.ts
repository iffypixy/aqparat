import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {Event, EventVolunteer} from "./entities";

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventVolunteer])],
})
export class EventModule {}
