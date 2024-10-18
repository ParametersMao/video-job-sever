import { verifyAuth } from '../utils/auth'
import { QueryTypes, db } from '../models'

// 用户内存缓存，加速访问
const USER_CACHE = {}

const auth = async (req, res, next) => {
  const authInfo = req.body.auth || req.query.auth
  const isDev = process.env.NODE_ENV === 'devlopment'
  const isDouyin = authInfo.platform === 'douyin'
  console.log('authInfo: ', authInfo)

  const { isValid, msg, busId } = verifyAuth(authInfo)
  if (!isDev && (!isValid || !authInfo)) {
    return res.send(401, { status: '401', message: msg, data: null })
  }
  else {
    let currentUser = USER_CACHE[busId]
    if (!currentUser || new Date().getTime() > currentUser.expireAt) {
      console.log('busId: ', busId)
      const users: any[] = !busId
        ? []
        : (!isDouyin
            ? await db.sequelize.query(`SELECT userUId, username, role, createdAt from user where userUId='${busId}' limit 1`, { type: QueryTypes.SELECT })
            : await db.sequelize.query(`SELECT uid from douyin_user_info where uid='${busId}' limit 1`, { type: QueryTypes.SELECT }))
      if (!(users && (users[0]?.userUId || users[0]?.uid)))
        return res.send(401, { status: '401', message: '未查询到当前用户', data: null })

      const [user] = users
      currentUser = {
        uid: busId,
        username: user.username || '',
        role: user.role || '',
        isAdmin: user.role === 500,
        createdAt: user.createdAt || '',
        expireAt: new Date().getTime() + 10 * 60 * 1000, // 最多10分钟缓存过期
        platform: authInfo?.platform || '',
      }
    }

    req.currentUser = currentUser
    USER_CACHE[busId] = currentUser
    next()
  }
}

export { auth }
