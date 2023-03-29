// ! This config use for seeding Typeorm
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.STAGE}` });

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['src/**/entities/*.entity.{js,ts}'],
  seeds: ['db/seeding/seeds/**/*{.ts,.js}'],
  factories: ['db/seeding/factories/**/*{.ts,.js}'],
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
