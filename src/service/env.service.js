import { db } from '../models'

export const getEnvInfo = async (appid) => {
  try {
    const envInfo = await db.env.findOne({
      where: {
        appid,
      },
    })
    return envInfo
  }
  catch (error) {
    console.error('查询过程中发生错误:', error)
    throw error
  }
}
