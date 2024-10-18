CREATE TABLE `video_job_detail` (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `jobId` INT NOT NULL COMMENT '职位ID',
    `applyCount` INT NOT NULL DEFAULT 0 COMMENT '申请次数',
    `applyStatus` TINYINT NOT NULL DEFAULT -1 COMMENT '申请状态',
    `autopass` TINYINT NOT NULL DEFAULT 1 COMMENT '自动通过标志',
    `cityid` INT NOT NULL DEFAULT -1 COMMENT '城市ID',
    `cmpId` INT NOT NULL DEFAULT 0 COMMENT '公司ID',
    `cmpname` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '公司名称',
    `collected` TINYINT NOT NULL DEFAULT 0 COMMENT '收藏状态',
    `concatName` VARCHAR(32) DEFAULT '' COMMENT '联系人',
    `concatAvatar` VARCHAR(255) DEFAULT '' COMMENT '联系人头像',
    `concatPhone` VARCHAR(32) DEFAULT '' COMMENT '联系电话',
    `concatWx` VARCHAR(255) DEFAULT '' COMMENT '微信联系方式',
    `education` VARCHAR(50) DEFAULT '' COMMENT '教育要求',
    `endDate` VARCHAR(50) DEFAULT '' COMMENT '结束日期',
    `endTime` VARCHAR(50) DEFAULT '' COMMENT '结束时间',
    `extrainfo` TEXT COMMENT '额外信息',
    `fromDate` VARCHAR(50) DEFAULT '' COMMENT '开始日期',
    `fromTime` VARCHAR(50) DEFAULT '' COMMENT '开始时间',
    `genders` TINYINT NOT NULL DEFAULT -1 COMMENT '性别要求',
    `imgUrl` VARCHAR(255) DEFAULT '' COMMENT '图片URL',
    `jobtype` TINYINT NOT NULL DEFAULT 0 COMMENT '职位类型',
    `jobtypename` VARCHAR(100) DEFAULT '' COMMENT '职位类型名称',
    `longtimemethod` VARCHAR(100) DEFAULT '' COMMENT '长期方法',
    `longtimemethodid` INT NOT NULL DEFAULT 0 COMMENT '长期方法ID',
    `maxAge` INT NOT NULL DEFAULT 0 COMMENT '最大年龄',
    `minAge` INT NOT NULL DEFAULT 0 COMMENT '最小年龄',
    `persons` INT NOT NULL DEFAULT 0 COMMENT '招聘人数',
    `positionName` VARCHAR(255) DEFAULT '' COMMENT '职位名称',
    `remarker` TEXT COMMENT '备注',
    `salary` INT NOT NULL DEFAULT 0 COMMENT '薪资',
    `salaryMethod` TINYINT NOT NULL DEFAULT 0 COMMENT '薪资方式',
    `salaryunit` VARCHAR(10) DEFAULT '' COMMENT '薪资单位',
    `settles` VARCHAR(50) DEFAULT '' COMMENT '结算方式',
    `settlesid` INT NOT NULL DEFAULT 0 COMMENT '结算方式ID',
    `status` TINYINT NOT NULL DEFAULT 5 COMMENT '状态',
    `title` VARCHAR(255) DEFAULT '' COMMENT '职位标题',
    `toped` TINYINT NOT NULL DEFAULT 0 COMMENT '是否置顶',
    `tplId` INT NOT NULL DEFAULT -1 COMMENT '模板ID',
    `trained` TINYINT NOT NULL DEFAULT 0 COMMENT '是否训练',
    `transit` VARCHAR(255) DEFAULT '' COMMENT '过渡信息',
    `typeid` INT NOT NULL DEFAULT 2 COMMENT '类型ID',
    `userId` INT NOT NULL DEFAULT 0 COMMENT '用户ID',
    `videoUrl` VARCHAR(255) DEFAULT '' COMMENT '视频URL',
    `viewCount` INT NOT NULL DEFAULT 0 COMMENT '浏览次数',
    `wmethod` TINYINT NOT NULL DEFAULT 1 COMMENT '工作方法',
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    index `idx_jobId`(`jobId`),
    FOREIGN KEY (`jobId`) REFERENCES `video_job_postings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;





use chatgpt;



INSERT INTO `video_job_detail` (
    `jobId`,
    `applyCount`,
    `applyStatus`,
    `autopass`,
    `cityid`,
    `cmpId`,
    `cmpname`,
    `collected`,
    `concatWx`,
    `education`,
    `endDate`,
    `endTime`,
    `extrainfo`,
    `fromDate`,
    `fromTime`,
    `genders`,
    `imgUrl`,
    `jobtype`,
    `jobtypename`,
    `longtimemethod`,
    `longtimemethodid`,
    `maxAge`,
    `minAge`,
    `persons`,
    `positionName`,
    `remarker`,
    `salary`,
    `salaryMethod`,
    `salaryunit`,
    `settles`,
    `settlesid`,
    `status`,
    `title`,
    `toped`,
    `tplId`,
    `trained`,
    `transit`,
    `typeid`,
    `userId`,
    `videoUrl`,
    `viewCount`,
    `wmethod`
) VALUES (
    1,
    1,
    -1,
    1,
    -1,
    15771,
    '胜我教育',
    0,
    '',
    '不限',
    '不限',
    '不限',
    '胜我教育;插画师;',
    '不限',
    '不限',
    -1,
    'https://img.taomile.cn/sw/1716287848357_23195_admin.png',
    0,
    '插画师',
    '任意日期',
    0,
    45,
    23,
    990,
    '',
    "【靠画画养活自己】\n兼职：头像、表情包、周边、海报、banner图／单；包装盒预计收入：¥600+。\n长期兼职：设计画师行业就业平均薪资¥12000+。\n\n【报名注意】\n1、我们是教绘画课程的（必须要电脑平板皆可），您学会之后才可以做兼职赚钱哦！\n2、需晚上【19:30-21:00】有时间学习在线课程；\n3、未满22周岁的请勿报名！\n\n【适合人员】\n1、大学生： 喜欢绘画，想兼职，但没技术，只能\"卖苦力\"；面临就业，没有一技之长，无法找到合适的工作；\n2、工作转行，想兼职增加收入，实现财富自由！\n3、待业人员：在家无事可做，一起学习插画原画，不仅能兼职赚钱，更能去从事相关岗位。\n4、在职员工：想通过兼职和创业增加收入，增加副业收入！\n\n【兼职优势】\n1、我们是官方签约机构！平台安全有保障！\n2、不受地域限制，可在线全国接单，在家办公；\n3、接受0基础小白，免费试学平板绘画课程；\n4、画师兼职渠道多（半次元、米画师、站酷、橙光、画萌网、猪八戒、淘宝、咸鱼、微博等）;\n5．不受地域限制（可在线全国接单，在家办公）\n现在市场就业环境让很多人明白了，有一门技术在身是多么重要。能网上兼职在家即可上班，如果你下定决心想要改变，那就抓紧时间报名，免费领取课程学习吧。",
    40000,
    0, '天','日结',
    0,
    5,
    '需电脑/插画兼职/在家学习可单结',
    0,
    -1,
    0,
    '',
    2,
    3191803,
    'https://img.taomile.cn/sw/1716287853697_23195_admin.mp4',
    100816,
    1
);

-- 新增字段
ALTER TABLE `chatgpt`.`video_job_detail` 
ADD COLUMN `concatName` VARCHAR(32) NULL DEFAULT '' AFTER `collected`,
ADD COLUMN `concatPhone` VARCHAR(32) NULL DEFAULT '' AFTER `concatName`;


ALTER TABLE `chatgpt`.`video_job_detail` 
ADD COLUMN `concatAvatar` VARCHAR(255) NULL DEFAULT '' AFTER `concatName`,