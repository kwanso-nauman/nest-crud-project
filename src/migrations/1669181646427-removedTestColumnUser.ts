import { MigrationInterface, QueryRunner } from "typeorm";

export class removedTestColumnUser1669181646427 implements MigrationInterface {
    name = 'removedTestColumnUser1669181646427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "test" character varying NOT NULL`);
    }

}
