import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1749096701781 implements MigrationInterface {
    name = 'Init1749096701781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL COMMENT '用户名', \`password\` varchar(255) NOT NULL COMMENT '密码', \`nickname\` varchar(255) NOT NULL COMMENT '昵称', \`email\` varchar(255) NULL COMMENT '邮箱', \`phone\` varchar(255) NULL COMMENT '手机', \`avatar\` varchar(255) NULL COMMENT '头像', UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
