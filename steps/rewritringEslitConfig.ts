import { Template } from '../types/templates.js'
import fs from 'node:fs'
import cleanObject from '../lib/cleanObject.js'

export default async function rewritingEslintConfig(template: Template, path: string) {
  try {
    const eslintConfigExists = fs.existsSync(path)

    if (!eslintConfigExists) await fs.promises.writeFile(path, '')

    const eslintConfigJson = await fs.promises.readFile(path, 'utf-8')
    const eslintConfigData = eslintConfigJson?.replace('module.exports = ', '') || '{}'
    const eslintConfig = JSON.parse(eslintConfigData)

    const originalExtends = eslintConfig?.extends
    const templateExtends = template.linterConfig.extends
    const newExtends: string[] | string | undefined = saveValueDependingType(originalExtends, templateExtends)
  
    const originalPlugins = eslintConfig?.plugins
    const templatePlugins = template.linterConfig.plugins
    const newPlugins: string[] | string | undefined = saveValueDependingType(originalPlugins, templatePlugins)
    
    const originalFiles = eslintConfig?.files
    const templateFiles = template.linterConfig.files
    const newFiles: string[] | string | undefined = saveValueDependingType(originalFiles, templateFiles)
    
    const newRules = { ...eslintConfig?.rules, ...template.linterConfig.rules }
    
    const newSettings = {
      ...eslintConfig?.settings,
      ...template.linterConfig.settings
    }
    const newParserOptions = {
      ...eslintConfig?.parserOptions,
      ...template.linterConfig.parserOptions
    }
    const newGlobals = {
      ...eslintConfig?.globals,
      ...template.linterConfig.globals
    }
    const newEnv = { ...eslintConfig?.env, ...template.linterConfig.env }

    const newConfig = {
      ...eslintConfig,
      extends: newExtends,
      rules: newRules,
      plugins: newPlugins,
      settings: newSettings,
      parserOptions: newParserOptions,
      globals: newGlobals,
      env: newEnv,
      files: newFiles
    }

    const cleanedConfig = cleanObject(newConfig)

    const eslintConfigIsJson = path.endsWith('.json')
    const moduleExportsString = eslintConfigIsJson ? '' : 'module.exports = '

    await fs.promises.writeFile(
      path,
      moduleExportsString + JSON.stringify(cleanedConfig, null, 2)
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : (error as string)
    throw new Error(`There was an error rewriting the ESLint configuration file. \n ${errorMessage}`) 
  }  
}

function saveValueDependingType (originalValues?: string | string[], newValues?: string | string[]) {

  if (!newValues) return originalValues
  const _newValues = typeof newValues === 'string' ? newValues : [...new Set(newValues)]

  if (!originalValues) return newValues
  const _originalValues = typeof originalValues === 'string' ? originalValues : [...new Set(originalValues)]

  if (
    typeof _originalValues === 'string' &&
    typeof _newValues === 'string'
  ) return [...new Set([_originalValues, _newValues])]

  if (
    typeof _originalValues === 'string' &&
    Array.isArray(_newValues)
  ) return [...new Set([_originalValues, ..._newValues])]

  if (
    Array.isArray(_originalValues) &&
    typeof _newValues === 'string'
  ) return [...new Set([..._originalValues, _newValues])]

  if (
    Array.isArray(_originalValues) &&
    Array.isArray(_newValues)
  ) return [...new Set([..._originalValues, ..._newValues])]
}