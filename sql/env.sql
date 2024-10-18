CREATE TABLE `env` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appid` varchar(32) DEFAULT NULL COMMENT '应用id',
  `name` varchar(64) DEFAULT NULL,
  `check_status` int DEFAULT '0' COMMENT '审核状态',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_appid` (`appid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
