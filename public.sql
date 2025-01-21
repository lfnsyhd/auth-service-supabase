/*
 Navicat Premium Dump SQL

 Source Server         : postgres
 Source Server Type    : PostgreSQL
 Source Server Version : 170002 (170002)
 Source Host           : localhost:5432
 Source Catalog        : auth_jwt_db
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 170002 (170002)
 File Encoding         : 65001

 Date: 21/01/2025 17:29:54
*/


-- ----------------------------
-- Sequence structure for Users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Users_id_seq";
CREATE SEQUENCE "public"."Users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS "public"."Users";
CREATE TABLE "public"."Users" (
  "id" int4 NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "email" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "role" varchar(255) COLLATE "pg_catalog"."default" NOT NULL DEFAULT 'user'::character varying,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of Users
-- ----------------------------
INSERT INTO "public"."Users" VALUES (1, 'Alfan Syahada', 'alfan@test.net', '$2a$10$6K0XehRa.0ft5Sk5CP4bWuxs7ESWjPNn1wCn4EgUWBr9Bp.3sP26q', 'user', '2025-01-20 18:31:52.058+07', '2025-01-20 18:31:52.058+07');
INSERT INTO "public"."Users" VALUES (2, 'Admin', 'alfan2@test.net', '$2a$10$WpaVc/C9wK0V2Yzwg6PYpOY72VZxsQtzfpY8D0Ioyin0R6TzndlJm', 'user', '2025-01-20 18:34:32.989+07', '2025-01-20 18:34:32.989+07');
INSERT INTO "public"."Users" VALUES (3, 'Admin', 'alfan3@test.net', '$2a$10$RSg8w/nHPXQZIMNYEu/WmOkEwcgUNDw8WJJj295FSzaZOY1Xma2Vm', 'user', '2025-01-20 18:35:11.918+07', '2025-01-20 18:35:11.918+07');
INSERT INTO "public"."Users" VALUES (4, 'Alfan Syahada', 'alfan9@test.net', '$2a$10$3OXTWvqtc/IAOKrWws1BXuSP.cxbzRe58INGUn9dGmfGQ5g4cfMxe', 'user', '2025-01-20 18:36:16.25+07', '2025-01-20 18:36:16.25+07');
INSERT INTO "public"."Users" VALUES (5, 'Admin', 'admin@gmail.com', '$2a$10$EkudUz4L/.PEu89P7eJr1eSbsemqM7ET76ozllv76CkH79DgzXDsy', 'user', '2025-01-20 18:59:04.056+07', '2025-01-20 18:59:04.056+07');
INSERT INTO "public"."Users" VALUES (6, 'Admin', 'admin@mail.com', '$2a$10$M24K1Ip8foA5Bxhdv/JChO6Foghah2atNJ5iJcjrzCjBXvOY.VveS', 'admin', '2025-01-20 19:00:35.84+07', '2025-01-20 19:00:35.84+07');
INSERT INTO "public"."Users" VALUES (7, 'Alfan Syahada', 'alfan2@mail.com', '$2a$10$XVKFQqBf6Jj//PFP98ASYuzB0wx4JedaxA1PQ5SuZlrwkScNR1jtq', 'user', '2025-01-20 19:18:33.456+07', '2025-01-20 19:18:33.456+07');
INSERT INTO "public"."Users" VALUES (9, 'Alfan Syahada', 'alfansyahadahu@gmail.com', '$2a$10$X5r4EP7G2HQ7PymOSYPgAehzyoiCRJBRNeBQk15e4alHYWYKuK6vy', 'user', '2025-01-20 23:53:34.852+07', '2025-01-20 23:53:34.852+07');
INSERT INTO "public"."Users" VALUES (10, 'Putri Desi', 'putrids@gmail.com', '$2a$10$6GTbJ9wjnYd2slozkfNG6uVDYyNv58V4CWTO/wJ6Z.A4h89hsJdGC', 'user', '2025-01-21 01:48:55.99+07', '2025-01-21 01:48:55.99+07');
INSERT INTO "public"."Users" VALUES (8, 'Admin', 'admin@hotmail.com', '$2a$10$MHEqCnfCZf3lIZj4a/PPWeLOviCkO6/wy6fYAD0mjDeZOgmVyZhnW', 'admin', '2025-01-20 22:25:57.436+07', '2025-01-20 22:25:57.436+07');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Users_id_seq"
OWNED BY "public"."Users"."id";
SELECT setval('"public"."Users_id_seq"', 10, true);

-- ----------------------------
-- Uniques structure for table Users
-- ----------------------------
ALTER TABLE "public"."Users" ADD CONSTRAINT "Users_email_key" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table Users
-- ----------------------------
ALTER TABLE "public"."Users" ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");
