import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1737087568853 implements MigrationInterface {
  name = 'Init1737087568853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`nickname\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`nickname\``);
  }
}
