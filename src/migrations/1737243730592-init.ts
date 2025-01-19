import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1737243730592 implements MigrationInterface {
    name = 'Init1737243730592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone\` \`phone\` varchar(255) NULL COMMENT '手机'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone\` \`phone\` varchar(255) NOT NULL COMMENT '手机'`);
    }

}
