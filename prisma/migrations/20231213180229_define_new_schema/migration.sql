/*
  Warnings:

  - You are about to drop the column `data_atualizacao` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `data_criacao` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `ultimo_login` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "data_atualizacao",
DROP COLUMN "data_criacao",
DROP COLUMN "telefone",
DROP COLUMN "ultimo_login";
