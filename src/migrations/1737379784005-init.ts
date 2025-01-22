import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1737379784005 implements MigrationInterface {
    name = 'Init1737379784005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permission\` (\`id\` varchar(36) NOT NULL, \`component\` varchar(255) NOT NULL COMMENT '组件' DEFAULT 'LAYOUT', \`icon\` varchar(255) NULL COMMENT 'icon', \`name\` varchar(255) NOT NULL COMMENT '名称', \`orderNo\` int NOT NULL COMMENT '排序', \`path\` varchar(255) NOT NULL COMMENT '路径', \`status\` enum ('1', '0') NOT NULL COMMENT '是否禁用' DEFAULT '1', \`type\` enum ('FOLDER', 'MENU', 'BUTTON') NOT NULL COMMENT '组件类型' DEFAULT 'FOLDER', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`parentId\` varchar(36) NULL, UNIQUE INDEX \`IDX_96b2ab97632f2ce53c52a68f48\` (\`component\`), UNIQUE INDEX \`IDX_240853a0c3353c25fb12434ad3\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`status\` \`status\` enum ('1', '0') NOT NULL COMMENT '状态' DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_41c446d29bbb76111ace88bcc59\` FOREIGN KEY (\`parentId\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_41c446d29bbb76111ace88bcc59\``);
        await queryRunner.query(`ALTER TABLE \`role\` CHANGE \`status\` \`status\` enum ('0', '1') NOT NULL COMMENT '状态' DEFAULT '0'`);
        await queryRunner.query(`DROP INDEX \`IDX_240853a0c3353c25fb12434ad3\` ON \`permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_96b2ab97632f2ce53c52a68f48\` ON \`permission\``);
        await queryRunner.query(`DROP TABLE \`permission\``);
    }

}
