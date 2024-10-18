import nodemailer from 'nodemailer'

export async function sendMail(recipient: string[], title, content) {
  const user = 'monitor@growingth.com' // 自己的邮箱
  const pass = process.env.MAIL_PASSWORD // qq邮箱的授权码
  const recipients = (recipient as any).join('>,<') // 接收人邮箱

  const transporter = nodemailer.createTransport({
    host: 'smtp.feishu.cn',
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  })
  transporter.sendMail({
    from: `红包封面告警<${user}>`,
    to: `接收人<${recipients}>`,
    subject: title,
    text: content, // 发送邮箱的内容
  }, (err, res) => {
    console.log(err)
    console.log(res)
  })
}
