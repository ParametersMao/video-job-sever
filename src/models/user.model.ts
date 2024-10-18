import { DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

export default (sequelize: Sequelize, Sequelize: typeof DataTypes) => {
  const User = sequelize.define<any>('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    appid: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
    },
    appname: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
    },
    platform: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: '',
    },
    userid: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
      defaultValue: '',
    },
    email: {
      type: DataTypes.STRING(64),
      unique: true,
      defaultValue: null,
    },
    nickname: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
    },
    realname: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    avatar: {
      type: DataTypes.STRING(128),
      defaultValue: '',
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
    },
    invitationCode: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
    },
    phone: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: '',
    },
    sms: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: '',
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    class: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    token: {
      type: DataTypes.STRING(256),
      unique: true,
      defaultValue: null,
    },
    logStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    loginAt: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
    },
    logoutAt: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    activeAt: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  })

  return User
}
