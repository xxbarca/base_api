import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748416423809 implements MigrationInterface {
    name = 'Init1748416423809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`spu\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`title\` varchar(100) NOT NULL, \`subtitle\` varchar(800) NULL, \`category_id\` varchar(255) NOT NULL, \`root_category_id\` varchar(255) NULL, \`online\` enum ('0', '1') NOT NULL COMMENT '是否上线' DEFAULT '1', \`price\` varchar(20) NOT NULL COMMENT '价格', \`sketch_spec_id\` varchar(255) NULL COMMENT '某种规格可以直接附加单品图片', \`default_sku_id\` varchar(255) NULL COMMENT '默认选中的SKU', \`img\` varchar(255) NULL COMMENT '图片', \`discount_price\` varchar(20) NULL COMMENT '价格', \`description\` text NULL COMMENT '描述', \`tags\` varchar(255) NULL COMMENT 'TAG', UNIQUE INDEX \`IDX_4b4a83a7df70c58102259c250f\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_4b4a83a7df70c58102259c250f\` ON \`spu\``);
        await queryRunner.query(`DROP TABLE \`spu\``);
    }

}
