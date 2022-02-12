// 📝 Running this script ensures we have the latest version of `browser-polyfill.js` in
// the root folder so that `manifest.json` can load it

const fsSync = require('node:fs')
const fs = require('node:fs/promises')
const path = require('node:path')

const projectRoot = process.cwd()
const fileName = 'browser-polyfill.js'
const originalPath = path.join(
  projectRoot,
  'node_modules',
  'webextension-polyfill',
  'dist',
  fileName,
)
const targetPath = path.join(
  projectRoot,
  fileName,
)

async function run () {
  if (fsSync.existsSync(targetPath)) {
    await fs.rm(targetPath)
  }

  await fs.copyFile(originalPath, targetPath)
}

run()
