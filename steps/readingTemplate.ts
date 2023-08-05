import checkTemplateJson from '../lib/checkTemplateJson.js'
import getEslintPath from '../lib/getEslintPath.js'
import getTemplateJson from '../lib/getTemplateJson.js'

type EslintConfigPath = string

export default async function readingTemplate(route: string, templateSelection: string) {
  const templateJson = await getTemplateJson(templateSelection)
  if(!templateJson) throw new Error('There was an error loading the template.')

  const eslintConfigPath: EslintConfigPath = getEslintPath(
    route,
    templateJson?.linterConfigurationFile
  )
  const templateIsCorrect = checkTemplateJson(templateJson)

  if (!templateJson || !templateIsCorrect) {
    throw new Error(
      'There was an error installing the template.' +
      ' Seems like the template is not valid or it does not exist. ' +
      '\n  Please, try again.'
    )
  }

  return { eslintConfigPath, templateJson }
}