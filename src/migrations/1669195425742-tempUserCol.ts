import { MigrationInterface, QueryRunner } from "typeorm";

export class tempUserCol1669195425742 implements MigrationInterface {
    name = 'tempUserCol1669195425742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "temp" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "temp"`);
    }

}
