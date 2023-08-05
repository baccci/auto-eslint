import * as p from '@clack/prompts'
import color from 'picocolors'
import readingTemplate from './steps/readingTemplate.js'
import installingDependencies from './steps/installingDependencies.js'
import validatingNecesaryFiles from './steps/validatingNecesaryFiles.js'
import rewritingEslintConfig from './steps/rewritringEslitConfig.js'

export default async function useExistingTemplate(route: string, templateSelection: string) {
  const { outro, isCancel } = p
  
  try {

    const { eslintConfigPath, templateJson } = await readingTemplate(route, templateSelection)
        
    const confirmWrite = await p.confirm({
      message: `This action will modify your ESLint configuration file in the path ${color.magenta(
        eslintConfigPath
      )} (if exists). \n  Do you want to continue?`
    })

    if(isCancel(confirmWrite)) {
      p.cancel('No changes were made.')
      process.exit(0)
    }

    if (!confirmWrite) {
      outro('No changes were made.')
      process.exit(0)
    }

    const { packageManagerString } = await installingDependencies(templateJson, route)

    p.note(`\n ${color.green(`Dependencies installed successfully with ${packageManagerString}.`)}`)

    await validatingNecesaryFiles(templateJson, route)

    const templateSpinner = p.spinner()
    templateSpinner.start('Now, installing the template...')

    await rewritingEslintConfig(templateJson, eslintConfigPath)
    
    templateSpinner.stop()

    p.note(`\n ${color.green('Template installed successfully.')}`)
    
    outro('All done! \n Somethings may not work properly until you restart your editor. Happy coding!')
    process.exit(0)

  } catch (e) {
    if(typeof e === 'string') outro(e)
    process.exit(0)
  }
}