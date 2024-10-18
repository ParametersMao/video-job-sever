CREATE TABLE `douyin_user_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_id` varchar(64)   NOT NULL DEFAULT '' COMMENT '抖音小程序app_id',
  `app_name` varchar(64)  DEFAULT '' COMMENT '抖音小程序名称',
  `uid` varchar(32)  NOT NULL COMMENT '用户uid',
  `openid` varchar(64)  NOT NULL DEFAULT '' COMMENT '抖音openid',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



