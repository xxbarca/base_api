import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748413311177 implements MigrationInterface {
    name = 'Init1748413311177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`spec_value\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`value\` varchar(255) NOT NULL COMMENT '规格值', \`key_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`spec_key\` (\`id\` varchar(36) NOT NULL, \`delete_time\` datetime(6) NULL, \`update_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`create_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(100) NOT NULL, \`unit\` varchar(30) NULL, UNIQUE INDEX \`IDX_0fd84a16b1a7804a523bd329ff\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`spec_value\` ADD CONSTRAINT \`FK_04ffe35928cf7e3766eb9e4d4bd\` FOREIGN KEY (\`key_id\`) REFERENCES \`spec_key\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spec_value\` DROP FOREIGN KEY \`FK_04ffe35928cf7e3766eb9e4d4bd\``);
        await queryRunner.query(`DROP INDEX \`IDX_0fd84a16b1a7804a523bd329ff\` ON \`spec_key\``);
        await queryRunner.query(`DROP TABLE \`spec_key\``);
        await queryRunner.query(`DROP TABLE \`spec_value\``);
    }

}
