/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : py_spider

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2019-12-09 16:53:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `kehuan2`
-- ----------------------------
DROP TABLE IF EXISTS `kehuan2`;
CREATE TABLE `kehuan2` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8mb4 NOT NULL,
  `down0` text CHARACTER SET utf8mb4,
  `down1` text CHARACTER SET utf8mb4,
  `down2` text CHARACTER SET utf8mb4,
  `down3` text CHARACTER SET utf8mb4,
  `down4` text CHARACTER SET utf8mb4,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2902 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of kehuan2
-- ----------------------------
