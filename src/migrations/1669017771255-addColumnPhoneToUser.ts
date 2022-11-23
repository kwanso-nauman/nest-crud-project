import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnPhoneToUser1669017771255 implements MigrationInterface {
    name = 'addColumnPhoneToUser1669017771255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    }

}
