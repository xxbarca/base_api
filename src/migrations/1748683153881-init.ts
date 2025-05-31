import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748683153881 implements MigrationInterface {
    name = 'Init1748683153881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sku\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`title\` varchar(100) NOT NULL, \`price\` varchar(20) NOT NULL COMMENT '价格', \`discount_price\` varchar(20) NULL COMMENT '价格', \`online\` enum ('0', '1') NOT NULL COMMENT '是否上线' DEFAULT '1', \`img\` varchar(255) NULL COMMENT '图片', \`category_id\` varchar(255) NOT NULL COMMENT '分类', \`stock\` int NOT NULL COMMENT '库存', \`specs\` json NOT NULL COMMENT 'spec', \`spu_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_10e129f02b3e39cf52f8d262b2\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sku\` ADD CONSTRAINT \`FK_00d9fde2f97eec3035b6aace347\` FOREIGN KEY (\`spu_id\`) REFERENCES \`spu\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sku\` DROP FOREIGN KEY \`FK_00d9fde2f97eec3035b6aace347\``);
        await queryRunner.query(`DROP INDEX \`IDX_10e129f02b3e39cf52f8d262b2\` ON \`sku\``);
        await queryRunner.query(`DROP TABLE \`sku\``);
    }

}
