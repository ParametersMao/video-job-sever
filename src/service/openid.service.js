import { db } from '../models'

export const getOpenid = async (uid, wx_app_id) => {
  try {
    const wxOpenid = await db.wx_openid.findOne({
      where: {
        uid,
        wx_app_id,
      },
    })
    return wxOpenid
  }
  catch (error) {
    console.error('查询过程中发生错误:', error)
    throw error
  }
}

export const updateOpenid = async (uid, wx_app_id, data) => {
  try {
    const updatedRows = await db.wx_openid.update(
      data,
      { where: { uid, wx_app_id } },
    )
    if (updatedRows[0] > 0)
      return true

    else
      return false
  }
  catch (error) {
    console.error('更新用户openid失败:', error)
    throw error
  }
}

export const createOpenid = async (uid, data) => {
  try {
    data = {
      ...data,
      uid,
    }
    const wxOpenid = await db.wx_openid.create(data) // 记录聊天记录
    return wxOpenid
  }
  catch (error) {
    console.error(`创建用户openid记录失败,uid: ${uid}.`, error)
    throw error
  }
}

export const getDouYinUser = async (openid) => {
  try {
    const user = await db.douyin_user.findOne({
      where: {
        openid,
      },
    })
    return user
  }
  catch (error) {
    console.error('查询过程中发生错误:', error)
    throw error
  }
}

export const createDouYinUser = async (data) => {
  try {
    const user = await db.douyin_user.create(data)
    return user
  }
  catch (error) {
    console.error(`创建用户记录失败,data: ${data}.`, error)
    throw error
  }
}
