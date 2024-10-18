import { PassThrough } from 'stream'
import qiniu from 'qiniu'
// import qiniuPrefix from '../config/qiniu-upload-prefiex.json'

export async function putStream(
  base64String: string,
  hashString: string,
): Promise<string> {
  // 将base64数据转为Buffer
  const buffer: Buffer = Buffer.from(base64String, 'base64')

  // 创建一个Readable Stream
  const bufferStream: PassThrough = new PassThrough()

  // 将Buffer写入Stream
  bufferStream.end(buffer)

  // 在七牛云上的目标文件名
  let key = ''
  if (hashString.endsWith('.png') || hashString.endsWith('.jpg') || hashString.endsWith('.jpeg'))
    key = `${process.env.QINIU_CDN_PREFIX}/${hashString}`
  else
    key = `${process.env.QINIU_CDN_PREFIX}/${hashString}.png`

  console.log('key=', key)

  // 你的七牛云Access Key 和 Secret Key
  const accessKey = process.env.QINIU_CDN_AK
  const secretKey = process.env.QINIU_CDN_SK

  const mac: qiniu.auth.digest.Mac = new qiniu.auth.digest.Mac(
    accessKey,
    secretKey,
  )

  // 你的存储空间名
  const bucket = process.env.QINIU_CDN_SPACE
  console.log('bucket=', bucket)

  // 你的七牛云域名
  const domain = process.env.QINIU_CDN_DOMAIN

  const options: qiniu.rs.PutPolicyOptions = {
    scope: bucket,
  }
  const putPolicy: qiniu.rs.PutPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken: string = putPolicy.uploadToken(mac)

  const config: any = new qiniu.conf.Config()

  config.zone = qiniu.zone.Zone_z2
  config.useHttpsDomain = true
  config.useCdnDomain = true

  const formUploader: qiniu.form_up.FormUploader
    = new qiniu.form_up.FormUploader(config)
  const putExtra: qiniu.form_up.PutExtra = new qiniu.form_up.PutExtra()

  return new Promise((resolve, reject) => {
    formUploader.putStream(
      uploadToken,
      key,
      bufferStream,
      putExtra,
      (
        respErr: Error | null,
        respBody: any,
        respInfo: any,
      ) => {
        if (respInfo.statusCode !== 200 || respErr) {
          console.log('respInfo=', respInfo)
          console.log('respErr=', respErr)
          reject(respErr)
        }

        if (respInfo.statusCode === 200) {
          // 构造七牛云的cdn url
          const cdnUrl = `https://${domain}/${respBody.key}`
          resolve(cdnUrl)
        }
        else {
          reject(new Error(`Upload failed with status ${respInfo.statusCode}`))
        }
      },
    )
  })
}
