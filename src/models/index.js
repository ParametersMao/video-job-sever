import { Op, QueryTypes, Sequelize } from 'sequelize'
import * as dbConfig from '../config/db.config.js'

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    ...dbConfig,
  },
)

// 为了避免 在 utf8mb4 字符下，索引超长(limit 768)，默认长度从 255 变为 190
const STRING = Sequelize.STRING
Sequelize.STRING = function (length = 190, binary) {
  return new STRING(length, binary)
}

// 不允许自动修改表名
const define = sequelize.define.bind(sequelize)
sequelize.define = function (tbName, schmea, options) {
  return define(tbName, schmea, { ...(options || {}), freezeTableName: true })
}

const db = {
  Sequelize,
  sequelize,
  user: require('./user.model.ts').default(sequelize, Sequelize),
  env: require('./env.model.ts').default(sequelize, Sequelize),

  // 视频剪辑兼职
  videoJob: require('./video.job.postings.model.ts').default(sequelize, Sequelize),
  videoJobDeatil: require('./video.job.detail.model.ts').default(sequelize, Sequelize),
  videoJobApply: require('./video.job.apply.model.ts').default(sequelize, Sequelize),
  videoJobArticle: require('./video.job.article.model.ts').default(sequelize, Sequelize),
  videoJobChat: require('./video.job.chat.model.ts').default(sequelize, Sequelize),

}

export { db, QueryTypes, Op }
