CREATE TABLE art_like_image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uid varchar(128) NOT NULL,                -- 用户ID
    image_id varchar(128) NOT NULL,           -- 图片ID
    type_id TINYINT NOT NULL DEFAULT 0,  -- 图片类型
    like_timestamp DATETIME NOT NULL,  -- 点赞或取消点赞的时间
    like_status TINYINT NOT NULL DEFAULT 0, -- 0:未点赞 1:已点赞
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user (uid),               -- 用户ID索引，方便按用户查询
    INDEX idx_timestamp (like_timestamp) -- 时间戳索引，方便按时间查询
)ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




