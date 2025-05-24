import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748100924588 implements MigrationInterface {
    name = 'Init1748100924588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`banner\` ADD \`delete_time\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`banner\` ADD \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`banner\` ADD \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`delete_time\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`banner\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`banner\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`banner\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`banner\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`banner\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`banner\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`banner\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`banner\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`create_time\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`update_time\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`delete_time\``);
        await queryRunner.query(`ALTER TABLE \`banner\` DROP COLUMN \`create_time\``);
        await queryRunner.query(`ALTER TABLE \`banner\` DROP COLUMN \`update_time\``);
        await queryRunner.query(`ALTER TABLE \`banner\` DROP COLUMN \`delete_time\``);
    }

}
