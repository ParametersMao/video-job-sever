import * as fs from 'fs'
import stream from 'stream'
import ImageauditClient, { ScanImageAdvanceRequest, ScanImageAdvanceRequestTask } from '@alicloud/imageaudit20191230'
import * as $OpenApi from '@alicloud/openapi-client'
import * as $Util from '@alicloud/tea-util'

export default class ImageAuditAPIClient {
  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(accessKeyId: string, accessKeySecret: string): ImageauditClient {
    const config = new $OpenApi.Config({
      // 必填，您的 AccessKey ID
      accessKeyId,
      // 必填，您的 AccessKey Secret
      accessKeySecret,
    })
    // Endpoint 请参考 https://api.aliyun.com/product/facebody
    config.endpoint = 'imageaudit.cn-shanghai.aliyuncs.com'
    config.connectTimeout = 30 * 1000 // 20秒
    config.readTimeout = 30 * 1000
    // @ts-ignore FaceBody 在编译后可能是通过 default 引用
    return ImageauditClient.default ? new ImageauditClient.default(config) : new ImageauditClient(config) // eslint-disable-line
  }

  static async auditWithBase64(base64Str: String[]): Promise<any> {
    const { Readable } = stream
    const fileStreams = []
    for (const i in base64Str) {
      const fomartStr = base64Str[i].replace(/data:image(.*)?;base64,/, '')
      const imgBuffer = Buffer.from(fomartStr, 'base64')
      const fileStream = Readable.from(imgBuffer)
      fileStreams.push(fileStream)
    }

    return await ImageAuditAPIClient.audits(fileStreams)
  }

  static async auditWithFilePath(paths: fs.PathLike[]): Promise<any> {
    const fileStreams = []
    for (const i in paths) {
      const fileStream = fs.createReadStream(paths[i])
      fileStreams.push(fileStream)
    }

    return await ImageAuditAPIClient.audits(fileStreams)
  }

  static async audits(fileStream: stream.Readable[]): Promise<any> {
    // 请确保代码运行环境设置了环境变量 ALI_CLOUD_AK_ID 和 ALI_CLOUD_AK_SECRET
    // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性
    const client = ImageAuditAPIClient.createClient(process.env.ALI_CLOUD_AK_ID, process.env.ALI_CLOUD_AK_SECRET)
    const tasks = []
    for (const i in fileStream) {
      const task = new ScanImageAdvanceRequestTask()
      // const fileStream = fs.createReadStream('/Users/dongqixing/Downloads/test.jpg')
      // task.imageURLObject = fileStream
      // task.imageURL = 'https://cdn.growingth.com/sd/upload/e28283bb0fe31c4c8245edf655cfb76a.png'
      task.imageURLObject = fileStream[i]
      task.dataId = i
      tasks.push(task)
    }
    const scanImageAdvanceRequest = new ScanImageAdvanceRequest({
      task: tasks,
      scene: [
        'porn',
        // "logo",
        'terrorism',
        // "ad",
        'live',
      ],
    },
    )

    const runtime = new $Util.RuntimeOptions({})
    runtime.autoretry = true // 失败自动重试
    runtime.maxAttempts = 3 // 最多重试 3 次

    let auditData = null
    try {
      // 复制代码运行请自行打印 API 的返回值
      const result = await client.scanImageAdvance(scanImageAdvanceRequest, runtime)
      auditData = result?.body?.data
    }
    catch (error) {
      const isError = true
      let errMsg = error.data?.Message || error.message
      console.log('图片审核失败：', error.data || error.message)
      if (error.data?.Code === 'Throttling')
        errMsg = '调用被限流，请稍后重试'

      auditData = { isError, isInvalid: true, code: error.data?.Code, message: errMsg }
    }

    await new Promise(resolve => setTimeout(resolve, 300)) // 延迟等待链接完全关闭，避免被限流
    return auditData
  }
}
