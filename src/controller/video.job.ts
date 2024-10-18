// controllers/video.job.ts

import videoJobService from '../service/video.job.service'
import { db } from '../models'

export default {
  /**
   * 查询职位列表接口
   * POST /video/query-job-list
   */
  async queryJobList(req, res) {
    const { cmpName, jobtypeName } = req.body

    try {
      const result = await videoJobService.queryJobList({
        cmpName,
        jobtypeName,
      })

      res.send({
        status: 'Success',
        message: '查询成功',
        data: result,
      })
    }
    catch (error) {
      console.error('---> queryJobList error: ', error)
      res.send({
        status: 'Fail',
        message: error.message || '查询失败，请稍后再试',
        data: {},
      })
    }
  },
  async getJobDetail(req, res) {
    const { jobId } = req.body

    try {
      const jobDetail = await db.videoJobDeatil.findOne({
        where: { jobId },
      })

      if (!jobDetail) {
        return res.send({
          status: 'Fail',
          message: '职位详情未找到',
          data: {},
        })
      }

      return res.send({
        status: 'Success',
        message: '获取职位详情成功',
        data: jobDetail.dataValues,
      })
    }
    catch (error) {
      console.error('---> getJobDetail error:', error)
      return res.send({
        status: 'Fail',
        message: '服务器内部错误',
        data: {},
      })
    }
  },
  /**
   * 申请职位接口
   * POST /video/apply-job-info
   */
  async applyJobInfo(req, res) {
    const { jobId, appname, platform, userid, email, nickname, realname, birthday, gender, age, sex, phone } = req.body

    // 校验参数jobId、userid、phone
    if (!jobId || !userid || !phone) {
      return res.send({
        status: 'Fail',
        message: '参数错误',
        data: {},
      })
    }

    try {
      // 调用 service 根据 jobId 查询职位信息
      const jobInfo = await videoJobService.queryJobById(jobId)
      // jobInfo 可能为 null
      if (!jobInfo) {
        return res.send({
          status: 'Fail',
          message: '职位信息未找到',
          data: {},
        })
      }
      const cmpName = jobInfo.cmpName
      const jobTitle = jobInfo.title
      const imgUrl = jobInfo.imgUrl
      // 调用 service 保存职位申请信息
      const result = await videoJobService.applyJobInfo({ jobId, cmpName, jobTitle, imgUrl, appname, platform, userid, email, nickname, realname, birthday, gender, age, sex, phone })
      if (!result) {
        return res.send({
          status: 'Fail',
          message: '申请失败，请稍后再试',
          data: {},
        })
      }
      res.send({
        status: 'Success',
        message: '申请成功',
        data: {},
      })
    }
    catch (error) {
      console.error('---> applyJobInfo error: ', error)
      res.send({
        status: 'Fail',
        message: error.message || '申请失败，请稍后再试',
        data: {},
      })
    }
  },
  /**
   * 查询职位申请列表
   * POST /video/query-apply-list
   */
  async queryApplyList(req, res) {
    const { userid } = req.body
    // 校验参数userid
    if (!userid) {
      return res.send({
        status: 'Fail',
        message: '参数错误',
        data: {},
      })
    }

    try {
      // 调用 service 获取申请列表
      const result = await videoJobService.queryApplyList({ userid })

      res.send({
        status: 'Success',
        message: '查询成功',
        data: result,
      })
    }
    catch (error) {
      console.error('---> queryApplyList error: ', error)
      res.send({
        status: 'Fail',
        message: error.message || '查询失败，请稍后再试',
        data: {},
      })
    }
  },

  /**
   * 查询文章列表接口
   * POST /video/query-article-list
   */
  async queryArticleList(req, res) {
    const { appId } = req.body

    try {
      const result = await videoJobService.queryArticleList({
        appId,
      })

      res.send({
        status: 'Success',
        message: '查询成功',
        data: result,
      })
    }
    catch (error) {
      console.error('---> queryArticleList error: ', error)
      res.send({
        status: 'Fail',
        message: error.message || '查询失败，请稍后再试',
        data: {},
      })
    }
  },
  /**
   * 插入聊天内容接口
   * POST /video/insert-chat-content
   */
  async insertChatContent(req, res) {
    const { jobId, cmpName, jobTitle, userid, content, concatName, appname, platform, nickname, realname } = req.body
    console.log('insertChatContent req.body: ', req.body)

    // 校验参数jobId、userid、content
    if (!jobId || !userid || !content) {
      return res.send({
        status: 'Fail',
        message: '参数错误',
        data: {},
      })
    }

    try {
      const result = await videoJobService.insertChatContent({
        jobId,
        cmpName,
        jobTitle,
        userid,
        content,
        concatName,
        appname,
        platform,
        nickname,
        realname,
      })

      res.send({
        status: 'Success',
        message: '聊天内容插入成功',
        data: result,
      })
    }
    catch (error) {
      console.error('---> insertChatContent error: ', error)
      res.send({
        status: 'Fail',
        message: error.message || '插入聊天内容失败，请稍后再试',
        data: {},
      })
    }
  },

  /**
   * 查询聊天记录接口
   * POST /video/query-chat-records
   */
  async queryChatRecords(req, res) {
    const { userid, jobId } = req.body

    // 校验参数userid和jobId
    if (!userid || !jobId) {
      return res.send({
        status: 'Fail',
        message: '参数错误',
        data: {},
      })
    }

    try {
      // 先查询是否报名，未报名则不查询聊天记录
      const isApplied = await videoJobService.queryApplyList({ userid, jobId })
      if (isApplied.total === 0) {
        return res.send({
          status: 'Success',
          message: '未报名该职位',
          data: { applied: 0 },
        })
      }

      const records = await videoJobService.queryChatRecords({ userid, jobId })
      res.send({
        status: 'Success',
        message: '查询成功',
        data: { applied: 1, list: records },
      })
    }
    catch (error) {
      console.error('---> queryChatRecords error: ', error)
      res.send({
        status: 'Fail',
        message: error.message || '查询聊天记录失败，请稍后再试',
        data: {},
      })
    }
  },
}
