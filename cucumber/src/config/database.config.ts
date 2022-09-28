import {registerAs} from "@nestjs/config";

export const databaseConfig = registerAs("db", () => {
  const env = process.env;

  return {
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT, 10),
    name: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    synchronize: JSON.parse(env.DB_SYNCHRONIZE.toLowerCase()),
  };
});
