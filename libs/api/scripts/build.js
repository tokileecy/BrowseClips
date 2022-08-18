const fs = require('fs')
const path = require('path')

const packagePath = path.resolve(__dirname, '../package.json')

const {
  packageManager, 
  devDependencies, 
  scripts,
  ...package
} = JSON.parse(fs.readFileSync(packagePath))

const distPackagePath = path.resolve(__dirname, '../dist/package.json')

fs.writeFileSync(distPackagePath, JSON.stringify({
  main: 'index.js',
  ...package,
}))