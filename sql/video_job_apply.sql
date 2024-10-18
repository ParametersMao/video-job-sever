CREATE TABLE `video_job_apply` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
 
    `jobId` INT NOT NULL COMMENT '职位ID',
    `cmpName` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '公司名称',
    `jobTitle` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '工作名称',
    `imgUrl` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '职位icon',
    
    -- 用户信息快照
    `appname` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '应用名称',
    `platform` VARCHAR(16) NOT NULL DEFAULT '' COMMENT '平台',
    `userid` VARCHAR(64) NOT NULL DEFAULT '',
    `email` VARCHAR(64) DEFAULT NULL COMMENT '用户邮箱',
    `nickname` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '用户昵称',
    `realname` VARCHAR(64) NOT NULL DEFAULT '' COMMENT '用户真实姓名',
    `birthday` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '用户生日',
    `gender` VARCHAR(16) NOT NULL DEFAULT '' COMMENT '用户报名性别',
    `age` INT NOT NULL DEFAULT 0 COMMENT '用户年龄',
    `sex` INT NOT NULL DEFAULT 0 COMMENT '用户性别',
    `phone` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '用户电话',

    `status` INT NOT NULL DEFAULT 1,
    
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    
    PRIMARY KEY (`id`),
    KEY `idx_jobId` (`jobId`),
    KEY `idx_userId` (`userId`),
    CONSTRAINT `fk_video_job_apply_jobId` FOREIGN KEY (`jobId`) REFERENCES `video_job_postings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='视频职位申请表';


-- 新增字段
ALTER TABLE `chatgpt`.`video_job_apply` 
ADD COLUMN `birthday` VARCHAR(32) NULL DEFAULT '' AFTER `realname`,
ADD COLUMN `gender` VARCHAR(16) NULL DEFAULT '' AFTER `birthday`;