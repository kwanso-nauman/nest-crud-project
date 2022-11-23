// export default () => {

//     let database: any;
//     if (process.env.NODE_ENV === "production") {
//       database = {
//         type: process.env.DATABASE_TYPE || "postgres",
//         url: process.env.DATABASE_URL || "",
//         migrationsRun: true,
//         ssl: {
//           rejectUnauthorized: false,
//         },
//         logging: true,
//         migrations: ["dist/migrations/*{.ts,.js}"],
//         entities: ["dist/**/*.entity{.ts,.js}"],
//       };
      
//     } else {
//       database = {
//         host: process.env.DATABASE_HOST || "localhost",
//         port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
//         type: process.env.DATABASE_TYPE || "postgres",
//         username: process.env.DATABASE_USERNAME || "postgres",
//         password: process.env.DATABASE_PASSWORD || "password",
//         database: process.env.DATABASE_NAME || "emr-pro",
//         timezone: 'Z',
//         migrationsRun: true,
//         logging: true,
//         migrations: ["dist/migrations/*{.ts,.js}"],
//         entities: ["dist/**/*.entity{.ts,.js}"],
//       };
//     }
  
//     return {
//       PORT: parseInt(process.env.PORT, 10) || 3001,
//       database,
//     };
//   };