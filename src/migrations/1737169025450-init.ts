import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1737169025450 implements MigrationInterface {
  name = 'Init1737169025450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`accessToken\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`refreshToken\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`refreshToken\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`accessToken\``);
  }
}
