
export const validateFileName = (fileName: string, allowEmpty: boolean = false): string | undefined => {
  if(allowEmpty && fileName.length < 1) return undefined 
  if (fileName.length < 1) return 'You need to provide a name for your template'
  const regex = /^[a-z0-9_.@(-/]+$/
  if(!regex.test(fileName)) return 'The name of your template can only contain lowercase letters, numbers, dots, underscores, @, (), + and -'
}

export const validateExtends = (extendsString: string): string | undefined => {
  if(!extendsString) return undefined
  const extendsArray = extendsString.split(' ')
  const invalidExtend = extendsArray.some((extend) => validateFileName(extend))
  if(invalidExtend) return 'The extends field can only contain lowercase letters, numbers, dots, underscores, @, (), + and -'
}