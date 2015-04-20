var Promise = require('bluebird');

var prompt = Promise.promisifyAll(require('prompt'));

function setup(location) {
  console.log('Hey there, let\'s setup Yo CLI');
  console.warn('Warning: '.red + 'YoCLI stores auth data unencrypted in ~/.yoclirc');
  prompt.start();
  return prompt.getAsync(['apiKey']);
}

module.exports = setup;
