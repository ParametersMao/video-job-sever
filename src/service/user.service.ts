// user.service.ts
import { v4 as uuidv4 } from 'uuid'
import { db } from '../models'
import smsProvider from '../utils/smsProvider' // 短信提供商服务

export default {

  // 生成并发送短信验证码
  async sendSms(phone: string) {
    // 生成随机验证码
    const smsCode = Math.floor(1000 + Math.random() * 9000).toString() // 生成4位随机验证码

    // 生成用户ID
    const userId = uuidv4()

    // 更新数据库中的用户记录
    const [user, created] = await db.user.findOrCreate({
      where: { phone },
      defaults: { phone, sms: smsCode, appid: 'videoCut', appname: '短视频剪辑', platform: 'iOS', userid: userId },
    })

    if (!created) {
      // 如果用户已存在，更新短信验证码
      await user.update({ sms: smsCode })
    }

    // 调用第三方短信提供商API发送验证码
    const smsResult = await smsProvider.sendSms(phone, smsCode)
    if (smsResult.success)
      return { phone, smsCode }
    else
      throw new Error('SMS sending failed')
  },

  // 验证短信验证码，返回验证结果和用户信息
  async verifySms(phone: string, sms: string) {
    // 查找用户并验证短信验证码
    const user = await db.user.findOne({ where: { phone } })

    if (!user || user.sms !== sms)
      return { isVerified: false }// 验证失败

    // 如果验证成功，清除数据库中的验证码
    await user.update({ sms: '' })
    return { isVerified: true, user }
  },
}
