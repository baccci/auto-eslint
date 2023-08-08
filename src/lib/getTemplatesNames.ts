import fs from 'node:fs/promises'
import path from 'node:path'
import getAppPath from './getAppPath.js'

export default async function getTemplateNames() {
  const appPath = getAppPath()
  const templatesDir = path.join(appPath, 'templates')
  const templatesNames = await fs.readdir(templatesDir)
  return templatesNames.map(name => name.replace('.json', ''))
}