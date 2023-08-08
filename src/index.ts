#!/usr/bin/env node

import * as p from '@clack/prompts'
import color from 'picocolors'
import { introMessage } from './constants/messages.js'
import getTemplateNames from './lib/getTemplatesNames.js'
import { SELECT_STRINGS } from './constants/global.js'
import useExistingTemplate from './useExistingTemplate.js'
import creatingBasicTemplate from './steps/creatingBasicTemplate.js'
import getAppPath from './lib/getAppPath.js'

async function main () {

  const { intro, outro } = p

  intro(introMessage)
  const route = process.argv[2] || '.'

  const templateNames = await getTemplateNames()

  const group = await p.group({
    templateSelection: async (): Promise<string | symbol> =>
      await p.select({
        message: 'Would you like to load a template? \n',
        options: [
          { value: 'no', label: "No, I'd like create my own." },
          ...templateNames.map((name) => ({ value: name, label: name }))
        ]
      })
  })

  if (group.templateSelection !== 'no') {
    await useExistingTemplate(route, group.templateSelection)
  }

  const confirmManuallyAdd = await p.select({
    message: 'Do you want to create a basic template file?',
    options: [
      { value: SELECT_STRINGS.NO, label: 'No, I prefer to do it myself.', hint: 'You\'ll get instructions' },
      { value: SELECT_STRINGS.YES, label: 'Yes.' }
    ]
  })

  if(confirmManuallyAdd === SELECT_STRINGS.NO) {
    const rootPath = getAppPath()
    console.log(
      `\n You need to create a new file with ${color.magenta('.json')} extension name in the path` +
      ` ${color.magenta(rootPath + '/templates')} \n`
    )
    console.log('You can learn how to create a template file in the documentation: https://github.com/baccci/auto-eslint-cli \n')

    outro('\n Thanks for using auto-eslint-cli, happy coding!')
    process.exit(0)
  }

  try {
    await creatingBasicTemplate()
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : (error as string)
    outro(errorMessage)
  }

  process.exit(0)
}

await main()
