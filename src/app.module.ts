import { Module } from "@nestjs/common";
// import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import configuration from "./config/configuration";
import { OrderModule } from "./order/order.module";
import { ProductsModule } from "./products/products.module";
import { dataSourceOptions } from "./dataSource/data-source";

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal:true,
    //   load:[configuration]
    // }),
    TypeOrmModule.forRoot(dataSourceOptions),
    OrderModule,
    // ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
