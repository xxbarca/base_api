import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1738034607052 implements MigrationInterface {
    name = 'Init1738034607052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` ADD \`value\` varchar(255) NULL COMMENT '权限值, 一般针对按钮'`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD UNIQUE INDEX \`IDX_bb910d71d33fd5705d93055e74\` (\`value\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` DROP INDEX \`IDX_bb910d71d33fd5705d93055e74\``);
        await queryRunner.query(`ALTER TABLE \`permission\` DROP COLUMN \`value\``);
    }

}
