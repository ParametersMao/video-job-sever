CREATE TABLE `video_job_article` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    
    `appId` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '应用ID',
    `pubId` INT NOT NULL DEFAULT 0 COMMENT '发布者ID',
    `typeId` INT NOT NULL DEFAULT 0 COMMENT '文章类型ID',
    
    `title` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '文章标题',
    `imgUrl` VARCHAR(255) DEFAULT '' COMMENT '文章封面图片URL',
    `url` VARCHAR(255) DEFAULT '' COMMENT '文章详情URL',
    `simpleDetail` TEXT COMMENT '文章简要描述',
    
    `pubTime` INT NOT NULL DEFAULT 0 COMMENT '发布时间',
    `readTimes` INT NOT NULL DEFAULT 0 COMMENT '阅读次数',
    
    `status` TINYINT NOT NULL DEFAULT 1 COMMENT '状态',
    
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    PRIMARY KEY (`id`),
    KEY `idx_appId` (`appId`),
    KEY `idx_pubId` (`pubId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='视频工作文章表';


INSERT INTO `video_job_article` (`appId`, `id`, `imgUrl`, `pubId`, `pubTime`, `readTimes`, `simpleDetail`, `status`, `title`, `typeId`, `url`) 
VALUES 
('videoCut', 34, 'https://img.taomile.cn/v/4/5.png', 1, 5, 7586, '学做视频剪辑包括学习剪辑软件和剪辑思维，\n\n以我自己的经验来说，建议新手把更多的精力\n\n放在学习剪辑思维上。因为软件只是个工具，\n\n学起来很简单，但剪辑的理念与想法，', 5, '零基础小白怎么学做剪辑？这篇文章带你走进来', 1, 'https://www.taomile.cn/ac/index.html#/jianji5'),
('videoCut', 33, 'https://img.taomile.cn/v/4/4.png', 1, 4, 1921, '大部分人对影视后期的理解停留于电视剧、\n\n电影领域内，认为影视后期只是专门为\n\n影视作品服务的，其实不然，\n\n科技的发展让传播形式出现了翻天覆地的变化，\n\n影视后期也随之扩大了涵盖的范围', 5, '看完这篇文章，就会了解到剪辑的艺术了', 1, 'https://www.taomile.cn/ac/index.html#/jianji4'),
('videoCut', 32, 'https://img.taomile.cn/v/4/3.png', 1, 3, 2671, '新手入门剪辑三要素：软件、教程、素材，\n\n看这篇文章就够了。一台电脑+足够的时间，\n\n我已兼职入坑剪辑一年有余了，小赚了一笔，', 5, '新手入门剪辑三要素：软件、教程、素材，看这篇文章就够了', 1, 'https://www.taomile.cn/ac/index.html#/jianji3'),
('videoCut', 35, 'https://img.taomile.cn/v/4/6.png', 1, 3, 1664, '剪辑一种特殊的蒙太奇手法，是由特写镜头\n\n直接跳切到全景镜头或由全景镜头直接跳切到\n\n特写镜头的组接形式。\n\n两极镜头的组接能使剧情的发展在动中转静\n\n或在静中变动，产生特殊的艺术效果。', 5, '剪辑频道】视频剪辑技巧分享', 1, 'https://www.taomile.cn/ac/index.html#/jianji6'),
('videoCut', 31, 'https://img.taomile.cn/v/4/2.png', 1, 2, 1594, '即将和视频后期打交道的朋友们好，\n\n今天这篇文章完全是为你们而写。\n\n如果不了解AE和PR的功能和应用领域，', 5, '以后请不要问我AE和PR有什么区别了', 1, 'https://www.taomile.cn/ac/index.html#/jianji2'),
('videoCut', 30, 'https://img.taomile.cn/v/4/1.png', 1, 1, 1968, '在使用Pr的过程中，走过不少弯路，\n\n快捷键能够极大的提升我们的工作效率。\n\n注意快捷键要在英文输入模式下使用。', 5, '20个必备的Pr快捷键', 1, 'https://www.taomile.cn/ac/index.html#/jianji1');
