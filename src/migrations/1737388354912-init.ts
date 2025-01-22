import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1737388354912 implements MigrationInterface {
    name = 'Init1737388354912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`orderNo\` \`orderNo\` int NOT NULL COMMENT '排序' DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`type\` \`type\` enum ('1', '2', '3') NOT NULL COMMENT '组件类型' DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`type\` \`type\` enum ('FOLDER', 'MENU', 'BUTTON') NOT NULL COMMENT '组件类型' DEFAULT 'FOLDER'`);
        await queryRunner.query(`ALTER TABLE \`permission\` CHANGE \`orderNo\` \`orderNo\` int NOT NULL COMMENT '排序'`);
    }

}
