# auto-eslint
Easily install ESLint with your own rules and configuration 🧙

---

`auto-eslint` is a CLI tool built to help you install and configure your ESLint linter.

It uses `templates` to store the different configurations you may need to get your linter working, such as dependencies you have to install or
ESLint configuration files, among others.

- 💎 Beautiful and minimalist UI provided by [`@clack`](https://github.com/natemoo-re/clack/).
- 👌 Easy setup.
- 🧾 Comes with prebuilt templates.

## How to use

### Install
I recommend you install it as a global dependency, so you can use it anywhere. It's up to you.

**npm**

```
npm i auto-eslint -g
```

**yarn**

```
yarn global add auto-eslint
```

**pnpm**

```
pnpm i auto-eslint -g
```



### Getting started
Run the following command in your terminal to run the CLI.

```sh
auto-eslint
```

Once you run it, you can simply use one of the prebuilt templates or you can create a new one.
Each template has a description.

### Choosing a template
A name or a description fits your needs and you choose it. The CLI will look if you have any ESLint configuration file. If you agree to continue and you have the file, 
the program will modify it according to the template. In case you don't have the configuration file, it will create it for you.

In some cases, you may need another extra file, like a `tsconfig.json` file. In those cases the CLI will create it for you.

Once you have all the files you need, the script will install all the dependencies, letting you to decided what package manager to use.

When the installing process ends, the linter should be working as expected. 

_(Sometimes you may need to restart your code editor in order to work)_

### Creating a new template

If you chose to create a new template, you can use the wizard to create a basic one or instead create one manually by yourself.

The templates you can create with the wizard are very limited. You can only specify the dependencies you need and what should the ESLint extends.

## Templates

Templates are `.json` files that specify what you need to get the lint working as you want. They are stored in `/dist/templates/` inside the path of the package. 
If you want to make one by yourself, the wizard will give you the exact location of the templates folder in your system.

### Structure
The list of properties you can set up in a template file:

`description`: Description of the template, what it does or what it is for. 

For example: 'Standard style guide for typescript projects running in NodeJS'.

`linterDependencies`: An array of the dependencies you will need to install. All this dependencies will be installed as dev dependencies.

For example: ["eslint", "ts-standard", "typescript"]

`linterDependencies`: What's your ESLint configuration file, by default .eslintrc.json.

`linterConfig`: What will be written inside your configuration file. It will only look for certain properties, such as **extends**, **rules**, **plugins**, **settings**, **files** and **parserOptions**.

In case you already have a configuration file, It won't delete the existing configuration.

`necesaryFiles`: An array of the files you must have for the linter to work. By default, empty.

`defaultFiles`: A list of files you may need. In case you have a file in the list of **necesaryFiles**, the program will look for it in the root. If it doesn't exist, it will write it with the
information in this list. The name of the 'necessary file' must match exactly the name of this list.

---

This project is pretty basic and straightforward since I've made it for my own needs, but I would be glad to receive any contribution to it!



