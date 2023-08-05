import fs from 'node:fs/promises'
import path from 'node:path'
import { __dirname } from '../constants/global.js'
import type { Template } from '../types/templates.js'

export default async function getTemplateJson (templateName: string) {
  try {
    const templatesDir = path.join(__dirname, '..', 'templates')
    const templatePath = path.join(templatesDir, `${templateName}.json`)
    const templateJson = await fs.readFile(templatePath, 'utf-8')
    const json: Template = JSON.parse(templateJson)
    return json
  } catch (error) {
    return null
  }
}