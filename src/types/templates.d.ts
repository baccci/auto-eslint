
export interface Template {
  description: string
  linterDependencies: string[]
  linterConfigurationFile: string
  linterConfig: {
    extends: string | string[]
    rules: {
      [key: string]: 'off' | 'warn' | 'error'
    }
    plugins: string | string[]
    settings: {
      [key: string]: any
    }
    files: string[] | string
    [key: string]: any
    parserOptions: {
      [key: string]: any
    }
  }
  necesaryFiles: string[]
  defaultFiles: {
    [key: string]: string
  }
}