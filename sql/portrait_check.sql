CREATE TABLE `portrait_check` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `uid` VARCHAR(64), -- 用户id
    `orderNo` VARCHAR(64), -- 支付订单号
    `bill_no` VARCHAR(64), -- 写真订单号
    `template_id` VARCHAR(64), -- 模板Id
    `template_name` VARCHAR(64), -- 模板名称
    `image_url` VARCHAR(128), -- 图片url
    `status` INT DEFAULT 0, -- 待审核图片状态 0:初始化 1:正常 2:无效
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);
