#!/usr/local/bin/node

let chalk = require('chalk')
let program = require('commander')
const vorpal = require('vorpal')()
let config = require('./Configuration/config')
let table = require('./commands/command.table')

vorpal
    .command('dev', 'run according to config file locally')
    .option('-c, --config <conf>', 'xyz config file to use. if not, will use ./xyzrc.json')
    .option('-x, --xyzadmin', 'lunch an xyz core instance inside the cli process')
    .action(function (args, callback) {
      require('./commands/command.dev')(args)
      callback()
    })

vorpal
  .command('ls', 'list of all instances currently active')
  .alias('list')
  .action(function (args, callback) {
    table()
    callback()
  })

vorpal
  .command('inspect <identifier>', 'show details of a node. identifier must be the name or id')
  .alias('insp')
  .action(function (args, callback) {
    config.inspect(args.identifier, false)
    callback()
  })

vorpal
  .command('inspectSelf', 'show the xyz-core insatance in curretn cli process. works only with -x option after dev command')
  .alias('inspS')
  .action(function (args, callback) {
    this.log(config.getAdmin())
    callback()
  })

vorpal
  .command('inspectJSON <identifier>', 'show details of a node. identifier must be the name or id')
  .alias('inspJ')
  .action(function (args, callback) {
    config.inspect(args.identifier, true)
    callback()
  })

vorpal
  .command('kill <identifier>', 'kill a node. identifier must be the name or id')
  .action(function (args, callback) {
    config.kill(args.identifier, () => {
      callback()
    })
  })

// TODO support additional paramss
vorpal
  .command('duplicate <identifier> ', 'duplicate a node. identifier must be the name or id')
  // .option('-p, -params <cmdParams>', 'additional command line parameters appended to the spawn args')
  .alias('dup')
  .action(function (args, callback) {
    config.duplicate(args.identifier)
    callback()
  })

  // TODO support additional paramss
vorpal
  .command('restart <identifier>', 'restart a given node. identifier must be the name or id')
  // .option('-p, -params <cmdParams>', 'additional command line parameters appended to the spawn args')
  .alias('rest')
  .action(function (args, callback) {
    config.restart(args.identifier, (err) => {
      callback()
    })
  })

console.log(chalk.bold.green(`
  _   _ ___________ _____     __   ____   ________
| \ | |  _  |  _  \\  ___|    \\ \\ / /\\ \\ / /___  /
|  \\| | | | | | | | |__ ______\\ V /  \\ V /   / /
| . \` | | | | | | |  __|______/   \\   \\ /   / /
| |\\  \\ \\_/ / |/ /| |___     / /^\\ \\  | | ./ /___
\\_| \\_/\\___/|___/ \\____/     \\/   \\/  \\_/ \\_____/
\n`) + chalk.bold.blue('microservice microframework for NodeJS\n'))
  //
vorpal
    .delimiter('xyz > ')
    .parse(process.argv)
    .show()

// catches ctrl+c event
process.on('SIGINT', () => {
  console.log(chalk.bold.red(`[SIGINT] CLI Process About to exit.`))
  config.clean()
  process.exit()
})

// catches uncaught exceptions
process.on('uncaughtException', (e, ee) => {
  console.log(chalk.bold.red(`[uncaughtException] CLI Process About to exit.\n ${e}`))
  config.clean()
  process.exit()
})
