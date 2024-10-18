import * as tencentcloud from 'tencentcloud-sdk-nodejs'

// 导入对应产品模块的client models。
const SmsClient = tencentcloud.sms.v20210111.Client
// 创建SmsClient实例
const clientConfig = {
  credential: {
    secretId: process.env.TENCENTCLOUD_SECRET_ID,
    secretKey: process.env.TENCENTCLOUD_SECRET_KEY,
  },

  region: 'ap-guangzhou', // 选择适当的地区，这里以广州为例
  profile: {
    httpProfile: {
      reqMethod: 'POST', // 请求方法
      reqTimeout: 30, // 请求超时时间，默认60s
      endpoint: 'sms.tencentcloudapi.com',
    },
  },
}

// console.log('clientConfig: ', clientConfig)
/* 实例化要请求产品(以sms为例)的client对象 */
const client = new SmsClient(clientConfig)

// 短信发送函数
export default {
  async sendSms(phone: string, smsCode: string) {
    try {
      return { success: true }
      const req = {} as any

      // 设置短信应用ID（在短信控制台中获取）
      req.SmsSdkAppId = process.env.TENCENT_SMS_SDK_APP_ID

      // 设置签名名称（在短信控制台中获取，需要与申请的签名内容一致）
      req.SignName = process.env.TENCENT_SMS_SIGN_NAME

      // 设置模板ID（在短信控制台中获取）
      req.TemplateId = process.env.TENCENT_SMS_TEMPLATE_ID

      // 设置模板参数（与模板内容中的变量对应）
      req.PhoneNumberSet = [`+86${phone}`] // 注意加上国家码
      req.TemplateParamSet = [smsCode]

      // 发送短信
      const resp = await client.SendSms(req)

      // 检查发送结果
      if (resp.SendStatusSet && resp.SendStatusSet[0].Code === 'Ok') {
        console.log(`SMS sent to ${phone} successfully.`)
        return { success: true }
      }
      else {
        console.error(`Failed to send SMS to ${phone}. Error: `, resp)
        return { success: false, error: resp.SendStatusSet[0].Message }
      }
    }
    catch (error) {
      console.error('Error sending SMS: ', error)
      return { success: false, error: error.message }
    }
  },
}
