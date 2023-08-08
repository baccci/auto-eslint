import * as p from '@clack/prompts'
import color from 'picocolors'
import onCancel from '../lib/onCancel.js'
import { validateExtends, validateFileName } from '../lib/validations.js'
import fs from 'node:fs/promises'
import appRoot from 'app-root-path'

export default async function creatingBasicTemplate() {
  const wizardGroup = await p.group(
    {
      templateName: async () => p.text({
        message: 'What\'s the name of your template?',
        placeholder: 'my-template',
        validate: validateFileName
      }),

      dependencies: async () => p.text({
        message: 'What dependencies do you want to install? leave empty for none',
        placeholder: 'eslint typescript ts-standard'
      }),

      extends: async () => p.text({
        message: 'What should your eslint config extend? leave empty for none',
        placeholder: 'standard typescript ./node_modules/ts-standard/eslintrc.json',
        validate: validateExtends
      }),

      linterConfigFile: async () => p.text({
        message: 'What\'s the name of your linter config file?',
        defaultValue: '.eslintrc.json',
        initialValue: '.eslintrc.json',
        placeholder: '.eslintrc.json',
        validate: (value: string) => validateFileName(value, true)
      })
    },
    {
      onCancel
    }
  )

  const { templateName, dependencies, extends: ext, linterConfigFile } = wizardGroup

  const cwd = appRoot.toString()
  const filePath = `${cwd}/templates/${templateName}.json`
  const fileContent = {
    linterDependencies: dependencies.split(' '),
    linterConfigurationFile: linterConfigFile,
    linterConfig: {
      extends: ext.split(' ')
    }
  }
  
  try {
    await fs.writeFile(filePath, JSON.stringify(fileContent, null, 2))

    p.note(`Template file created successfully! \nYou'll find the new template in ${color.magenta(filePath)}`, color.green('All done! 🎉'))

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : (error as string)
    throw new Error('Error creating template file. \n' + errorMessage)
  }

  process.exit(0)
}
