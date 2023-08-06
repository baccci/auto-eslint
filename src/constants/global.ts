/* eslint-disable @typescript-eslint/naming-convention */

import { fileURLToPath } from 'url'
import path from 'node:path'

export const __filename = fileURLToPath(import.meta.url)

export const __dirname = path.dirname(__filename)

export const SELECT_STRINGS = {
  YES: 'yes',
  NO: 'no'
}