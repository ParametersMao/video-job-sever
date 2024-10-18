import type { DataTypes, Sequelize } from 'sequelize'

export default (sequelize: Sequelize, Sequelize: typeof DataTypes) => {
  const WxOpenid = sequelize.define<any>('user_wx_openid', {
    wx_app_id: {
      type: Sequelize.STRING(100),
      defaultValue: '',
      allowNull: false,
      comment: '微信小程序或公众号app_id',
    },
    wx_app_name: {
      type: Sequelize.STRING(100),
      defaultValue: '',
      comment: '微信小程序或公众号名称',
    },
    uid: {
      type: Sequelize.STRING(100),
      allowNull: false,
      comment: '用户uid',
    },
    wx_openid: {
      type: Sequelize.STRING(100),
      defaultValue: '',
      allowNull: false,
      comment: '微信openid',
    },
  })

  return WxOpenid
}
