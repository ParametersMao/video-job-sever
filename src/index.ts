import express from 'express'

import './config/index'
import { db } from './models'


import userController from './controller/user'
import videoJobController from './controller/video.job'

import { isNotEmptyString } from './utils/is'

const app = express()
const router = express.Router()

app.locals.sdModelList = {}

app.all('*', (req, res, next) => {
  let reqUrl = req.url
  if (req.query.auth)
    reqUrl = reqUrl.replace((req.query.auth as any).sign || '', '***')
  console.log('request start--->', reqUrl)

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

app.use(express.static('public'))
app.use(
  express.json({
    limit: '102400kb', // 100 MB
  }),
)

db.sequelize
  .sync({ force: false })
  .then(() => {
    globalThis.console.log('Synced db.')
  })
  .catch((err: Error) => {
    globalThis.console.log(`Failed to sync db: ${err.message}`)
  })
// ==== 添加中间件
app.use('', router)
app.use('/api', router)
app.set('trust proxy', 1)

// 解析 multipart/form-data 请求
app.use(express.text({ type: 'multipart/form-data', limit: '10mb' }))

// 短视频剪辑
router.post('/user/send-sms', [], userController.sendSms)
router.post('/user/verify-sms', [], userController.verifySms)

router.post('/video/query-job-list', [], videoJobController.queryJobList)
router.post('/video/query-job-detail', videoJobController.getJobDetail)
router.post('/video/apply-job-info', videoJobController.applyJobInfo)
router.post('/video/query-apply-list', [], videoJobController.queryApplyList)

router.post('/video/query-article-list', [], videoJobController.queryArticleList)

// 插入聊天内容接口
router.post('/video/insert-chat-content', [], videoJobController.insertChatContent)

// 查询聊天记录接口
router.post('/video/query-chat-records', [], videoJobController.queryChatRecords)


app.listen(8867, () =>
  globalThis.console.log('Server is running on port 8867'),
)
