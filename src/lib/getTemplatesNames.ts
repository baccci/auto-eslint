import fs from 'node:fs/promises'
import path from 'node:path'
import { __dirname } from '../constants/global.js'

export default async function getTemplateNames() {
  const templatesDir = path.join(__dirname, '..', 'templates')
  const templatesNames = await fs.readdir(templatesDir)
  return templatesNames.map(name => name.replace('.json', ''))
}