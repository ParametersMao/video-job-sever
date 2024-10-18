import { DataTypes } from 'sequelize' // 引入 Sequelize 的数据类型
import type { Sequelize } from 'sequelize' // 引入 Sequelize 类型定义

// 定义并导出模型构造函数
export default (sequelize: Sequelize) => {
  // 使用 sequelize.define 方法定义模型
  const VideoJobChat = sequelize.define('video_job_chat', {
    // 定义字段
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // 无符号整型
      allowNull: false, // 不允许为空
      autoIncrement: true, // 自增
      primaryKey: true, // 主键
      comment: '主键ID',
    },
    jobId: {
      type: DataTypes.INTEGER, // 整型
      allowNull: false, // 不允许为空
      comment: '职位ID',
      references: {
        model: 'video_job_postings', // 关联到 video_job_postings 表
        key: 'id',
      },
      onDelete: 'CASCADE', // 设置删除时的行为
      onUpdate: 'CASCADE', // 设置更新时的行为
    },
    cmpName: {
      type: DataTypes.STRING(100), // 字符串，最大长度100
      allowNull: false, // 不允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '公司名称',
    },
    jobTitle: {
      type: DataTypes.STRING(255), // 字符串，最大长度255
      allowNull: false, // 不允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '工作名称',
    },
    concatName: {
      type: DataTypes.STRING(32), // 字符串，最大长度32
      allowNull: true, // 允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '联系人',
    },
    appname: {
      type: DataTypes.STRING(64), // 字符串，最大长度64
      allowNull: false, // 不允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '应用名称',
    },
    platform: {
      type: DataTypes.STRING(16), // 字符串，最大长度16
      allowNull: false, // 不允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '平台',
    },
    userid: {
      type: DataTypes.STRING(64), // 字符串，最大长度64
      allowNull: false, // 不允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '用户ID',
    },
    nickname: {
      type: DataTypes.STRING(64), // 字符串，最大长度64
      allowNull: false, // 不允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '用户昵称',
    },
    realname: {
      type: DataTypes.STRING(64), // 字符串，最大长度64
      allowNull: false, // 不允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '用户真实姓名',
    },
    content: {
      type: DataTypes.TEXT, // 文本类型
      allowNull: true, // 允许为空
      comment: '聊天内容',
    },
    status: {
      type: DataTypes.INTEGER, // 整型
      allowNull: false, // 不允许为空
      defaultValue: 1, // 默认值为1
      comment: '聊天状态',
    },
    created_at: {
      type: DataTypes.DATE, // 日期时间类型
      allowNull: false, // 不允许为空
      defaultValue: DataTypes.NOW, // 默认值为当前时间
      comment: '创建时间',
    },
    updated_at: {
      type: DataTypes.DATE, // 日期时间类型
      allowNull: false, // 不允许为空
      defaultValue: DataTypes.NOW, // 默认值为当前时间
      comment: '更新时间',
    },
  }, {
    // 模型配置项
    tableName: 'video_job_chat', // 表名，确保与数据库中的表名相同
    charset: 'utf8mb4', // 字符集
    collate: 'utf8mb4_unicode_ci', // 校对集
    timestamps: false, // 不自动管理 createdAt 和 updatedAt 字段
    indexes: [ // 索引
      {
        fields: ['jobId'], // 为 jobId 添加索引
      },
      {
        fields: ['userid'], // 为 userid 添加索引
      },
    ],
    comment: '职位沟通表', // 表的备注
  })

  return VideoJobChat // 返回模型
}
