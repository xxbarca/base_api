import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748691815611 implements MigrationInterface {
    name = 'Init1748691815611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sku\` DROP COLUMN \`category_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sku\` ADD \`category_id\` varchar(255) NOT NULL COMMENT '分类'`);
    }

}
