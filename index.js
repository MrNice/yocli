#!/usr/bin/env node
var _          = require('lodash');
var fs         = require('fs');
var validator  = require('validator');
var fileExists = require('file-exists');

var yoapi = require('yo-api2');
var setup = require('./setup');

var yoclirc = getUserHome() + '/.yoclirc';

var yargs = require('yargs')
  .usage('Usage: $0 <command> -u [URL] -k [KEY]')
  .command('<username>', 'Yo this user')
  .command('all', 'Yo all Yo subscribers')
  .command('subs', 'Count Yo subscribers')
  .command('init', 'Rerun initial setup')
  .config(yoclirc)
  .help('h')
  .alias('h', 'help')
  .option('k', {
    alias: 'key',
    demand: false, // We actually do but need prompt first
    type: 'string',
    describe: 'API Key to use (get from https://dev.justyo.co/)'
  })
  .option('u', {
    alias: 'url',
    demand: false,
    type: 'string',
    describe: 'URL for link or image to send'
  })
  .version(function() {
    return require('../package').version;
  })
  .epilog('Yo');

var argv = yargs.argv;

// Normalize argv for --key and autoload config usages
if (!fileExists(yoclirc) && !_.isString(argv.k)) {
  // run init prompt
  setup(yoclirc)
    .then(function(config) {
      // Save yoclirc
      fs.writeFileSync(yoclirc, JSON.stringify(config));
      // Format argv for run()
      argv.k = config.apiKey;
      run(argv);
    })
    .catch(function(err) {
      console.log(err.message);
      process.exit(1);
    });
} else {
  argv.k = JSON.parse(fs.readFileSync(yoclirc)).apiKey;
  run(argv);
}

function run(argv) {
  if (argv.u && !validator.isURL(argv.u)) {
    console.log('--url Link must be a valid URL'.red);
    return yargs.showHelp();
  }
  if (_.isUndefined(argv._[0])) return yargs.showHelp();
  switch (argv._[0]) {
    case 'init':
      setup(yoclirc)
        .then(function(config) {
          fs.writeFileSync(yoclirc, JSON.stringify(config));
          console.log('All set and ready to go!');
        })
        .catch(logErrQuit);
      break;
    case 'subs':
      yoapi.subs(argv.k)
        .then(function(responseBody) {
          console.log('Yo have ' + responseBody.count + ' subscribers');
        })
        .catch(logErrQuit);
      break;
    default:
      var username = argv._[0];
      yoapi(argv.k, username, argv.u)
        .then(function() {
          console.log('Yo sent to ' + username);
        })
        .catch(logErrQuit);
  }
}

function logErrQuit(err) {
  console.log(err.message);
  process.exit(1);
}


function getUserHome() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}
