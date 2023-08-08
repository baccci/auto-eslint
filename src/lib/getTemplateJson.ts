import fs from 'node:fs/promises'
import path from 'node:path'
import type { Template } from '../types/templates.js'
import getAppPath from './getAppPath.js'

export default async function getTemplateJson (templateName: string) {
  try {
    const appPath = getAppPath()
    const templatesDir = path.join(appPath, 'templates')
    const templatePath = path.join(templatesDir, `${templateName}.json`)
    const templateJson = await fs.readFile(templatePath, 'utf-8')
    const json: Template = JSON.parse(templateJson)
    return json
  } catch (error) {
    return null
  }
}