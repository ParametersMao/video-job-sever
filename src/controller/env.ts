import { getEnvInfo } from '../service/env.service'

export default {

  async getEnvInfo(req, res) {
    try {
      const appid = req.query.appid || req.body.appid || ''
      if (!appid) {
        res.send({
          status: 'Fail',
          message: 'appid 不能为空',
          data: {},
        })
        return
      }
      const version = req.query.version || req.body.version || 0
      const envInfo = await getEnvInfo(appid)
      // 添加空值检查
      if (!envInfo) {
        res.send({
          status: 'Fail',
          message: '获取环境信息失败',
          data: {},
        })
        return
      }
      if (version > envInfo.version)
        envInfo.check_status = 1

      res.send({
        status: 'Success',
        message: '获取成功',
        data: envInfo,
      })
    }
    catch (error) {
      console.error('---> getEnvInfo error: ', error)
      res.send({
        status: 'Fail',
        message: error.message || 'getEnvInfo 异常，请稍后再试',
        data: null,
      })
    }
  },
}
