import installDependencies from '../lib/installDependencies.js'
import * as p from '@clack/prompts'
import type { PackageManager } from '../types/types.js'
import type { Template } from '../types/templates.js'

export default async function installingDependencies(templateJson: Template, route: string) {
  const packageManager: PackageManager | symbol = await p.select({
    message: 'Which package manager are you using?',
    options: [
      { value: 'npm', label: 'npm' },
      { value: 'yarn', label: 'yarn' },
      { value: 'pnpm', label: 'pnpm' }
    ]
  })

  if(p.isCancel(packageManager)) {
    p.cancel('No changes were made.')
    process.exit(0)
  }

  const packageManagerString = typeof packageManager === 'string' ? packageManager : 'npm'

  const dependenciesSpinner = p.spinner()
  dependenciesSpinner.start(`Installing dependencies with ${packageManagerString}...`)

  await installDependencies(templateJson, route, packageManagerString)

  dependenciesSpinner.stop()

  return { packageManagerString }
}