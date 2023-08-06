import path from 'node:path'

export default function getEslintPath(p: string = './', name: string = '.eslintrc.json') {
  return path.join(p, name)
}
