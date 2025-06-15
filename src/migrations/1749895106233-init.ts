import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1749895106233 implements MigrationInterface {
    name = 'Init1749895106233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`spu\` ADD \`category_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`spu\` ADD CONSTRAINT \`FK_784f2f5bc032030a63e0a53ccfe\` FOREIGN KEY (\`category_id\`) REFERENCES \`category\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu\` DROP FOREIGN KEY \`FK_784f2f5bc032030a63e0a53ccfe\``);
        await queryRunner.query(`ALTER TABLE \`spu\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`spu\` ADD \`category_id\` varchar(255) NOT NULL`);
    }

}
