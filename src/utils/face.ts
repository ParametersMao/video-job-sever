import * as fs from 'fs'
import stream from 'stream'
import FaceBody, { DetectFaceAdvanceRequest } from '@alicloud/facebody20191230'
import * as $OpenApi from '@alicloud/openapi-client'
import * as $Util from '@alicloud/tea-util'

export default class FaceAPIClient {
  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(accessKeyId: string, accessKeySecret: string): FaceBody {
    const config = new $OpenApi.Config({
      // 必填，您的 AccessKey ID
      accessKeyId,
      // 必填，您的 AccessKey Secret
      accessKeySecret,
    })
    // Endpoint 请参考 https://api.aliyun.com/product/facebody
    config.endpoint = 'facebody.cn-shanghai.aliyuncs.com'
    config.connectTimeout = 30 * 1000 // 20秒
    config.readTimeout = 30 * 1000
    // @ts-ignore FaceBody 在编译后可能是通过 default 引用
    return FaceBody.default ? new FaceBody.default(config) : new FaceBody(config) // eslint-disable-line
  }

  static async detectWithBase64(base64Str = ''): Promise<any> {
    const { Readable } = stream
    const fomartStr = base64Str.replace(/data:image(.*)?;base64,/, '')
    const imgBuffer = Buffer.from(fomartStr, 'base64')
    const fileStream = Readable.from(imgBuffer)

    return await FaceAPIClient.detect(fileStream)
  }

  static async detectWithFilePath(path = ''): Promise<any> {
    const fileStream = fs.createReadStream(path)
    return await FaceAPIClient.detect(fileStream)
  }

  static async detect(fileStream: stream.Readable): Promise<any> {
    // 请确保代码运行环境设置了环境变量 ALI_CLOUD_AK_ID 和 ALI_CLOUD_AK_SECRET
    // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性
    const client = FaceAPIClient.createClient(process.env.ALI_CLOUD_AK_ID, process.env.ALI_CLOUD_AK_SECRET)

    const detectFaceRequest = new DetectFaceAdvanceRequest()
    detectFaceRequest.imageURLObject = fileStream

    const runtime = new $Util.RuntimeOptions({})
    runtime.autoretry = true // 失败自动重试
    runtime.maxAttempts = 3 // 最多重试 3 次

    let detectData = null
    try {
      // 复制代码运行请自行打印 API 的返回值
      const result = await client.detectFaceAdvance(detectFaceRequest, runtime)
      detectData = result?.body?.data
    }
    catch (error) {
      let isError = true
      let errMsg = error.data?.Message || error.message
      console.log('---> 图片检测失败：', error.data || error.message)
      if (error.data?.Code === 'InvalidImage.NotFoundFace') {
        isError = false
        errMsg = '图像中没找到人脸'
      }
      if (error.data?.Code === 'Throttling')
        errMsg = '调用被限流，请稍后重试'

      detectData = { isError, isInvalid: true, code: error.data?.Code, message: errMsg }
    }

    await new Promise(resolve => setTimeout(resolve, 300)) // 延迟等待链接完全关闭，避免被限流
    return detectData
  }
}
