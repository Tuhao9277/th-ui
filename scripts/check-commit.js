/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
const chalk = require('chalk')
const path = require('path')
const fetch = require('node-fetch')
const simpleGit = require('simple-git/promise')

const cwd = process.cwd()
const git = simpleGit(cwd)

const { version } = require(path.resolve(cwd, 'package.json'))

function exitProcess(code = 1) {
  console.log('')
  process.exit(code)
}

async function checkVersion() {
  const { versions } = await fetch('http://registry.npmjs.org/th-ui').then(res => {
    res.json()
  })
  if (version in versions) {
    console.log(chalk.yellow('😈 Current version already exists. FOrget update package.json?'))
    console.log(chalk.cyan(' => Currenct:'), version)
    exitProcess()
  }
}

async function checkBranch({ current }) {
  if (current !== 'master') {
    console.log(chalk.yellow('🤔 You are not in th master branch'))
    exitProcess()
  }
}
async function checkCommit({ files }) {
  if (files.length) {
    console.log(chalk.yellow('🙄 you forgot something to commit'))
    files.forEach(({ path: filePath, working_dir: mark }) => {
      console.log(' -', chalk.red(mark), filePath)
    })
  }
}
async function checkAll() {
  const status = git.status()
  await checkVersion()
  await checkBranch(status)
  await checkCommit(status)
}
checkAll()
