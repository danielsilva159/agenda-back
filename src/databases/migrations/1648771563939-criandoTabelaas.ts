import {MigrationInterface, QueryRunner} from "typeorm";

export class criandoTabelaas1648771563939 implements MigrationInterface {
    name = 'criandoTabelaas1648771563939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ee293a06076c7f1cdeb7fcbc774" UNIQUE ("email"), CONSTRAINT "PK_b8032a3a700575eaa4722bf3801" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tb_pessoas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "email" character varying NOT NULL, "telefone" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT '"2022-04-01T00:06:07.308Z"', "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_b0df89290e08a9a7ffdc5ec83cf" UNIQUE ("nome"), CONSTRAINT "UQ_bdba150749be4a84839f9a80067" UNIQUE ("email"), CONSTRAINT "UQ_1bfb46ab54309636cf97ef373c1" UNIQUE ("telefone"), CONSTRAINT "PK_8466d9c4160e38d5cae465b9a17" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tb_pessoas" ADD CONSTRAINT "FK_819cf5d8c320f6e27d4c5c8a27a" FOREIGN KEY ("userId") REFERENCES "tb_usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_pessoas" DROP CONSTRAINT "FK_819cf5d8c320f6e27d4c5c8a27a"`);
        await queryRunner.query(`DROP TABLE "tb_pessoas"`);
        await queryRunner.query(`DROP TABLE "tb_usuarios"`);
    }

}
