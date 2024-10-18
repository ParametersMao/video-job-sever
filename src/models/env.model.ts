import { DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

export default (sequelize: Sequelize, Sequelize: typeof DataTypes) => {
  const Env = sequelize.define<any>('miniapp_env', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    appid: {
      type: DataTypes.STRING(32),
      defaultValue: null,
      comment: '应用id',
    },
    name: {
      type: DataTypes.STRING(64),
      defaultValue: null,
    },
    check_status: {
      type: DataTypes.INTEGER,
      defaultValue: '0',
      comment: '审核状态',
    },
    extra: {
      type: DataTypes.STRING(128),
      defaultValue: '{}',
      comment: '扩展字段',
    },
    version : {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '小程序版本号',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: '创建时间',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: '更新时间',
    },
  }, {
    tableName: 'miniapp_env',
    charset: 'utf8mb4',
    indexes: [{
      name: 'idx_appid',
      fields: ['appid'],
    }],
  })

  return Env
}
