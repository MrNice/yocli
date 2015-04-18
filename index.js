var fs = require('fs');
var parser     = require('nomnom');
var fileExists = require('file-exists');

var yoapi = require('yo-api');

var setup = require('./setup');

var yoclirc = getUserHome() + '/.yoclirc';

var config;
var apiKey;
var commandName = 'yocli';

if (fileExists(yoclirc)) {
  config = JSON.parse(fs.readFileSync(yoclirc));
  run(config.apiKey, config.commandName);
} else {
  console.log('Please setup yoclirc');
  // run init prompt
  setup(yoclirc, function(err, config) {
    if (err) throw err;
    fs.writeFileSync(yoclirc, JSON.stringify(config));
    run(config.apiKey, config.commandName);
  });
}

function run(apiKey, commandName) {
  var keyData = {
    abbr: 'k',
    metavar: 'API_KEY',
    help: 'use a specific api key'
  };

  var urlData = {
    abbr: 'u',
    metavar: 'URL',
    help: 'URL link or image to send'
  };
  // TODO Change this based on loading json and checking for not manual symlink
  parser.script(commandName);

  parser.command('yo')
    .option('key', keyData)
    .option('url', urlData)
    .callback(function(opts) {
      var key = opts.key || apiKey;
      yoapi(key, opts[1], opts.url)
        .then(function() {
          console.log('Yo sent to ' + opts[1]);
        })
        .catch(function(err) {
          console.log(err.message);
          process.exit(1);
        });
    });

  parser.command('all')
    .option('key', keyData)
    .option('url', urlData)
    .callback(function(opts) {
      var key = opts.key || apiKey;
      yoapi(key, 'all', opts.url)
        .then(function() {
          console.log('Yo sent to all');
        })
        .catch(function(err) {
          console.log(err.message);
          process.exit(1);
        });
    })
    .help('Yo all Yo subscribers');

  parser.command('subs')
    .option('key', keyData)
    .callback(function(opts) {
      var key = opts.key || apiKey;
      yoapi.subs(key)
        .then(function(responseBody) {
          console.log('Yo have ' + responseBody.count + ' subscribers');
        })
        .catch(function(err) {
          console.log(err.message);
          process.exit(1);
        })
    })
    .help('Count Yo subscribers');

  parser.command('init')
    .callback(function(opts) {
      setup(yoclirc, function(err, config) {
        fs.writeFileSync(yoclirc, JSON.stringify(config));
        process.exit(0);
      });
    })
    .help('Rerun initial setup');

  parser.parse();
}

function getUserHome() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}