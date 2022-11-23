import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
    url:  process.env.DATABASE_TYPE +
            '://' +
            process.env.DATABASE_USERNAME +
            ':' +
            process.env.DATABASE_PASSWORD +
            '@' +
            process.env.DATABASE_HOST +
            ':' +
            process.env.DATABASE_PORT +
            '/' +
            process.env.DATABASE_NAME,
    type: 'postgres',
    logging: true,
    synchronize: false,
    entities: ['dist/src/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/migrations/*{.ts,.js}'],
    
  
    ssl: {
      rejectUnauthorized: false,
    },
  });