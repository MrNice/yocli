var fs = require('fs');
var os = require('os');
var parser = require('nomnom');
var prompt = require('prompt');

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

parser.nocommand()
  .options({
    username: {
      position: 0,
      help: 'Yo this username',
      list: true
  }})
  .option('key', keyData)
  .option('url', urlData);

parser.command('all')
  .option('key', keyData)
  .option('url', urlData)
  .callback(function(opts) {})
  .help('Yo all yo subscribers');

parser.command('subs')
  .option('key', keyData)
  .callback(function(opts) {})
  .help('Get a count of yo subscribers');

parser.command('init')
  .callback(function(opts) {})
  .help('Rerun initial setup');
// console.log(parser.parse());
parser.parse();
