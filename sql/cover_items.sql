CREATE TABLE `cover_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `goods_id` varchar(64)   NOT NULL DEFAULT '' COMMENT '商品id即红包封面id',
  `serial` varchar(64)  DEFAULT '' COMMENT '红包封面序列号',
  `status` int  NOT NULL DEFAULT '1' COMMENT '状态:1待领取 2:已领取',
  `user` varchar(64)  NOT NULL DEFAULT '' COMMENT '领取人,抖音openid',
  `count` int NOT NULL DEFAULT 0 COMMENT '序列号可使用次数',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;