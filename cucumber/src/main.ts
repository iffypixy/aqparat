import {NestFactory} from "@nestjs/core";
import * as sess from "express-session";
import * as connectRedis from "connect-redis";
import Redis from "ioredis";

import {AppModule} from "@modules/app";

const month = 2629800000;

const RedisStore = connectRedis(sess);

const session = (client) =>
  sess({
    store: new RedisStore({client}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: month,
      httpOnly: true,
    },
  });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: process.env.CLIENT_ORIGIN,
    },
  });

  const redis = new Redis({
    host: "127.0.0.1",
    port: 6379,
  });

  app.use(session(redis));

  await app.listen(5000);
}

bootstrap();
