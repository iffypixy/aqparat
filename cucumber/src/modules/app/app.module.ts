import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";

import {s3Config, databaseConfig} from "@config/s3.config";
import {EventModule, Event, EventVolunteer} from "@modules/event";
import {
  OrganisationModule,
  Organisation,
  OrganisationProfile,
  OrganisationVolunteer,
  OrganisationInvitation,
} from "@modules/organisation";
import {VolunteerModule, Volunteer} from "@modules/volunteer";
import {AuthModule} from "@modules/auth";
import {File} from "@modules/file";

const env = process.env.NODE_ENV || "development";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${env}`,
      load: [databaseConfig, s3Config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("db.host"),
        port: configService.get<number>("db.port"),
        username: configService.get<string>("db.user"),
        password: configService.get<string>("db.password"),
        database: configService.get<string>("db.name"),
        synchronize: configService.get<boolean>("db.synchronize"),
        entities: [
          Event,
          EventVolunteer,
          Organisation,
          OrganisationProfile,
          Volunteer,
          OrganisationVolunteer,
          File,
          OrganisationVolunteer,
          OrganisationInvitation,
        ],
      }),
    }),
    VolunteerModule,

    OrganisationModule,
    EventModule,
    AuthModule,
  ],
})
export class AppModule {}
