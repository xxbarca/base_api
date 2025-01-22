import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1737511563988 implements MigrationInterface {
    name = 'Init1737511563988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`component\` \`component\` varchar(255) NULL COMMENT '组件'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`path\` \`path\` varchar(255) NULL COMMENT '路径'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`path\` \`path\` varchar(255) NOT NULL COMMENT '路径'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`component\` \`component\` varchar(255) NOT NULL COMMENT '组件' DEFAULT 'LAYOUT'`);
    }

}
