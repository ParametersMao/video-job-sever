const fs = require('fs')
const nodePath = require('path')

const filePath = require.resolve('sequelize-cli/lib/helpers/generic-helper.js')
let helperFile = fs.readFileSync(filePath, 'utf-8')
helperFile = helperFile.replace('sequelizePath = require.resolve(resolvePath, resolveOptions);', `
   const require_path_resolve = process.require_resolve || require.resolve;
   sequelizePath = require_path_resolve(resolvePath, resolveOptions);
`)
fs.writeFileSync(filePath, helperFile, 'utf-8')

process.require_resolve = (path, options) => {
  return nodePath.join(options.basedir, 'src/scripts/sequelize.js')
}

const migrate = require('sequelize-cli/lib/commands/migrate')
migrate.handler({ _: ['db:migrate'] })
