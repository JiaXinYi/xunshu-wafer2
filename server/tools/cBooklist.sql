/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cBooklist`
-- ----------------------------
-- 没有自动执行，复制到数据库执行
DROP TABLE IF EXISTS `cBooklist`;
CREATE TABLE `cBooklist` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `book_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `book_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  `states` boolean NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户保存拥有的书单列表';

SET FOREIGN_KEY_CHECKS = 1;

DROP TABLE IF EXISTS `cWantlist`;
CREATE TABLE `cWantlist` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `book_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `book_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  `states` boolean NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户想交换的书单列表';

SET FOREIGN_KEY_CHECKS = 1;


DROP TABLE IF EXISTS `cMessagelist`;
CREATE TABLE `cMessagelist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `to_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message_text` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  `states` boolean NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='信息列表';

SET FOREIGN_KEY_CHECKS = 1;