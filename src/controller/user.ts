// user.ts
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { db } from '../models'
import userService from '../service/user.service'

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key' // 确保在生产环境中设置了环境变量
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d' // Token 有效期，例如1天

export default {
  // 发送短信验证码接口
  async sendSms(req, res) {
    const { phone } = req.body

    if (!phone) {
      res.send({
        status: 'Fail',
        message: '手机号不能为空',
        data: {},
      })
      return
    }
    // 校验短信验证码是否为11位
    if (phone.length !== 11) {
      res.send({
        status: 'Fail',
        message: '手机号格式错误',
        data: {},
      })
      return
    }

    try {
      const result = await userService.sendSms(phone)
      // 判断是否发送成功
      if (!result) {
        return res.send({
          status: 'Fail',
          message: '短信发送失败，请稍后再试',
          data: {},
        })
      }
      res.send({
        status: 'Success',
        message: '短信验证码发送成功',
        data: {},
      })
    }
    catch (error) {
      console.error('---> sendSms error: ', error)
      res.send({
        status: 'Fail',
        message: error.message || '短信发送失败，请稍后再试',
        data: {},
      })
    }
  },

  // 验证短信验证码接口
  async verifySms(req, res) {
    const { phone, sms } = req.body

    if (!phone || !sms) {
      res.send({
        status: 'Fail',
        message: '手机号和验证码不能为空',
        data: {},
      })
      return
    }

    try {
      const verifyResult = await userService.verifySms(phone, sms)

      if (!verifyResult.isVerified)
        return res.send({ status: 'Fail', message: '验证码错误', data: {} })

      const user = verifyResult.user
      // 生成 JWT
      const token = jwt.sign({ id: user.id, phone: user.phone, userid: user.userid },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN },
      )
      // 更新用户token
      await user.update({ token })
      user.token = token

      // 返回用户信息和 Token
      res.send({
        status: 'Success',
        message: '验证成功',
        data: user.dataValues,
      })
    }
    catch (error) {
      console.error('---> verifySms error: ', error)
      res.send({
        status: 'Fail',
        message: error.message || '验证失败，请稍后再试',
        data: {},
      })
    }
  },
}
