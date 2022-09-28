import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {File} from "./entities";

@Module({
  imports: [TypeOrmModule.forFeature([File])],
})
export class FileModule {}
