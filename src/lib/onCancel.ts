import { cancel } from '@clack/prompts'

export default function onCancel() {
  cancel('No changes were made.')
  process.exit(0)
}