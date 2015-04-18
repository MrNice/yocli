var prompt = require('prompt');

function setup(location, callback) {
  console.log('Hey there, let\'s setup Yo CLI');
  console.warn('Warning: '.red + 'YoCLI stores auth data unencrypted in ~/.yoclirc');
  prompt.start();
  prompt.get(['apiKey', 'commandName'], callback);
}

module.exports = setup;
