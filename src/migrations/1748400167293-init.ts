import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748400167293 implements MigrationInterface {
    name = 'Init1748400167293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`banner\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL COMMENT '名称', \`description\` text NULL COMMENT '描述', \`index\` int NOT NULL COMMENT '排序' DEFAULT '0', \`img\` varchar(255) NULL COMMENT '图片', \`online\` enum ('0', '1') NOT NULL COMMENT '是否上线' DEFAULT '1', \`parent_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD CONSTRAINT \`FK_1117b4fcb3cd4abb4383e1c2743\` FOREIGN KEY (\`parent_id\`) REFERENCES \`category\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP FOREIGN KEY \`FK_1117b4fcb3cd4abb4383e1c2743\``);
        await queryRunner.query(`DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`banner\``);
    }

}
