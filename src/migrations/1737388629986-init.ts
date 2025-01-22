import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1737388629986 implements MigrationInterface {
    name = 'Init1737388629986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_96b2ab97632f2ce53c52a68f48\` ON \`permission\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_96b2ab97632f2ce53c52a68f48\` ON \`permission\` (\`component\`)`);
    }

}
