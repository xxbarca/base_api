import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1749645831429 implements MigrationInterface {
    name = 'Init1749645831429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`menu\` (\`id\` varchar(36) NOT NULL, \`component\` varchar(255) NULL COMMENT '组件', \`value\` varchar(255) NULL COMMENT '权限值, 一般针对按钮', \`icon\` varchar(255) NULL COMMENT 'icon', \`name\` varchar(255) NOT NULL COMMENT '名称', \`orderNo\` int NOT NULL COMMENT '排序' DEFAULT '1', \`path\` varchar(255) NULL COMMENT '路径', \`status\` enum ('1', '0') NOT NULL COMMENT '是否禁用' DEFAULT '1', \`type\` enum ('0', '1', '2') NOT NULL COMMENT '组件类型' DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`parent_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_7df575a48dedaea3e65cb6d05a\` (\`value\`), UNIQUE INDEX \`IDX_51b63874cdce0d6898a0b2150f\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD CONSTRAINT \`FK_e5e28130fd17f88ab5ee5d3aa4c\` FOREIGN KEY (\`parent_id\`) REFERENCES \`menu\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP FOREIGN KEY \`FK_e5e28130fd17f88ab5ee5d3aa4c\``);
        await queryRunner.query(`DROP INDEX \`IDX_51b63874cdce0d6898a0b2150f\` ON \`menu\``);
        await queryRunner.query(`DROP INDEX \`IDX_7df575a48dedaea3e65cb6d05a\` ON \`menu\``);
        await queryRunner.query(`DROP TABLE \`menu\``);
    }

}
