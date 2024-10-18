import { DataTypes } from 'sequelize' // 引入 Sequelize 的数据类型
import type { Sequelize } from 'sequelize' // 引入 Sequelize 类型定义

// 定义并导出模型构造函数
export default (sequelize: Sequelize) => {
  // 使用 sequelize.define 方法定义模型
  const VideoJobArticle = sequelize.define('video_job_article', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // 无符号整型
      allowNull: false, // 不允许为空
      autoIncrement: true, // 自增
      primaryKey: true, // 主键
      comment: '主键ID',
    },
    appId: {
      type: DataTypes.STRING(64), // 字符串，最大长度64
      allowNull: false, // 不允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '应用ID',
    },
    pubId: {
      type: DataTypes.INTEGER, // 整型
      allowNull: false, // 不允许为空
      defaultValue: 0, // 默认值为0
      comment: '发布者ID',
    },
    typeId: {
      type: DataTypes.INTEGER, // 整型
      allowNull: false, // 不允许为空
      defaultValue: 0, // 默认值为0
      comment: '文章类型ID',
    },
    title: {
      type: DataTypes.STRING(255), // 字符串，最大长度255
      allowNull: false, // 不允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '文章标题',
    },
    imgUrl: {
      type: DataTypes.STRING(255), // 字符串，最大长度255
      allowNull: true, // 允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '文章封面图片URL',
    },
    url: {
      type: DataTypes.STRING(255), // 字符串，最大长度255
      allowNull: true, // 允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '文章详情URL',
    },
    simpleDetail: {
      type: DataTypes.TEXT, // 文本类型，用于存储较长的字符串
      allowNull: true, // 允许为空
      comment: '文章简要描述',
    },
    pubTime: {
      type: DataTypes.INTEGER, // 整型
      allowNull: false, // 不允许为空
      defaultValue: 0, // 默认值为0
      comment: '发布时间',
    },
    readTimes: {
      type: DataTypes.INTEGER, // 整型
      allowNull: false, // 不允许为空
      defaultValue: 0, // 默认值为0
      comment: '阅读次数',
    },
    status: {
      type: DataTypes.TINYINT, // 小整型
      allowNull: false, // 不允许为空
      defaultValue: 1, // 默认值为1
      comment: '状态',
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
    tableName: 'video_job_article', // 表名，确保与数据库中的表名相同
    charset: 'utf8mb4', // 字符集
    collate: 'utf8mb4_unicode_ci', // 校对集
    timestamps: false, // 不使用自动 createdAt 和 updatedAt 字段，因为我们手动定义了它们
    indexes: [ // 索引
      {
        fields: ['appId'], // 为 appId 添加索引
      },
      {
        fields: ['pubId'], // 为 pubId 添加索引
      },
    ],
    comment: '视频工作文章表', // 表的备注
  })

  return VideoJobArticle // 返回模型
}
