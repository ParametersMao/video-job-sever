import { DataTypes } from 'sequelize' // 引入 Sequelize 的数据类型
import type { Sequelize } from 'sequelize' // 引入 Sequelize 类型定义

// 定义并导出模型构造函数
export default (sequelize: Sequelize) => {
  // 使用 sequelize.define 方法定义模型
  const JobPostings = sequelize.define('video_job_postings', {
    // 定义字段
    id: {
      type: DataTypes.INTEGER, // 整型
      allowNull: false, // 不允许为空
      autoIncrement: true, // 自增
      primaryKey: true, // 主键
      comment: '主键ID',
    },
    applyCount: {
      type: DataTypes.INTEGER, // 整型
      allowNull: false, // 不允许为空
      defaultValue: 0, // 默认值为0
      comment: '申请次数',
    },
    cmpName: {
      type: DataTypes.STRING(100), // 字符串，最大长度100
      allowNull: false, // 不允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '公司名称',
    },
    ico: {
      type: DataTypes.STRING(255), // 字符串，最大长度255
      allowNull: true, // 允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '公司图标URL',
    },
    imgUrl: {
      type: DataTypes.STRING(255), // 字符串，最大长度255
      allowNull: true, // 允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '图片URL',
    },
    jobtypeName: {
      type: DataTypes.STRING(100), // 字符串，最大长度100
      allowNull: true, // 允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '职位类型名称',
    },
    recommed: {
      type: DataTypes.TINYINT, // 小整型
      allowNull: false, // 不允许为空
      defaultValue: 0, // 默认值为0
      comment: '推荐标志',
    },
    salary: {
      type: DataTypes.INTEGER, // 整型
      allowNull: false, // 不允许为空
      defaultValue: 0, // 默认值为0
      comment: '薪资',
    },
    salaryunit: {
      type: DataTypes.STRING(10), // 字符串，最大长度10
      allowNull: true, // 允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '薪资单位',
    },
    title: {
      type: DataTypes.STRING(255), // 字符串，最大长度255
      allowNull: true, // 允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '职位标题',
    },
    userId: {
      type: DataTypes.INTEGER, // 整型
      allowNull: false, // 不允许为空
      defaultValue: 0, // 默认值为0
      comment: '用户ID',
    },
    videoUrl: {
      type: DataTypes.STRING(255), // 字符串，最大长度255
      allowNull: true, // 允许为空
      defaultValue: '', // 默认值为空字符串
      comment: '视频URL',
    },
    createdAt: {
      type: DataTypes.DATE, // 日期时间类型
      allowNull: false, // 不允许为空
      defaultValue: DataTypes.NOW, // 默认值为当前时间
      comment: '创建时间',
    },
    updatedAt: {
      type: DataTypes.DATE, // 日期时间类型
      allowNull: false, // 不允许为空
      defaultValue: DataTypes.NOW, // 默认值为当前时间
      comment: '更新时间',
    },
  }, {
    // 模型配置项
    tableName: 'video_job_postings', // 表名，确保与数据库中的表名相同
    charset: 'utf8mb4', // 字符集
    collate: 'utf8mb4_unicode_ci', // 校对集
    timestamps: true, // 自动管理 createdAt 和 updatedAt 字段
    comment: '职位发布表', // 表的备注
  })

  return JobPostings // 返回模型
}
