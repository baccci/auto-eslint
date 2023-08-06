import { Template } from '../types/templates.js'
import { spawn } from 'node:child_process'
import type { PackageManager } from '../types/types.js'

export default async function installDependencies(template: Template, path: string, packageManager: PackageManager) {
  const { linterDependencies } = template
  const dependencies = Object.values(linterDependencies)

  const install = spawn(packageManager, ['i', '-D', ...dependencies], { cwd: path })

  const process = new Promise<number>((resolve, reject) => {
    install.on('error', error => {
      const errorMessage = `There was an error installing the dependencies. \n ${error?.message}`
      reject(errorMessage)
    })

    install.on('close', code => {
      if(code !== 0) return reject(code)
      resolve(code)
    })
  })

  return process
}