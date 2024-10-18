const { Sequelize } = require('sequelize')
const monitor = {
  success(msg) {
    console.log(msg)
  },
}

class SequelizePower extends Sequelize {
  constructor(config) {
    const instance = new Sequelize(config)
    const queryInterface = instance.getQueryInterface()
    const extendQueryInterface = SequelizePower.extendSqlDBInterface(queryInterface)

    instance.getQueryInterface = () => {
      return extendQueryInterface
    }
    return instance
  }

  static extendSqlDBInterface(queryInterface) {
    [
      'addColumn', 'removeColumn', 'changeColumn',
      'renameColumn', 'addConstraint', 'removeConstraint',
      'addIndex', 'removeIndex',
    ].forEach((method) => {
      const raw = queryInterface[method].bind(queryInterface)
      queryInterface[method] = async (...args) => {
        try {
          await raw(...args)
          monitor.success(`------>success ${method} {${args[1]}} to [${args[0]}]: `)
        }
        catch (ex) {
          console.log(`------>faild add ${method} {${args[1]}} to [${args[0]}]: ${ex.message}`)
        }
      }
    })
    return queryInterface
  }
}

module.exports = SequelizePower
