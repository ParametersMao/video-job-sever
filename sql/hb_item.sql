CREATE TABLE `hb_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hbId` varchar(64) NOT NULL DEFAULT '' COMMENT '红包封面ID',
  `name` varchar(64) NOT NULL DEFAULT '' COMMENT '红包封面名称',
  `src` varchar(128) DEFAULT '' COMMENT '红包封面图片url',
  `type` int NOT NULL DEFAULT '0' COMMENT '类型 0:初始值 1:免费 2:广告 3:付费',
  `status` int NOT NULL DEFAULT '1' COMMENT '状态 0:待上线 1:上线中 2:已下线',
  `startTime` varchar(64) NOT NULL DEFAULT '' COMMENT '开始时间',
  `wxLink` varchar(128) DEFAULT '' COMMENT '微信红包链接',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_hbId` (`hbId`) COMMENT '唯一索引'
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
