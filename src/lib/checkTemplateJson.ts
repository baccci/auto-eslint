import { Template } from '../types/templates.js'

export default function checkTemplateJson(template: Template) {
  if(typeof template.linterConfigurationFile !== 'string') return false
  if(typeof template.linterDependencies !== 'object') return false
  if(typeof template.linterConfig !== 'object') return false

  return true
}