import axios from 'axios'
import { Op, db } from '../models'
import { sendMail } from '../utils/mail'
import { isNotEmptyString } from '../utils/is'
import { ORDER_STATUS } from './order.service'

// 发送消息的函数

export const sendWechatMessage = async (openId, orderNo) => {
  try {
    const { WX_MSG_APPID, WX_MSG_SECRET } = process.env
    const wxAppid = WX_MSG_APPID
    const wxSecret = WX_MSG_SECRET
    const wxTemplateId = 'hDHsnEoZewE6pIR_tFrvUWgx0hzb57oR3IVdEYH79lo'

    //  第一步：获取Access Token
    const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxAppid}&secret=${wxSecret}`
    console.log('----- tokenUrl  ', tokenUrl)
    const accessTokenResponse = await axios.get(tokenUrl) // 获取token
    const accessToken = accessTokenResponse.data.access_token
    if (!isNotEmptyString(accessToken)) {
      console.error('access_token 获取失败------>', accessTokenResponse)
      return { status: 'Fail', message: '公众号 access token失败' }
    }
    // 第二步：使用Access Token发送消息
    const d = new Date()
    const formattedDate = `${[d.getFullYear(),
        d.getMonth() + 1,
        d.getDate()].join('-')
       } ${[d.getHours(),
         d.getMinutes(),
         d.getSeconds()].join(':')}`
    const message = {
      touser: openId,
      template_id: wxTemplateId,
      url: 'https://ai.growingth.com/cover/user/order',
      data: { // 推送的内容
        character_string1: {
          value: orderNo,
        },
        time2: {
          value: formattedDate,
        },
        thing6: {
          value: '红包封面',
        },
      },
    }
    const sendMessageResponse = await axios.post(
        `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`,
        message)

    if (sendMessageResponse.data.errcode === 0) {
      console.log('Message sent successfully')
      return { status: 'Success', message: '发送微信消息成功' }
    }
    else { throw new Error(`Failed to send message: ${JSON.stringify(sendMessageResponse.data)}`) }
  }
  catch (error) {
    console.error('send wechat message error: ', error)
    return { status: 'Fail', message: `发送微信消息失败: ${error.message || '-'}` }
  }
}
