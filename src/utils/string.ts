import * as crypto from 'crypto'

/**
 * 计算字符串的，整数 md5, 基于 bkdr 算法
 * @param str 任意字符串
 * @param seed 干扰数 31 131 1313 13131 131313 etc..
 */
/* eslint-disable */
export function bkdrIntHash(str = '', seed = 131) {
  if (!str) {
    const random = Math.random() * 10000000;
    str = new Date().getTime().toString() + random;
  }
  const strhash = crypto.createHash('md5').update(`${str}`).digest('hex');

  let hash = 0; // int hash
  let i = 0;
  while (i < strhash.length) {
    hash = parseFloat(String(((hash * seed) & 0xFFFFFFFF) >>> 0)) + strhash.charCodeAt(i++);
  }
  return (hash & 0x7FFFFFFF);
}; 

export function makeUId(numberLength = 10) { // 生成唯一编号（大概率不冲突）
  let random = bkdrIntHash().toString();
  const dist = numberLength - random.length;
  if (dist) {
    const fill = Math.random() * Math.pow(10, dist);
    random = random + fill;
  }
  return parseInt(random.slice(0, numberLength));
}