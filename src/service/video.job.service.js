// services/video.job.service.js
import { Op, db } from '../models'

module.exports = {
  /**
   * 查询职位列表
   * @param {Object} params - 查询参数
   * @param {string} [params.cmpName] - 公司名称
   * @param {string} [params.jobtypeName] - 职位类型名称
   * @returns {Promise<Object>} - 返回查询结果
   */
  async queryJobList(params) {
    const { cmpName, jobtypeName } = params

    const whereClause = {}

    if (cmpName)
      whereClause.cmpName = { [Op.like]: `%${cmpName}%` }

    if (jobtypeName)
      whereClause.jobtypeName = { [Op.like]: `%${jobtypeName}%` }

    console.log('whereClause=', whereClause)

    // 查询职位列表和总数
    const { rows, count } = await db.videoJob.findAndCountAll({
      where: whereClause,
      // order: [['createdAt', 'DESC']], // 按创建时间降序排序
    })
    return {
      total: count,
      data: rows,
    }
  },

  /**
   * 查询职位详情服务
   * @param {number} id - 职位的唯一 ID
   * @returns {Promise<Object>} - 返回职位详情数据或错误信息
   */
  async queryJobById(id) {
    try {
      // 查询职位信息，包含关联的申请信息
      const job = await db.videoJob.findOne({
        where: { id }, // 通过 ID 查询
      })

      // 如果没有找到对应的职位
      if (!job)
        return null // 如果找不到，返回 null

      // 返回查询到的职位信息
      return job
    }
    catch (error) {
      console.error('查询职位信息时发生错误: ', error)
      throw new Error('数据库查询失败')
    }
  },

  /**
   * 保存用户申请职位的信息
   * @param {Object} params - 申请数据
   * @param {number} params.jobId - 职位ID
   * @param {string} params.cmpName - 公司名称
   * @param {string} params.jobTitle - 职位名称
   * @param {string} params.imgUrl - 职位图片
   * @param {string} params.appname - 应用名称
   * @param {string} params.platform - 平台
   * @param {string} params.userid - 用户ID
   * @param {string} [params.email] - 用户邮箱
   * @param {string} params.nickname - 用户昵称
   * @param {string} params.realname - 用户真实姓名
   * @param {number} params.age - 用户年龄
   * @param {number} params.sex - 用户性别
   * @param {string} params.phone - 用户电话
   * @returns {Promise<Object>} - 返回插入结果
   */
  async applyJobInfo(params) {
    try {
      const result = await db.videoJobApply.create({
        jobId: params.jobId,
        cmpName: params.cmpName,
        jobTitle: params.jobTitle,
        imgUrl: params.imgUrl,
        appname: params.appname,
        platform: params.platform,
        userid: params.userid,
        email: params.email,
        nickname: params.nickname,
        realname: params.realname,
        birthday: params.birthday,
        gender: params.gender,
        age: params.age,
        sex: params.sex,
        phone: params.phone,
      })
      return result
    }
    catch (error) {
      console.error('applyJobInfo error:', error)
      throw new Error('数据库操作失败')
    }
  },
  /**
   * 查询职位申请列表
   * @param {Object} params - 查询参数
   * @param {string} [params.userid] - 用户ID
   * @param {number} [params.jobId] - 职位ID
   * @param {string} [params.cmpName] - 公司名称
   * @returns {Promise<Object>} - 返回查询结果
   */
  async queryApplyList(params) {
    const { userid, jobId, cmpName } = params

    const whereClause = {}

    if (userid)
      whereClause.userid = userid

    if (jobId)
      whereClause.jobId = jobId

    if (cmpName)
      whereClause.cmpName = { [Op.like]: `%${cmpName}%` }

    console.log('whereClause=', whereClause)

    // 查询职位申请列表和总数
    const { rows, count } = await db.videoJobApply.findAndCountAll({
      where: whereClause,
      // 可以按创建时间排序
      // order: [['created_at', 'DESC']],
    })

    return {
      total: count,
      data: rows,
    }
  },

  /**
   * 查询文章列表
   * @param {Object} params - 查询参数
   * @param {string} [params.appId] - 应用ID
   * @returns {Promise<Object>} - 返回查询结果
   */
  async queryArticleList(params) {
    const { appId } = params

    const whereClause = {}

    if (appId)
      whereClause.appId = { [Op.like]: `%${appId}%` }

    console.log('whereClause=', whereClause)

    // 查询文章列表和总数
    const { rows, count } = await db.videoJobArticle.findAndCountAll({
      where: whereClause,
    })

    return {
      total: count,
      data: rows,
    }
  },

  /**
   * 插入聊天内容
   * @param {Object} params - 聊天数据
   * @param {number} params.jobId - 职位ID
   * @param {string} params.userid - 用户ID
   * @param {string} params.content - 聊天内容
   * @param {string} [params.concatName] - 联系人
   * @param {string} params.appname - 应用名称
   * @param {string} params.platform - 平台
   * @param {string} params.nickname - 用户昵称
   * @param {string} params.realname - 用户真实姓名
   * @returns {Promise<Object>} - 返回插入结果
   */
  async insertChatContent(params) {
    try {
      const result = await db.videoJobChat.create({
        jobId: params.jobId,
        cmpName: params.cmpName,
        jobTitle: params.jobTitle,
        userid: params.userid,
        content: params.content,
        concatName: params.concatName, // 联系人
        appname: params.appname, // 应用名称
        platform: params.platform, // 平台
        nickname: params.nickname, // 用户昵称
        realname: params.realname, // 用户真实姓名
        // 其他字段可以根据需要添加
      })
      return result
    }
    catch (error) {
      console.error('insertChatContent error:', error)
      throw new Error('数据库操作失败')
    }
  },

  /**
     * 根据用户ID和职位ID查询聊天记录
     * @param {Object} params - 查询参数
     * @param {string} params.userid - 用户ID
     * @param {number} params.jobId - 职位ID
     * @returns {Promise<Object>} - 返回聊天记录
     */
  async queryChatRecords(params) {
    const { userid, jobId } = params

    const whereClause = {}

    if (userid)
      whereClause.userid = userid
    if (jobId)
      whereClause.jobId = jobId

    console.log('whereClause=', whereClause)

    // 查询聊天记录
    const { rows } = await db.videoJobChat.findAll({
      where: whereClause,
      // 可以按创建时间排序
      // order: [['created_at', 'ASC']],
    })

    return rows
  },
}
