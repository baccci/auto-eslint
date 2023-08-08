import fs from 'node:fs/promises'
import path from 'node:path'
import getAppPath from './getAppPath.js'
import getTemplateJson from './getTemplateJson.js'

export default async function getTemplateNames() {
  const appPath = getAppPath()
  const templatesDir = path.join(appPath, 'templates')
  const templatesNames = await fs.readdir(templatesDir)

  const templatesDescriptions = await Promise.all(
    templatesNames.map(async name => {
      const templateJson = await getTemplateJson(name.replace('.json', ''))
      return templateJson?.description
    })
  )

  return templatesNames.map((name, index) => ({ name: name.replace('.json', ''), description: templatesDescriptions[index] }))
}