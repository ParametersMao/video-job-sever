// 此配置用于 给 seqlize 的 cli 使用
const dbConfig = require('./db.config')

module.exports = {
  development: dbConfig,
  test: dbConfig,
  production: dbConfig,
}
