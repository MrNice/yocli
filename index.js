var path = require('path');
var parser = require('nomnom');
var fileExists = require('file-exists');

var yoapi = require('yo-api');

var setup = require('./setup');

var yoclirc = getUserHome() + '/.yoclirc';

var config;
var apiKey;

if (!fileExists(yoclirc)) {
  console.log('Please setup yoclirc');
  // run init prompt
  setup(yoclirc);
} else {
  config = JSON.parse(fs.readFileSync(yoclirc));
  apiKey = config.apiKey;
}

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
parser.script('yocli');

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
  .help('Yo all yo subscribers');

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
  .help('Get a count of yo subscribers');

parser.command('init')
  .callback(function(opts) {

  })
  .help('Rerun initial setup');

parser.parse();

function getUserHome() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}