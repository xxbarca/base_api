import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1750076975225 implements MigrationInterface {
    name = 'Init1750076975225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`spu_key\` (\`spu_id\` varchar(36) NOT NULL, \`spec_key_id\` varchar(36) NOT NULL, INDEX \`IDX_6ba48ca187f1be5457e3d7d6fd\` (\`spu_id\`), INDEX \`IDX_c6fc05eadfa669cb70ff3926e9\` (\`spec_key_id\`), PRIMARY KEY (\`spu_id\`, \`spec_key_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`spu_key\` ADD CONSTRAINT \`FK_6ba48ca187f1be5457e3d7d6fd5\` FOREIGN KEY (\`spu_id\`) REFERENCES \`spu\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`spu_key\` ADD CONSTRAINT \`FK_c6fc05eadfa669cb70ff3926e94\` FOREIGN KEY (\`spec_key_id\`) REFERENCES \`spec_key\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`spu_key\` DROP FOREIGN KEY \`FK_c6fc05eadfa669cb70ff3926e94\``);
        await queryRunner.query(`ALTER TABLE \`spu_key\` DROP FOREIGN KEY \`FK_6ba48ca187f1be5457e3d7d6fd5\``);
        await queryRunner.query(`DROP INDEX \`IDX_c6fc05eadfa669cb70ff3926e9\` ON \`spu_key\``);
        await queryRunner.query(`DROP INDEX \`IDX_6ba48ca187f1be5457e3d7d6fd\` ON \`spu_key\``);
        await queryRunner.query(`DROP TABLE \`spu_key\``);
    }

}
