import { fileURLToPath } from 'url'
import path from 'node:path'

export default function getAppPath() {
  const filename = fileURLToPath(import.meta.url)
  const dirname = path.dirname(filename)
  const cwd = dirname.replace(/[\\/]lib$/, '')

  return cwd
}