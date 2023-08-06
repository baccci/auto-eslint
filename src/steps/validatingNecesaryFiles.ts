import fs from 'node:fs'
import * as p from '@clack/prompts'
import color from 'picocolors'
import type { Template } from '../types/templates.js'

export default async function validatingNecesaryFiles(template: Template, path: string) {
  
  const { necesaryFiles } = template
  if(!necesaryFiles) return

  for (const file of necesaryFiles) {
    try {
      await checkFileExistence({ path, file, template })
      console.log(`The file ${color.magenta(file)} was created successfully.`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : (error as string)
      p.cancel(`\n An error ocurred while creating the file ${color.magenta(file)}. \n ${errorMessage}`)
      process.exit(0)
    }
  }

}

interface CheckFileExistenceArgs {
  path: string
  file: string
  template: Template
}

const checkFileExistence = async ({ path, file, template }: CheckFileExistenceArgs) => {
  const fileExists = fs.existsSync(`${path}/${file}`)

  if(!fileExists) {
    const confirm = await p.confirm({ 
      message: `\n A ${color.magenta(file)} file is necesary, otherwise the linter may not work properly. Do you want to create it?`
    })

    if(!confirm) return true
    
    const fileTemplate = template.defaultFiles[file]
    
    if(!fileTemplate) {
      console.log(`\n\t The file ${color.magenta(file)} was not provided by the template. Please, create it manually.`)
      return true
    }
    
    return fs.promises.writeFile(`${path}/${file}`, JSON.stringify(fileTemplate, null, 2))
  }
}