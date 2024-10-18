CREATE TABLE `video_job_postings` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `applyCount` INT NOT NULL DEFAULT 0 COMMENT '申请次数',
  `cmpName` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '公司名称',
  `ico` VARCHAR(255) DEFAULT '' COMMENT '公司图标URL',
  `imgUrl` VARCHAR(255) DEFAULT '' COMMENT '图片URL',
  `jobtypeName` VARCHAR(100) DEFAULT '' COMMENT '职位类型名称',
  `recommed` TINYINT NOT NULL DEFAULT 0 COMMENT '推荐标志',
  `salary` INT NOT NULL DEFAULT 0 COMMENT '薪资',
  `salaryunit` VARCHAR(10) DEFAULT '' COMMENT '薪资单位',
  `title` VARCHAR(255) DEFAULT '' COMMENT '职位标题',
  `userId` INT NOT NULL DEFAULT 0 COMMENT '用户ID',
  `videoUrl` VARCHAR(255) DEFAULT '' COMMENT '视频URL',
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


INSERT INTO `video_job_postings` (
    `applyCount`,
    `cmpName`,
    `ico`,
    `imgUrl`,
    `jobtypeName`,
    `recommed`,
    `salary`,
    `salaryunit`,
    `title`,
    `userId`,
    `videoUrl`
) VALUES (
    1809,
    '胜我教育',
    'https://img.taomile.cn/3191803/1713942383216.jpg',
    'https://img.taomile.cn/sw/1716287848357_23195_admin.png',
    '插画师',
    0,
    40000,
    '天',
    '需电脑/插画兼职/在家学习可单结',
    3191803,
    'https://img.taomile.cn/sw/1716287853697_23195_admin.mp4'
);