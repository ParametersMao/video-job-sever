import { DataTypes } from 'sequelize' // 引入 Sequelize 的数据类型
import type { Sequelize } from 'sequelize' // 引入 Sequelize 类型定义

/// models/video_job_detail.js
export default (sequelize: Sequelize) => {
  const VideoJobDetail = sequelize.define('video_job_detail', {
    id: {
      type: DataTypes.INTEGER, // 整型
      allowNull: false, // 不允许为空
      autoIncrement: true, // 自增
      primaryKey: true, // 主键
      comment: '主键ID',
    },
    jobId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      comment: '职位ID',
      references: {
        model: 'video_job_postings', // 表名
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    applyCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '申请次数',
    },
    applyStatus: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: -1,
      comment: '申请状态',
    },
    autopass: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: '自动通过标志',
    },
    cityid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1,
      comment: '城市ID',
    },
    cmpId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '公司ID',
    },
    cmpname: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
      comment: '公司名称',
    },
    collected: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '收藏状态',
    },
    concatWx: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
      comment: '微信联系方式',
    },
    concatName: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: '',
      comment: '联系人',
    },
    concatAvatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
      comment: '联系人头像',
    },
    concatPhone: {
      type: DataTypes.STRING(32),
      allowNull: true,
      defaultValue: '',
      comment: '联系电话',
    },
    education: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      comment: '教育要求',
    },
    endDate: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      comment: '结束日期',
    },
    endTime: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      comment: '结束时间',
    },
    extrainfo: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '额外信息',
    },
    fromDate: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      comment: '开始日期',
    },
    fromTime: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      comment: '开始时间',
    },
    genders: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: -1,
      comment: '性别要求',
    },
    imgUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
      comment: '图片URL',
    },
    jobtype: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '职位类型',
    },
    jobtypename: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      comment: '职位类型名称',
    },
    longtimemethod: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: '',
      comment: '长期方法',
    },
    longtimemethodid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '长期方法ID',
    },
    maxAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '最大年龄',
    },
    minAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '最小年龄',
    },
    persons: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '招聘人数',
    },
    positionName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
      comment: '职位名称',
    },
    remarker: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '备注',
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '薪资',
    },
    salaryMethod: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '薪资方式',
    },
    salaryunit: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: '',
      comment: '薪资单位',
    },
    settles: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: '',
      comment: '结算方式',
    },
    settlesid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '结算方式ID',
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 5,
      comment: '状态',
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
      comment: '职位标题',
    },
    toped: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '是否置顶',
    },
    tplId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1,
      comment: '模板ID',
    },
    trained: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '是否训练',
    },
    transit: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
      comment: '过渡信息',
    },
    typeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
      comment: '类型ID',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '用户ID',
    },
    videoUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '',
      comment: '视频URL',
    },
    viewCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '浏览次数',
    },
    wmethod: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: '工作方法',
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
    tableName: 'video_job_detail',
    indexes: [ // 索引
      {
        unique: true,
        fields: ['jobId'],
      },
    ],
    timestamps: true, // 自动管理 createdAt 和 updatedAt 字段
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    comment: '职位详情表',
  })

  // 如果存在关联，可以在这里定义
  VideoJobDetail.associate = (models) => {
    VideoJobDetail.belongsTo(models.video_job_postings, {
      foreignKey: 'jobId',
      as: 'jobPosting',
    })
  }

  return VideoJobDetail
}
