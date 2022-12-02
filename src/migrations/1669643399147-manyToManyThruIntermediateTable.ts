import { MigrationInterface, QueryRunner } from "typeorm";

export class manyToManyThruIntermediateTable1669643399147 implements MigrationInterface {
    name = 'manyToManyThruIntermediateTable1669643399147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`);
        await queryRunner.query(`CREATE TABLE "OrderProducts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderId" uuid, "productId" uuid, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0f202de27bdbc849d330b4321a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "customerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "OrderProducts" ADD CONSTRAINT "FK_55d525397e97b7ee4b88e59a7b1" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "OrderProducts" ADD CONSTRAINT "FK_9bca88895f22823634a845baab1" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "OrderProducts" DROP CONSTRAINT "FK_9bca88895f22823634a845baab1"`);
        await queryRunner.query(`ALTER TABLE "OrderProducts" DROP CONSTRAINT "FK_55d525397e97b7ee4b88e59a7b1"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "customerId" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "OrderProducts"`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
