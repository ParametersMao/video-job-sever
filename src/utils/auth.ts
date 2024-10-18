import crypto from 'crypto'

export function getAuthInfo(authInfo = { token: '', sign: '' }) {
  const { token = '', sign } = authInfo
  console.log('authInfo: ', authInfo, ' token: ', token)
  const [timestamp, expire, busId] = token.split('-')
  return [busId, timestamp, expire, sign]
}

export function verifyAuth(authInfo = { token: '', sign: '' }) {
  const [busId, timestamp, expire, sign] = getAuthInfo(authInfo)
  return verifySign(sign, { signKey: process.env.API_SIGN_KEY, timestamp, expire, busId })
}

export const hashStr = function (str, algorithm = 'md5', digest = 'hex') {
  // @ts-ignore 保持默认配置即可
  return crypto.createHash(algorithm).update(`${str}`).digest(digest)
}

export const md5Str = function (str, digest = 'hex') {
  return hashStr(str, 'md5', digest)
}

export const sign = function ({ signKey, timestamp, expire, busId = '' }) {
  const signStr = `YSM${signKey}ALW${busId}${timestamp}${expire}`.toUpperCase()
  return md5Str(signStr)
}

export function verifySign(remoteSign, params) {
  const currentTimestamp = new Date().getTime()
  const { _signKey, busId, timestamp, expire } = params
  console.log('busId: ', busId)
  console.log('timestamp: ', timestamp, ' expire: ', expire)

  const localSign = sign(params)
  if (localSign === remoteSign) {
    if ((currentTimestamp - timestamp) / 1000 <= expire)
      return { isValid: true, busId }
    else
      return { isValid: false, msg: '签名已经过期，请重新计算', busId }
  }
  else {
    return { isValid: false, msg: '签名计算错误，不匹配', busId }
  }
}

export const cardSign = function ({ Id, cardType, cardValue }) {
  const signKey = process.env.API_SIGN_KEY
  const signStr = `C${signKey}_${Id}_${cardType}_${cardValue}`.toUpperCase()
  return md5Str(signStr)
}
