import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1737515816594 implements MigrationInterface {
    name = 'Init1737515816594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permissions_roles\` (\`role_id\` varchar(36) NOT NULL, \`permission_id\` varchar(36) NOT NULL, INDEX \`IDX_e08f6859eaac8cbf7f087f64e2\` (\`role_id\`), INDEX \`IDX_3309f5fa8d95935f0701027f2b\` (\`permission_id\`), PRIMARY KEY (\`role_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` ADD CONSTRAINT \`FK_e08f6859eaac8cbf7f087f64e2b\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` ADD CONSTRAINT \`FK_3309f5fa8d95935f0701027f2bd\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permission\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` DROP FOREIGN KEY \`FK_3309f5fa8d95935f0701027f2bd\``);
        await queryRunner.query(`ALTER TABLE \`permissions_roles\` DROP FOREIGN KEY \`FK_e08f6859eaac8cbf7f087f64e2b\``);
        await queryRunner.query(`DROP INDEX \`IDX_3309f5fa8d95935f0701027f2b\` ON \`permissions_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_e08f6859eaac8cbf7f087f64e2\` ON \`permissions_roles\``);
        await queryRunner.query(`DROP TABLE \`permissions_roles\``);
    }

}
